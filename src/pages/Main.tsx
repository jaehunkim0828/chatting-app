import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";

import { dbService } from '../services/firebase';

function Main(props: any) {
  const { history } = props;
  const [userList, setUserList] = useState<Array<string>>([]);

  const logout = () => {
    localStorage.removeItem('token');
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
    <div>
      <div>
        유저 목록: 
        <div>{userList.map(user => <button>{user}</button>)}</div>
      </div>
      <div><Link to='/'><button onClick={logout}>로그아웃</button></Link></div>
      <div></div>
    </div>
  )
}

export default withRouter(Main);