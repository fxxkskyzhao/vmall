$(function () {
  var left = document.querySelector(".left");
  var left_lis = left.querySelectorAll("li");
  var dropdownMore = left.querySelector(".dropdown-more");
  left_lis[left_lis.length - 1].addEventListener("mouseover", function () {
    dropdownMore.style.display = "block";
  });
  left_lis[left_lis.length - 1].addEventListener("mouseout", function () {
    dropdownMore.style.display = "none";
  });

  $("#serve_drop").hover(
    function () {
      $("#serve_more").show();
    },
    function () {
      $("#serve_more").hide();
    }
  );

  $("#navdrop").hover(
    function () {
      $(".webnav").show();
    },
    function () {
      $(".webnav").hide();
    }
  );
  // 搜索框部分
  $("#search").hover(
    function () {
      $(this).css("border", "1px solid #ccc");
    },
    function () {
      $(this).css("border", "1px");
    }
  );
  $("#search").on(" focus", function () {
    $(this).css("border", "1px solid #ccc");
    $(".searchbox").show();
    // var search_li = $(".searchbox li");
  });

  $(".searchbox li").hover(
    function () {
      $(this).addClass("bgcgray");
    },
    function () {
      $(this).removeClass("bgcgray");
    }
  );

  $("#search").on("blur", function () {
    $(this).css("border", "1px");
    $(".searchbox").hide();
  });

  // 产品部分
  //配置选择
  $(".choose_color li,.choose_edition li,.choose_pack li").click(function () {
    // $(this);
    $(this).addClass("bordred").siblings().removeClass("bordred");

  });
  $(".choose_color li").click(function () {
    $(".choose_item em i").eq(0).text($(this).text())
  })
  $(".choose_edition li").click(function () {
    $(".choose_item em i").eq(1).text($(this).text())
  })
  $(".choose_pack li").click(function () {
    $(".choose_item em i").eq(2).text($(this).text())
  })

  $(".choose_service li").hover(
    function () {
      $(this).css({
        "border-color": "#d6d6d6",
      });
      $(this).children("div").show();
    },
    function () {
      $(this).children("div").hide();
    }
  );

  $(".wuyou div,.suiping div,.yanbao div").hover(
    function () {
      $(this).css({
        color: "#ca141d",
      });
    },
    function () {
      $(this).css({
        color: "#3a3a3a",
      });
    }
  );
  $(".choose_service input").click(function () {
    if ($(this).prop("checked")) {
      $(this).siblings().css({
        color: "#ca141d",
      });
      $(this)
        .parent()
        .parent()
        .siblings("span")
        .text($(this).siblings("i").text());
      $(this).parent().siblings().children().css({
        color: "#3a3a3a",
      });
      $(this).parent().siblings().children("input").prop("checked", false);
      $(this).parent().parent().parent().css({
        border: "1px solid #d6d6d6",
      });
    } else {
      $(this).siblings().css({
        color: "#3a3a3a",
      });
    }
  });
  var productTop = $(".product_list").offset().top;
  var detailTop = $(".product-detail").offset().top;
  var parameterTop = $(".product-parameter").offset().top;
  var saleTop = $(".after-sale").offset().top;
  var evaluateTop = $(".evaluate").offset().top;
  $(window).scroll(function () {
    var docsco = $(document).scrollTop();

    $(".list_content>div").each(function (i, ele) {
      if ($(document).scrollTop() >= productTop) {
        $(".product_list").addClass("product_current");
        $(".product_list div").css({
          padding: "15px 0",
        });
        $(".gotop").slideDown();
        if ($(document).scrollTop() >= $(ele).offset().top) {
          $(".product_list a")
            .eq(i)
            .addClass("product_a_current")
            .siblings()
            .removeClass();
        }
      } else {
        $(".product_list").removeClass("product_current");
        $(".gotop").slideUp();

        $(".product_list div").css({
          padding: "30px 0",
        });
      }
    });
  });
  $(".product_list a").click(function () {
    $("html,body").scrollTop(
      $(".list_content>div").eq($(this).index()).offset().top + 5
    );

    $(this).addClass("product_a_current").siblings().removeClass();
  });
  $(".gotop").click(function () {
    $("html,body").stop().animate({
      scrollTop: 0
    });
  });

  var mask = document.querySelector(".mask");
  var product_img = document.querySelector(".product_img");
  var big = document.querySelector(".big");
  var bigImg = document.querySelector(".bigImg");
  var maskX, maskY;
  product_img.addEventListener("mouseover", function () {
    mask.style.display = "block";
    big.style.display = "block";
    maskX = $(".mask").width();
    maskY = $(".mask").height();
    maxX = $(".product_img").width() - maskX;
    maxY = $(".product_img").height() - maskY;
  });
  product_img.addEventListener("mouseout", function () {
    mask.style.display = "none";
    big.style.display = "none";
  });
  $("")
  $(".product_img").mousemove(function (e) {
    var x0 = e.pageX - $(this).offset().left;
    var y0 = e.pageY - $(this).offset().top;
    x = x0 - maskX / 2;
    y = y0 - maskY / 2;
    if (x < 0) {
      x = 0;
    } else if (x > maxX) {
      x = maxX;
    }
    if (y < 0) {
      y = 0;
    } else if (y > maxY) {
      y = maxY;
    }
    $(".mask").css({
      left: x + "px",
      top: y + "px",
    });

    bigX = ($(".bigImg").width() / $(".product_img").width()) * x;
    bigY = ($(".bigImg").width() / $(".product_img").width()) * y;
    $(".bigImg").css({
      top: -bigY + "px",
      left: -bigX + "px",
    });
  });
  // 规格参数缩放
  $(".close a").click(function () {
    $(".product-parameter").addClass("ov-hid")
    $("html,body").scrollTop(parameterTop)
  })
  $(".mask_more a").click(function () {
    $(".product-parameter").removeClass("ov-hid")
  })

  // 产品更换图片
  $(".product_bottom ul li").mousemove(function () {
    $(this).addClass("choose").siblings("li").removeClass("choose")
    var src = $(this).find("img").attr("src")
    $(".product_img>img").attr("src", src)
    var color = src.substr(16, 3)
    var index = src.substr(19, 1)
    $(".product_img>img").attr("src", "./uploads/shouji" + color + index + ".png")
    $(".big>img").attr("src", "./uploads/bg" + color + index + ".png")
  })

  $(".choose_color ul li").click(function () {
    var type = $(this).children("img").data("type")
    var index = $(this).index()
    $(".product_bottom ul li a img").each(function (i, ele) {
      $(ele).attr("src", "./uploads/shouji" + type + i + ".png")
      $(".product_img>img").attr("src", "./uploads/shouji" + type + "0.png")
      $(".big>img").attr("src", "./uploads/bg" + type + "0.png")
    })

  })

  // 购物车加减
  $(".increment").click(function () {
    console.log(1);
    var n = $(this).parent().siblings("input").val()
    n++
    $(this).parent().siblings("input").val(n)


  })

  $(".decrement").click(function () {
    var n = $(this).parent().siblings("input").val()
    if (n == 1) {
      return false
    }
    n--
    $(this).parent().siblings("input").val(n)
  })
  // 倒计时
  var time_i = document.querySelectorAll(".buy_item .time span i")
  var featureTime = +new Date("2021-06-01 16:00:00")
  contTime()
  setInterval(contTime, 1000);

  function contTime() {
    var nowTime = +new Date()
    // var featureTime = +new Date(time)
    times = parseInt((featureTime - nowTime) / 1000)
    var d = parseInt(times / 60 / 60 / 24)
    var d = d > 9 ? d : "0" + d
    var h = parseInt(times / 60 / 60) % 24
    var h = h > 9 ? h : "0" + h
    var m = parseInt(times / 60) % 60
    var m = m > 9 ? m : "0" + m
    var s = times % 60
    var s = s > 9 ? s : "0" + s + ':'
    time_i[0].innerHTML = d
    time_i[1].innerHTML = h
    time_i[2].innerHTML = m
    time_i[3].innerHTML = s
  }
});