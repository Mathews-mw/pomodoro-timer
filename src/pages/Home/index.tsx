import { useForm } from "react-hook-form"; 

import { Play } from "phosphor-react";
import { CountdowndContainer, FormContainer, HomeContainer, MinutesInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
  
  const { register, handleSubmit, watch } = useForm();
  
  function handleCreateNewCycle(data: any) {
    console.log(data);
  }

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