import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit {

  constructor() { }

  slidesContainer : any
  currentScroll : number = 0
  slideHeihgt:number = 0
  slidesCount:number = 0

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.slidesContainer = document.getElementById("slidesContainer")
    let slides = document.getElementsByTagName("app-project-slide")
    this.slideHeihgt = slides[0].getBoundingClientRect().height
    this.slidesCount = slides.length
  }


  private applyCurrentScroll(){
    this.slidesContainer.scroll({
      top: this.currentScroll,
      behavior: 'smooth'
    });
  }

  onNextClicked(){

    this.currentScroll += this.slideHeihgt
    let totalHeight = (this.slidesCount-1) * this.slideHeihgt

    if(this.currentScroll > totalHeight){
      this.currentScroll = totalHeight
    }
    this.applyCurrentScroll()

    
  }

  onPrevClicked(){
    this.currentScroll -= this.slideHeihgt
    
    if(this.currentScroll < 0){
      this.currentScroll = 0
    }
    this.applyCurrentScroll()
  }

}
