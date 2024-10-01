import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Character {
    success: boolean;
    id: number,
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;
    family: string;
    image: string;
    imageUrl: string;
}

@Injectable({
    providedIn: 'root'
})
export class PreguntadosService {
    private apiUrl = 'https://thronesapi.com/api/v2/Characters/';

    constructor(private http: HttpClient) {}

    getCharacter(id: number): Observable<Character> {
        const url = `${this.apiUrl}${id}`;
        return this.http.get<Character>(url);
    }
}