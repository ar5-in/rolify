import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {router, usePage} from "@inertiajs/react";

export const SavedJobsContext = createContext([]);
export const SavedJobDispatchContext = createContext(() => {});

export function useSavedJobs() {
    const savedJobs = useContext(SavedJobsContext);

    return {savedJobs: savedJobs};
}

export function useToggleSaveJob() {
    const {auth} = usePage().props;
    const dispatch = useContext(SavedJobDispatchContext);

    return {
        toggleSaveJob: (jobId) => {
            if(auth.user === null)
            {
                return router.get('/login');
            }

            dispatch({
                type: 'TOGGLE_SAVED_JOB',
                payload: jobId
            });
        }
    }
}

export function SavedJobsProvider({children}) {
    const {auth} = usePage().props;
    const [serverSavedJobs, setServerSavedJobs] = useState(auth.user ? auth.user.savedJobs : []);
    const [savedJobs, dispatch] = useReducer(
        savedJobsReducer,
        auth.user ? auth.user.savedJobs : []
    );

    useEffect(() => {
        setServerSavedJobs(auth.user ? auth.user.savedJobs : []);
    }, [auth.user?.savedJobs]);

    useEffect(() => {
        dispatch({
            type: 'UPDATE_SAVED_JOBS',
            payload: serverSavedJobs
        });
    }, [serverSavedJobs]);

    useEffect(() => {
        if(auth.user === null)
        {
            return;
        }

        const timeoutId = setTimeout(() => {
            syncSavedJobs(savedJobs);
        },1000);

        return () => clearTimeout(timeoutId);
    }, [savedJobs, auth.user]);

    return <SavedJobsContext.Provider value={savedJobs}>
        <SavedJobDispatchContext.Provider value={dispatch}>
            {children}
        </SavedJobDispatchContext.Provider>
    </SavedJobsContext.Provider>
}

function savedJobsReducer(savedJobs, action) {
    switch (action.type) {
        case 'TOGGLE_SAVED_JOB':
            return savedJobs.some(jobId=>jobId===action.payload)
                ? savedJobs.filter(jobId=>jobId!==action.payload)
                : [...savedJobs, action.payload];

        case 'UPDATE_SAVED_JOBS':
            return action.payload;

        default:
            return savedJobs;
    }
}

function syncSavedJobs(jobIds) {
    axios({
        url: '/jobs/saved/sync',
        method: 'post',
        data: {
            job_ids: jobIds
        }
    })
        .then(response => {
            console.log('saved jobs synced to server');
            //console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
}

const initialSavedJobs = [23,1];
