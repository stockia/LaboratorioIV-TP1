import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntadosService, Character } from '../../services/preguntados.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
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
  startingPoints: number = 0;

  constructor(private preguntadosService: PreguntadosService) {}

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
      this.startingPoints += 1;
    } else {
      this.isCorrect = false;
      if (this.startingPoints > 0) {
        this.startingPoints -= 1;
      }
    }
  }

  get options() {
    return [this.selectedCharacter.fullName, ...this.otherCharacters.map(character => character.fullName)];
  }

  get correctCharacterName() {
    return this.selectedCharacter.fullName;
  }
}
