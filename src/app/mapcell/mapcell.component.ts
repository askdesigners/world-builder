import { Component, OnInit, OnChanges, EventEmitter, Input, Output, ChangeDetectionStrategy, NgZone } from '@angular/core';

@Component({
  selector: 'app-mapcell',
  templateUrl: './mapcell.component.html',
  styleUrls: ['./mapcell.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MapcellComponent implements OnInit, OnChanges{

  @Input('cellData') cellData: any;
  @Input('selectedCell') selectedCell: String; 
  
  @Output() cellSelected = new EventEmitter();

  public key: String = '';
  
  public selected: Boolean = false;

  constructor(private _ngZone: NgZone) { }

  ngOnInit() {
    this.selected = false;
    this.key = this.cellData.key;
  }

  ngOnChanges(changed){
      this._ngZone.run(()=>{
        this.selected = changed.selectedCell.currentValue === this.key;
      });
  }

  select(){
      this.cellSelected.emit(this);
  }

}
