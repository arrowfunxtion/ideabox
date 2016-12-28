var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: {
        background: "./background.entry.js",
        contentscript: "./contentscript.entry.js"
    },
    output: {
        path: __dirname + "/extension/scripts",
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },


    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
        $: 'jquery',
        GlobalService: './services/GlobalService',
        '_': 'lodash'
      })
    ],

    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0', exclude: /node_modules/},
        {test: /\.css$/, loader: 'style!css'},
        {test: /\.json$/, loader: 'json'}
      ]
    },
    resolve: {
      modulesDirectories: ['web_modules', 'node_modules', './', './services', './components'],
      extensions: ['', '.js', '.jsx']
    }
}
