const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime") //For blog post read time
const htmlmin = require("html-minifier"); //minify html

const prettyDate = require('./lib/pretty-date.js')

module.exports = function(eleventyConfig) {

    // Recomplile 11ty when files change
    eleventyConfig.addWatchTarget("./src/style/")

    eleventyConfig.addCollection("featuredPosts", collection => {
        return collection.getFilteredByTag("post").filter(item => item.data.featured);
    });

    // Expose Nunjucks filters
    eleventyConfig.addFilter("prettyDate", prettyDate);

    // From https://www.npmjs.com/package/@11tyrocks/eleventy-plugin-emoji-readtime
    eleventyConfig.addPlugin(emojiReadTime, { 
        showEmoji: false, 
        wpm: 250,
        // emoji: "🕚",
        label: "min read",
        bucketSize: 1,
    })

    // Automatically open up the browser on script runs
    eleventyConfig.setBrowserSyncConfig({
        open: true
    })

    // minify html on prod build
    eleventyConfig.addTransform ('htmlmin', content => {
        if (process.env.NODE_ENV === 'production') {
          return htmlmin.minify (content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
          })
        }
        return content
    })

    eleventyConfig.addGlobalData('site', {
        name: 'Your Site Name',
        host: 'https://yoursitename.com',
        slogan: 'Your global site slogan',
        description: "your default site description"
      });

    return {
        htmlTemplateEngine: 'njk',

        dir: {
            input: "site/src",
            output: "public",
            // In relation to input
            layouts: "../templates",
            // In relation to input
            includes: "../templates/partials"
        },

        templateFormats: [
            "md",
            "njk",
            "jpg",
            "jpeg", 
            "png",
            "gif",
            "webp",
            "svg",
            "xml",
            "txt",
            "pdf",
            "zip",
            "mp4",
            "ogv",
            "json",
            "ics"
        ]
    }
}