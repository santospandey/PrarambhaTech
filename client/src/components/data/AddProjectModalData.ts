interface Status {
    id: string,
    display: string,
    value: string
}

const statusData: Status[] = [
    {
        id: '1',
        display: 'Not Started',
        value: 'Not Started'
    },
    {
        id: '2',
        display: 'In Progress',
        value: 'In Progress'
    },
    {
        id: '3',
        display: 'Completed',
        value: 'Completed'
    }];

const nameState = {
    id: 'name',
    label: 'Name',
    value: '',
    type: 'text',
    required: true,
    focused: false,
    errorMsg: 'Please enter name',
};

const descriptionState = {
    id: 'description',
    label: 'Description',
    value: '',
    type: 'textarea',
    required: false,
    focused: false,
    errorMsg: '',
};

const statusState = {
    id: 'status',
    label: 'Status',
    value: statusData[0].value,
    type: 'select',
    required: true,
    focused: false,
    errorMsg: 'Please select status'
};

const clientIdState = {
    id: 'clientid',
    label: 'Client Id',
    value: '',
    type: 'select',
    required: true,
    focused: false,
    errorMsg: 'Please select client'
};


export {statusData, nameState, descriptionState, statusState, clientIdState};