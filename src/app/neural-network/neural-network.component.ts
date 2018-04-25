import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from '../message.service';

import { ActionInterface } from '../utils/action.interface';
import { Function1DComponent } from '../function1d/function1d.component';
import { ActionDraw1DGraphWithNoise } from '../actions/draw-1dgraph-with-noise.action';
import { ActionDrawNeuralNetwork } from '../actions/draw-neural-network-graph.action';

@Component({
  selector: 'app-neural-network',
  templateUrl: './neural-network.component.html',
  styleUrls: ['./neural-network.component.css']
})
export class NeuralNetworkComponent extends Function1DComponent {

  mLayers = 10;
  nEpoch: number = 10;
  actionNN: ActionDrawNeuralNetwork;
  action: ActionInterface;
  
  constructor(public messageService: MessageService) {
    super(messageService);
    this.functionExpression = "sin(x)";
    this.nPoints = 1000;
    this.xMax=10;
   }

  drawGraph() {
    this.action = new ActionDraw1DGraphWithNoise(this);
    this.actionNN = new ActionDrawNeuralNetwork(this);
    this.action.run();

    this.actionNN.regressionProcessor.calculateW(this.nEpoch, true);
    this.actionNN.run();
    this.log('NN initialized.');
  }

  nextEpoch(){
    this.action.run();
    this.actionNN.regressionProcessor.calculateW(this.nEpoch, true);
    this.actionNN.run();
  }

  public log(message: string) {
    this.messageService.add('NN: ' + message);
  }

}
