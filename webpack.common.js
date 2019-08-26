const webpack = require('webpack'); // 用于访问内置插件
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const PurifyCss = require('purifycss-webpack');//打包编译时，可剔除页面和js中未被使用的css
const glob = require('glob-all');//处理多路径文件
module.exports = {
  entry: {
    "app": "./hello-typescript.ts",
    "app1": './hello-typescript.js'
  },//已多次提及的唯一入口文件
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      //css中图片资源
      {
        test: /\.(jpg|png|gif|svg)$/,
        //小于1024的图片都用base64的方式加载
        loader: 'url-loader',
        options: {
          limit: 1024,
          outputPath: 'images/'
        }
      },
      //scss 编译成css 并进行css文件分离
      {
        test: /\.scss/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // 这里可以指定一个 publicPath
            // 默认使用 webpackOptions.output中的publicPath
            publicPath: '../'
          }
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      //html 图片等图片加载
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src', 'audio:src'],
            minimize: true
          }
        }
      },
      //打包typescript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      //es5编译
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", {
                "targets": {
                  "browsers": ["> 1%", "last 2 versions"]//支持1%以上的浏览器和版本俩个以上
                }
              }]
            ],
            "plugins": ["@babel/transform-runtime"]
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'css',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  output: {
    path: __dirname + "/dist/",//打包后的文件存放的地方
    filename: "./[name]/[name].bundle-[hash].js"//打包后输出文件的文件路径
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin('./dist'),//清除之前打包数据
    new optimizeCss(),//压缩css
    //css文件分离
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      // chunkFilename: "[id].css"
    }),
    new PurifyCss({
      paths: glob.sync([ // 传入多文件路径
        path.resolve(__dirname, './*.html'), // 处理根目录下的html文件
        path.resolve(__dirname, './*.js') // 处理目录下的js文件
      ])
    }),
    new HtmlWebpackPlugin({
      title: "测试",//html 的title
      //inject: "head",//打包文件引入标签的位置
      filename: 'app.html',
      template: "./cese.html",
      minify: { //压缩HTML文件
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: true,    //删除空白符与换行符
        minifyCSS: true,//内置样式
        minifyJS: true, //内置js
      },
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      title: "测试1",//html 的title
      // inject: "head",//打包文件引入标签的位置
      filename: 'app1.html',
      minify: { //压缩HTML文件
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: true,    //删除空白符与换行符
        minifyCSS: true,//内置样式
        minifyJS: true, //内置js
      },
      chunks: ['app1', 'css']
    })]

};