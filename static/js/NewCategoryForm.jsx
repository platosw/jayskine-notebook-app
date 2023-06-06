function NewCategoryForm(props) {
    return (
        <div id="add-category-container" className="container">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    onChange={props.handleInputChange}
                    placeholder="Type New Category"
                    required
                />
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={props.handleSubmit}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
