'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var inflections = require('underscore.inflections');


module.exports = yeoman.generators.Base.extend({

  constructor: function () {

    yeoman.generators.Base.apply(this, arguments);

    this.option('feature');
    this.option('app');
    
    if(this.options.feature) {
    	this.argument('featureName', { type: String, required: true });
        
	    this.featureName = _.capitalize(this.featureName);
	    this.featureSingularName = inflections.singularize(this.featureName);
	    this.featurePluralName = inflections.pluralize(this.featureName);
	    this.slugifiedName = _.kebabCase(this.featureName);
	  	this.camelizedSingularName = _.camelCase(this.featureSingularName);
	    this.camelizedPluralName = _.camelCase(this.featurePluralName);
    }
    
    if(this.options.app || this.options.feature) {
    	this.argument('packageName', { type: String, required: true });
    	this.outFolder = "src/main/scala/" + this.packageName.replace(/\./g, "/");
    	if(this.options.feature) {
    		this.outFolder = this.outFolder + "/" + this.slugifiedName
    	}
    }

  },

  prompting: function () {

    this.log(yosay(
      '--feature: yo angular-crud:scala_feature Trade your.package.name --feature \n --app: yo angular-crud:scala_feature your.package.name --app'
    ));

  },


  featureFiles: function () {
    
    if(this.options.app) {
    	// Render the app files - contains all base classes and bootup stuff
	    this.template('base/BaseService.scala', this.outFolder + "/base/BaseService.scala");
	    this.template('base/StaticService.scala', this.outFolder + "/base/StaticService.scala");
	    this.template('base/RoutesActor.scala', this.outFolder + "/base/RoutesActor.scala");
	    this.template('base/TokenAuthenticator.scala', this.outFolder + "/base/TokenAuthenticator.scala");
	    this.template('boot/Boot.scala', this.outFolder + "/boot/Boot.scala");
	    this.template('utils/CorsSupport.scala', this.outFolder + "/utils/CorsSupport.scala");
	    this.template('utils/CustomJson.scala', this.outFolder + "/utils/CustomJson.scala");
	    this.template('utils/DB.scala', this.outFolder + "/utils/DB.scala");
    }
    
    if(this.options.feature) {
    	// Render the actual feature
	    this.template('dao/Dao.scala', this.outFolder + "/dao/" + this.featureName + "Dao.scala");
	    this.template('model/Model.scala', this.outFolder + "/model/" + this.featureName + ".scala");    
	    this.template('service/Service.scala', this.outFolder + "/service/" + this.featureName + "Service.scala");
	    this.template('service/RoutesActor.scala', this.outFolder + "/service/" + this.featureName + "RoutesActor.scala");
    }

  }

});
