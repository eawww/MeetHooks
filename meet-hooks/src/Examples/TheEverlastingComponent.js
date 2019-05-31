import React, {useState, useRef, useEffect} from 'react';
import '../App.css';

const TheEverlastingComponent = () => {
  const [meaninglessValue, setMeaninglessValue] = useState('💀')
  const renders = useRef(-1)
  renders.current += 1
  useEffect(() => () => console.log('Thank you'), []);
  return <>
    {renders.current <= 0 ?
      (<p>👋 Hello World!</p>) :
      (<p>😐 I have lived and died {renders.current} times.</p>)
    }
    <button 
      onClick={() => setMeaninglessValue(Math.random() * 100)}
    >
      {meaninglessValue}
    </button>
  </>
}

export default TheEverlastingComponent