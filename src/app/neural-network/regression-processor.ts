import { DataRegressionInterface } from "../utils/data-regression.interface";
import { Pair } from "../utils/pair";
import { MessageService } from "../message.service";


export class NNRegressionProcessor {

	nnData: DataRegressionInterface;
	mLayers:number;
	w1:number[][];
	w2:number[];
	learningRate:number = 0.01;
	
	public constructor(public messageService: MessageService, nnData: DataRegressionInterface, m:number) {
		this.nnData = nnData;
		this.mLayers = m;
		this.w1 = []; //new Array[this.M,this.nnData.getNumberFeatures()];
		this.w2 = []; //new Array[1+this.M];		
	}

	public calculateW(nEpoch:number, initW:boolean) {
		if(initW) {
			this.initW1And2WithRandomValues();
		}
		for(let n = 0; n < this.nnData.getDataTrainingSize()*nEpoch; n++) {
			let row: Pair<number[], number> = this.nnData.getRandomTrainingRow();
			let x:number[] = row.left;
			let z:number[] = this.calculateZ(x);
			let y:number = this.calculateY(z);
			let t:number = row.right;
			for(let j = 0; j <= this.mLayers;j++) {
				this.w2[j] = this.w2[j] - this.learningRate * this.dEnOverDw2kj(y, t, z, j);							
			}
			for(let j = 0; j < this.mLayers;j++) {
				for(let i = 0; i < this.nnData.getNumberFeatures();i++) {
					this.w1[j][i] = this.w1[j][i] - this.learningRate * this.dEnOverDw1ji(y, t, z, x, j, i);
				}
			}				
		}
		this.printInfo();			
	}
	
	private printInfo():void {
		let error2:number = 0;
		for(let n = 0; n < this.nnData.getDataTestingSize(); n++) {
			let row: Pair<number[], number> = this.nnData.getTestingRow(n);
			let x:number[] = row.left;
			let z:number[] = this.calculateZ(x);
			let y:number = this.calculateY(z);
			error2 = error2 + (y-row.right)*(y-row.right);					
		}
		this.log("Test error: "+error2);
	}

	private calculateZ(x:number[]):number[] {
		let z:number[] = []; //new Array[1+this.M];
		z[0] = 1;
		for(let j = 1; j <= this.mLayers;j++) {
			z[j] = 0;
			for(let i = 0; i < this.nnData.getNumberFeatures();i++) {
				z[j] = z[j]+this.w1[j-1][i]*x[i];
			}
			z[j] = this.sigma(z[j]);
		}
		return z;
	}
	
	private calculateY(z:number[]):number {
		let y:number = 0;
		for(let j = 0; j <= this.mLayers;j++) {
			y = y+this.w2[j]*z[j];
		}					
		return y;
	}

	private initW1And2WithRandomValues():void {
		for(let j = 0; j <= this.mLayers;j++) {
			this.w2[j] = Math.random();							
		}
		for(let j = 0; j < this.mLayers;j++) {
			this.w1[j] = [];
			for(let i = 0; i < this.nnData.getNumberFeatures();i++) {
				this.w1[j][i] = Math.random();							
			}
		}
	}

	sigma(x:number):number {
		return 1/(1+Math.exp(-x));
	}
	
	costFunction(y:number, t:number):number {
		let En:number=0;
		let diff:number = +y-t;
		En = En + diff*diff;
		return En/2;
	}
	
	dEnOverDw2kj(y:number, t:number, z:number[], j:number):number {
		return (y - t)*z[j];
	}
	
	dEnOverDw1ji(y:number, t:number, z:number[], x:number[], j:number, i:number) {
		let sumj:number = 0;
		sumj = sumj+(y - t)*this.w2[j+1];
		return z[j+1]*(1-z[j+1])*sumj*x[i];
	}
	
	public evaluate(x:number[]):number {
		let z:number[] = this.calculateZ(x);
		let y:number = this.calculateY(z);
		return y;
	}
	
	public log(message: string) {
		this.messageService.add('NN: ' + message);
	}
}