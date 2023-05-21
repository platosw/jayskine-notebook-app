function CategoryContent(props) {
    if (props.selectedCategory) {
        return (
            <div id="notes-section">
                <h3>{props.selectedCategory.name}</h3>
                <ul>
                    {props.selectedCategory.notes &&
                        props.selectedCategory.notes
                            .sort((a, b) => a.entry_date - b.entry_date)
                            .reverse()
                            .map((note) => (
                                <li key={`note_${note.note_id}`}>
                                    <a href={`/notes/${note.note_id}`}>
                                        {note.title}
                                    </a>
                                </li>
                            ))}
                </ul>
                <a
                    id="delete-category-btn"
                    href={`/delete_category/${props.selectedCategory.category_id}`}
                >
                    Delete {props.selectedCategory.name}
                </a>
            </div>
        );
    }

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
