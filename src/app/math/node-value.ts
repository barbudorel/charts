/**
 * Class representing the possible node values for the MathEvaluator. 
 */

export class NodeValue{

	public static DOUBLE: number = 0;
	public static STRING: number = 1;
	public static BOOLEAN: number = 2;
	
	public d: number = 0;
	public s: string = null;
	public b: boolean = false;
    public type: number = -1;
    
    constructor(){}
	
	public doubleValue(): number{
		return this.d;
	}
	
	public setDouble(d:number){
		this.d = d;
		this.setType(NodeValue.DOUBLE);
	}
	
	public stringValue():string{
		return this.s;
	}
	
	public setString(s:string){
		this.s = s;
		this.setType(NodeValue.STRING);
	}

	public getType():number {
		return this.type;
	}

	public setType(type:number) {
		this.type = type;
	}
	
	public booleanValue():boolean{
		return this.b;
	}
	
	public setBoolean(b:boolean){
		this.b = b;
		this.setType(NodeValue.BOOLEAN);
	}
}