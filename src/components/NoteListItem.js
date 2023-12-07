import { Link } from "react-router-dom";

export default function NoteListItem({
    _id,
    title,
}) {
    return (
        <div className="allNotes">
            <div className="allNotes-info">
                <h2>{title}</h2>
                <Link to={`/notes/${_id}`} className="details-button">Details</Link>
            </div>
        </div>
    );
}