import React, {useState} from 'react';
import usePrintOnce from './usePrintOnce'
import '../App.css';

const description = `*😱 GraduallyScreamierButton*`

const GraduallyScreamierButton = () => {
  usePrintOnce(description);
  const [screamoji, setScreamoji] = useState('😱')
  // if(screamoji === '😱') setScreamoji('🙀')
  // console.log(screamoji)
  const [buttonText, setButtonText] = useState('AH!' + screamoji)
  const getScreamier = () => {
    console.log('RENDER!')
    setButtonText(prev => `A${prev}`)
    setButtonText(prev => `E${prev}`)
  }
  // return <>{screamoji}<button onClick={getScreamier}>{buttonText}</button></>
  return <button onClick={getScreamier}>{buttonText}</button>
}

export default GraduallyScreamierButton