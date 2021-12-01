import React, { useEffect, useState } from 'react';

import { dbService } from '../services/firebase';
import { useSelector } from "react-redux";
import { RootState } from '../store';
import SpeechBubble from '../components/SpeechBubble';
import '../css/Room.css';


function Room() {
  const [ms, setMs] = useState<any[]>([]);
  const [text, setText] =useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  }

  const user = useSelector((state: RootState) => state.roomReducer.user);
  const sent = useSelector((state: RootState) => state.roomReducer.sent);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const time = new Date().getTime();
    const obj = { user, time, text, sent };
    setMs([...ms, obj]);
    dbService.collection('messages').add(obj);
    setText('');
  }

  useEffect(() => {
    dbService.collection('messages')
      .orderBy('time', 'asc')
      .onSnapshot(d => {
        const listMs: React.SetStateAction<any[]> = [];
        d.docs.forEach(doc => {
          if (doc.data().user === user && doc.data().sent === sent) {
            console.log(doc.data());
            listMs.push(doc.data());
          }
          if (doc.data().user === sent && doc.data().sent === user) {
            console.log(doc.data());
            listMs.push(doc.data());
          } 
        })
        console.log(listMs);
        setMs(listMs);
      })
  },[])

  return (
    <div className='Room'>
      <div className='Room-container'>
        
      </div>
      <form
        onSubmit={onSubmit}
        className='room-main-container'
      >
        <div className='room-main'>
          {ms.map( ({user, text}) => (
            <SpeechBubble user={user} text={text} me={user === localStorage.getItem('name') ? true : false}/>
          ))}
        </div>
        <input onChange={onChange} value={text}/>
        <button type='submit'>전송</button>
      </form>
    </div>
  )
}

export default Room;