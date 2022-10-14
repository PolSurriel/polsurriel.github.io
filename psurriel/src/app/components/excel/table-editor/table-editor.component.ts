import { Input } from '@angular/core';
import { Component, OnInit, HostListener } from '@angular/core';
import { DynamicTableControllerService } from 'src/app/services/dynamic-table-controller.service';


enum DropDownMode{
  COLUMN,
  ROW
} 


@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.scss']
})
export class TableEditorComponent implements OnInit {

  dropdownActive : boolean = false;
  dropdownColumnX : number = 0;
  dropdownColumnY : number = 0;
  dropdownMode :DropDownMode = DropDownMode.COLUMN;
  private mouseOverColumnResizer : boolean = false;
  private selectedRowIndex : number = 0;
  private selectedColumnIndex : number = 0;
  private editingColumnSize : boolean = false;
  private columnResizeStartClientX : number = 0;
  
  @Input() fillAllWidth : boolean = false;
  
  constructor(
    public dynamicTableController :DynamicTableControllerService
    ){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit():void{
    this.dynamicTableController.tableContent[0][0] = "Hi!"
    this.dynamicTableController.tableContent[2][0] = "This"
    this.dynamicTableController.tableContent[2][1] = "is"
    this.dynamicTableController.tableContent[2][2] = "editable!"
    this.dynamicTableController.tableContent[4][0] = "Click"
    this.dynamicTableController.tableContent[4][1] = "me"
    this.dynamicTableController.tableContent[4][2] = "<3"

  }
  
  @HostListener('mouseup')
  private mouseUp() : void {
    if(this.editingColumnSize){
      this.editingColumnSize = false;
    }
  }

  @HostListener('mousemove', ['$event'])
  private mouseMove(event:Event) : void {
    if(this.editingColumnSize){
      let clientX : number = (event as any).clientX; 
      let newSize = clientX - this.columnResizeStartClientX;
      let thElement = document.getElementById('letter_column'+this.selectedColumnIndex) as any;

      
      // we need to maje the table container bigger to avoid css constrain bugs
      let container = document.getElementById('tableContainer') as any;
      let table = document.getElementById('editable-table') as any;
      
      container.style.width = table.offsetWidth + 10 + 'px'

      thElement.style.width = newSize+'px';
      
    }
  }

  onClickColumnResizer(index : number, event : Event) : void{

    if(this.mouseOverColumnResizer){
      this.selectedColumnIndex = index;
      this.editingColumnSize = true;
      this.columnResizeStartClientX = (event as any).clientX;

      let thElement = document.getElementById('letter_column'+index);
      let currentWidth = thElement?.offsetWidth;


      this.columnResizeStartClientX -= currentWidth as number;
    }
  }

  onMouseOutColumnResizer(){
    this.mouseOverColumnResizer = false;
  }

  onMouseOverColumnResizer() : void{
    this.mouseOverColumnResizer = true;
  }

  onKeyDownAndCellFocused(i:number, j : number, event:Event) : void {

    if ((event as any).keyCode === 38) { // Arrow Up
      document.getElementById('cell_'+(i-1)+'_'+j)?.focus();
    }else if ((event as any).keyCode === 40){ // Arrow Down
      document.getElementById('cell_'+(i+1)+'_'+j)?.focus();

    }
  }

  /**
   * Fixes Angular focus loss with value binding.
   * It's an standard solution.
   * More info: https://stackoverflow.com/questions/50139508/input-loses-focus-when-editing-value-using-ngfor-and-ngmodel-angular5
   */
  trackByFn(index:number, item:any) {   return index; }
 
  private activateDropDown(mode : DropDownMode) : void{
    this.dropdownActive = true;
    this.dropdownMode = mode;
  }

  openColumnDropdown(index : number, event : Event):void {
    if(this.mouseOverColumnResizer || this.editingColumnSize)
      return;

    this.activateDropDown(DropDownMode.COLUMN);
    this.dropdownColumnY = (event as any).clientY;
    this.dropdownColumnX = (event as any).clientX;
    this.selectedColumnIndex = index;
  }


  onAddColumnClicked() : void {
    this.dynamicTableController.addColumn();
  }

  onAddRowClicked() : void {
    this.dynamicTableController.addRow();
  }

  onCopyRowToClipBoard() : void{
    navigator.clipboard.writeText(
      this.dynamicTableController.getRowContentAsString(this.selectedRowIndex)
      );
    this.dropdownActive = false;
  }

  onCopyColumnToClipBoard() : void{
   
    navigator.clipboard.writeText(
      this.dynamicTableController.getColumnContentAsString(this.selectedColumnIndex)
      );
    this.dropdownActive = false;
  }

  onDeleteSelectedColumn():void{
    this.dynamicTableController.deleteColumn(this.selectedColumnIndex);
    this.dropdownActive = false;
    
  }

  onDeleteSelectedRow():void{
    this.dynamicTableController.deleteRow(this.selectedRowIndex);
    this.dropdownActive = false;
  }

  onDropDownCloses():void{
    this.dropdownActive = false;
  }

  openRowDropdown(index : number, event : Event):void {
    this.activateDropDown(DropDownMode.ROW);
    this.dropdownColumnY = (event as any).clientY;
    this.dropdownColumnX = (event as any).clientX;
    this.selectedRowIndex = index;
  }



}
