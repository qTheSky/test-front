import {Button} from "@mui/material"
import {useAppDispatch} from "../../../../app/store";
import {useModal} from "../../../../shared/hooks/useModal";
import {AddEmployeeModal} from "./AddEmployeeModal";
import {createNewEmployee} from "../../redux/employees.reducer";

export const AddEmployee = () => {
    const dispatch = useAppDispatch()
    const {isModalOpen, openModal, closeModal} = useModal()

    const handleSave = async (name: string, positionId: number, educationId: number) => {
        await dispatch(createNewEmployee({name, positionId, educationId}))
        closeModal()
    }

    return (
        <>
            <Button variant='contained'
                    fullWidth
                    color='success'
                    onClick={openModal}
            >
                Добавить сотрудника
            </Button>
            <AddEmployeeModal title="Добавить сотрудника"
                              handleSave={handleSave}
                              closeModal={closeModal}
                              open={isModalOpen}/>
        </>
    )
}