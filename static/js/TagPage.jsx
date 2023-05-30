function TagPage(props) {
    return (
        <div>
            <h3>Tag: {props.tag}</h3>
            <ul>
                {props.notes.map((note) => {
                    if (note.tags.includes(props.tag)) {
                        return (
                            <li key={`tag-note_${note.note_id}`}>
                                {note.title}
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
}
