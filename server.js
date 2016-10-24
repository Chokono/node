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
			stream.pipe(res);
		} else {
			let stream = fs.createReadStream(path.join(__dirname, urlparse.path));
			if (path.extname(urlparse.path).slice(1) === 'html' || path.extname(urlparse.path).slice(1) === 'css' || path.extname(urlparse.path).slice(1) === 'js' || path.extname(urlparse.path).slice(1) === 'json') {
				res.setHeader('Content-Type', 'text/'+path.extname(urlparse.path).slice(1));
			} else {
				res.setHeader('Content-Type', 'text/text');
			}
			let mas = [];
			stream.on('error', (err)=>{
				if (path.extname(urlparse.path)) {
					res.statusCode = 503;
					console.log('file not read', err);
				} else {
					res.statusCode = 404;
					console.log('Directory not found', err);
				}
			})
			stream.on('readable', ()=>{
				let data = stream.read();
				mas.push(data);
			});
			stream.on('end', ()=>{
				mas.length = mas.length-1;
				res.end(Buffer.concat(mas).toString('utf-8'));
			});
		}
	} else if (req.method === "POST"){
		let buf = [];
		req.on('error', (err)=>{
			console.log('Can not read file', err);
		})
		req.on('data', (data)=>{
			buf.push(data);
		});
		req.on('end', ()=>{
			console.log(Buffer.concat(buf).toString('utf-8'));
		});
		res.end(Buffer.concat(buf).toString('utf-8'));
	}
});

server.listen(3000, '127.0.0.1', console.log('Server start at 127.0.0.1:3000'));