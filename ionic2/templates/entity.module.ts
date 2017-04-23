import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { <%= featurePluralName %>s } from './<%= camelizedSingularName %>s';
import { <%= featurePluralName %>Details } from './<%= camelizedSingularName %>-details';
import { <%= featurePluralName %>Form } from './<%= camelizedSingularName %>-form';

@NgModule({
  declarations: [
    <%= featurePluralName %>s,
    <%= featurePluralName %>Details,
    <%= featurePluralName %>Form
  ],
  imports: [
    IonicPageModule.forChild(<%= featurePluralName %>s),
    IonicPageModule.forChild(<%= featurePluralName %>Details),
    IonicPageModule.forChild(<%= featurePluralName %>Form)
  ],
  exports: [
    <%= featurePluralName %>s,
    <%= featurePluralName %>Details,
    <%= featurePluralName %>Form
  ]
})
export class <%= featurePluralName %>sModule {}
