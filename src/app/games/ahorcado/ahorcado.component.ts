import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/chat.component';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule, ChatComponent, FormComponent],
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
})
export class AhorcadoComponent implements OnInit {
  words: string[] = [
    'independiente',
    'programacion',
    'angular',
    'typescript',
    'desarrollo',
    'javascript',
    'tecnologia',
    'software',
  ];
  wordToGuess: string = '';
  displayWord: string[] = [];
  incorrectGuesses: number = 0;
  maxIncorrectGuesses: number = 6;
  guessedLetters: string[] = [];
  hasWonOne: boolean = false;
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  gameWon: boolean = false;
  points: number = 10;
  isSavingScore: boolean = false;
  openForm: boolean = false;

  ngOnInit() {
    this.initializeGame();
  }

  constructor(private firestore: Firestore, public auth: Auth) {}

  initializeGame() {
    this.wordToGuess = this.getRandomWord();
    this.displayWord = this.wordToGuess.split('').map(() => '_');
    this.guessedLetters = [];
    this.incorrectGuesses = 0;
    this.gameWon = false;
  }

  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  guessLetter(letter: string) {
    if (this.guessedLetters.includes(letter) || this.gameWon) {
      return;
    }

    this.guessedLetters.push(letter);

    if (this.wordToGuess.includes(letter)) {
      this.wordToGuess.split('').forEach((char, index) => {
        if (char === letter) {
          this.displayWord[index] = letter;
        }
      });
    } else {
      this.incorrectGuesses++;
      this.points--;
    }

    if (this.isGameWon()) {
      this.gameWon = true;
    }
  }

  isGameWon(): boolean {
    const result = this.displayWord.join('') === this.wordToGuess;
    if (result) {
      this.hasWonOne = true;
    }
    return result;
  }

  isGameOver(): boolean {
    return this.incorrectGuesses >= this.maxIncorrectGuesses;
  }

  restartGame() {
    this.points += 10;
    if (this.isGameOver()) {
      this.points = 10;
      this.hasWonOne = false;
    }
    this.initializeGame();
  }

  async finishGame() {
    const user = this.auth.currentUser;
    if (user) {
      this.isSavingScore = true;
      const score = {
        puntuacion: this.points,
        usuario: user.email,
        fecha: new Date(),
        juego: 'Ahorcado'
      };
      let collectionDB = collection(this.firestore, 'users-scores');
      await addDoc(collectionDB, score);
      this.openForm = true;
      this.isSavingScore = false;
    }
  }

  onCloseForm() {
    this.openForm = false;
  }
}
