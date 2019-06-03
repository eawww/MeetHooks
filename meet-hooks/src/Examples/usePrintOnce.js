import {useEffect} from 'react';

/** Immediately prints to console as info whatever is passed*/
const usePrintOnce = (description) => {
  useEffect(() => console.info(description), [])
}

export default usePrintOnce