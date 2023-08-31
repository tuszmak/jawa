import { Tag } from "@/types/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select from "react-select";

interface TagProps {
  tags: Tag[];
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
}
function TagInput({ tags, selectedTags, setSelectedTags }: TagProps) {
  const [currentTag, setCurrentTag] = useState<string>("");
  const [remainingTags, setRemainingTags] = useState<Tag[]>(tags);

  const handleSelectTag = () => {
    const searchTag = currentTag;
    if (selectedTags.includes(searchTag)) {
      return; //To remove duplicate tags
    }
    if (searchTag !== "") {
      const newTags = structuredClone(selectedTags);
      const newRemTags = structuredClone(remainingTags);

      const tagInTheData = newRemTags.find((e) => e.name === searchTag);
      if (tagInTheData) {
        newRemTags.splice(newRemTags.indexOf(tagInTheData), 1);
        setRemainingTags(newRemTags);
      }
      newTags.push(searchTag);
      setSelectedTags(newTags);
      setCurrentTag("");
    }
  };
  useEffect(() => {
    const remTags = tags.filter((tag) => !selectedTags.includes(tag.name));
    setRemainingTags(remTags);
  }, [selectedTags]);
  return (
    <div>
      <div>
        <Select
          id="tagSelect"
          options={remainingTags}
          getOptionLabel={(tag: Tag) => tag.name}
          getOptionValue={(tag: Tag) => tag.name}
          onChange={(e) => setCurrentTag(e?.name || "")}
        />
      </div>
      <div>
        <button onClick={handleSelectTag}>Submit selected tag</button>
      </div>
      <div>
        <label htmlFor="newTag">Don&apos;t see your tag? Create one!</label>
      </div>
      <input
        type="text"
        name="newTag"
        id="newTag"
        onChange={(e) => setCurrentTag(e.target.value)}
      />
      <div>
        <button onClick={handleSelectTag}>Add tag</button>
      </div>
    </div>
  );
}

export default TagInput;
