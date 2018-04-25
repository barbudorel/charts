export class Pair<S,T> {
	
	left:S;
	right:T;
	
	public constructor(left:S, right:T) {
		this.left = left;
		this.right = right;
	}

	public toString():string {
		return "Pair [left=" + this.left + ", right=" + this.right + "]";
	}
}
