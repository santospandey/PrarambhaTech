import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from "../mutations/clientMutation"
import { GET_CLIENTS } from "../queries/clientQuery"
import "./Components.css"

export default function AddClientModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name: name, email: email, phone: phone },
        refetchQueries: [{ query: GET_CLIENTS }]
    })

    const resetFormError = () => {
        setNameError('');
        setEmailError('');
        setPhoneError('');
    }

    const validateName = () => {
        if(!name.trim()){
            setNameError("Name is required");
            return false;
        }
        return true;
    }

    const validateEmail = () => {
        if(!email.trim()){
            setEmailError("Email is required");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }
        return true;
    }

    const validatePhone = () => {
        if(!phone.trim()){
            setPhoneError("Phone is required");
            return false;
        }
    }

    const validateForm = () => {
        resetFormError();
        validateName();
        validateEmail();
        validatePhone();
    }

    const hasFormError = () => {
        if(nameError || emailError || phoneError){
            return true;
        }
        return false;
    }

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        resetFormError();
        validateForm();
        if(!hasFormError()){
            addClient({variables: {name, email, phone}});
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

            <div className="modal fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addClientModalLabel">Add Client</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{resetFormError(); resetForm()}}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    <span className="text-danger form-input">Enter name</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    <span className="text-danger form-input">Enter email</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                                    <span className="text-danger form-input">Enter phone</span>
                                </div>
                                <button type="submit" className="btn btn-secondary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
