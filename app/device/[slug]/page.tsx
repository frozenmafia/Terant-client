"use client"
import DeviceComp from '@/app/components/device/device';
import { fetchDeviceById } from '@/lib/feature/devices/devicesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';

const DevicePage = ({ params: { slug } }: any) => {
  const dispatch = useAppDispatch();
  const currentDevice = useAppSelector(state =>state.devices.current_device);
  useEffect(()=>{
    dispatch(fetchDeviceById(slug));
  },[])

  return <>

    {
      currentDevice && <DeviceComp device={currentDevice} showModules={true}/>
    }
  </>
};

export default DevicePage;
