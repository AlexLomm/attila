const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env')();
const cssNano = require('cssnano')();
const webpack = require('webpack');

// const getFilePaths = require('./get-file-paths');

// TODO: extract prod logic
const isProd = process.env.NODE_ENV === 'production';

// const hbsRegex = /\.(handlebars|hbs)$/;

// const dirs = {
//   cssSrcDir: 'src/sass',
//   cssTargetDir: 'assets/css',
//
//   jsSrcDir: 'src/js',
//   jsTargetDir: 'assets/js',
//
//   jsDependencies: [
//     '<%= config.jsSrcDir %>/libs/jquery.min.js',
//     '<%= config.jsSrcDir %>/libs/jquery.fitvids.js',
//     '<%= config.jsSrcDir %>/libs/jquery.history.min.js',
//     '<%= config.jsSrcDir %>/libs/highlight.pack.js',
//     '<%= config.jsSrcDir %>/libs/nprogress.js',
//     'node_modules/ghosthunter/dist/jquery.ghosthunter.js',
//   ],
// };

// TODO: update webpack dev server (when the fix is available)
// Problem: HMR does not work for multiple html entries currently
// see: https://github.com/webpack/webpack/issues/7829
// module.exports = {
//   mode: isProd ? 'production' : 'development',
//   devtool: isProd ? false : 'inline-source-map',
//   entry: {
//     script: path.resolve(__dirname, 'src', 'js', 'script.js'),
//     style: path.resolve(__dirname, 'src', 'sass', 'style.scss'),
//   },
//   //   {
//   //   // Global JS and CSS
//   //   // Prefixed by "_" to avoid accidental name
//   //   // collisions with generated page files
//   //   script: path.resolve(__dirname, 'src', 'js', 'script.js'),
//   //
//   //   // // Pages' JS and CSS
//   //   // ...getFilePaths(path.resolve(__dirname, 'src', 'pages'), /\.js$/).reduce(
//   //   //   (accumulator, { fileName, filePath }) => {
//   //   //     // Rename home.scss and home.js to index.css and index.js
//   //   //     // respectively. See the explanation below
//   //   //     accumulator[fileName === 'home' ? 'index' : fileName] = filePath;
//   //   //
//   //   //     return accumulator;
//   //   //   },
//   //   //   {},
//   //   // ),
//   //   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new CopyWebpackPlugin([
//       {
//         from: path.resolve(__dirname, 'static'),
//         // TODO: rename to dist
//         to: path.resolve(__dirname, '_assets', 'static'),
//       },
//     ]),
//     new MiniCssExtractPlugin({
//       filename: 'css/style.css',
//     }),
//     // ...getFilePaths(path.resolve(__dirname, 'src', 'pages'), hbsRegex).map(
//     //   ({ fileName, filePath }) => {
//     //     return new HtmlWebpackPlugin({
//     //       inject: false,
//     //       hash: true,
//     //       template: filePath,
//     //       // In order to have `home` page accessible as a root page,
//     //       // rename home.hbs -> index.html. The same is done for
//     //       // the css and javascript files to keep everything consistent
//     //       filename: `${fileName === 'home' ? 'index' : fileName}.html`,
//     //     });
//     //   },
//     // ),
//   ],
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, '_assets', 'js'),
//   },
//   module: {
//     rules: [
//       // // Handlebars
//       // {
//       //   test: hbsRegex,
//       //   use: {
//       //     loader: 'handlebars-loader',
//       //     options: {
//       //       // Notice: inline requires, like in html-loader, aren't currently
//       //       // supported well: https://github.com/pcardune/handlebars-loader/issues/37,
//       //       // so something like <img src="./some-img.png"/> won't work
//       //       helperDirs: [path.resolve(__dirname, 'src', 'helpers')],
//       //       partialDirs: [path.resolve(__dirname, 'src', 'partials')],
//       //     },
//       //   },
//       // },
//       // Javascript
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//             plugins: ['@babel/plugin-transform-runtime'],
//           },
//         },
//       },
//       // CSS / SCSS
//       {
//         test: /\.(sa|sc|c)ss$/,
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader,
//             options: {
//               hmr: !isProd,
//             },
//           },
//           'css-loader',
//           {
//             loader: 'postcss-loader',
//             options: {
//               // required, when {Function}/require is used (Complex Options)
//               // see: https://github.com/postcss/postcss-loader#plugins
//               ident: 'postcss',
//               autoprefixer: {
//                 browsers: ['last 2 versions'],
//               },
//               plugins: (loader) =>
//                 isProd
//                   ? [postcssImport({ root: loader.resourcePath }), postcssPresetEnv, cssNano]
//                   : [postcssImport({ root: loader.resourcePath }), postcssPresetEnv],
//             },
//           },
//           'sass-loader',
//         ],
//       },
//       // Images
//       {
//         test: /\.(gif|png|jpe?g|svg)$/,
//         use: [
//           'file-loader',
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 8192,
//             },
//           },
//           'image-webpack-loader',
//         ],
//       },
//       // Fonts
//       {
//         test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
//         use: ['file-loader'],
//       },
//     ],
//   },
// };

// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const ZipPlugin = require('zip-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function (env, argv) {
  const config = {
    // TODO: ??
    mode: 'development',
    entry: {
      script: './src/js/script.js',
      post: './src/js/pages/post.js',
    },
    output: {
      path: path.resolve(__dirname, 'assets'),
      publicPath: path.resolve(__dirname, 'assets'),
      filename: 'js/[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                // required, when {Function}/require is used (Complex Options)
                // see: https://github.com/postcss/postcss-loader#plugins
                ident: 'postcss',
                autoprefixer: {
                  browsers: ['last 2 versions'],
                },
                plugins: (loader) =>
                  isProd
                    ? [postcssImport({ root: loader.resourcePath }), postcssPresetEnv, cssNano]
                    : [postcssImport({ root: loader.resourcePath }), postcssPresetEnv],
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'font/',
                // define where are the fonts located in relation to css
                publicPath: '../font/',
              },
            },
          ],
        },
      ],
    },
    // optimization: {
    //   minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    // },
    plugins: [
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery',
      // }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
      }),
      // // TODO: remove
      // new CopyWebpackPlugin([
      //   {
      //     from: "src/font",
      //     to: "../assets/font",
      //   },
      // ]),
    ],
  };

  // TODO: enable
  // // Add zip for production builds
  // if (argv.mode === 'production') {
  //   config.plugins.push(
  //     new ZipPlugin({
  //       path: '..',
  //       pathPrefix: '.',
  //       filename: 'attila.zip',
  //       exclude: [
  //         /^node_modules\//,
  //         /^\.git\//,
  //         /^screenshot-/,
  //         'package.json',
  //         'README.md',
  //         'yarn.lock',
  //         '.gitignore',
  //       ],
  //     }),
  //   );
  // }

  // TODO: enable
  // // Add bundle analyzer if enabled
  // if (process.env.ANALYZE_BUNDLE) {
  //   config.plugins.push(new BundleAnalyzerPlugin());
  // }

  return config;
};
