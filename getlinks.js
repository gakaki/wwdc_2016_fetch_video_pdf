'use strict';

import fs from 'fs'

let data = fs.readFileSync('wwdc2016.json')
data     = JSON.parse(data)
let links = []
for( let section of data ){

  let video = section['video']
  let pdf   = section['pdf']
  for ( let v of video ){
    if ( v['name'] == "HD Video" )
      links.push(v['href'])
  }
  links.push(pdf)
}
let res    = links.join('\n')
console.log(res)
