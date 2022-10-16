import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  menuOpened = false
  burguerElement? : HTMLElement

  onBurguerClicked(opened:Boolean, burguerMenu:HTMLElement) : void{
    
    this.burguerElement = burguerMenu

    if(!opened){
      this.menuOpened = false
      burguerMenu.classList.add('closed')
    }else {
      this.menuOpened = true
      burguerMenu.classList.remove('closed')
    }

  }

  onOptionSelected(){

    if(this.menuOpened){

      document.getElementById("headerButton")!!.click()

    }

  }

}
