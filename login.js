document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        password: password
    };

    // Django JWT token API-sinin ünvanı
    const url = 'http://127.0.0.1:8000/accounts/api/token/'; 

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
            // Tokeni brauzerin localStorage-ına (yerli yaddaşına) yadda saxlamaq
            localStorage.setItem('access_token', accessToken);
            
            messageElement.textContent = "Giriş uğurlu oldu!";
            messageElement.style.color = 'green';
            
            // Uğurlu girişdən sonra istifadəçini digər səhifəyə yönləndirmək
            // Məsələn, dashboard.html səhifəsinə
            window.location.href = 'dashboard.html'; 
            
        } else {
            // Səhvləri göstərmək üçün
            const errorMessage = Object.values(result).flat().join(' ');
            messageElement.textContent = errorMessage || 'Giriş uğursuz oldu. İstifadəçi adı və ya şifrə yanlışdır.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Xəta:', error);
        document.getElementById('message').textContent = 'Serverlə əlaqə qurarkən xəta baş verdi.';
        document.getElementById('message').style.color = 'red';
    }
});
