module.exports = angular.module('stf-ui-language', [
  require('stf/settings').name,
  require('stf/language').name
])
  .run(['$templateCache', function($templateCache) {
    console.log($templateCache,"$templateCache")
    $templateCache.put(
      'settings/general/language/language.pug', require('./language.pug')
    )
  }])
  .controller('LanguageCtrl', require('./language-controller'))
