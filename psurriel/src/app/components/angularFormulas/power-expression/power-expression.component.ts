import { Component, Input, OnInit } from '@angular/core';
import { MathExpression } from 'src/app/model/Math/MathExpression';
import { PowerElement } from 'src/app/model/Math/PowerElement';
import { MathExpressionComponent } from '../math-expression/math-expression.component';

@Component({
  selector: 'power-expression',
  templateUrl: './power-expression.component.html',
  styleUrls: ['./power-expression.component.css']
})
export class PowerExpressionComponent implements OnInit {

  @Input() power? : PowerElement

  @Input() root? : MathExpressionComponent


  constructor() { }

  ngOnInit() {
  }

}
