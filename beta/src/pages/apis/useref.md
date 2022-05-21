---
title: useRef
---

<Intro>

`useRef` is a React Hook that lets you reference a value that's not needed for rendering.
`useRef` ek React Hook hai jo aapko value reference karne deta hai jo rendering ke liye istemaal nahi hota.

```js
const ref = useRef(initialValue)
```

</Intro>

- [Usage](#usage)
  - [Referencing a value with a ref](#referencing-a-value-with-a-ref)
  - [Manipulating the DOM with a ref](#manipulating-the-dom-with-a-ref)
  - [Exposing a ref from your component](#exposing-a-ref-from-your-component)
  - [Avoiding recreating the ref contents](#avoiding-recreating-the-ref-contents)
- [Reference](#reference)
  - [`useRef(initialValue)`](#useref)
- [Troubleshooting](#troubleshooting)
  - [I can’t get a ref to a custom component](#i-cant-get-a-ref-to-a-custom-component)

---

## Usage {/*usage*/}

### Referencing a value with a ref {/*referencing-a-value-with-a-ref*/}
### ref ke saath value reference karna {/*referencing-a-value-with-a-ref*/}

Call `useRef` at the top level of your component to declare one or more [refs](/learn/referencing-values-with-refs).
ek ya ek se zyaada [ref](/learn/referencing-values-with-refs) declare karne ke liye `useRef` ko apne component ke sabse upar waale level pe bulaaye.

```js [[1, 4, "intervalRef"], [3, 4, "0"]]
import { useRef } from 'react';

function Stopwatch() {
  const intervalRef = useRef(0);
  // ...
```

`useRef` returns a <CodeStep step={1}>ref object</CodeStep> with a single <CodeStep step={2}>`current` property</CodeStep> initially set to the <CodeStep step={3}>initial value</CodeStep> you provided.
`useRef` single <CodeStep step={2}>`current` property</CodeStep> ke saath <CodeStep step={1}>ref object</CodeStep> ko return karta hai jisse initially aapke dwaara diya gaya <CodeStep step={3}>initial value</CodeStep> ke saath set hai.

On the next renders, `useRef` will return the same object. You can change its `current` property to store information and read it later. This might remind you of [state](/apis/usestate), but there is an important difference.
Agle render me, `useRef` vhi object return karega. Aap uska `current`property ko change kar sakte ho jisse aap information ko store kar baad me padh sakte ho. Ye aapko [state](/apis/usestate) ka yaad dila sakta hai lekin dono me ik mahtapoorn antar hai.

**Changing a ref does not trigger a re-render.** This means refs are perfect for storing information that doesn't affect the visual output of your component. For example, if you need to store an [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) and retrieve it later, you can put it in a ref. To update the value inside the ref, you need to manually change its <CodeStep step={2}>`current` property</CodeStep>:
**ref badalne se re-render trigger nahi hota.** iska arth hai ki visual output ko bina affect kiye information store karne ke liye ref perfect hai. Udhaaran me, agar aapko [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) ko store karna ho aur baad me retrieve karna ho to aap usse ref me rakh sakte hai. ref ke andar ke value ko update karne ke liye, aapko <CodeStep step={2}>`current` property</CodeStep> ko manually change karna hoga:

```js [[2, 5, "intervalRef.current"]]
function handleStartClick() {
  const intervalId = setInterval(() => {
    // ...
  }, 1000);
  intervalRef.current = intervalId;
}
```

Later, you can read that interval ID from the ref so that you can call [clear that interval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval):
Baad me aap vh interval ID ko ref se padh sakte ho taaki aap [vh interval clear](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) kar sakte hai:

```js [[2, 2, "intervalRef.current"]]
function handleStopClick() {
  const intervalId = intervalRef.current;
  clearInterval(intervalId);
}
```

By using a ref, you ensure that:
ref use karke aap ensure karte hai ki:

- You can **store information** between re-renders. (Unlike regular variables, which reset on every render.)
- Changing it **does not trigger a re-render**. (Unlike state variables, which trigger a re-render.)
- The **information is local** to each copy of your component. (Unlike the variables outside, which are shared.)

- Aap re-renders ke beech me **information store kar sakte ho**. (Yh regular variable jaise nahi hai jo har render me reset hote hai).
- badalne se **re-render trigger nahi hota**. (yh state variables jaisa nahi hai jo re-render trigger karte hai.)
- har component ke copy ka **information local hai**. (Yh bahar ke variables jaise nahi hai jo nature me shared hai.)

Changing a ref does not trigger a re-render, so refs are not appropriate for storing information that you want to display on the screen. Use state for that instead. Read more about [choosing between `useRef` and `useState`](/learn/referencing-values-with-refs#differences-between-refs-and-state).
ref ka re-render na trigger karne ke kaaran, ref screen pe display karne ke liye information ko store karne ke liye sahi nahi hai. uske liye, state ka prayog kijiye. [`useRef` aur `useState` ke beech chonne ](/learn/referencing-values-with-refs#differences-between-refs-and-state) ke baare me aur padhe.

<Recipes titleText="Examples of referencing a value with useRef / useRef ke saath value reference karne ka udhaaran" titleId="examples-value">

### Click counter {/*click-counter*/}

This component uses a ref to keep track of how many times the button was clicked. Note that it's okay to use a ref instead of state here because the click count is only read and written in an event handler.
yh component ref ka istemaal karta hai track karne ke liye ki kitne baar button dabaya gaya hai. Dhyaan rakhe ki yaha pe state ki jagah ref use karna thik hai kyunki ye sirf event handler dwaara padha aur likha jaa sakta hai.

<Sandpack>

```js
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```

</Sandpack>

If you show `{ref.current}` in the JSX, the number won't update on click. This is because setting `ref.current` does not trigger a re-render. Information that's used for rendering should be state instead.
Agar aap `{ref.current}` JSX me show kare to, vh number click hone pe update nahi hoga. Aisa isiliye hai kyunki `ref.current` set karne se re-render trigger nahi hota. Render karte samay use kiye jaane waala information ko state me store karna chahiye.

<Solution />

### A stopwatch {/*a-stopwatch*/}

This example uses a combination of state and refs. Both `startTime` and `now` are state variables because they are used for rendering. But we also need to hold an [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) so that we can stop the interval on button press. Since the interval ID is not used for rendering, it's appropriate to keep it in a ref, and manually update it.

yh udhaaran state aur ref ka combination istemaal karta hai. `startTime` aur `now` state variables hai kyunki dono rendering ke liye use hote hai. Lekin hume [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) ko bhi hold karna hoga taaki hum interval ko button press pe rokh sake. Kyunki interval ID render hote samay use nahi hota, usse ref me rakhna appropriate hai aur manually update karte hai.

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}
```

</Sandpack>

<Solution />

</Recipes>

<Gotcha>

**Do not write _or read_ `ref.current` during rendering.**
**render karte samay `ref.current` ko likh _ya padh_ na le.**

React expects that the body of your component [behaves like a pure function](/learn/keeping-components-pure):
React expect karta hai ki aapke component ka body [ek shudh function ke tarah behave kare](/learn/keeping-components-pure):

- If the inputs ([props](/learn/passing-props-to-a-component), [state](/learn/state-a-components-memory), and [context](/learn/passing-data-deeply-with-context)) are the same, it should return exactly the same JSX.
- Calling it in a different order or with different arguments should not affect the results of other calls.

- Agar inputs ([props](/learn/passing-props-to-a-component), [state](/learn/state-a-components-memory), aur [context](/learn/passing-data-deeply-with-context)) ek hi hai, to usse exactly same JSX return karna hoga.
- Alag order me ya alag arguments me bulaane se baaki caals ke results ko affect nahi karna chahiye.

Reading or writing a ref **during rendering** breaks these expectations.
**render karte samay** ref ko padhna ya likhna un expectations ko tod deta hai.

```js {3-4,6-7}
function MyComponent() {
  // ...
  // 🚩 Don't write a ref during rendering
  // 🚩 render karte samay ref ko na likhe.
  myRef.current = 123;
  // ...
  // 🚩 Don't read a ref during rendering
  // 🚩 render karte samay ref no n padhe
  return <h1>{myOtherRef.current}</h1>;
}
```

You can read or write refs **from event handlers or effects instead**.
Aap **event handlers se ya effects instead** se refs padh ya likh sakte hai.

```js {4-5,9-10}
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ You can read or write refs in effects
    myRef.current = 123;
  });
  // ...
  function handleClick() {
    // ✅ You can read or write refs in event handlers
    doSomething(myOtherRef.current);
  }
  // ...
}
```

If you *have to* read [or write](/apis/usestate#storing-information-from-previous-renders) something during rendering, [use state](/apis/usestate) instead.
Agar aapko render karte samay kuch padhna ya [likhna](/apis/usestate#storing-information-from-previous-renders) *hi hai* to aap [state](/apis/usestate) ka prayog kare.

When you break these rules, your component might still work, but most of the newer features we're adding to React will rely on these expectations. Read more about [keeping your components pure](/learn/keeping-components-pure#where-you-can-cause-side-effects).

</Gotcha>

---

### Manipulating the DOM with a ref {/*manipulating-the-dom-with-a-ref*/}
### ref ke saath DOM ko manipulate karna {/*manipulating-the-dom-with-a-ref*/}

It's particularly common to use a ref to manipulate the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API). React has bulit-in support for this.

ref ko [DOM](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API) manipulate karne ke liye prayog karna ek aam si baat hai. React me iske liye built-in support hai.

First, declare a <CodeStep step={1}>ref object</CodeStep> with an <CodeStep step={3}>initial value</CodeStep> of `null`:
Pehle, `null` <CodeStep step={3}>initial value</CodeStep> ke saath ek <CodeStep step={1}>ref object</CodeStep> declare kijiye:

```js [[1, 4, "inputRef"], [3, 4, "null"]]
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  // ...
```

Then pass your ref object as the `ref` attribute to the JSX of the DOM node you want to manipulate:
Phir apne ref object ko `ref` attribute ke roop me us DOM node ke JSX me bheje jisse aap manipulate karna chahte ho:

```js [[1, 2, "inputRef"]]
  // ...
  return <input ref={inputRef} />;
```

After React creates the DOM node and puts it on the screen, React will set the <CodeStep step={2}>`current` property</CodeStep> of your ref object to that DOM node. Now you can access the `<input>`'s DOM node and call methods like [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus):
DOM node banane ke aur screen pe rakhne ke baad, React DOM node ke ref object ka <CodeStep step={2}>`current` property</CodeStep> set karega. Ab aap `<input>` ka DOM node acces kar sakte hai aur [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) jaise methods bula sakte hai:

```js [[2, 2, "inputRef.current"]]
  function handleClick() {
    inputRef.current.focus();
  }
```

React will set the `current` property back to `null` when the node is removed from the screen.
Jab screen se node hataaya jaata hai, React `current` property ko phir `null` set kardega.

Read more about [manipulating the DOM with refs](/learn/manipulating-the-dom-with-refs).
[DOM ko ref ke saath manipulate](/learn/manipulating-the-dom-with-refs) karne ke baare me aur padhiye.

<Recipes titleText="Examples of manipulating the DOM with useRef / DOM ko useRef ke saath manipulate karne ke udhaaran" titleId="examples-dom">

### Focusing a text input {/*focusing-a-text-input*/}
### text input pe focus karna {/*focusing-a-text-input*/}

In this example, clicking the button will focus the input:
is udhaaran me button click karne se input focus hoga:

<Sandpack>

```js
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

</Sandpack>

<Solution />

### Scrolling an image into view {/*scrolling-an-image-into-view*/}
### image ko view me scrollkarna {/*scrolling-an-image-into-view*/}

In this example, clicking the button will scroll an image into view. It uses a ref to the list DOM node, and then calls DOM [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) API to find the image we want to scroll to.

is udhaaran me, button dabane se image view me scroll ho jayega. yh ref ko istemaal kar DOM node list karta hai aur phir DOM[`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) API ko bulaata hai jis image tak scroll karna hai us image ko doondhne ke liye.

<Sandpack>

```js
import { useRef } from 'react';

export default function CatFriends() {
  const listRef = useRef(null);

  function scrollToIndex(index) {
    const listNode = listRef.current;
    // This line assumes a particular DOM structure:
    const imgNode = listNode.querySelectorAll('li > img')[index];
    imgNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToIndex(0)}>
          Tom
        </button>
        <button onClick={() => scrollToIndex(1)}>
          Maru
        </button>
        <button onClick={() => scrollToIndex(2)}>
          Jellylorum
        </button>
      </nav>
      <div>
        <ul ref={listRef}>
          <li>
            <img
              src="https://placekitten.com/g/200/200"
              alt="Tom"
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/300/200"
              alt="Maru"
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/250/200"
              alt="Jellylorum"
            />
          </li>
        </ul>
      </div>
    </>
  );
}
```

```css
div {
  width: 100%;
  overflow: hidden;
}

nav {
  text-align: center;
}

button {
  margin: .25rem;
}

ul,
li {
  list-style: none;
  white-space: nowrap;
}

li {
  display: inline;
  padding: 0.5rem;
}
```

</Sandpack>

<Solution />

### Playing and pausing a video {/*playing-and-pausing-a-video*/}
### video ko pause aur play karna {/*playing-and-pausing-a-video*/}

This example uses a ref to call [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) and [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) on a `<video>` DOM node.

yh udhaaran ref ka istemaal karta hai `<video>` DOM node pr [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) aur [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) bulaane ke liye

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  return (
    <>
      <button onClick={handleClick}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <video
        width="250"
        ref={ref}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  )
}
```

```css
button { display: block; margin-bottom: 20px; }
```

</Sandpack>

<Solution />

### Exposing a ref to your own component {/*exposing-a-ref-to-your-own-component*/}
### Aapke component pr ref expose karna {/*exposing-a-ref-to-your-own-component*/}

Sometimes, you may want to let the parent component manipulate the DOM inside of your component. For example, maybe you're writing a `MyInput` component, but you want the parent to be able to focus the input (which the parent has no access to). You can use a combination of `useRef` to hold the input and [`forwardRef`](/apis/forwardref) to expose it to the parent component. Read a [detailed walkthrough](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes) here.

Kabhi kabhi, aapko parent component ko apne component ke andar manipulate karne dena chahte ho. Udhaaran me, aap shayd `MyInput` component likh rahe ho lekin aap chahte hai ki parent component input ko focus kar paaye (kjiska parent ka koi access nahi hai).

<Sandpack>

```js
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

</Sandpack>

<Solution />

</Recipes>

---

### Avoiding recreating the ref contents {/*avoiding-recreating-the-ref-contents*/}

React saves the initial ref value once and ignores it on the next renders.

```js
function Video() {
  const playerRef = useRef(new VideoPlayer());
  // ...
```

Although the result of `new VideoPlayer()` is only used for the initial render, you're still calling this function on every render. This can be wasteful if it's creating expensive objects.

To solve it, you may initialize the ref like this instead:

```js
function Video() {
  const playerRef = useRef(null);
  if (playerRef.current === null) {
    playerRef.current = new VideoPlayer();
  }
  // ...
```

Normally, writing or reading `ref.current` during render is not allowed. However, it's fine in this case because the result is always the same, and the condition only executes during initialization so it's fully predictable.

<DeepDive title="How to avoid null checks when initializing useRef later">

If you use a type checker and don't want to always check for `null`, you can try a pattern like this instead:

```js
function Video() {
  const playerRef = useRef(null);

  function getPlayer() {
    if (playerRef.current !== null) {
      return playerRef.current;
    }
    const player = new VideoPlayer();
    playerRef.current = player;
    return player;
  }

  // ...
```

Here, the `playerRef` itself is nullable. However, you should be able to convince your type checker that there is no case in which `getPlayer()` returns `null`. Then use `getPlayer()` in your event handlers.

</DeepDive>

---

## Reference {/*reference*/}

### `useRef(initialValue)` {/*useref*/}

Call `useRef` at the top level of your component to declare a [ref](/learn/referencing-values-with-refs).

```js
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
  // ...
```

See examples of [referencing values](#examples-value) and [DOM manipulation](#examples-dom).

#### Parameters {/*parameters*/}

* `initialValue`: The value you want the ref object's `current` property to be initially. It can be a value of any type. This argument is ignored after the initial render.

#### Returns {/*returns*/}

`useRef` returns an object with a single property:

* `current`: Initially, it's set to the `initialValue` you have passed. You can later set it to something else. If you pass the ref object to React as a `ref` attribute to a JSX node, React will set its `current` property.

On the next renders, `useRef` will return the same object.

#### Caveats {/*caveats*/}

* You can mutate the `ref.current` property. Unlike state, it is mutable. However, if it holds an object that is used for rendering (for example, a piece of your state), then you shouldn't mutate that object.
* When you change the `ref.current` property, React does not re-render your component. React is not aware of when you change it because a ref is a plain JavaScript object.
* Do not write _or read_ `ref.current` during rendering, except for [initialization](#avoiding-recreating-the-ref-contents). This makes your component's behavior unpredictable.
* In Strict Mode, React will **call your component function twice** in order to [help you find accidental impurities](#my-initializer-or-updater-function-runs-twice). This is development-only behavior and does not affect production. This means that each ref object will be created twice, and one of the versions will be discarded. If your component function is pure (as it should be), this should not affect the logic of your component.

---

## Troubleshooting {/*troubleshooting*/}

### I can't get a ref to a custom component {/*i-cant-get-a-ref-to-a-custom-component*/}

If you try to pass a `ref` to your own component like this:

```js
const inputRef = useRef(null);

return <MyInput ref={inputRef} />
```

You might get an error in the console:

<ConsoleBlock level="error">

Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

</ConsoleBlock>

By default, your own components don't expose refs to the DOM nodes inside them.

To fix this, find the component that you want to get a ref to:

```js
export default function MyInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
    />
  );
}
```

And then wrap it in [`forwardRef`](/apis/forwardref) like this:

```js {3,8}
import { forwardRef } from 'react';

const MyInput = forwardRef(({ value, onChange }, ref) => {
  return (
    <input
      value={value}
      onChange={onChange}
      ref={ref}
    />
  );
});

export default MyInput;
```

Then the parent component can get a ref to it.

Read more about [accessing another component's DOM nodes](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes).
