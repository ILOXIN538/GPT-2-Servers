
const chatbox = document.getElementById('chatbox');
const input = document.getElementById('input');
const sendButton = document.getElementById('sendButton');

document.getElementById('temperature').addEventListener('input', (e) => {
    document.getElementById('tempValue').textContent = e.target.value;
});

document.getElementById('maxLength').addEventListener('input', (e) => {
    document.getElementById('lengthValue').textContent = e.target.value;
});

sendButton.addEventListener('click', async () => {
    const prompt = input.value;
    if (!prompt) return;

    // Add user message
    chatbox.innerHTML += `<div class="message user-message">${prompt}</div>`;
    input.value = '';

    try {
        const temperature = document.getElementById('temperature').value;
        const maxLength = document.getElementById('maxLength').value;
        const response = await fetch('/gpt2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                prompt,
                temperature: parseFloat(temperature),
                maxLength: parseInt(maxLength)
            })
        });
        const data = await response.json();
        
        // Add AI response
        chatbox.innerHTML += `<div class="message ai-message">${data[0].generated_text}</div>`;
    } catch (error) {
        console.error('Error:', error);
    }
});
