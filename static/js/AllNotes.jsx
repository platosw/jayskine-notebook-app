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
                            {note.tags && "Tags "}
                            {note.tags &&
                                note.tags.split(" ").map((tag) => {
                                    tagId++;
                                    return (
                                        <a key={`tag_${tagId}`} href="#">
                                            #{tag}
                                        </a>
                                    );
                                })}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
