import './Home.css';
import { rules } from '../assets/rules.js'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchQuestions } from './../rtk/reducers/questionsSlice';
import { changeUsername, clearUserAnswers } from './../rtk/reducers/userInfoSlice';

function Home() {
    
    let dispatch = useDispatch();

    return (
        <>
        <ul className='rules text-xl mb-12'>
            {rules.map((rule, i) => (
                <li key={i + 1}>{i + 1}: {rule}</li>
            ))}
        </ul>
        <input className='username-input mx-auto block mb-8 w-3/4 p-3 rounded' placeholder='Username' type='text' />
        <Link onClick={() => {
            dispatch(clearUserAnswers());
            dispatch(fetchQuestions());
            let usernameInputValue = document.querySelector(".username-input").value;
            usernameInputValue !== '' && dispatch(changeUsername(usernameInputValue));
        }} to={'/questions'} className='start-btn w-fit mx-auto font-bold transition hover:opacity-70 text-white block px-8 py-3 rounded'>Start Quiz</Link>
        </>
    )
}

export default Home;
