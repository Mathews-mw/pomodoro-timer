import React, { createContext, useState } from "react";

interface CreateCycleData {
    task: string,
    minutesAmount: number,
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupedDate?: Date,
    fisinhedDate?: Date,
};

interface CycleContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void,
    createNewCycle: (data: CreateCycleData) => void,
    interrupedCurrentCycle: () => void,
};

interface CyclesContextProviderProps {
    children: React.ReactNode,
};

export const CyclesContext = createContext({} as CycleContextType);

export function CyclesContextProvider({children}: CyclesContextProviderProps) {
    
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    };

    function markCurrentCycleAsFinished() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, fisinhedDate: new Date() }
                } else {
                    return cycle
                }
            }),
        )
    };

    function createNewCycle(data: CreateCycleData) {
        //const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((prev) => [...prev, newCycle]);
        setActiveCycleId(newCycle.id);
        setAmountSecondsPassed(0);
    };
    
    function interrupedCurrentCycle() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interrupedDate: new Date() }
                } else {
                    return cycle
                }
            }),
        )

        setActiveCycleId(null);
    };
    
    return(
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interrupedCurrentCycle, cycles }}>
            {children}
        </CyclesContext.Provider>
    )
}