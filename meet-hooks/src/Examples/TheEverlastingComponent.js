import React, {useState, useRef, useEffect} from 'react';
import usePrintOnce from './usePrintOnce'
import '../App.css';

const description = `*🌌 TheEverlastingComponent*`

const TheEverlastingComponent = () => {
  usePrintOnce(description)
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