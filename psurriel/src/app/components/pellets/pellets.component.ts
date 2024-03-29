import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-pellets',
  templateUrl: './pellets.component.html',
  styleUrls: ['./pellets.component.scss']
})
export class PelletsComponent implements OnInit {

  pelletslightElement? : HTMLElement
  shadowElement? : HTMLElement
  lightPos: any
  shadowCenter : any
  lightDir: any

  constructor() { }

  ngOnInit() {

    this.shadowElement = document.getElementById("shadow")!!
    this.pelletslightElement = document.getElementById("pelletslight")!!
  }

  mouseLeave(){

    this.shadowElement!!.style.animation  = this.previousAnimationShadow
    this.pelletslightElement!!.style.animation  = this.previousAnimationLight

    
  }

  previousAnimationShadow : any
  previousAnimationLight : any

  mouseEnter(){
    this.previousAnimationLight = this.pelletslightElement!!.style.animation
    this.previousAnimationShadow = this.shadowElement!!.style.animation
    this.shadowElement!!.style.animation  = "none"
    this.pelletslightElement!!.style.animation  = "none"

  }

  //@HostListener('document:mousemove', ['$event']) 
  onMouseMove(event :any) {
    let mousePos = {x:event.clientX,y:event.clientY}
    this.updateLightRotation(mousePos)
    this.updateShadow()
  }

  updateShadow(){
    let bounds = this.shadowElement!!.getBoundingClientRect()

    this.shadowCenter = {x:bounds.x, y:bounds.y + bounds.height*0.5}


    let dir = {x:0, y:0}
    dir.x = this.lightDir.x * 1
    dir.y = this.lightDir.y * 0.3


    let angle = Math.atan2(dir.y, dir.x)*180/Math.PI +10

    this.shadowElement!!.style.transform= "rotate("+angle+"deg)"

  }

  updateLightRotation(mousePos:any){

    let containerBounds = this.pelletslightElement?.parentElement?.getBoundingClientRect()
    this.lightPos = {
      x:containerBounds!!.x + 55,
      y:containerBounds!!.y + 64 
    }

    this.lightDir = {
      y:mousePos.y - this.lightPos.y,
      x:mousePos.x - this.lightPos.x
    }
    let magnitude = Math.sqrt(this.lightDir.x*this.lightDir.x + this.lightDir.y*this.lightDir.y)

    this.lightDir.x /= magnitude
    this.lightDir.y /= magnitude

    let angle = Math.atan2(this.lightDir.y, this.lightDir.x)*180/Math.PI

    angle -= 90
    this.pelletslightElement!!.style.transform= "rotate("+angle+"deg)"

  }

}
