import { FunctionInterface } from "../utils/function.interface";
import { MathEvaluator } from "../math/math-evaluator";

export class MathFunction implements FunctionInterface {

    mathEvaluator: MathEvaluator;

    constructor(public expression: string) {
        //let node2 = this.math.parse(expression);
        //this.mathEvaluator = node2.compile();  
        this.mathEvaluator = new MathEvaluator(expression);
    }

    getValue(x: number): number {
        //this.scope.x = x;
        //return this.mathEvaluator.eval(this.scope);
        this.mathEvaluator.addVariableNumber("x", x);
        return this.mathEvaluator.getValue().doubleValue();
    }

    getInfo(): string {
        return "Function: " + this.expression;
    }

}