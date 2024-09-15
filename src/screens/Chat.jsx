import { useEffect, useState } from "react";
import moment from "moment";
import { db } from '../database/firebase.cnfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection, query, where, onSnapshot } from "firebase/firestore";

export default function Chat() {
    const Navigate = useNavigate()
    const { state } = useLocation()
    const [message, setMessage] = useState([])
    const [Chatlist, setchatlist] = useState([])


    useEffect(() => {
        const q = query(collection(db, "chat"), where(state.uid, "==", true), where(state.Myuid, "==", true));
        const unsubscribe = onSnapshot(q, (docSnap) => {
            const list = [];
            docSnap.forEach((doc) => {
                list.push(doc.data());
            });
            const sortlist = list.sort((a, b) => a.createdAt - b.createdAt)
            setchatlist(sortlist);
        });
        return () => unsubscribe();
    }, [])

    const sendMsg = async () => {
        addDoc(collection(db, "chat"), {
            message,
            [state.Myuid]: true,
            [state.uid]: true,
            senderuid: state.Myuid,
            createdAt: Date.now()
        })
        setMessage('')
    }


    return (
        <div className='min-h-screen bg-stone-800'>
            <div className='bg-stone-900 w-full p-4 flex items-center'>
                <img src="https://png.pngtree.com/png-vector/20231115/ourmid/pngtree-back-icon-navigation-png-image_10603473.png" className='w-12 h-12 rounded-full border-2 mr-4 border-stone-800 cursor-pointer' onClick={() => Navigate('/home')} />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0mpEAFXv-iIa50q5rA2L6nnHGy_akXDFyQQ&s" className='w-12 h-12 rounded-full border-2 mr-4 border-black' />
                <h1 className='text-3xl font-bold text-orange-500'>{state.name}</h1>
            </div>

            <div className='bg-stone-950 h-[80vh]'>
                {Chatlist.map((item, index) => (
                    <div key={index} className={`w-full flex px-10 ${item.senderuid == state.Myuid ? "justify-end" : "justify-start"}`}>
                        <div className='border-black rounded-lg mt-2 py-4 px-10 bg-stone-900  text-orange-400 '>
                        <h1 className='text-lg font-semibold'>{item.message}</h1>
                        <h1 className='text-sm text-orange-300'>{moment(item.createdAt).startOf('seconds').fromNow()}</h1>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex items-center justify-center pt-1 gap-2'>
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message' className='text-white w-10/12 h-10 bg-stone-900 rounded-lg px-6 py-2 text-xl outline-none' />
                <button onClick={sendMsg} className='text-orange-600 text-xl w-20 rounded-md h-10 bg-stone-950'>Send</button>
            </div>
        </div>
    )
}