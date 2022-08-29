import React, { createContext, useReducer, useState } from "react";

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

interface CycleState {
    cycles: Cycle[],
    activeCycleId: string | null,
}

export const CyclesContext = createContext({} as CycleContextType);

export function CyclesContextProvider({children}: CyclesContextProviderProps) {
    
    const [cyclesState, dispatch] = useReducer((state: CycleState, action: any) => {
        
        switch (action.type) {
            case 'ADD_NEW_CYCLE':
                return {
                    ...state,
                    cycles: [...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id,
                }
            case 'INTERRUPED_CURRENT_CYCLE':
                return {
                    ...state,
                    cycle: state.cycles.map((cycle) => {
                        if (cycle.id === state.activeCycleId) {
                            return { ...cycle, interrupedDate: new Date() }
                        } else {
                            return cycle
                        }
                    }),
                    activeCycleId: null,
                }
            case 'MARK_CURRENT_CYCLE_AS_FINISHED':
                return {
                    ...state,
                    cycle: state.cycles.map((cycle) => {
                        if (cycle.id === state.activeCycleId) {
                            return { ...cycle, fisinhedDate: new Date() }
                        } else {
                            return cycle
                        }
                    }),
                    activeCycleId: null,
                }
            default:
                return state
        };

    }, {
        cycles: [],
        activeCycleId: null,
    });

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { cycles, activeCycleId } = cyclesState;

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    };

    function markCurrentCycleAsFinished() {
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId
            }
        })
        
        /* setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, fisinhedDate: new Date() }
                } else {
                    return cycle
                }
            }),
        ) */
    };

    function createNewCycle(data: CreateCycleData) {
        //const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        
        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle
            }
        })
        //setCycles((prev) => [...prev, newCycle]);
        setAmountSecondsPassed(0);
    };
    
    function interrupedCurrentCycle() {
        dispatch({
            type: 'INTERRUPED_CURRENT_CYCLE',
            payload: {
                activeCycleId
            }
        })
        
        /* setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interrupedDate: new Date() }
                } else {
                    return cycle
                }
            }),
        ) */
    };
    
    return(
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interrupedCurrentCycle, cycles }}>
            {children}
        </CyclesContext.Provider>
    )
}