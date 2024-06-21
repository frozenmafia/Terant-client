// ModuleComp.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { fetchDevices } from '@/lib/feature/devices/devicesSlice';
import { useAppDispatch } from '@/lib/hooks';

interface Module {
    id: number;
    device_id: number;
    module_number: number;
    on: number; // 1 for on, 0 for off
    measurements: any; // Adjust as needed
}

interface ModuleCompProps {
    module: Module;
    handleClick: () => void;
    isSelected: boolean;
}

const ModuleComp: React.FC<ModuleCompProps> = ({ module, handleClick, isSelected }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const toggleModule = async () => {
        setLoading(true);
        try {
            await axios.put(`https://forgerrr.com/device/${module.device_id}/module/${module.id}/toggle-status`, {}, {
                headers: {
                    'accept': 'application/json'
                }
            });

            window.location.reload();

            // Optionally, you can handle the response or trigger a state update to reflect the new status

        } catch (error) {
            console.error('Failed to toggle module status:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`border rounded-md p-4 cursor-pointer ${isSelected ? 'bg-blue-200' : 'bg-white'} transition-colors duration-300`}
            onClick={handleClick}
        >
            <h1 className="text-lg font-bold mb-2">Module ID: {module.id}</h1>
            <p className="text-gray-500 mb-2">Module Number: {module.module_number}</p>
            <div className="flex items-center justify-between">
                <button
                    className={`px-4 py-2 rounded-md text-white ${module.on === 1 ? 'bg-red-500' : 'bg-green-500'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleModule();
                    }}
                    disabled={loading}
                >
                    {module.on === 1 ? 'Turn Off' : 'Turn On'}
                </button>
                <span className={`inline-block w-3 h-3 rounded-full ${module.on === 1 ? 'bg-green-500' : 'bg-red-500'}`} title={module.on === 1 ? 'Module is On' : 'Module is Off'}></span>
            </div>
        </div>
    );
}

export default ModuleComp;
