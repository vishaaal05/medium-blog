interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <div className="border-b border-slate-200 pb-4">
            <div className="flex pt-5">
                <Avatar name={authorName} size="small" />
                <div className=" flex justify-center flex-col ml-2 ">
                    {authorName}
                </div>
                <div className="text-xs mt-1 mx-1 ">
                    ●
                </div>
                <div className="text-slate-600">
                    {publishedDate}
                </div>
            </div>
            <div className="text-2xl font-bold mt-3">
                {title}
            </div>
            <div className="text-slate-700">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 pt-10">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    )
}

export function Avatar({ name, size="small" }: { name: string, size:"small" | "big"}) {
    return <div className={`relative inline-flex items-center justify-center  ${size === "small" ? "w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

}