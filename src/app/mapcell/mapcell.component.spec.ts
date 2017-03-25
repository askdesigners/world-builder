import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapcellComponent } from './mapcell.component';

describe('MapcellComponent', () => {
  let component: MapcellComponent;
  let fixture: ComponentFixture<MapcellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapcellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapcellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
