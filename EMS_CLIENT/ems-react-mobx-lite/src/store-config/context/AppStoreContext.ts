import { createContext } from 'react'
import { store } from '../mobx'

import { AppStore } from '../types/AppStore'

export const AppStoreContext = createContext<AppStore>(store)
