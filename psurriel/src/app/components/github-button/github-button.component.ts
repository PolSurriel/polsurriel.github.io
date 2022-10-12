import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-github-button',
  templateUrl: './github-button.component.html',
  styleUrls: ['./github-button.component.scss']
})
export class GithubButtonComponent implements OnInit {


  public static mouseInGithubButton : boolean = false 

  constructor() { }


  onMouseEnter(){
    GithubButtonComponent.mouseInGithubButton = true
  }

  onMouseExit(){
    GithubButtonComponent.mouseInGithubButton = false
  }

  ngOnInit() {
  }

}
