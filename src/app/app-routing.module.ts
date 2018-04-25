import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Function1DComponent }   from './function1d/function1d.component';
import { DiffusionComponent }   from './diffusion/diffusion.component';
import { NeuralNetworkComponent } from './neural-network/neural-network.component';

const routes: Routes = [
  { path: 'graph1D', component: Function1DComponent },
  { path: 'nn', component: NeuralNetworkComponent },  
  { path: 'diffusion', component: DiffusionComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
