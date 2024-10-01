import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simon',
  standalone: true,
  templateUrl: './simon.component.html',
  styleUrl: './simon.component.css',
  imports: [CommonModule],
})
export class SimonComponent implements OnInit {
  colors: string[] = ['red', 'green', 'blue', 'yellow'];
  sequence: string[] = [];
  userSequence: string[] = [];
  score: number = 0;
  gameStarted: boolean = false;
  isGameOver: boolean = false;
  hasWon: boolean = false;
  maxSequences: number = 3;

  ngOnInit(): void {
    this.resetGame();
  }

  startGame(): void {
    this.sequence = [];
    this.userSequence = [];
    this.score = 0;
    this.gameStarted = true;
    this.addToSequence();
  }

  stopGame(): void {
    this.gameStarted = false;
  }

  resetGame(): void {
    this.sequence = [];
    this.userSequence = [];
    this.score = 0;
    this.gameStarted = false;
    this.hasWon = false;
    this.isGameOver= false;
  } 

  addToSequence(): void {
    const sequenceLen = this.sequence.length;
    if (sequenceLen <= this.maxSequences) {
      const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.sequence.push(randomColor);
      this.highlightSequence();
    } else {
      this.gameOver(true);
    }
  }

  checkSequence(): void {
    for (let i = 0; i < this.userSequence.length; i++) {
      if (this.userSequence[i] !== this.sequence[i]) {
        this.gameOver(false);
        return;
      }
    }
    
    if (this.userSequence.length === this.sequence.length) {
      this.score += 10;
      this.userSequence = [];
      this.addToSequence();
    }
  }

  gameOver(hasWon: boolean): void {
    if (!hasWon) {
      this.isGameOver = true;
    } else {
      this.hasWon = true;
    }
    this.gameStarted = false;
  }

  highlightSequence(): void {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= this.sequence.length) {
        clearInterval(interval);
        return;
      }
      this.flashColor(this.sequence[index]);
      index++;
    }, 1000);
  }

  flashColor(color: string): void {
    const square = document.querySelector(`div[style*="${color}"]`);
    if (square) {
      square.classList.add('active');
      setTimeout(() => {
        square.classList.remove('active');
      }, 500);
    }
  }

  onColorClick(color: string): void {
    if (this.gameStarted) {
      this.userSequence.push(color);
      this.flashColor(color);
      this.checkSequence();
    }
  }
}
