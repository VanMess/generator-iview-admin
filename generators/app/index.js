const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the divine ' + chalk.red('generator-iview-admin') + ' generator!'));

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
      default: 'A ProductAI administration project.'
    }, {
      type: 'confirm',
      name: 'lint',
      message: 'Use ESLint to lint your code?'
    }, {
      name: 'lintStyle',
      type: 'list',
      message: 'Pick an ESLint preset',
      when(answers) {
        return answers.lint;
      },
      choices: [{
        name: 'Airbnb (https://github.com/airbnb/javascript)',
        value: 'airbnb',
        short: 'Airbnb'
      }, {
        name: 'Standard (https://github.com/feross/standard)',
        value: 'standard',
        short: 'Standard'
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

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.initPackage();
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
            'eslint-config-standard': '^10.2.1',
            'eslint-plugin-promise': '^3.4.0',
            'eslint-plugin-standard': '^3.0.1',
            'eslint-plugin-import': '^2.7.0',
            'eslint-plugin-node': '^5.2.0'
          };
          break;
        case 'airbnb':
          lintDep = {
            'eslint-config-airbnb-base': '^12.1.0',
            'eslint-import-resolver-webpack': '^0.8.3',
            'eslint-plugin-import': '^2.7.0'
          };
          break;
        default:
          lintDep = {};
          break;
      }
      pkg = _.merge(pkg, {
        scripts: {
          lint: 'eslint --ext .js,.vue src config build' + (props.unitTest ? ' test/unit/specs' : '')
        },
        devDependencies: {
          'babel-eslint': '^7.1.1',
          eslint: '^4.9.0',
          'eslint-friendly-formatter': '^3.0.0',
          'eslint-loader': '^1.7.1',
          'eslint-plugin-html': '^3.0.0',
        }
      }, {
        devDependencies: lintDep
      });
    }

    if (props.unitTest) {
      pkg = _.merge(pkg, {
        scripts: {
          unit: 'cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run',
          test: 'npm run unit'
        },
        devDependencies: {
          'cross-env': '^5.0.1',
          karma: '^1.4.1',
          'karma-coverage': '^1.1.1',
          'karma-mocha': '^1.3.0',
          'karma-phantomjs-launcher': '^1.0.2',
          'karma-phantomjs-shim': '^1.4.0',
          'karma-sinon-chai': '^1.3.1',
          'karma-sourcemap-loader': '^0.3.7',
          'karma-spec-reporter': '0.0.31',
          'karma-webpack': '^2.0.2',
          mocha: '^3.2.0',
          chai: '^4.1.2',
          sinon: '^4.0.0',
          'sinon-chai': '^2.8.0',
          'inject-loader': '^3.0.0',
          'babel-plugin-istanbul': '^4.1.1',
          'phantomjs-prebuilt': '^2.1.14'
        }
      });
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  renderTplFile() {
    let target = [
      '.babelrc',
      '.editorconfig',
      '.gitignore',
      '.postcssrc.js',
      'index.html',
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
      'src/components/dashboard/Nav.vue',
      'src/const/nav.json',
      'src/assets/img/f_logo.svg',
      'src/assets/img/favicon.ico',
      'README.md',
      'build/dev-server.js',
      'build/webpack.base.conf.js',
      'build/webpack.prod.conf.js',
      'src/main.js',
      'src/components/Hello.vue',
    ];

    if (this.props.unitTest) {
      target = target.concat([
        'config/test.env.js',
        'test/unit/.eslintrc',
        'test/unit/index.js',
        'test/unit/index.js',
        'test/unit/karma.conf.js',
        'test/unit/specs/Hello.spec.js',
        'build/webpack.test.conf.js'
      ]);
    }

    if (this.props.lint) {
      target = target.concat([
        '.eslintrc.js',
        '.eslintignore'
      ]);
    }

    _.forEach(target, (file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props
      );
    });
  }
};
