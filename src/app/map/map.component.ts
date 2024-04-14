import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LegendComponent } from '../legend/legend.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [ LegendComponent
  ],
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  citiesData: any[] = [];
  populationThreshold: number = 500000;
  iconUrl: string = '';
  map: any; // Leaflet map object
  customIconHouse = L.icon({
    iconUrl: 'assets/home.png',
    iconSize: [25, 25], 
    iconAnchor: [12, 25], 
    popupAnchor: [0, -25], 
  });

  customIconCity = L.icon({
    iconUrl: 'assets/location-pin.png',
    iconSize: [38, 38], // Adjust the size as needed
    iconAnchor: [19, 38], // Adjust the anchor point if necessary
    popupAnchor: [0, -38] // Adjust the popup anchor if necessary
  });


  customIconPin = L.icon({
    iconUrl: 'assets/pin.png',
    iconSize: [20, 20], 
    iconAnchor: [10, 20], 
    popupAnchor: [0, -20], 
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCitiesData();
  }

  fetchCitiesData(): void {
    this.http.get<any>('assets/all-cities.json').subscribe(data => {
      this.citiesData = data;
      this.initMap();
    });
  }

  initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 4);


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

   this.updateCitiesDisplay();

  }


  handleSliderChange(event: any): void {
    this.populationThreshold = parseInt(event.target.value);
    // Clear existing markers and re-render the map
    this.map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    this.updateCitiesDisplay()
  }


  updateCitiesDisplay() {
    //Add markers to the map
    this.citiesData.forEach(city => {
      if (city.population > this.populationThreshold) {
        if (city.population > 2000000) {

          L.marker([city.coordinates.lat, city.coordinates.lon], { icon: this.customIconCity })
            .bindPopup(`<h2>${city.name}</h2><p>Population: ${city.population.toLocaleString()}</p><p>Country: ${city.cou_name_en}</p>`)
            .addTo(this.map);
        } else  if (city.population > 500000){
          L.marker([city.coordinates.lat, city.coordinates.lon], { icon: this.customIconHouse })
            .bindPopup(`<h2>${city.name}</h2><p>Population: ${city.population.toLocaleString()}</p><p>Country: ${city.cou_name_en}</p>`)
            .addTo(this.map);
        }
        else {
          L.marker([city.coordinates.lat, city.coordinates.lon], { icon: this.customIconPin })
            .bindPopup(`<h2>${city.name}</h2><p>Population: ${city.population.toLocaleString()}</p><p>Country: ${city.cou_name_en}</p>`)
            .addTo(this.map);
        }
      }
    });
  }

  getCitiesCount(): number {
    return this.citiesData.filter(city => city.population > this.populationThreshold).length;
  }
}
