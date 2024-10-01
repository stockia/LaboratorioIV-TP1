import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/chat.component';
import { PreguntadosService, Character } from '../../services/preguntados.service';
import { firstValueFrom } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit {
  apiMaxId: number = 52;
  apiMinId: number = 1;
  usedIds: number[] = [];
  selectedCharacter!: Character;
  otherCharacters: Character[] = [];
  isCorrect: boolean | null = null;
  isLoading: boolean = false;
  points: number = 0;
  hasWonOne: boolean = false;
  isSavingScore: boolean = false;

  constructor(private preguntadosService: PreguntadosService, public auth: Auth, private firestore: Firestore) {}

  ngOnInit() {
    this.startGame();
  }

  async startGame() {
    try {
      this.isLoading = true;
      const randomId = this.getRandomNumber();
      await this.selectCharacter(randomId);
      this.otherCharacters = await this.getOtherCharacters();
      this.isLoading = false;
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  }

  getRandomNumber() {
    const min = this.apiMinId;
    const max = this.apiMaxId;
    let randomId = Math.floor(Math.random() * (max - min + 1)) + min;

    while (this.usedIds.includes(randomId)) {
      randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return randomId;
  }

  async playGame() {  
    try {
      const randomId = this.getRandomNumber();
      await this.selectCharacter(randomId);
      this.otherCharacters = await this.getOtherCharacters();
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  }

  async selectCharacter(randomId: number) {
    try {
      this.usedIds.push(randomId);
      this.selectedCharacter = await firstValueFrom(this.preguntadosService.getCharacter(randomId));
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  }

  async getOtherCharacters() {
    const otherCharacters = [];
    for (let i = 0; i < 2; i++) {
      let otherRandomId = this.getRandomNumber();
      while (this.usedIds.includes(otherRandomId)) {
        otherRandomId = this.getRandomNumber();
      }
      const otherCharacter = await firstValueFrom(this.preguntadosService.getCharacter(otherRandomId));
      otherCharacters.push(otherCharacter);
    }
    return otherCharacters;
  }

  handleNextRound() {
    this.isCorrect = null;
    this.startGame();
  }

  handleGuess(option: string) {
    if (option === this.selectedCharacter.fullName) {
      this.isCorrect = true;
      this.hasWonOne = true;
      this.points += 1;
    } else {
      this.isCorrect = false;
      if (this.points > 0) {
        this.points -= 1;
      }
    }
  }

  async finishGame() {
    const user = this.auth.currentUser;
    if (user) {
      this.isSavingScore = true;
      const score = {
        puntuacion: this.points,
        usuario: user.email,
        fecha: new Date(),
        juego: 'Preguntados'
      }
      let collectionDB = collection(this.firestore, 'users-scores');
      await addDoc(collectionDB, score);
      this.points = 0;
      this.hasWonOne = false;
      this.isSavingScore = false;
    }
  }

  get options() {
    return [this.selectedCharacter.fullName, ...this.otherCharacters.map(character => character.fullName)];
  }

  get correctCharacterName() {
    return this.selectedCharacter.fullName;
  }
}
