import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
  }

  public sendMessage(message) {
   this.socket.emit('new-message', {data: message});
  }

  public getMessages = () => {
    return Observable.call((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  };


}
