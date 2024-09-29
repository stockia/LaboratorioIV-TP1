import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService, DeckResponse, CardResponse } from '../../services/card-game.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {
  deckId: string = '';
  points: number = 0;
  message: string = '';
  gameOver: boolean = false;
  currentCard: any;
  newCard: any;
  prevCard: any;
  isLoadingCurrentCard: boolean = true;

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.startGame();

  }

  async startGame() {
    try {
      const response: DeckResponse = await firstValueFrom(this.cardService.getDeck());
      this.deckId = response.deck_id;
      this.points = 10;
      await this.drawCard();
      this.currentCard = this.newCard;
      this.isLoadingCurrentCard = false;
      this.message = '¡Mazo de cartas creado! ¿Listo para jugar?';
    } catch (error) {
      console.error('Error fetching deck:', error);
      this.message = 'Error al obtener el mazo de cartas.';
    }
  }

  async drawCard(): Promise<void> {
    if (this.deckId) {
      try {
        const response: CardResponse = await firstValueFrom(this.cardService.getOneCard(this.deckId));
        if (response.success) {
          this.newCard = response.cards[0];
        } else {
          this.message = 'No se pudo dibujar la carta.';
        }
      } catch (error) {
        console.error('Error drawing card:', error);
        this.message = 'Error al dibujar la carta.';
      }
    }
  }

  async guess(isHigher: boolean) {
    this.isLoadingCurrentCard = true;
    await this.drawCard();
    
    if (this.currentCard && this.newCard) {
      const currentCardValue = parseInt(this.currentCard.value);
      const newCardValue = parseInt(this.newCard.value);
  
      if (isHigher && newCardValue > currentCardValue) {
        this.points += 1;
        this.message = '¡Correcto! La siguiente carta es mayor.';
      } else if (!isHigher && newCardValue < currentCardValue) {
        this.points += 1;
        this.message = '¡Correcto! La siguiente carta es menor.';
      } else {
        if (this.points > 0) {
          this.points -= 1;
        }
        this.message = '¡Incorrecto! La siguiente carta no es lo que pensabas.';
      }
      this.prevCard = this.currentCard
      this.currentCard = this.newCard;
    } else {
      this.message = 'No se pudo obtener la siguiente carta.';
    }
    this.isLoadingCurrentCard = false;
  }
}
