import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';

import logo from '../images/logo.png';

function Home({ history }: any) {

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      history.push('/main');
    }
  },[])
  
  return (
    <div className="home">
      <div className="home-container">
        <div className='logo'>
          <img src={logo} alt='none'/>
          <div>빠르고 간편한 실시간 채팅 웹 </div>
        </div>
        <div className="button-container">
          <button className='home-button' onClick={() => history.push('/login')}>로그인</button>
          <button className='home-button' onClick={() => history.push('/register')}>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home);