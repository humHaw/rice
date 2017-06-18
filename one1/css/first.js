/**
 * Created by Administrator on 2017/6/13.
 */
// @import('./jquery-3.1.1.js')

window.addEventListener('orientationchange', setRem)
window.addEventListener('resize', setRem)
setRem()

function setRem () {
  var html = document.documentElement
  var width = html.getBoundingClientRect().width
  html.style.fontSize = width / 16 + 'px'
}

var app = angular.module('app', ['ui.router', 'app1', 'app2', 'app3', 'app4'])
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('shou', {
      url: '/shou?cateId',
      templateUrl: './shou.html'
    })
    .state('fen', {
      url: '/fen?cateId',
      templateUrl: './fen.html'
    })
    .state('gou', {
      url: '/gou',
      templateUrl: './gou.html'
    })
    .state('ge', {
      url: '/ge',
      templateUrl: './ge.html'
    })
  $urlRouterProvider.otherwise('shou')
})
app.controller('dandan', ['$scope', function ($scope) {
  for (let i = 0; i < $("footer a").length; i++) {
    $('footer>a').eq(i).children('img').click(function () {
      $('footer>a').children('img').attr('src', '../data/13.png')
      $(this).attr('src', '../data/11.png')
    })
  }
}])

var app1 = angular.module('app1', [])
app1.controller('dan1', ['$scope', 'indexApi', '$timeout', 'indexApp', function ($scope, indexApi, $timeout, indexApp) {

  indexApi.index().then(function (data) {
    $scope.deta = data.data.datas
  })
  indexApp.index().then(function (data) {
    $scope.dete = data.data

    /*
     for(let i=0;i<data.data.length;i++){
     if(cateId == data.data[i].cateId){
     angular.forEach(data.data[i].childs,function (item,key) {
     classifySub.push(item)
     indexApp.classSub(item.cateId,1,5).then(function (dete) {
     console.log(dete)
     })
     })
     }
     }
     */

  })

  // indexApp.classSub().then(function (data) {
  //   console.log(data)
  // })

  $scope.show_style = function () {

    $timeout(function () {

      for (let i = 0; i < $("header ul li").length; i++) {
        $('header ul li').eq(i).children('p').click(function () {
          $('header ul li').children('p').css({
            'border-color': 'white',
            'color': '#ababab'
          })
          $(this).css({
            'border-color': '#fe4070',
            'color': 'black'
          })
          $(this).attr('src', '../data/11.png')
        })
      }

      var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        speed: 1000,
        slidesPerView: 3.7
      })
      var mySwiper = new Swiper('.first_title', {
//        direction: 'vertical',   垂直
//        direction: 'horizontal',   水平
        direction: 'horizontal',
        speed: 1000,
        slidesPerView: 2.7, observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
      })
    }, 0)
  }

}])
app1.service('indexApi', function ($http) {
  this.index = function () {
    let ar = 'http://mall.tx2010.cn/mall/special/list?curPage=1&pageSize=5'
    return $http.get(ar)
  }
})
app1.service('indexApp', function ($http) {
  this.index = function () {
    let ar = 'http://mall.tx2010.cn/mall/product/cates'
    return $http.get(ar)
  }

})
app1.service('indexapd', function ($http) {
  this.classSubr = function (id, categoryLevel) {
    var data1 = {
      cateId: id,
      curPage: 1,
      PageSize: 5,
      platformType: 1,
      categoryLevel: categoryLevel
    }
    let ar = 'http://mall.tx2010.cn/mall/product/cateProducts'

    return $http.post(ar, data1)
  }
})

//筛选
app1.filter('firstUppet', function () {
  return function (str) {
    if (str === 0) {
      return ''
    } else {
      return str
    }
  }
})

var app2 = angular.module('app2', [])
app2.controller('dan2', ['$scope', 'indexApp', '$timeout', 'indexapd', '$stateParams', function ($scope, indexApp, $timeout, indexapd, $stateParams) {

  var cateId = $stateParams.cateId    //商品的Id
  // console.log(cateId)
  var classifySub = []   //子分类数组
  $scope.classigySubparams = []    //子分类下商品的数组
  var ar = -1
  indexApp.index().then(function (data) {
    $scope.dete = data.data
    console.log(data.data)
    //  便利判断所有父元素id  和 获得的数据是否相等
    $scope.classigySubparams = []
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].cateId == cateId) {
        for (let j = 0; j < data.data[i].childs.length; j++) {
          console.log(data.data[i].childs[j].cateId)
          indexapd.classSubr(data.data[i].childs[j].cateId).then(function (data) {
            $scope.classigySubparams[j] = data
            // console.log(data.data.ptList[0])
            console.log($scope.classigySubparams[j].data.ptList[0])
            // $scope.data_lei = data
          })
        }

      }
    }

  })

  $scope.fen_style = function () {
    $timeout(function () {

      var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        speed: 1000,
        slidesPerView: 3.7
      })

      for (let i = 0; i < $(".swiper-container ul li").length; i++) {
        $('.swiper-container ul li').eq(i).children('p').click(function () {
          $('.swiper-container ul li').children('p').css({
            'border-color': 'white',
            'color': '#ababab'
          })
          $(this).css({
            'border-color': '#fe4070',
            'color': '#fe4070'
          })
          $(this).attr('src', '../data/11.png')
        })
      }

      var mySwiper = new Swiper('.fen_title', {
        direction: 'horizontal',
        speed: 1000,
        slidesPerView: 3.7
      })

      for (let i = 0; i < $(".swiper-container ul li").length; i++) {
        $('.swiper-container ul li').eq(i).children('p').click(function () {
          $('.swiper-container ul li').children('p').css({
            'border-color': 'white',
            'color': '#ababab'
          })
          $(this).css({
            'border-color': '#fe4070',
            'color': '#fe4070'
          })
          $(this).attr('src', '../data/11.png')
        })
      }

      var mySwiper = new Swiper('.l_con', {
//        direction: 'vertical',   垂直
//        direction: 'horizontal',   水平
        direction: 'horizontal',
        autoplay: 5000,
        speed: 1000,
        grabCursor: true,
        centeredSlides: true,
        autoplayDisableOnInteraction: false,
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
      })

    }, 0)
  }

}])

var app3 = angular.module('app3', [])
app3.controller('dan3', ['$scope', function ($scope) {

  for (let i = 0; i < $('input').length; i++) {
    $('input').eq(i).click(function () {
      if ($('input').eq(i).attr('checked')) {
        $('input').eq(i).removeAttr('checked')
        $('input').eq(i).parent().children('label').css('background', 'white')
      } else {
        $('input').eq(i).attr('checked', 'true')
        $('input').eq(i).parent().children('label').css('background', 'red')
      }
    })
  }

  $('#diz').click(function () {
    if ($('input').attr('checked')) {
      $('input').removeAttr('checked')
      $('input').parent().children('label').css('background', 'white')
    } else {
      $('input').attr('checked', 'true')
      $('input').parent().children('label').css('background', 'red')
    }
  })
  document.addEventListener('touchmove', function (ev) {
    ev.preventDefault()
  }, {passive: false})

  $('.gou_fen').swipeLeft(function () {
    console.log(212)
  })

}])

var app4 = angular.module('app4', [])
app4.controller('danlast', ['$scope', function ($scope) {

}])






