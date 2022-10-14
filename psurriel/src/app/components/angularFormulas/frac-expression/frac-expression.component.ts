import { Component, Input, OnInit } from '@angular/core';
import { FracElement } from 'src/app/model/Math/FracElement';
import { MathExpression } from 'src/app/model/Math/MathExpression';
import { MathExpressionComponent } from '../math-expression/math-expression.component';

@Component({
  selector: 'frac-expression',
  templateUrl: './frac-expression.component.html',
  styleUrls: ['./frac-expression.component.scss']
})
export class FracExpressionComponent implements OnInit {


  @Input() fracElement? : FracElement
  @Input() nominator? : MathExpression
  @Input() denominator? : MathExpression
  @Input() root? : MathExpressionComponent;

  constructor() { }

  ngOnInit() {
  }

}
