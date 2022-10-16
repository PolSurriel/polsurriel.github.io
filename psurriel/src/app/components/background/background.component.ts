import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  constructor() { }


  numberOfBluredBlobs = 10
  numberOfBlobs = 5
  bluredBlobs : Array<any> = []
  blobs : Array<any> = []

 
  
  private generateBlobSettings(numberOfBlobs : number) : Array<any>{
    let result = []

    for (let i = 0; i < numberOfBlobs; i++) {
      result.push({
        x:Math.random() * screen.width,
        y:Math.random() * screen.height,
        scale: 2 + Math.random() * 2.0,
      })
    }
    return result
  }

  ngOnInit() {
    this.bluredBlobs = this.generateBlobSettings(this.numberOfBluredBlobs)
    this.blobs = this.generateBlobSettings(this.numberOfBlobs)
    
  }

}
