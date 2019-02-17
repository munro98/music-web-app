// Format time, 360s = 6:00, 3600s = 1:00:00
function formatTime(number){
	let hours	= Math.floor(number / 3600);
	let minutes = Math.floor((number - hours * 3600) / 60);
    let seconds = Math.floor(number - hours * 3600 - minutes * 60);
    let dur = 0;
	if (seconds < 10) {
		seconds = "0" + seconds
	}
	if(hours < 1){
		dur = minutes + ":" + seconds;
	} else {
		if (minutes < 10) {
			minutes = "0" + minutes
		}
		dur = hours + ":" + minutes + ":" + seconds;
	}
	return dur;
}
// Format number, 9999999 = 9.999.999
function formatNumber(number) {
    number += '';
    let x = number.split('.');
    let x1 = x[0];
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1;
}