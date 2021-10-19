import { observable } from 'mobx'

type KeyType = 'submit' | 'page' | 'update'

export const loaderStore = observable({
  loading: {
    submit: false,
    update: false,
    page: false,
  },
  setLoadingOn(key: KeyType) {
    this.loading[key] = true
  },
  setLoadingOff(key: KeyType) {
    this.loading[key] = false
  },
})
