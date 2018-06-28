import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { ZoneService } from '../../services/zone.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatSnackBar, MatExpansionPanel } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { transition, animate, trigger, keyframes, style  } from '@angular/animations';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { AngularFireObject } from 'angularfire2/database';
import { Item } from '../../model/item';

export const ACTIONS = {
  ITEMS: "items",
  HISTORIC: "historic"
}

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css'],
  animations: [
    trigger('state', [
      transition('void => *',
       animate('525ms cubic-bezier(0.4, 0.0, 0.2, 1)', keyframes([
        style({ minHeight: '0px', overflow: 'hidden', height: '0px' }),
        style({ minHeight: '*', overflow: 'inherit', height: '*' })
    ]))),
    ])
  ],
})
export class ZonesComponent implements OnInit, OnChanges {

  @ViewChild(MatExpansionPanel) formExpansion: MatExpansionPanel;
  displayedColumns = [];
  dataSource:StoreDataSource;
  zoneStream:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  indexZone:string;
  zoneForm: FormGroup;
  items:FormArray;
  historicStand:any[] = [];
  nowDate:string;
  newItemRef:AngularFireObject<any>;
  newItemForm: FormGroup;
  name:FormControl;

  constructor( private route: ActivatedRoute, private router: Router, private zoneService: ZoneService, public snackBar: MatSnackBar, private fb: FormBuilder ) {
    this.route.params.subscribe(this.initIndex.bind(this));
    // this.route.paramMap.pipe(
    //   switchMap(params => this.zoneService.listItems(params.get('zone')))
    // ).map(data => {
    //  return data.map(reduce => {
    //   const obj_payload = reduce.payload.val();
    //    return {value: obj_payload, key: reduce.key };
    //  })
    // })
    // .subscribe(res => this.initZones(res));

    this.route.paramMap.pipe(
      switchMap ( params => {
        const aux_zone = params.get('zone');
        return this.zoneService.listItems( aux_zone, ACTIONS.ITEMS )
        .delay(500);
      })
    )
    .map(( payloads:Array<any> ) => payloads.map(reduce => ({ ...reduce.payload.val(), id: reduce.key, active : false, prevKey: reduce.prevKey }) as Item ) )
    .subscribe(this.testInitZones.bind(this));

    this.newItemForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }


  ngOnInit() {
    const now = new Date();
    this.dataSource = new StoreDataSource( this.zoneStream );
    this.nowDate = `${ now.getUTCMonth() + 1}-${ now.getUTCFullYear() }`
    this.initializeHistoric();
  }

  createItemForm = () => {
    return this.fb.group({
      name: ['', Validators.required],
      serial: ['', Validators.required],
      current_at: ['', Validators.required],
      updated_at: [( new Date() ).getTime(), Validators.required]
    })
  }

  initializeFormIndicate = async ({ name }) => {
    this.zoneForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      items: this.fb.array([ this.createItemForm() ])
    })
  }
  
  generateItemForm() {
    this.items = this.zoneForm.get('items') as FormArray;
    this.items.push( this.createItemForm() )
  }

  // createForm() {
  //  this.name = new FormControl('', Validators.required);
  //  const aux_structure = {
  //   name: this.name
  //  }
  //  this.newItemForm =  new FormGroup({...aux_structure});
  // }

  ngOnChanges() {
    this.newItemForm.reset();
  }

  initIndex({ zone }) {
    this.indexZone = zone;
  }

  testInitZones(items:Array<Item>) {
    this.displayedColumns = ['id', 'name', 'active', 'created_at', 'updated_at'];
    const current_items = this.zoneStream.getValue();

    if ( current_items.length > 0 ) {

      if ( items.length > current_items.length ) {
          const item_new = items.slice(current_items.length , items.length )[0];
          current_items.unshift(item_new)
      } else if ( items.length < current_items.length ) {
        current_items.splice(0, current_items.length)
        current_items.push(...items.reverse());
      }

    } else {

      current_items.push(...items.reverse());
    }
    this.zoneStream.next(current_items);
    this.changeStatusActive();
  }

  initZones(res:Array<any>) {
    res.map( action => ( (action.key === ACTIONS.ITEMS) ?
    this.zoneStream.next( this.initalizeItems(action.value) )  : this.initializeHistoric(action.value) ));
    this.changeStatusActive();
  }

  initalizeItems(items) {
   return Object.entries(items).reduce(( prevValue, currentItem ) => {
      const [key, item] = currentItem;
      prevValue.push( { ...item, id: key, active: false } )
      return prevValue;
    },[]);
  }

  initializeHistoric( historics?:any ) {
    this.zoneService.listItems( this.indexZone, ACTIONS.HISTORIC, this.nowDate )
    .map(data => data.map( history => history.key ) )
    .subscribe(this.handlerHistoric.bind(this))
  }

  handlerHistoric(historics:Array<any>) {
    this.historicStand = historics;
    this.changeStatusActive();
  }

  async addItem() {
    if (this.newItemForm.valid) {
        const { name } = this.newItemForm.value;
        const aux_item = new Item( name.toUpperCase() )
          this.newItemRef = this.zoneService.createItem( this.indexZone.toUpperCase(), name );
          await this.newItemRef.set( aux_item );
          this.newItemForm.reset();
          this.formExpansion.close();
          this.snackBar.open(`${aux_item.name} ha sido creado.`, 'Undo', {
            duration: 2000
          });
      }

    }

  changeStatusActive() {
    const aux_zones = this.zoneStream.getValue();
    this.zoneStream.next(
     aux_zones.map(item => {
       item.active = this.historicStand.includes(item.id);
       return item;
     })
    );
  }
}

export class StoreDataSource extends DataSource<any> {

  constructor( private store: Observable<any> ) {
    super();
  }

  connect(): Observable<any[]> {
    return this.store;
  }

  disconnect() {}
}


