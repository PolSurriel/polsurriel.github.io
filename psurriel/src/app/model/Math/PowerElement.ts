import { MathExpression } from "./MathExpression";
import { MathExpressionElement } from "./MathExpressionElement";

export class PowerElement extends MathExpressionElement {

    expression? : MathExpression
    isPower : boolean = true;

    exponent? : MathExpression

    constructor(expression? : MathExpression, exponent? : MathExpression){
        super();
        this.expression = expression;
        this.expression!!.context = this;
        this.exponent = exponent;
    }

}
