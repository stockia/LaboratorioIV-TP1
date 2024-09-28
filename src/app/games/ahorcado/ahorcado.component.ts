import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/chat.component';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule, ChatComponent],
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
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  gameWon: boolean = false;
  points: number = 10;

  ngOnInit() {
    this.initializeGame();
  }

  constructor() {}

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
    return this.displayWord.join('') === this.wordToGuess;
  }

  isGameOver(): boolean {
    return this.incorrectGuesses >= this.maxIncorrectGuesses;
  }

  restartGame() {
    this.points += 10;
    if (this.isGameOver()) {
      this.points = 10;
    }
    this.initializeGame();
  }
}
