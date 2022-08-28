import { useContext } from "react";
import { format, formatDistanceToNow }from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  
  const { cycles } = useContext(CyclesContext);
  
  return(
    <HistoryContainer>
      <h1>Meu histórico</h1>
      
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              return(
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td><time title={format(cycle.startDate, "'Iniciado em' d 'de' LLL 'às' HH:mm'hrs'", {locale: ptBR})} dateTime={cycle.startDate.toISOString()}>{formatDistanceToNow(cycle.startDate, {addSuffix: true, locale: ptBR})}</time></td>
                  <td>
                    {cycle.fisinhedDate && (<Status statusColor="green">Concluído</Status>)}
                    {cycle.interrupedDate && (<Status statusColor="red">Interrompido</Status>)}
                    {(!cycle.interrupedDate && !cycle.fisinhedDate) && (<Status statusColor="yellow">Em andamento</Status>)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}