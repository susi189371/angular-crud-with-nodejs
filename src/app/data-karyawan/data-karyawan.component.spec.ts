import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataKaryawanComponent } from './data-karyawan.component';

describe('DataKaryawanComponent', () => {
  let component: DataKaryawanComponent;
  let fixture: ComponentFixture<DataKaryawanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataKaryawanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataKaryawanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
