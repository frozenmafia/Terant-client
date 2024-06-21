import React, { useState } from 'react';
import ModuleComp from '../module/module';
import MeasurementChart from '../MeasurementChart/measurement'; // Import the MeasurementChart component

interface DeviceCompProps {
    device: Device;
    showModules: boolean;
}

const DeviceComp: React.FC<DeviceCompProps> = ({ device, showModules }) => {
    const [moduleId, setModuleId] = useState<number | null>(null); // State to store selected moduleId
    

    const handleModuleClick = (id: number) => {
        console.log(id);
        setModuleId(id); // Set selected moduleId when module is clicked
    };

    return (
        <div className="border border-gray-200 rounded-md p-4 mb-4">
            <h1 className="text-xl font-bold mb-2">Device ID: {device.id}</h1>
            <h3 className="text-lg mb-2">Number of Modules: {device.number_of_modules}</h3>
            {showModules && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {device.modules.map(module => (
                            // Add onClick event to select module
                            <ModuleComp 
                                module={module} 
                                key={module.id} 
                                handleClick={() => handleModuleClick(module.id)} 
                                isSelected={moduleId === module.id}
                            />
                        ))}
                    </div>
                    {/* Render MeasurementChart component with selected module's measurements */}
                    <div>
                        {moduleId !== null && (
                            <MeasurementChart measurements={device.modules.find(m => m.id === moduleId)?.measurements || []} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default DeviceComp;
