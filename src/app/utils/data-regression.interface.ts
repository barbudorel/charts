import { Pair } from "./pair";


export interface DataRegressionInterface {

	getRandomTrainingRow():Pair<number[], number>;
	getTrainingRow(n:number):Pair<number[], number>;
	getTestingRow(n:number):Pair<number[], number>;
	getNumberFeatures():number;
	getDataTrainingSize():number;
	getDataTestingSize():number;
}
