function CategoryContent(props) {
    if (!props.selectedCategory) {
        return (
            <div className="select-comment text-center">
                <p>Please select categories</p>
            </div>
        );
    }

    if (!props.selectedCategory.notes[0]) {
        return (
            <div className="m-4">
                <div>
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
                <p className="text-center">This category is empty.</p>
            </div>
        );
    }

    const truncateString = (str) => {
        if (str.length > 300) {
            return str.substring(0, 300) + "...";
        }
        return str;
    };

    return (
        <div className="m-4">
            <div>
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
                <ul>
                    {props.selectedCategory.notes &&
                        props.selectedCategory.notes
                            .sort((a, b) => b.entry_date - a.entry_date)
                            .map((note) => (
                                <li
                                    key={`note_${note.note_id}`}
                                    className="border border-0 shadow p-0 mb-5 rounded"
                                >
                                    <div className="card border border-0">
                                        <div className="card-header border border-bottom-0 shadow p-2 bg-body-tertiary">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                class="bi bi-archive-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                                            </svg>{" "}
                                            {note.category_id &&
                                                note.category.name}
                                        </div>
                                        <div className="card-body">
                                            <div className="card-title">
                                                <a
                                                    href={`/notes/${note.note_id}`}
                                                    className="d-flex align-items-center"
                                                >
                                                    <h3 className="mr-2">
                                                        {note.title}
                                                    </h3>
                                                    <p className="mb-0 ms-3">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            class="bi bi-calendar2-check-fill"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-2.6 5.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                                        </svg>{" "}
                                                        {note.entry_date}{" "}
                                                    </p>
                                                </a>
                                            </div>
                                            <p className="card-text">
                                                <p>
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
                                                        note.tags
                                                            .split(" ")
                                                            .map((tag) => {
                                                                return `#${tag} `;
                                                            })}
                                                </p>
                                                <p>
                                                    {truncateString(
                                                        note.body_content
                                                    )}
                                                </p>
                                            </p>
                                            <button className="btn btn-primary border border-0">
                                                <a
                                                    href={`/notes/${note.note_id}`}
                                                    style={{ color: "white" }}
                                                >
                                                    Go Detail
                                                </a>
                                            </button>
                                        </div>
                                    </div>
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
            <div className="text-center">
                <button
                    className="btn btn-link category-name"
                    onClick={() => props.setEditButton(true)}
                >
                    <h4>{props.selectedCategory.name}</h4>
                </button>
            </div>
        );
    } else {
        return (
            <div className="mb-4">
                <div className="text-center">
                    <button
                        className="btn btn-link category-name"
                        onClick={() => props.setEditButton(false)}
                    >
                        <h4 id="all-notes-title">
                            {props.selectedCategory.name}
                        </h4>
                    </button>
                </div>
                <div
                    style={{
                        display: "flex",
                        minWidth: "320px",
                    }}
                    className="d-flex justify-content-center"
                >
                    <input
                        type="text"
                        className="form-control"
                        onChange={props.handleEditInputChange}
                        style={{ maxWidth: "250px", maxHeight: "38px" }}
                        placeholder={`Update ${props.selectedCategory.name} name`}
                        // value={props.cat.name} // Question -> how to bring value in here.
                    />
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Edit"
                        style={{ marginBottom: "0" }}
                        onClick={handleEditCategory}
                    />
                    <button
                        id="delete-category-btn"
                        className="btn btn-danger"
                        value={props.selectedCategory.category_id}
                        style={{ marginBottom: "0" }}
                        onClick={(e) => props.handleDelete(e, "value")}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}
