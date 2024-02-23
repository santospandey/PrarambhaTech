import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from "../mutations/clientMutation"
import { GET_CLIENTS } from "../queries/clientQuery"
import "./Components.css"

const getInitialState = () => ([
    {
        label: 'Name',
        id: 'name',
        value: '',
        type: "text",
        required: true,
        focused: false,
        errorMsg: 'Please enter name',
    },
    {
        label: 'Email',
        id: 'email',
        value: '',
        type: "email",
        required: true,
        focused: false,
        errorMsg: 'Please enter valid email for eg john@mail.com',
    },
    {
        label: 'Phone',
        id: 'phone',
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit} noValidate>
                                {states.map(state => (
                                    <div className="mb-3" key={state.id}>
                                        <label className="form-label">{state.label}</label>
                                        <input type={state.type} className="form-control acm-input" id={state.id}
                                            value={state.value}
                                            onChange={(e) => {
                                                const newStates = states.map((_temp) => {
                                                    if (_temp.id == state.id) {
                                                        return { ..._temp, value: e.target.value }
                                                    }
                                                    return _temp;
                                                })
                                                setStates(newStates)
                                            }}
                                            required={state.required}
                                            autoFocus={state.focused}
                                            onBlur={() => {
                                                const newStates = states.map((_temp) => {
                                                    if (_temp.id == state.id) {
                                                        return { ..._temp, focused: true }
                                                    }
                                                    return _temp;
                                                })
                                                setStates(newStates)
                                            }}
                                            pattern={state.pattern}
                                        />
                                        <span className="text-danger form-input">{state.errorMsg}</span>
                                    </div>
                                ))}

                                <button type="submit" className="btn btn-secondary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
