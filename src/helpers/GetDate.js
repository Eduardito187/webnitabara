export function GetDateToMomment(momment) {
    console.log(momment);
    if (momment._i!=null) {
        return momment._i;
    }else{
        return formatDate(momment._d);
    }
}
export function GetDateToMommentTime(momment) {
    if (momment._i!=null) {
        return formatDateNita(momment._d)+" "+formatTime(momment._d);
    }else{
        return formatDateNita(momment._d)+" "+formatTimeSpanish(momment._d);
    }
}
function formatTimeSpanish(date) {
    return AddCeroToNumber(date.getHours())+":"+AddCeroToNumber(date.getMinutes())+":"+AddCeroToNumber(date.getSeconds());
}
function formatDateNita(date) {
    return AddCeroToNumber(date.getFullYear())+"-"+AddCeroToNumber(date.getMonth())+"-"+AddCeroToNumber(date.getDay());
}
function formatTime(date) {
    var d = new Date(date);
    return AddCeroToNumber(d.getHours())+":"+AddCeroToNumber(d.getMinutes())+":"+AddCeroToNumber(d.getSeconds());
}
function AddCeroToNumber(numero) {
    if (numero < 10) {
        return "0"+numero.toString();
    }else{
        return numero.toString();
    }
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}