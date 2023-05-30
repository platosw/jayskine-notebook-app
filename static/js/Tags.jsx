function Tags() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [err, setErr] = React.useState(null);
    const [tags, setTags] = React.useState(null);

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

    return (
        <div id="tags-list">
            <h4>Tags List</h4>
            {tags &&
                tags.map((tag) => {
                    tagId++;
                    return (
                        <a key={`tag-component_${tagId}`} href="#">
                            #{tag}{" "}
                        </a>
                    );
                })}
        </div>
    );
}
