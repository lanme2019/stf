/**
* Copyright © 2019 contains code contributed by Orange SA, authors: Denis Barbaron - Licensed under the Apache license 2.0
**/

module.exports = function SignInCtrl($scope, $http, CommonService) {

  $scope.error = null
  window.addEventListener('message', function (event) {//子获取父消息
    console.log(event);
    // document.getElementById('message').innerHTML = "收到" + event.origin + "消息：" + event.data;
    console.log(event.data, "event.data")
    let userName = event.data.userName
    let userPwd = event.data.userPwd;
    if (userPwd && userName) {
      submit(userName, userPwd)
    }
    // //console.logMessage("子页面消息收到", 'http://localhost:8081/#/fath')//父向子消息
    // //console.logMessage("子页面消息收到", 'http://localhost:8080/#/fath')//父向子消息

  }, false);
  // $scope.submit = 
  function submit(userName, userPwd) {



    console.log("登录")
    let name = userName;
    let email = userPwd;

    // var data = {
    //   name: $scope.signin.username.$modelValue
    //   // , email: $scope.signin.email.$modelValue
    //   , email: $scope.signin.userpass.$modelValue + "@qq.com"
    var data = {
      name: name
      , email: email + "@qq.com"
    };
    var param = {
      name: name
      , email: email
    };
    $http.post('http://123.56.138.35:4000/mysqus/login', param)
      .success(function (response) {
        console.log(response, "response")
        localStorage.setItem("userId", response.data[0].id);
        $scope.error = null
        console.log("submitok")
        $scope.invalid = false
        $http.post('/auth/api/v1/mock', data)
          .success(function (response) {
            $scope.error = null
            location.replace(response.redirect)
          })
          .error(function (response) {
            switch (response.error) {
              case 'ValidationError':
                $scope.error = {
                  $invalid: true
                }
                break
              case 'InvalidCredentialsError':
                $scope.error = {
                  $incorrect: true
                }
                break
              default:
                $scope.error = {
                  $server: true
                }
                break
            }
          })
        // location.replace(response.redirect)
      })
      .error(function (response) {
        switch (response.error) {
          case 'ValidationError':
            $scope.error = {
              $invalid: true
            }
            break
          case 'InvalidCredentialsError':
            $scope.error = {
              $incorrect: true
            }
            break
          default:
            $scope.error = {
              $server: true
            }
            break
        }
      })

    return
    var data = {
      name: $scope.signin.username.$modelValue
      // , email: $scope.signin.email.$modelValue
      , email: $scope.signin.userpass.$modelValue + "@qq.com"

    }
    $scope.invalid = false
    $http.post('/auth/api/v1/mock', data)
      .success(function (response) {
        $scope.error = null
        location.replace(response.redirect)
      })
      .error(function (response) {
        switch (response.error) {
          case 'ValidationError':
            $scope.error = {
              $invalid: true
            }
            break
          case 'InvalidCredentialsError':
            $scope.error = {
              $incorrect: true
            }
            break
          default:
            $scope.error = {
              $server: true
            }
            break
        }
      })
  }
  // submit();

  $scope.mailToSupport = function () {
    CommonService.url('mailto:' + $scope.contactEmail)
  }

  $http.get('/auth/contact').then(function (response) {
    $scope.contactEmail = response.data.contact.email
  })
}
