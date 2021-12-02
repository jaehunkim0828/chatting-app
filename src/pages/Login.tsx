import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { authService, dbService } from "../services/firebase";
import navLogo from '../images/smallLogo.png';
import rightLogo from '../images/loginLogo.png';

function Login(props: any) {
  type LOGIN = { email: string, password: string, };
  const { history } = props;

  const [data, setDate] = useState<LOGIN>({ email: '', password: '',});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target; 
    setDate({
      ...data, 
      [name]: value 
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let name: string;
      const login: any = await authService.signInWithEmailAndPassword(data.email, data.password);
      const loginName = await dbService.collection('users').get();
      loginName.docs.forEach( user => {
        if (data.email === user.data().email) {
          name = user.data().name;
          localStorage.setItem('name', name);
        }
      })
      console.log(login.user.uid);
      const token = login.user.uid;

      localStorage.setItem('token', token);
      
      
      return history.push('/main');
    } catch(error) {
      window.alert('이메일과 비밀번호를 확인해주세요.');
      return;
    } 
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      history.push('/main');
    }
  },[])

  return (
    <div className="login">
      <div className="login-left">
        <img src={navLogo} alt='login-logo'/>
        <div className="login-left-content">
          <p>Sign In</p>
          <div>오늘도 친구와 Chat App 에서 채팅을 시작하세요</div>
          <div>쉽고 편리한 대화를 위한 실시간 채팅 소프트웨어</div>
        </div>
      </div>
      <div className="login-right">
        <img src={rightLogo} alt='right-logo' />
        <form onSubmit={onSubmit}>
          <div className="login-input-container">
            <div className='input-name'>이메일 </div>
            <input  placeholder='Email' value={data.email} name='email' type='email' onChange={onChange} /> 
          </div>
          <div className="login-input-container">
            <div className='input-name'>비밀번호 </div>
            <input placeholder='Password' value={data.password} name='password' type='password' onChange={onChange}/>
          </div>
          <button className="home-button width" type="submit">로그인</button> 
        </form>
        <Link to='/register'>아이디가 없다면...</Link>
      </div>
    </div>
  )
}

export default withRouter(Login);