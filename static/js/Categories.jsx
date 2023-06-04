function Categories() {
    // These states are categories and notes datas, error status and loading status
    const [categoriesData, setCategoriesData] = React.useState(null);
    const [notesData, setNotesData] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    // These states are adding(creating) new category.
    const [input, setInput] = React.useState("");
    const [newCategory, setNewCategory] = React.useState("");

    // These states are selecting and editing category.
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [editButton, setEditButton] = React.useState(false);
    const [editInput, setEditInput] = React.useState("");

    // Fetching categories data function
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/jayskine.api");
            const json = await response.json();

            if (json[1] && json[1].length > 0) {
                setCategoriesData(
                    json[1].sort((a, b) =>
                        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                    )
                );
            } else {
                setCategoriesData([]);
            }

            setIsLoading(false);
        } catch (err) {
            setErr(err.message);
            setIsLoading(false);
        }
    };

    // This is callback fetchData function when a category is added or updated.
    React.useEffect(() => {
        if (newCategory !== "") {
            fetchData();
        }
    }, [newCategory]);

    // This is fetching categories and notes datas
    React.useEffect(() => {
        setIsLoading(true);
        fetch("/jayskine.api")
            .then((res) => res.json())
            .then((response) => {
                if (response[1].length > 0) {
                    setCategoriesData(
                        response[1].sort(
                            (a, b) =>
                                a.name.toLowerCase() - b.name.toLowerCase()
                        )
                    );
                }

                if (response[0].length > 0) {
                    setNotesData(
                        response[0]
                            .sort((a, b) => a.entry_date - b.entry_date)
                            .reverse()
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                setErr(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // New category name handler
    const handleInputChange = (evt) => {
        setInput(evt.target.value);
    };

    // Posting new category form
    const handleSubmit = () => {
        if (input.trim() === "") {
            console.log("New category is empty.");
            return;
        }

        fetch("/add_category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: input }),
        })
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    console.log(
                        "A new category submitted successfully: " +
                            input +
                            ", " +
                            response.status
                    );
                    setInput("");
                    setNewCategory(input);
                    fetchData();
                } else {
                    throw new Error(
                        "Something went wrong while adding a new category."
                    );
                }
            })
            .catch((error) => console.log(error.message));
    };

    // Updating category name handler
    const handleEditInputChange = (evt) => {
        setEditInput(evt.target.value);
    };

    // Edit button click handler
    const handleEditCategory = (category) => {
        setSelectedCategory(category);
    };

    // Post edit category form
    const handleEditSubmit = (id) => {
        if (editInput.trim() === "") {
            console.log("New category is empty.");
            return;
        }

        fetch("/edit_category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: editInput, id: id }),
        })
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    console.log(
                        "This category submitted successfully: " +
                            editInput +
                            ", " +
                            response.status
                    );
                    return response.json();
                } else {
                    throw new Error(
                        `Something went wrong while updating ${editInput} category.`
                    );
                }
            })
            .then((data) => {
                console.log(data);
                setInput("");
                setNewCategory(input);
                setCategoriesData((prev) => {
                    prev[selectedCategory] = data;
                    return [...prev];
                });
                fetchData();
            })
            .catch((error) => console.log(error.message));
    };

    // Deleting a category handler
    const handleDelete = (e) => {
        fetch(`/delete_category/${e.target.value}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log("This category removed successfully.");
                    fetchData();
                } else {
                    throw new Error(
                        "Something went wrong while removing this category."
                    );
                }
            })
            .catch((error) => console.log(error.message));

        setSelectedCategory(null);
    };

    // During loading
    if (isLoading) {
        return <div id="loading">Loading...</div>;
    }

    // Occuring error
    if (err) {
        return <div id="error">Error: {err}</div>;
    }

    return (
        <div id="lists-container">
            <div id="categories-section">
                <h3>Categories</h3>
                <CategoryList
                    setSelectedCategory={setSelectedCategory}
                    categoriesData={categoriesData}
                />
                <NewCategoryForm
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            {selectedCategory !== null ? (
                <CategoryContent
                    selectedCategory={categoriesData[selectedCategory]}
                    handleDelete={handleDelete}
                    editButton={editButton}
                    setEditButton={setEditButton}
                    editInput={editInput}
                    handleEditInputChange={handleEditInputChange}
                    handleEditSubmit={handleEditSubmit}
                    handleEditCategory={handleEditCategory}
                    fetchData={fetchData}
                />
            ) : (
                <AllNotes notes={notesData} />
            )}
        </div>
    );
}
