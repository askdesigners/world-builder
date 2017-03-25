import { Injectable } from '@angular/core';

@Injectable()
export class DatalayerService {

  public dimensions: number[];
  public keyMap: any = {};
  public arrayMap: object[] = [];

  constructor() { 
    this.dimensions = [66,50];

    this.initMap();
  }

  loadMap(){
    // eventually load this from electron json file
  }

  saveCell(key, data){
    console.log(key, data);

    this.keyMap[key] = Object.assign(this.keyMap[key], data);
    this.buildArrays();
    //  update back into electron

  }

  updatedBlocked(key, dir){
    this.keyMap[key][dir] = !this.keyMap[key][dir];
    this.buildArrays();
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
    console.log('reuilding');
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
