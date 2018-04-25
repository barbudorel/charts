import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Function1DComponent } from './function1d/function1d.component';
import { AppRoutingModule } from './/app-routing.module';
import { DiffusionComponent } from './diffusion/diffusion.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { NeuralNetworkComponent } from './neural-network/neural-network.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    Function1DComponent,
    DiffusionComponent,
    MessagesComponent,
    NeuralNetworkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
