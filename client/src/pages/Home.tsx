import Clients from '../components/Clients';
import AddClientModal from '../components/AddClientModal';
import { useState } from 'react';
import '../components/Components.css'

export default function Home() {
    const [searchName, setSearchName] = useState('');

    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <div className='col'></div>
                <div className='col'>
                    <input className='search-input' type='text' value={searchName} placeholder='Search by name' onChange={(e) => setSearchName(e.target.value)}></input>
                </div>
            </div>
            <Clients searchName={searchName}/>
        </>
    )
}
