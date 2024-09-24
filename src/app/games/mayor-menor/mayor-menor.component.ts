import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit {
  deck: number[] = [];
  currentCard: number = 0;
  nextCard: number = 0;
  points: number = 0;
  message: string = '';
  gameOver: boolean = false;

  ngOnInit() {
    this.startGame();
  }

  constructor() { }

  startGame() {
    this.deck = this.generateDeck();
    this.shuffleDeck();
    this.points = 0;
    this.gameOver = false;
    this.drawInitialCard();
    this.message = '¿Será la siguiente carta mayor o menor?';
  }

  generateDeck(): number[] {
    return Array.from({ length: 13}, (_, i) => i + 1);
  }

  shuffleDeck() {
    this.deck.sort(() => Math.random() - 0.5);
  }

  drawInitialCard() {
    this.currentCard = this.deck.pop() || 0;
  }

  guess(isHigher: boolean) {
    if (this.gameOver) {
      return;
    }

    this.nextCard = this.deck.pop() || 0;

    if (this.nextCard === 0) {
      this.message = 'No hay más cartas en el mazo. ¡Fin del juego!';
      this.gameOver = true;
      return;
    }

    const isCorrect = isHigher
      ? this.nextCard > this.currentCard
      : this.nextCard < this.currentCard;

    if (isCorrect) {
      this.points++;
      this.message = '¡Correcto!';
    } else {
      if (this.points > 0) {
        this.points--;
        this.message = '¡Incorrecto, perdes un punto!';
      } else {
        this.message = '¡Incorrecto!';
      }
    }
    
    this.currentCard = this.nextCard;
  }
}
