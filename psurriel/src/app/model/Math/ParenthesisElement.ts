import { MathExpression } from "./MathExpression";
import { MathExpressionElement } from "./MathExpressionElement";

export class ParenthesisElement extends MathExpressionElement{

    expression? : MathExpression

    isParenthesis : boolean = true;

    constructor(expression? : MathExpression){
        super();
        this.expression = expression;
    }

}
