import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-digitalhelheim',
  templateUrl: './digitalhelheim.component.html',
  styleUrls: ['./digitalhelheim.component.scss']
})
export class DigitalhelheimComponent implements OnInit {


  svgElements : any

  constructor() { }

  ngOnInit() {
    this.svgElements = document.getElementsByClassName("svgItem")!!


    for (let i = 0; i < this.svgElements.length; i++) {
      this.svgElements[i].style.opacity = "0"

      this.svgElements[i].style.transform = "scaleX(0.5)"

    }

    var lastIndex = 0
    setInterval(()=>{
      this.svgElements[lastIndex].style.opacity = "0"
      
      let newIndex;
      do{
        newIndex = Math.floor(Math.random() * this.svgElements.length)
      }while(newIndex == lastIndex)
      
      lastIndex = newIndex 

      this.svgElements[lastIndex].style.opacity = "1"


    }, 100)
  }

}
