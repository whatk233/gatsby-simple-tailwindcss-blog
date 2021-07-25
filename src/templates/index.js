import * as React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import Seo from "../components/seo";
import Pagination from "../components/pagination";

const BlogIndex = ({ pageContext }) => {
  const { posts, sitedata, allPagesNum, nextPage, previousPage, nowPageNum } = pageContext;
  return (
    <Layout sitedata={sitedata}>
      <Seo title="所有文章" />
      <main className="divide-y">
        {posts.map((node) => (
          <PostCard key={node.id} post={node} />
        ))}
      </main>
      <Pagination
        allPagesNum={allPagesNum}
        nextPage={nextPage}
        previousPage={previousPage}
        nowPageNum={nowPageNum}
      />
    </Layout>
  );
};

export default BlogIndex;
