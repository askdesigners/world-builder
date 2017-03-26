import { Component, OnInit, NgZone } from '@angular/core';
import { DatalayerService } from '../datalayer/datalayer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-descriptions-view',
  templateUrl: './descriptions-view.component.html',
  styleUrls: ['./descriptions-view.component.css'],
  host: {
    '(document:keyup)': 'handleKeyboardEvents($event)'
  }
})
export class DescriptionsViewComponent implements OnInit {

  rows: object[];
  selectedObject: any = {};
  isTiny: Boolean = false;
  selected: String;

  constructor(
    private datalayer: DatalayerService,
    private _ngZone: NgZone
  ) {
    this.datalayer.selectionChange$.subscribe(key => this.setSelectedObjectData(key));
    this.datalayer.mapReady$.subscribe(mapArray => this.linkMap(mapArray))
  }

  ngOnInit() {
    this.linkMap(this.datalayer.arrayMap);
  }

  linkMap(data){
    console.log('linking data', data);
    this._ngZone.run(() => {
      this.rows = data;
    });
  }

  updateTiny(change) {
    this._ngZone.run(() => {
      this.isTiny = change;
    });
  }

  updateCell() {
    this.datalayer.saveCell(this.datalayer.selectedCell, this.selectedObject);
  }

  setSelectedObjectData(key) {
    this._ngZone.run(() => {
      this.selectedObject = Object.assign({},this.datalayer.keyMap[key]);
    });
  }

  moveSelection(x, y) {
    if (this.datalayer.selectedCell == undefined) this.datalayer.selectedCell = '1-1';
    let pos = this.datalayer.selectedCell.split('-');
    pos[0] = parseInt(pos[0], 10) + x;
    pos[1] = parseInt(pos[1], 10) + y;
    this.datalayer.updateSelection(pos.join('-'));
  }

  setBlockedDirection(dir) {
    this._ngZone.run(() => {
      this.datalayer.updatedBlocked(this.datalayer.selectedCell, dir);
    });
  }

  handleKeyboardEvents(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (evt.ctrlKey) {
      switch (evt.key) {
        case 'a':
          this.setBlockedDirection('w');
          break;
        case 'w':
          this.setBlockedDirection('n');
          break;
        case 'd':
          this.setBlockedDirection('e');
          break;
        case 's':
          this.setBlockedDirection('s');
          break;
      }
    }
    switch (evt.key) {
      case 'ArrowLeft':
        this.moveSelection(-1, 0);
        break;
      case 'ArrowUp':
        this.moveSelection(0, -1);
        break;
      case 'ArrowRight':
        this.moveSelection(1, 0);
        break;
      case 'ArrowDown':
        this.moveSelection(0, 1);
        break;
    }
    return false;
  }


}
