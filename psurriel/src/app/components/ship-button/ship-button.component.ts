import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ship-button',
  templateUrl: './ship-button.component.html',
  styleUrls: ['./ship-button.component.scss']
})
export class ShipButtonComponent implements OnInit {

  shipButton : any = null

  constructor() { }

  launched : boolean = false
  hover : boolean = false
  readyForOutAnimation : boolean = false


  onFocus(){

    if(this.launched){
      return
    }
    this.readyForOutAnimation = false
    this.hover = true
    setTimeout(() => {
      if(this.hover){
        this.shipButton.classList.remove("launched")
        this.shipButton.classList.add("launched")
        this.readyForOutAnimation=true
      }
       
    }, 100);
    
  }
  
  onFocusOut(){

    if(this.launched){
      return
    }

    this.hover = false

    if(!this.readyForOutAnimation){
      this.shipButton.classList.remove("launched")
      return
    }


    let originalMT = this.shipButton.style.marginTop

    let wings = document.getElementsByClassName("wing")

    for (let i = 0; i < wings.length; i++) {
      wings[i].classList.add("hiddenWing")
    }

    this.shipButton.style.marginTop = "-220px"
    setTimeout(()=>{
      this.shipButton.style.marginTop = "-150px"
      setTimeout(()=>{ this.shipButton.style.marginTop = originalMT },160)
      this.shipButton.classList.remove("launched")
    }, 200)


  }


  onButtonClicked(){

    

    if(this.launched){
      return
    }


    this.launched=true

    let rocketFire = document.getElementById("bigSmokeContainer") as any
    rocketFire.style.opacity="1"
    rocketFire.style.transform ="scale(1.5)"

    let element = document.getElementById("containerShip") as any

    element.classList.add("launched")
    element.style.animation="launch 4s cubic-bezier(1,-0.01,.98,.15) 1"
    setTimeout(()=>{ 
      element.style.opacity="0"
    }, 4000)

  }

  ngOnInit() {

    this.shipButton = document.getElementById("theShip") 
    //this.shipButton = document.getElementById("thebody") 

  }

}
