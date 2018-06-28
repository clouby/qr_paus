import { ZonesComponent } from "./zones.component";
import { ZonesQrComponent } from "./zones-qr/zones-qr.component";

export const ZONES_ROUTES = [
    { path: ':zone', component: ZonesComponent, pathMatch: 'full' },
    { path: ':zone/generate-qr', component: ZonesQrComponent }
];