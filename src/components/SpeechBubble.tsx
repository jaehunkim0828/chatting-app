import React from 'react';
import '../css/Bubble.css';

type BUBBLE = {
  user: string,
  text: string,
  me: boolean,
}

function SpeechBubble({user, text, me}: BUBBLE) {

  const bubbleStyle = {
    backgroundColor: user === localStorage.getItem('name') ? '#344CB7' : 'gray',
    borderRadius: user === localStorage.getItem('name') ?'10px 10px 2px 10px' : '10px 10px 10px 2px',
  }

  const container = {
    width: '100%',
    display: 'flex',
    justifyContent: user === localStorage.getItem('name') ? 'flex-end' : 'flex-start',
    padding: '0 0 1rem 0',
  }
  return (
    <div style={container}>
      <div style={bubbleStyle} className='bubble'>
        <div>{user}</div>
        <div>{text}</div>
      </div>
    </div>
  )
}

export default SpeechBubble;