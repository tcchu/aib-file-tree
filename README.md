<p align="center">
  <h1 align="center"><b>AiB Take Home: File Tree Component</b></h1>
</p>
  
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#installation--getting-started">Installation / Getting Started</a></li>
    <li><a href="#design-decisions">Design Decisions</a></li>
    <li><a href="#potential-improvements">Potential Improvements</a></li>
  </ol>
</details>

## <b>Overview</b>

<p align="left">
File Tree UI component that allows the user to browse a directory structure and interact with files and folders.
</p>

## <b>Installation / Getting Started</b>

Perform the following steps to install aib-take-home locally:

1. Clone this AiB Take Home repository onto your local machine.
2. Open aib-take-home repo in VS Code or your favorite IDE.
3. Navigate to src folder and run the following command in terminal:

```
npm run dev
```

## <b>Design Decisions </b>

### Engineering design decisions

1. Using recesurive calls for FileTree component

   Rationale: File trees typically are hierarchical and have nested levels. Using recursive calls for the FileTree component allows rendering of the file tree structure dynamically regardless of how deep the tree is, making the component reusable for other contexts.

2. Managing state for `selectedFile` and `selectedDirectory` using useState within App.tsx versus FileTree.tsx.

   Rationale: The 'FileTree' component is used recursively to render subdirectories and files within directories. Each instance of 'FileTree' component needs access to the same `selectedFile` and `selectedDirectory` state, to maintain consistent selection across entire tree. Managing state in higher-level component App.tsx, ensures all instances of 'FileTree' have access to the same state.

### UI design decisions

## <b>Potential Improvements</b>
