import { useState } from "react";
import downArrowIcon from "../assets/angle-down-light.svg";
import rightArrowIcon from "../assets/angle-right-light.svg";

interface Directory {
  name: string;
  kind: string;
  children: Child[];
}

interface Child {
  name: string;
  kind: string;
  size?: string;
  modified?: string;
}

interface FileTreeProps {
  data: Directory;
}

const FileTree: React.FC<FileTreeProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div key={data.name}>
        <button onClick={toggleAccordion}>
          {isOpen ? (
            <img src={downArrowIcon} alt="down arrow" className="icon" />
          ) : (
            <img src={rightArrowIcon} alt="right arrow" className="icon" />
          )}
          {data.name}
        </button>
      </div>
      {data.children.map((child: Child) => {
        if (child.kind === "directory") {
          return (
            <div key={child.name}>
              <FileTree data={child as Directory} />
            </div>
          );
        } else {
          return (
            <div key={child.name}>
              <button>{child.name}</button>
            </div>
          );
        }
      })}
    </>
  );
};

export default FileTree;
