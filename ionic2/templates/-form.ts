import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { <%= featurePluralName %>Api } from '../../providers/<%= camelizedSingularName %>-api';
import { ResponseUtility } from '../../providers/response-utility';

/**
 * Generated class for the <%= featurePluralName %>Form page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-<%= camelizedSingularName %>-form',
  templateUrl: '<%= camelizedSingularName %>-form.html',
})
export class <%= featurePluralName %>Form {

  <%= camelizedSingularName %>: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public <%= camelizedSingularName %>Api: <%= featurePluralName %>Api,
    public respUtility: ResponseUtility) {

    this.<%= camelizedSingularName %> = this.navParams.data;

    this.slideOneForm = formBuilder.group({
      <% var fieldLength = 0; for (var f in fieldMap) { %> 
      <%= f %>: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      <% fieldLength = fieldLength + 1;} %>  
    });

    this.slideTwoForm = formBuilder.group({
      
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad <%= featurePluralName %>Form');
  }


  next() {
    this.signupSlider.slideNext();
  }

  prev() {
    this.signupSlider.slidePrev();
  }

  save() {
    this.submitAttempt = true;
    //console.log(this.<%= camelizedSingularName %>);


    if (!this.slideOneForm.valid) {
      this.signupSlider.slideTo(0);
    }
    else if (!this.slideTwoForm.valid) {
      this.signupSlider.slideTo(1);
    }
    else {
      if (this.<%= camelizedSingularName %>["id"]) {
        this.<%= camelizedSingularName %>Api.update<%= featurePluralName %>(this.<%= camelizedSingularName %>).subscribe(
          <%= camelizedSingularName %> => {
            this.respUtility.showSuccess('<%= featurePluralName %> saved successfully.');
          },
          error => {
            this.respUtility.showFailure(error);
          }
        );
      } else {
        this.<%= camelizedSingularName %>Api.create<%= featurePluralName %>(this.<%= camelizedSingularName %>).subscribe(
          <%= camelizedSingularName %> => {
            this.respUtility.showSuccess('<%= featurePluralName %> saved successfully.');
          },
          error => {
            this.respUtility.showFailure(error);
          }
        );
      }
    }
  }

}
