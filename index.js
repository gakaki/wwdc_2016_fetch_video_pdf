'use strict';

import request from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'


const config = {
  base_url: 'http://developer.apple.com/',
  url_list: 'http://developer.apple.com/videos/wwdc2016/'
};

async function fetch_main_page() {
  try {
     let page = await request('GET', config.url_list);
     let $ = cheerio.load(page.text);
     let items = [];
     $('.collection-item[data-released=true]').each( (idx, element) => {
      //  console.log(idx, element)
       let $a = $(element).find("a").eq(0)
       let url = config.base_url + $a.attr('href')
       items.push(url)
     });

    return items
  } catch (e) {
      console.log(e.message)
  }
}

async function fetch_detail( url ){
  try {
    console.log(url)

    let page = await request('GET', url);
    let $ = cheerio.load(page.text);


    let section = {}
    let video   = []

    $('.video a').each( (idx, element) => {
      let a = $(element);
      video.push({
        href: a.attr('href'),
        name: a.html()
      });
    });

    section['video'] = video

    let document = $('.document a')
    // console.log(document);
    if ( document ){
      let pdf = document.eq(0)
      section['pdf'] = pdf.attr('href');
    }

    return section
  } catch (e) {
      console.log(e.message)
      return await fetch_detail(url)
  }
}

async function start(){
  let urls = await fetch_main_page()
  console.log(urls)

  let sections = []
  for ( let url of urls){
    let section = await fetch_detail(url)
    // console.log(section)
    sections.push(section)
    // if (section.length > 0)
    //   sections.push(section)
  }
  console.log(sections)
  let json = JSON.stringify(sections, undefined, 4)
  fs.writeFileSync('wwdc2016.json',json)
}

start()

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
