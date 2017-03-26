import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy, NgZone } from '@angular/core';

import { DatalayerService } from '../datalayer/datalayer.service';

@Component({
  selector: 'app-mapcell',
  templateUrl: './mapcell.component.html',
  styleUrls: ['./mapcell.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MapcellComponent implements OnInit {

  @Input('cellData') cellData: any;
  @Input('selectedCell') selectedCell: String;

  @Output() cellSelected = new EventEmitter();

  public selected: Boolean = false;

  constructor(
    private _ngZone: NgZone,
    private datalayer: DatalayerService) {
    this.datalayer.selectionChange$.subscribe(key => this.checkForSelection(key));
    this.datalayer.changedKey$.subscribe(update => this.checkForUpdate(update));
  }

  ngOnInit() {
    this.selected = false;
  }

  checkForSelection(key){
    if(key === this.cellData.key){
      this._ngZone.run(() => {
        this.selected = true;
      });
    } else if(this.selected){
      this._ngZone.run(() => {
        this.selected = false;
      });
    }
  }
  
  checkForUpdate(update){
    if(update.key === this.cellData.key){
      this._ngZone.run(() => {
        this.cellData = update.data;
      });
    }
  }

  select() {
    this.datalayer.updateSelection(this.cellData.key);
  }

}
