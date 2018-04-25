import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from '../message.service';

import { ActionDraw1DGraph } from '../actions/draw-1dgraph.action';
import { ActionInterface } from '../utils/action.interface';

@Component({
  selector: 'app-function1d',
  templateUrl: './function1d.component.html',
  styleUrls: ['./function1d.component.css']
})
export class Function1DComponent {

  constructor(public messageService: MessageService) { }

  public functionExpression: string = "sin(x^2)+1";
  public xMin: number = 0;
  public xMax: number = 2;
  public nPoints: number = 200;

  @ViewChild('canvas') public canvas: ElementRef;
  //private cx: CanvasRenderingContext2D;

  drawGraph() {
    let action: ActionInterface = new ActionDraw1DGraph(this);
    action.run();
    this.log('Graph initialized.');
  }

  public log(message: string) {
    this.messageService.add('Function1D: ' + message);
  }

}