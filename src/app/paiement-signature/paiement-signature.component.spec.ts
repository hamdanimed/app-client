import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementSignatureComponent } from './paiement-signature.component';

describe('PaiementSignatureComponent', () => {
  let component: PaiementSignatureComponent;
  let fixture: ComponentFixture<PaiementSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementSignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
