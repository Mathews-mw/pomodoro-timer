import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'O ciclo precisa ser de no máximo 60 minutos')
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  
  const { activeCycle, createNewCycle, interrupedCurrentCycle } = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }
  
  const task = watch('task');
  const isSubmitDisable = !task;

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interrupedCurrentCycle} >
            <HandPalm size={24}/> Interromper
          </StopCountDownButton> 
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisable}>
            <Play size={24} /> Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
