import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale} from "../utils/typography"
import styles from "./index.module.css"

class BlogIndex extends React.Component {
  state = {
    selected:"none"
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const allcategories = this.props.data.allcategories.group
    let posts;
    if(this.state.selected == "none") {
      posts = data.allMarkdownRemark.edges
    } else {
      posts = data.allMarkdownRemark.edges.filter(edge =>
        edge.node.frontmatter.category.includes(this.state.selected)
      )
      console.log(this.state.selected)
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
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

      <h4 style={{fontFamily:"Helvetica",marginBottom:"10px"}}>Filter pieces by tag:</h4>
        <div style={{display:"flex",marginBottom:"15px",flexWrap:"wrap"}}>
          {allcategories.map(category => (
            <div key={category.fieldValue} className={this.state.selected === category.fieldValue ? styles.selected : styles.category} onClick={()=>{this.state.selected === category.fieldValue ? this.setState({selected:"none"}) : this.setState({selected:category.fieldValue})}} style={{width:"90px"}}>
              #{category.fieldValue} <strong style={{color:"#CC1F1A"}}>{category.totalCount}</strong>
            </div>
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
                boxShadow:"none",
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
              {categories.map((category, index) => {
                return(
                  <div className={styles.category} key={index} onClick={()=>{this.setState({selected:category})}}>
                      #{category}
                  </div>
                )
              })}
            </div>
          </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
