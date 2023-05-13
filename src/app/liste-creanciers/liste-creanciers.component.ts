import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-creanciers',
  templateUrl: './liste-creanciers.component.html',
  styleUrls: ['./liste-creanciers.component.css']
})
export class ListeCreanciersComponent {
  images = [  { url: '../../assets/Cashplus.jpg', title: 'Image 1' },  { url: '../../assets/téléchargement.png', title: 'Image 2' },  { url: '../../assets/téléchargement.png', title: 'Image 4' },  { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  { url: '../../assets/téléchargement.png', title: 'Image 6' }];


}
