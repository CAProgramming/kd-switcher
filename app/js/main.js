var socket = io();
var cal = {};

socket.on('emitCal', (newCal) => {
    cal = newCal;
    vanillaCalendar.init({ disablePastDays: true });
});

function submitInfo() {
    let name = document.getElementById('getName').value;
    let email = document.getElementById('getEmail').value;
    let date = document.getElementById('getDate').value;

    if(confirm('Is the following information correct?\nName: '+name+'\nEmail: '+email+'\nDate: '+date)) {
        socket.emit('inputKD', name, email, date);
        window.location.href = window.location.origin;
    }
}

function dateHasEvent(y, m, d) {
    var key = dateToKey(y, m, d);
    return (cal[key] !== undefined);
}

function dateToKey(y, m, d) {
    var year = y.toString();
    var month = (m.toString().length === 2 ? m.toString() : '0' + m.toString());
    var day = (d.toString().length === 2 ? d.toString() : '0' + d.toString());
    return year + '-' + month + '-' + day;
}

function getEvent(key) {
    var str = '';
    if(cal[key] !== undefined) {
        cal[key].forEach(e => {
            str += '<li class="list-group-item">'+e.name+': '+e.email+'</li>';
        });
    }
    return (str.length > 0 ? '<li class="list-group-item"><b>Available KD Switch(es):</b></li>'+str:'<li class="list-group-item">No KD open on this date.</li>');
}