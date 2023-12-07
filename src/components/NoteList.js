import { useEffect, useState } from 'react';

import * as noteService from '.././services/noteService';
import NoteListItem from './NoteListItem';

export default function NoteList() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        noteService.getAll()
            .then(result => setNotes(result))
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <section id="catalog-page">
            <h1>All Notes</h1>

            {notes.map(note => (
                <NoteListItem key={note._id} {...note} />
            ))}

            {notes.length === 0 && (
                <h3 className="no-notes">No notes yet</h3>
            )}
        </section>
    );
}