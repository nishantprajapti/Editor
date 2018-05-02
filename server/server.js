// PACKAGES //
var path = require('path');
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var querystring = require('query-string');
var url = require('url');
var findRemoveSync = require('find-remove')
var tempdir = './build/temp';
var auth = require('basic-auth');
var bodyParser = require('body-parser');

//this packages are for creating secure localhsot
var http = require('http');
var https = require('https');

// IMPORTS //
var indexRoutes = require('./routes/index');
// CREATE APP //
var app = express();
// VIEW ENGINE //
app.set('view engine', 'html');
app.engine('html', function(path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//security authentication

app.use("/", function(req, res, next) {
  if (req.path == "/") {
    let credentials = auth(req)
    if (!credentials || credentials.name !== 'harryanddavid' || credentials.pass !== 'harryanddavid@123') {
      res.statusCode = 401
      res.setHeader('WWW-Authenticate', 'Basic realm="example"')
      res.end('Access denied')
    } else {
      next()
    }
  } else {
    next();
  }
});

// MIDDLEWARE //
app.use(express.static(path.join(__dirname, '../build')));


//ROUTES
app.use('/', indexRoutes);

// Get data from URL//
var getdeskurl, getmoburl, mainurl, globaldata;
var temparr = [];
app.post('/scrape', function(req, res) {
  var result = [];
  //var url_parts = url.parse(req.url, true);
  //var query = url_parts.query;
  mainurl = req.body.id;
  var previewcontent = null;
  if(req.body.previewcontent != undefined) {
    previewcontent = req.body.previewcontent;
  }
  // Remove file after 1 mins
  findRemoveSync('./build/temp/', {
    age: {
      seconds: 28800
    },
    extensions: '.html'
  })
  // check for url whether it contain https or http.
  if (!/^http[s]?:\/\//.test(mainurl)) {
    mainurl = 'https://' + mainurl;
  }
  getmoburl = mainurl;
  var htmlDOM, headeragent;
  if (getmoburl) {
    headeragent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    var options = {
      uri: getmoburl,
      strictSSL: false,
      rejectUnhauthorized: false,
      headers: {
        "User-Agent": headeragent,
        'X-WYSIWYG': 'true',
        'X-WYSIWYG-OPTIONS': previewcontent
      }
    };
    request(options, function(error, response, html) {
      if (!error) {
        // Get current timestamp
        var currtimestamp = Date.now();
        globalmobileDOM = cheerio.load(html).html();
        // Write file in temp directory
        if (!fs.existsSync(tempdir)) {
          fs.mkdirSync(tempdir);
        }
        fs.writeFile("./build/temp/mobile_" + currtimestamp + ".html", globalmobileDOM, {
          'flag': "w+"
        }, function(err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });
        var tempfile = 'mobile_' + currtimestamp + '.html';
        // Insert Mobile DOM
        result.push({
          "MobileWidget": ''
        }, {
          "MobileDOM": globalmobileDOM,
          'tempfilename': tempfile
        });
        // Get structure for mobilewidget
        var $ = cheerio.load(globalmobileDOM);
        var globalarr = [];
        var countespot = [];
        $("main [data-widget]").each(function(index, val) {
          var widgetarr = [];
          var widgetGACode = $(val).attr("data-ga_eventaction");
          index = index + 1;
          var dataorder = index;
          //this is for getting Espotid of the div
          var homepageespotid;
          homepageespotid = $(val).parentsUntil('main');
          homepageespotid = $(homepageespotid[(homepageespotid.length) - 1]).attr("id");
          countespot.push(homepageespotid);
          //ends here getting espotid of the div
          var widgettype = $(val).attr("data-widget") ? $(val).attr("data-widget") : "";
          var dataid = $(val).attr("data-id");
          //this variable is for widget to check if it visible or not
          var checkparentvisibility;
          var visible = $(val).attr("class") ? $(val).attr("class") : "";
          var anchorlength;
          if ($(val).attr("data-widget")) {
            visible = $(val).find('a');
            if ($(visible).hasClass("mw-hide")) {
              visible = false
            } else {
              visible = true;
            }

            // below is to check if data-widget full is visible or not
            if ($(val).hasClass("mw-hide")) {
              checkparentvisibility = false;
            } else {
              checkparentvisibility = true;
            }
            anchorlength = $(val).find("a:has(img)") ? $(val).find("a:has(img)") : "";
            var widgetheader = $(val).find("h2").text() ? $(val).find("h2").text() : "";
          }
          if (anchorlength.length >= 1) {
            for (var i = 0; i < anchorlength.length; i++) {
              // function countInArray(array, what)
              // {
              //   return array.filter(item => item == what).length;
              // }
              // var espotcountid =  countInArray(countespot, homepageespotid);
              var anchorlist = anchorlength[i];
              var widgetdatasrc = $(anchorlist).find("img:first-child").attr("mw-data-src");
              if (!widgetdatasrc) {
                var widgetdatasrc = $(anchorlist).find("img:first-child").attr("src");
              }

              var temp = {};
              var anchorGACode = $(anchorlist).attr("data-ga_eventlabel");
              var widgetsrc = widgetdatasrc ? widgetdatasrc : "";
              var widgeturl = $(anchorlist).attr("href");
              var widgettext, row1, row2;
              temp["src"] = widgetsrc;
              temp["url"] = widgeturl;
              temp["anchorGACode"] = anchorGACode;
              if ($(val).hasClass("prices")) {
                row1 = $(anchorlist).find(".row1").text();
                row2 = $(anchorlist).find(".row2").text();
                temp["textrow1"] = row1;
                temp["textrow2"] = row2;
              } else {
                if ($(anchorlist).attr("data-mobile-text")) {
                  widgettext = $(anchorlist).attr("data-mobile-text");
                  widget = widgettext.trim();
                } else {
                  widgettext = $(anchorlist).text();
                  widgettext = widgettext.trim();
                }
                temp["text"] = widgettext;
              }
              temp["show"] = visible;
              widgetarr.push(temp);
            }
          }
          globalarr.push({
            "type": widgettype,
            "dataid": dataid,
            "dataorder": dataorder,
            "globalwidgetshow": checkparentvisibility,
            "title": widgetheader,
            "widgetgacode": widgetGACode,
            "data": widgetarr

          })
        })
        result[0].MobileWidget = globalarr;
        res.header({
          'Content-Type': 'application/json',
        });
        res.send(JSON.stringify(result));
        res.end();
      } else {
        res.send({
          'status': 400,
          "message": "Please enter correct URL"
        });
      }
    });
  } else {
    res.send({
      'status': 400,
      "message": "Please enter correct URL"
    });
  }
});

//API for product page
app.get('/product', function(req, res) {
  var result = [];
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  mainurl = query.getproducturl;
  // check for url whether it contain https or http.
  if (!/^http[s]?:\/\//.test(mainurl)) {
    mainurl = 'https://' + mainurl;
  }
  var producturl = mainurl;
  var htmlDOM, headeragent;

  if (producturl) {
    headeragent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    var options = {
      uri: producturl,
      strictSSL: false,
      rejectUnhauthorized: false,
      headers: {
        "User-Agent": headeragent,
        'X-WYSIWYG': 'true'
      }
    };
    request(options, function(error, response, html) {
      if (!error) {
        var productDOM = cheerio.load(html).html();
        // Get structure for mobilewidget
        var $ = cheerio.load(productDOM);
        var globalarr = [];
        var allscripttag = $(productDOM).find("noscript");
        if (allscripttag.length) {
          allscripttag.each(function(index, value) {
            index = index + 1;
            var getpagetype = $(value).attr("pagetype");
            if (getpagetype == 'Product') {
              var getcontent = $(value).html();
              getcontent = JSON.parse(getcontent);
              getcontent = getcontent.content;
              result = getcontent;
              res.header({
                'Content-Type': 'application/json',
              });
              res.send(JSON.stringify(result));
              res.end();
              return false;
             } else {
              if (allscripttag.length == index) {
                res.send({
                  'status': 400,
                  "message": "This is not a product page url"
                });
              }
            }
          })
        }

      } else {
        res.send({
          'status': 400,
          "message": "Please enter correct URL"
        });
      }
    });
  } else {
    res.send({
      'status': 400,
      "message": "Please enter correct URL"
    });
  }
})



//API for checkout page
app.get('/checkout', function(req, res) {
  var result = [];
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  mainurl = query.getcheckouturl;
  // check for url whether it contain https or http.
  if (!/^http[s]?:\/\//.test(mainurl)) {
    mainurl = 'https://' + mainurl;
  }
  var checkouturl = mainurl;
  var htmlDOM, headeragent;

  if (checkouturl) {
    headeragent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    var options = {
      uri: checkouturl,
      strictSSL: false,
      rejectUnhauthorized: false,
      headers: {
        "User-Agent": headeragent,
        'X-WYSIWYG': 'true'
      }
    };
    request(options, function(error, response, html) {
      if (!error) {
        var checkoutDOM = cheerio.load(html).html();
        // Get structure for mobilewidget
        var $ = cheerio.load(checkoutDOM);
        var globalarr = [];
        var allscripttag = $(checkoutDOM).find("noscript");
        if (allscripttag.length) {
          allscripttag.each(function(index, value) {
            index = index + 1;
            var getpagetype = $(value).attr("pagetype");
            if (getpagetype == 'Checkout') {
              var getcontent = $(value).html();
              getcontent = JSON.parse(getcontent);
              getcontent = getcontent.content;
              result = getcontent;
              res.header({
                'Content-Type': 'application/json',
              });
              res.send(JSON.stringify(result));
              res.end();
              return false;
            } else {
              if (allscripttag.length == index) {
                res.send({
                  'status': 400,
                  "message": "This is not a checkout page url"
                });
              }
            }
          })
        } else {
          res.send({
            'status': 400,
            "message": "This is not a checkout page url"
          });
        }
      } else {
        res.send({
          'status': 400,
          "message": "Please enter correct URL"
        });
      }
    });
  } else {
    res.send({
      'status': 400,
      "message": "Please enter correct URL"
    });
  }
})




//API for checkout page
app.get('/globalbanner', function(req, res) {
  var result = [];
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  mainurl = query.getglobalbanners;
  // check for url whether it contain https or http.
  if (!/^http[s]?:\/\//.test(mainurl)) {
    mainurl = 'https://' + mainurl;
  }
  var globalbannerurl = mainurl;
  var htmlDOM, headeragent;

  if (globalbannerurl) {
    headeragent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    var options = {
      uri: globalbannerurl,
      strictSSL: false,
      rejectUnhauthorized: false,
      headers: {
        "User-Agent": headeragent,
        'X-WYSIWYG': 'true'
      }
    };
    request(options, function(error, response, html) {
      if (!error) {

        var globalbannerDOM = cheerio.load(html).html();

        // Get structure for mobilewidget
        var $ = cheerio.load(globalbannerDOM);
        var globalarr = [];

        var allscripttag = $(globalbannerDOM).find("noscript");
        if (allscripttag.length) {
          allscripttag.each(function(index, value) {
            index = index + 1;
            var getpagetype = $(value).attr("pagetype");
            if (getpagetype == 'Global') {
              var getcontent = $(value).html();
              getcontent = JSON.parse(getcontent);
              getcontent = getcontent.content;
              result = getcontent;
              res.header({
                'Content-Type': 'application/json',
              });
              res.send(JSON.stringify(result));
              res.end();
              return false;
            } else {
              if (allscripttag.length == index) {
                res.send({
                  'status': 400,
                  "message": "Page do not contain banner"
                });
              }
            }
          })
        } else {
          res.send({
            'status': 400,
            "message": "Page do not contain banner"
          });
        }
      } else {
        res.send({
          'status': 400,
          "message": "Please enter correct URL"
        });
      }
    });
  } else {
    res.send({
      'status': 400,
      "message": "Please enter correct URL"
    });
  }
})



// ERROR HANDLER //
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

require('./localhostcode')(app);
