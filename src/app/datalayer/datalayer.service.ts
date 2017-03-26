import { Injectable, EventEmitter } from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class DatalayerService {

  public dimensions: number[];
  public selectedCell: String = '';
  public keyMap: any = {};
  public arrayMap: object[] = [];

  public selectionChange$: EventEmitter<any>;
  public mapReady$: EventEmitter<any>;
  public changedKey$: EventEmitter<any>;

  constructor(private _electronService: ElectronService) {
    this.dimensions = [66, 50];

    this.selectionChange$ = new EventEmitter();
    this.mapReady$ = new EventEmitter();
    this.changedKey$ = new EventEmitter();

    this._electronService.ipcRenderer.on('getmap-reply', (evt, map) => {
      this.buildOrFetchKeyMap(map);
    })

    this.initMap();
  }

  initMap() {
    this._electronService.ipcRenderer.send('getmap', this.dimensions);
  }

  updateSelection(key) {
    console.log('update selection in service');
    this.selectedCell = key;
    this.selectionChange$.emit(this.selectedCell);
  }
  
  saveMap(){
    this._electronService.ipcRenderer.send('updatemap', this.keyMap);
  }

  saveCell(key, data) {
    console.log('save selection in service:', key, data);
    this.keyMap[key] = Object.assign(this.keyMap[key], data);
    this.changedKey$.emit({ key, data: this.keyMap[key] });
    this.saveMap();
  }

  updatedBlocked(key, dir) {
    this.keyMap[key][dir] = !this.keyMap[key][dir];
    this.changedKey$.emit({ key, data: this.keyMap[key] });
    this.saveMap();
  }

  getDimensions() {
    return this.dimensions;
  }

  buildOrFetchKeyMap(mapData) {
    this.keyMap = mapData;
    this.buildArrays(mapData);
  }

  buildArrays(mapData) {
    console.log('building arrays');
    let rows = Array.apply(null, { length: this.dimensions[1] }).map(() => []);
    let cols = Array.apply(null, { length: this.dimensions[0] }).map(() => []);

    this.arrayMap = rows.map((rElem, ri) => {
      return cols.map((cElem, ci) => {
        let key = `${ci + 1}-${ri + 1}`
        let cell = this.keyMap[key];
        return cell;
      });
    });
    
    this.mapReady$.emit(this.arrayMap);
  }

}
