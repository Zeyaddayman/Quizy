import { useDispatch, useSelector } from 'react-redux';
import './Result.css';
import ResultsLog from './ResultsLog';
import RestartBtn from './RestartBtn';
import { addResult } from './../rtk/reducers/resultsSlice';

function Result() {

    const userInfo = useSelector((state) => state.userInfo);

    const dispatch = useDispatch();
    
    let userIspassed = userInfo.result.isPassed;

    // work when user do refreash page or go to result page directly
    if (Object.keys(userInfo.result).length === 0) return (
        <>
        <RestartBtn text='Back To Quiz'/>
        <ResultsLog />
        </>
    )

    // add current result
    if (Object.keys(userInfo.result).length !== 0) {
        console.log('hello');
        dispatch(addResult(userInfo.result));
    }

    return (
        <>
        <div className="result text-lg mb-5">
            <div className="container p-10">
                <div className="headers flex justify-between mb-5">
                    Username <span className="username">{userInfo.info.username}</span>
                </div>
                <div className="stats">
                    <p className="mb-2">Total Quiz Points : <span className="float-right">{userInfo.result.totalQuizPoints}</span></p>
                    <p className="mb-2">Total Questions : <span className="float-right">{userInfo.result.totalQuestions}</span></p>
                    <p className="mb-2">Total Attempts : <span className="float-right">{userInfo.result.totalAttempts}</span></p>
                    <p className="mb-2">Total Earn Points : <span className="float-right">{userInfo.result.totalEarnPoints}</span></p>
                    <p>Quiz Result <span className={`${userIspassed ? "text-green-500" : "text-red-500"} font-bold float-right`}>
                        {userIspassed ? 'Passed' : 'Failed'}
                    </span></p>
                </div>
            </div>
        </div>
        <RestartBtn text='Restart'/>
        <ResultsLog />
        </>
    )
}

export default Result;
