import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const Appbar = () => {
  return (
    <div className="border-b border-slate-400 flex justify-between items-center py-2 px-10">
      <Link to={`/blogs`}>
        <div className="font-bold text-xl">
          Medium
        </div>
      </Link>
      <div className="flex">
        <div>
          <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-3 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
        </div>
        <Avatar size="big" name="Vishal Kumar Gupta" />
      </div>
    </div>
  )
}

export default Appbar