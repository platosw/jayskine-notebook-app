function Tags() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [err, setErr] = React.useState(null);
    const [notes, setNotes] = React.useState(null);
    const [tags, setTags] = React.useState(null);
    const [btn, setBtn] = React.useState(false);
    const [stateTag, setStateTag] = React.useState(null);

    React.useEffect(() => {
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
    }, []);

    if (isLoading) {
        return <div id="loading">Loading...</div>;
    }

    if (err) {
        return <div id="error">Error: {err}</div>;
    }

    let tagId = 0;

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
            {tags && tags.length > 0 && <h4>Tags List</h4>}
            {tags &&
                tags.map((tag) => {
                    tagId++;
                    return (
                        <button
                            className="tag-btn"
                            key={`tag-component_${tagId}`}
                            onClick={() => handleClick(tag)}
                        >
                            #{tag}
                        </button>
                    );
                })}

            {btn && <TagPage tag={stateTag} notes={notes} />}
        </div>
    );
}
