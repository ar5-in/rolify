import Tag from "@/Shared/Tag.jsx";

export default function Tags({tags}) {
    return <div className="flex flex-1 flex-wrap items-start space-x-2 space-y-2">
        {tags.map(tag => <Tag key={tag.id} tag={tag}/>)}
    </div>
}
