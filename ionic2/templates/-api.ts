import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the <%= featureSingularName %>Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class <%= featureSingularName %>Api {

  private base_url = "http://localhost:3000/<%= camelizedPluralName %>";
  <%= camelizedPluralName %> = [];
  <%= camelizedSingularName %> = {};

  constructor(public http: Http) {
    console.log('<%= featureSingularName %>Api Provider Created');
  }

  get<%= featurePluralName %>() {
    return this.http.get(`${this.base_url}.json`).map(response=>{
      this.<%= camelizedPluralName %> = response.json();
      return this.<%= camelizedPluralName %>;
    })
  }

  get<%= featureSingularName %>Details(<%= camelizedSingularName %>_id) {
    return this.http.get(`${this.base_url}/${<%= camelizedSingularName %>_id}.json`).map(response=>{
      this.<%= camelizedSingularName %> = response.json();
      return this.<%= camelizedSingularName %>;
    })
  }

  create<%= featureSingularName %>(<%= camelizedSingularName %>) {
    return this.http.post(`${this.base_url}.json`, <%= camelizedSingularName %>).map(response=>{
      this.<%= camelizedSingularName %> = response.json();
      return this.<%= camelizedSingularName %>;
      //return response.status;
    })
  }

  update<%= featureSingularName %>(<%= camelizedSingularName %>) {
    console.log(`<%= featureSingularName %>Api: Updating <%= camelizedSingularName %>`)
    console.log(<%= camelizedSingularName %>);
    return this.http.put(`${this.base_url}/${<%= camelizedSingularName %>.id}.json`, <%= camelizedSingularName %>).map(response=>{
      this.<%= camelizedSingularName %> = response.json();
      return this.<%= camelizedSingularName %>;
    })
  }

  delete<%= featureSingularName %>(<%= camelizedSingularName %>) {
    return this.http.delete(`${this.base_url}/${<%= camelizedSingularName %>.id}.json`).map(response=>{
      return response.status;
    })
  }

}
