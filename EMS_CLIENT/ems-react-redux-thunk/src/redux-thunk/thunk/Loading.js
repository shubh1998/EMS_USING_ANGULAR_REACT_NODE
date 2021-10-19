import { createAction } from '@reduxjs/toolkit'

export const loaderStart = createAction("loader/start")

export const loaderStop = createAction("loader/stop")