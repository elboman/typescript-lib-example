var path = require("path");
var webpack = require("webpack");

var PATHS = {
    entryPoint: path.resolve(__dirname, 'src/index.ts'),
    bundles: path.resolve(__dirname, '_bundles')
};

var config = {
    // These are the entry point of our library. We tell webpack to use the name we assign later, when creating the bundle.
    // We also use the name to filter the second entry point for applying code minification via UglifyJS
    entry: {
        'my-lib': [PATHS.entryPoint],
        'my-lib.min': [PATHS.entryPoint]
    },
    // The output defines how and where we want the bundles. The special value `[name]` in `filename` tell Webpack to use the name we defined above.
    // We target a UMD and name it MyLib. When including the bundle in the browser it will be accessible at `window.MyLib`
    output: {
        path: PATHS.bundles,
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'MyLib',
        umdNamedDefine: true
    },
    // Add resolve for `tsx` and `ts` files, otherwise Webpack would
    // only look for common JavaScript file extension (.js)
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    // Activate source maps for the bundles in order to preserve the original
    // source when the user debugs the application
    devtool: 'source-map',
    plugins: [
        // Apply minification only on the second bundle by using a RegEx on the name, which must end with `.min.js`
        // NB: Remember to activate sourceMaps in UglifyJsPlugin since they are disabled by default!
        new webpack.optimize.UglifyJsPlugin({
            compress:true,
            sourceMap: true,
            include: /\.min\.js$/
        })
    ],

    // Webpack doesn't understand TypeScript files and a loader is needed.
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {loader: 'awesome-typescript-loader'}
                ]
            }
        ]
    },

    // this library should not include external dependencies, so our library uses
    // can choose their own version (or omit it completely if it is optional)
    externals: {
        // tell Webpack to be compatible with the following format for requiring moment
        'moment': {root: 'moment', commonjs: 'moment', commonjs2: 'moment', amd: 'moment'}
    },
};

module.exports = config;