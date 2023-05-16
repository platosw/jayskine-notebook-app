"use strict";
// do not use "React.useState" or "React.useEffect" directly
// import those hooks as below from react module

// use functional component with hooks for better performance
// place subcomponent(CategoryNameForm) outside and before main component(Index)
function CategoryNameForm() {
    const [name, setName] = React.useState("");
    // try to give contextual name as much as you can for debug or issue handling later
    function handleSubmitNewCategory(event) {
        // event.preventDefault();
        fetch("/add_category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        })
            .then((data) => {
                // need return data validation
                // I'm not sure which status will be returned here in case of success
                // let's assume it is '200' here
                console.log(data.status);
                if (data.status == "200") {
                    console.log(
                        "A new category submitted successfully: " +
                            name +
                            data.status
                    );
                } else {
                    // throw an error in case of failure
                    // so that we can check where the error coming from
                    throw new Error(
                        "Something went wrong while adding a new category"
                    );
                }
            })
            // don't forget to add "catch" after "then"
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
        // 'isLoading' is more common usecase than 'isLoaded'
        setIsLoading(true);
        fetch("/jayskine.api")
            .then((res) => res.json())
            .then((data) => {
                const [notes, categories] = data;
                if (notes.length > 0) {
                    setNotes(notes);
                }
                if (categories.length > 0) {
                    setCategories(categories);
                }
            })
            .catch((error) => {
                setError(error.message);
            })
            // you can add 'finally' for final actions regardless of success or failure
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    // no need 'else' block since we will return a component
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
                                    {note.title}
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
