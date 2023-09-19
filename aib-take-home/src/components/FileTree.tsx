import { useState } from "react";

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
  // const [activeDirectory, setDirectory] = useState<Directory>({});

  return (
    <>
      <div key={data.name}>
        <button>{data.name}</button>
      </div>
      {data.children.map(({ name, kind, size, modified, children }: Child) => {
        return (
          <div key={name}>
            <button>{name}</button>
            {children && <FileTree data={{ name, kind, children }} />}
          </div>
        );
      })}
    </>
  );
};

export default FileTree;
