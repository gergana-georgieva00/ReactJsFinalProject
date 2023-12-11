import { Link } from "react-router-dom";
import Path from "../paths";
import { pathToUrl } from "../utils/pathUtils";

export default function LatestNote({
    _id,
    imageUrl,
    title,
}) {
    return (
        <div className="note">
        <div className="image-wrap">
            <img src={imageUrl} />
        </div>
        <h3>{title}</h3>
        <div className="data-buttons">
            <Link to={pathToUrl(Path.NoteDetails, { noteId: _id })} className="btn details-btn">Details</Link>
        </div>
    </div>
    );
}