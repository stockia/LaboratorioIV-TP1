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

  get imageUrl() {
    // return `https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.bandainamcoent.eu%2Fpac-man&psig=AOvVaw33z_CIUeL1wIYxib-kK3wh&ust=1727104626843000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPj545_s1ogDFQAAAAAdAAAAABAE`;
    return '';
  }

  get year() {
    return '2024';
  }
}
