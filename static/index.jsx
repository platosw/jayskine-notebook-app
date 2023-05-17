"use strict";

function Index() {
    const [error, setError] = React.useState(null);
    const [isLoding, setIsLoading] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [notes, setNotes] = React.useState([]);
    const [formInput, setFormInput] = React.useState("");

    function formSubmitHandler(formInput){
        setFormInput(formInput);
    }


    let input_field = "";

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

    let tag_id = 1;

    if (isLoding) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div id="index-container">
            <div id="categories">
                <h3>All Categories</h3>
                    <CategoryInput submitHandler={submitHandler}/>
                <ul>
                    <NewCategories input={input} />
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
                                <span>
                                    Tags:
                                    {note.tags &&
                                        note.tags.split(" ").map((tag) => {
                                            const output = (
                                                <a key={tag_id} href="#">
                                                    #{tag}&nbsp;
                                                </a>
                                            );
                                            tag_id++;
                                            return output;
                                        })}
                                </span>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

function NewCategories(props) {
    const [categories, setCategories] = React.useState([]);

    // function handleSubmitNewCategory(event) {
        fetch("/add_category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: props.input }),
        })
            .then((response) => {
                if (response.status == "200") {
                    console.log(
                        "A new category submitted successfully: " +
                            response.status
                    );

                    setCategories(...categories.push(props.input));
                } else {
                    console.log(response.status);
                }
            })
            .catch((error) => console.log(error.message));
    // }

    return (
        <div>
            {categories &&
                categories.map((category) => (
                    <li key={`category_${category.category_id}`}>
                        <a href={`/categories/${category.category_id}`}>
                            {category.name}
                        </a>
                    </li>
                ))}
        </div>
    );
}



function CategoryInput() {
    const [input, setInput] = React.useState("");
    
    
    return (
        <form onSubmit={props.submitHandler(input)}>
            <label>
            Name:

        
        </label>

        <input
            type="text"
            value={input}
            onChange={(e) => {
            setInput(e.target.value);
        }}
        />
    
     <input type="submit" />
    </form> 

    )

// { <input
// type="text"
// value={input_field}
// onChange={(e) => {

//     Name:
//     <input
//       type="text"
//       value={input_field}
//       onChange={(e) => {

//       input_field = event.target.value;

//       setName(e.target.value);
//       }
//   />

//     input_field = event.target.value;

//     setName(e.target.value);
// }}
// />

//     return (

//     );
// }

ReactDOM.render(<Index />, document.querySelector("#main"));
