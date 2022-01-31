import React, { useState, useEffect } from 'react'

import { Link, useParams, useHistory, useNavigate, Navigate } from 'react-router-dom';
import '../static/styles/screens/LoginScreen/loginScreen.css'

// Import Redux dependencies 
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/userActions';

// Import components
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import FormContainer from '../components/FormContainer';

function RegisterScreen(Location) {
    const history = useNavigate();

    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = Location.search ? Location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

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

        if(password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(first_name, last_name, email, password))
        }
    }

    return (
        <FormContainer>
            <div className="fas fa-user user-icon-login"></div>

            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loader />}

            <form className='login-form' onSubmit={submitHandler}>
                <h2 className="register">Register</h2>

                <div className='fistname-group' controlId='first_name'>
                    <input
                        required
                        type='first_name'
                        placeholder='First name'
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                    >
                    </input>
                </div>

                <div className='lastname-group' controlId='last_name'>
                    <input
                        required
                        type='last_name'
                        placeholder='Last Name'
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                    >
                    </input>
                </div>

                <div className='email-group' controlId='email'>
                    <input
                        required
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                </div>

                <div className='password-group' controlId='password'>
                    <input
                        required
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                </div>

                <div className='confirm-password-group' controlId='passwordConfirm'>
                    <input
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </input>
                </div>

                <button type="submit" variant="primary">Register</button>
            </form> 

            <h3>Already a user? <Link style={{ color: '#7697DA' }} to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></h3>

        </FormContainer>
    )
}

export default RegisterScreen