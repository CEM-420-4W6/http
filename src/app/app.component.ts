import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  artist = "Mating Ritual";
  similarArtists: string[] = [];

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.requete();
  }

  // On ajoute async devant la méthode pour pouvoir utiliser await à l'intérieur de la méthode 
  async requete() {
    let URL='http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json&artist=' + this.artist;
    
    // await permet à la méthode de se mettre en pause pour attendre la fin de l'exécution de la requête HTTP
    let res:any = await lastValueFrom(this.http.get<any>(URL))

    console.log(res);

    let lastFmSimilars = res.artist.similar.artist;

    for(let i=0; i<lastFmSimilars.length; i++) {
      this.similarArtists.push(lastFmSimilars[i].name);
    }

    this.similarArtists = [];

      // On pourrait aussi utiliser un foreach
    lastFmSimilars.forEach((similar: any) => {
      this.similarArtists.push(similar.name);
    });

  }
}



