const path = require('path')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    const iconsDirectory = path.join(__dirname, 'assets/icons')

    const nextImagesRule = config.module.rules
      .find(({ loader }) => loader === 'next-image-loader')
    nextImagesRule.exclude = [
      iconsDirectory,
      /\.icon\.svg$/i,
    ]

    config.module.rules.push({
      test: [
        iconsDirectory,
        /\.icon\.svg$/i,
      ],
      loader: 'svg-sprite-loader',
      options: {
        symbolId: (filePath) =>
          path.basename(filePath).replace(/(\.icon)?\.svg$/i, ''),
        extract: true,
        spriteFilename: 'icons-[hash:16].svg'
      },
    })

    config.plugins.push(new SpriteLoaderPlugin())

    return config
  }
}

module.exports = nextConfig
