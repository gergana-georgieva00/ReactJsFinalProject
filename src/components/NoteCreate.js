import { useHistory } from 'react-router-dom';

import * as noteService from '../services/noteService';

export default function NoteCreate() {
    const navigate = useHistory();
    
    const createNoteSubmitHandler = async (e) => {
        e.preventDefault();

        const noteData = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await noteService.create(noteData);

            navigate('/notes');
        } catch (err) {
            // Error notification
            console.log(err);
        }
    }

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={createNoteSubmitHandler}>
                <div className="container">
                    <h1>Create Note</h1>
                    <label htmlFor="leg-title">Note title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter note title..." />

                    <label htmlFor="noteText">Text:</label>
                    <textarea name="noteText" id="noteText"></textarea>
                    <input className="btn submit" type="submit" value="Create Note" />
                </div>
            </form>
        </section>
    );
}