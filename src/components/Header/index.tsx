import React from 'react';
import './index.css';
import logo from '../../assets/images/header_icon.png';

const Header = () => {
    return (
        <div className="container">
            <img src={logo} alt="Logo" />
            <h1> Dashboard </h1>
        </div>
    )
};

export default Header;