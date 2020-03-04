import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newMessage: string;
  messageList: object[] = [];
  socket: SocketIOClient.Socket;
  myCurrentId;

  constructor() {
    this.socket = io('http://localhost:3000', {autoConnect: true});
    this.myCurrentId = Math.random() * 100 + '' + Math.random() * 100 + '' + Math.random() * 100;
    // this.socket.connect();
  }

  sendMessage() {
    this.socket.emit('chat message', {data: this.newMessage, id: this.myCurrentId});
    this.newMessage = '';
  }

  ngOnInit() {
    this.socket.on('chat message', (data) => {
      this.messageList.push(data);
    });
  }

}
