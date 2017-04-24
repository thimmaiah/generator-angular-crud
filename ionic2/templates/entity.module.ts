import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { <%= featureSingularName %> } from './<%= slugifiedName %>';
import { <%= featureSingularName %>Details } from './<%= slugifiedName %>-details';
import { <%= featureSingularName %>Form } from './<%= slugifiedName %>-form';

@NgModule({
  declarations: [
    <%= featureSingularName %>,
    <%= featureSingularName %>Details,
    <%= featureSingularName %>Form
  ],
  imports: [
    IonicPageModule.forChild(<%= featureSingularName %>),
    IonicPageModule.forChild(<%= featureSingularName %>Details),
    IonicPageModule.forChild(<%= featureSingularName %>Form)
  ],
  exports: [
    <%= featureSingularName %>,
    <%= featureSingularName %>Details,
    <%= featureSingularName %>Form
  ]
})
export class <%= featurePluralName %>sModule {}
