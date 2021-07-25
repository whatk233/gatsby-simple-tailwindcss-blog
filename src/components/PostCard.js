import * as React from "react";
import { Link } from "gatsby";

const PostCard = ({ post }) => {
  const postData = post.frontmatter;
  return (
    <div className="py-5 leading-loose">
      <h2 className="transition text-indigo-500 hover:text-indigo-800 dark:text-indigo-400">
        <Link to={post.fields.slug}>{postData.title}</Link>
      </h2>
      <span className="text-gray-500 dark:text-gray-200 text-sm">
        {postData.date}
      </span>
      {/* 无描述则抽正文截断 */}
      <p className="text-gray-600 dark:text-gray-200">
        {postData.description || post.excerpt}
      </p>
    </div>
  );
};

export default PostCard;
