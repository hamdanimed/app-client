import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCreanceComponent } from './formulaire-creance.component';

describe('FormulaireCreanceComponent', () => {
  let component: FormulaireCreanceComponent;
  let fixture: ComponentFixture<FormulaireCreanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireCreanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
