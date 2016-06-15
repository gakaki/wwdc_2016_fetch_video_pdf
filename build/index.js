'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  base_url: 'http://developer.apple.com/',
  url_list: 'http://developer.apple.com/videos/wwdc2016/'
};

function fetch_main_page() {
  var _this = this;

  var _ret;

  return _regenerator2.default.async(function fetch_main_page$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _regenerator2.default.awrap(function _callee() {
            var page, $, items;
            return _regenerator2.default.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _regenerator2.default.awrap((0, _superagent2.default)('GET', config.url_list));

                  case 2:
                    page = _context.sent;
                    $ = _cheerio2.default.load(page.text);
                    items = [];

                    $('.collection-item[data-released=true]').each(function (idx, element) {
                      //  console.log(idx, element)
                      var $a = $(element).find("a").eq(0);
                      var url = config.base_url + $a.attr('href');
                      items.push(url);
                    });

                    return _context.abrupt('return', {
                      v: items
                    });

                  case 7:
                  case 'end':
                    return _context.stop();
                }
              }
            }, null, _this);
          }());

        case 3:
          _ret = _context2.sent;

          if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt('return', _ret.v);

        case 6:
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](0);

          console.log(_context2.t0.message);

        case 11:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this, [[0, 8]]);
}

function fetch_detail(url) {
  var _this2 = this;

  var _ret2;

  return _regenerator2.default.async(function fetch_detail$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _regenerator2.default.awrap(function _callee2() {
            var page, $, section, video, document, pdf;
            return _regenerator2.default.async(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    console.log(url);

                    _context3.next = 3;
                    return _regenerator2.default.awrap((0, _superagent2.default)('GET', url));

                  case 3:
                    page = _context3.sent;
                    $ = _cheerio2.default.load(page.text);
                    section = {};
                    video = [];


                    $('.video a').each(function (idx, element) {
                      var a = $(element);
                      video.push({
                        href: a.attr('href'),
                        name: a.html()
                      });
                    });

                    section['video'] = video;

                    document = $('.document a');
                    // console.log(document);

                    if (document) {
                      pdf = document.eq(0);

                      section['pdf'] = pdf.attr('href');
                    }

                    return _context3.abrupt('return', {
                      v: section
                    });

                  case 12:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, null, _this2);
          }());

        case 3:
          _ret2 = _context4.sent;

          if (!((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object")) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt('return', _ret2.v);

        case 6:
          _context4.next = 14;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4['catch'](0);

          console.log(_context4.t0.message);
          _context4.next = 13;
          return _regenerator2.default.awrap(fetch_detail(url));

        case 13:
          return _context4.abrupt('return', _context4.sent);

        case 14:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, this, [[0, 8]]);
}

function start() {
  var urls, sections, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url, section, json;

  return _regenerator2.default.async(function start$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator2.default.awrap(fetch_main_page());

        case 2:
          urls = _context5.sent;

          console.log(urls);

          sections = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context5.prev = 8;
          _iterator = (0, _getIterator3.default)(urls);

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context5.next = 19;
            break;
          }

          url = _step.value;
          _context5.next = 14;
          return _regenerator2.default.awrap(fetch_detail(url));

        case 14:
          section = _context5.sent;

          // console.log(section)
          sections.push(section);
          // if (section.length > 0)
          //   sections.push(section)

        case 16:
          _iteratorNormalCompletion = true;
          _context5.next = 10;
          break;

        case 19:
          _context5.next = 25;
          break;

        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5['catch'](8);
          _didIteratorError = true;
          _iteratorError = _context5.t0;

        case 25:
          _context5.prev = 25;
          _context5.prev = 26;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 28:
          _context5.prev = 28;

          if (!_didIteratorError) {
            _context5.next = 31;
            break;
          }

          throw _iteratorError;

        case 31:
          return _context5.finish(28);

        case 32:
          return _context5.finish(25);

        case 33:
          console.log(sections);
          json = (0, _stringify2.default)(sections, undefined, 4);

          _fs2.default.writeFileSync('wwdc2016.json', json);

        case 36:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, this, [[8, 21, 25, 33], [26,, 28, 32]]);
}

start();

//
// superagent.get('https://cnodejs.org/')
//     .end(function (err, sres) {
//       // 常规的错误处理
//       if (err) {
//         return next(err);
//       }
//       // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
//       // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
//       // 剩下就都是 jquery 的内容了
//       var $ = cheerio.load(sres.text);
//       var items = [];
//       $('#topic_list .topic_title').each(function (idx, element) {
//         var $element = $(element);
//         items.push({
//           title: $element.attr('title'),
//           href: $element.attr('href')
//         });
//       });
//
//       res.send(items);
//     });
// });