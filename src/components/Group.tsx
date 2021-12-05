import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { dbService } from '../services/firebase';
import rabbit from '../images/main-rabbit.png';
import {groupAct, GROUPOBJECT} from '../action/groupAct';
import { withRouter } from 'react-router-dom';

function Group(props: any) {
  const { history } = props;
  const dispatch = useDispatch();
  const [gL, setGL] = useState<GROUPOBJECT[]>([]);

  const getGroup = async() => {
    const groupName = await dbService.collection('groupName').get();
    const groupList: GROUPOBJECT[] = [];
    groupName.docs.forEach(item => {
      const data = item.data();
      const me = localStorage.getItem('name');
      for (let i = 0; i < data.crew.length; i += 1) {
        if (data.crew[i] === me) {
          const group: GROUPOBJECT = {name: data.name, crew: data.crew};
          setGL([...groupList, group]);
          groupList.push(group);
        }
      }
    });
  }

  const goGRoom = (group: GROUPOBJECT) => {
    dispatch(groupAct(group));
    history.push('/group-room');
  }

  useEffect(() =>{
    getGroup()
  },[]);

  return (
    <div className='lists'>
      {gL.map((group, i) => 
        <div className='list' key={`user${i}`}>
          <section>
            <img src={rabbit} alt='rabbit'/>
            <div>{group.name}</div>
          </section>
          <button onClick={() => {goGRoom(group)}}>대화하기</button>
        </div>
      )}
    </div>
  )
};

export default withRouter(Group);