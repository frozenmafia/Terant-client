import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import DeviceComp from '../device/device';
import Link from 'next/link';

const Devices: React.FC = () => {
    const { devices } = useAppSelector(state => state.devices);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {devices?.map((device: Device) => (
                <Link key={device.id} href={`/device/${device.id}`} passHref>
                    <div className="bg-gray-100 rounded-lg shadow-lg p-4">
                        <DeviceComp device={device} showModules={false} />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Devices;
