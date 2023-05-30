document.querySelector("#edit-btn").addEventListener("click", () => {
    const query = document.querySelector("#edit_note");

    query.toggleAttribute("hidden");
});
