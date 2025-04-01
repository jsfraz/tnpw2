import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonecComponent } from './konec.component';

describe('KonecComponent', () => {
  let component: KonecComponent;
  let fixture: ComponentFixture<KonecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
