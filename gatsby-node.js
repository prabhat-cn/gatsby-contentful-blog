const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  // const blogPost = path.resolve(`./src/templates/blog-post-contentful.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allContentfulHomeBanner {
          nodes {
            bannerDescription {
              bannerDescription
            }
            bannerTitle
          }
        }
        allContentfulHomeBannerBottom {
          edges {
            node {
              counter1Name
              counter2Name
              counter3Name
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result
  console.log("posts->", posts)
  // createPage({
  //   // path: post.fields.slug,
  //   // path: "blog-post-contentful",
  //   // component: blogPost,
  //   // context: {
  //   //   id: post.id,
  //   //   previousPostId,
  //   //   nextPostId,
  //   // },
  // })

  // if (posts.length > 0) {
  //   posts.forEach((post, index) => {
  //     console.log("post->", post)

  //     const previousPostId = index === 0 ? null : posts[index - 1].id
  //     const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

  //     createPage({
  //       path: post.fields.slug,
  //       // path: "blog-post-contentful",
  //       component: blogPost,
  //       // context: {
  //       //   id: post.id,
  //       //   previousPostId,
  //       //   nextPostId,
  //       // },
  //     })
  //   })
  // }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    // type Fields {
    //   slug: String
    // }
  `)
}
