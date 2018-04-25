import { FunctionInterface } from "../utils/function.interface";

export class NoiseFunction implements FunctionInterface{
    
    public constructor(public scale:number){    
        
    }

    getValue(x: number): number {
        return Math.random()/this.scale;
    }
    
    getInfo(): string {
        return "Function Noise.";
    }
    
}