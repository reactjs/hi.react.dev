---
title: useRef
---

<Intro>

`useRef` एक रीऐक्ट हुक है जो आपको वैल्यू reference करने देता है जो रेंडरिंग के लिए इस्तेमाल नही होता.

```js
const ref = useRef(initialValue)
```

</Intro>

- [प्रयोग](#usage)
  - [Referencing a value with a ref](#referencing-a-value-with-a-ref)
  - [Manipulating the DOM with a ref](#manipulating-the-dom-with-a-ref)
  - [Exposing a ref from your component](#exposing-a-ref-from-your-component)
  - [Avoiding recreating the ref contents](#avoiding-recreating-the-ref-contents)
- [Reference](#reference)
  - [`useRef(initialValue)`](#useref)
- [Troubleshooting](#troubleshooting)
  - [I can’t get a ref to a custom component](#i-cant-get-a-ref-to-a-custom-component)

---

## प्रयोग {/*usage*/}

### Referencing a value with a ref {/*referencing-a-value-with-a-ref*/}
### ref के साथ वैल्यू reference करना {/*referencing-a-value-with-a-ref*/}

Call `useRef` at the top level of your component to declare one or more [refs](/learn/referencing-values-with-refs).
एक या एक से ज़्यादा [ref](/learn/referencing-values-with-refs) डिक्लेर करने के लिए `useRef` को अपने कौम्पोनॅन्ट के सबसे उपर वाले स्तर पर बुलाए.

```js [[1, 4, "intervalRef"], [3, 4, "0"]]
import { useRef } from 'react';

function Stopwatch() {
  const intervalRef = useRef(0);
  // ...
```

`useRef` returns a <CodeStep step={1}>ref object</CodeStep> with a single <CodeStep step={2}>`current` property</CodeStep> initially set to the <CodeStep step={3}>initial value</CodeStep> you provided.
`useRef` single <CodeStep step={2}>`current` property</CodeStep> के सात <CodeStep step={1}>ref object</CodeStep> को return करता है जिससे initially आपके द्वारा दिया गया <CodeStep step={3}>initial वैल्यू</CodeStep> के सात set है.

On the next renders, `useRef` will return the same object. You can change its `current` property to store information and read it later. This might remind you of [state](/apis/usestate), but there is an important difference.
अगले रेंडर में, `useRef`वही ऑब्जेक्ट वापस करेगा. आप उसका `current`property को बदल सकते हो जिससे आप जानकारी को स्टोर कर बाद में पढ़ सकते हो. यह आपको [state](/apis/usestate) का याद दिला सकता है लेकिन दोनो में एक महत्वपूर्ण अंतर है.

**Changing a ref does not trigger a री-render.** This means refs are perfect for storing information that doesn't affect the visual output of your component. For example, if you need to store an [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) and retrieve it later, you can put it in a ref. To update the value inside the ref, you need to manually change its <CodeStep step={2}>`current` property</CodeStep>:
**ref बदलने से री-रेंडर trigger नही होता.** इसका अर्थ है कि visual output को बिना प्रभावित किये जानकारी स्टोर करने के लिए ref perfect है. उदाहरण में, अगर आपको [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) को store करना हो और बाद में retrieve करना हो to आप उसे ref me रख सकते है. ref के अंदर के वैल्यू को अप्डेट करने के लिए, आपको <CodeStep step={2}>`current` property</CodeStep> को manually change करना होगा:

```js [[2, 5, "intervalRef.current"]]
function handleStartClick() {
  const intervalId = setInterval(() => {
    // ...
  }, 1000);
  intervalRef.current = intervalId;
}
```

Later, you can read that interval ID from the ref so that you can call [clear that interval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval):
बाद me आप vh interval ID को ref से पढ सकते हो taaki आप [vh interval clear](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) कर सकते है:

```js [[2, 2, "intervalRef.current"]]
function handleStopClick() {
  const intervalId = intervalRef.current;
  clearInterval(intervalId);
}
```

By using a ref, you ensure that:
ref use karke आप ensure करते है कि:

- You can **store information** between री-renders. (Unlike regular variables, which reset on every render.)
- Changing it **does not trigger a री-render**. (Unlike state variables, which trigger a री-render.)
- The **information is local** to each copy of your component. (Unlike the variables outside, which are shared.)

- आप री-renders के बीच में **information store कर सकते हो**. (यह regular वेरिएबल जैसे नही है जो हर रेंडर में reset होते है).
- बदलने से **री-रेंडर trigger नहीं होता**. (यह state वेरिएबलs jaisa नही है जो री-रेंडर trigger करते है.)
- हर कौम्पोनॅन्ट के copy का **information local है**. (यह bahar के वेरिएबलस जैसे नहीं है जो प्रकृति में साझा किया गया है.)

Changing a ref does not trigger a री-render, so refs are not appropriate for storing information that you want to display on the screen. Use state for that instead. Read more about [choosing between `useRef` and `useState`](/learn/referencing-values-with-refs#differences-between-refs-and-state).
ref का री-रेंडर न आरम्भ करने के कारण, ref screen पर प्रदर्शित करने के लिए जानकारी को संग्रहित करने के लिए सही नहीं है. उसके लिए, state का प्रयोग कीजिए. [`useRef` और `useState` के beech chonne ](/learn/referencing-values-with-refs#differences-between-refs-and-state) के बारे में और पढ़े.

<Recipes titleText="Examples of referencing a value with useRef / useRef के सात वैल्यू reference करने का उधारण" titleId="examples-value">

### Click counter {/*click-counter*/}

This component uses a ref to keep track of how many times the button was clicked. Note that it's okay to use a ref instead of state here because the click count is only read and written in an event handler.
यह कौम्पोनॅन्ट ref का इस्तेमाल करता है ट्रैक करने के लिए कि कितने बार बटन दबाया गया है. अंदर रखे कि यहाँ पर state की जगह ref यूज़ करना ठीक है क्योंकि यह सिर्फ event handler द्वारा पढ़ा और लिखा जा सकता है.

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

If you show `{ref.current}` in the JSX, the number won't update on click. This is because setting `ref.current` does not trigger a री-render. Information that's used for rendering should be state instead.
अगर आप `{ref.current}` JSX में प्रदर्शित करे तो, वह संख्या क्लिक होने पर अप्डेट नहीं होगा. ऐसा इसीलिए है क्योंकि `ref.current` set करने से री-रेंडर आरम्भ नहीं होता. रेंडर करते समय यूज़ किये जाने वाली जानकारी को state में संग्रहित करना चाहिए.

<Solution />

### A stopwatch {/*a-stopwatch*/}

This example uses a combination of state and refs. Both `startTime` and `now` are state variables because they are used for rendering. But we also need to hold an [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) so that we can stop the interval on button press. Since the interval ID is not used for rendering, it's appropriate to keep it in a ref, and manually update it.

यह उदाहरण state और ref का combination इस्तेमाल करता है. `startTime` और `now` state वेरीअबल्ज़ है क्योंकि दोनों रेंडरिंग के लिए इस्तेमाल होते है. लेकिन हमें [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) को भी होल्ड करना होगा ताकि हम interval को button press पर रोक सके. क्योंकि interval ID रेंडर होते समय यूज़ नहीं होता, उसे ref में रखना उचित है और manually अप्डेट करते है.

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
**रेंडर करते समय `ref.current` को likh _ya padh_ na le.**

React expects that the body of your component [behaves like a pure function](/learn/keeping-components-pure):
रीऐक्ट अपेक्षा करता है कि आपके कौम्पोनॅन्ट का निकाय [एक शुद्ध फ़ंक्शन के तरह व्यवहार करे](/learn/keeping-components-pure):

- If the inputs ([props](/learn/passing-props-to-a-component), [state](/learn/state-a-components-memory), and [context](/learn/passing-data-deeply-with-context)) are the same, it should return exactly the same JSX.
- Calling it in a different order or with different arguments should not affect the results of other calls.

- अगर inputs ([props](/learn/passing-props-to-a-component), [state](/learn/state-a-components-memory), और [context](/learn/passing-data-deeply-with-context)) एक ही है,तो उसे पूरी तरह से वही JSX वापस करना होगा.
- अलग ऑर्डर में या अलग तर्क में बुलाने से बाकी कॉल्ज़ के परिणाम को प्रभावित नहीं करना चाहिए.

Reading or writing a ref **during rendering** breaks these expectations.
**रेंडर करते समय** ref को पढ़ना या लिखना उन अपेक्षाओं को तोड़ देता है.

```js {3-4,6-7}
function MyComponent() {
  // ...
  // 🚩 Don't write a ref during rendering
  // 🚩 रेंडर करते समय ref को ना लिखे.
  myRef.current = 123;
  // ...
  // 🚩 Don't read a ref during rendering
  // 🚩 रेंडर करते समय ref no न पढ़ें
  return <h1>{myOtherRef.current}</h1>;
}
```

You can read or write refs **from event handlers or effects instead**.
आप **event handlers से या effects instead** से refs पढ या लिख सकते है.

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
अगर आपको रेंडर करते समय कुछ पढ़ना या [लिखना](/apis/usestate#storing-information-from-previous-renders) *ही है* तो आप [state](/apis/usestate) का प्रयोग करे.

When you break these rules, your component might still work, but most of the newer features we're adding to React will rely on these expectations. Read more about [keeping your components pure](/learn/keeping-components-pure#where-you-can-cause-side-effects).

</Gotcha>

---

### Manipulating the DOM with a ref {/*manipulating-the-dom-with-a-ref*/}
### ref के साथ DOM को हेर-फेर करना {/*manipulating-the-dom-with-a-ref*/}

It's particularly common to use a ref to manipulate the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API). React has bulit-in support for this.

ref को [DOM](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API) हेर-फेर करने के लिए प्रयोग करना एक आम सी बात है. रीऐक्ट में इसके लिए built-in support है.

First, declare a <CodeStep step={1}>ref object</CodeStep> with an <CodeStep step={3}>initial value</CodeStep> of `null`:
पहले, `null` <CodeStep step={3}>initial वैल्यू</CodeStep> के साथ एक <CodeStep step={1}>ref object</CodeStep> डिक्लेर कीजिए:

```js [[1, 4, "inputRef"], [3, 4, "null"]]
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  // ...
```

Then pass your ref object as the `ref` attribute to the JSX of the DOM node you want to manipulate:
फ़िर अपने ref object को `ref` एट्रिब्यूट के रूप में उस DOM node के JSX में भेजे जिससे आप हेर-फेर करना चाहते हो:

```js [[1, 2, "inputRef"]]
  // ...
  return <input ref={inputRef} />;
```

After React creates the DOM node and puts it on the screen, React will set the <CodeStep step={2}>`current` property</CodeStep> of your ref object to that DOM node. Now you can access the `<input>`'s DOM node and call methods like [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus):
DOM node बनाने के और screen पर रखने के बाद, React DOM node के ref object का <CodeStep step={2}>`current` property</CodeStep> सेट करेगा. अब आप `<input>` का DOM node ऐक्सेस कर सकते है और [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) जैसे तरीक़े से बुला सकते है:

```js [[2, 2, "inputRef.current"]]
  function handleClick() {
    inputRef.current.focus();
  }
```

React will set the `current` property back to `null` when the node is removed from the screen.
जब screen से node हटाया जाता है, React `current` property को फ़िर `null` सेट कर देगा.

Read more about [manipulating the DOM with refs](/learn/manipulating-the-dom-with-refs).
[DOM को ref के साथ manipulate](/learn/manipulating-the-dom-with-refs) करने के बारे में और पढ़िए.

<Recipes titleText="Examples of manipulating the DOM with useRef / DOM को useRef के सात manipulate करने के उधारण" titleId="examples-dom">

### Focusing a text input {/*focusing-a-text-input*/}
### टेक्स्ट इनपुट पर केंद्रित करना {/*focusing-a-text-input*/}

In this example, clicking the button will focus the input:
इस उदाहरण में बटन क्लिक करने से इनपुट फ़ोकस होगा:

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
### image को व्यू me scrollkarna {/*scrolling-an-image-into-view*/}

In this example, clicking the button will scroll an image into view. It uses a ref to the list DOM node, and then calls DOM [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) API to find the image we want to scroll to.

इस उदाहरण में, बटन दबाने से इमिज व्यू में स्क्रोल हो जाएगा. यह ref को इस्तेमाल कर DOM node लिस्ट करता है और फ़िर DOM[`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) API को बुलाता है जिस image तक स्क्रोल करना है उस इमेज को ढूँढने के लिए.

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
### video को pause और play करना {/*playing-and-pausing-a-video*/}

This example uses a ref to call [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) and [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) on a `<video>` DOM node.

यह उदाहरण ref का इस्तेमाल करता है `<video>` DOM node पर [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) और [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) बुलाने के लिए

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
### आपके कौम्पोनॅन्ट पर ref expose करना {/*exposing-a-ref-to-your-own-component*/}

Sometimes, you may want to let the parent component manipulate the DOM inside of your component. For example, maybe you're writing a `MyInput` component, but you want the parent to be able to focus the input (which the parent has no access to). You can use a combination of `useRef` to hold the input and [`forwardRef`](/apis/forwardref) to expose it to the parent component. Read a [detailed walkthrough](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes) here.

कभी कभी, आपको पैरेंट कौम्पोनॅन्ट को अपने कौम्पोनॅन्ट के अंदर हेर-फेर करने देना चाहते हो. उदाहरण में, आप शायद `MyInput` कौम्पोनॅन्ट लिख रहे हो लेकिन आप चाहते है कि पैरेंट कौम्पोनॅन्ट इनपुट को फ़ोकस कर पाए (जिसके पैरेंट का कोई ऐक्सेस नहीं है). आप `useRef` को input hold करने के लिए hold कर सकते हो और [`forwardRef`](/apis/forwardref) को उसे पैरेंट कौम्पोनॅन्ट को expose करने के लिए इस्तेमाल कर सकते हो. [detailed walkthrough](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes) के लिए यहाँ पढ़िए.

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
### ref contents फ़िर create करना avoid करे {/*avoiding-recreating-the-ref-contents*/}

React saves the initial ref value once and ignores it on the next renders.
React initial ref वैल्यू एक बार सहेज कर लेता है और अगले रेंडर में इग्नोर करता है.

```js
function Video() {
  const playerRef = useRef(new VideoPlayer());
  // ...
```

Although the result of `new VideoPlayer()` is only used for the initial render, you're still calling this function on every render. This can be wasteful if it's creating expensive objects.

हालाँकि `new VideoPlayer()` का परिणाम सिर्फ initial रेंडर के समय इस्तेमाल होता है, आप फ़िर यह फ़ंक्शन हर रेंडर में बुलाते हो. यह महँगे आब्जेक्ट्स बनाने के लिए अपव्ययी है.

To solve it, you may initialize the ref like this instead:
इसे सुधारने के लिए, आप ref को इस तरह इनिशलायज़ कर सकते है:

```js
function Video() {
  const playerRef = useRef(null);
  if (playerRef.current === null) {
    playerRef.current = new VideoPlayer();
  }
  // ...
```

Normally, writing or reading `ref.current` during render is not allowed. However, it's fine in this case because the result is always the same, and the condition only executes during initialization so it's fully predictable.

सामन्यत:, `ref.current` को रेंडर करते समय पढने या लिखने की अनुमति नहीं है. हालाँकि, इस केस में ठीक है क्योंकि परिणाम हमेशा एक ही है और वह कंडिशन सिर्फ इनिशयलिसशन के दौरान एक्सेक्यूट होता है तो वो पूरी तरह से पूर्वकथनीय है.

<DeepDive title="How to avoid null checks when initializing useRef later / useRef को बाद me initialie करने पर null check केसै avoid करे">

If you use a type checker and don't want to always check for `null`, you can try a pattern like this instead:
यदि आप type checker का इस्तेमाल करते है और हमेशा `null` के लिए नहीं जाँच करना चाहते तो आप कुछ ऐसा प्रतिरूप की कोशिश कर सकते है:

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
यहा पे `playerRef` अपने आप me nullable है. लेकिन आपको अपने typ checker को यक़ीन करवाना आना चाहिए कि सिर्फ कोई केस नहीं है जहाँ `getPlayer()` `null` रिटर्न करता है. फ़िर event handlers में `getPlayer()` यूज़ कर लेना.

</DeepDive>

---

## Reference {/*reference*/}

### `useRef(initialValue)` {/*useref*/}

Call `useRef` at the top level of your component to declare a [ref](/learn/referencing-values-with-refs).
[ref](/learn/referencing-values-with-refs) डिक्लेर करने के लिए अपने कौम्पोनॅन्ट के सबसे उपरी स्तर में `useRef` को बुलाए.

```js
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
  // ...
```

See examples of [referencing values](#examples-value) and [DOM manipulation](#examples-dom).
[referencing वैल्यूs](#examples-value) and [DOM manipulation](#examples-dom) के udharan dekhiye.

#### Parameters {/*parameters*/}

* `initialValue`: The value you want the ref object's `current` property to be initially. It can be a value of any type. This argument is ignored after the initial render.

* `initialValue`: वह वैल्यू जिसका आप ref object का `current` property को इनिशली चाहते हो. यह वैल्यू किसी भी type का हो सकता है. इनिशल रेंडर के बाद यह तर्क इग्नोर होता है.

#### Returns {/*returns*/}

`useRef` returns an object with a single property:
`useRef` single property के साथ एक ऑब्जेक्ट रिटर्न करता है

* `current`: Initially, it's set to the `initialValue` you have passed. You can later set it to something else. If you pass the ref object to React as a `ref` attribute to a JSX node, React will set its `current` property.

* `current`: initially, इसे आपके द्वारा पास किया गया `initialValue` पर सेट किया जाता है. आप इसे बाद में कोई और वैल्यू पर भी सेट कर सकते हो. अगर आप ref object को रीऐक्ट में `ref` एट्रिब्यूट के रूप में पास करते हो, तो रीऐक्ट उसका `current` प्रॉपर्टी सेट करेगा.

On the next renders, `useRef` will return the same object.
अगले रेंडर से, `useRef` एक ही ऑब्जेक्ट रिटर्न करेगा.

#### Caveats {/*caveats*/}

* You can mutate the `ref.current` property. Unlike state, it is mutable. However, if it holds an object that is used for rendering (for example, a piece of your state), then you shouldn't mutate that object.
* When you change the `ref.current` property, React does not री-render your component. React is not aware of when you change it because a ref is a plain JavaScript object.
* Do not write _or read_ `ref.current` during rendering, except for [initialization](#avoiding-recreating-the-ref-contents). This makes your component's behavior unpredictable.
* In Strict Mode, React will **call your component function twice** in order to [help you find accidental impurities](#my-initializer-or-updater-function-runs-twice). This is development-only behavior and does not affect production. This means that each ref object will be created twice, and one of the versions will be discarded. If your component function is pure (as it should be), this should not affect the logic of your component.

* आप `ref.current` प्रॉपर्टी को रूपांतरित कर सकते हो. Unlike state, यह परिवर्तनशील है. लेकिन अगर रेंडर में इस्तेमाल होने वाले ऑब्जेक्ट को होल्ड करता है, तो आपको वह ऑब्जेक्ट परिवर्तित नहीं करना चाहिए.
* जब आप `ref.current` प्रॉपर्टी को बदलते है, रीऐक्ट आपके कौम्पोनॅन्ट को री-रेंडर नही करता. रीऐक्ट को बदलावों का पता नहीं होता क्योंकि ref एक साधारण जावास्क्रिप्ट ऑब्जेक्ट है.
* रेंडर करते समय, `ref.current` को _पढ़ना_ या लिखना मत सिवाय [initialization](#avoiding-recreating-the-ref-contents) के, इससे आपका कौम्पोनॅन्ट का व्यवहार अप्रत्याशित हो जाता है.

---

## Troubleshooting {/*troubleshooting*/}

### I can't get a ref to a custom component {/*i-cant-get-a-ref-to-a-custom-component*/}
### मुझे एक custom कौम्पोनॅन्ट के लिए ref नहीं मिल रहा {/*i-cant-get-a-ref-to-a-custom-component*/}

If you try to pass a `ref` to your own component like this:
अगर आप एक `ref` को अपने कौम्पोनॅन्ट को सिर्फ पास करे:

```js
const inputRef = useRef(null);

return <MyInput ref={inputRef} />
```

You might get an error in the console:
तो आपको console में एक एरर मिल सकता है:

<ConsoleBlock level="error">

Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

</ConsoleBlock>

By default, your own components don't expose refs to the DOM nodes inside them.
By default, आपके components unke अंदर के DOM nodes को ref expose नही करते.

To fix this, find the component that you want to get a ref to:
इससे सुधारने के लिए, उस कौम्पोनॅन्ट को ढूँढो जिसके लिए आप एक ref चाहते हो:

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
और फ़िर उसे इस तरह [`forwardRef`](/apis/forwardref)में रैप करे:

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
फ़िर उस तक पैरेंट कौम्पोनॅन्ट को ref मिल सकता है.

Read more about [accessing another component's DOM nodes](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes).
[dusre कौम्पोनॅन्ट के DOM nodes को access](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes) करने के बारे में और पढ़िए.
