import Appbar from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"


export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-8 bg-primary rounded-full mb-4"></div>
                    <div className="text-lg text-slate-600">Loading stories...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Appbar />
            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="space-y-8">
                    {blogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"2nd feb 2024"}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}
