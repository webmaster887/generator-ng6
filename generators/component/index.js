var yeomen= require('yeoman-generator');
var  path	    = require('path');
var changeCase = require('change-case');

module.exports = yeomen.NamedBase.extend({
  constructor: function () {
    yeomen.NamedBase.apply(this, arguments);
    this.name = changeCase.paramCase(this.name);
  },
  //promt for path
  promptName:function(){
    var done = this.async();

      var prompts = [{
        type    : 'input',
        name    : 'parent',
        message : 'Enter path (relative to components/)?',
        default : 'src/app/components'
      }];

      this.prompt(prompts, function (props) {
        this.parent = props.parent;
        done();
      }.bind(this));
  },

  copy:function(){
    var componentsPath = 'src/app/components';

    var files = [
      '.component.js',
      '.controller.js',
      '.css',
      '.html','.js','.spec.js'
    ];

    for(var i=0; i< files.length;i++){
      this.fs.copyTpl(
       this.templatePath(files[i]),
       this.destinationPath(path.join(componentsPath, this.parent, this.name,this.name+files[i] )),
        {
          name: this.name,
          pascalCase: changeCase.pascalCase(this.name),
          camelCase:changeCase.camelCase(this.name)
        }
     );
    }



  }
});
