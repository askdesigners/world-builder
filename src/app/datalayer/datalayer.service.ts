import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DatalayerService {

  public dimensions: number[];
  public selectedCell: String = '';
  public keyMap: any = {};
  public arrayMap: object[] = [];

  public selectionChange$: EventEmitter<any>;
  public dataChange$: EventEmitter<any>;
  public changedKey$: EventEmitter<any>;

  constructor() { 
    this.dimensions = [66,50];

    this.selectionChange$ = new EventEmitter();
    this.dataChange$ = new EventEmitter();
    this.changedKey$ = new EventEmitter();

    this.initMap();
  }

  loadMap(){
    // eventually load this from electron json file
  }

  updateSelection(key){
    console.log('update selection in service');
    this.selectedCell = key;
    this.selectionChange$.emit(this.selectedCell);
  }

  saveCell(key, data){
    console.log('save selection in service:', key, data);
    
    this.keyMap[key] = Object.assign(this.keyMap[key], data);
    this.changedKey$.emit({key, data: this.keyMap[key]});
    // this.buildArrays();
    //  update back into electron

  }

  updatedBlocked(key, dir){
    this.keyMap[key][dir] = !this.keyMap[key][dir];
    this.changedKey$.emit({key, data: this.keyMap[key]});
    // this.buildArrays();
    //  update back into electron

  }

  getDimensions(){
    return this.dimensions;
  }

  initMap(){
    // fetch keyMap or build it from dimensions
    this.buildOrFetchKeyMap();
    this.buildArrays();
  }

  buildOrFetchKeyMap(){
    // fetch, then if nothing, 
    
    let rows = Array.apply(null, {length: this.dimensions[1]}).map(()=>[]);
    let cols = Array.apply(null, {length: this.dimensions[0]}).map(()=>[]);

    this.arrayMap = rows.map((rElem, ri)=>{
      return cols.map((cElem, ci)=>{
        let key = `${ci+1}-${ri+1}`
        this.keyMap[key] = { key, name:'', descriptiveName:'', description: '', w: false, e: false, n: false, s: false };
      });
    });
  }

  buildArrays(){
    console.log('building');
    let rows = Array.apply(null, {length: this.dimensions[1]}).map(()=>[]);
    let cols = Array.apply(null, {length: this.dimensions[0]}).map(()=>[]);

    this.arrayMap = rows.map((rElem, ri)=>{
      return cols.map((cElem, ci)=>{
        let key = `${ci+1}-${ri+1}`
        let cell = this.keyMap[key];
        return cell;
      });
    });

  }

}
