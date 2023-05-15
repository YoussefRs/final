import { Component } from '@angular/core';

const services = [
  {
      path: 'https://i.imgur.com/LHo72G3.png',
      description: "Vous allez être fourni(e) d'une liste de programmes PL/SQL que vous pouvez exécuter."
  },
  {
      path: 'https://i.imgur.com/lqTXfQc.png',
      description: 'test test'
  },
  {
      path: 'https://i.imgur.com/OFYo0fj.png',
      description: 'test test'
  },
]

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  services = services
}
