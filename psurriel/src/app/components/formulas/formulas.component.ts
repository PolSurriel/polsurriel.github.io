import { Component, OnInit } from '@angular/core';

import { FracElement } from 'src/app/model/Math/FracElement';
import { MathExpression } from 'src/app/model/Math/MathExpression';
import { MathExpressionContext } from 'src/app/model/Math/MathExpressionContext.enum';
import { MathExpressionElement } from 'src/app/model/Math/MathExpressionElement';
import { Operation } from 'src/app/model/Math/Operation';
import { ParenthesisElement } from 'src/app/model/Math/ParenthesisElement';
import { PowerElement } from 'src/app/model/Math/PowerElement';
import { SQRTElement } from 'src/app/model/Math/SQRTElement';
import { TestUtils } from 'src/app/model/test/TestUtils';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.scss']
})
export class FormulasComponent implements OnInit {

  
  constructor() {

  }

  ngOnInit(): void {
    
  }

}
