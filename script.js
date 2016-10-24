document.getElementById('original').addEventListener('click', ()=>{
	let k = document.getElementById('key').value;
	let data = {};
	data[k] = document.getElementById('value').value;
	send(data);
});

document.getElementById('rebuild').addEventListener('click', ()=>{
	let k = document.getElementById('value').value;
	let data = {};
	data[k] = document.getElementById('key').value;
	send(data);
	document.getElementById('result').innerHTML = 'fff';
});

function send(body){
	let xhr = new XMLHttpRequest();
	xhr.open("POST", '/submit', true);
	xhr.setRequestHeader('Content-Type', 'text/json');
	xhr.send(JSON.stringify(body));
}
