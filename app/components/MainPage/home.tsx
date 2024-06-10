"use client"

import { fetchDevices } from "@/lib/feature/devices/devicesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useActionState, useEffect } from "react";
import Devices from "../Devices/devices";


const MainPage = () =>{

    const dispatch = useAppDispatch();


    useEffect(()=>{
        dispatch(fetchDevices()).then(r=>console.log(r)).catch(err=>console.log(err))
    },[])
    
    return (
        <>
        <Devices/>
        </>
    )

}

export default MainPage;