module.exports = {
    entry: {
        app: [
            './src/index.js'
        ]
    },

    output: {
        path: './dist',
        filename: '[name].js'
    }, 
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader']    
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },{
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      }
        ]
    }
}

