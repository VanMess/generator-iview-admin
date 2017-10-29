require("babel-register")({
  presets: 'env'
});
const webpackConfig = require('./build/webpack.base.conf.js').default;

// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  <% if(lintStyle ==='standard'){ %>
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  <% } else if(lintStyle==='airbnb'){ %>
  extends: 'airbnb-base',
  <% } %>
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  <% if(lintStyle==='airbnb'){ %>
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': webpackConfig
      }
    }
  },
  <% } %>
  // add your custom rules here
  'rules': {
    <% if(lintStyle ==='standard'){ %>
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    <% } else if(lintStyle==='airbnb'){ %>
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    <% } %>
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-dangle': 0,
    'semi': [2, 'always'],
    'space-before-function-paren': [2, 'always']
  }
}
