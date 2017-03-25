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
  ) { }

  ngOnInit() {
    this.rows = this.datalayer.arrayMap;
  }

  updateTiny(change) {
    this._ngZone.run(() => {
      this.isTiny = change;
    });
  }

  updateCell() {
    console.log(this.selectedObject)
    this.datalayer.saveCell(this.selected, this.selectedObject);
  }

  catchSelection(evt) {
    this.setSelection(evt.key);
  }

  setSelection(key) {
    this._ngZone.run(() => {
      this.selected = key;
      this.selectedObject = this.datalayer.keyMap[key];
      console.log(this.selectedObject)
    });
  }

  moveSelection(x, y) {
    if (this.selected == undefined) this.selected = '1-1';
    let pos = this.selected.split('-');
    pos[0] = parseInt(pos[0], 10) + x;
    pos[1] = parseInt(pos[1], 10) + y;
    this.setSelection(pos.join('-'));
  }

  setBlockedDirection(dir) {
    this._ngZone.run(() => {
      this.datalayer.updatedBlocked(this.selected, dir);
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
