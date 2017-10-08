require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
var http = require('http')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

/* api 访问代码  START */
var apiRoutes = express.Router()
var data = require('../music-idata.json')
apiRoutes.get('/music-data', function (req, res) {
  res.json({
    errno: 0,
    musicData: data.musicData
  });
});


apiRoutes.get('/search/:num/:name', (req, res) => {
  let num = req.params.num;
  let name = req.params.name;

  function search(n, keywords) {
    return new Promise((resolve, reject) => {
      let searchResult = '';
      let url = encodeURI('http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n='+ n +'&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w='+ keywords);
      console.log(url);
      http.get(url, response => {
        response.on('data', data => {
          searchResult += data;
        })
        response.on('end', () => {
          resolve(searchResult);
        })
      })
    })
  }

  search(num, name).then(searchResult => {
      r = JSON.parse(searchResult);
      lists = r.data.song.list;
      data = [];

      function deleteTag(data)
      {
        var regx = /<[^>]*>|<\/[^>]*>/gm;
        var tagStr = data;
        var result = tagStr.replace(regx,"");
        return result;
      }

      for(var i=0;i<lists.length;i++) {
          item = lists[i];
          
          if(item.f && item.fsong) {
              a = item.f.split('|');
              if(a.length>4){
                console.log(item);
                var name = item.fsong;
                var src = 'http://ws.stream.qqmusic.qq.com/'+item.f.split('|')[0]+'.m4a?fromtag=46';
                var musicImgSrc = 'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg';
                var desc = deleteTag(item.albumName_hilight);
                var d = { "name":name, "src":src , "musicImgSrc":musicImgSrc ,"desc":desc};
                data.push(d);
              }
          }
      }
      res.json(data);
  })
});

app.use('/api', apiRoutes)

/*  api 访问代码  END */

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
