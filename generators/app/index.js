const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the divine ' + chalk.red('generator-iview-admin') + ' generator!')
    );

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }, {
      type: 'input',
      name: 'description',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project'
    }, {
      type: 'confirm',
      name: 'lint',
      message: 'Use ESLint to lint your code?'
    }, {
      when: 'lint',
      name: 'lintStyle',
      type: 'list',
      message: 'Pick an ESLint preset',
      choices: [{
        name: 'Standard (https://github.com/feross/standard)',
        value: 'standard',
        short: 'Standard'
      }, {
        name: 'Airbnb (https://github.com/airbnb/javascript)',
        value: 'airbnb',
        short: 'Airbnb'
      }, {
        name: 'none (configure it yourself)',
        value: 'none',
        short: 'none'
      }]
    }, {
      type: 'list',
      message: 'Vue build',
      name: 'vueFile',
      choices: [{
        name: 'Runtime + Compiler: recommended for most users',
        value: 'standalone',
        short: 'standalone'
      }, {
        name: 'Runtime-only: about 6KB lighter min+gzip, but temp…e files - render functions are required elsewhere',
        value: 'runtime',
        short: 'runtime'
      }]
    }, {
      type: 'confirm',
      message: 'Setup unit tests with Karma + Mocha?',
      name: 'unitTest'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.initPackage();
    this.simplyCopyFiles();
    this.renderTplFile();
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }

  initPackage() {
    let pkg = this.fs.readJSON(this.templatePath('package.json'), {});
    const {
      props
    } = this;

    pkg = _.merge(pkg, {
      name: props.name,
      description: props.description
    });

    if (props.lint) {
      let lintDep;
      switch (props.lintStyle) {
        case 'standard':
          lintDep = {
            "eslint-config-standard": "^10.2.1",
            "eslint-plugin-promise": "^3.4.0",
            "eslint-plugin-standard": "^3.0.1",
            "eslint-plugin-import": "^2.7.0",
            "eslint-plugin-node": "^5.2.0"
          };
          break;
        case 'airbnb':
          lintDep = {
            "eslint-config-airbnb-base": "^12.1.0",
            "eslint-import-resolver-webpack": "^0.8.3",
            "eslint-plugin-import": "^2.7.0"
          };
          break;
        default:
          lintDep = {};
          break;
      }
      pkg = _.merge(pkg, {
        devDependencies: {
          "babel-eslint": "^7.1.1",
          "eslint": "^4.9.0",
          "eslint-friendly-formatter": "^3.0.0",
          "eslint-loader": "^1.7.1",
          "eslint-plugin-html": "^3.0.0",
        }
      }, {
        devDependencies: lintDep
      });
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  simplyCopyFiles() {
    let simplyFiles = [
      '.babelrc',
      '.editorconfig',
      '.eslintignore',
      '.gitignore',
      '.postcssrc.js',
      'static/.gitkeep',
      'config/dev.env.js',
      'config/index.js',
      'config/prod.env.js',
      'build/build.js',
      'build/check-versions.js',
      'build/dev-client.js',
      'build/utils.js',
      'build/vue-loader.conf.js',
      'build/webpack.dev.conf.js',
      'config/dev.env.js',
      'config/prod.env.js',
      'config/index.js',
      'src/App.vue',
      'src/router/index.js',
      'src/css/_frame.less',
      'src/css/_reset.less',
      'src/css/index.less',
      'src/css/vars.less',
      'src/components/dashboard/Header.vue',
      'src/components/dashboard/Root.vue',
      'src/components/Hello.vue',
      'src/assets/img/f_logo.svg',
      'src/assets/img/favicon.ico'
    ];

    if (this.props.unitTest) {
      simplyFiles = simplyFiles.concat([
        'config/test.env.js',
        'test/unit/.eslintrc',
        'test/unit/index.js',
        'test/unit/index.js',
        'test/unit/karma.conf.js',
        'test/unit/specs/Hello.spec.js',
        'build/webpack.test.conf.js'
      ]);
    }

    _.forEach(simplyFiles, file => {
      this.fs.copy(
        this.templatePath(file),
        file
      );
    });
  }

  renderTplFile() {
    const target = [
      'README.md',
      '.eslintrc.js',
      'build/dev-server.js',
      'build/webpack.base.conf.js',
      'build/webpack.prod.conf.js',
      'src/main.js'
    ];

    _.forEach(target, file => {
      const readmeTmpl = _.template(this.fs.read(this.templatePath(file)));
      this.fs.write(this.destinationPath(file), readmeTmpl(this.props));
    });
  }
};
