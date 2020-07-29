module.exports = function($scope, LanguageService, SettingsService) {
  console.log( LanguageService, "LanguageService");
  console.log( SettingsService, "SettingsService");
  // LanguageService.selectedLanguage = "zh_CN"

  console.log( SettingsService, "SettingsService");

  console.log( LanguageService.selectedLanguage, "SettingsService");



  SettingsService.bind($scope, {
    target: 'lalal'
  , source: LanguageService.settingKey  
  , defaultValue: LanguageService.detectedLanguage
  })
  console.log( $scope, "$scope");
  // $scope.options="zh_CN";
  $scope.lalal ="zh_CN";
  console.log($scope.lalal,"$scope.lalal")
  
  $scope.supportedLanguages = LanguageService.supportedLanguages
}
