import { MathExpressionComponent } from "src/app/components/angularFormulas/math-expression/math-expression.component";
import { MathExpression } from "./MathExpression";
import { MathExpressionElement } from "./MathExpressionElement";

export class MathExpressionInputHandler {

    public x :number = 0;
    public y : number = 0;
    public pressed : boolean = false;
    public ignoreMouseDown:boolean = false;
    public deltaToClickedElement : {x:number,y:number} = {x:0,y:0};
    public draggedElement? : HTMLElement;
    public draggingElement : boolean = false;
    public draggedMathElement? : MathExpressionElement;

    public expression : MathExpressionComponent;
    constructor(expression : MathExpressionComponent){
        this.expression = expression;
    }

    public globalOnTouchMove(event : any) : void  {
        if(!this.expression.isRoot)
            return;

        this.x = event.touches[0].clientX;
        this.y = event.touches[0].clientY;
        this.expression.onInputMoves();
    }

  globalOnMouseUp(event : any) {
    this.pressed = false;
    this.expression.onReleased()
  }
  
  globalOnTouchEnd(event : any) {
    this.pressed = false;
    this.expression.onReleased()
  }


  globalOnMouseMove(event : any) {
    if(!this.expression.isRoot)
      return;

    this.x = event.clientX;
    this.y = event.clientY;
    this.expression.onInputMoves();
  }

}
