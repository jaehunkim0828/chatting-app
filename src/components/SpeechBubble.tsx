import React from 'react';
import '../css/Bubble.css';

type BUBBLE = {
  user: string,
  text: string,
  me: boolean,
}

function SpeechBubble({user, text, me}: BUBBLE) {

  const bubbleStyle = {
    backgroundColor: user === localStorage.getItem('name') ? '#B9D7EA' : '#ECEFEF',
    borderRadius: user === localStorage.getItem('name') ?'10px 10px 2px 10px' : '10px 10px 10px 2px',
    margin: '0.4rem 0 0 0',
  }

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: user === localStorage.getItem('name') ? 'flex-end' : 'flex-start',
      padding: '0 0 0.5rem 0',
    }}>
      <div>{user}</div>
      <div style={bubbleStyle} className='bubble'>
        <div>{text}</div>
      </div>
    </div>
  )
}

export default SpeechBubble;