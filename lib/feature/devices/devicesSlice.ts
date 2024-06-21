import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchDevices = createAsyncThunk(
    "devices/fetch_all",
    async ()=>{
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/all`);

            return response.data;
        }
        catch(error:any){
            throw error;
        }
    }
)

export const fetchDeviceById = createAsyncThunk(
    "device/fetchById",
    async (id:number)=>{
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/device/${id}`)
            return response.data;
        }
        catch(error:any){
            throw error;
        }
    }
)

interface InitialState {
    loading: boolean;
    error: string | null;
    devices: Device[] | null;
    current_device : Device | null;
}

const initialState : InitialState = {
    loading:false,
    error:null,
    devices:[],
    current_device : null

}

export const devicesSlice = createSlice({
    name:'devices',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchDevices.pending,(state)=>{
                state.loading = true,
                state.error = null
            })
            .addCase(fetchDevices.fulfilled, (state, action)=>{
                state.loading = false,
                state.error = null,
                state.devices = action.payload

            })
            .addCase(fetchDeviceById.fulfilled,(state,action)=>{
                state.current_device = {
                    ...action.payload,
                    modules: action.payload.modules.slice().sort((a: { id: number; }, b: { id: number; }) => a.id - b.id)
                };
            })
    }
});


export default devicesSlice.reducer;