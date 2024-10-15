import { Component, OnInit } from '@angular/core';
import { Firestore,collection, getDocs, Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

interface Score {
  juego: string;
  puntuacion: number;
  usuario: string;
  fecha: Date | Timestamp;
}

@Component({
  selector: 'app-rank-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rank-list.component.html',
  styleUrl: './rank-list.component.css'
})
export class RankListComponent implements OnInit {
  scores: Score[] = [];
  topScores: Score[] = [];
  isLoading: boolean = false;

  constructor(private firestore: Firestore) {
  }

  ngOnInit() {
    this.getScores();
  }

  async getScores() {
    try {
      this.isLoading = true;
      let collectionDB = collection(this.firestore, 'users-scores');
      const querySnapshot = await getDocs(collectionDB);
      this.scores = querySnapshot.docs.map(doc => {
        const data = doc.data() as Score;
        // Convertir Timestamp a Date
        if (data.fecha instanceof Timestamp) {
          data.fecha = data.fecha.toDate();
        }
        return data;
      });
      await this.getTopScores();
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  }

  async getTopScores() {
    try {
      // Tomo los 5 puntajes mas altos de cada juego
      const groupedScores: { [key: string]: Score[] } = this.scores.reduce(
        (acc: { [key: string]: Score[] }, score: Score) => {
          if (!acc[score.juego]) {
            acc[score.juego] = [];
          }
          acc[score.juego].push(score);
          return acc;
      }, {});
  
      this.topScores = Object.values(groupedScores).flatMap((group: Score[]) => 
        group.sort((a, b) => b.puntuacion - a.puntuacion).slice(0, 5)
      );
  
      // Ordenar topScores por juego
      this.topScores.sort((a, b) => a.juego.localeCompare(b.juego));
    } catch (error) {
      console.log(error);
    } 
  }

  // Convierto el timestamp que recibo de firestore porque sino es inentandible en el UI
  formatDate(fecha: Date | Timestamp): string {
    if (fecha instanceof Timestamp) {
      fecha = fecha.toDate();
    }
    return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()} ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`; // Formato DD/MM/AAAA HH:MM
  }
}
