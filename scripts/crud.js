//get url params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ongId = urlParams.get('id')

//edit ong if ongId is present on url params
if (ongId) {
    const ongs = JSON.parse(localStorage.getItem('ongs')) || [];
    editOng(ongs);
    document.getElementById('submit').value = 'Editar Cadastro';
}

//redirect function
function redirect(path) {
    const newUrl = window.location.origin + path;
    window.location.href = newUrl;
}

//create ong card fyunction
function createElement(tag, className, innerText = '', type = '', value = null, onClick = null) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerText) element.innerText = innerText;
    if (type) element.type = type;
    if (onClick) element.onclick = onClick;
    if (value) element.value = value;
    return element;
}

//edit ong function
function editOng(ongs) {
    //veirfy if ong exists
    const ong = ongs.find(o => o.cnpj === ongId);
    if (ong === undefined) {
        alert('Ong não encontrada');
        return;
    }
    //set ong data in form (using for)
    const formFields = ['cnpj', 'name', 'email', 'phone', 'cep', 'block', 'number', 'password'];
    formFields.forEach((field) => {
        document.getElementById(field).value = ong[field]
    });
}

//add ong function
function addOng() {
    let statusMsg = 'Cadastro realizado com sucesso';
    //get ongs from local storage
    const ongs = JSON.parse(localStorage.getItem('ongs')) || [];

    //get ong data from form
    const ongData = {
        cnpj: document.getElementById('cnpj').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        cep: document.getElementById('cep').value,
        block: document.getElementById('block').value,
        number: document.getElementById('number').value,
        password: document.getElementById('password').value
    }

    //verify if all fields are filled
    if (!Object.values(ongData).every(v => v)) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    //veirify if ong already exists
    if (ongs.find(o => o.cnpj === ongData.cnpj) && !ongId) {
        alert('ONG já cadastrada');
        return;
    }

    //update ongs in local storage if Editing
    if (ongId) {
        console.log('editing')
        //update ong data on local storage
        const ongIndex = ongs.findIndex(o => o.cnpj === ongId);
        ongs[ongIndex] = ongData;
        localStorage.setItem('ongs', JSON.stringify(ongs));
        statusMsg = 'Cadastro atualizado com sucesso';
        alert(statusMsg);
        redirect('/index.html');
        return
    }
    //else just add new ong
    ongs.push(ongData);
    localStorage.setItem('ongs', JSON.stringify(ongs));
    alert(statusMsg);
    redirect('/index.html');

}

//delete ong function
function deleteOng(cnpj) {
    //get ongs from local storage
    const ongs = JSON.parse(localStorage.getItem('ongs')) || [];
    //delete ong
    const newOngs = ongs.filter(o => o.cnpj !== cnpj);
    localStorage.setItem('ongs', JSON.stringify(newOngs));
    alert('Cadastro deletado com sucesso');
    redirect('/pages/admin.html');
}

//get ongs and show on screen
function getOngs() {
    const ongs = JSON.parse(localStorage.getItem('ongs')) || [];

    if (ongs.length === 0) {
        alert('Nenhuma ONG cadastrada');
        redirect('/pages/admin.html');
        return;
    }

    const ongsContainer = document.getElementsByClassName('requests')[0];
    ongsContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();

    //create card for each ong and append to card container
    ongs.forEach(ong => {
        const card = createElement('div', 'cardRequest row jbetween acenter');

        const textDiv = createElement('div', 'requestText column jstart acenter');
        textDiv.appendChild(createElement('p', 'text2', ong.name));
        textDiv.appendChild(createElement('p', 'text4', `CNPJ: ${ong.cnpj}`));
        textDiv.appendChild(createElement('p', 'text4', `E-mail: ${ong.email}`));
        textDiv.appendChild(createElement('p', 'text4', `Telefone: ${ong.phone}`));

        const btnsDiv = createElement('div', 'requestBtns column jcenter acenter');
        btnsDiv.appendChild(createElement('input', 'btn', 'Deletar', 'button', 'Deletar', () => deleteOng(ong.cnpj)));
        btnsDiv.appendChild(createElement('input', 'btn', 'Editar', 'button', 'Editar', () => editOng(redirect(`/pages/edital.html?id=${ong.cnpj}`))));

        card.appendChild(textDiv);
        card.appendChild(btnsDiv);
        fragment.appendChild(card);
    });

    ongsContainer.appendChild(fragment);
}