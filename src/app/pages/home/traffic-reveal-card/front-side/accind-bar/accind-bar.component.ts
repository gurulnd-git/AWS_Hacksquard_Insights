import { Component, Input } from '@angular/core';

@Component({
  selector: 'hacksquad-accind-bar',
  styleUrls: ['./accind-bar.component.scss'],
  templateUrl: './accind-bar.component.html',
})
export class TrafficBarComponent {

  @Input() barData: { prevDate: string; prevValue: number; nextDate: string; nextValue: number };
  @Input() successDelta: boolean;
}
