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
  wordToGuess: string = 'independiente';
  displayWord: string[] = [];
  incorrectGuesses: number = 0;
  maxIncorrectGuesses: number = 6;
  guessedLetters: string[] = [];
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  
  ngOnInit() {
    this.initializeGame();
  }

  constructor() {}

  initializeGame() {
    this.displayWord = this.wordToGuess.split('').map(() => '_');
    this.guessedLetters = [];
    this.incorrectGuesses = 0;
  }

  guessLetter(letter: string) {
    if (this.guessedLetters.includes(letter)) {
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
    }
  }

  isGameWon(): boolean {
    return this.displayWord.join('') === this.wordToGuess;
  }

  isGameOver(): boolean {
    return this.incorrectGuesses >= this.maxIncorrectGuesses;
  }
}
