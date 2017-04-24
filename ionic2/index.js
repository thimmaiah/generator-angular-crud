'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var inflections = require('underscore.inflections');
var changeCase = require('change-case')


module.exports = yeoman.generators.Base.extend({

  constructor: function () {

    yeoman.generators.Base.apply(this, arguments);
    
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    this.argument('featureName', { type: String, required: true });
    this.argument('fields', { type: String, required: false });
  	if(this.fields) {
  		// Ensure fields are captured to generate the fields inside the Table/Model
  		this.fields = this.fields.replace(/\s/g, "");
  		var f = this.fields.split(",");
  		this.fieldMap = {};
      this.fieldMapPascalCase = {};
  		for (var i in f) {
  			var temp = f[i].split(":");
  			this.fieldMap[temp[0]] = temp[1];
        this.fieldMapPascalCase[temp[0]] = changeCase.titleCase(temp[0]);
  		}
  		console.log(this.fieldMap);
  		
  	}
	
    this.featureName = changeCase.pascalCase(this.featureName);
    this.featureSingularName = inflections.singularize(this.featureName);
    this.featurePluralName = inflections.pluralize(this.featureName);

    this.slugifiedName = _.kebabCase(this.featureName);
    this.slugifiedNamePlural = inflections.pluralize(this.slugifiedName);

  	this.camelizedSingularName = _.camelCase(this.featureSingularName);
    this.camelizedPluralName = _.camelCase(this.featurePluralName);

  },

  prompting: function () {

    this.log(yosay(
      'Adding a new ionic 2 feature!'
    ));

  },


  featureFiles: function () {

    // Define file names
    var details = 'src/client/app/' + this.slugifiedName + '/' + this.slugifiedName + '-details';
    var form = 'src/client/app/' + this.slugifiedName + '/' + this.slugifiedName + '-form';
    var entity = 'src/client/app/' + this.slugifiedName + '/' + this.slugifiedName;
    var api = 'src/client/app/' + this.slugifiedName + '/' + this.slugifiedName + '-api';
    
    // Render angular module files
    this.template('-details.ts', details + ".ts");
    this.template('-details.html', details + ".html");
    this.template('-form.ts', form + ".ts");
    this.template('-form.html', form + ".html");
    this.template('entity.ts', entity + ".ts");
    this.template('entity.html', entity + ".html");
    this.template('entity.scss', entity + ".scss");
    this.template('entity.module.ts', entity + ".module.ts");
    this.template('-api.ts', api + ".ts", null, { 'interpolate': /<%=([\s\S]+?)%>/g });
  }

});
