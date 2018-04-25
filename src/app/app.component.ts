import { Component, ElementRef, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D; 
  
  dd(){

    //alert(this.canvas);
    //const canvasEl: HTMLCanvasElement = this.canvas.nativeElement.querySelector('#canvas');
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = 400;
    canvasEl.height = 400;
    

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.cx.beginPath();
    this.cx.moveTo(100,150);

    this.cx.lineTo(450, 50);
    this.cx.stroke();
    
    
  }

  
}
