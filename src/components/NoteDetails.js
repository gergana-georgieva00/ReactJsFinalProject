import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import * as noteService from '../services/noteService';
import * as commentService from '../services/commentService';
import AuthContext from "../contexts/authContext";
import reducer from './commentReducer';
import useForm from '../hooks/useForm';
import { pathToUrl } from "../utils/pathUtils";
import Path from "../paths";

export default function NoteDetails() {
    const navigate = useHistory();
    const { email, userId } = useContext(AuthContext);
    const [note, setNote] = useState({});
    const [comments, dispatch] = useReducer(reducer, []);
    const { noteId } = useParams();

    useEffect(() => {
        noteService.getOne(noteId)
            .then(setNote);

        commentService.getAll(noteId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_COMMENTS',
                    payload: result,
                });
            });
    }, [noteId]);

    const addCommentHandler = async (values) => {
        const newComment = await commentService.create(
            noteId,
            values.comment
        );

        newComment.owner = { email };

        dispatch({
            type: 'ADD_COMMENT',
            payload: newComment
        })
    }

    const deleteButtonClickHandler = async () => {
        const hasConfirmed = window.confirm(`Are you sure you want to delete ${note.title}`);

        if (hasConfirmed) {
            await noteService.remove(noteId);

            navigate('/notes');
        }
    }

    const { values, onChange, onSubmit } = useForm(addCommentHandler, {
        comment: '',
    });

    return (
        <section id="note-details">
            <h1>Note Details</h1>
            <div className="info-section">
                <p className="text">{note.text}</p>

                {userId === note._ownerId && (
                    <div className="buttons">
                        <Link to={pathToUrl(Path.NoteEdit, { noteId })} className="button">Edit</Link>
                        <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
                    </div>
                )}
            </div>
        </section>
    );
}