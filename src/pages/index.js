import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteTitle = `Home`
  const posts = data.allContentfulHomeBanner.nodes
  console.log("posts-->", posts)

  return (
    <>
      {/* <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />

      
    </Layout> */}
      {posts.map((post, index) => {
        console.log("post=>", post)

        return (
          <>
            <div className="container">
              <h1
                style={{
                  color: "#e85f09",
                  fontSize: 25,
                  fontFamily: "sans-sarif",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Gatsby App Using Contentful Api
              </h1>
              <table className="table table-striped table-hover mt-5">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{post.bannerTitle}</td>
                    <td>{post.bannerDescription.bannerDescription}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )
      })}
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allContentfulHomeBanner {
      nodes {
        bannerDescription {
          bannerDescription
        }
        bannerTitle
      }
    }
  }
`
