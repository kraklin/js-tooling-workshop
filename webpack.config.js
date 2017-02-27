module.exports = {
    entry: {
        app: [
            './src/js/app.js'
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
        }]
    }
}

