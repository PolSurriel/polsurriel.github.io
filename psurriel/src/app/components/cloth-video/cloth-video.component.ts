import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-cloth-video',
  templateUrl: './cloth-video.component.html',
  styleUrls: ['./cloth-video.component.scss']
})
export class ClothVideoComponent implements OnInit {


  private video : any

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.video = document.getElementById("clothvideo") as any
  }
  

  @HostListener('document:click', ['$event']) 
  onMouseMove(e:MouseEvent) {
    if(this.video.paused)
      this.video.play()
    
  } 

}
