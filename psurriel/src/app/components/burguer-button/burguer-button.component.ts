import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-burguer-button',
  templateUrl: './burguer-button.component.html',
  styleUrls: ['./burguer-button.component.scss']
})
export class BurguerButtonComponent implements OnInit {

  private rotated : Boolean = false

  @Output() clickEventEmmiter = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit() {
  }

  onClick(button : HTMLElement){

    this.rotated = !this.rotated
    if(!this.rotated){

      button.style.rotate = "180deg"

      setTimeout(()=>{
        button.style.rotate = "0deg"
      },550)
      button.classList.remove('burguer-opened-container')
    }else {
      button.classList.add('burguer-opened-container')

    }

    this.clickEventEmmiter.emit(this.rotated)

  }

}
