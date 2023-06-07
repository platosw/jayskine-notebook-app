function CategoryContent(props) {
    if (!props.selectedCategory) {
        return (
            <div id="notes-section">
                <p id="select-categories-info">Please select categories</p>
            </div>
        );
    }

    return (
        <div id="notes-section">
            <div id="category-navbar">
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
                    handleDelete={props.handleDelete}
                    selectedCategory={props.selectedCategory}
                />
            </div>
            <div id="notes-list-container">
                <ul
                    style={{
                        textAlign: "center",
                        paddingLeft: "0",
                    }}
                >
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
            </div>
        </div>
    );
}

function EditCategory(props) {
    const handleEditCategory = () => {
        props.handleEditCategory(props.cat);
        props.handleEditSubmit(props.id);
    };

    if (props.editButton === false) {
        return (
            <button
                className="btn btn-link"
                onClick={() => props.setEditButton(true)}
            >
                <h3>{props.selectedCategory.name}</h3>
            </button>
        );
    } else {
        return (
            <div style={{ justifyContent: "center" }}>
                <button
                    className="btn btn-link"
                    onClick={() => props.setEditButton(false)}
                >
                    <h3>{props.selectedCategory.name}</h3>
                </button>
                <div style={{ display: "flex" }}>
                    <input
                        type="text"
                        className="form-control"
                        onChange={props.handleEditInputChange}
                        // value={props.cat.name} // Question -> how to bring value in here.
                    />
                    <input
                        type="submit"
                        className="btn"
                        value="Edit"
                        onClick={handleEditCategory}
                    />
                    <button
                        id="delete-category-btn"
                        className="btn"
                        value={props.selectedCategory.category_id}
                        onClick={(e) => props.handleDelete(e, "value")}
                    >
                        Delete {props.selectedCategory.name}
                    </button>
                </div>
            </div>
        );
    }
}
