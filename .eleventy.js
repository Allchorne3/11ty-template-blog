const { DateTime } = require("luxon") // For date formatting
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime") //For blog post read time
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {

    // Recomplile 11ty when files change
    eleventyConfig.addWatchTarget("./src/style/")

    // From 11tyrocks: https://11ty.rocks/eleventyjs/dates/
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
    })

    // From https://www.npmjs.com/package/@11tyrocks/eleventy-plugin-emoji-readtime
    eleventyConfig.addPlugin(emojiReadTime, { 
        showEmoji: false, 
        wpm: 250,
        // emoji: "🕚",
        label: "min read",
        bucketSize: 1,
    })

    // For adding categories
    // From: https://lewisdale.dev/post/adding-categories-to-eleventy/
    eleventyConfig.addCollection('categories', (collectionApi) => {
        const posts = collectionApi
            .getFilteredByTag("posts")
            .filter(p => !p.data.tags.includes("draft"));

        return posts.reduce((tags, post) => {
            post.data.tags.filter(tag => tag !== 'posts').forEach(tag => {
                if (!tags[tag]) {
                    tags[tag] = 0;
                }
                tags[tag]++;
            });
            return tags;
        }, {"All posts": posts.length})
    });

    // Automatically open up the browser on script runs
    eleventyConfig.setBrowserSyncConfig({
        open: true
    })

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

    return {
        htmlTemplateEngine: 'njk',
        dir: {
            input: "src",
            output: "public"
        },
        // passthroughFileCopy: true,
    }
}