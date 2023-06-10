function Tags() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [err, setErr] = React.useState(null);
    const [notes, setNotes] = React.useState(null);
    const [tags, setTags] = React.useState(null);
    const [btn, setBtn] = React.useState(false);
    const [stateTag, setStateTag] = React.useState(null);

    // Fetch notes and tags data from the API
    React.useEffect(() => {
        // Check if the user is logged in
        const isLoggedIn = "{% 'user' in session %}";

        if (isLoggedIn) {
            setIsLoading(true);

            fetch("/jayskine.api")
                .then((res) => res.json())
                .then((data) => {
                    if (data[0].length > 0) {
                        const notes = data[0];
                        let allTags = [];
                        notes.map((note) => {
                            if (note.tags !== "") {
                                const tags = note.tags.split(" ");
                                tags.map((tag) => {
                                    if (allTags.includes(tag) === false) {
                                        allTags.push(tag);
                                    }
                                });
                            }
                        });
                        allTags = allTags.sort();
                        setNotes(notes);
                        setTags(allTags);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setErr(err.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, []);

    // Render loading state
    if (isLoading) {
        return <div id="loading">Loading...</div>;
    }

    // Render error state
    if (err) {
        console.log(err);
        return <div id="error">Error: {err}</div>;
    }

    let tagId = 0;

    // Handle click event on a tag button
    const handleClick = (tag) => {
        if (btn && tag === stateTag) {
            setBtn(false);
            setStateTag(null);
        } else {
            setBtn(true);
            setStateTag(tag);
        }
    };

    return (
        <div id="tags-list">
            {tags && tags.length > 0 && (
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-tags-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                        <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                    </svg>
                    {tags.map((tag) => (
                        <button
                            className={`btn btn-link mx-1${
                                btn && tag === stateTag ? " active" : ""
                            }`}
                            key={`tag-component_${tag}`}
                            onClick={() => handleClick(tag)}
                        >
                            <p className="tags-lists">#{tag}</p>
                        </button>
                    ))}
                </div>
            )}
            {btn && <TagPage tag={stateTag} notes={notes} />}
        </div>
    );
}

const container = document.querySelector("#tags_React");
if (container) {
    ReactDOM.render(<Tags />, container);
}
