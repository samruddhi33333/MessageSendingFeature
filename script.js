document.getElementById('smsForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const toNumber = document.getElementById('toNumber').value;
    const message = document.getElementById('message').value;
    
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'Sending message...';

    try {
        const response = await fetch('/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                toNumber: toNumber,
                message: message
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            responseDiv.innerHTML = 'Message sent successfully!';
            responseDiv.style.color = 'green';
        } else {
            responseDiv.innerHTML = 'Error sending message.';
            responseDiv.style.color = 'red';
        }
    } catch (error) {
        responseDiv.innerHTML = 'Error sending message.';
        responseDiv.style.color = 'red';
    }
});
