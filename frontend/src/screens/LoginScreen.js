import React, { useState, useEffect } from 'react'

import { Link, useParams, useHistory, useNavigate, Navigate } from 'react-router-dom';
import '../static/styles/screens/LoginScreen/loginScreen.css'

// Import Redux dependencies 
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';

// Import components
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import FormContainer from '../components/FormContainer';

function LoginScreen(Location) {
    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('userInfo')
        checkUserNavigate(isLoggedIn)
    }, [history, userInfo, redirect])

    function checkUserNavigate (isLoggedIn) {
        if(isLoggedIn){
            history(redirect)
        } 
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <div className="fas fa-user user-icon-login"></div>

            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loader />}

            <form className='login-form' onSubmit={submitHandler}>
                <h2 className="login">Login</h2>

                <div className='email-group' controlId='email'>
                    <input
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                </div>

                <div className='password-group' controlId='password'>
                    <input
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                </div>

                <button type="submit" variant="primary">Sign In</button>
            </form> 

            <h3>New User? <Link style={{ color: '#7697DA' }} to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></h3>
        </FormContainer>
    )
}

export default LoginScreen
