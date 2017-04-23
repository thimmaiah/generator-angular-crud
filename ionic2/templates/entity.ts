import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { <%= featurePluralName %>Api } from '../../providers/<%= camelizedSingularName %>-api';
import { ResponseUtility } from '../../providers/response-utility';
import { <%= featurePluralName %>Details } from '../<%= camelizedSingularName %>s/<%= camelizedSingularName %>-details'

/**
 * Generated class for the <%= featurePluralName %>s page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-<%= camelizedSingularName %>s',
  templateUrl: '<%= camelizedSingularName %>s.html',
})
export class <%= featurePluralName %>s {

  <%= camelizedSingularName %>s: any;
  <%= camelizedSingularName %>: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController, 
    public <%= camelizedSingularName %>Api: <%= featurePluralName %>Api, public respUtility: ResponseUtility) {
  }

  

  ionViewWillEnter() {
    console.log('ionViewWillEnter <%= featurePluralName %>s');

    let loader = this.loadingController.create({
      content: 'Loading <%= featurePluralName %>s...'
    });


    this.<%= camelizedSingularName %>Api.get<%= featurePluralName %>s().subscribe(
      <%= camelizedSingularName %>s => {
        this.<%= camelizedSingularName %>s = <%= camelizedSingularName %>s;
        console.log("Loaded <%= camelizedSingularName %>s");
      },
      error => { this.respUtility.showFailure(error); },
      () => { loader.dismiss(); }
    );

  }

  get<%= featurePluralName %>Details(<%= camelizedSingularName %>) {
    let loader = this.loadingController.create({
      content: 'Loading <%= featurePluralName %>s...'
    });

    loader.present()
    this.<%= camelizedSingularName %>Api.get<%= featurePluralName %>Details(<%= camelizedSingularName %>.id).subscribe(
      <%= camelizedSingularName %> => {
        this.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
        console.log("got <%= camelizedSingularName %> " + <%= camelizedSingularName %>);
        this.navCtrl.push(<%= featurePluralName %>Details, <%= camelizedSingularName %>);
      },
      error => { this.respUtility.showFailure(error); },
      () => { loader.dismiss(); }
    );

  }
}
