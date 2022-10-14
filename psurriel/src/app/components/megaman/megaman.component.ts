import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-megaman',
  templateUrl: './megaman.component.html',
  styleUrls: ['./megaman.component.scss']
})
export class MegamanComponent implements OnInit {

  selectedDistanceToMouse:any
  selectedElement? : HTMLElement
  selectedElementImg? : HTMLElement
  columns : any
  originalColumn : any
  originalRelativePos : any

  constructor() { }

  findColumnByMousePos(event:any){
    for (let i = 0; i < this.columns.length; i++) {
      let bounds = this.columns[i].getBoundingClientRect()

      if(
        event.clientX > bounds.x
        &&
        event.clientY > bounds.y
        &&
        event.clientX < bounds.x + bounds.width
        &&
        event.clientY < bounds.y + bounds.height
      ){

        return this.columns[i]; 
        break;
      }
    }

    return null

  }

  onClickOutPostIt(event:any){

    let selectedColumn = this.findColumnByMousePos(event)

    let relativePos
    if(!selectedColumn){
      selectedColumn = this.originalColumn
    
      relativePos = this.originalRelativePos
    }else{
      relativePos = {
        x: this.selectedElement!!.getBoundingClientRect().x - selectedColumn.getBoundingClientRect().x,  
        y: this.selectedElement!!.getBoundingClientRect().y - selectedColumn.getBoundingClientRect().y  
      }      
    }

    selectedColumn.appendChild(this.selectedElement!!)

    this.selectedElement!!.style.position = "absolute"
    this.selectedElement!!.style.top = ""
    this.selectedElement!!.style.left = ""
    this.selectedElementImg!!.style.marginLeft = relativePos.x+"px"
    this.selectedElementImg!!.style.marginTop = relativePos.y+"px"
    this.selectedElement = undefined
  }

  onClickPostit(event:any){
    this.originalColumn = this.findColumnByMousePos(event)



    let element = event.target as HTMLElement

    let bounds = element.getBoundingClientRect()

    // CORREGIR
    this.originalRelativePos = {
      x: element.getBoundingClientRect().x - this.originalColumn.getBoundingClientRect().x,  
      y: element.getBoundingClientRect().y - this.originalColumn.getBoundingClientRect().y  
    }    

    this.selectedDistanceToMouse = {
      x: bounds.x - event.clientX,
      y: bounds.y - event.clientY
    }

    element.style.margin = "0px"
    element.parentElement!!.style.position = "fixed"
    this.selectedElement = element.parentElement!!
    this.selectedElementImg = element
    this.updateNotePosition(event)
  }

  ngOnInit() {
    this.columns = document.getElementsByClassName("noteColumn")!!
  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e:MouseEvent) {
    if(this.selectedElement){
      this.updateNotePosition(e)
    }
  }

  updateNotePosition(e:any){
    this.selectedElement!!.style.top =
      (e.clientY+this.selectedDistanceToMouse.y)+"px"
    this.selectedElement!!.style.left = 
      (e.clientX+this.selectedDistanceToMouse.x)+"px"
  }

}
