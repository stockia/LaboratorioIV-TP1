import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  @Input() gameData: any;

  constructor() {}

  get title() {
    return this.gameData?.title;
  }

  get description() {
    return this.gameData?.description;
  }

  get key() {
    return this.gameData?.id;
  }
}
