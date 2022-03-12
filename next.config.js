const path = require('path')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    const nextImagesRule = config.module.rules
      .find(({ loader }) => loader === 'next-image-loader')
    nextImagesRule.exclude = /\.icon\.svg$/i

    config.module.rules.push({
      test: /\.icon\.svg$/i,
      loader: 'svg-sprite-loader',
      options: {
        symbolId: (filePath) => path.basename(filePath, '.icon.svg'),
        extract: true,
        spriteFilename: 'icons-[hash:16].svg'
      },
    })

    config.plugins.push(new SpriteLoaderPlugin())

    return config
  }
}

module.exports = nextConfig
