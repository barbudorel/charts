import { ActionInterface } from "../utils/action.interface";
import { DiffusionComponent } from "../diffusion/diffusion.component";
import { Point } from "../utils/point";




export class ActionDiffusion implements ActionInterface {

    private radius: number = 5;
    private points: Array<Point> = [];
    private intervalId = 0;
    private cx: CanvasRenderingContext2D;

    private width: number = 800;
    private height: number = 400;

    constructor(private context: DiffusionComponent) {
    }

    run() {
    }

    private initPoints() {
        if (this.points.length != this.context.nParticles) {
            this.points = [];
            for (let i = 0; i < this.context.nParticles; i++) {
                this.points.push(new Point(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height)));
            }
        }
    }

    private movePoints() {
        for (let i = 0; i < this.context.nParticles; i++) {
            let cX: number = Math.random() < 0.5 ? -1 : 1;
            let cY: number = Math.random() < 0.5 ? -1 : 1;
            let point = this.points[i];
            point.x = point.x + (cX + this.context.xDrift);
            if (point.x < this.radius) {
                point.x = this.radius;
            }
            if (point.x > +this.width-this.radius) {
                point.x = +this.width-this.radius;
            }
            point.y = point.y + (cY + this.context.yDrift);
            if (point.y < this.radius) {
                point.y = this.radius;
            }
            if (point.y > +this.height-this.radius) {
                point.y = +this.height-this.radius;
            }
        }
    }

    start() {
        const canvasEl: HTMLCanvasElement = this.context.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');
        canvasEl.width = this.width;
        canvasEl.height = this.height;
        this.initPoints();
        this.drawPoints();
    }

    private clearTimer() { clearInterval(this.intervalId); }

    private drawPoints() {
        this.clearTimer();
        this.intervalId = window.setInterval(() => {
            this.cx.clearRect(0, 0, this.width, this.height);
            for (let i = 0; i < this.context.nParticles; i++) {
                this.cx.beginPath();
                this.cx.arc(this.points[i].x, this.points[i].y, this.radius, 0, 2 * Math.PI, false);
                this.cx.fillStyle = 'green';
                this.cx.fill();
                this.cx.lineWidth = 2;
                this.cx.strokeStyle = '#003300';
                this.cx.stroke();
            }
            this.movePoints();
        }, this.context.timeToRedraw);
    }

    stop() {
        this.clearTimer();
    }
}