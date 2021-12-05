import React from 'react';
import rabbit from '../images/main-rabbit.png';

type Listss = {
  userList: Array<any>,
  goRoom: any,
}

function Lists({userList, goRoom }: Listss) {
  return (
    <div className='lists'>
      {userList.map((user, i) => 
        <div className='list' key={`user${i}`}>
          <section>
            <img src={rabbit} alt='rabbit'/>
            <div>{user}</div>
          </section>
          <button onClick={() => {goRoom(user)}}>대화하기</button>
        </div>
      )}
    </div>
  )
}

export default Lists;