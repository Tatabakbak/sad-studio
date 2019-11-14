const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env={}) => {
    const {mode = 'development'} = env;
    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const getStyleLoaders = () => {
        return [
            isProd ? miniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
        ]
    };

    const getPlugins = () => {
        const plugins = [
            new htmlWebpackPlugin({
                template: 'public/index.html'
            })
        ];

        if (isProd) {
            plugins.push(
                new miniCssExtractPlugin({
                    filename: 'main-[hash:8].css'
                }));
        }

        return plugins;
    };

    return {
        mode: isProd ? 'production' : isDev && 'development',
        output: {
            // undefined здесь указывает, что файлу дается имя по умолчанию
            filename: isProd? "main-[hash:8].js" : undefined
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.(png|jpg|gif|svg|jpeg|ico)$/,
                    loader: "file-loader",
                    options: {
                        name: "[name]-[sha1:hash:7].[ext]",
                        outputPath: 'images'
                    }
                },
                {
                    test: /\.(woff|woff2|eot|otf|ttf)$/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: 'fonts'
                    }
                },
                {
                    test: /\.(css)$/,
                    use: getStyleLoaders()
                },
                {
                    test: /\.(scss)$/,
                    use: [...getStyleLoaders(), "sass-loader"]
                }
            ]
        }
        ,
        plugins: getPlugins(),
        devServer:
            {
                open: true
            }
    }
};