import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { authService, dbService } from "../services/firebase";

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
      <div className="login-container">
        <div className="login-logo">로그인</div>
        <form onSubmit={onSubmit}>
          <div className="login-input-container">
            <div className='input-name'>이메일: </div>
            <input  placeholder='Email' value={data.email} name='email' type='email' onChange={onChange} /> 
          </div>
          <div className="login-input-container">
            <div className='input-name'>비밀번호: </div>
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