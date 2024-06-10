//get url params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ongId = urlParams.get('id')

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

function ongRequest(){
    
    const ong = {
        cnpj: document.getElementById('cnpj').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        cep: document.getElementById('cep').value,
        block: document.getElementById('block').value,
        number: document.getElementById('number').value,
        password: document.getElementById('password').value
    }

    const ongs = JSON.parse(localStorage.getItem('ongs')) || [];
    ongs.push(ong);
    localStorage.setItem('ongs', JSON.stringify(ongs));
}