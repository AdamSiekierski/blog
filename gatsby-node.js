const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const blogPageTemplate = path.resolve("src/templates/blogPageTemplate.js")
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.map(({ node }) => {
    actions.createPage({
      path: node.frontmatter.path,
      component: blogPageTemplate,
      context: {},
    })
  })
}
