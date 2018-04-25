import { DataRegressionInterface } from "../utils/data-regression.interface";
import { Pair } from "../utils/pair";
import { FunctionInterface } from "../utils/function.interface";


export class NNDataSimulateRegression implements DataRegressionInterface{

	dataPFeatures:number;
	dataN:number;
	dataX: Array<Pair<number[],number>> = [];
	dataXTraining: Array<Pair<number[],number>> = [];
	dataXTesting: Array<Pair<number[],number>> = [];

	constructor(){}
	
	public init(f: FunctionInterface, a:number, b:number, n:number):void {
		this.dataPFeatures = 2;
		this.dataN = n;
		let h:number = (+b-a)/this.dataN;
		for(let i = 0,count = this.dataN;i < count;i++) {
			let x:number = +a+i*h;
			let xRow:number[] = [1,x];
			let yRow:number =  f.getValue(x)+this.getNoise();
			this.dataX.push(new Pair<number[],number>(xRow,yRow));
		}				
	}
	
	private getNoise():number {
		return Math.random()/10;
	}

	public initDataTrainingAndTesting(testMultipleData:number):void {
		for(let i = 0,count = this.dataX.length;i < count;i++) {
			let rowData: Pair<number[],number> = this.dataX[i];
			if(i % testMultipleData == 0) {
				this.dataXTesting.push(rowData);
			}else{
				this.dataXTraining.push(rowData);				
			}
		}
	}	

	public getRandomTrainingRow():Pair<number[],number> {
		let n = Math.floor(Math.random()*this.dataXTraining.length);
		return this.dataXTraining[n];
	}
	
	public getTrainingRow(n:number):Pair<number[],number> {
		return this.dataXTraining[n];
	}

	public getTestingRow(n:number):Pair<number[],number> {
		return this.dataXTesting[n];
	}

	public getNumberFeatures():number {
		return this.dataPFeatures;
	}

	public getDataTrainingSize():number {
		return this.dataXTraining.length;
	}

	public getDataTestingSize():number {
		return this.dataXTesting.length;
	}
}