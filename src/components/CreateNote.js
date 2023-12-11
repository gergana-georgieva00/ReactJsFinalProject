import { useNavigate } from 'react-router-dom';

import * as noteService from '../../services/noteService';

export default function NoteCreate() {
    const navigate = useNavigate();
    
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
            <form id="create" onSubmit={createGameSubmitHandler}>
                <div className="container">
                    <h1>Create Note</h1>
                    <label htmlFor="leg-title">Note title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter note title..." />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter note category..." />

                    <label htmlFor="importance">Level of importance:</label>
                    <input type="number" id="importance" name="importance" min="1" placeholder="1" />

                    <label htmlFor="note-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary"></textarea>
                    <input className="btn submit" type="submit" value="Create Note" />
                </div>
            </form>
        </section>
    );
}