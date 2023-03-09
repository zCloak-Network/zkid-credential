// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.cjs');

const context = __dirname;

module.exports = merge(baseConfig(context), {
  devtool: process.env.BUILD_ANALYZE ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Credential App',
      inject: true,
      template: path.join(context, 'src/index.html')
    })
  ]
});
