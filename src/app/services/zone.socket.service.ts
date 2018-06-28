import { Injectable } from "@angular/core";
import { Socket } from "ng-socket-io";

@Injectable()
export class SocketZone {
    constructor( private socket: Socket ) {}

    sendCurrentZone(text?) {
        this.socket.emit( "message", "hola desde angular" + text );
    }

    getStatus() {
       return this.socket.fromEvent("message")
            .map(data => data);
    }


}