import { Component, Input, OnInit, Output } from '@angular/core';
import { MathExpression } from 'src/app/model/Math/MathExpression';
import { SQRTElement } from 'src/app/model/Math/SQRTElement';
import { MathExpressionComponent } from '../math-expression/math-expression.component';

@Component({
  selector: 'sqrt-expression',
  templateUrl: './sqrt-expression.component.html',
  styleUrls: ['./sqrt-expression.component.scss']
})
export class SqrtExpressionComponent implements OnInit {

  @Input() sqrtElement? : SQRTElement;
  @Input() root? : MathExpressionComponent;

  constructor() { }

  ngOnInit() {
  }


  onClick(rootElement : HTMLElement){
    rootElement.style.opacity = "0.5";
    // Enviar el evento de ser agarrado al padre enviandole como htmlelement el root y como elemento el sqerElement;

  }

}
