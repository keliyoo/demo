import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneDemoComponent } from './standalone-demo.component';

describe('StandaloneDemoComponent', () => {
  let component: StandaloneDemoComponent;
  let fixture: ComponentFixture<StandaloneDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandaloneDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandaloneDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
