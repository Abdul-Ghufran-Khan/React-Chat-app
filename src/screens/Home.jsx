import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { db } from '../database/firebase.cnfig';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const Navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [Myuid, setMyuid] = useState('')

    useEffect(() => {
        getusers()
    }, [])

    const getusers = async () => {
        let uid = await localStorage.getItem('userid')
        setMyuid(uid)
        const list = []
        const dbsnap = await getDocs(collection(db, "users"))
        dbsnap.forEach((item) => {
            list.push(item.data())
        })
        setUsers(list)
        console.log("🚀 ~ dbsnap.forEach ~ list:", list)
    }


    return (
        <div className='min-h-screen bg-stone-800'>
            <div className='bg-stone-900 w-full p-6 mb-16'>
                <h1 className='text-2xl font-bold text-orange-500'>Users List</h1>
            </div>

            {/* display users list */}

            {
                users.map((item) => (
                    <div key={item.uid} onClick={() => Navigate("/chat", {state: {...item , Myuid}})} className='cursor-pointer hover:bg-stone-950 w-11/12 border border-black shadow-stone-900 shadow-md rounded-lg mx-auto my-4 py-7 px-10 bg-stone-900  text-orange-400 flex justify-between'>
                        <div className='flex items-center'>
                           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0mpEAFXv-iIa50q5rA2L6nnHGy_akXDFyQQ&s" className='w-16 h-16 rounded-full border-2 mr-4 border-black'/>
                            <div>
                                <h1 className=' uppercase text-xl font-bold'>{item.name}</h1>
                                <p className='text-md text-orange-800'>{item.email}</p>
                            </div>
                        </div>
                        <button>Message</button>
                    </div>
                ))
            }
        </div>
    )
}