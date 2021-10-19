import { useContext } from 'react'

import { AppStoreContext } from '../context/AppStoreContext'

export const useAppStoreContext = () => useContext(AppStoreContext)
