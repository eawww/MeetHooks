import React, {useState, useEffect} from 'react';
import usePrintOnce from './usePrintOnce'
import '../App.css';

const description = `*🙀Thousands of Screaming Cats*
This is to demonstrate grouping of enqueued state changes.
The initial render occurs with just the one screaming cat.\
the effect is fired after the browser paints and enqueues\
just a whole bunch of state updates. From the console output,\
you can see that the component only renders twice despite\
10,001 state updates.`

const ThousandsOfScreamingCats = () => {
  usePrintOnce(description);
  const [screamoji, setScreamoji] = useState('🙀')
  console.log('Render!', screamoji);
  useEffect(() => {
    for(let i = 0; i < 100000; i += 1) {
      setScreamoji(prev => '🙀' + prev)
    }
  }, [])
  return <p>{screamoji}</p>
}

export default ThousandsOfScreamingCats