import React from "react"
import styles from "./index.module.css"
import {scale} from "../utils/typography"
import Layout from "../components/layout"

// Components
import { Link, graphql } from "gatsby"

const Categories = ({ location, pageContext, data }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const categoryHeader = `${totalCount} piece${
    totalCount === 1 ? "" : "s"
  } with the category "${category}"`

  return (
    <Layout location={`/category/${category}`} title={data.site.siteMetadata.siteTitle}>
      <div>
        <h1 style={{textAlign:"center",fontSize:"30px",marginBottom:"10px",fontWeight:"400"}}>{categoryHeader}</h1>

        <div style={{textAlign:"center",marginBottom:"25px"}}>
          <Link to={"/"} className={styles.all}>
            all posts
          </Link>
        </div>

          {edges.map(({ node },index) => {
            const title = node.frontmatter.title || node.fields.slug
            const categories = node.frontmatter.category

            return (
              <div key={index}>
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration:"none"
                  }}
                  to={node.fields.slug}
                  className={styles.post}
                >
                <div key={node.fields.slug} style={{marginBottom:"5px"}} className={styles.post}>
                  <p
                    style={{
                      ...scale(1.5),
                      marginBottom:0,
                      fontWeight:900
                    }}
                  >
                  <i>{title}</i>
                  </p>
                  <div>{node.frontmatter.date}</div>
                  <p style={{...scale(.2),marginTop:"5px",marginBottom:"10px"}}
                    dangerouslySetInnerHTML={{
                      __html: node.excerpt,
                    }}
                  />
                </div>
              </Link>
              <div style={{display:"flex",marginBottom:"50px",flexWrap:"wrap"}}>
                <div style={{fontFamily:"Helvetica",fontSize:"15px",height:"30px",lineHeight:"29px",marginRight:"10px"}}><strong>Tags:</strong></div>
                <div style={{display:"flex"}}>
                  {categories.map((current, index) => {
                    return(
                      <Link style={{marginRight:"7px",marginBottom:"5px",textDecoration:"none"}} className={styles.catLink} to={`categories/${current}`}>
                        <div key={category.fieldValue} className={styles.category}>
                          #{current}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
            )
          })}
      </div>
    </Layout>
  )
}

export default Categories

export const pageQuery = graphql`
  query($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            category
          }
        }
      }
    }
  }
`
