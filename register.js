document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Formun avtomatik göndərilməsini dayandırır

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        email: email,
        password: password
    };

    const url = 'http://127.0.0.1:8000/accounts/register/'; // Django API ünvanı

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const messageElement = document.getElementById('message');

        if (response.ok) {
            messageElement.textContent = result.message || "Qeydiyyat uğurlu oldu!";
            messageElement.style.color = 'green';
        } else {
            const errorMessage = Object.values(result).flat().join(' ');
            messageElement.textContent = errorMessage || 'Qeydiyyat zamanı bir xəta baş verdi.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Xəta:', error);
        document.getElementById('message').textContent = 'Serverlə əlaqə qurarkən xəta baş verdi.';
        document.getElementById('message').style.color = 'red';
    }
});
