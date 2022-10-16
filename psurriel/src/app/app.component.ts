import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'psurriel';


  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(document.body.getBoundingClientRect().width > screen.width){
      document.body.style.width =screen.width+ "px !important"
    }
  }

  
  ngOnInit() {
    setInterval(()=>{
      if(document.body.getBoundingClientRect().width > screen.width){
        document.body.style.width =screen.width+ "px !important"
      }
    }, 1000)
  }
  

}
