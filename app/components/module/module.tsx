// ModuleComp.tsx
import React from 'react';

interface ModuleCompProps {
    module: Module;
    handleClick :()=>void;
    isSelected:boolean;
}

const ModuleComp: React.FC<ModuleCompProps> = ({ module, handleClick , isSelected}) => {
    return (
        <div className={`border rounded-md p-2 cursor-pointer ${isSelected ? 'bg-blue-200' : ''}`}  onClick={handleClick}>
            <h1 className="text-lg font-bold mb-1">Module ID: {module.id}</h1>
            <p className="text-gray-500">Module Number: {module.module_number}</p>
        </div>
    );
}

export default ModuleComp;
