
const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form');

// HABILITAR e DESABILITAR BOTÃO "PLAY"
const validateInput = ({target}) => {
    if (target.value.length > 2 ){
        button.removeAttribute('disabled');
    }else{
        button.setAttribute('disabled', '')
    }
}

// SALVAR NOME DO JOGADOR
handleSubmit = (event) => {
    event.preventDefault(); // Remove o "comportamento" padrão do submit
    localStorage.setItem('player', input.value); // Salva o nome no Local Storage
    window.location = 'pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
