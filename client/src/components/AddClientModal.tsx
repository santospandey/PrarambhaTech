import React, {useRef} from "react"
import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from "../mutations/clientMutation"
import { GET_CLIENTS } from "../queries/clientQuery"
import FormInput from "./FormInput"
import "./Components.css"

const getInitialState = () => ([
    {
        id: 'name',
        label: 'Name',
        value: '',
        type: "text",
        required: true,
        focused: false,
        errorMsg: 'Please enter name',
    },
    {
        id: 'email',
        label: 'Email',
        value: '',
        type: "email",
        required: true,
        focused: false,
        errorMsg: 'Please enter valid email for eg john@mail.com',
    },
    {
        id: 'phone',
        label: 'Phone',
        value: '',
        type: "text",
        required: true,
        focused: false,
        errorMsg: 'Please enter 10 digit phone number',
        pattern: "^[0-9]{10}$"
    }
]);

export default function AddClientModal() {
    const [states, setStates] = useState(getInitialState());
    const formRef = useRef(null);

    const resetForm = () => {
        setStates(getInitialState());
    }

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name: states[0].value, email: states[1].value, phone: states[2].value },
        refetchQueries: [{ query: GET_CLIENTS }]
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;
        if (target.checkValidity()) {
            addClient();
            resetForm();
        }
    };

    return (
        <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
                <div className="d-flex align-items-center">
                    <FaUser className="icon" />
                    <div>Add Client</div>
                </div>
            </button>

            <div className="modal fade" id="addClientModal" data-bs-backdrop="static" data-keyboard="false" aria-labelledby="addClientModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addClientModalLabel">Add Client</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => resetForm()}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                {states.map((state, index, arr) => (
                                    <FormInput state={state} states={arr} setStates={setStates} key={state.id} />
                                ))}
                                <button type="submit" className="btn btn-secondary submit-btn">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
