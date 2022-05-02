import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom'

import { logout } from '../redux/actions/userActions';

import '../static/styles/components/Header/header.css'


function Header() {
    const history = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Get Name
    const nameArray = userInfo.name.split(" ")
    const name = nameArray[0]

    const dispatch = useDispatch()

    //Logout function
    const logoutHandler = () => {
        dispatch(logout()) 
        
        const redirect = `/login`
        history(redirect)
    }

    //dropdown menu
    // Open menu
    function openNav() {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    return (
        <div className="header">
            <div title="userInfo.name" className="topnav">
                <button onClick={openNav} className="dropbtn"> 
                    <h3>{name}</h3>
                    <div className="fas fa-user"></div>
                </button>

                <div id="myLinks" className="dropdown-content">
                    {/* <button><Link to='/profile'><h4>Profile</h4></Link></button> */}
                    <button onClick={logoutHandler}><h4>logout</h4></button>
                </div>
            </div>
        </div>
    )
}

export default Header
