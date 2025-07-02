// src/components/BlogCard/BlogCard.tsx
import { Post } from '../../pages/BlogPost/BlogPost';
import React from 'react';
import { Link } from 'react-router-dom';


export interface BlogCardProps {
  post: Post;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { slug, title, date, content } = post;
  const excerpt =
    content.length > 100
      ? content.slice(0, 100).trim() + '…'
      : content;

  return (
    <Link
      to={`/blog/${slug}`}
      className="
        group
        flex
        flex-col
        border
        text-neutral-222224
        hover:shadow-lg
        transition
      "
    >
      <div className="px-4 py-4 flex-1">
        <p className="text-[24px] leading-[1.166] mb-[4px]">
          {title}
        </p>
        <p className="text-sm text-gray-500 mb-[12px]">
          {new Date(date).toLocaleDateString()}
        </p>
        <p className="leading-[1.5]">{excerpt}</p>
      </div>

      <div className="
        px-4
        py-2
        bg-blue-265f8e
        text-neutral-ffffff
        text-center
        font-bold
      ">
        Read more
      </div>
    </Link>
  );
};

export default BlogCard;
