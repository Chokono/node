document.getElementById('original').addEventListener('click', ()=>{
		send(1);
});

document.getElementById('rebuild').addEventListener('click', ()=>{
		send(2);
});

function send(number){
	if(document.getElementById('key').value.indexOf(":") === -1 &&document.getElementById('value').value.indexOf(":") === -1){
		let xhr = new XMLHttpRequest();
		xhr.open("POST", `/submit${number}`, true);
		xhr.setRequestHeader('Content-Type', 'text/json');
		let data = {};
		data[document.getElementById('key').value] = document.getElementById('value').value;
		xhr.send(JSON.stringify(data));
	} else {
		console.log('вводите числа без знака ":"');
	}
}
