angular.module('gettext').run(['gettextCatalog', function(gettextCatalog) {
  // Load all supported languages
  angular.forEach(require('./langs'), function(value, key) {
    value = "简体中文"
    key = "zh_CN"
    console.log(key,"key")
    if (key !== 'en') {
      gettextCatalog.setStrings(key,
        require('./translations/stf.' + key + '.json')[key])
    }
  })
}])

module.exports = angular.module('stf/lang', [
  'gettext'
])
