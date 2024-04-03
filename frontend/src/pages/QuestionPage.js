import React, {useState} from 'react';

import '../styles/QuestionPage.css';
import BackGroundVideo from '../images/background.mp4'

import NavBar from '../components/QuestionPageNavBar.js';



const QuestionPage = (props) => {

    // TO BE IMPLEMENTED
    let CorrectAnswer = 'Answer 1';
    // let QuestionText = props.QuestionText;
    // let IncorrectAnswers = props.IncorrectAnswers;

    // For updating the progress bar.
    const [Progress, SetProgress] = useState(0); // THIS WILL NEED TO BE INITIALIZED TO WHATEVER THE LANDING PAGE SEND US SO IT IS USER SPECIFIC!!!!!!!

    // Conditional styles.
    const CorrectStyle = {
        backgroundColor: 'green',
        borderColor: 'green',
        color: 'white',
    };

    const IncorrectStyle = {
        backgroundColor: 'red',
        color: 'white',
    };

    // For conditional display
    const [Tries, SetTries] = useState(0);
    const [Correct, SetCorrect] = useState(false);
    const [Incorrect, SetIncorrect] = useState(false);
    const [IncorrectTryAgain, SetTryAgain] = useState(false);
    const [NextButton, SetNextButton] = useState(false);
    const [RestartButton, SetRestartButton] = useState(false);
    const [ReturnHome, SetReturnHome] = useState(false);
    const [CurrentQuestion, SetCurrentQuestion] = useState(0); // this will need to be fed in per user.

    // For applying conditional styles to answer choices.
    const [StyleButton1, SetStyleButton1] = useState();
    const [StyleButton2, SetStyleButton2] = useState();
    const [StyleButton3, SetStyleButton3] = useState();
    const [StyleButton4, SetStyleButton4] = useState();

    // For Toggling the hover animation for answer choices after they have een chosen.
    const [StyleHover1, SetStyleHover1] = useState('btn-custom w-50 mt-2 mb-2');
    const [StyleHover2, SetStyleHover2] = useState('btn-custom w-50 mt-2 mb-2');
    const [StyleHover3, SetStyleHover3] = useState('btn-custom w-50 mt-2 mb-2');
    const [StyleHover4, SetStyleHover4] = useState('btn-custom w-50 mt-2 mb-2');


    // For disabling already chosen buttons.
    const [DisableButton1, SetButtonDisable1] = useState(false);
    const [DisableButton2, SetButtonDisable2] = useState(false);
    const [DisableButton3, SetButtonDisable3] = useState(false);
    const [DisableButton4, SetButtonDisable4] = useState(false);

    // For question counters.
    const [QuestionsCorrect, SetQuestionsCorrect] = useState(0); // This will need to passed in for user specifc.
    const [QuestionsIncorrect, SetQuestionsIncorrect] = useState(0); // This will need to passed in for user specifc.


    // Disables all buttons.
    const DisableAllButtons = () => {
        SetButtonDisable1(true);
        SetButtonDisable2(true);
        SetButtonDisable3(true);
        SetButtonDisable4(true);
    };

    // Enables all buttons.
    const EnableAllButtons = () => {
        SetButtonDisable1(false);
        SetButtonDisable2(false);
        SetButtonDisable3(false);
        SetButtonDisable4(false);
    };

    // Reveals the correct and incorrect choices when the correct answer is chosen.
    const RevealStyles = (ButtonChosen) => {

        switch (ButtonChosen) {
            case 1: 
                SetStyleButton1(CorrectStyle);
                SetStyleButton2(IncorrectStyle);
                SetStyleButton3(IncorrectStyle);
                SetStyleButton4(IncorrectStyle);
                break;
            case 2:
                SetStyleButton1(IncorrectStyle);
                SetStyleButton2(CorrectStyle);
                SetStyleButton3(IncorrectStyle);
                SetStyleButton4(IncorrectStyle);
                break;
            case 3:
                SetStyleButton1(IncorrectStyle);
                SetStyleButton2(IncorrectStyle);
                SetStyleButton3(CorrectStyle);
                SetStyleButton4(IncorrectStyle);
                break;
            case 4:
                SetStyleButton1(IncorrectStyle);
                SetStyleButton2(IncorrectStyle);
                SetStyleButton3(IncorrectStyle);
                SetStyleButton4(CorrectStyle);
                break;
        }

    };

    // Removes the hover animation from the selected button.
    const RemoveButtonHover = (ButtonChosen) => {
        
        switch (ButtonChosen) {
            case 1:
                SetStyleHover1('btn-custom-alt w-50 mt-2 mb-2');
                break;
            case 2:
                SetStyleHover2('btn-custom-alt w-50 mt-2 mb-2');
                break;
            case 3:
                SetStyleHover3('btn-custom-alt w-50 mt-2 mb-2');
                break;
            case 4:
                SetStyleHover4('btn-custom-alt w-50 mt-2 mb-2');
                break;
        }

    };

    // Applies the hover animation to all the answer choice buttons.
    const ResetAllHover = () => {
        SetStyleHover1('btn-custom w-50 mt-2 mb-2');
        SetStyleHover2('btn-custom w-50 mt-2 mb-2');
        SetStyleHover3('btn-custom w-50 mt-2 mb-2');
        SetStyleHover4('btn-custom w-50 mt-2 mb-2');
    };

    // Removes the hover animation from all the answer choice buttons.
    const RemoveAllHover = () => {
        SetStyleHover1('btn-custom-alt w-50 mt-2 mb-2');
        SetStyleHover2('btn-custom-alt w-50 mt-2 mb-2');
        SetStyleHover3('btn-custom-alt w-50 mt-2 mb-2');
        SetStyleHover4('btn-custom-alt w-50 mt-2 mb-2');
    };

    // Sets all buttons to the default style.
    const ResetButtonStyles = () => {
        SetStyleButton1();
        SetStyleButton2();
        SetStyleButton3();
        SetStyleButton4();
    };

    // Disables and applies incorrect style to incorrect answer choice.
    const DisableIncorrectChoice = (ButtonChosen) => {

        switch (ButtonChosen) {
            case 1: 
                SetButtonDisable1(true);
                SetStyleButton1(IncorrectStyle);
                break;
            case 2:
                SetButtonDisable2(true);
                SetStyleButton2(IncorrectStyle);
                break;
            case 3:
                SetButtonDisable3(true);
                SetStyleButton3(IncorrectStyle);
                break;
            case 4:
                SetButtonDisable4(true);
                SetStyleButton4(IncorrectStyle);
                break;
        }

    };

    // Increments progress by 5%.
    const UpdateProgress = () => {
        SetProgress(Progress + 5);
    };

    // Increments questions answered correctly by 1 if user is on first try.
    const UpdateCorrectQuestions = () => {
        if (Tries == 0) {
            SetQuestionsCorrect(QuestionsCorrect + 1);
        }  
    };

    // Increments questions answered incorrectly by 1 if user is on first try.
    const UpdateIncorrectQuestions = () => {
        if (Tries == 0) {
            SetQuestionsIncorrect(QuestionsIncorrect + 1);
        }
    };

    // Restarts the current lesson when all questions have been answered.                           THIS NEEDS TO RELOAD THE FIRST QUESTION!
    const RestartLesson = () => {
        SetProgress(0);
        SetQuestionsCorrect(0);
        SetQuestionsIncorrect(0);
        SetTries(0);
        SetRestartButton(false);
        SetReturnHome(false);
        EnableAllButtons();
        ResetButtonStyles();
    };

    // Handle conditional messages when the correct answer is chosen.
    const HandleCorrectAnswerChoice = (ButtonChosen) => {

        // Disable all buttons
        DisableAllButtons();

        // Apply the correct styles to all buttons revealing incorrect answers.          
        RevealStyles(ButtonChosen);

        // Remove the hover animation from all answer choices.
        RemoveAllHover();

        // Remove other messages if present.
        SetTryAgain(false);

        // If at the end of the lesson.
        if (CurrentQuestion == 19) {
            SetRestartButton(true);
            SetReturnHome(true);
            SetCurrentQuestion(0);
            UpdateProgress();
        }

        else {
            SetCorrect(true);
            SetNextButton(true);
            SetTries(0);
            SetCurrentQuestion(CurrentQuestion + 1);
        }

    };

    // Handle conditional messages when an incorrect answer is chosen.
    const HandleIncorrectAnswerChoice = (ButtonChosen) => {

        // Disable the incorrect button and remove the hover animation.
        DisableIncorrectChoice(ButtonChosen);

        // Remove the hover animation from the chosen answer.
        RemoveButtonHover(ButtonChosen);
                
        // Disaplay the try again message and increment the try count.
        SetTryAgain(true);
        SetTries(Tries + 1);

        // Check if the user is out of tries for this question.
        if (Tries === 2) {

            DisableAllButtons();
            RemoveAllHover();
            
            // If all questions have been answered.
            if (CurrentQuestion == 19) {
                SetRestartButton(true);
                SetReturnHome(true);
                SetCurrentQuestion(0);
                UpdateProgress();
            }

            else {
                SetTryAgain(false);
                SetIncorrect(true);
                SetNextButton(true);
                SetTries(0);
                SetCurrentQuestion(CurrentQuestion + 1);
            }
        }

    };

    // Checks the answer and displays the proper messages.               
    const CheckAnswer = (ButtonChosen, CorrectAnswer, ChosenAnswer) => {

        // If the correct answer was chosen.
        if (ChosenAnswer == CorrectAnswer) {

            // Increment answers answered correctly.
            UpdateCorrectQuestions();
            
            // Handle conditional messages.
            HandleCorrectAnswerChoice(ButtonChosen);
            
        }

        else {

            // Update the numbre of incorrectly answered questions.
            UpdateIncorrectQuestions();
            
            // Handle conditional messages.
            HandleIncorrectAnswerChoice(ButtonChosen);
        }

    };

    // Moves to the next question and removes messages.                                             Need to add the next question functionality!!!!!!!!!!!!
    const NextQuestion = () => {

        EnableAllButtons();

        // Reset all styles.
        SetStyleButton1();
        SetStyleButton2();
        SetStyleButton3();
        SetStyleButton4();

        // Apply the hover animation to all the answer choices.
        ResetAllHover();

        // Clear messages.
        SetCorrect(false);
        SetIncorrect(false);
        SetTryAgain(false);

        // Remove the next question button
        SetNextButton(false);

        // Update progress bar.
        UpdateProgress();
    }

    return(

        <div id='QuestionPageElement'>

            <video autoPlay muted loop className='BackGroundVideo'>
                <source src={BackGroundVideo} type='video/mp4' />
            </video>

            <div className='container-fluid'>
                
                <div className='row'>

                    <div className='col-3 d-none d-xl-inline'>
                        <NavBar Progress={Progress} QuestionsCorrect={QuestionsCorrect} QuestionsIncorrect={QuestionsIncorrect}/>
                    </div>

                    <div className='col-xl-8'>

                        <div id='QuestionRow' className='row m-5 p-3' >
                            <div className='col d-flex align-items-center justify-content-center'>
                                <h1 id='QuestionText'>1). THE QUESTION TEXT WILL GO HERE THE QUESTION TEXT WILL GO HERE THE QUESTION TEXT WILL GO HERE THE QUESTION TEXT WILL GO HERE THE QUESTION TEXT WILL GO HERE THE QUESTION TEXT WILL GO HERE THE QUESTION TEXT WILL GO HERE </h1>
                            </div>
                        </div>

                        <div id='MessageRow' className='row m-5'>
                            <div className='col d-flex align-items-center justify-content-center'>
                                <span className='placeholder'></span>
                                {Correct && <h2 id='ResultMessageCorrect'>Correct!</h2>}
                                {Incorrect && <h2 id='ResultMessageIncorrect'>The correct answer was...</h2>}
                                {IncorrectTryAgain && <h2 id='ResultMessageTryAgain'>Incorrect, try again.</h2>}
                            </div>
                        </div>
                        
                        <div id='ButtonRow' className='row m-5 pt-2 pb-2'>

                            <div className='col'>

                                <div className='row'>

                                    <button id='AnswerOne' className={StyleHover1} style={StyleButton1} disabled={DisableButton1} onClick={() => CheckAnswer(1, CorrectAnswer, document.getElementById('AnswerOne').textContent)}>Answer 1</button>

                                    <button id='AnswerTwo' className={StyleHover2} style={StyleButton2} disabled={DisableButton2} onClick={() => CheckAnswer(2, CorrectAnswer, document.getElementById('AnswerTwo').textContent)}>Answer 2</button>

                                </div>

                            </div>

                            <div className='col'>

                                <div className='row'> 

                                    <button id='AnswerThree' className={StyleHover3} style={StyleButton3} disabled={DisableButton3} onClick={() => CheckAnswer(3, CorrectAnswer, document.getElementById('AnswerThree').textContent)}>Answer 3</button>

                                    <button id='AnswerFour' className={StyleHover4} style={StyleButton4} disabled={DisableButton4} onClick={() => CheckAnswer(4, CorrectAnswer, document.getElementById('AnswerFour').textContent)}>Answer 4</button>

                                </div>

                            </div>

                        </div>

                        <div className='row'>
                            <div className='col d-flex align-items-center justify-content-center'>

                                {NextButton && <button id='NextQestionButton' className='btn-custom w-25' onClick={() => NextQuestion()}>Next Question</button>}

                                {ReturnHome && <button id='ReturnHomeButton' className='btn-custom w-25'>Home</button>}

                                {RestartButton && <button id='RestartButton' className='btn-custom w-25' onClick={() => RestartLesson()}>Restart</button>}
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
