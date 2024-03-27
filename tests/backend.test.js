/*
    Defines tests for the backend
*/

const supertest = require('supertest');
const Path = require('../frontend/src/components/Path');

const server = require('../server');
const JWT = require('../createJWT');


beforeAll(() => {

    // Nothing to setup
    return;
});
  
afterAll(() => {

    // Shutdown everything
    server.listener.close();
    server.mongo.close();
});


// JWT tests
//
describe('JWT', () => {

    test('Access token', async() => {

        const validateToken = function (tok) {

            let valid = JWT.isValidAccessToken(tok);

            expect(valid).toBe(true);

            let payload = JWT.getPayload(tok);

            expect(payload.userId).toEqual(id);
            expect(payload.firstName).toEqual(fn);
            expect(payload.lastName).toEqual(ln);
            expect(payload.verified).toBe(false);
        }

        const id = '6603323d82133af020264b04';
        const fn = 'Guest';
        const ln = 'User';
        const ver = false;

        const token = JWT.createAccessToken(fn, ln, ver, id).accessToken;

        validateToken(token);

        const newToken = JWT.refresh(token).accessToken;

        validateToken(newToken);
    });

    test('Verification token', async() => {

        const id = '6603323d82133af020264b04';

        const token = JWT.createVerificationToken(id);

        let valid = JWT.isValidVerificationToken(token);

        expect(valid).toBe(true);

        let payload = JWT.getPayload(token);

        expect(payload.userId).toEqual(id);
    });
});


// Login endpoint tests
//
describe('Login', () => {

    test('Valid credentials', async() => {

        let validUser = {"login": "guest", "password": ""};
        const response = await superPost('/login', validUser);

        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe("");
        expect(response.body.token).not.toBe("");
    });

    test('Blank credentials', async() => {

        let blankUser = {"login": "", "password": ""};
        const response = await superPost('/login', blankUser);

        expect(response.statusCode).toBe(400);
        expect(response.body.token).toBe(null);
        expect(response.body.error.length).not.toBe(0);
    });

    test('Invalid credentials', async() => {

        let invalidUser = {"login": "_njbv2aejh4wrjkgsrnaj3", "password": "lfnjkg34gp9#$jrbw4f"};
        const response = await superPost('/login', invalidUser);

        expect(response.statusCode).toBe(400);
        expect(response.body.token).toBe(null);
        expect(response.body.error.length).not.toBe(0);
    });
});


// Signup endpoint tests
//
describe('Signup', () => {

    test('Blank username', async() => {

        let blankUsername = {"FirstName": "Delete", "LastName": "if in database", "Email": "", "Username": "", "Password": "password"};

        const response = await superPost('/signup', blankUsername);

        expect(response.statusCode).toBe(400);
        expect(response.body.token).toBe(null);
        expect(response.body.error).not.toBe("");
    });

    test('Undefined username', async() => {

        let undefinedUsername = {"FirstName": "Guest", "LastName": "User", "Email": "", "Password": ""};

        const response = await superPost('/signup', undefinedUsername);

        expect(response.statusCode).toBe(400);
        expect(response.body.token).toBe(null);
        expect(response.body.error).not.toBe("");
    });

    test('Existing username', async() => {

        let existUsername = {"FirstName": "Guest", "LastName": "User", "Email": "", "Username": "guest", "Password": ""};

        const response = await superPost('/signup', existUsername);

        expect(response.statusCode).toBe(400);
        expect(response.body.token).toBe(null);
        expect(response.body.error).not.toBe("");
    });

    test('Unique username', async() => {

        let newUsername = {"FirstName": "Delete", "LastName": "if in database", "Email": "", "Username": "_prltgnwkcedbsyertt", "Password": ""};

        const response = await superPost('/signup', newUsername);

        expect(response.statusCode).toBe(200);
        expect(response.body.token).not.toBe(null);
        expect(response.body.error).toBe("");

        // Delete the new user so this test works more than once!
        //
        try
        {
            const users = server.mongo.db("MainDatabase").collection("Users");
            await users.deleteOne({ Username: "_prltgnwkcedbsyertt" });
        }
        catch (e)
        {
            console.warn("Signup -> Unique username: Newly created user not removed.");
        }
    });
});


//
// Wrapper functions for GET and POST
//

async function superGet(endpoint)
{
    return await supertest(Path.buildPath('api')).get(endpoint);
}

async function superPost(endpoint, body)
{
    return await supertest(Path.buildPath('api')).post(endpoint)
                               .send(body)
                               .set('Accept', 'application/json')
                               .set('Content-Type', 'application/json');
}

