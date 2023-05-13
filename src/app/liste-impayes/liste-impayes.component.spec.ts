import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeImpayesComponent } from './liste-impayes.component';

describe('ListeImpayesComponent', () => {
  let component: ListeImpayesComponent;
  let fixture: ComponentFixture<ListeImpayesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeImpayesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeImpayesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
