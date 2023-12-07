import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

export default function Header() {
    const {
        isAuthenticated,
        username,
    } = useContext(AuthContext);

    return (
        <header>
            <h1><Link className="home" to="/">Notes</Link></h1>
            <nav>
                <Link to="/notes">All notes</Link>
                {isAuthenticated && (
                    <div id="user">
                        <Link to="/notes/create">Create Note</Link>
                        <Link to="/logout">Logout</Link>
                        <span>| {username}</span>
                    </div>
                )}

                {!isAuthenticated && (
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}