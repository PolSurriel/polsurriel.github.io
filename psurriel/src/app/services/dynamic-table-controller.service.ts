import { Injectable } from '@angular/core';
import { repeat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicTableControllerService {

  readonly cellDefaultValue : string = '';

  private content : string[][] = [];

    get maxJ():number{
    if(this.content.length == 0)
       return 0;
  
      return this.content[0].length;
  }
  get maxI():number{
     if(this.content.length == 0)
       return 0;
  
     return this.content.length;
  }
  get tableContent() : string[][]{
    return [...this.content];
  }

  readonly defaultRowsSize : number = 15; 
  readonly defaultColumnsSize : number = 8; 

  constructor() { 

    // default table values inizialization
    let rowTemplate = new Array<string>(this.defaultColumnsSize); 
    for (let i = 0; i < rowTemplate.length; i++) {
      rowTemplate[i] = this.cellDefaultValue;
    }

    for (let i = 0; i < this.defaultRowsSize; i++) {
      this.content.push([...rowTemplate])
    }
    

  }


  /**
   * 
   * Deletes the indicated row.
   * 
   * @param rowIndex index of the row that will be removed
   */
  public deleteRow(rowIndex : number) : void{
    this.content.splice(rowIndex, 1);
  }

  /**
   * Deletes the indicated column.
   * 
   * @param columnIndex index of the column that will be removed.
   */
  public deleteColumn(columnIndex : number) : void{
    for (let i = 0; i < this.content.length; i++) {
      this.content[i].splice(columnIndex, 1);
    }
  }

  /**
   * Adds a column at the right of the table.
   */
  public addColumn() : void{
    for (let i = 0; i < this.content.length; i++) {
      this.content[i].push(this.cellDefaultValue);
    }
  }

  /**
   * Adds a row at the bottom of the table.
   */
  public addRow() : void{
    let toAdd = new Array<string>(this.maxJ);
    for (let i = 0; i < toAdd.length; i++) {
      toAdd[i] = this.cellDefaultValue;
    }

    this.content.push(toAdd);
  }


  /**
   * A classic function copy-paste https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
   */
  private download(filename : string, text:string) : void {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
  }

  public getRowContentAsString(rowIndex : number) : string { 
    return this.content[rowIndex].join();
  }

  public getColumnContentAsString(columnIndex : number) : string { 
    let value = '';
    for (let i = 0; i < this.content.length; i++) {
      value += this.content[i][columnIndex];

      if(i<this.content.length-1){
        value += ',';
      }
    }

    return value;
  }

  /**
   * Saves a file with the content of the matrix.
   */
  public saveAsCSV():void{
    let output : string = '';

    for (const row of this.content) {
      let count = 0;
      for (const value of row) {
        output += value;
        if(count++ < row.length-1)
          output+= ',' 
      }
      if(row.length != 0)
      output += "\n";
    }

    this.download('output.csv', output);


  }

  /**
   * Loads the content from a string with csv format to content matrix.
   * 
   */
  public loadFromCSV(fileContent : string):void{
    let rowsplit = fileContent.split("\n");

    this.content = new Array<string[]>();
    let maxLen : number = 0;
    for(let row of rowsplit){
      let toAdd = row.split(',');
      if(toAdd.length > maxLen){
        maxLen = toAdd.length;
      }
      this.content.push(toAdd);
    }

    // file rows may have different size, but our matrix content cannot.
    // se we will fix this by adding empty values to all row with len < max len.

    for (let i = 0; i < this.content.length; i++) {
      while(this.content[i].length < maxLen){
        this.content[i].push('');
      }
    }

    // some csv files ends with a line jump.
    // so we gonna check if the last row is full of empty values
    // and remove it if that's the case
    let lastRowEmpty : boolean = true;
    for (const value of this.content[this.content.length-1]) {
      if(value !== ''){
        lastRowEmpty = false;
        break;
      }
    }

    if(lastRowEmpty){
      this.content.splice(this.content.length-1,1);
    }

  }


  /**
   * Given a j index, returns a string name for the column exactly like excel.
   * Example:
   *  jIndex = 0 => returns 'A'
   *  jIndex = 1 => returns 'B'
   *  jIndex = 26 => returns 'AA'
   */
   numericIndexToAlphabetIndex(numericIndex : number) : string {
    
    /*
    Basically, if we see the alphabet as a number basis of 26 possible digits,
    this function works as a basis change from basis 10 to 26 base.

    If you dont know how this basis change works, it will be better to understand
    the theory before reading the code.

    Take a look of this: http://www.carlospes.com/curso_representacion_datos/03_02_de_base_10_a_base_b.php
    */

    let letter = "";
    const asciiFirstAlphabetLetterIndex = 65;
    const lettersInASCIIAlphabet = 26;

    // if the jIndex has a single digit, let's just return its string value!
    if(numericIndex < lettersInASCIIAlphabet)
      return String.fromCharCode(numericIndex + asciiFirstAlphabetLetterIndex);


    // otherwise, we do the basis change by acumulating the modulus as digits:
    let results : number[] = [];

    while(numericIndex >= lettersInASCIIAlphabet){

      let division = numericIndex / lettersInASCIIAlphabet;
      let modulus = numericIndex % lettersInASCIIAlphabet;
      results.push(modulus);
      
      numericIndex = division;
      if(numericIndex < lettersInASCIIAlphabet)
        results.push(division-1);
    }
    
    // Then we bus re-order and format all the digits to strings:
    results.reverse();

    for(let numericVelue of results){
      letter += String.fromCharCode(numericVelue + asciiFirstAlphabetLetterIndex);
    }

    return letter;
  }

}

