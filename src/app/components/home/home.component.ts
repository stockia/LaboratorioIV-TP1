import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NavbarComponent, GameCardComponent, FooterComponent, CommonModule],
})
export class HomeComponent implements OnInit {
  username: string = '';
  games: { id: number, title: string, description: string }[] = [
    { id: 1, title: 'Game 1', description: 'Description 1' },
    { id: 2, title: 'Game 2', description: 'Description 2' },
    { id: 3, title: 'Game 3', description: 'Description 3' },
    { id: 4, title: 'Game 4', description: 'Description 4' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
  }
}
