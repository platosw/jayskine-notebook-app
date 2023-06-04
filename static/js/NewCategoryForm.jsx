function NewCategoryForm(props) {
    return (
        <div id="add-category-container">
            <input
                type="text"
                onChange={props.handleInputChange}
                placeholder="Type New Category"
                required
            />
            <input type="submit" onClick={props.handleSubmit} />
        </div>
    );
}
