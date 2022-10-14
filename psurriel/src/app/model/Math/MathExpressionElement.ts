import { MathExpression } from "./MathExpression";

export class MathExpressionElement {
    
    protected grabbable : boolean = true;
    public katex : string; 
    public htmlID : string;
    public htmlElement? : HTMLElement;

    public left? : MathExpressionElement;
    public right? : MathExpressionElement;

    public expressionContainer? : MathExpression;
    public root? : MathExpression;

    private static lastHtmlIDNumber = 0;
    constructor(katex:string = ''){
        this.katex = katex;
        this.htmlID = 'mathexpressionelement'+MathExpressionElement.lastHtmlIDNumber;
        MathExpressionElement.lastHtmlIDNumber = (MathExpressionElement.lastHtmlIDNumber +1) % Number.MAX_VALUE;
    }

    get isGrabbable (){
        return this.grabbable;
    }

}