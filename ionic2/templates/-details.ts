import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { <%= featureSingularName %>Form } from '../<%= slugifiedName %>/<%= slugifiedName %>-form';
import { <%= featureSingularName %>Api } from '../../providers/<%= slugifiedName %>-api';
import { ResponseUtility } from '../../providers/response-utility';
/**
 * Generated class for the <%= featurePluralName %>Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-<%= slugifiedName %>-details',
  templateUrl: '<%= slugifiedName %>-details.html',
})
export class <%= featureSingularName %>Details {

  <%= camelizedSingularName %>: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public <%= camelizedSingularName %>Api: <%= featureSingularName %>Api,
    public alertController: AlertController,
    public toastController: ToastController,
    public respUtility: ResponseUtility) {
    this.<%= camelizedSingularName %> = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad <%= featurePluralName %>Details');
  }

  edit<%= featureSingularName %>(<%= camelizedSingularName %>) {
    this.navCtrl.push(<%= featureSingularName %>Form, <%= camelizedSingularName %>);
  }

  delete<%= featureSingularName %>(<%= camelizedSingularName %>) {
    this.<%= camelizedSingularName %>Api.delete<%= featureSingularName %>(<%= camelizedSingularName %>).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted <%= featurePluralName %>");
        this.navCtrl.pop();
      },
      error => {
        this.respUtility.showFailure(error);
      }
    );
  }

  confirmDelete(<%= camelizedSingularName %>) {
    this.respUtility.confirmDelete(this.delete<%= featureSingularName %>.bind(this), <%= camelizedSingularName %>);      
  }
}
