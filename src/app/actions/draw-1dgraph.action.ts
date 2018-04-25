import { MathFunction } from './math-function';
import { FunctionGraph } from '../utils/function-graph';
import { Point } from '../utils/point';

import { ActionInterface } from "../utils/action.interface";
import { Function1DComponent } from '../function1d/function1d.component';


export class ActionDraw1DGraph implements ActionInterface {

    mf: MathFunction;
    fg: FunctionGraph;

    constructor(private context: Function1DComponent) {
        this.mf = new MathFunction(this.context.functionExpression);
        this.fg = new FunctionGraph(this.mf, this.context.xMin, this.context.xMax, this.context.nPoints);
    }

    run() {
        const canvasEl: HTMLCanvasElement = this.context.canvas.nativeElement;
        let cx = canvasEl.getContext('2d');
        canvasEl.width = 800;
        canvasEl.height = 400;

        const width = canvasEl.clientWidth;
        const height = canvasEl.clientHeight;

        cx.lineWidth = 3;
        cx.lineCap = 'round';
        cx.strokeStyle = '#200';
        let points = this.getPoints(width, height);
        cx.beginPath();
        cx.moveTo(points[0].x, points[0].y);

        for (let point of points) {
            cx.lineTo(point.x, point.y);
            cx.stroke();
        }

    }

    getPoints(width: number, height: number): Array<Point> {

        let pointsFunc: Array<Point> = this.fg.getGf();
        let points: Array<Point> = [];
        let PAD: number = 20;
        let xScale = (width - 2 * PAD) / (this.context.xMax - this.context.xMin);
        let yScale = (height - 2 * PAD) / (this.fg.getMaxY() - this.fg.getMinY());

        for (let point of pointsFunc) {
            let x1 = PAD + (point.x - this.context.xMin) * xScale;
            let y1 = height - PAD - (point.y - this.fg.getMinY()) * yScale;
            points.push(new Point(x1, y1));
        }
        return points;
    }

    start() {
        throw new Error("Method not implemented.");
    }
    stop() {
        throw new Error("Method not implemented.");
    }
}