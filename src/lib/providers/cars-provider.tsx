import React, { useContext, useState } from 'react';

export interface Imagination {
    id: string;
    prompt: string;
    url?: string;
}

type ContextProps = {
    record: Imagination[];
    addEntry: (entry: Imagination) => void;
    updateEntry: (id: string, entry: Imagination) => void;
};

const Context = React.createContext<ContextProps>({
    record: [],
    addEntry: () => void 0,
    updateEntry: () => void 0,
});

export const CarsProvider = ({ children }: React.PropsWithChildren) => {
    const [record, setRecord] = useState<Imagination[]>([]);

    const addEntry = (imagination: Imagination) => {
        setRecord((prevRecord) => [imagination, ...prevRecord]);
    };

    const updateEntry = (id: string, update: Imagination) => {
        setRecord((prevRecord) => {
            return prevRecord.map((entry) => {
                if (entry.id === id) {
                    return update;
                }
                return entry;
            });
        });
    };

    return (
        <Context.Provider
            value={{
                record,
                addEntry,
                updateEntry,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useCarPovider = () => {
    const ctx = useContext(Context);
    if (!ctx) {
        throw new Error('Must be used within a CarsProvider');
    }
    return ctx;
};
