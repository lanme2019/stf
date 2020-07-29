/**
* Copyright © 2019 contains code contributed by Orange SA, authors: Denis Barbaron - Licensed under the Apache license 2.0
**/

module.exports = function MenuCtrl(
  $scope
  , $rootScope
  , SettingsService
  , $location
  , $http
  , CommonService
  , LogcatService
  , socket
  , $cookies
  , $window) {

  SettingsService.bind($scope, {
    target: 'lastUsedDevice'
  })

  SettingsService.bind($rootScope, {
    target: 'platform',
    defaultValue: 'native',
    deviceEntries: LogcatService.deviceEntries
  })
  $scope.$on('$routeChangeSuccess', function () {
    $scope.isControlRoute = $location.path().search('/control') !== -1
  })

  $scope.mailToSupport = function () {
    CommonService.url('mailto:' + $scope.contactEmail)
  }

  $http.get('/auth/contact').then(function (response) {
    $scope.contactEmail = response.data.contact.email
  })
  window.addEventListener('message', function (event) {//子获取父消息
    console.log(event);
    // document.getElementById('message').innerHTML = "收到" + event.origin + "消息：" + event.data;
    console.log(event.data, "event.data")
    let logout1 = event.data.logout
    if (logout1 == "logout") {
      logout()
    }
    // //console.logMessage("子页面消息收到", 'http://localhost:8081/#/fath')//父向子消息

  }, false);
  function logout () {

    if (document.getElementsByClassName("state-using")) {
      let allBtn = document.getElementsByClassName("state-using");
      for (let i = 0; i < allBtn.length; i++) {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        allBtn[i].dispatchEvent(e);
      }
    }
    $cookies.remove('XSRF-TOKEN', { path: '/' })
    $cookies.remove('ssid', { path: '/' })
    $cookies.remove('ssid.sig', { path: '/' })
    $window.location = '/'
    setTimeout(function () {
      socket.disconnect()
    }, 100)
  }

  $scope.ceshi = false
  $scope.nochoose = true
  $scope.changeSizeBig = function () {
    $scope.ceshi = false
    $scope.nochoose = true
    // console.log($scope.ceshi, "$scope.ceshi")
    // console.log($scope.nochoose, "$scope.ceshi")
    top.postMessage("stfbig", 'http://123.56.138.35:9009/pages/index.html')//父向子消息

    console.log("sftChange", "big")

  }
  $scope.changeSizeSmall = function () {
    $scope.ceshi = true
    $scope.nochoose = false
    top.postMessage("stfsmall", 'http://123.56.138.35:9009/pages/index.html')//父向子消息
    console.log("sftChange", "small")

  }


}
