import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    let header

    if (this.props.location === "index") {
      header = (
        <h1
          style={{
            ...scale(5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            marginLeft: `auto`,
            marginRight: `auto`,
            textAlign:`center`
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            Bud Rosch Writing Portfolio
          </Link>
        </h1>
      )
    } else {
      header = (
        <h2
          style={{
            ...scale(1.5),
            fontFamily: `sans-serif`,
            marginTop: 0,
            borderBottom:"2px solid black",
            paddingBottom:"4px"
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            Bud Rosch Writing Portfolio
          </Link>
        </h2>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{this.props.children}</main>
        <footer>
          © {new Date().getFullYear()}, Bud Rosch.
        </footer>
      </div>
    )
  }
}

export default Layout
