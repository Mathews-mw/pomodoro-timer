import { Play } from "phosphor-react";
import { CountdowndContainer, FormContainer, HomeContainer, MinutesInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
  return(
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" list="suggestions" id="task" placeholder="Dê um nome para seu projeto" required/>

          <datalist id="suggestions">
            <option value="Estudar React" />
            <option value="Estudar React Native" />
            <option value="Estudar C#" />
            <option value="Estudar Bando de dados" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesInput type="number" id="minutesAmount" placeholder="00" required step={5} min={5} max={60}/>
          <span>minutos.</span>
        </FormContainer>

        <CountdowndContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdowndContainer>

        <StartCountdownButton type="submit" disabled>
          <Play size={24}/> Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}