import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = 'aqZeCnJodbscX4GsfKg13Q9yuOfWaFYV';
  private urlService:string = 'https://api.giphy.com/v1/gifs';

  private _history:string[] = [];

  public results:Gif[] = [];

  get history(){
    return [...this._history];
  }

  constructor( private http:HttpClient ) {

    this._history = JSON.parse(localStorage.getItem('history')!) || []; 
    this.results = JSON.parse(localStorage.getItem('results')!) || []; 

  }

  searchGifs( query:string = '' ){

    query = query.trim().toLowerCase();

    //control blank spaces
    if(query.trim()==''){
      return;
    }
    //no repetitive data
    if(!this._history.includes(query)){
      this._history.unshift(query);
      //limit 10 items
      this._history = this._history.splice(0,10);
      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.urlService}/search`, {params})
        .subscribe( (resp:SearchGifsResponse) => {
          this.results = resp.data;
          localStorage.setItem('results', JSON.stringify(this.results));
        })
        
  }
}
