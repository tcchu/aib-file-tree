import { useState } from "react";
import downArrowIcon from "../assets/angle-down-light.svg";
import rightArrowIcon from "../assets/angle-right-light.svg";
import openFolder from "../assets/folder-open-solid.svg";
import closedFolder from "../assets/folder-solid.svg";
import file from "../assets/file-code-solid.svg";

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
  level: number;
}

const FileTree: React.FC<FileTreeProps> = ({ data, level }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        key={data.name}
        onClick={toggleAccordion}
        style={{
          cursor: "pointer",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          paddingLeft: `${level * 16}px`,
        }}
        className={`tree-item level-${level}`}
      >
        {isOpen ? (
          <span style={{ display: "flex", gap: "2px", alignItems: "center" }}>
            <img src={downArrowIcon} alt="down arrow" className="icon" />
            <img src={openFolder} alt="open folder" className="icon" />
          </span>
        ) : (
          <span>
            <img src={rightArrowIcon} alt="right arrow" className="icon" />
            <img src={closedFolder} alt="closed folder" className="icon" />
          </span>
        )}
        <span>{data.name}</span>
      </div>
      <div>
        {isOpen &&
          data.children.map((child: Child) => {
            if (child.kind === "directory") {
              return (
                <div key={child.name}>
                  <FileTree data={child as Directory} level={level + 1} />
                </div>
              );
            } else {
              return (
                <div
                  key={child.name}
                  className={`tree-item level-${level + 1}`}
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    paddingLeft: `${level * 16}px`,
                  }}
                >
                  <img src={file} alt="file" className="icon" />
                  {child.name}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default FileTree;
