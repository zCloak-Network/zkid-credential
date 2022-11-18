// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.cjs');

module.exports = merge(baseConfig(__dirname, 'development'), {
  devServer: {
    open: false,
    port: 3000,
    static: path.resolve(__dirname, 'build'),
    compress: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Credential App',
      inject: true,
      template: path.join(__dirname, 'src/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  watchOptions: {
    ignored: ['.yarn', 'build', 'node_modules']
  }
});
