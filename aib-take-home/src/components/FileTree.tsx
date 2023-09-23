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
  selectedDirectory: null | string;
  setSelectedDirectory: (name: null | string) => void;
  selectedFile: null | string;
  setSelectedFile: (name: null | string) => void;
}

const FileTree: React.FC<FileTreeProps> = ({
  data,
  level,
  selectedDirectory,
  setSelectedDirectory,
  selectedFile,
  setSelectedFile,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleSelection = () => {
    if (data.kind === "directory") {
      setSelectedDirectory(data.name);
      setSelectedFile(null);
    } else {
      setSelectedFile(data.name);
      setSelectedDirectory(null);
    }
  };

  const getItemIndentation = (level: number) => {
    const levelIndentation = level * 16;
    return levelIndentation;
  };

  return (
    <div>
      <div
        key={data.name}
        onClick={() => {
          toggleAccordion();
          toggleSelection();
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          paddingLeft: `${getItemIndentation(level)}px`,
          background:
            selectedDirectory === data.name ? "#3A3A3A" : "transparent",
        }}
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
                  <FileTree
                    data={child as Directory}
                    level={level + 1}
                    selectedDirectory={selectedDirectory}
                    setSelectedDirectory={setSelectedDirectory}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={child.name}
                  onClick={() => {
                    setSelectedFile(child.name);
                    setSelectedDirectory(null);
                  }}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    paddingLeft: `${getItemIndentation(level + 1)}px`,
                    background:
                      selectedFile === child.name ? "#3A3A3A" : "transparent",
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
