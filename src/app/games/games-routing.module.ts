import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { SimonComponent } from './simon/simon.component';
const routes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent},
  { path: 'mayor-menor', component: MayorMenorComponent},
  { path: 'preguntados', component: PreguntadosComponent},
  { path: 'simon', component: SimonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
