import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCreanciersComponent } from './liste-creanciers.component';

describe('ListeCreanciersComponent', () => {
  let component: ListeCreanciersComponent;
  let fixture: ComponentFixture<ListeCreanciersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCreanciersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCreanciersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
