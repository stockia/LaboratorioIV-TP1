// games/games.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';

@NgModule({
  imports: [
    CommonModule,
    GamesRoutingModule,
    AhorcadoComponent,
    MayorMenorComponent
  ]
})
export class GamesModule { }
