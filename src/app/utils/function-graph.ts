import {FunctionGraphInterface} from './function-graph.interface';
import {FunctionInterface} from './function.interface';
import { Point } from './point';

export class FunctionGraph implements FunctionGraphInterface{
    
    function:FunctionInterface;
    a:number;
    b:number;
    minY:number;
    maxY:number;
	n:number;
	gf: Array<Point>;
	
	public constructor(f:FunctionInterface, a:number, b:number, n:number){
        this.function = f;
		this.a = a;
		this.b = b;
		this.n = n;
		this.initGf();
	}
	
	initGf():void {
		let max = Number.NEGATIVE_INFINITY;
		let min = Number.POSITIVE_INFINITY;
		let h = (+this.b-this.a)/this.n;
		this.gf = [];
		for(let i = 0;i <= this.n;i++){
			let x = +this.a+i*h;
			let y = this.function.getValue(x);
			if(y > max){
                max = y;
        	}
        	if(y < min){
                min = y;
        	}
        	this.gf.push(new Point(x, y));
		}	
		this.maxY = max;
		this.minY = min;
	}

	getGf(): Array<Point> {
		return this.gf;
	}
	
	getMinX():number {
		return this.a;
	}

	getMaxX():number {
		return this.b;
	}

	getMinY():number {
		return this.minY;
	}

	public getMaxY():number {
		return this.maxY;
    }           
}