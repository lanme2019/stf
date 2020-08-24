module.exports = function ScreenshotsCtrl($scope) {

  $scope.screenshots = []
  $scope.screenShotSize = 100

  $scope.clear = function () {
    $scope.screenshots = []
  }

  $scope.shotSizeParameter = function (maxSize, multiplier) {
    var finalSize = $scope.screenShotSize * multiplier
    var finalMaxSize = maxSize * multiplier

    return (finalSize === finalMaxSize) ? '' :
      '?crop=' + finalSize + 'x'
  }

  $scope.takeScreenShot = function () {
    $scope.control.screenshot().then(function (result) {
      $scope.$apply(function () {
        $scope.screenshots.unshift(result)
      })
    })
  }

  $scope.zoom = function (param) {
    var newValue = parseInt($scope.screenShotSize, 10) + param.step
    if (param.min && newValue < param.min) {
      newValue = param.min
    } else if (param.max && newValue > param.max) {
      newValue = param.max
    }
    $scope.screenShotSize = newValue
  }
  // 获取弹窗
  $scope.bigImg = function (imgValue) {
    // console.log("点击图片",imgValue)
    var modal = document.getElementById('xg-myModal');

    //获取图片插入到弹窗
    var img = document.getElementById('xg-myImg');
    var modalImg = document.getElementById('xg-img01');
    modal.style.display = "block";
    modalImg.src = imgValue;
  }
  // 当点击(x)，关闭弹窗
  $scope.closeDiv = function () {
    var modal = document.getElementById('xg-myModal');
    modal.style.display = "none";
  }
}
