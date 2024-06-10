//redirect to login page if not authenticated
function checkAuth(){
    const auth = localStorage.getItem('auth');
    auth ? null : window.location.href = '/pages/login.html';
}

//login function
function login(){
    //get email and password input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //check if email and password are correct
    if(email === 'admin' && password === '1234'){
        //set auth to true and redirect to admin page
        localStorage.setItem('auth', true);
        window.location.href = '/pages/admin.html';
    }
}