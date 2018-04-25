
/** 
* Class that implements an operator that can be handled by the MathEvaluator 
*/    

export class Operator {
    
    public constructor(public op:string, public type:number , public priority:number ) {        
    }

    public getOperator():string {
        return this.op;
    }

    public  setOperator(op:string) {
        this.op = op;
    }

    public getType():number {
        return this.type;
    }

    public getPriority():number {
        return this.priority;
    }
}