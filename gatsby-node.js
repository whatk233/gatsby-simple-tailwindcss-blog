const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const postsListTemplate = path.resolve(`./src/templates/index.js`);
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);
  const blogPageTemplate = path.resolve(`./src/templates/blog-page.js`);
  const result = await graphql(
    `
      query MyQuery {
        posts: allMarkdownRemark(
          sort: { order: DESC, fields: frontmatter___date }
          filter: { fileAbsolutePath: { regex: "/content/posts/" } }
          limit: 1000
        ) {
          nodes {
            id
            frontmatter {
              title
              description
              date(formatString: "YYYY.MM.DD")
            }
            fields {
              slug
            }
            excerpt
          }
        }
        pages: allMarkdownRemark(
          sort: { order: DESC, fields: frontmatter___date }
          filter: { fileAbsolutePath: { regex: "/content/pages/" } }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
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
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create single pages.
  const pages = result.data.pages.nodes;
  if (pages.length > 0) {
    pages.forEach((page) => {
      createPage({
        path: page.fields.slug,
        component: blogPageTemplate,
        context: {
          id: page.id,
        },
      });
    });
  }

  // Create blog posts pages.
  const posts = result.data.posts.nodes;
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;
      const nextPostId = index === 0 ? null : posts[index - 1].id;
      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }

  // Create pagination for posts list
  if (posts.length > 0) {
    // 每页显示的文章数量
    const postsOnPage = 8;
    // 获取文章总数
    const postsCount = Number(posts.length);
    // 需要页数
    const postsPagesCount = Math.ceil(postsCount / postsOnPage);
    // 文章列表
    let postsLists = [];
    // 当前文章顺序
    let nowPostRank = 0;
    // 分页生成文章列表
    for (let nowPage = 0; nowPage < postsPagesCount; nowPage++) {
      // 生成当前页面文章列表
      let nowPagePostsList = [];
      for (let index = 0; index < postsOnPage; index++) {
        // 将文章信息加入到当前列表中
        nowPagePostsList.push(posts[nowPostRank]);
        nowPostRank++;
        // 如果已到文章总数
        if (nowPostRank >= posts.length) {
          break;
        }
      }
      postsLists.push(nowPagePostsList);
    }
    // 创建分页
    postsLists.forEach((postsList, index) => {
      createPage({
        path: index == 0 ? "/" : `/page/${index + 1}`,
        component: postsListTemplate,
        context: {
          sitedata: result.data.site,
          posts: postsList,
          nowPageNum: index + 1,
          allPagesNum: postsPagesCount,
          previousPage: index == 0 ? null : index == 1 ? "/" : `/page/${index}`,
          nextPage:
            index < postsPagesCount - 1
              ? index == 0
                ? "/page/2"
                : `/page/${index + 2}`
              : null,
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  // from https://github.com/keithnull/gatsby-starter-breeze/blob/HEAD/gatsby-node.js
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    // slug
    let slug = node.frontmatter.slug || createFilePath({ node, getNode });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
    // date: front matter -> file name -> default date
    try {
      var date = node.frontmatter.date;
      if (!date) {
        const filename = node.fileAbsolutePath
          .split(/.*[\/|\\]/)[1]
          .split(".")[0];
        date = new Date(filename.substring(0, 10));
        if (isNaN(date)) {
          throw "Invalid Date";
        }
      }
    } catch (error) {
      console.warn(
        "Failed to get date from frontmatter or filename, use default date instead.",
        {
          slug: slug,
          filepath: node.fileAbsolutePath,
          error: error,
        }
      );
      date = new Date("1999-11-26");
    } finally {
      createNodeField({
        node,
        name: "date",
        value: date,
      });
    }
  }
};
