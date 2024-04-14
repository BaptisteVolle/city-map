import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss'
})
export class LegendComponent {

  legendItems: { label: string, icon: string }[] = [
    { label: 'Large City ( > 5m) ', icon: 'assets/location-pin.png' },
    { label: 'Medium City ( > 500,000)', icon: 'assets/home.png' },
    { label: 'Small City', icon: 'assets/pin.png' }
  ];
}
