function CategoryContent(props) {
    // const [editId, setEditId] = React.useState();
    // const [selectedCategory, setSelectedCategory] = React.useState(null);

    // if (props.selectedCategory) {
    // const setEditId = (id) => {
    //     props.setEditId(id);
    // };

    // setEditId(props.selectedCategory.category_id);

    // React.useEffect(() => {
    //     if (props.editCategory !== "") {
    //         props.fetchData();
    //     }
    // }, [props.editCategory]); // Continue this part.

    let tagId = 0;

    if (!props.selectedCategory) {
        return <div id="notes-section">Please select categories</div>;
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
                                {note.tags && "Tags "}
                                {note.tags &&
                                    note.tags.split(" ").map((tag) => {
                                        tagId++;
                                        return (
                                            <a key={tagId} href="#">
                                                #{tag}{" "}
                                            </a>
                                        );
                                    })}
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
    // }

    // return (
    //     <div id="notes-section">
    //         <h3>All Notes</h3>
    //         <ul>
    //             {props.notes &&
    //                 props.notes.map((note) => (
    //                     <li key={`note_id_${note.note_id}`}>
    //                         <a href={`/notes/${note.note_id}`}>{note.title}</a>
    //                     </li>
    //                 ))}
    //         </ul>
    //     </div>
    // );
}

function EditCategory(props) {
    const handleEditCategory = () => {
        props.handleEditCategory(props.cat);
        props.handleEditSubmit(props.id);
        // props.handleSelectedCategory(props.cat);
        // do something to trigger re-render of parent (categorycontent)
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
                    value={props.editInput} // Question -> how to bring value in here.
                />
                <input type="submit" onClick={handleEditCategory} />
            </div>
        );
    }
}
