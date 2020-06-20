const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env')();
const cssNano = require('cssnano')();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const dree = require('dree');

const getFilePaths = (dirPath, test) => {
  const paths = [];
  dree.scan(dirPath, {}, (file) => {
    if (test.test(file.relativePath)) {
      paths.push({
        fileName: file.name.replace(test, ''),
        filePath: path.resolve(dirPath, file.relativePath),
      });
    }
  });

  return paths;
};

const isProd = process.env.NODE_ENV === 'production';

module.exports = function (env, argv) {
  const config = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'inline-source-map',
    watch: argv.watch,
    entry: {
      // default script
      script: './src/js/script.js',
      // script for pages
      ...getFilePaths(path.resolve(__dirname, 'src/js/pages'), /\.js$/).reduce(
        (accumulator, { fileName, filePath }) => {
          if (/script/.test(fileName)) {
            throw new Error('\n\nNAME CONFLICT BETWEEN ONE OF THE PAGES AND THE "script.js"\n\n');
          }

          return {
            ...accumulator,
            [fileName]: filePath,
          };
        },
        {},
      ),
    },
    output: {
      path: path.resolve(__dirname, 'assets'),
      publicPath: path.resolve(__dirname, 'assets'),
      filename: 'js/[name].js',
    },
    module: {
      rules: [
        // JS
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
        // CSS
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
                plugins: (loader) => [
                  postcssImport({ root: loader.resourcePath }),
                  postcssPresetEnv,
                  // add cssNano for prod builds
                  ...(isProd ? [cssNano] : []),
                ],
              },
            },
            'sass-loader',
          ],
        },
        // FONTS
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
    plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: 'css/style.css' })],
  };

  // Add bundle analyzer if enabled
  if (argv.analyze) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
