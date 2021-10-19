import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllEmployees } from '../redux-thunk/thunk/Employee'
import { loaderStart, loaderStop } from '../redux-thunk/thunk/Loading'

export const useEmployeeSelector = (filter) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loaderStart())
        dispatch(fetchAllEmployees(filter))
        dispatch(loaderStop())
    }, [dispatch, filter])

    let allEmployees = useSelector(state => state.employeeReducer.employees)

    switch (filter) {
        case '':
            return allEmployees

        case filter:
            return allEmployees.filter(item => item.department === filter)
    
        default:
            return allEmployees
    }
}
