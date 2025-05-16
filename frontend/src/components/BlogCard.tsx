import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id:string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 pb-8 pt-6 px-4 hover:bg-slate-50 transition-colors duration-200">
            <div className="flex items-center">
                <Avatar name={authorName} size="small" />
                <div className="flex items-center ml-2 text-sm">
                    <span className="font-medium">{authorName}</span>
                    <span className="mx-2 text-slate-400">●</span>
                    <span className="text-slate-600">{publishedDate}</span>
                </div>
            </div>
            <h2 className="text-2xl font-bold mt-4 mb-2 text-dark font-serif">
                {title}
            </h2>
            <p className="text-slate-700 line-clamp-3 font-serif">
                {content}
            </p>
            <div className="flex items-center mt-4 text-sm text-slate-500">
                <span>{`${Math.ceil(content.length / 100)} minute read`}</span>
                <span className="mx-2">●</span>
                <span>Selected for you</span>
            </div>
        </div>
    </Link>
}

export function Avatar({ name, size="small" }: { name: string, size:"small" | "big"}) {
    return <div className={`relative inline-flex items-center justify-center  ${size === "small" ? "w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

}