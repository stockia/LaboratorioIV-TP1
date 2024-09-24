import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  @Input() gameData: any;

  constructor(private router: Router) {}

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
    return this.gameData?.imgUrl;
  }

  get year() {
    return '2024';
  }

  get gameLink() {
    return this.gameData?.gameLink;
  }
}
