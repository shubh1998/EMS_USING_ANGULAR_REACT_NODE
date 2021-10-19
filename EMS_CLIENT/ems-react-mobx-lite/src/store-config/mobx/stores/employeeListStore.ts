import { observable } from 'mobx'

interface employeeListStoreInterface {
    employeeList: any[]
    setEmployeeList: (value: any) => void
  }

export const employeeListStore = observable<employeeListStoreInterface>({
    employeeList: [],
    setEmployeeList(value) {
        this.employeeList = value
    },
})