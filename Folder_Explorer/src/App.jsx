import React, { useState } from 'react';
import FileTree from './components/FileTree';


const initialData = [
  {
    id: 1,
    name: "root",
    isFolder: true,
    children: [],
  },
];

const App = () => {
  const [data, setData] = useState(initialData);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isCreatingNode, setIsCreatingNode] = useState({ isFolder: null, parentId: null });
  const [newNodeName, setNewNodeName] = useState('');

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const handleCreateNode = (name, isFolder, parentId) => {
    const newNode = {
      id: Date.now(),
      name,
      isFolder,
      children: isFolder ? [] : null,
    };

    const addNode = (nodes) => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return { ...node, children: [...node.children, newNode] };
        } else if (node.children) {
          return { ...node, children: addNode(node.children) };
        }
        return node;
      });
    };

    if (parentId === null) {
      setData([...data, newNode]);
    } else {
      setData(addNode(data));
    }

    setIsCreatingNode({ isFolder: null, parentId: null });
  };

  const startCreatingNode = (isFolder) => {
    if (data.length === 0) {
      setIsCreatingNode({ isFolder, parentId: null });
    } else if (!selectedNode || (selectedNode && !selectedNode.isFolder)) {
      setIsCreatingNode({ isFolder, parentId: data[0].id }); // Root folder id
    } else {
      setIsCreatingNode({ isFolder, parentId: selectedNode.id });
    }
  };

  const handleDeleteNode = (nodeId) => {
    const deleteNode = (nodes) => {
      return nodes
        .filter(node => node.id !== nodeId)
        .map(node => ({
          ...node,
          children: node.children ? deleteNode(node.children) : []
        }));
    };

    setData(deleteNode(data));
  };

  const deleteSelectedNode = () => {
    if (selectedNode) {
      handleDeleteNode(selectedNode.id);
      setSelectedNode(null);
    } else {
      alert("Please select a node to delete.");
    }
  };

  const myfun=()=>{
    console.log('hello')
    const newnode={
      id:10,
      name:"main.js",
      isFolder:false,
      children:null
    }
    setData([...data,newnode]);

  }

  return (
    <div className="App">
      <h1>File Tree</h1>
      <button onClick={() => startCreatingNode(false)}>Add File</button>
      <button onClick={ myfun}>Add choice</button>
      <button onClick={() => startCreatingNode(true)}>Add Folder</button>
      <button onClick={deleteSelectedNode}>Delete Selected</button>
      <FileTree
        data={data}
        onNodeSelect={handleNodeSelect}
        onCreateNode={handleCreateNode}
        isCreatingNode={isCreatingNode}
        newNodeName={newNodeName}
        setNewNodeName={setNewNodeName}
      />
    </div>
  );
};

export default App;
