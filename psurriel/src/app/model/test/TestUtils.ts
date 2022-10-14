import { FracElement } from "../Math/FracElement";
import { MathExpression } from "../Math/MathExpression";
import { MathExpressionElement } from "../Math/MathExpressionElement";
import { Separator } from "../Math/Separator";
import { SQRTElement } from "../Math/SQRTElement";

export class TestUtils {
    public static getTestingMathExpression(): MathExpression{
        let result = TestUtils.getTestingMathExpressionWithoutFrac();

        let op = new MathExpressionElement()
        op.katex = "+"
        let frac = new FracElement();
        frac.nominator = TestUtils.getTestingMathExpressionWithoutSQRT();
        frac.denominator = TestUtils.getTestingMathExpressionWithoutSQRT();

        result.elements.push(op)
        result.elements.push(frac)
        
        for(var sep of frac.nominator.separators){
            result.separators.push(sep);
        }

        for(var sep of frac.denominator.separators){
            result.separators.push(sep);
        }

        

        return result;
    }


    public static getTestingMathExpressionWithoutFrac(): MathExpression{

        let result = TestUtils.getTestingMathExpressionWithoutSQRT();
        let op = new MathExpressionElement()
        op.katex = "+"
        result.elements.push(op)
        let sep = new Separator();
        result.separators.push(sep);
        result.elements.push(sep)

        let sqrt = new SQRTElement()
        sqrt.expression = new MathExpression();
        let tmp = ["x", "+", "y^2"];
        sep = new Separator();
        result.separators.push(sep);
        sqrt.expression.elements.push(sep);
        for (let i = 0; i < tmp.length; i++) {
            let toAdd = new MathExpressionElement();
            toAdd.katex = tmp[i];
            sqrt.expression.elements.push(toAdd);
            sep = new Separator();
            result.separators.push(sep);
            sqrt.expression.elements.push(sep);
        }

        sep = new Separator();
        result.separators.push(sep);
        result.elements.push(sep)
        result.elements.push(sqrt)
        sep = new Separator();
        result.separators.push(sep);
        result.elements.push(sep)

        return result;

    }

    public static getTestingMathExpressionWithoutSQRT(): MathExpression{

        let result = new MathExpression();

        let tmp = ["a", "+", "b^2", "·", "c"];
        let sep = new Separator();
        result.separators.push(sep);
        result.elements.push(sep);
        for (let i = 0; i < tmp.length; i++) {
            let toAdd = new MathExpressionElement();
            toAdd.katex = tmp[i];
            result.elements.push(toAdd);
            sep = new Separator();
            result.separators.push(sep);
            result.elements.push(sep);
        }
    
        return result;

    }
}
