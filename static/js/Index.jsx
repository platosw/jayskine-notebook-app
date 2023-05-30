"use strict";

function Index() {
    return (
        <div id="index-container">
            <Tags />
            <Categories />
        </div>
    );
}

ReactDOM.render(<Index />, document.querySelector("#main"));
