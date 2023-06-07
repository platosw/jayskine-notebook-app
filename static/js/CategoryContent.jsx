function CategoryContent(props) {
    if (!props.selectedCategory) {
        return (
            <div id="notes-section">
                <p id="select-categories-info">Please select categories</p>
            </div>
        );
    }

    return (
        <div id="notes-section" className="notes-grid">
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
                        alignItems: "center",
                        paddingLeft: "0",
                    }}
                >
                    {props.selectedCategory.notes &&
                        props.selectedCategory.notes
                            .sort((a, b) => a.entry_date - b.entry_date)
                            .reverse()
                            .map((note) => (
                                <li
                                    className="note-card"
                                    key={`note_${note.note_id}`}
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
                <h4>{props.selectedCategory.name}</h4>
            </button>
        );
    } else {
        return (
            <div>
                <button
                    className="btn btn-link"
                    onClick={() => props.setEditButton(false)}
                >
                    <h4>{props.selectedCategory.name}</h4>
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
