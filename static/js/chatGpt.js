function getSelectedText() {
    var textarea = document.querySelector(".messageInput");
    return textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
    );
}

function checkShortcut(event) {
    if (event.ctrlKey && event.shiftKey && event.key === "S") {
        event.preventDefault();
        var selectedText = getSelectedText();
        if (selectedText !== "") {
            sendMessage(selectedText);
        }
    }
}

function sendMessage(selectedText) {
    document.querySelector("#chat-loading-msg").style.display = "block";

    var chatHistory = [];

    var data = {
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

            let textarea = document.querySelector(".messageInput");
            let startPos = textarea.selectionStart;
            let endPos = textarea.selectionEnd;
            let responseText = response.message;
            let updatedText =
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
