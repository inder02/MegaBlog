import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

const PostCard = ({ $id, title, featuredImg }) => {
  return (
    <div>
      <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
          <div className="w-full justify-center mb-4">
            <img
              src={service.getFilePreview(featuredImg)}
              alt={title}
              className="rounded-xl"
            />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
