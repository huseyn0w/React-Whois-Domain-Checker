import React from 'react';
import logo from '../logo.png';

const Header = (props) => {
    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <a href="https://ehuseynov.com" className="logo">
                            <img src={logo} alt="test" />
                        </a>
                        <h1>React JS Simple Domain check &amp; WHOIS Application</h1>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;