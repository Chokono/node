'use strict'

const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const server = new http.Server();

server.on('request', (req, res)=>{
	let urlparse = url.parse(req.url);
	if (req.method === 'GET') {
		if (urlparse.path === '/') {
			let stream = fs.createReadStream(path.join(__dirname,'index.html'));
			res.setHeader('Content-Type', 'text/html');
			stream.on('error', (err)=>{
				res.statusCode = 503;
				console.log('error ENOEND', err);
			})
			stream.pipe(res);
		} else {
			let stream = fs.createReadStream(path.join(__dirname, urlparse.path));
			if (path.extname(urlparse.path).slice(1) === 'html' || path.extname(urlparse.path).slice(1) === 'css' || path.extname(urlparse.path).slice(1) === 'js' || path.extname(urlparse.path).slice(1) === 'json') {
				res.setHeader('Content-Type', 'text/'+path.extname(urlparse.path).slice(1));
			}
			stream.on('error', (err)=>{
				res.statusCode = 503;
				console.log('error ENOEND', err);
			})
			stream.pipe(res);
		}
	} else if (req.method === "POST"){
		let buf = [];
		if (req.url === '/submit1'){
			req.on('error', (err)=>{
				console.log('Can not read file', err);
			});
			req.on('data', (data)=>{
				buf.push(data);
			});
			req.on('end', ()=>{
				console.log(Buffer.concat(buf).toString('utf-8'));
			});
			res.end(Buffer.concat(buf).toString('utf-8'));
		} else if (req.url === '/submit2') {
			let obj1 = [];
			req.on('error', (err)=>{
				console.log('Can not read file', err);
			});
			req.on('data', (data)=>{
				buf.push(data);
			});
			req.on('end', ()=>{
				let obj = Buffer.concat(buf).toString('utf-8');
				obj = obj.slice(1,-1).split(':');
				obj1[0] = '{' + obj[1];
				obj1[1] = obj[0]+ '}'
				obj1 = obj1.join(':')
				console.log(obj1.toString());				
			});
			res.end(obj1.toString());
		}
	}
});

server.listen(3000, '127.0.0.1', console.log('Server start at 127.0.0.1:3000'));