import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';

enum DropDownMode{
  COLUMN,
  ROW
} 

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})

export class DropdownMenuComponent implements OnInit {

  @Input() mode : DropDownMode = 0;
  @Input() yPosition : number = 0;
  @Input() xPosition : number = 0;

  /**
   * I've added additional options to show you I 
   * always design thinking in scalable code.
   * 
   * The options are the same but in separated lists because
   * we may want to add specific options like insert a row bottom.
   */
  get options() : string[]{

    if(this.mode == DropDownMode.COLUMN){
      return ['Delete column', 'Copy to Clipboard']
    }else {
      return ['Delete row', 'Copy to Clipboard']
    }

  }

  @Output() closeMenu = new EventEmitter();
  @Output() deleteSelectedRow = new EventEmitter();
  @Output() deleteSelectedColumn = new EventEmitter();

  @Output() copyRowToClipboard = new EventEmitter();
  @Output() copyColumnToClipboard = new EventEmitter();


  /**
   * CAREFUL: The default value must be true, once you click to
   * show the menu the menu will show UNDER the mouse.
   */
  private mouseover : boolean = true;

  
  constructor() { }

  // COMPONENT PIPELINE METHODS
  ngOnInit(): void { }



  private onOptionClickedRow(optionIndex : number) : void{
    switch (optionIndex) {
      case 0: // delete row
        this.deleteSelectedRow.emit();
        break;
      case 1: // copy row content to clipboard
        this.copyRowToClipboard.emit();
        break;
    }
  }
  
  private onOptionClickedColumn(optionIndex : number) : void{
    switch (optionIndex) {
      case 0: // delete column
        this.deleteSelectedColumn.emit();
        break;

      case 1: // copy column content to clipboard
        this.copyColumnToClipboard.emit();
        break;
    }
  }

  public onOptionClicked(optionIndex : number) : void{
    switch (this.mode) {
      case DropDownMode.COLUMN:
        this.onOptionClickedColumn(optionIndex);
        break;
        
      case DropDownMode.ROW:
        this.onOptionClickedRow(optionIndex);
        break;
    }

  }

  @HostListener('mouseover')
  private mouseInside() : void {
    this.mouseover = true; 
  }

  @HostListener('mouseout')
  private mouseOut() : void{
    this.mouseover = false;
  }

  @HostListener('document:click')
  private clickout() : void {
    if(!this.mouseover){
      this.closeMenu.emit();
    }

  }


}
