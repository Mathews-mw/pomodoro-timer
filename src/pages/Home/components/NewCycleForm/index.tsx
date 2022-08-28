import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesInput, TaskInput } from "./styles"
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function NewCycleForm() {
    
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext()
     
    return(
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput type="text" list="suggestions" id="task" placeholder="Dê um nome para seu projeto" {...register('task')} disabled={!!activeCycle} />

            <datalist id="suggestions">
                <option value="Estudar React" />
                <option value="Estudar React Native" />
                <option value="Estudar C#" />
                <option value="Estudar Bando de dados" />
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} {...register('minutesAmount', { valueAsNumber: true })} disabled={!!activeCycle} />
            <span>minutos.</span>
        </FormContainer>
    )
}
