import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { FooterComponent } from '../footer/footer.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NavbarComponent, GameCardComponent, FooterComponent, ChatComponent, CommonModule],
})
export class HomeComponent implements OnInit {
  username: string = '';
  games: { id: number, title: string, description: string, gameLink: string, imgUrl: string}[] = [
    { 
      id: 1,
      title: 'Ahorcado', 
      description: 'Descubre la palabra secreta antes de acabar tus vidas', 
      gameLink: '/games/ahorcado',
      imgUrl: '../../assets/games/hangman.webp'  
    },
    { 
      id: 2, 
      title: 'Mayor o Menor', 
      description: 'Description 2', 
      gameLink: '/games/mayor-menor',
      imgUrl: '../../assets/games/h_or_l.webp',
    },
    { 
      id: 3, 
      title: 'Preguntados', 
      description: 'Description 3', 
      gameLink: '',
      imgUrl: '../../assets/games/preguntados.webp',
    },
    { 
      id: 4, 
      title: 'Juego Propio', 
      description: 'Description 4', 
      gameLink: '',
      imgUrl: '../../assets/games/own_game.webp',
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
  }
}
