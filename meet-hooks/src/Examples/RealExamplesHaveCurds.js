import React, {useState, useRef, useEffect} from 'react';
import usePrintOnce from './usePrintOnce'
import '../App.css';

const description = `*🧀 RealExamplesHaveCurds*`

const RealExamplesHaveCurds = () => {
  usePrintOnce(description)
  const [food, setFood] = useState('🧀')
  console.log('Render Food: ', food)
  useEffect(() => {
    setTimeout(() => setFood(food), 5000)
  }, [] )
  return <> 
    <p>{food}</p>
    <button onClick={() => setFood('🥕')}>🥕</button>
  </>
}

export default RealExamplesHaveCurds