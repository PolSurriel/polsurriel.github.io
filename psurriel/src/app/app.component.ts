import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'psurriel';

  
  ngOnInit() {
    setInterval(()=>{
      if(document.body.getBoundingClientRect().width > screen.width){
        document.body.style.width =screen.width+ "px !important"
      }
    }, 1000)
  }
  

}
