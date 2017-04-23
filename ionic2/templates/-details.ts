import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { <%= featurePluralName %>Form } from '../<%= camelizedSingularName %>s/<%= camelizedSingularName %>-form';
import { <%= featurePluralName %>Api } from '../../providers/<%= camelizedSingularName %>-api';
import { ResponseUtility } from '../../providers/response-utility';
/**
 * Generated class for the <%= featurePluralName %>Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-<%= camelizedSingularName %>-details',
  templateUrl: '<%= camelizedSingularName %>-details.html',
})
export class <%= featurePluralName %>Details {

  <%= camelizedSingularName %>: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public <%= camelizedSingularName %>Api: <%= featurePluralName %>Api,
    public alertController: AlertController,
    public toastController: ToastController,
    public respUtility: ResponseUtility) {
    this.<%= camelizedSingularName %> = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad <%= featurePluralName %>Details');
  }

  edit<%= featurePluralName %>(<%= camelizedSingularName %>) {
    this.navCtrl.push(<%= featurePluralName %>Form, <%= camelizedSingularName %>);
  }

  delete<%= featurePluralName %>(<%= camelizedSingularName %>) {
    this.<%= camelizedSingularName %>Api.delete<%= featurePluralName %>(<%= camelizedSingularName %>).subscribe(
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
    this.respUtility.confirmDelete(this.delete<%= featurePluralName %>.bind(this), <%= camelizedSingularName %>);      
  }
}
