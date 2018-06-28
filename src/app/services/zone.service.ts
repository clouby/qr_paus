import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/Rx';
import { Item } from '../model/item';

@Injectable()
export class ZoneService {

    url_join = (...args) => ( args.join('/') )
    
    zoneRef:AngularFireObject<any>;
    
    zone_url:string = this.url_join( environment.url_api, 'zones', 'auth' );

    constructor( private http: Http, private db:AngularFireDatabase ) {
    }

    getZones(zone:string): Observable<any | void> {
   
        return this.http.get( this.url_join(this.zone_url, zone) )
         .delay(2000)
         .map(res => res.json());
    
    }

    createItem( zone:string, itemName:string) {
        const item = new Item(itemName);
        const itemKey = this.db.list( this.url_join( environment.root_tree, zone.toUpperCase(), "items" ) )
                        .push( item ).key;
        return this.db.object(`/Zones/${zone.toUpperCase()}/items/${itemKey}`);
    }

    updateItem(zoneRef:AngularFireObject<any>, data:Item) {
        zoneRef.update(data);
    }

    listItems( zone:string, action:string = "", ps_date:string = "" ) {
        console.log( this.url_join( environment.root_tree, zone.toUpperCase(), action, ps_date ) );
        return this.db.list( this.url_join( environment.root_tree, zone.toUpperCase(), action, ps_date ) ).snapshotChanges()
        .delay(200);
    }


}