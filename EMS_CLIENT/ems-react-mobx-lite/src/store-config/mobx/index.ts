import { employeeListStore } from "./stores/employeeListStore"
import { loaderStore } from "./stores/loaderStore"
import { loginStore } from "./stores/loginStore"
import { toasterStore } from "./stores/toasterStore"

export const store = {
    login: loginStore,
    employees: employeeListStore,
    apiLoader: loaderStore,
    toaster: toasterStore
}

export const createAppStore = () => store