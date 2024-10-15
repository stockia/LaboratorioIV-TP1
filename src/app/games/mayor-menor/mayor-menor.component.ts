import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/chat.component';
import { CardService, DeckResponse, CardResponse } from '../../services/card-game.service';
import { firstValueFrom } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule, ChatComponent],
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
  isSavingScore: boolean = false;
  hasWonOne: boolean = false;

  constructor(private cardService: CardService, private firestore: Firestore, public auth: Auth) {}

  ngOnInit() {
    this.startGame();

  }

  async startGame() {
    try {
      const response: DeckResponse = await firstValueFrom(this.cardService.getDeck());
      this.hasWonOne = false;
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
        this.hasWonOne = true;
        this.message = '¡Correcto! La siguiente carta es mayor.';
      } else if (!isHigher && newCardValue < currentCardValue) {
        this.points += 1;
        this.hasWonOne = true;
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

  async finishGame() {
    const user = this.auth.currentUser;
    if (user) {
      this.isSavingScore = true;
      const score = {
        puntuacion: this.points,
        usuario: user.email,
        fecha: new Date(),
        juego: 'Mayor-Menor'
      }
      let collectionDB = collection(this.firestore, 'users-scores');
      await addDoc(collectionDB, score);
      this.isSavingScore = false;
    }
  }
}
