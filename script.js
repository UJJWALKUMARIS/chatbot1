const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    appendMessage('user', userMessage);
    userInput.value = '';

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-r1:free", 
            messages: [{ role: "user", content: userMessage }]
        })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = data.choices[0].message.content;
        appendMessage('bot', botMessage);
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('bot', 'Sorry, I am unable to process your request at the moment.');
    });
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}