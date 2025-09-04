document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        password: password
    };

    const url = 'http://127.0.0.1:8000/accounts/api/token/'; // JWT token API ünvanı

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
            const accessToken = result.access;
            // Tokeni brauzerin yerli saxlama yerinə (localStorage) saxlamaq
            localStorage.setItem('access_token', accessToken);
            
            messageElement.textContent = "Giriş uğurlu oldu!";
            messageElement.style.color = 'green';
            
            // İstifadəçini admin səhifəsinə yönləndirmək
            window.location.href = 'admin.html'; // Təmsili səhifə
            
        } else {
            messageElement.textContent = 'Giriş uğursuz oldu. İstifadəçi adı və ya şifrə yanlışdır.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Xəta:', error);
        document.getElementById('message').textContent = 'Serverlə əlaqə qurarkən xəta baş verdi.';
        document.getElementById('message').style.color = 'red';
    }
});
