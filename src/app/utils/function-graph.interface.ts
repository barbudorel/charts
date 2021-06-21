import { Point } from "./point";

/**
 * Supports method invocation of functions with non-generic signatures.
 */
export interface FunctionGraphInterface{

	/**
	 * Computes the values of a real-valued function of a real variable.
	 * @return [(x_0,y_0),(x_1,y_1),...,(x_n,y_n)] where y_i = f(a+i*(b-a)/n), i in (0,n)
	 */
	getGf():Array<Point>;

	getMinX():number;

	getMaxX():number;

	getMinY():number;

	getMaxY():number;
	
	initGf(): any;
}