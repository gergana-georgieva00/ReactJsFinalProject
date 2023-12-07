import { useEffect, useState } from "react";
import withAuth from "../hoc/withAuth";
import * as noteService from '../services/noteService';
import LatestNote from "./LatestNote";

function Home({
    _id,
    accessToken,
    email,
}) {
    const [latestNotes, setLatestNote] = useState([]);

    useEffect(() => {
        noteService.getLatest()
            .then(result => setLatestNote(result));
    }, [])

    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new notes are</h2>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Notes</h1>

                {latestNotes.map(note => <LatestNote {...note} />)}

                {!latestNotes.length && <p className="no-notes">No notes yet</p>}

                <p>{email}</p>
            </div>
        </section>
    );
}

const EnhancedHome = withAuth(Home);

export default EnhancedHome;