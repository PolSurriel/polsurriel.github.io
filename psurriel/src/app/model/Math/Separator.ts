import { MathExpressionContext } from "./MathExpressionContext.enum";
import { MathExpressionElement } from "./MathExpressionElement";
import { Operation } from "./Operation";
import { SeparatorEventsEquation } from "./SeparatorEvents/SeparatorEventsEquation";
import { SeparatorEventsFree } from "./SeparatorEvents/SeparatorEventsFree";
import { SeparatorEventsSimplification } from "./SeparatorEvents/SeparatorEventsSimplification";

export class Separator extends MathExpressionElement{

    constructor(){
        super();
        this.grabbable = false;
    }

    public elementCanBeDraggedIn(element : MathExpressionElement, htmlElement : HTMLElement): boolean{
        
        switch(this.root!!.context){
            case MathExpressionContext.FREE:
                return SeparatorEventsFree.elementCanBeDraggedIn(this, element, htmlElement);
            case MathExpressionContext.EQUATION:
                return SeparatorEventsEquation.elementCanBeDraggedIn(this, element, htmlElement);
            case MathExpressionContext.SIMPLIFICATION:
                return SeparatorEventsSimplification.elementCanBeDraggedIn(this, element, htmlElement);
        }
        
        return false;
    }

    public onElementDraggedOverOut(){
        switch(this.root!!.context){
            case MathExpressionContext.FREE:
                SeparatorEventsFree.onElementDraggedOverOut(this);
                break;
            case MathExpressionContext.EQUATION:
                SeparatorEventsEquation.onElementDraggedOverOut(this)
                break;
            case MathExpressionContext.SIMPLIFICATION:
                SeparatorEventsSimplification.onElementDraggedOverOut(this)
                break;
        }
    }

    public onElementDraggedOver(draggedMathElement : MathExpressionElement, draggedElement : HTMLElement): void {

        switch(this.root!!.context){
            case MathExpressionContext.FREE:
                SeparatorEventsFree.onElementDraggedOver(this, draggedMathElement, draggedElement)
                break;
            case MathExpressionContext.EQUATION:
                SeparatorEventsEquation.onElementDraggedOver(this, draggedMathElement, draggedElement)
                break;
            case MathExpressionContext.SIMPLIFICATION:
                SeparatorEventsSimplification.onElementDraggedOver(this, draggedMathElement, draggedElement)
                break;
        }
        
       
    }

    public onElementDraggedIn(draggedMathElement : MathExpressionElement, draggedElement : HTMLElement) : void{
        switch(this.root!!.context){
            case MathExpressionContext.FREE:
                SeparatorEventsFree.onElementDraggedIn(this, draggedMathElement, draggedElement)
                break;
            case MathExpressionContext.EQUATION:
                SeparatorEventsEquation.onElementDraggedIn(this, draggedMathElement, draggedElement)
                break;
            case MathExpressionContext.SIMPLIFICATION:
                SeparatorEventsSimplification.onElementDraggedIn(this, draggedMathElement, draggedElement)
                break;
        }
    }

}
