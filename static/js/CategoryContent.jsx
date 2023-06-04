function CategoryContent(props) {
    if (!props.selectedCategory) {
        return (
            <div id="notes-section">
                <p>Please select categories</p>
            </div>
        );
    }

    return (
        <div id="notes-section">
            <div id="category-navbar">
                <h3>{props.selectedCategory.name}</h3>
                <EditCategory
                    editButton={props.editButton}
                    setEditButton={props.setEditButton}
                    name={props.selectedCategory.name}
                    editInput={props.editInput}
                    handleEditInputChange={props.handleEditInputChange}
                    handleEditSubmit={props.handleEditSubmit}
                    handleEditCategory={props.handleEditCategory}
                    id={props.selectedCategory.category_id}
                    cat={props.selectedCategory}
                />
            </div>
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
            <button
                id="delete-category-btn"
                value={props.selectedCategory.category_id}
                onClick={(e) => props.handleDelete(e, "value")}
            >
                Delete {props.selectedCategory.name}
            </button>
        </div>
    );
}

function EditCategory(props) {
    const handleEditCategory = () => {
        props.handleEditCategory(props.cat);
        props.handleEditSubmit(props.id);
    };

    if (props.editButton === false) {
        return <button onClick={() => props.setEditButton(true)}>Edit</button>;
    } else {
        return (
            <div>
                <button onClick={() => props.setEditButton(false)}>Edit</button>
                <input
                    type="text"
                    onChange={props.handleEditInputChange}
                    // value={props.cat.name} // Question -> how to bring value in here.
                />
                <input type="submit" onClick={handleEditCategory} />
            </div>
        );
    }
}
