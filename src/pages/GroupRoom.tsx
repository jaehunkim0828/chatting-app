import React, { useEffect, useState } from 'react';

import { dbService } from '../services/firebase';
import { useSelector } from "react-redux";
import { RootState } from '../store';
import SpeechBubble from '../components/SpeechBubble';
import '../css/Room.css';
import smallLogo from '../images/smallLogo.png';
import { Link, withRouter } from 'react-router-dom';
import rabbit from '../images/main-rabbit.png';
import back from '../images/back.png';


function GroupRoom(props: any) {
  const { history } = props;
  const me = localStorage.getItem('name');
  const [ms, setMs] = useState<any[]>([]);
  const [text, setText] =useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  }

  const crew = useSelector((state: RootState) => state.groupReducer.crew);
  const name = useSelector((state: RootState) => state.groupReducer.name);
  

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const time = new Date().getTime();
    
    const obj = { user: me, time, text, crew };
    setMs([...ms, obj]);
    dbService.collection('group').add(obj);
    setText('');
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.alert('로그인을 해주세요.');
      return history.push('/');
    }
    dbService.collection('group')
      .orderBy('time', 'desc')
      .onSnapshot(d => {
        const listMs: React.SetStateAction<any[]> = [];
        d.docs.forEach(doc => {
          const crewItem = doc.data().crew.sort();
          if (crew.toString() === crewItem.toString()) {
            listMs.push(doc.data());
          }
        })
        setMs(listMs);
      })
  },[])

  return (
    <div className='main'>
      <nav>
        <img src={smallLogo} alt='nav-logo'/>
        <Link className='sign-out'to='/'><button onClick={logout}>Sign Out</button></Link>
      </nav>
      <form
        onSubmit={onSubmit}
        className='room-main-container'
      >
        <div className='room-nav'>
          <img onClick={() => history.push('/main')} src={back} alt='back'  style={{ width: '2rem', height: '2rem', cursor: 'pointer'}}/>
          <div>
            <img src={rabbit} alt='rabbit' style={{ width: '3rem', height: '2rem'}} />
            <div>{name}</div>
          </div>
          <div></div>
        </div>
        <div className='room-main'>
          {ms.map( ({user, text}) => (
            <SpeechBubble user={user} text={text} me={user === localStorage.getItem('name') ? true : false}/>
          ))}
        </div>
        <div style={{display: 'flex'}}>
          <input className='input-text' onChange={onChange} value={text}/>
          <button className='button-text'type='submit'>보내기</button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(GroupRoom);