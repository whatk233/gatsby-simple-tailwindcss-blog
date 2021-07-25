import * as React from "react";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { Link, graphql } from "gatsby";

const PostPage = ({ data }) => {
  const post = data.markdownRemark;
  const { site, previous, next } = data;
  return (
    <Layout sitedata={site} pagedata={post.frontmatter}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="prose dark:prose-dark max-w-none py-5 border-dotted border-b-4 border-red-300"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <ul className="flex md:flex-row flex-col justify-between pt-5">
        <li className="py-2">
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              <div className="flex items-center border-2 border-gray-200 rounded-md	px-5 py-2 transition hover:bg-indigo-400 hover:text-white dark:text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <div className="flex flex-col pl-3">
                  <span>{previous.frontmatter.title}</span>
                  <span>上一篇</span>
                </div>
              </div>
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              <div className="flex justify-end items-center border-2 border-gray-200 rounded-md	px-5 py-2 transition hover:bg-indigo-400 hover:text-white dark:text-gray-200">
                <div className="flex flex-col pr-3">
                  <span>{next.frontmatter.title}</span>
                  <span>下一篇</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
};

export default PostPage;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
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
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
