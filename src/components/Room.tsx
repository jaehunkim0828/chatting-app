import React, { useEffect, useState } from 'react';
import { dbService } from '../services/firebase';

interface ParamProps {
  user: string | null,
  sent: string,
}

type MESSEAGE = {
  user: string,
  sent: string,
  time: Date,
  text: string,
}

function Room({ user, sent }: ParamProps) {
  const [ms, setMs] = useState<any[]>([]);
  const [text, setText] =useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const time = new Date().getTime();
    const obj = { user, time, text, sent };
    setMs([...ms, obj]);
    dbService.collection('messages').add(obj);
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
      >
        {ms.map( data => (
          <div>
            <div>{data.user}</div>
            <div>{data.text}</div>
          </div>
        ))}
        <input onChange={onChange} value={text}/>
        <button type='submit'>전송</button>
      </form>
    </div>
  )
}

export default Room;