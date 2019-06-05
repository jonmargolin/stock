import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	private socket: SocketIOClient.Socket;
	constructor() {
		this.socket = io('http://localhost:5000/');
	}

	// HANDLER
	onNewMessage() {
		return Observable.create(observer => {
			this.socket.on('message', msg => {
				observer.next(msg);
			});
			this.socket.on('error', msg => {
				observer.next(msg);
			});
		});
	}
}
