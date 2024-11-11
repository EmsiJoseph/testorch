import { create } from 'zustand';
import { Worker } from '../interfaces/api-response.interfaces';

interface StoreState {
    workers: Worker[];
    progress: string;
    lastUpdated: number;
    addWorker: (worker: Worker) => void;
    updateWorker: (id: string, updatedWorker: Partial<Worker>) => void;
    setProgress: (progress: string) => void;
    clearAll: () => void;
}

const useSocketsStore = create<StoreState>()(
        (set) => ({
            workers: [],
            progress: '',
            lastUpdated: Date.now(),
            addWorker: (worker: Worker) => set((state) => ({
                workers: state.workers.some(w => w.type === worker.type) ? state.workers : [...state.workers, worker],
                lastUpdated: Date.now()
            })),
            updateWorker: (type: string, updatedWorker: Partial<Worker>) => set((state) => ({
                workers: state.workers.map((worker) =>
                    worker.type === type ? { ...worker, ...updatedWorker } : worker
                ),
                lastUpdated: Date.now()
            })),
            setProgress: (progress: string) => set({
                progress,
                lastUpdated: Date.now()
            }),
            clearAll: () => set({
                workers: [],
                progress: '',
                lastUpdated: Date.now()
            }),
        }
    )
);

export default useSocketsStore;