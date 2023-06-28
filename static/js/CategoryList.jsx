function CategoryList(props) {
    return (
        <div id="categories-container">
            <ul id="categories-ul" className="list-unstyled">
                <li key="all-notes_1">
                    <button
                        className="btn btn-link category-name"
                        style={{ marginBottom: "0" }}
                        onClick={() => props.setSelectedCategory(null)}
                    >
                        All Notes
                    </button>
                </li>
                {props.categoriesData &&
                    props.categoriesData.map((cat, idx) => (
                        <li key={`category_${cat.category_id}`}>
                            <button
                                className="btn btn-link category-name"
                                style={{ marginBottom: "0" }}
                                onClick={() => props.setSelectedCategory(idx)}
                            >
                                {cat.name}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
