function Categories() {
    const [categoriesData, setCategoriesData] = React.useState(null);
    const [notesData, setNotesData] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [input, setInput] = React.useState("");
    const [newCategory, setNewCategory] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    const handleInputChange = (evt) => {
        setInput(evt.target.value);
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/jayskine.api");
            const json = await response.json();
            console.log(json[1]);

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

    React.useEffect(() => {
        if (newCategory !== "") {
            fetchData();
        }
    }, [newCategory]);

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

    if (isLoading) {
        return <div id="loading">Loading...</div>;
    }

    if (err) {
        return <div id="error">Error: {err}</div>;
    }

    return (
        <div id="lists-container">
            <div id="categories-section">
                <h3>Categories</h3>
                <div id="categories-container">
                    <ul id="categories-ul">
                        <li key="all-notes_1">
                            <button>
                                <a onClick={() => setSelectedCategory(null)}>
                                    All Notes
                                </a>
                            </button>
                        </li>
                        {categoriesData &&
                            categoriesData.map((cat) => (
                                <li key={`category_${cat.category_id}`}>
                                    <button
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
                <div id="add-category-container">
                    <input
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Type New Category"
                        value={input}
                        required
                    />
                    <input type="submit" onClick={handleSubmit} />
                </div>
            </div>
            <CategoryContent
                selectedCategory={selectedCategory}
                notes={notesData}
            />
        </div>
    );
}
