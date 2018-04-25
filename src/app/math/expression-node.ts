import { MathEvaluator } from "./math-evaluator";
import { Operator } from "./operator";
import { NodeValue } from "./node-value";

/**
 * Class that implements a node with operator object; used to create a binary
 * tree to implement evaluator algorithm
 */
export class ExpressionNode {

	mathEvaluator: MathEvaluator;
	public nString: string = null;
	public nOperator: Operator = null;
	public nLeft: ExpressionNode = null;
	public nRight: ExpressionNode = null;
	public nParent: ExpressionNode = null;
	public nLevel: number = 0;
	public nValue: NodeValue = null;
	public isVariable: boolean  = false;
	public isConstant: boolean = false;
	public isOperator: boolean = false;

	public constructor(mathEvaluator: MathEvaluator, parent: ExpressionNode, expression: string, level: number){
		this.mathEvaluator = mathEvaluator;
		this.init(parent, expression, level);
	}

	private init(parent: ExpressionNode, expression: string, level: number){
		if (expression == null || expression.length == 0) {
			throw new Error("Null or Empty expression");
		}
		expression = this.removeIllegalCharacters(expression);
		expression = this.removeBrackets(expression);
		expression = this.addZero(expression);
		if (this.checkBrackets(expression) != 0) {
			throw new Error("Wrong number of brackets in [" + expression + "]");
		}
		this.nParent = parent;
		this.nString = expression;
		this.nLevel = level;
		let sLength = expression.length;
		if (sLength == 0) {
			throw new Error("Empty expression");
		}
		let inBrackets = 0;
		let startOperator = 0;
		for (let i = 0; i < sLength; i++) {
			if (expression.charAt(i) == '(') {
				inBrackets++;
			} else if (expression.charAt(i) == ')') {
				inBrackets--;
			} else {
				// the expression must be at "root" level
				if (inBrackets == 0) {
					let op: Operator = this.getOperator(this.nString, i);
					if (op != null) {
						// if first operator or lower priority operator
						if (this.nOperator == null || this.nOperator.getPriority() >= op.getPriority()) {
							this.nOperator = op;
							startOperator = i;
							// Have to skip the operator length. Otherwise new operators may be found inside
							// the already found ones.
							i += this.nOperator.op.length - 1;
						}
					}
				}
			}
		}

		if (this.nOperator != null) {
			// one operand, should always be at the beginning
			if (startOperator == 0 && this.nOperator.getType() == 1) {
				// the brackets must be ok
				let nodeValue = expression.substring(this.nOperator.getOperator().length);
				if (this.checkBrackets(nodeValue) == 0) {
					this.nLeft = new ExpressionNode(this.mathEvaluator, this, nodeValue, this.nLevel + 1);
					this.nRight = null;
					this.isOperator = true;
					return;
				} else {
					throw new Error("Error during parsing... missing brackets in [" + expression + "]");
				}
			}
			// two operands
			else if (startOperator > 0 && this.nOperator.getType() == 2) {
				this.nLeft = new ExpressionNode(this.mathEvaluator, this, expression.substring(0, startOperator), this.nLevel + 1);
				this.nRight = new ExpressionNode(this.mathEvaluator, this, expression.substring(startOperator + this.nOperator.getOperator().length), this.nLevel + 1);
			}else if(startOperator == 0 && this.nOperator.getType() == 2) {
				let commaPosition = this.getCommaSeparationIndex(expression);
				this.nLeft = new ExpressionNode(this.mathEvaluator, this, expression.substring(startOperator+this.nOperator.getOperator().length+1, commaPosition), this.nLevel + 1);
				this.nRight = new ExpressionNode(this.mathEvaluator, this, expression.substring(commaPosition+1, expression.length-1), this.nLevel + 1);
			}
			
			this.isOperator = true;
		} else {
			// check if constant or variable
			// parse the value to double only if the first char is "." or a digit
			let firstChar = expression.charAt(0);
			if ((firstChar >= '0' && firstChar <= '9') || firstChar == '-' || firstChar == '.' || firstChar == '+') {
                let d = parseFloat(expression);
                if(isNaN(d)){
                    this.isVariable = true;
                }else{
                    let nv = new NodeValue();
                    nv.setDouble(d);
                    this.nValue = nv;
                    this.isConstant = true;
                }				
			} else {
				// variable or quoted string
				if (expression.length >= 1) {
					// test if this a real quoted string and not a variable
					if (expression.charAt(0) == '\'' && expression.charAt(expression.length - 1) == '\'') {
                        let nv = new NodeValue();
                        nv.setString(expression.substring(1, expression.length - 1));
						this.nValue = nv;
						this.isConstant = true;
					} else {
						this.isVariable = true;
						this.mathEvaluator.addVariableName(this.nString);
					}
				} else {
					this.isVariable = true;
					//this.mathEvaluator.addVariableName(this.nString);
				}
			}
		}
	}

	private getCommaSeparationIndex(s:string):number{
		let sLength = s.length;
		if (sLength == 0) {
			throw new Error("Empty expression");
		}
		let inBrackets = 0;
		for (let i = 0; i < sLength; i++) {
			if (s.charAt(i) == '(') {
				inBrackets++;
			} else if (s.charAt(i) == ')') {
				inBrackets--;
			} else {
				if (inBrackets == 1 && s.charAt(i) == ',' ) {
					return i;
				}
			}
		}
		throw new Error("Error in finding comma separation for: "+s);
	}

	getOperator(s: string, start: number): Operator {
		let operators: Array<Operator> = this.mathEvaluator.getOperators();
		let temp: string = s.substring(start);
		temp = ExpressionNode.getNextWord(temp);
		for (let i = 0; i < operators.length; i++) {
			if (temp.startsWith(operators[i].getOperator())) {
				return operators[i];
			}
		}
		return null;
	}

	static getNextWord(s: string): string {
		let sLength = s.length;
		for (let i = 1; i < sLength; i++) {
			let c = s.charAt(i);
			if ((c > 'z' || c < 'a') && (c > '9' || c < '0') && c != '_') {
				return s.substring(0, i);
			}
		}
		return s;
	}

	private checkBrackets(s: string): number {
		let sLength = s.length;
		let inBracket = 0;

		for (let i = 0; i < sLength; i++) {
			if (s.charAt(i) == '(' && inBracket >= 0)
				inBracket++;
			else if (s.charAt(i) == ')')
				inBracket--;
		}
		return inBracket;
	}

	/** returns a string that doesn't start with a + or a - */
	private addZero(s: string): string {
		if (s.startsWith("+") || s.startsWith("-")) {
			let sLength = s.length;
			for (let i = 0; i < sLength; i++) {
				if (this.getOperator(s, i) != null)
					return "0" + s;
			}
		}
		return s;
	}

	hasChild(): boolean {
		return (this.nLeft != null || this.nRight != null);
	}

	public hasOperator(): boolean {
		return (this.nOperator != null);
	}	

	getLeft(): ExpressionNode {
		return this.nLeft;
	}

	hasRight(): boolean {
		return (this.nRight != null);
	}

	getRight(): ExpressionNode {
		return this.nRight;
	}

	getNodeOperator(): Operator {
		return this.nOperator;
	}

	/**
	 * @return a NodeValue object storing the node value
	 */
	getValue(): NodeValue {
		if (this.isVariable) {
			return this.mathEvaluator.getVariable(this.nString);
		}
		return this.nValue;
	}

	setValue(f: NodeValue) {
		this.nValue = f;
	}

	/** Removes spaces, tabs and brackets at the begining */
	public removeBrackets(s: string): string {
		let res: string = s;
		if (s.length > 2 && res.startsWith("(") && res.endsWith(")")
				&& this.checkBrackets(s.substring(1, s.length - 1)) == 0) {
			res = res.substring(1, res.length - 1);
		}
		if (res != s) {
			return this.removeBrackets(res);
		} else {
			return res;
		}
	}

	public removeIllegalCharacters(s: string): string {
		let illegalCharacters = [ ' ' ];
		let res: string = s;

		for (let j = 0; j < illegalCharacters.length; j++) {
			let i = res.lastIndexOf(illegalCharacters[j], res.length);
			while (i != -1) {
				let temp: string = res;
				res = temp.substring(0, i);
				res += temp.substring(i + 1);
				i = res.lastIndexOf(illegalCharacters[j], s.length);
			}
		}
		return res;
	}
}