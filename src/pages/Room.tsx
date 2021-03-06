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
import plus from '../images/plus.png';
import GroupMmodal from '../components/GroupModal';


function Room(props: any) {
  const { history } = props;
  const [ms, setMs] = useState<any[]>([]);
  const [text, setText] =useState('');
  const [groupChat, setGroupChat] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  }

  const user = useSelector((state: RootState) => state.roomReducer.user);
  const sent = useSelector((state: RootState) => state.roomReducer.sent);

  const modal = () => {
    setGroupChat(true);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const time = new Date().getTime();
    const obj = { user, time, text, sent };
    setMs([...ms, obj]);
    dbService.collection('messages').add(obj);
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
    dbService.collection('messages')
      .orderBy('time', 'desc')
      .onSnapshot(d => {
        const listMs: React.SetStateAction<any[]> = [];
        d.docs.forEach(doc => {
          if (doc.data().user === user && doc.data().sent === sent) {
            listMs.push(doc.data());
          }
          if (doc.data().user === sent && doc.data().sent === user) {
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
            <div>{sent}</div>
          </div>
          <img onClick={modal} src={plus} alt='plus' style={{cursor: 'pointer'}}/>
          
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
      {groupChat && <GroupMmodal sent={sent} setGroupChat={setGroupChat}/>}
    </div>
  )
}

export default withRouter(Room);