var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: {
        main: [
          // 'webpack-dev-server/client?http://localhost:8000',
          // 'webpack/hot/only-dev-server',
          './main.js'
        ]
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js",
        // publicPath: 'http://localhost:8000/static'
    },


    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
        $: 'jquery',
        GlobalService: './services/GlobalService',
        '_': 'lodash'
      }),
      new webpack.NoErrorsPlugin(),
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
         'process.env': {
             // This has effect on the react lib size
             'NODE_ENV': JSON.stringify('production'),
         }
      }),
      // new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    ],

    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0,plugins[]=transform-decorators-legacy', exclude: /node_modules/},
        {test: /\.css$/, loader: 'style!css'},
        {test: /\.json$/, loader: 'json'}
      ]
    },
    resolve: {
      modulesDirectories: ['web_modules', 'node_modules', './', './services', './components'],
      extensions: ['', '.js', '.jsx']
    }
}
