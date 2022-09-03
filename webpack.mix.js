const { styles } = require('laravel-mix')
let mix = require('laravel-mix')

mix
    // Directories
    .copyDirectory('./src/admin', 'public/admin')
    .copyDirectory('./src/assets', 'public/assets')
    .copyDirectory('./src/_redirects', 'public/')

    // JavaScript
    .js('src/scripts/app.js', 'public/scripts').setPublicPath('public')

    // CSS
    .sass('src/style/style.scss', 'public/style/style.css')
