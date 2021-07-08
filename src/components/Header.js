import React from 'react';
import { useHistory } from 'react-router';

function Header() {
    const history = useHistory();
    const authToken = localStorage.getItem('AUTH_TOKEN');

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
                    <a className="nav-link" href="/driver">Drivers</a>
                </li>
                </ul>

                <ul className="navbar-nav ml-auto">{authToken ? (
                    <li className="nav-item">
                        <button className="btn btn-danger"
                        onClick={() => {
                            localStorage.removeItem('AUTH_TOKEN');
                            localStorage.removeItem('LOGGED_IN_USER');
                            history.push(`/login`);
                          }}>Logout</button>
                    </li>
                    ) : (
                        <li className="nav-item">
                            <button className="btn btn-danger">Login</button>
                        </li>
                      )}
                </ul>
            </div>
        </nav>
    )
}

export default Header;