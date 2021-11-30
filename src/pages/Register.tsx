import { type } from "os";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { authService, dbService } from '../services/firebase';
require('dotenv').config()


function Register (props: any) {
  type REGISTER = { email: string, password: string, name: string };
  const { history } = props;

  const [user, setUser] = useState<REGISTER>({
    email: '',
    password: '',
    name: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target; 
    setUser({
      ...user, 
      [name]: value 
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let name;
    let email;
    if (user.email === '' || user.password === '' || user.name === '') {
      return window.alert('빈틈없이 작성해주십시오.');
    }
    if (user.password.length < 6) {
      return window.alert('비밀번호는 최소 6자 이상 입니다.');
    }
    (await dbService.collection('users').get()).docs.forEach(item => {
      name = item.data().name;
      email = item.data().email;
    })
    if (name === user.name) {
      return window.alert('이미 이름이 있습니다.');
    }

    if (email === user.email) {
      return window.alert('이미 이메일이 있습니다.')
    }
    else {
      history.push('/');
      await authService.createUserWithEmailAndPassword(user.email, user.password);
      await dbService.collection('users').add({email: user.email, name: user.name});

      return window.alert('회원가입 성공');
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
    <div className="register">
      <form
        onSubmit={onSubmit}
      >
        <div>회원가입</div>
        <div className="input-container">
          <div className="input-name">이메일: </div>
          <input placeholder='Email' type='email' value={user.email} name='email' onChange={onChange}/>
        </div>
        <div className="input-container">
          <div className="input-name">비밀번호: </div>
          <input placeholder='Password' type='password' value={user.password} name='password' onChange={onChange}/>
        </div>
        <div className="input-container">
          <div className="input-name">이름: </div>
          <input placeholder='name' type='name' value={user.name} name='name' onChange={onChange}/>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', width: '20rem', justifyContent: 'space-between'}}>
          <button className="home-button width" type='submit'>회원가입</button>
          <Link className="input-link" to='/login'>이미 아이디가 있다면...</Link>
        </div>
      </form>
    </div>
  )
}

export default withRouter(Register);