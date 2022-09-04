---
title: useRef
---

<Intro>

`useRef` एक रीऐक्ट हुक है जो आपको वैल्यू reference करने देता है जो रेंडरिंग के लिए इस्तेमाल नही होता|

```js
const ref = useRef(initialValue)
```

</Intro>

- [प्रयोग](#usage)
  - [ref के साथ वैल्यू संदर्भ करना](#referencing-a-value-with-a-ref)
  - [ref के साथ DOM को हेर-फेर करना](#manipulating-the-dom-with-a-ref)
  - [आपके कौम्पोनॅन्ट पर ref का खुलासा करना](#exposing-a-ref-from-your-component)
  - [ref कंटेंट्स को फिर से बनाने से बचे](#avoiding-recreating-the-ref-contents)
- [सन्दर्भ](#reference)
  - [`useRef(initialValue)`](#useref)
- [ट्रबलशूटिंग](#troubleshooting)
  - [मुझे एक कस्टम कौम्पोनॅन्ट के लिए ref नहीं मिल रहा](#i-cant-get-a-ref-to-a-custom-component)

---

## प्रयोग {/*usage*/}

### ref के साथ वैल्यू संदर्भ करना {/*referencing-a-value-with-a-ref*/}

एक या एक से ज़्यादा [ref](/learn/referencing-values-with-refs) डिक्लेर करने के लिए `useRef` को अपने कौम्पोनॅन्ट के सबसे उपर वाले स्तर पर बुलाए|

```js [[1, 4, "intervalRef"], [3, 4, "0"]]
import { useRef } from 'react';

function Stopwatch() {
  const intervalRef = useRef(0);
  // ...
```

`useRef` सिंगल <CodeStep step={2}>`current` प्रॉपर्टी</CodeStep> के सात <CodeStep step={1}>ref ऑब्जेक्ट</CodeStep> को रिटर्न करता है जिससे शुरू में आपके द्वारा दिया गया <CodeStep step={3}>शुरुआती वैल्यू</CodeStep> के सात सेट है|

अगले रेंडर में, `useRef`वही ऑब्जेक्ट वापस करेगा| आप उसका `current`प्रॉपर्टी को बदल सकते हो जिससे आप जानकारी को स्टोर कर बाद में पढ़ सकते हो| यह आपको [state](/apis/usestate) का याद दिला सकता है लेकिन दोनो में एक महत्वपूर्ण अंतर है|

**ref बदलने से री-रेंडर ट्रिगर नही होता|** इसका अर्थ है कि दृश्य आउटपुट को बिना प्रभावित किये जानकारी स्टोर करने के लिए ref उत्तम है| उदाहरण में, अगर आपको [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) को स्टोर करना हो और बाद में फिर से प्राप्त करना हो तो आप उसे ref में रख सकते है| ref के अंदर के वैल्यू को अप्डेट करने के लिए, आपको <CodeStep step={2}>`current` प्रॉपर्टी</CodeStep> को मैन्युअली बदलना होगा:

```js [[2, 5, "intervalRef.current"]]
function handleStartClick() {
  const intervalId = setInterval(() => {
    // ...
  }, 1000);
  intervalRef.current = intervalId;
}
```

बाद में आप वह interval ID को ref से पढ सकते हो ताकि आप [वह interval अपमार्जन](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) कर सकते है:

```js [[2, 2, "intervalRef.current"]]
function handleStopClick() {
  const intervalId = intervalRef.current;
  clearInterval(intervalId);
}
```

ref इस्तेमाल करके आप सुनिश्चित करते है कि:

- आप री-रेंडर के बीच में **इनफार्मेशन स्टोर कर सकते हो**| (यह रेगुलर वेरिएबल जैसे नही है जो हर रेंडर में रिसेट होते है)|
- बदलने से **री-रेंडर ट्रिगर नहीं होता**| (यह state वेरिएबल जैसा नही है जो री-रेंडर ट्रिगर करते है|)
- हर कौम्पोनॅन्ट के प्रतिलिपि का **इनफार्मेशन स्थानीय है**| (यह बहार के वेरिएबलस जैसे नहीं है जो प्रकृति में साझा किया गया है|)

ref का री-रेंडर न आरम्भ करने के कारण, ref स्क्रीन पर प्रदर्शित करने के लिए जानकारी को संग्रहित करने के लिए सही नहीं है| उसके लिए, state का प्रयोग कीजिए| [`useRef` और `useState` के बीच में अंतर ](/learn/referencing-values-with-refs#differences-between-refs-and-state) के बारे में और पढ़े|

<Recipes titleText="useRef के सात वैल्यू सन्दर्भ करने का उदहारण" titleId="examples-value">

### Click counter {/*click-counter*/}

यह कौम्पोनॅन्ट ref का इस्तेमाल करता है ट्रैक करने के लिए कि कितने बार बटन दबाया गया है| अंदर रखे कि यहाँ पर state की जगह ref यूज़ करना ठीक है क्योंकि यह सिर्फ event handler द्वारा पढ़ा और लिखा जा सकता है|

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

अगर आप `{ref.current}` JSX में प्रदर्शित करे तो, वह संख्या क्लिक होने पर अप्डेट नहीं होगा| ऐसा इसीलिए है क्योंकि `ref.current` set करने से री-रेंडर आरम्भ नहीं होता| रेंडर करते समय यूज़ किये जाने वाली जानकारी को state में संग्रहित करना चाहिए|

<Solution />

### एक stopwatch {/*a-stopwatch*/}

यह उदाहरण state और ref का कॉम्बिनेशन इस्तेमाल करता है| `startTime` और `now` state वेरीअबल्ज़ है क्योंकि दोनों रेंडरिंग के लिए इस्तेमाल होते है| लेकिन हमें [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) को भी होल्ड करना होगा ताकि हम interval को button press पर रोक सके| क्योंकि interval ID रेंडर होते समय यूज़ नहीं होता, उसे ref में रखना उचित है और मन्युअली अप्डेट करते है|

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

**रेंडर करते समय `ref.current` को लिख _या पढ़_ न ले|**

रीऐक्ट अपेक्षा करता है कि आपके कौम्पोनॅन्ट का निकाय [एक शुद्ध फ़ंक्शन के तरह व्यवहार करे](/learn/keeping-components-pure):

- अगर inputs ([props](/learn/passing-props-to-a-component), [state](/learn/state-a-components-memory), और [context](/learn/passing-data-deeply-with-context)) एक ही है,तो उसे पूरी तरह से वही JSX वापस करना होगा|
- अलग ऑर्डर में या अलग तर्क में बुलाने से बाकी कॉल्ज़ के परिणाम को प्रभावित नहीं करना चाहिए|

**रेंडर करते समय** ref को पढ़ना या लिखना उन अपेक्षाओं को तोड़ देता है|

```js {3-4,6-7}
function MyComponent() {
  // ...
  // 🚩 रेंडर करते समय ref को ना लिखे|
  myRef.current = 123;
  // ...
  // 🚩 रेंडर करते समय ref ko न पढ़ें
  return <h1>{myOtherRef.current}</h1>;
}
```

आप **event handlers से या effects instead** से refs पढ या लिख सकते है|

```js {4-5,9-10}
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ आप effects में ref पढ़ और लिख सकते हो
    myRef.current = 123;
  });
  // ...
  function handleClick() {
    // ✅ आप event handlers में ref पढ़ और लिख सकते हो
    doSomething(myOtherRef.current);
  }
  // ...
}
```

अगर आपको रेंडर करते समय कुछ पढ़ना या [लिखना](/apis/usestate#storing-information-from-previous-renders) *ही है* तो आप [state](/apis/usestate) का प्रयोग करे|

अगर आप यह नियम तोड़ते भी है आपका कॉम्पोनेन्ट काम कर सकता है लेकिन React में नए फीचर्स इसी उम्मीद पे भरोसा करेंगे| [अपने कंपोनेंट्स को शुद्ध रखने](/learn/keeping-components-pure#where-you-can-cause-side-effects) के लिए और पढ़े|

</Gotcha>

---

### ref के साथ DOM को हेर-फेर करना {/*manipulating-the-dom-with-a-ref*/}

ref को [DOM](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API) हेर-फेर करने के लिए प्रयोग करना एक आम सी बात है| रीऐक्ट में इसके लिए अंतर्निहित समर्थन है|

पहले, `null` <CodeStep step={3}>initial वैल्यू</CodeStep> के साथ एक <CodeStep step={1}>ref ऑब्जेक्ट</CodeStep> डिक्लेर कीजिए:

```js [[1, 4, "inputRef"], [3, 4, "null"]]
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  // ...
```

फ़िर अपने ref ऑब्जेक्ट को `ref` एट्रिब्यूट के रूप में उस DOM node के JSX में भेजे जिससे आप हेर-फेर करना चाहते हो:

```js [[1, 2, "inputRef"]]
  // ...
  return <input ref={inputRef} />;
```

DOM node बनाने के और स्क्रीन पर रखने के बाद, React DOM node के ref ऑब्जेक्ट का <CodeStep step={2}>`current` प्रॉपर्टी</CodeStep> सेट करेगा| अब आप `<input>` का DOM node ऐक्सेस कर सकते है और [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) जैसे तरीक़े से बुला सकते है:

```js [[2, 2, "inputRef.current"]]
  function handleClick() {
    inputRef.current.focus();
  }
```

जब स्क्रीन से node हटाया जाता है, React `current` प्रॉपर्टी को फ़िर `null` सेट कर देगा|

[ref के साथ DOM को हेर-फेर](/learn/manipulating-the-dom-with-refs) करने के बारे में और पढ़िए|

<Recipes titleText="useRef के साथ DOM को हेर-फेर करना करने के उदहारण" titleId="examples-dom">

### टेक्स्ट इनपुट पर केंद्रित करना {/*focusing-a-text-input*/}

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

### इमेज को व्यू में स्क्रॉल करना {/*scrolling-an-image-into-view*/}

इस उदाहरण में, बटन दबाने से इमिज व्यू में स्क्रोल हो जाएगा| यह ref को इस्तेमाल कर DOM node लिस्ट करता है और फ़िर DOM[`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) API को बुलाता है जिस इमेज तक स्क्रोल करना है उस इमेज को ढूँढने के लिए|

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

### वीडियो को पॉज और प्ले करना {/*playing-and-pausing-a-video*/}

यह उदाहरण ref का इस्तेमाल करता है `<video>` DOM node पर [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) और [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) बुलाने के लिए|

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

### आपके कौम्पोनॅन्ट पर ref का खुलासा करना {/*exposing-a-ref-to-your-own-component*/}

कभी कभी, आपको पैरेंट कौम्पोनॅन्ट को अपने कौम्पोनॅन्ट के अंदर हेर-फेर करने देना चाहते हो| उदाहरण में, आप शायद `MyInput` कौम्पोनॅन्ट लिख रहे हो लेकिन आप चाहते है कि पैरेंट कौम्पोनॅन्ट इनपुट को फ़ोकस कर पाए (जिसके पैरेंट का कोई ऐक्सेस नहीं है)| आप `useRef` को इनपुट होल्ड करने के लिए होल्ड कर सकते हो और [`forwardRef`](/apis/forwardref) को उसे पैरेंट कौम्पोनॅन्ट को खुलासा करने के लिए इस्तेमाल कर सकते हो| [विस्तृत पूर्वाभ्यास](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes) के लिए यहाँ पढ़िए|

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

### ref कंटेंट्स को फिर से बनाने से बचे {/*avoiding-recreating-the-ref-contents*/}

React शुरुआती ref वैल्यू एक बार सहेज कर लेता है और अगले रेंडर में इग्नोर करता है|

```js
function Video() {
  const playerRef = useRef(new VideoPlayer());
  // ...
```

हालाँकि `new VideoPlayer()` का परिणाम सिर्फ initial रेंडर के समय इस्तेमाल होता है, आप फ़िर यह फ़ंक्शन हर रेंडर में बुलाते हो| यह महँगे आब्जेक्ट्स बनाने के लिए अपव्ययी है|

इसे सुधारने के लिए, आप ref को इस तरह इनिशलायज़ कर सकते है:

```js
function Video() {
  const playerRef = useRef(null);
  if (playerRef.current === null) {
    playerRef.current = new VideoPlayer();
  }
  // ...
```

सामन्यत:, `ref.current` को रेंडर करते समय पढने या लिखने की अनुमति नहीं है| हालाँकि, इस केस में ठीक है क्योंकि परिणाम हमेशा एक ही है और वह कंडिशन सिर्फ इनिशयलिसशन के दौरान एक्सेक्यूट होता है तो वो पूरी तरह से पूर्वकथनीय है|

<DeepDive title="में इनिशिअलिज़े करने पर Null चेक से कैसे बचे">

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

यहा पे `playerRef` अपने आप में nullable है| लेकिन आपको अपने type checker को यक़ीन करवाना आना चाहिए कि सिर्फ कोई केस नहीं है जहाँ `getPlayer()` `null` रिटर्न करता है| फ़िर event handlers में `getPlayer()` यूज़ कर लेना|

</DeepDive>

---

## सन्दर्भ {/*reference*/}

### `useRef(initialValue)` {/*useref*/}

[ref](/learn/referencing-values-with-refs) डिक्लेर करने के लिए अपने कौम्पोनॅन्ट के सबसे उपरी स्तर में `useRef` को बुलाए|

```js
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
  // ...
```
[संदर्भ किया जाने वैल्यू](#examples-value) और [DOM manipulation](#examples-dom) के उदहारण देखिये|

#### पैरामीटर्स {/*parameters*/}

* `initialValue`: वह वैल्यू जिसका आप ref ऑब्जेक्ट का `current` प्रॉपर्टी को इनिशली चाहते हो| यह वैल्यू किसी भी type का हो सकता है| इनिशल रेंडर के बाद यह तर्क इग्नोर होता है|

#### रिटर्न्स {/*returns*/}

`useRef` अकेले प्रॉपर्टी के साथ एक ऑब्जेक्ट रिटर्न करता है|

* `current`: शुरुआत में, इसे आपके द्वारा पास किया गया `initialValue` पर सेट किया जाता है| आप इसे बाद में कोई और वैल्यू पर भी सेट कर सकते हो| अगर आप ref ऑब्जेक्ट को रीऐक्ट में `ref` एट्रिब्यूट के रूप में पास करते हो, तो रीऐक्ट उसका `current` प्रॉपर्टी सेट करेगा|

अगले रेंडर से, `useRef` एक ही ऑब्जेक्ट रिटर्न करेगा|

#### चेतावनियां {/*caveats*/}

* आप `ref.current` प्रॉपर्टी को रूपांतरित कर सकते हो| Unlike state, यह परिवर्तनशील है| लेकिन अगर रेंडर में इस्तेमाल होने वाले ऑब्जेक्ट को होल्ड करता है, तो आपको वह ऑब्जेक्ट परिवर्तित नहीं करना चाहिए|
* जब आप `ref.current` प्रॉपर्टी को बदलते है, रीऐक्ट आपके कौम्पोनॅन्ट को री-रेंडर नही करता| रीऐक्ट को बदलावों का पता नहीं होता क्योंकि ref एक साधारण जावास्क्रिप्ट ऑब्जेक्ट है|
* रेंडर करते समय, `ref.current` को _पढ़ना_ या लिखना मत सिवाय [initialization](#avoiding-recreating-the-ref-contents) के, इससे आपका कौम्पोनॅन्ट का व्यवहार अप्रत्याशित हो जाता है|
* स्ट्रिक्ट मोड में, [आकस्मिक अशुद्धियाँ ढूंढने](#my-initializer-or-updater-function-runs-twice) के लिए React **आपके इन्शिअलिज़ेर को दो बार** बुलाता है| यह एक development-only व्यवहार है और आपके प्रोडक्शन को प्रभावित नहीं करेगा| अगर आपका इनिशलिसेर फ़ंक्शन शुद्ध है (जो होना चाहिए), तो उसे आपके कौम्पोनॅन्ट के लॉजिक प्रभावित नहीं करना चाहिए| किसी एक कॉल का परिणाम इग्नोर हो जाएगा|

---

## ट्रबलशूटिंग {/*troubleshooting*/}

### मुझे एक कस्टम कौम्पोनॅन्ट के लिए ref नहीं मिल रहा {/*i-cant-get-a-ref-to-a-custom-component*/}

अगर आप एक `ref` को अपने कौम्पोनॅन्ट को सिर्फ पास करे:

```js
const inputRef = useRef(null);

return <MyInput ref={inputRef} />
```

तो आपको कंसोल में एक एरर मिल सकता है:

<ConsoleBlock level="error">

Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

</ConsoleBlock>

डिफ़ॉल्ट रूप से, आपके कौम्पोनॅन्ट उनके अंदर के DOM nodes को ref का खुलासा नही करते|

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

फ़िर उस तक पैरेंट कौम्पोनॅन्ट को ref मिल सकता है|

[दूसरे कौम्पोनॅन्ट के DOM nodes को एक्सेस](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes) करने के बारे में और पढ़िए|
