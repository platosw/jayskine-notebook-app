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
                                <p style={{ paddingTop: "7px" }}>
                                    Date: {note.entry_date}{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        fill="currentColor"
                                        className="bi bi-tag-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                    {note.tags &&
                                        note.tags.split(" ").map((tag) => {
                                            return `#${tag} `;
                                        })}
                                </p>
                                <a href={`/notes/${note.note_id}`}>
                                    <h3
                                        style={{
                                            marginTop: "8px",
                                        }}
                                    >
                                        {note.title}
                                    </h3>
                                </a>
                                {/* <div className="note-text">
                                    <p
                                        style={{
                                            marginTop: "8px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {note.body_content.slice(0, 81)}
                                    </p>
                                </div> */}
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
