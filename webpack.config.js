import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import TerserPlugin from 'terser-webpack-plugin';

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js', // Entry point
    output: {
      path: path.resolve('dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].bundle.js', // Use content hashing in production
      clean: true, // Cleans the output directory before every build
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/, // Transpile .js and .jsx files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/, // Handle CSS files
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i, // Handle image files
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][hash][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i, // Handle font files
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][hash][ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'], // Resolve these extensions
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html', // Use this HTML file as a template
        favicon: './public/favicon.ico', // Add support for favicon
      }),
      new Dotenv(), // Load environment variables from .env file
    ],
    devtool: isProduction ? 'source-map' : 'eval-source-map', // Source maps for debugging
    devServer: {
      static: path.resolve('dist'),
      compress: true,
      port: 3000, // Serve on http://localhost:3000
      hot: true, // Enable hot module replacement
      client: {
        overlay: true, // Show a full-screen overlay for errors
      },
    },
    optimization: {
      minimize: isProduction, // Minimize only in production
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'all', // Optimize shared chunks
      },
    },
    mode: isProduction ? 'production' : 'development', // Mode based on environment
  };
};
