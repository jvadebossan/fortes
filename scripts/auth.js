//redirect to login page if not authenticated
function checkAuth() {
    const auth = localStorage.getItem('auth');
    const actualPage = window.location.href.split('/').pop().split('.')[0];
    auth === actualPage || (actualPage === 'requests' && auth === 'admin') ? null : window.location.href = '/pages/login.html';
}

//logout function
function logout() {
    //remove auth and redirect to login page
    localStorage.removeItem('auth');
    window.location.href = '/pages/login.html';
}

//login function
function login() {
    //get email and password input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //check if email and password are correct
    if (email === 'admin@email.com' && password === '1234') {
        //set auth to true and redirect to admin page
        localStorage.setItem('auth', 'admin');
        window.location.href = '/pages/admin.html';
    }
    if (email === 'user@email.com' && password === '1234') {
        //set auth to true and redirect to admin page
        localStorage.setItem('auth', 'user');
        window.location.href = '/pages/user.html';
    }
}