import Button from "../Button.jsx";
import FormControl from "../Form/FormControl.jsx";
import FormActionGroup from "../Form/FormActionGroup.jsx";
import FormAction from "../Form/FormAction.jsx";
import RequestForm from "../RequestForm.jsx";
import {useEffect, useState} from "react";
import ConfirmButton from "../ConfirmButton.jsx";
import axios from "axios";
import ProgressSpinner from "../ProgressSpinner.jsx";

export default function ManageEmployers({onUpdate}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        onUpdate(employers);
    }, [employers, onUpdate]);

    useEffect(() => {
        const controller = new AbortController();
        axios({
            url: `/employers`,
            method: "get",
            signal: controller.signal
        })
            .then(response => {
                setEmployers(response.data.entries);
            })
            .finally(() => {
                setIsLoading(false);
            });

        return () => {
            controller.abort();
        }
    }, []);

    const handleSelectEmployer = (employer) => {
        setSelectedEmployer(employer);
        setIsEditing(true);
    }

    const handleUpdate = (updatedEmployer) => {
        const updatedEmployers = employers.map(employer => (employer.id === updatedEmployer.id ? updatedEmployer : employer));
        setEmployers(updatedEmployers)
        setIsEditing(false);
    }

    const handleCreate = (newEmployer) => {
        setIsEditing(false);
        setEmployers(employers => [...employers, newEmployer]);
    }

    const handleDelete = (deletedEmployer) => {
        setIsEditing(false);
        setEmployers(employers => employers.filter(employer => employer.id !== deletedEmployer.id));
    }

    return (
        <div className={``}>
            {isLoading ? <div className={`p-8 flex justify-center`}>
                <ProgressSpinner />
                </div>
                : (!isEditing
                    ? <div>
                        <EmployersList onSelectEmployer={handleSelectEmployer}
                                       employers={employers}/>
                        <div className={`p-4 flex justify-center`}>
                            <Button label={`+ Create New`} onClick={() => {
                                setIsEditing(true);
                                setSelectedEmployer(null);
                            }}/>
                        </div>
                    </div>
                    : <EmployerForm employer={selectedEmployer} onUpdate={handleUpdate} onCreate={handleCreate} onDelete={handleDelete}
                                    onAbort={() => setIsEditing(false)}/>)}
        </div>
    );
}

function EmployersList({employers, onSelectEmployer}) {
    return (
        <ul className={`flex flex-col`}>
            {employers.map(employer => <li key={employer.id}
                                           className={`py-2 px-4 pr-2 flex items-center justify-between border-b border-b-black/10`}>
                {employer.name}
                <Button label={'Edit'} variant="alternate" onClick={() => onSelectEmployer(employer)}/>
            </li>)}
        </ul>
    );
}

function EmployerForm({employer, onCreate, onUpdate, onDelete, onAbort}) {
    const [deleteOptionVisible, setDeleteOptionVisible] = useState(employer !== null);
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const requestEndpoint = employer !== null ? `/employers/${employer.id}` : `/employers`;
    const requestMethod = employer !== null ? 'patch' : 'post';
    const btnSubmitLabel = employer !== null ? 'Save' : 'Create';

    const data = employer !== null ? employer : {
        name: '',
        initials: '',
        logo_url: '',
        foreground: '#ffffff',
        background: '#000000',
    }

    const handleCreateEmployerResponse = (response) => {
        if (requestMethod === 'post')
            onCreate(response.data.entry);
        else
            onUpdate(response.data.entry);
    }

    const deleteEmployer = () => {
        if (employer === null || employer.id === undefined) {
            console.error('employer not selected');
        }

        setIsFormDisabled(true);
        setDeleteOptionVisible(false);
        axios
            .delete(`/employers/${employer.id}`)
            .then(() => {
                onDelete(employer);
            })
            .catch((error) => {
                setDeleteOptionVisible(true);
                console.error(error.message);
            })
            .finally(() => {
                setIsFormDisabled(false);
            });
    }

    return (
        <div className={`p-4`}>
            <RequestForm wide action={requestEndpoint} method={requestMethod} disabled={isFormDisabled}
                         onResolve={handleCreateEmployerResponse}>
                <FormControl label="Employer Name" name="name" type="text" initialValue={data.name}
                             placeholder="ACME Corp" disabled={false}/>
                <FormControl label="Initials" name="initials" type="text" initialValue={data.initials}
                             placeholder="AC" disabled={false}/>
                <FormControl label="Logo URL" name="logo_url" type="text" initialValue={data.logo_url ?? ''}
                             placeholder="https://urltologo" disabled={false}/>
                <div className={`flex`}>
                    <FormControl label="Foreground" name="foreground" type="color"
                                 placeholder="#ffffff" disabled={false} initialValue={data.foreground}/>
                    <FormControl label="Background" name="background" type="color"
                                 placeholder="#000000" disabled={false} initialValue={data.background}/>
                </div>
                <FormActionGroup>
                    <div className={`mr-auto`}>
                        {deleteOptionVisible ? <ConfirmButton variant="danger" label="Delete" message="Sure?"
                                       onConfirm={deleteEmployer} disabled={isFormDisabled}/> : null}
                    </div>
                    <FormAction label={btnSubmitLabel}/>
                    <FormAction type="button" label="Cancel" variant="alternate"
                                onClick={() => onAbort()}/>
                </FormActionGroup>
            </RequestForm>
        </div>
    );
}
