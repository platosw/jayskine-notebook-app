function CategoryList(props) {
    return (
        <div id="categories-container">
            <ul id="categories-ul">
                <li key="all-notes_1">
                    <button>
                        <a onClick={() => props.setSelectedCategory(null)}>
                            All Notes
                        </a>
                    </button>
                </li>
                {props.categoriesData &&
                    props.categoriesData.map((cat, idx) => (
                        <li key={`category_${cat.category_id}`}>
                            <button
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
