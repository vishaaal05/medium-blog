import { Avatar } from "./BlogCard"

const Appbar = () => {
  return (
    <div className="border-b border-slate-400 flex justify-between items-center py-2 px-10">
        <div>
        Medium
        </div>
        <div>
            <Avatar size="big" name="Vishal Kumar Gupta" />
        </div>
    </div>
  )
}

export default Appbar