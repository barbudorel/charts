import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

import { MessageService } from '../message.service';
import { ActionInterface } from '../utils/action.interface';
import { ActionDiffusion } from '../actions/diffusion.action';

@Component({
  selector: 'app-diffusion',
  templateUrl: './diffusion.component.html',
  styleUrls: ['./diffusion.component.css']
})
export class DiffusionComponent implements OnInit, OnDestroy {
  
  nParticles:number=10;
  xDrift:number=1;
  yDrift:number=1;
  timeToRedraw:number=1000;

  action: ActionInterface;

  constructor(private messageService: MessageService) { }

  @ViewChild('canvas') public canvas: ElementRef;
  
  ngOnInit() {
    this.action = new ActionDiffusion(this);
    console.log('on init');
  }

  start(){
    this.action.start();
    this.log('Diffusion started.');
  }

  ngOnDestroy() { 
    stop();
    this.action = null;
   }

  stop()  {
    this.action.stop();
    this.log('Diffusion stoped.');
  }

  private log(message: string) {
    this.messageService.add('Diffusion: ' + message);
  }

}