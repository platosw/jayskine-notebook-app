function getSelectedText() {
    const textarea = document.querySelector(".messageInput");
    return textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
    );
}

function checkShortcut(event) {
    if (event.ctrlKey && event.shiftKey && event.key === "S") {
        event.preventDefault();
        const selectedText = getSelectedText();
        if (selectedText !== "") {
            sendMessage(selectedText);
        }
    }
}

function clickChatBtn(event) {
    event.preventDefault();
    const selectedText = getSelectedText();
    if (selectedText !== "") {
        sendMessage(selectedText);
    }
}

function sendMessage(selectedText) {
    document.querySelector("#chat-loading-msg").style.display = "block";

    const chatHistory = [];

    const data = {
        message: selectedText,
        chat_history: chatHistory,
    };

    $.ajax({
        type: "POST",
        url: "/chat",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            document.querySelector("#chat-loading-msg").style.display = "none";

            const textarea = document.querySelector(".messageInput");
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const responseText = response.message;
            const updatedText =
                textarea.value.substring(0, startPos) +
                responseText +
                textarea.value.substring(endPos);
            textarea.value = updatedText;
            textarea.selectionStart = startPos;
            textarea.selectionEnd = startPos + responseText.length;
        },
        error: function (xhr, status, error) {
            console.error(error);
            document.querySelector("#chat-loading-msg").style.display = "none";
        },
    });
}
