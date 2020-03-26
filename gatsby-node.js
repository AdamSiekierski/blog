const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const blogPageTemplate = path.resolve("src/templates/BlogPageTemplate.js")
  const result = await graphql(`
    {
      allContentfulPost {
        nodes {
          url
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allContentfulPost.nodes.map(node => {
    actions.createPage({
      path: node.url,
      component: blogPageTemplate,
      context: {},
    })
  })
}
