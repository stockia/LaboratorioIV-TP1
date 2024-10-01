// games/games.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { SimonComponent } from './simon/simon.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    GamesRoutingModule,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    SimonComponent
  ],
  providers: [provideHttpClient()]
})
export class GamesModule { }
