import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({"projectId":"juegardopolis","appId":"1:736166239747:web:d4b1f3830a5fb278943836","storageBucket":"juegardopolis.appspot.com","apiKey":"AIzaSyB9ZFk0VfMlidVAaC7Pb9r1fh4qMuV3E-w","authDomain":"juegardopolis.firebaseapp.com","messagingSenderId":"736166239747"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    provideHttpClient()
  ]
};
