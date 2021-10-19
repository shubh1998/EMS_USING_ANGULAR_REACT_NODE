import { createReducer } from '@reduxjs/toolkit'
import { loaderStart, loaderStop } from '../../thunk/Loading'


const initialState = {
    loading: false
}

export const loadingReducer = createReducer(initialState, builder=>{
    builder
    .addCase(loaderStart, (state)=>{
        state.loading = true
    })
    .addCase(loaderStop, (state)=>{
        state.loading = false
    })
})