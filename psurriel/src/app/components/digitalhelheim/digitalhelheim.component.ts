import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-digitalhelheim',
  templateUrl: './digitalhelheim.component.html',
  styleUrls: ['./digitalhelheim.component.scss']
})
export class DigitalhelheimComponent implements OnInit {


  svgElements : any

  particleContainers : any
  particles : any


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
    this.setupParticles()
  }

  setupParticles(){
    this.particleContainers = document.getElementsByClassName("particleContainer")
    this.particles = document.getElementsByClassName("particle")

    for (let i = 0; i < this.particles.length; i++) {
      let angle = Math.random()*120 - 60
      let duration = Math.max(Math.random(), 0.2) 
      let delay = Math.max(Math.random(), 0.2) 
      this.particleContainers[i].style.transform = "rotate("+(angle)+"deg)"
      this.particles[i].style.animationDuration = duration+"s"      
      this.particles[i].style.animationDelay = delay+"s"      
    }
  

  }

}
