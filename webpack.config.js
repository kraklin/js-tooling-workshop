var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './src/index.js'
        ]
    },

    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader']
        },
        {
            test: /\.html$/,
            use: ['file-loader?name=[name].[ext]']
        }, 
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
            test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
        }
        ]
    },
    devServer: {
        inline: true,
        contentBase: './src',
        stats: { colors: true },
    },
    plugins: [
        new CopyWebpackPlugin([
          {from: './src/images/logo.png', to: './images/logo.png'}  
        ])
    ]
}

