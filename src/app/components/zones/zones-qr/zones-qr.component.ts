import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../../../services/zone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ACTIONS } from '../zones.component';

@Component({
  selector: 'app-zones-qr',
  templateUrl: './zones-qr.component.html',
  styleUrls: ['./zones-qr.component.css']
})
export class ZonesQrComponent  {

  itemsQR:Array<any> = [];
 
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private zoneService: ZoneService) {
      this.route.paramMap.pipe(
        switchMap(params => this.zoneService.listItems(params.get('zone'), ACTIONS.ITEMS))
      )
      .map(data => {
        return data.map(item => {
          return { ...item.payload.val(), id: item.key }
        })
      })
      .subscribe(res =>  this.initQRZones(res)  );
   }

  initQRZones(res) { this.itemsQR = res; }


}
