import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { <%= featureSingularName %>Api } from '../../providers/<%= slugifiedName %>-api';
import { ResponseUtility } from '../../providers/response-utility';
import { <%= featureSingularName %>Details } from '../<%= slugifiedName %>/<%= slugifiedName %>-details'

/**
 * Generated class for the <%= featurePluralName %>s page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-<%= slugifiedName %>s',
  templateUrl: '<%= slugifiedName %>s.html',
})
export class <%= camelizedSingularName %> {

  <%= camelizedPluralName %>: any;
  <%= camelizedSingularName %>: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController, 
    public <%= camelizedSingularName %>Api: <%= featureSingularName %>Api, public respUtility: ResponseUtility) {
  }

  

  ionViewWillEnter() {
    console.log('ionViewWillEnter <%= featurePluralName %>s');

    let loader = this.loadingController.create({
      content: 'Loading <%= featurePluralName %>s...'
    });


    this.<%= camelizedSingularName %>Api.get<%= featurePluralName %>().subscribe(
      <%= camelizedPluralName %> => {
        this.<%= camelizedPluralName %> = <%= camelizedPluralName %>;
        console.log("Loaded <%= camelizedPluralName %>");
      },
      error => { this.respUtility.showFailure(error); },
      () => { loader.dismiss(); }
    );

  }

  get<%= featureSingularName %>Details(<%= camelizedSingularName %>) {
    let loader = this.loadingController.create({
      content: 'Loading <%= featurePluralName %>s...'
    });

    loader.present()
    this.<%= camelizedSingularName %>Api.get<%= featureSingularName %>Details(<%= camelizedSingularName %>.id).subscribe(
      <%= camelizedSingularName %> => {
        this.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
        console.log("got <%= camelizedSingularName %> " + <%= camelizedSingularName %>);
        this.navCtrl.push(<%= featureSingularName %>Details, <%= camelizedSingularName %>);
      },
      error => { this.respUtility.showFailure(error); },
      () => { loader.dismiss(); }
    );

  }
}
