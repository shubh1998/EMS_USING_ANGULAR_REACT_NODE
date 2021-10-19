import { observable } from 'mobx'

export type toastertypes = 'success' | 'error'

interface toasterObjects {
  open: boolean
  message: string
  type: toastertypes
  setError: (errorMessage: string) => void
  setSuccess: (successMessage: string) => void
  setOpen: (value: boolean) => void
}

export const toasterStore = observable<toasterObjects>({
  open: false,
  message: '',
  type: 'success',
  setError(errorMessage: string) {
    this.open = true
    this.type = 'error'
    this.message = errorMessage
  },
  setSuccess(successMessage: string) {
    this.open = true
    this.type = 'success'
    this.message = successMessage
  },
  setOpen(value) {
    this.open = value
  },
})
