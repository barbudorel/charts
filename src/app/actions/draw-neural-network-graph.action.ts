import { FunctionGraph } from '../utils/function-graph';
import { Point } from '../utils/point';

import { ActionInterface } from "../utils/action.interface";
import { NeuralNetworkComponent } from '../neural-network/neural-network.component';
import { MathFunctionWithyNoise } from './math-function-with-noise';
import { NNRegressionProcessor } from '../neural-network/regression-processor';
import { NNDataSimulateRegression } from '../neural-network/function-simulated-data';
import { FunctionInterface } from '../utils/function.interface';
import { NNFunction } from './nn-function';
import { NoiseFunction } from './noise-function';


export class ActionDrawNeuralNetwork implements ActionInterface {

    nnData:NNDataSimulateRegression;
	public regressionProcessor:NNRegressionProcessor;
    ifg:FunctionGraph;
    
    constructor(private context: NeuralNetworkComponent) {
        this.nnData = new NNDataSimulateRegression();
        let functionNoise:FunctionInterface = new NoiseFunction(2);
        let mf: FunctionInterface = new MathFunctionWithyNoise(this.context.functionExpression, functionNoise);
		this.nnData.init(mf,context.xMin,context.xMax,context.nPoints);
		
        this.nnData.initDataTrainingAndTesting(5);                

        this.regressionProcessor = new NNRegressionProcessor(context.messageService, this.nnData, this.context.mLayers);
    }

    run() {        
        const canvasEl: HTMLCanvasElement = this.context.canvas.nativeElement;
        let cx = canvasEl.getContext('2d');
        //canvasEl.width = 800;
        //canvasEl.height = 400;

        const width = canvasEl.clientWidth;
        const height = canvasEl.clientHeight;

        cx.lineWidth = 3;
        cx.lineCap = 'round';
        cx.strokeStyle="#FF0000";
        let points = this.getPoints(width, height);
        //cx.beginPath();
        cx.fillStyle="#FF0000";
        //cx.moveTo(points[0].x, points[0].y);

        for (let point of points) {
            //cx.lineTo(point.x, point.y);
            //cx.stroke();
            cx.fillRect(point.x,point.y,2,2);
        }

    }

    getPoints(width: number, height: number): Array<Point> {
        let mf: FunctionInterface = new NNFunction(this.regressionProcessor);
        let fg: FunctionGraph = new FunctionGraph(mf, this.context.xMin, this.context.xMax, this.context.nPoints);

        let pointsFunc: Array<Point> = fg.getGf();
        let points: Array<Point> = [];
        let PAD: number = 20;
        let xScale = (width - 2 * PAD) / (this.context.xMax - this.context.xMin);
        let yScale = (height - 2 * PAD) / (fg.getMaxY() - fg.getMinY());

        for (let point of pointsFunc) {
            let x1 = PAD + (point.x - this.context.xMin) * xScale;
            let y1 = height - PAD - (point.y - fg.getMinY()) * yScale;
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