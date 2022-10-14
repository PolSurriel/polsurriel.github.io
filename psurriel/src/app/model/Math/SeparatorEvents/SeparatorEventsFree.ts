import { MathExpressionElement } from "../MathExpressionElement";
import { Operation } from "../Operation";
import { Separator } from "../Separator";

export class SeparatorEventsFree {

    public static elementCanBeDraggedIn(separator : Separator, element : MathExpressionElement, htmlElement : HTMLElement): boolean{
        return true;
    }

    public static onElementDraggedOverOut(separator : Separator,){
        separator.katex = '';
        separator.htmlElement!!.style.width = '0px';
    }

    public static onElementDraggedOver(separator : Separator, draggedMathElement : MathExpressionElement, draggedElement : HTMLElement): void {
        separator.htmlElement!!.style.width = (draggedElement.getBoundingClientRect().width + 20)+"px";
        if(separator.left instanceof Operation || separator.left === null || separator.left === undefined){
            separator.katex = draggedMathElement.katex+ "+";
    
        }else {
            separator.katex = "+" + draggedMathElement.katex;
    
        }
    }

    public static onElementDraggedIn(separator : Separator, element : MathExpressionElement, htmlElement : HTMLElement) : void{
        
    }


}
