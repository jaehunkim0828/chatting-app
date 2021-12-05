import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import Lists from '../components/List';
import { dbService } from '../services/firebase';
import '../css/Main.css';
import { userAct, sentAct } from '../action/roomAct';
import { usersAct } from "../action/usersAct";
import smallLogo from '../images/smallLogo.png';
import bear from '../images/main-bear.png';
import rabbit from '../images/main-rabbit.png';
import Group from "../components/Group";

function Main(props: any) {
  const dispatch = useDispatch();
  const name = localStorage.getItem('name');

  const { history } = props;
  const [userList, setUserList] = useState<Array<string>>([]);
  const [isGroup, setIsGroup] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  const goRoom = async (sent: string) => {
    dispatch(sentAct(sent));
    dispatch(userAct(localStorage.getItem('name')));
    history.push('/room');
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.alert('로그인을 해주세요.');
      return history.push('/');
    }
    const getUserList = async() => {
      const list: string[] = [];
      const user = await dbService.collection('users').get();
      const name = localStorage.getItem('name');
      user.docs.forEach( item => {
        if (item.data().name !== name) {
          list.push(item.data().name)
        }
      });
      dispatch(usersAct(list));
      setUserList(list);
    }
    getUserList();
  }, []);

  return (
    <div className='main'>
      <nav>
        <img src={smallLogo} alt='nav-logo'/>
        <Link className='sign-out'to='/'><button onClick={logout}>Sign Out</button></Link>
      </nav>
      <div className='main-list-container'>
        <div className='main-list-left'>
          <div>
            <div>안녕하세요 <span>{name}</span>님</div>
            <div>친구들과 대화를 시작해 보세요.</div>
          </div>
          <img src={bear} alt='bear' />
        </div>
        <div className='user-list-container'>
          <div className='user-list'>
            <div className="user-group">
              <button onClick={() => setIsGroup(false)} className="selete">유저 목록</button> 
              <div className="driver"></div>
              <button onClick={() => setIsGroup(true)} className="selete">그룹 채팅</button>
            </div>
            <div className='lists'>
              {/* userList, goRoom */}
              {isGroup ? <Group /> : <Lists userList={userList} goRoom={goRoom} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Main);