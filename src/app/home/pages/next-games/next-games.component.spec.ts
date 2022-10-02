import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGamesComponent } from './next-games.component';

describe('NextGamesComponent', () => {
  let component: NextGamesComponent;
  let fixture: ComponentFixture<NextGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
