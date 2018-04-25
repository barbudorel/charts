import { MathFunction } from "./math-function";
import { FunctionInterface } from "../utils/function.interface";

export class MathFunctionWithyNoise extends MathFunction{
    
   constructor(public expression:string, public noiseFunction:FunctionInterface){  
        super(expression);
    }

    getValue(x: number): number {
       return +super.getValue(x)+this.noiseFunction.getValue(0);
    }        
    
}