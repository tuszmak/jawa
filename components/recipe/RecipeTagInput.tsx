import { Tag } from "@/types/types";
import React, { Dispatch, SetStateAction, useState } from "react";

interface TagProps{
  tags: Tag[],
  selectedTags : string[],
  setSelectedTags: Dispatch<SetStateAction<string[]>>

}
function TagInput({tags, selectedTags, setSelectedTags} : TagProps) {
    const [currentTag, setCurrentTag] = useState<string>("");
    const [remainingTags, setRemainingTags] = useState(tags);

    const handleSelectTag = () => {
        const searchTag = currentTag;
        if (selectedTags.includes(searchTag)) {
        } else {
          const newTags = structuredClone(selectedTags);
          const newRemTags = structuredClone(remainingTags);
    
          const tagInTheData = newRemTags.find((e) => e.name === searchTag);
          if (tagInTheData) {
            newRemTags.splice(newRemTags.indexOf(tagInTheData));
            setRemainingTags(newRemTags);
          }
          newTags.push(searchTag);
          setSelectedTags(newTags);
        }
      };
  return (
    <div>
      <label htmlFor="tags">Choose a tag</label>
      <input
        type="text"
        name="newTag"
        id="newTag"
        list="tags"
        onChange={(e) => setCurrentTag(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      <datalist id="tags">
        <option>Pick a tag</option>
        {remainingTags.map((tag) => (
          <option key={tag.id} value={tag.name}>
            {tag.name}
          </option>
        ))}
        {/* <option value="">Create {newTag}</option> */}
      </datalist>
      <button onClick={handleSelectTag}>Submit selected tag</button>
      <label htmlFor="newTag">Don&apos;t see your tag? Create one!</label>
      <input
        type="text"
        name="newTag"
        id="newTag"
        onChange={(e) => setCurrentTag(e.target.value)}
      />
      <button onClick={handleSelectTag}>Add tag</button>
    </div>
  );
}

export default TagInput;
