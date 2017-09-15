import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';

let isProd = (process.env.NODE_ENV === 'production');
console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}, isProd=${isProd}`);
//process.env.NODE_ENV=development, isProd=false

let wdsListenPort = 3050;
let curPublicPath = 'project_name';
// let curPublicPath = '/project_name';
let appThemeColor = '#673ab8';
let projectName = 'Project Name';
let projectDescription = 'Project Description';

const CSS_MAPS = !isProd;


// TODO: 后续再根据实际情况，看看是否有多个css，less等，是否需要改为多个ExtractTextPlugin实例的配置
// 多个提取实例
// new ExtractTextPlugin("[name].[hash].css");
// new ExtractTextPlugin("[name].css");
// const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
// const extractLESS = new ExtractTextPlugin('stylesheets/[name].less');

let commonPlugins = [
  // new webpack.ProvidePlugin({
  //   '$': 'jquery',
  //   'window.jQuery': 'jquery',
  //   'jQuery': 'jquery',
  //   'window.$': 'jquery',
  // }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js'
  }),
  new ExtractTextPlugin('styles.css'),
  // extractCSS,
  // extractLESS,
  new HtmlWebpackPlugin({
    template: './src/app.template.ejs',
    filename: 'index.html',
    // chunks: ['vendor', 'index'],
    hash: true,
    assetsPrefix: isProd ? `/${curPublicPath}` : `http://localhost:${wdsListenPort}`,
    // assetsPrefix: isProd ? `${curPublicPath}` : `http://localhost:${wdsListenPort}`,
    deloyAppRootDir: `/${curPublicPath}`,
    appThemeColor: appThemeColor,
    projectName: projectName
  }),
  // new HtmlWebpackPlugin({
  //   template: './src/index.template.ejs',
  //   filename: 'index.html',
  //   chunks: ['vendor', 'index'],
  //   hash: true,
  //   assetsPrefix: isProd ? '' : `http://localhost:${wdsListenPort}/`
  // }),
  // new HtmlWebpackPlugin({
  //   template: './src/login.template.ejs',
  //   filename: 'login.html',
  //   hash: true,
  //   chunks: ['vendor', 'login'],
  //   assetsPrefix: isProd ? '' : `http://localhost:${wdsListenPort}/`
  // }),
];

if (isProd) {
  // Note: current not add UglifyJsPlugin for production for:
  // when webpack -p, it will auto added UglifyJsPlugin, then omit here UglifyJsPlugin settings
  // commonPlugins.push(
  //   new webpack.optimize.UglifyJsPlugin({
  //     minimize: true
  //   })
  // );

  commonPlugins.push(
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },
      // { from: 'src/manifest.json'},
    ])
  );
}


module.exports = {
  entry: {
    // login: './src/login.entry.js',

    // index: './src/index.entry.js',
    index: './src/app.entry.js',
    vendor : [
      //https://github.com/gaearon/react-hot-loader/tree/master/docs#migration-to-30
      'babel-polyfill', // Set up an ES6-ish environment
      'react-hot-loader/patch',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: `/${curPublicPath}/`
    // publicPath: `${curPublicPath}/`
  },

  resolve: {
    // you can now import file without suffix
    extensions: ['*', '.jsx', '.js', '.json', '.less', '.css'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src')
    ],
    alias: {
      AssetsAlias: path.resolve(__dirname, 'src/assets'),
      ComponentsAlias: path.resolve(__dirname, 'src/components'),
      PagesAlias: path.resolve(__dirname, 'src/pages'),
      LibAlias: path.resolve(__dirname, 'src/lib'),
      CommonAlias: path.resolve(__dirname, 'src/common'),
      StyleAlias: path.resolve(__dirname, 'src/style'),
    }
  },

  // devtool: isProd ? 'cheap-module-source-map' : 'eval',
  devtool: isProd ? 'false' : 'eval',

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    publicPath: path.resolve(__dirname, `/${curPublicPath}/`),
    // publicPath: path.resolve(__dirname, `${curPublicPath}/`),
    compress: true,
    port: wdsListenPort,
    historyApiFallback: true,

    open: true,
    openPage: `${curPublicPath}/`
  },

  plugins: commonPlugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 匹配'js' or 'jsx' 后缀的文件类型
        include: path.resolve(__dirname, 'src'),
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'bower_components')
        ],
        // use: 'babel-loader',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react'],
            plugins: [
              'transform-runtime',
              'react-hot-loader/babel'
            ]
          }
        }
      },

      // {
      //   test: /\.css$/,
      //   // use: ['style-loader', 'css-loader'],
      //   // use: [
      //   //   { loader: 'style-loader' },
      //   //   {
      //   //     loader: 'css-loader',
      //   //     options: {
      //   //       modules: true
      //   //     }
      //   //   }
      //   // ],

      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader', // 编译后用什么loader来提取css文件
      //     use: 'css-loader' //指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
      //   }),

      //   // use: extractCSS.extract([ 'css-loader', 'postcss-loader' ]),
      //   // use: extractCSS.extract([
      //   //   'css-loader',
      //   //   {
      //   //     loader: 'postcss-loader',
      //   //     options: {
      //   //       // plugins: () => [require('autoprefixer')]
      //   //     }
      //   //   } 
      //   // ]),
        
      //   // include: path.resolve(__dirname, 'src')
      // },
      // {
      //   test: /\.less$/,
      //   use: [
      //     {
      //       loader: 'style-loader' // creates style nodes from JS strings
      //     }, {
      //       loader: 'css-loader' // translates CSS into CommonJS
      //     }, {
      //       loader: 'less-loader' // compiles Less to CSS
      //     }
      //   ]

      //   // test: /\.less$/i,
      //   // use: extractLESS.extract([ 'css-loader', 'less-loader' ])
      // },

      {
        // Transform our own .(less|css) files with PostCSS and CSS-modules
        test: /\.(less|css)$/,
        include: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'src/container')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { modules: true, sourceMap: CSS_MAPS, importLoaders: 1 }
            },
            {
              loader: `postcss-loader`,
              options: {
                sourceMap: CSS_MAPS,
                plugins: () => {
                  autoprefixer({ browsers: [ 'last 2 versions' ] });
                }
              }
            },
            {
              loader: 'less-loader',
              options: { sourceMap: CSS_MAPS }
            }
          ]
        })
      },
      {
        test: /\.(less|css)$/,
        exclude: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'src/container')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: CSS_MAPS, importLoaders: 1 }
            },
            {
              loader: `postcss-loader`,
              options: {
                sourceMap: CSS_MAPS,
                plugins: () => {
                  autoprefixer({ browsers: [ 'last 2 versions' ] });
                }
              }
            },
            {
              loader: 'less-loader',
              options: { sourceMap: CSS_MAPS }
            }
          ]
        })
      },

      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)$/i,
        //development use url-loader, production use file-loader
        use :
        // use: isProd ?
        //   {
        //     loader: 'file-loader',
        //     query: {
        //       // name: '[path][name].[ext]?[md5:hash:base64:6]'
        //       //name: '[path][name]_[md5:hash:base64:6].[ext]'
        //       name: '[name]_[md5:hash:base64:6].[ext]'
        //     } 
        //   } :
          {
            loader: 'url-loader',
            query: {
              // inline base64 DataURL for <=2KB images, direct URLs for the rest
              // limit: 4096,
              limit: 2048,
              // name: '[name]_[md5:hash:base64:6].[ext]'
              name: 'assets/img/[name]_[md5:hash:base64:6].[ext]'
            } 
          }
      }
    ]
  }

};
