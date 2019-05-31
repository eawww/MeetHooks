import React, {useState} from 'react';
import '../App.css';
import SecretComponent from './extras/MacLeod'
const Highlander = () => {
  const [howManyThereCanBe, setHowManyThereCanBe] = useState(1);
  return <>
    <p>
      ⚔️"THERE CAN BE ONLY {howManyThereCanBe}!"️️⚡️
    </p>
    <button 
      onClick={() => setHowManyThereCanBe(howManyThereCanBe + 1)}
    >
      Learn   To   Share!
    </button>
    <SecretComponent qty={howManyThereCanBe} />
  </>
}

export default Highlander