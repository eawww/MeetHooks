import React, {useState, useEffect} from 'react';
import '../App.css';

const EffectUser = () => {
  console.log('Render!')
  const [garbageValue, setGarbageValue] = useState('🛢')
  const [importantValue, setImportantValue] = useState('🧐')
  
  useEffect(() => {
    console.log(`🚀Fire the side effect!`)
    return () => console.log('🧼Clean up the side effect!')
  }, [importantValue])

  return <>
    <div>
      <p>{importantValue}</p>
      <button onClick={() => setImportantValue(prev => prev + '🧐')}>More important!</button>
    </div>
    <div>
      <p>{garbageValue}</p>
      <button onClick={() => setGarbageValue(prev => prev + '🛢')}>More garbage!</button>
    </div>
  </>
}

export default EffectUser