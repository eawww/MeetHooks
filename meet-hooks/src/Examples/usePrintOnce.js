import {useRef} from 'react';

/** Immediately prints to console as info whatever is passed*/
const usePrintOnce = (description) => {
  useRef(console.info(description))
}

export default usePrintOnce