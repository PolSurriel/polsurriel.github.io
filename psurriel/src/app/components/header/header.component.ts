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

  onBurguerClicked(opened:Boolean, burguerMenu:HTMLElement) : void{
    
    if(!opened){
      burguerMenu.classList.add('closed')
    }else {
      burguerMenu.classList.remove('closed')
    }

  }

}
