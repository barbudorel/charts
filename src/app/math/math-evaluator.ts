import { ExpressionNode } from "./expression-node";
import { Operator } from "./operator";
import { NodeValue } from "./node-value";

/**
 * There are two typical ways to evaluate expressions. The
 * first one by explicit providing the variables names and values as follows:
 * <p>
 * <code>
 * 	MathEvaluator m = new MathEvaluator("-5-6/(-2) + sqr(15+x)");
 *	m.addVariable("x", 10);
 * 	System.out.println( m.getValue().doubleValue() );
 * </code>
 */

export class MathEvaluator {

	protected operators: Array<Operator> = null;
	private expression:string = null;

	/**
	 * Considered variables and their actual values for the expression to evaluate
	 */
	private variables = new Object();

	/** identified variable names for expression to evaluate */
	private variableNames: Array<string> = [];

	/** The updated node with the main expression tree */
	expressionNode: ExpressionNode;

	public constructor(expression:string){
		this.init();
		this.setExpression(expression);
	}

	private init() {
		if (this.operators == null){
            this.initializeOperators();
        }
	}

	/**
	 * adds a variable and its value in the MathEvaluator variables
	 */
	public addVariableNumber(v:string, val:number) {
		let nv: NodeValue = new NodeValue();
		nv.setDouble(val);
		this.variables[v] = nv;
	}

	/**
	 * adds a variable and its value in the MathEvaluator variables
	 */
	public addVariableString(v:string, val:string) {
        let nv: NodeValue = new NodeValue();
        let d:number = parseFloat(val);
        if(!isNaN(d)){
            nv.setDouble(d);
			this.variables[v] = nv;
		}else{
            nv.setString(val);
			this.variables[v] = nv;
		}
	}

	public clearVariables() {
		this.variables = new Object();
	}

	public setExpression(expression: string){
		this.expression = expression;
		this.expressionNode = new ExpressionNode(this, null, expression, 0);
	}

	public getExpression():string {
		return this.expression;
	}

	public reset() {
		this.expression = null;
		this.variables = new Object();
	}

	public getVariables() {
		return this.variables;
	}

	/**
	 * evaluates and returns the value of the expression
	 */
	public getValue():NodeValue{
		if (this.expression == null){
			return null;
		}
		try {
			return this.evaluate(this.expressionNode);
		} catch (e) {
			return null;
		}
	}

	/** Evaluates and returns the value for the node element */
	private evaluate(eNode: ExpressionNode): NodeValue {
		if (eNode.hasOperator() && eNode.hasChild()) {
			let type = eNode.getNodeOperator().getType();
			if (type == 1)
				eNode.setValue(this.evaluateExpression(eNode.getNodeOperator(), this.evaluate(eNode.getLeft()), null));
			else if (type == 2)
				eNode.setValue(this.evaluateExpression(eNode.getNodeOperator(), this.evaluate(eNode.getLeft()), this.evaluate(eNode.getRight())));
		}
		return eNode.getValue();
	}

	/** Evaluates and returns the value for a given operation and 2 NodeValue */
	private evaluateExpression(operator: Operator, nv1: NodeValue, nv2: NodeValue): NodeValue {
		let opString: string = operator.getOperator();
		let res: NodeValue = new NodeValue();
		if ("+" === opString)
			res.setDouble(nv1.doubleValue() + nv2.doubleValue());
		else if ("-" === opString)
			res.setDouble(nv1.doubleValue() - nv2.doubleValue());
		else if ("*" === opString)
			res.setDouble(nv1.doubleValue() * nv2.doubleValue());
		else if ("/" === opString)
			res.setDouble(nv1.doubleValue() / nv2.doubleValue());
		else if ("^" === opString)
			res.setDouble(Math.pow(nv1.doubleValue(), nv2.doubleValue()));
		else if ("%" === opString)
			res.setDouble(nv1.doubleValue() % nv2.doubleValue());
		else if ("cos" === opString)
			res.setDouble(Math.cos(nv1.doubleValue()));
		else if ("sin" === opString)
			res.setDouble(Math.sin(nv1.doubleValue()));
		else if ("tan" === opString)
			res.setDouble(Math.tan(nv1.doubleValue()));
		else if ("acos" === opString)
			res.setDouble(Math.acos(nv1.doubleValue()));
		else if ("asin" === opString)
			res.setDouble(Math.asin(nv1.doubleValue()));
		else if ("atan" === opString)
			res.setDouble(Math.atan(nv1.doubleValue()));
		else if ("sqr" === opString)
			res.setDouble(nv1.doubleValue() * nv1.doubleValue());
		else if ("sqrt" === opString)
			res.setDouble(Math.sqrt(nv1.doubleValue()));
		else if ("ln" === opString)
			res.setDouble(Math.log(nv1.doubleValue()));
		else if ("min" === opString)
			res.setDouble(Math.min(nv1.doubleValue(), nv2.doubleValue()));
		else if ("max" === opString)
			res.setDouble(Math.max(nv1.doubleValue(), nv2.doubleValue()));
		else if ("exp" === opString)
			res.setDouble(Math.exp(nv1.doubleValue()));
		else if ("floor" === opString)
			res.setDouble(Math.floor(nv1.doubleValue()));
		else if ("ceil" === opString)
			res.setDouble(Math.ceil(nv1.doubleValue()));
		else if ("abs" === opString)
			res.setDouble(Math.abs(nv1.doubleValue()));
		else if ("rnd" === opString)
			res.setDouble(Math.random() * nv1.doubleValue());

		return res;
	}

	private initializeOperators() {
		this.operators = [];
		this.operators.push(new Operator("+", 2, 10));
		this.operators.push(new Operator("-", 2, 10));
		this.operators.push(new Operator("*", 2, 15));
		this.operators.push(new Operator("/", 2, 15));
		this.operators.push(new Operator("^", 2, 15));
		this.operators.push(new Operator("%", 2, 15));
		this.operators.push(new Operator("cos", 1, 20));
		this.operators.push(new Operator("sin", 1, 20));
		this.operators.push(new Operator("tan", 1, 20));
		this.operators.push(new Operator("acos", 1, 20));
		this.operators.push(new Operator("asin", 1, 20));
		this.operators.push(new Operator("atan", 1, 20));
		this.operators.push(new Operator("sqrt", 1, 20));
		this.operators.push(new Operator("sqr", 1, 20));
		this.operators.push(new Operator("ln", 1, 20));
		this.operators.push(new Operator("min", 2, 20));
		this.operators.push(new Operator("max", 2, 20));
		this.operators.push(new Operator("exp", 1, 20));
		this.operators.push(new Operator("floor", 1, 20));
		this.operators.push(new Operator("ceil", 1, 20));
		this.operators.push(new Operator("abs", 1, 20));
		this.operators.push(new Operator("rnd", 1, 20));
	}

	/** Gets the variable'expression value that was assigned previously */
	public getVariable(expression: string): NodeValue {
		if (expression.length >= 1) {
			// test if this a real quoted string and not a variable
			if (expression.charAt(0) == '\'' && expression.charAt(expression.length - 1) == '\'') {
				let nv = new NodeValue();
				nv.setString(expression.substring(1, expression.length - 1));
				return nv;
			}
		}
		return this.variables[expression];
	}

	getOperators() {
		return this.operators;
	}

	public addVariableName(nString: string) {
		this.variableNames.push(nString);
	}
}