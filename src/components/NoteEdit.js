import { useHistory, useParams } from 'react-router-dom';

import * as noteService from '../services/noteService';
import { useEffect, useState } from 'react';

export default function NoteEdit() {
    const navigate = useHistory();
    const { noteId } = useParams();
    const [note, setNote] = useState({
        title: '',
        category: '',
        importance: '',
        imageUrl: '',
        summary: '',
    });

    useEffect(() => {
        noteService.getOne(noteId)
            .then(result => {
                setNote(result);
            });
    }, [noteId]);

    const editNoteSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await noteService.edit(noteId, values);

            navigate('/notes');
        } catch (err) {
            // Error notification
            console.log(err);
        }
    }

    const onChange = (e) => {
        setNote(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={editNoteSubmitHandler}>
                <div className="container">
                    <h1>Create Note</h1>
                    <label htmlFor="leg-title">Note title:</label>
                    <input type="text" id="title" name="title" value={note.title} onChange={onChange} placeholder="Enter note title..." />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={note.category} onChange={onChange} placeholder="Enter note category..." />

                    <label htmlFor="importance">Level of importance:</label>
                    <input type="number" id="importance" name="importance" value={note.importance} onChange={onChange} min="1" placeholder="1" />

                    <label htmlFor="note-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={note.imageUrl} onChange={onChange} placeholder="Upload a photo..." />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" value={note.summary} onChange={onChange} id="summary"></textarea>
                    <input className="btn submit" type="submit" value="Edit Note" />
                </div>
            </form>
        </section>
    );
}