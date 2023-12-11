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
                <div className="note-header">
                    <img className="note-img" src={note.imageUrl} alt={note.title} />
                    <h1>{note.title}</h1>
                    <span className="levels">Level of importance: {note.importance}</span>
                    <p className="type">{note.category}</p>
                </div>

                <p className="text">{note.summary}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {comments.map(({ _id, text, owner: { email } }) => (
                            <li key={_id} className="comment">
                                <p>{email}: {text}</p>
                            </li>
                        ))}
                    </ul>

                    {comments.length === 0 && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {userId === note._ownerId && (
                    <div className="buttons">
                        <Link to={pathToUrl(Path.NoteEdit, { noteId })} className="button">Edit</Link>
                        <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
                    </div>
                )}
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onSubmit}>
                    <textarea name="comment" value={values.comment} onChange={onChange} placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>
        </section>
    );
}