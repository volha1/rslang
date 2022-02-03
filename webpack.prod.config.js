const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/static', to: 'static' },
                { from: 'src/assets', to: 'assets' },
            ]
        })
    ]
};
