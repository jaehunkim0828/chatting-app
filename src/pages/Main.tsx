import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { dbService } from '../services/firebase';
import '../css/Main.css';
import { userQuiz, sentQuiz } from '../action/roomAct';

function Main(props: any) {
  const dispatch = useDispatch();

  const { history } = props;
  const [userList, setUserList] = useState<Array<string>>([]);
  const [sentt, setSentt] = useState('');
  const [bool, setBool] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  const goRoom = async (sent: string) => {
    dispatch(sentQuiz(sent));
    dispatch(userQuiz(localStorage.getItem('name')));
    history.push('/room');
  }

  useEffect(() => {
    const getUserList = async() => {
      const list: string[] = [];
      const user = await dbService.collection('users').get();
      const name = localStorage.getItem('name');
      user.docs.forEach( item => {
        if (item.data().name !== name) {
          list.push(item.data().name)
        }
      });
      setUserList(list);
    }
    getUserList();
  }, [])

  return (
    <div className='main'>
      <nav>
        <div>Logo</div>
        <Link to='/'><button onClick={logout}>로그아웃</button></Link>
      </nav>
      <div>
        <div>유저 목록: </div> 
        <div>{userList.map(user => <button onClick={() => {goRoom(user)}}>{user}</button>)}</div>
      </div>
    </div>
  )
}

export default withRouter(Main);