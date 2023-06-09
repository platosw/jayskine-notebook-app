function TagPage(props) {
    return (
        <div id="tag-note-list">
            <h3>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-tag-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>{" "}
                {props.tag}
            </h3>
            <ul>
                {props.notes.map((note) => {
                    if (note.tags.includes(props.tag)) {
                        return (
                            <li key={`tag-note_${note.note_id}`}>
                                <a href={`/notes/${note.note_id}`}>
                                    {note.title}
                                </a>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
}
