function NewCategoryForm(props) {
    return (
        <div>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    onChange={props.handleInputChange}
                    placeholder="New Category"
                    required
                />
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={props.handleSubmit}
                    style={{ marginBottom: "0" }}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
