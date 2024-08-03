import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  if (loading || !blog) {
    return <div>Loading...</div>; // Or any other placeholder UI
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};

export default Blog;
