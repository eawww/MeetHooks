import React, {useState} from 'react';
import usePrintOnce from './usePrintOnce'
import '../App.css';

const description = `*😱 GraduallyScreamierButton*`

const GraduallyScreamierButton = () => {
  console.log('RENDER!')
  usePrintOnce(description);
  const [buttonText, setButtonText] = useState('AH!')
  const getScreamier = () => {
    setButtonText(prev => `A${prev}`)
    setButtonText(prev => `E${prev}`)
  }
  return <button onClick={getScreamier}>{buttonText}</button>
}

export default GraduallyScreamierButton