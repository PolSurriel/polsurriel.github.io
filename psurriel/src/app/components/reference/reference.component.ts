import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent implements OnInit {

  @Input() refName:string =""
  @Input() refContext:string =""
  @Input() refCharge:string =""
  @Input() refContent:string =""
  @Input() refImgUrl:string =""

  constructor() { }

  ngOnInit() {
  }

}
