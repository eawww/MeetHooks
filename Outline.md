# Meet Hooks
*Hanging Up the Carcass of Class-Based React Components*

> February 6, 2019: React 16.8 is officially released and, with it, the promise of a cleaner and simpler tomorrow for React developers. React Hooks virtually eliminate the need for class-based components and allow for reusable state logic while still maintaining full backward compatibility. This talk will include an introduction to the new Hooks API, show how hooks are used and how they work, dive into some technical details with some common use cases as examples, and explore what's been established so far in terms of best practices.

> **Target Audience:** React developers interested in using react hooks, refining their understanding of the way hooks work, anyone interested in diving into React, or super hardcore React nerds interested in nitpicking a talk about react hooks.

> ⚠️This assumes a basic understanding of JavaScript/HTML fundamentals. Working knowledge of React is recommended but not required for the brave 👩🏽‍🚀.

## History/Rationale

The `class` model for writing React components is a long and storied tradition. For six years, classes have been the de facto solution for implementing stateful logic within components but they can quickly become large and confusing when related code has to be spread across multiple lifecycle methods, each with bits and pieces of unrelated logic within them. By themselves, classes have created a marvelous way for us to cook up big ol' bowls of spaghetti code, which sounds delicious... but it's not when you're the one who has to eat it. 🍝

There have been several solutions used to address the problems of classes:
- *Mixins* offered a handy way to group related logic together and reuse it between components by basically allowing you to define related logic in a function which is then all attached to the class, but...
  - They had a tendency to introduce interdependent code without making it obvious how or whether it was interdependent. Everything would get all stuck together like how old spaghetti becomes a solid, unscoopable, starchy brick.
  - Related mixins sometimes couldn't even be used together if they both implemented a method with the same name.
  - They made refactoring and building upon large components the stuff of nightmares.
  - They simply did not scale well at all. That's why their use has been actively discouraged for at least the last 3 years.
- *Render props* and *Higher Order Components* have also been handy tools but they quickly turn a component hierarchy into what is affectionately known as *wrapper hell* [❗️Stupid fire animation on the slides plz] called so because a component hierarchies should be an easily consumable view of how an app is organized, but patterns like these make them overwhelming, unpleasant, and nearly useless... a lot like a waiter bringing you the whole pot of spaghetti with the water still in it. Pasta analogies work. 🍜

The most recent and, in my opinion *best* attempt at creating cohesive, reusable statful logic in React is the new *Hooks API*. Hooks were initially proposed in an [RFC](https://github.com/reactjs/rfcs/pull/68) on October 25th, 2018 <!--Use absolute years like a decent human being, even in the talk--> and announced at React Conf 2018 the same day in [back-to-back talks](https://www.youtube.com/watch?v=dpw9EHDh2bM) by Sophie Alpert, Dan Abramov, and Ryan Florence. After months of enthusiastic feedback from developers, and hard work by contributors, exactly 3 months ago (prior to when this talk was given), Hooks became an official part of React on Feb 6, 2019 in React [16.8.0](https://github.com/facebook/react/releases/tag/v16.8.0).

Hooks are still new so little bugs, best practices, and support from some third party libraries are still being worked out. Despite this, since their release, Hooks have become incredibly popular and have lived up to the hype. There's already countless blog posts, instructional videos,and talks on the subject but *this* is the only one at Cerner DevCon KC 2019. Seriously, though, there's truckloads of really smart people out there giving away knowledge for free and the official React documentation is great as well. I'll be sure to make my sources available to everyone at the end.

Anyway, let's meet some hooks and find out what all the fuss is about...



Let's lay down some groundwork to make sure everyone's on the same page, and then go over some of the most useful hooks in detail.


## Basics of Functional Components

Since this talk is meant to be accessible to React beginners, I'd like to spend a few minutes talking about how functional components work in React. I won't be talking about class components because *where we're going, we don't need classes.*
I'll also only be using arrow functions because I need to get my money's worth on deez ligatures. Also I like them.

```jsx
const definedAsFunction = ({acceptsPropObject}) => {
  doStuff();
  return <ReturnsJSX />
}
```
A functional React component has three fundamental characteristics.
- It's defined as a function (that's why they call them *functional*)
- Accepts a `props` object as an argument
- Returns JSX which is a syntax extension to JavaScript but you can think of it conceptually as magic HTML that *lives* in JavaScript.

Furthermore, just like any function, a functional component can do stuff before it returns a value.

Functions that return JSX can be used as JSX elements in other components. This is some of that composability that everybody loves so much.
```jsx
const AnotherComponent = () => <span>I'm super neat</span>
const definedAsFunction = ({acceptsPropObject}) => {
  doStuff();
  return <ReturnsJSX>
    <AnotherComponent someProp={acceptsPropObject} />
  </ReturnsJSX>
}
```

> 👶️Important note for beginners: JSX is a templating language. Javascript expressions are used in JSX by enclosing them in `{ curly braces }`

When a component is rendered or re-rendered, its function is called along with the functions for all of its child components all the way down the tree. Any and all changes that the rerender causes will be reflected in React's Virtual DOM which React will then use to decide which changes should be flushed to the actual DOM to be painted by the browser.

> ❗️A diagram would be nice here.

Consider the following functional component:
```jsx
// LifeWithoutHooks.js
const LifeWithoutHooks = () => {
  console.log("Render")
  let numba = 0
  const makeNumbaGoUp = () => {
    numba += 1
    console.log(`Numba was incremented to ${numba}`)
  }
  return <button onClick={makeNumbaGoUp} >{numba}</button>
}
```
> This component logs "Render" when it's called, initializes a variable called `numba`, defines a function to increment `numba` and output its value, and returns a button that calls that function on click and displays the value of `numba`

What do you suppose will happen to the UI when the button is clicked?

**A.** The button text increments
**B.** It triggers a rerender and the button text increments
**C.** Nothing
**D.** Catastrophic failure of the app
**E.** Blockchain

<details>
  <summary>The answer may surprise you</summary>
    It's **C**! **C** is the answer.
    The `numba` value does indeed increment as can be seen in the browser console, but, since React calls it once for JSX to render and ignores it until the parent says it needs to rerender So makeNumbaGoUp is called and the variable is incremented, but that variable belongs only to that function call and, therefore, only to that render. When the component does rerender, the new render's numba value is initialized to 0.
</details>

## Meet Hooks!
I won't have time to cover all 10 distinct hooks that are currently part of React's API, but I'll try to cover the ones I feel are most valuable to get started with. For each one, I'll explain its purpose, how it works, and show you some common use cases. I've also found that, when working with hooks, it's incredibly valuable to know the order everything executes in relative to other hooks. Details of this are a little lacking in the standard documentation so I'll pay special attention to helping you leave with a conceptual understanding of how your hooks behave relative to the render cycle and eachother.

In the previous example we saw exactly why functional components can't have stateful values of their own. Now we'll see exactly how they *actually can* have stateful values of their own!

### `useState( )`

Easily the most important hook is the `useState` hook... which looks like this:

```jsx
// Highlander.js
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
  </>
}
```

This hook defines a stateful value and a function for setting that value, returned in a pair. Convention is to assign these via array destructuturing as seen so that so that the set function is the name of the value prefixed with the word `set`. Array destructuring is a common pattern for using hooks.

On the initial render, the stateful value is that of whatever is passed as an argument to `useState`. Calling the `set` function enqueues a rerender of the component replacing the stateful value with the new value. If it's the same value, the render will "bail out," meaning that it may re-render itself, but won't rerender deeper into the tree. 

❗️Reword this ya crazy
Since calling the `set` function triggers a rerender, this means the stateful value provided by `useState` is constant for each render. The props and state of any render belong to that render and do not change. If one of those changes, you can be sure it's another render.

A lot like `setState`, the `set` function returned from `useState` can accept a function to update state based on previous state:
```jsx
const GraduallyScreamierButton = () => {
  const [buttonText, setButtonText] = useState('AH!')
  const getScreamier = () => setButtonText(prev => `A${prev}`)
  return <button onClick={getScreamier} />
}
```

Also a lot like `setState` in class components, updates to `useState` values at around the same time will be batched together so that they're applied to the same rerender. 

As an example of how `useState`'s update batching works, consider the following bit of code:

```jsx
// GraduallyScreamierButton.js
const GraduallyScreamierButton = () => {
  const [buttonText, setButtonText] = useState('AH!')
  const getScreamier = () => {
    console.log('RENDER!')
    setButtonText(prev => `A${prev}`)
    setButtonText(prev => `E${prev}`)
  }
  return <button onClick={getScreamier}>{buttonText}</button>
}
```

We define a stateful value, `buttonText` with `useState` to keep track of a text string. We define a function that logs "RENDER!" to the console and then calls `setButtonText` twice in a row: The first time prepending an 'A' to `buttonText`, the second time prepending an 'E' to `buttonText`. The component returns a button element that calls our function on each click.

Since `setButtonText` enqueues a rerender each time it's called, and it's called twice in a row appending a different value to the beginning of the previous value, which of the following behaviors would you expect?

**A.** Button says **"AEAEAH!"** and logs "RENDER!" **twice per click**
**B.** Button says **"EAEAAH!"** and logs "RENDER!" **twice per click**
**C.** Button says **"EEEEAH!"** and logs "RENDER!" **twice per click**
**D.** Button says **"AAAAAH!"** and logs "RENDER!" **once per click**
**E.** Button says **"EAEAAH!"** and logs "RENDER!" **once per click**
**F.** Button says **"AEAEAH!"** and logs "RENDER!" **once per click**

> ❗️This would be a nice place for an audience survey if I can get that to work

<details>
  <summary>Answer here!</summary>
  If you guessed **C**, you are the furthest from the right answer... which is **E**. The resulting scream will start with E and render once per click.
</details>

Here's proof and why:

> ❗️Could switch to executing pre-written example

![Button with text 'EAEAAH!' browser console showing that 'RENDER!' has been logged twice](./images/Example04.png)
After two clicks, our button/console looks like this:

This is because the first `setButtonText` enqueues the rerender, but the rerender isn't instantaneous and JavaScript continues execution on this instance of the component. So when the second `setButtonText` enqueues a rerender to prepend an 'E' to our scream, it does so after the 'A' is prepended but on the same subsequent render.

#### Behavior
- Initial Render
  - Stateful values initialized to arguments. Are immediately defined.
  - Component function returns JSX built with initial state and props
  - Render is 🚽flushed and 🎨painted
  - `set` functions are ready to enqueue rerenders with new state
- Subsequent Render
  - Enqueued state changes are applied to stateful values in the order they were called.
  - Component function returns JSX built with initial state and props
  - Render is 🚽flushed and 🎨painted
  - `set` functions are ready to enqueue rerenders with new state
- Unmount
  - Nothing really special happens. It just kind of goes away.

### `useEffect( )`

`useEffect` doesn't return anything. Its purpose is to execute imperitive side-effects in functional components: stuff like data fetching, subscriptions, manual DOM mutation, logging, etc...

```jsx
const EffectUser = () => {
  useEffect(() => {
    console.log("I am a side-effect and I will befoul your beautiful functional code!")
  }, [])
  return <p>
    DON'T LOOK AT ME!! My purpose is unrelated to my return value.
    </p>
}
```

`useEffect` accepts two arguments: a function that does stuff, and an array of dependencies. If you don't give it a second argument, the effect fires on every render. If you do provide an array of variables as the second argument, the effect will only run if one of those dependencies has changed on some render. If you want it to only run on the initial render, pass an empty array.

The function called by `useEffect` can also return a cleanup function to be run before the effect runs again or when the component unmounts. 

```jsx
const AlienSpacecraft = () => {
  // 🛸
  const [humanData, setHumanData] = useState([])
  useEffect(() => {
    let abductee = tractorBeam.abductFrom('🌎', 'Some loony')
    lights.brightness = lightModes.BLINDING
    setHumanData(probulator.doScienceOn(abductee))
    return () => {
      lights.brightness = lightModes.AMBIENT_MOOD
      tractorBeam.returnTo('🌎', abductee)
    }
  })
  // ...
}
```

In the above example, the alien spacecraft will imperitively abduct some loony from earth *after* every render and do science on them. Importantly, because of the returned callback, the alien spacecraft will return the previous loony before abducting another one. This behavior is very important to ensuring you never have two of the same subscriptions or that you undo mutations to the DOM before repeating them.

I casually mentioned just now that the effect occurs *after* each render. By that, I mean that React only runs an effect after its render's changes are successful, are flushed to the DOM, and those changes are painted. Importantly, it is guaranteed to fire before any subsequent renders.
There is another hook, `useLayoutEffect` that is identical to `useEffect` but fires synchronously after DOM changes and prevents the browser from painting until it's complete. This is useful for side-effects that affect the UI to avoid messy rerenders.

It's strongly advised that your array of dependencies contains every variable from your component that is used by your effect (stateful values, props, etc.). This does not include variables defined inside your effect. 

### `useRef( )`

`useRef` provides a way to maintain a mutable value that persists for the lifetime of the component independent of the render cycle.

Like `useState`, `useRef` accepts its initial value as an argument. The important difference it, after that moment, it lives independently of the render cycle and maintains a mutable value in its `.current` property for the entire life of the component.

A very common use for `useRef` is to keep a reference to a DOM element around for imperative access. This is useful for, say, getting the value of an input field, but it's also a delightful escape hatch from React for when you want to make use of more imperative libraries.

As an example, let's take a look at the fun little bonus from our Highlander example. It works very simply. It defines a ref, and gives it to a div. Then uses `useEffect` to append a highlander to our div via the `ref` on each render. Simple, right?

```jsx
const MacLeod = ({qty}) => {
  const highlanderHolderRef = useRef()
  // This can probably actually move out and accept node as prop. Would make example more succinct
  const appendHighlander = () => {
    const newImg = document.createElement('img')
    newImg.setAttribute('class', 'MacLeod')
    newImg.setAttribute('src', ScowlingImmortal)
    newImg.setAttribute('style', `left: ${Math.random() * window.innerWidth}px;`)
    highlanderHolderRef.current &&
      highlanderHolderRef.current.appendChild(newImg);
  }
  useEffect(() => {
    appendHighlander()
  })
  return <div
    id="highlanderHolder"
    ref={highlanderHolderRef}
  />
}
```

But why do we have to append our highlander in a useEffect? <details>
  <summary>Well, because...</summary> ...on the initial render, our `highlanderHolderRef` is undefined. So when we try to call `appendChild( )` on it, it all comes crashing down.
</details>
<br><br>
```jsx
const TheEverlastingComponent = () => {
  const [meaninglessValue, setMeaninglessValue] = useState('💀')
  const renders = useRef(-1)
  renders.current += 1 // 0 on initial render
  return <>
    {renders.current > 0 ?
      (<p>👋 Hello World!</p>) :
      (<p>😐 I have lived and died {renders.current} times.</p>)
    }
    <button 
      onClick={() => setMeaninglessValue(Math.random())}
    >
      {meaninglessValue}
    </button>
  </>
}
```

Its most obvious use is to keep a reference to a DOM element, but it can be used to keep any value around, much in the same way that an instance variable would stick around. The value lives in the `current` property of the returned value.

### `useContext( )`

### `useMemo( )`

### `useCallback( )`

### `useReducer( )`

## The order things happen in

1. Initial Render
    1. React calls the function 
    1. `useState` Stateful values initialized to values passed as arguments.
    1. Component function returns JSX to React along with a list of effects that need to be fired.
    1. React updates the Virtual DOM, then 🚽 flushes necessary changes to the DOM.
    1. Effects from `useLayoutEffect` are fired and complete.
    1. 🎨 Browser Paints changes to the DOM
    1. Effects from `useEffect` are fired.
1. Subsequent Render (a stateful value is set with its `set` function or a change to props)
    1. React compares effect dependencies and determines which effects need to the rerun.
    1. React calls the function with updated props and state.
    1. Component function returns JSX to React along with a list of effects that need to be fired.
    1. React updates the Virtual DOM, then 🚽 flushes necessary changes to the DOM.
    1. Cleanup functions from `useLayoutEffect` that need to be rerun are fired synchronously.
    1. Effects from `useLayoutEffect` that need to be rerun are fired synchronously.
    1. 🎨 Browser Paints changes to the DOM
    1. Cleanup functions from `useEffect` that need to be rerun are fired synchronously.
    1. Effects from `useEffect` that need to be rerun are fired synchronously.
1. Unmount, once it is decided that the child must die. An interesting thing happens:
    1. React updates Virtual DOM
    1. All cleanup functions are called in the order that they're defined. 
        - (This is how it goes. I don't know if it's important that it does or if it's just an implementation coincidence)
    1. 🚽 Flushes necessary changes to the DOM.
    1. 🎨 Browser Paints changes to the DOM

![Browser performance graph of event sequnce of functional component unmounting](./images/Example06a.png)
> 🖼This graph shows the child component in Example06 unmounting after `onClick` event (leftmost pink). The four effect cleanup functions can be seen running in the middle followed by the respective node being removed from the DOM. The layout and paint operations are in purple and green on the rightmost side.

## Making Your Own Reusable Hooks

One of the coolest things about Hooks is their composability and reusability. You might frequently find yourself implementing patterns and combinations of hooks in various components. The good news is you don't have to keep rewriting those same patterns anymore! By enclosing related hooks into their own function and returning an array of any relevant values and functions, you've made yourself a hook! As you may have gathered by now, convention is that any hook's name begins with `use`. This is for readability and for enforcing linting rules related to hooks.

## Why?
- It's annoying/difficult/occasionally impossible to re-use stateful logic between components.
  - Complex components can be ludicrously to difficult understand just by reading the code.
    - Component lifecycle methods usually contain messes of unrelated code with actually related code in other lifecycle methods and it's hard to break them apart.
  - Classes are confusing and weird in JavaScript (for people and machines)
    - They work differently than in other languages, creating an additional barrier to entry.
    - They encourage pasta-like patterns.
    -  They're hard to minify. Instance methods will frequently be unminified and unused methods often end up in compiled code.
      - This was in Sophie Alpert's portion of the talk.
  - Reliance on HOCs can lead to "wrapper hell" which makes your component hierarchy tedious and unwieldy.

## Benefits
- Full backward compatibility
  - While Hooks are recommended for future develpoment in React, there are no plans to discontinue support for class-based components.
  - Once your probject is on React >=16.8.0, you can begin writing new components using Hooks and they'll get along just fine with your existing class-based components.
    - *Note: Hooks cannot be used in class based components so a rewrite of a single component can't be done gradually*

## Testing

## Rules and Best Practices

  - One big constraint of hooks is that they can only be defined in the top level of their function.
  - There's no urgent need to uplift existing code to use components, and, even if you *really* want to, you should spend some time writing new code with Hooks and make sure you and your team are comfortable with them before rewriting existing complicated components.
  - Even if two distinct effects with unrelated logic share the same dependency list, remember that one of the benefits of Hooks is their ability to organize stateful logic into cohesive modules.
    - For instance, if a component has multiple different effects that only need to fire when the component mounts and clean up when the component unmounts, don't just throw them all into one `useEffect` with an empty array as the second argument. Split those puppies up!

## Error Handling

## ❗️Don't forget to put the feedback slide in or DevCulture is going to actually send me back in time to the 80's

# Re:Sources

- [📄React documentation](https://reactjs.org/docs/hooks-reference.html)
- [📺 Sophie Alpert, Dan Abramov, and Ryan Florence - React Today and Tomorrow and 90% Cleaner React With Hooks (Video)](https://www.youtube.com/watch?v=dpw9EHDh2bM)
- [📝Dan Abramov - Mixins Considered Harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)
- [📄React Docs - Hooks Intro: Motivation](https://reactjs.org/docs/hooks-intro.html#motivation)
- [📝Dan Abramov - A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [📝Ryan Yurkanin - Why React Hooks, and how did we even get here?](https://www.freecodecamp.org/news/why-react-hooks-and-how-did-we-even-get-here-aa5ed5dc96af/)
- [📄 React documentation - Reconciliation](https://reactjs.org/docs/reconciliation.html)
