import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";

import { dbService } from '../services/firebase';
import Room from '../components/Room';
import '../css/Main.css';

function Main(props: any) {
  const { history } = props;
  const [userList, setUserList] = useState<Array<string>>([]);
  const [messeageList, setMessagesList] = useState<Array<any>>([]);
  const [sentt, setSentt] = useState('');
  const [bool, setBool] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  const goRoom = async (sent: string) => {
    setSentt(sent);
    setBool(true);
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
        <div>
          {bool ? <Room user={localStorage.getItem('name')} sent={sentt}/> : <div></div>}
        </div>
        <div>유저 목록: </div> 
        <div>{userList.map(user => <button onClick={() => {setBool(false); goRoom(user)}}>{user}</button>)}</div>
      </div>
    </div>
  )
}

export default withRouter(Main);