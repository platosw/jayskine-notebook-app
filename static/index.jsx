"use strict";

function Index() {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch("/jayskine.api")
            .then((res) => res.json())
            .then(
                (response) => {
                    setIsLoaded(true);
                    setData(response);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        const notes = data[0];
        const categories = data[1];

        class CategoryNameForm extends React.Component {
            constructor(props) {
                super(props);
                this.state = { name: "" };

                this.handleChange = this.handleChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
            }

            handleChange(event) {
                this.setState({ name: event.target.value });
            }

            handleSubmit(event) {
                fetch("/add_category", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: this.state.name }),
                })
                    .then((res) => res.json())
                    .then((responseJson) => {
                        alert(
                            "A category was submitted: " +
                                this.state.name +
                                responseJson.status
                        );
                        event.preventDefault();
                    });
            }

            render() {
                return (
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                );
            }
        }

        return (
            <div>
                <div id="categories">
                    <h3>All Categories</h3>
                    <ul>
                        {categories &&
                            categories.map((cat) => (
                                <li key={cat.category_id}>
                                    <a href={`/categories/${cat.category_id}`}>
                                        {cat.name}
                                    </a>
                                </li>
                            ))}
                    </ul>
                    <CategoryNameForm />
                </div>
                <div id="notes">
                    <h3>All Notes</h3>
                    <ul>
                        {notes &&
                            notes.map((note) => (
                                <li key={note.note_id}>
                                    <a href={`/notes/${note.note_id}`}>
                                        {note.title}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.querySelector("#main"));
