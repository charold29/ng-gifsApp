import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history:string[] = [];

  get history(){
    return [...this._history];
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
    }

    console.log(this._history);
  }
}
