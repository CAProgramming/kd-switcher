var socket = io();

function promptInfo() {
    document.getElementById('infoPopup').removeAttribute('hidden');
}

function submitInfo() {
    let name = document.getElementById('getName').value;
    let email = document.getElementById('getEmail').value;
    let date = document.getElementById('getDate').value;

    if(confirm('Is the following information correct?\nName: '+name+'\nEmail: '+email+'\nDate: '+date)) {
        socket.emit('inputKD', name, email, date);
        window.location.replace('index.html');
    }
}