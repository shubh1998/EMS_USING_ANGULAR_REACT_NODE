import { observable } from 'mobx'

interface loginStoreInterface {
    loggedIn: boolean
    setLoggedIn: (value: boolean) => void
  }

export const loginStore = observable<loginStoreInterface>({
    loggedIn: false,
    setLoggedIn(value) {
        this.loggedIn = value
    },
})