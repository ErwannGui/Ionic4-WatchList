import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrReaderPage } from './qr-reader.page';

describe('QrReaderPage', () => {
  let component: QrReaderPage;
  let fixture: ComponentFixture<QrReaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrReaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrReaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
