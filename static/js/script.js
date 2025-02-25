/*
بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ  ﷺ  
InshaAllah, By his marcy I will Gain Success 
*/

const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const chatBody = document.getElementById('chatBody');

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage(event = new CustomEvent('click')) {
    event.preventDefault();
    const messageText = messageInput.value.trim();
    if (messageText !== '') {

        const userMessage = document.createElement('div');
        userMessage.classList.add('chat-message', 'user');
        const messageBubble = document.createElement('span');
        messageInput.value = '';

        try { 
            sendBtn.style.transition = 'opacity 400ms ease';
            sendBtn.style.opacity=.65;
            let qr =new URLSearchParams({message : messageText}).toString();
            let response = await fetch(window.location.origin + '/api/message?' + qr, { method: "post" });
            if (response.status ===201){
                messageBubble.textContent = messageText;
                userMessage.appendChild(messageBubble);
                chatBody.appendChild(userMessage);
                chatBody.scrollTop = chatBody.scrollHeight; 
            } 
        } catch (error) {
            console.log(error);
        } finally {
            sendBtn.style.opacity=1;
        }

    }
}

window.addEventListener('DOMContentLoaded', async function () {
    let responses = await fetch(window.location.origin + '/api/message');
    let messages = responses.status === 200 ? (await responses.json()) : [];
    for (let i = 0; i < messages.length; i++) {
        let message = messages[i];
        if (message.name === 'user') {
            const userMessage = document.createElement('div');
            userMessage.classList.add('chat-message', 'user');
            const messageBubble = document.createElement('span');
            messageBubble.textContent = message.message;
            userMessage.appendChild(messageBubble);
            chatBody.appendChild(userMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
            chatBody.scrollTop = chatBody.scrollHeight;

        }
        if (message.name === 'admin') {
            const adminMessage = document.createElement('div');
            adminMessage.classList.add('chat-message', 'admin');
            const adminBubble = document.createElement('span');
            adminBubble.textContent =message.message;
            adminMessage.appendChild(adminBubble);
            chatBody.appendChild(adminMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

    }
    setUpNotifications()
});


async function setUpNotifications() {
    try {
        if ('serviceWorker' in navigator) {
            const PublicKey = 'BKFdIRoN5yiqnbf71deu6ObttAxCQ8FHq8ATUFd9EPH58YwQaSuECSp8FXSQFZUOmN4TpXkqdpbTbvClblQ2Uc4';
            function urlBase64ToUint8Array(base64String) {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                  .replace(/\-/g, '+')
                  .replace(/_/g, '/');
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                for (let i = 0; i < rawData.length; ++i) {
                  outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            }
            let register = await navigator.serviceWorker.register('/js/sw.js', { scope: '/js/' });
            const subscription = await register.pushManager.subscribe({
                userVisibleOnly :true,
                applicationServerKey : urlBase64ToUint8Array(PublicKey)
            });
            let response =await this.fetch(this.window.location.origin + '/api/notice/user/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                  'Content-Type': 'application/json'
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
  
}