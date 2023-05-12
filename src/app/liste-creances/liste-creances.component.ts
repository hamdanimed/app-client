import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-creances',
  templateUrl: './liste-creances.component.html',
  styleUrls: ['./liste-creances.component.css']
})
export class ListeCreancesComponent {
  creances = [
    { id: 1, name: 'Créance 1' },
    { id: 2, name: 'Créance 2' },
    { id: 3, name: 'Créance 3' },
    { id: 4, name: 'Créance 4' },
    { id: 5, name: 'Créance 5' },
    { id: 5, name: 'Créance 5' },
    { id: 5, name: 'Créance 5' },
    { id: 5, name: 'Créance 5' },
    { id: 5, name: 'Créance 5' },
    { id: 6, name: 'Créance 6' }
  ];
}
