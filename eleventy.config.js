const htmlmin = require("html-minifier")

module.exports = eleventyConfig => {

  let markdownIt = require("markdown-it");
  let markdownItVideo = require("markdown-it-video");
  let options = {
    html: true,
    youtube: {
        nocookie: false,
        parameters: {
            rel: 0,
        }
      }
  };
  let markdownLib = markdownIt(options).use(markdownItVideo);
  
  eleventyConfig.setLibrary("md", markdownLib);

    // Add a readable date formatter filter to Nunjucks
    eleventyConfig.addFilter("dateDisplay", require("./filters/dates.js"))

    // Add a HTML timestamp formatter filter to Nunjucks
    eleventyConfig.addFilter("htmlDateDisplay", require("./filters/timestamp.js"))

    // Minify our HTML
    eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
        if ( outputPath.endsWith(".html") )
        {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            })
            return minified
        }
        return content
    })

    // Collections
    eleventyConfig.addCollection('blog', collection => {

        const blogs = collection.getFilteredByTag('blog')

        for( let i = 0; i < blogs.length; i++ ) {

            const prevPost = blogs[i - 1]
            const nextPost = blogs[i + 1]

            blogs[i].data["prevPost"] = prevPost
            blogs[i].data["nextPost"] = nextPost

        }

        return blogs.reverse()

    })

    eleventyConfig.addCollection('excercises', collection => {

        const blogs = collection.getFilteredByTag('blog', 'øvelser')

        for( let i = 0; i < blogs.length; i++ ) {

            const prevPost = blogs[i - 1]
            const nextPost = blogs[i + 1]

            blogs[i].data["prevPost"] = prevPost
            blogs[i].data["nextPost"] = nextPost

        }

        return blogs.reverse()

    })

    // Shortcuts
    // eleventyConfig.addNunjucksShortcode("user", function(user) {
    //     return `<div class="user">
    // <div class="user_name">${user.name}</div>
    // ${user.twitter ? `<div class="user_twitter">@${user.twitter}</div>` : ''}
    // </div>`;
    //   });

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/default.njk')
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

    // Include our static assets
    eleventyConfig.addPassthroughCopy("css")
    eleventyConfig.addPassthroughCopy("js")
    eleventyConfig.addPassthroughCopy("images")
    eleventyConfig.addPassthroughCopy("robots.txt")

    return {
        templateFormats: ["md", "njk"],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,

        dir: {
            input: 'site',
            output: 'dist',
            includes: 'includes',
            data: 'globals'
        }
    }

}
