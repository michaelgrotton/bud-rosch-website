import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {scale} from "../utils/typography"
import styles from "./index.module.css"

class BlogIndex extends React.Component {
  state = {
    selected:"none"
  }

  render() {
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    const { data } = this.props
    const allcategories = this.props.data.allcategories.group
    let posts;
    if(this.state.selected === "none") {
      posts = data.allMarkdownRemark.edges
    } else {
      posts = data.allMarkdownRemark.edges.filter(edge =>
        edge.node.frontmatter.category.includes(this.state.selected)
      )
    }

    return (
      <Layout location="index">
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <hr
          style={{
            marginBottom:"15px",
            backgroundColor:"black",

          }}
        />

      <h4 style={{fontFamily:"Helvetica",marginBottom:"10px"}}>Categories:</h4>
        <div style={{display:"flex",marginBottom:"10px",flexWrap:"wrap"}}>
          {allcategories.map(category => (
            <Link style={{marginRight:"7px",marginBottom:"5px",textDecoration:"none"}} className={styles.catLink} to={`categories/${category.fieldValue}`}>
              <div key={category.fieldValue} className={styles.category}>
                #{category.fieldValue} <strong style={{color:"#CC1F1A"}}>{category.totalCount}</strong>
              </div>
            </Link>
          ))}
        </div>

        <hr
          style={{
            marginBottom:"35px",
            backgroundColor:"black",

          }}
        />

        {posts.map(({ node },index) => {
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
                {categories.map((category, index) => {
                  return(
                    <Link style={{marginRight:"7px",marginBottom:"5px",textDecoration:"none"}} className={styles.catLink} to={`categories/${category}`}>
                      <div key={category.fieldValue} className={styles.category}>
                        #{category}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
          )
        })}

        <hr
          style={{
            marginBottom:"15px",
            backgroundColor:"black",

          }}
        />

        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"20px",fontFamily:"Helvetica"}}>
        {!isFirst && (
          <Link to={prevPage} rel="prev" className={styles.all}>
            ← Previous Page
          </Link>
        )}
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
          {Array.from({ length: numPages }, (_, i) => (
            <Link key={`pagination-number${i + 1}`} to={`/${i === 0 ? "" : i + 1}`} style={{marginRight:"5px"}} className={styles.all}>
              {i + 1}
            </Link>
          ))}
        </div>
        {!isLast && (
          <Link to={nextPage} rel="next" className={styles.all}>
            Next Page →
          </Link>
        )}
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!){
    site {
      siteMetadata {
        title
      }
    }
    exit: file(absolutePath: { regex: "/exit.png/" }) {
      childImageSharp {
        fixed(width: 20, height: 20) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
          }
        }
      }
    }
    allcategories: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
  }
`
