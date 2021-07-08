import React from 'react';

function Header() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-warning navbar-dark">
            <a className="navbar-brand" href="/vehicle">My Vehicle</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/vehicle">Vehicles</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/drivers">Drivers</a>
                </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="btn btn-danger" href="/logout">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;