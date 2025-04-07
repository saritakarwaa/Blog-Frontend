import React from "react";

type BlogCardProps = { //defines the props
  image: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
};

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  description,
  category,
  author,
  date,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto">
      <img src={image} alt="blog" className="w-full h-56 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-md mb-2">
          {category}
        </span>
        <div className="text-sm text-gray-500 mb-4">
          {author} • {date}
        </div>
        <hr />
        <div className="mt-4 text-blue-600 font-medium hover:underline cursor-pointer flex items-center gap-1">
          Read More <span className="text-lg">→</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
