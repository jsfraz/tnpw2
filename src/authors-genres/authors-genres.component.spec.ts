import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsGenresComponent } from './authors-genres.component';

describe('AuthorsGenresComponent', () => {
  let component: AuthorsGenresComponent;
  let fixture: ComponentFixture<AuthorsGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsGenresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
