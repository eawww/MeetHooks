import React, {useState} from 'react';
import '../App.css';
const Highlander = () => {
  const [howManyThereCanBe, setHowManyThereCanBe] = useState(1);
  return <p>
    ⚔️"THERE CAN BE ONLY {howManyThereCanBe}!"️️⚡️
    <br />
    <button 
      onClick={() => setHowManyThereCanBe(howManyThereCanBe + 1)}
    >
      Learn   To   Share!
    </button>
  </p>
}

export default Highlander