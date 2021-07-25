import * as React from "react";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { graphql } from "gatsby";

const PageTemplates = ({ data }) => {
  const page = data.markdownRemark;
  const { site } = data;
  return (
    <Layout sitedata={site} pagedata={page.frontmatter}>
      <Seo
        title={page.frontmatter.title}
        description={page.frontmatter.description || page.excerpt}
      />
      <article
        className="prose dark:prose-dark max-w-none py-5"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </Layout>
  );
};

export default PageTemplates;

export const pageQuery = graphql`
  query BlogPageBySlug($id: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        description
        navlink {
          label
          url
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD HH:mm:SS")
        description
      }
    }
  }
`;
