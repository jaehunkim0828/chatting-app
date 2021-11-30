import React, { useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';

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
        <div className="logo">채팅 앱</div>
        <div className="button-container">
          <button className='home-button' onClick={() => history.push('/login')}>로그인</button>
          <button className='home-button' onClick={() => history.push('/register')}>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home);