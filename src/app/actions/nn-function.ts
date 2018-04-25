import { FunctionInterface } from "../utils/function.interface";
import { NNRegressionProcessor } from "../neural-network/regression-processor";

export class NNFunction implements FunctionInterface{
    
    constructor(public rp:NNRegressionProcessor){    
        
    }

    getValue(x: number): number {
        return this.rp.evaluate([1,x]);
    }
    
    getInfo(): string {
        return "Function NN Aprox.";
    }
    
}