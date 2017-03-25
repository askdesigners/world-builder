import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionsViewComponent } from './descriptions-view.component';

describe('DescriptionsViewComponent', () => {
  let component: DescriptionsViewComponent;
  let fixture: ComponentFixture<DescriptionsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
