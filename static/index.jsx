"use strict";

function CategoryNameForm() {
    const [name, setName] = React.useState("");

    function handleSubmitNewCategory(event) {
        event.preventDefault();
        fetch("/add_category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        })
            .then((data) => {
                console.log(data.status);
                if (data.status == "200") {
                    console.log(
                        "A new category submitted successfully: " +
                            name +
                            data.status
                    );
                } else {
                    throw new Error(
                        "Something went wrong while adding a new category"
                    );
                }
            })

            .catch((error) => console.log(error.message));
    }
    return (
        <form onSubmit={handleSubmitNewCategory}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <input type="submit" />
        </form>
    );
}

function Index() {
    const [error, setError] = React.useState(null);
    const [isLoding, setIsLoading] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [notes, setNotes] = React.useState([]);
    React.useEffect(() => {
        setIsLoading(true);
        fetch("/jayskine.api")
            .then((res) => res.json())
            .then((data) => {
                const [notes, categories] = data;
                if (notes.length > 0) {
                    setNotes(
                        notes
                            .sort((a, b) => a.entry_date - b.entry_date)
                            .reverse()
                    );
                }
                if (categories.length > 0) {
                    setCategories(
                        categories.sort((a, b) => {
                            let keyA = a.name.toLowerCase();
                            let keyB = b.name.toLowerCase();

                            if (keyA < keyB) return -1;
                            if (keyA > keyB) return 1;
                            return 0;
                        })
                    );
                }
            })
            .catch((error) => {
                setError(error.message);
            })

            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoding) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <div id="categories">
                <h3>All Categories</h3>
                <CategoryNameForm />
                <ul>
                    {categories &&
                        categories.map((category) => (
                            <li key={`category_${category.category_id}`}>
                                <a href={`/categories/${category.category_id}`}>
                                    {category.name}
                                </a>
                            </li>
                        ))}
                </ul>
            </div>
            <div id="notes">
                <h3>All Notes</h3>
                <ul>
                    {notes &&
                        notes.map((note) => (
                            <li key={`note_${note.note_id}`}>
                                <a href={`/notes/${note.note_id}`}>
                                    {note.title}&nbsp;
                                </a>
                            </li>
                        ))}
                </ul>
                <button>
                    <a href="/create_note">Add a new Note</a>
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(<Index />, document.querySelector("#main"));
