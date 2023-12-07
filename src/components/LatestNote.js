import { Link } from "react-router-dom";
import Path from "../paths";
import { pathToUrl } from "../utils/pathUtils";

export default function LatestNote({
    _id,
    title,
}) {
    return (
        <div className="note">
            <h3>{title}</h3>
            <div className="data-buttons">
                <Link to={pathToUrl(Path.NoteText, { noteId: _id })} className="btn text-btn">Details</Link>
            </div>
        </div>
    );
}