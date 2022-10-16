import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  @Input() title : string = ""
  @Input() publishedDate : string = ""
  @Input() tag : string = ""
  @Input() imageUrl : string = ""
  @Input() link : string = ""

  constructor() { }

  ngOnInit() {
  }

}
