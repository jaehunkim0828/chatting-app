import React, { useEffect, useState } from 'react';

import { dbService } from '../services/firebase';
import no from '../images/no.png';
import '../css/modal.css';

type Group ={ setGroupChat: any,sent: string };

function GroupMmodal({setGroupChat, sent}: Group) {
  const [userList, setUserList] = useState<Array<string>>([]);

  const [checkedInputs, setCheckedInputs] = useState<Array<any>>([]);

  const changeHandler = (e: React.FormEvent<HTMLInputElement>, id: string) => {
    const checked = e.currentTarget.checked;

    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };

  const close = () => {
    setGroupChat(false);
  }

  const invite = async() => {
    const member: Array<any> = [];
    let cn;
    let cw;
    const me = localStorage.getItem('name');
    member.push(me);
    member.push(...checkedInputs, sent);
    const chatName = window.prompt('채팅방 이름을 적어주세요.');
    if (!chatName) {
      return;
    }
    const obj = { name: chatName, crew: member};
    const current = obj.crew.sort().toString();
    (await dbService.collection('groupName').get()).docs.forEach((item) => {  
      const data = item.data();
      cw = data.crew?.sort().toString();
      cn = data.name;

    });
    if (cn === obj.name && cw === current) {
      return window.alert('이미 방이 있습니다.');
    } else {
      await dbService.collection('groupName').add(obj);
    }
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
    const idx = list.indexOf(sent);
    list.splice(idx, 1);
    setUserList(list);
  }

  useEffect(() => {
    getUserList();
  }, [])

  return (
    <div className='modal'>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
        <img onClick={close}src={no} alt='close' style={{ width: '2rem', cursor: 'pointer'}} />
      </div>
      <div className='modal-lists'style={{ overflow: 'scroll',flex: '1'}}>
        {userList.map(name => <div className='modal-list' style={{display: 'flex'}}>
          <input id={name} type="checkbox" name={name} onChange={(e)=>{changeHandler(e, name)}}/>
          <div>{name}</div>
        </div>)}
      </div>
      <div className='modal-button'><button onClick={invite} style={{cursor: 'pointer'}}>초대하기</button></div>
    </div>
  )
}

export default GroupMmodal;

