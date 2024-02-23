import React from 'react'

// @ts-ignore
export default function FormInput({ state, states, setStates }) {
    return (
        <div className="mb-3">
            <label className="form-label">{state.label}</label>
            <input type={state.type} className="form-control acm-input" id={state.id}
                value={state.value}
                onChange={(e) => {
                    const newStates = states.map((_temp: any) => {
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
                    const newStates = states.map((_temp: any) => {
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
    )
}
