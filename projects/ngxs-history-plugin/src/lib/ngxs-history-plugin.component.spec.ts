import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsHistoryPluginComponent } from './ngxs-history-plugin.component';

describe('NgxsHistoryPluginComponent', () => {
  let component: NgxsHistoryPluginComponent;
  let fixture: ComponentFixture<NgxsHistoryPluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxsHistoryPluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxsHistoryPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
