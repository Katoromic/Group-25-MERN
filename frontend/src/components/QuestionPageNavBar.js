import React from 'react';

import '../styles/QuestionPageNavBar.css';

import DashBoardButton from './DashBoardButton';
import HintButton from './HintButton';
import SaveLogoutButton from './SaveLogoutButton';
import ProgressBar from './ProgressBar';
import QuestionCounters from './QuestionCounters';

const QuestionPageNavBar = ({Progress, QuestionsCorrect, QuestionsIncorrect}) => {
    return (

        <div id='QuestionPageNavElement'>

            <div className='container-fluid'>
        
                <div className='row'>

                    <div id='UsersName' className='col d-flex align-items-center justify-content-center'>
                        <h1 id='FirstName' className='d-none d-xl-inline text-wrap'>Dennis</h1>
                        <h1 id='LastName' className='d-none d-xl-inline text-wrap'>Klingener</h1>
                    </div>
                </div>

                <div className='row' >
                    <div className='col' >
                        <ProgressBar Progress={Progress}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <QuestionCounters QuestionsCorrect={QuestionsCorrect} QuestionsIncorrect={QuestionsIncorrect} />
                    </div>
                </div>
                
                <div className='d-grid gap-2 mx-auto'>
                    <HintButton />
                    <DashBoardButton />
                    <SaveLogoutButton />
                </div>

            </div>

        </div>
    );
};

export default QuestionPageNavBar;






