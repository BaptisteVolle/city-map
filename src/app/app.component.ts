import { Component, OnInit } from '@angular/core';
import { RouterOutlet,  } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';

declare let L: any; // Declare Leaflet globally

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    MapComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  constructor(private http: HttpClient) { }

}

