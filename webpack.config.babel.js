import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';


export default {

  stats: 'verbose',

  context: path.resolve(__dirname, 'src'),

  entry: {
    'index': 'index',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: "umd",
    umdNamedDefine: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
    new ForceCaseSensitivityPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    symlinks: false,
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
     'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    }
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }

};