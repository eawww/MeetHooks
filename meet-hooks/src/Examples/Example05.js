import React, {useEffect} from 'react';
import '../App.css';

const EffectUser = () => {
  const returnValue = useEffect(() => {
    console.log("I am a side-effect and I will befoul your beautiful functional code!")
  })
  console.log(returnValue)
  return <p>
    {console.log('RENDER!')}
    DON'T LOOK AT ME!! My purpose is unrelated to my return value.
    </p>
}

export default EffectUser