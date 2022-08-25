import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { Play } from "phosphor-react";
import { CountdowndContainer, FormContainer, HomeContainer, MinutesInput, Separator, StartCountdownButton, TaskInput } from "./styles";


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'O ciclo precisa ser de no máximo 60 minutos')
});

/* interface NewCycleFormData {
  task: string,
  minutesAmount: number,
} */

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  
  const { register, handleSubmit, watch, formState, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });
 
  function handleCreateNewCycle(data: NewCycleFormData) {
    //const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((prev) => [...prev , newCycle]);
    setActiveCycleId(newCycle.id);
    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  console.log(activeCycle)

  const task = watch('task');
  const isSubmitDisable = !task;

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" list="suggestions" id="task" placeholder="Dê um nome para seu projeto" {...register('task')}/>

          <datalist id="suggestions">
            <option value="Estudar React" />
            <option value="Estudar React Native" />
            <option value="Estudar C#" />
            <option value="Estudar Bando de dados" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} {...register('minutesAmount', {valueAsNumber: true})}/>
          <span>minutos.</span>
        </FormContainer>

        <CountdowndContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdowndContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisable}>
          <Play size={24}/> Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}