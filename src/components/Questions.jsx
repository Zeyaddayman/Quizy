import { useState } from "react";
import './Questions.css';
import { useDispatch, useSelector } from "react-redux";
import { saveUserAnswer, saveUserResult } from "./../rtk/reducers/userInfoSlice";
import { Link } from "react-router-dom";
import RestartBtn from "./RestartBtn";

function Questions() {

    const questions = useSelector((state) => state.questions);
    
    const userInfo = useSelector((state) => state.userInfo);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    let isLastQuestion = currentQuestionIndex === questions.length - 1;

    let dispatch = useDispatch();


    // work when user do refreash page or go to questions page directly
    if (questions.length === 0) return <RestartBtn text='Back To Quiz'/>;

    const saveQuestion = (userAnswer) => {
        let userQuestionObj = {
            id: questions[currentQuestionIndex].id,
            title: questions[currentQuestionIndex].title,
            answers: questions[currentQuestionIndex].answers,
            correct: questions[currentQuestionIndex].correct,
            userAnswer,
            isCorrect: userAnswer === questions[currentQuestionIndex].correct
        }
        dispatch(saveUserAnswer(userQuestionObj));
        console.log(userInfo.answers);
    }

    const saveUserResultfn = () => {

        let username = userInfo.info.username;
        let id = Date.now();

        let totalQuestions = questions.length
        let totalQuizPoints = totalQuestions * 10;
        let totalAttempts = userInfo.answers.length;

        let resultPoints = 0;
        for (let i = 0; i < userInfo.answers.length; i++) {
            userInfo.answers[i].isCorrect ? resultPoints += 10 : null;
        }
        let totalEarnPoints = resultPoints;

        let passPoints = (totalQuestions * 10) / 2;
        let isPassed = resultPoints >= passPoints;

        dispatch(saveUserResult({
            id,
            username,
            totalQuizPoints,
            totalQuestions,
            totalAttempts,
            totalEarnPoints,
            isPassed
        }))
    }

    // check if user answer current question before
    if (userInfo.answers[currentQuestionIndex] !== undefined) {
        var prevUserAnswer = userInfo.answers[currentQuestionIndex].userAnswer;
    }

    return (
        <div className="questions-page">
            <div className="container lg:px-10 sm:px-5">
                <h3 className="font-bold text-2xl">
                    {currentQuestionIndex + 1}: {questions[currentQuestionIndex].title}
                </h3>
                <div className="answers mt-10 mb-20">
                    {questions[currentQuestionIndex].answers.map((answer) => (
                        <div key={`${answer} ${currentQuestionIndex + 1}`} 
                        className="answer text-xl mb-5">
                                <input type="radio" name="answer" id={answer} defaultChecked={prevUserAnswer === answer} />
                            <label className="relative block font-bold ml-12 transition cursor-pointer" htmlFor={answer}>
                                {answer}
                            </label>
                        </div>
                    ))}
                </div>
                <div className='control-btns flex justify-between'>
                    <button onClick={() => {
                        let selectedInput = document.querySelector('.questions-page .answers .answer input:checked');

                        if (selectedInput !== null) {
                            // save question
                            saveQuestion(selectedInput.id);
                        }

                        if (currentQuestionIndex !== 0) {
                            // change question
                            setCurrentQuestionIndex(currentQuestionIndex - 1);
                        }
                    }} className={`prev ${currentQuestionIndex === 0 && 'invisible'} btn py-3 px-7 text-white rounded transition hover:opacity-70 bg-green-500`}>Prev</button>

                    
                    {!isLastQuestion ? (
                        <button onClick={() => {
                            let selectedInput = document.querySelector('.questions-page .answers .answer input:checked');

                            if (selectedInput !== null) {
                                saveQuestion(selectedInput.id);
                            }

                            if (currentQuestionIndex !== questions.length - 1) {
                                // change question
                                setCurrentQuestionIndex(currentQuestionIndex + 1);
                            }

                        }} className='next btn py-3 px-7 text-white rounded transition hover:opacity-70 bg-green-500'>
                            Next
                        </button>

                    ) : ( // only in last question

                        <Link to={'/result'} onClick={() => {
                            let selectedInput = document.querySelector('.questions-page .answers .answer input:checked');
    
                            if (selectedInput !== null) {
                                saveQuestion(selectedInput.id);
                            }

                            saveUserResultfn();
    
                        }} className='finish btn py-3 px-7 text-white rounded transition hover:opacity-70 bg-green-500'>
                            Finish
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Questions;
