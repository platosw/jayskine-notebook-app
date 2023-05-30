function AllNotes(props) {
    let tagId = 0;

    return (
        <div id="notes-section">
            <h3>All Notes</h3>
            <ul>
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
