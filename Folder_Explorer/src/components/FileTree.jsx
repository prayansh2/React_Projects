import React, { useState } from 'react';
import './FileTree.css';

const FileTree = ({ data, onNodeSelect, onCreateNode, isCreatingNode, newNodeName, setNewNodeName }) => {
  const [expandedFolders, setExpandedFolders] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleFolderClick = (id) => {
    setExpandedFolders((prev) =>
      prev.includes(id) ? prev.filter(folderId => folderId !== id) : [...prev, id]
    );
  };

  const handleNodeSelect = (node, event) => {
    event.stopPropagation();
    setSelectedNode(node.id);
    onNodeSelect(node);
  };

  const handleCreateNode = (event) => {
    if (event.key === 'Enter' && newNodeName.trim()) {
      onCreateNode(newNodeName, isCreatingNode.isFolder, isCreatingNode.parentId);
      setNewNodeName('');
    }
  };

  const getFileIcon = (name) => {
    if (name.endsWith('.js')) {
      return '📜'; // JavaScript file
    } else if (name.toLowerCase().includes('docker')) {
      return '🐳'; // Docker file
    } else {
      return '📄'; // Default file icon
    }
  };

  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => (
      <div
        key={node.id}
        className={`file-tree-node ${selectedNode === node.id ? 'selected' : ''}`}
        onClick={(event) => handleNodeSelect(node, event)}
        style={{ paddingLeft: `${level * 20}px` }}
      >
        {node.isFolder ? (
          <div>
            <span onClick={() => handleFolderClick(node.id)}>
              {expandedFolders.includes(node.id) ? '📂' : '📁'} {node.name}
            </span>
            {expandedFolders.includes(node.id) && node.children && renderTree(node.children, level + 1)}
            {isCreatingNode.parentId === node.id && (
              <input
                type="text"
                value={newNodeName}
                onChange={(e) => setNewNodeName(e.target.value)}
                onKeyPress={handleCreateNode}
                autoFocus
                placeholder={`Enter ${isCreatingNode.isFolder ? 'folder' : 'file'} name`}
                style={{ marginLeft: `${(level + 1) * 20}px` }}
              />
            )}
          </div>
        ) : (
          <div>{getFileIcon(node.name)} {node.name}</div>
        )}
      </div>
    ));
  };

  return (
    <div>
      {data.length === 0 && isCreatingNode.isFolder !== null && (
        <input
          type="text"
          value={newNodeName}
          onChange={(e) => setNewNodeName(e.target.value)}
          onKeyPress={handleCreateNode}
          autoFocus
          placeholder={`Enter ${isCreatingNode.isFolder ? 'root folder' : 'file'} name`}
        />
      )}
      {data.length > 0 && renderTree(data)}
    </div>
  );
};

export default FileTree;
