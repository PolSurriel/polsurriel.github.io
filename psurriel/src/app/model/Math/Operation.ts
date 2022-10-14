import { MathExpressionElement } from "./MathExpressionElement";

export class Operation extends MathExpressionElement {
    
    constructor(katex:string = ''){
        super(katex);
        this.grabbable = false;
    }

}
