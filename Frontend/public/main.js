function sendNewsletter() {
    const email = document.getElementById('emailInput').value;
    const message = document.getElementById('message');

    fetch('http://localhost:3000/send-newsletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.text())
    .then(data => {
        //console.log(data);
        message.textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
        message.textContent = 'Failed to send newsletter.';
    });
}
