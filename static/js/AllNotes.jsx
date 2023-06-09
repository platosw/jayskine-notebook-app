function AllNotes(props) {
    return (
        <div id="notes-section" className="notes-grid">
            <h4 id="all-notes-title">All Notes</h4>
            <div id="notes-list-container">
                <ul
                    style={{
                        textAlign: "center",
                        alignItems: "center",
                        paddingLeft: "0",
                    }}
                >
                    {props.notes &&
                        props.notes.map((note) => (
                            <li
                                className="note-card"
                                key={`note_id_${note.note_id}`}
                            >
                                <a href={`/notes/${note.note_id}`}>
                                    <h3
                                        style={{
                                            marginTop: "8px",
                                            paddingTop: "8px",
                                        }}
                                    >
                                        {note.title}
                                    </h3>
                                </a>
                                <p>Date: {note.entry_date}</p>
                                <button className="btn">
                                    <a
                                        href={`/notes/${note.note_id}`}
                                        style={{ color: "inherit" }}
                                    >
                                        Go Detail
                                    </a>
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
