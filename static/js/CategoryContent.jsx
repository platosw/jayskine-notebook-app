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
                            .sort((a, b) => b.entry_date - a.entry_date)
                            .map((note) => (
                                <li
                                    className="note-card"
                                    key={`note_${note.note_id}`}
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
