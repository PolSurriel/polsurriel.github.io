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

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(event :any) {
    let mousePos = {x:event.clientX,y:event.clientY}
    this.updateLightRotation(mousePos)
    this.updateShadow()
  }

  updateShadow(){
    let bounds = this.shadowElement!!.getBoundingClientRect()

    this.shadowCenter = {x:bounds.x, y:bounds.y + bounds.height*0.5}


    let dir = {x:this.shadowCenter.x - this.lightPos.x, y:this.shadowCenter.y - this.lightPos.y}
    let magnitude = Math.sqrt(dir.x*dir.x + dir.y*dir.y)

    dir.x /= magnitude
    dir.y /= magnitude

    dir.x += this.lightDir.x * 1
    dir.y += this.lightDir.y * 1


    let angle = Math.atan2(dir.y, dir.x)*180/Math.PI

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
