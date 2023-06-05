function AllNotes(props) {
    return (
        <div id="notes-section">
            <h3>All Notes</h3>
            <ul style={{ listStyleType: "none" }}>
                {props.notes &&
                    props.notes.map((note) => (
                        <li key={`note_id_${note.note_id}`}>
                            <a href={`/notes/${note.note_id}`}>{note.title}</a>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
