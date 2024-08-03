import Appbar from './Appbar'
import { Blog } from '../hooks'
import { Avatar } from './BlogCard'

const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <Appbar />
            <div className='grid grid-cols-12 px-10 w-full pt-200 mt-10'>
                <div className='col-span-8 w-4/5'>
                    <div className='font-extrabold text-2xl'>
                        {blog.title}
                    </div>
                    <div className='text-slate-500'>
                        Posted on August 24, 2024
                    </div>
                    <div className='py-4'>
                        {blog.content}
                    </div>
                </div>
                <div className='col-span-4'>
                    <div>
                    Author
                    </div>
             
                    <div className='flex w-full '>
                        <div className='flex flex-col justify-center pr-4'>
                        <Avatar size='big' name={blog.author.name || "Anonymous"} />
                        </div>
                        
                        <div className=''>
                            <div className='font-bold text-xl'>
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className='text-slate-500'>
                                Master of mirth, purveyor of puns, and the funniest person in the kingdom.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullBlog