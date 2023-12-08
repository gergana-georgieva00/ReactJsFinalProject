import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';


import {
    BrowserRouter as Router,
  } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
import Path from './paths';

import Header from "./components/Header"
import Home from "./components/Home"
import NoteList from './components/NoteList';
import NoteCreate from './components/NoteCreate';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import NoteEdit from './components/NoteEdit';
import ErrorBoundary from './components/ErrorBoundary';
import AuthGuard from './components/AuthGuard';
const NoteDetails = lazy(() => import('./components/NoteDetails'));


function App() {
    return (
        <Router>
        <ErrorBoundary>
            <AuthProvider>
                <div id="box">
                    <Header />
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Switch>
                            <Route path={Path.Home} element={<Home />} />
                            <Route path="/notes" element={<NoteList />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/notes/:noteId" element={<NoteDetails />} />

                            <Route element={<AuthGuard />}>
                                <Route path="/notes/create" element={<NoteCreate />} />
                                <Route path={Path.NoteEdit} element={<NoteEdit />} />
                                <Route path={Path.Logout} element={<Logout />} />
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </AuthProvider>
        </ErrorBoundary>
        </Router>
    )
}

export default App