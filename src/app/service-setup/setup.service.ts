import { Injectable } from '@angular/core';

@Injectable()
export class SetupService {
  
  public dimensions: number[];

  constructor() { 
    this.dimensions = [66,50];
  }

  getDimensions(){
    return this.dimensions;
  }

  getArrays(){
    let width = Array.apply(null, {length: this.dimensions[0]}).map(Number.call, Number);
    let height = Array.apply(null, {length: this.dimensions[1]}).map(Number.call, Number);

    return [width, height];
  }

}
