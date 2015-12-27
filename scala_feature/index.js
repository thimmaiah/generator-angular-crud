'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var inflections = require('underscore.inflections');


module.exports = yeoman.generators.Base.extend({

  constructor: function () {

    yeoman.generators.Base.apply(this, arguments);

    this.argument('featureName', { type: String, required: true });
    this.argument('packageName', { type: String, required: true });

    this.featureName = _.capitalize(this.featureName);
    this.featureSingularName = inflections.singularize(this.featureName);
    this.featurePluralName = inflections.pluralize(this.featureName);

    this.slugifiedName = _.kebabCase(this.featureName);

  	this.camelizedSingularName = _.camelCase(this.featureSingularName);
    this.camelizedPluralName = _.camelCase(this.featurePluralName);

  },

  prompting: function () {

    this.log(yosay(
      'Adding a new scala feature!'
    ));

  },


  featureFiles: function () {
    
    var outFolder = "scala/" + this.packageName.replace(".", "/");
    
    // Render angular module files
    this.template('base/BaseService.scala', outFolder + "/base/BaseService.scala");
    this.template('base/StaticService.scala', outFolder + "/base/StaticService.scala");
    
    this.template('dao/Dao.scala', outFolder + "/dao/" + this.featureName + "Dao.scala");
    this.template('model/Model.scala', outFolder + "/model/" + this.featureName + ".scala");
    
    this.template('service/Service.scala', outFolder + "/service/" + this.featureName + "Service.scala");
    this.template('service/RoutesActor.scala', outFolder + "/service/" + this.featureName + "RoutesActor.scala");

  }

});
