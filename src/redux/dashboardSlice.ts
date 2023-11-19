import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DashboardState {
  // value: number,
  openMenuDrawer: boolean,
}

const initialState: DashboardState = {
  //value: 0,
  openMenuDrawer: false,
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    /*
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    */
    handleMenuDrawer: (state) => {
      state.openMenuDrawer = !state.openMenuDrawer
    },
    closeMenuDrawer: (state) => {
      state.openMenuDrawer = false
    },
    openMenuDrawer: (state) => {
      state.openMenuDrawer = true
    }
  },
})

// Action creators are generated for each case reducer function
export const { /*increment, decrement, incrementByAmount,*/ handleMenuDrawer, closeMenuDrawer, openMenuDrawer } = dashboardSlice.actions

export default dashboardSlice.reducer