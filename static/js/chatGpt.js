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
    var chatHistory = [];

    var data = {
        message: selectedText,
        chat_history: chatHistory,
    };

    $.ajax({
        type: "POST",
        url: "/chat", // 해당하는 엔드포인트의 실제 URL로 변경해야 합니다.
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            var textarea = document.querySelector(".messageInput");
            var startPos = textarea.selectionStart;
            var endPos = textarea.selectionEnd;
            var responseText = response.message;
            var updatedText =
                textarea.value.substring(0, startPos) +
                responseText +
                textarea.value.substring(endPos);
            textarea.value = updatedText;
            textarea.selectionStart = startPos;
            textarea.selectionEnd = startPos + responseText.length;
        },
        error: function (xhr, status, error) {
            console.error(error);
        },
    });
}

function getSelectedTextss() {
    var textarea = document.querySelector('[name="body_content]');
    return textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
    );
}

function checkShortcutss(event) {
    if (event.ctrlKey && event.shiftKey && event.key === "S") {
        event.preventDefault();
        var selectedText = getSelectedTextss();
        if (selectedText !== "") {
            sendMessagess(selectedText);
        }
    }
}

function sendMessagess(selectedText) {
    var chatHistory = [];

    var data = {
        message: selectedText,
        chat_history: chatHistory,
    };

    $.ajax({
        type: "POST",
        url: "/chat", // 해당하는 엔드포인트의 실제 URL로 변경해야 합니다.
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            var textarea = document.querySelector('[name="body_content]');
            var startPos = textarea.selectionStart;
            var endPos = textarea.selectionEnd;
            var responseText = response.message;
            var updatedText =
                textarea.value.substring(0, startPos) +
                responseText +
                textarea.value.substring(endPos);
            textarea.value = updatedText;
            textarea.selectionStart = startPos;
            textarea.selectionEnd = startPos + responseText.length;
        },
        error: function (xhr, status, error) {
            console.error(error);
        },
    });
}
