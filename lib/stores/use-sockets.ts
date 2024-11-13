import { create } from 'zustand';
import { Worker } from '../interfaces/api-response.interfaces';

interface StoreState {
    workers: Worker[];
    buildStatus: string;
    buildProgress: {
        progress: string;
        remainingTime: string;
    };
    lastUpdated: number;
    addWorkers: (workers: Worker[]) => void;
    updateWorker: (id: string, updatedWorker: Partial<Worker>) => void;
    setBuildStatus: (status: string) => void;
    setBuildProgress: (progress: { progress: string; remainingTime: string }) => void;
    clearAll: () => void;
}

const useSocketsStore = create<StoreState>()(
    (set) => ({
        workers: [],
        buildStatus: '',
        buildProgress: {
            progress: '',
            remainingTime: ''
        },
        lastUpdated: Date.now(),
        addWorkers: (newWorkers: Worker[]) => set((state) => ({
            workers: [
                ...state.workers,
                ...newWorkers.filter(newWorker => !state.workers.some(worker => worker.type === newWorker.type))
            ],
            lastUpdated: Date.now()
        })),
        updateWorker: (type: string, updatedWorker: Partial<Worker>) => set((state) => ({
            workers: state.workers.map((worker) =>
                worker.type === type ? { ...worker, ...updatedWorker } : worker
            ),
            lastUpdated: Date.now()
        })),
        setBuildStatus: (status: string) => set({
            buildStatus: status,
            lastUpdated: Date.now()
        }),
        setBuildProgress: (progress: { progress: string; remainingTime: string }) => set({
            buildProgress: progress,
            lastUpdated: Date.now()
        }),
        clearAll: () => set({
            workers: [],
            buildStatus: '',
            buildProgress: {
                progress: '',
                remainingTime: ''
            },
            lastUpdated: Date.now()
        }),
    })
);

export default useSocketsStore;