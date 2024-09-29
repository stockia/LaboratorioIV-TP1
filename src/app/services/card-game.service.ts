 // src/app/services/card.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz para la respuesta de la API
export interface DeckResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export interface CardResponse {
  success: boolean;
  deck_id: string;
  cards: Card[];
  remaining: number;
}

export interface Card {
  code: string;
  image: string;
  images: {
    svg: string;
    png: string;
  };
  value: string;
  suit: string;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'; // URL de la API

  constructor(private http: HttpClient) { }

  // Método para obtener un nuevo mazo de cartas
  getDeck(): Observable<DeckResponse> {
    return this.http.get<DeckResponse>(this.apiUrl);
  }

  // Método para obtener una carta del mazo
  getOneCard(deckId: string): Observable<CardResponse> {
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    return this.http.get<CardResponse>(url);
  }
}