function AllNotes(props) {
    return (
        <div id="notes-section">
            <h4>All Notes</h4>
            <ul
                style={{
                    listStyleType: "none",
                    paddingLeft: 0,
                    marginTop: "3.3%",
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
    );
}
