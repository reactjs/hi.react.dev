---
title: 'Refs के साथ DOM में बदलाव करना'
---

<Intro>

React स्वचालित रूप से [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) को आपके रेंडर आउटपुट के अनुसार अपडेट करता है, जिससे आपके कंपोनेंट्स को अक्सर इसे मैन्युपुलेट करने की आवश्यकता नहीं होती। हालांकि, कभी-कभी आपको React द्वारा मैनेज किए गए DOM एलिमेंट्स तक पहुंचने की आवश्यकता हो सकती है—जैसे किसी नोड को फोकस करना, स्क्रॉल करना, या उसका आकार और स्थिति मापना। React में इन चीज़ों के लिए कोई बिल्ट-इन तरीका नहीं है, इसलिए आपको DOM नोड के लिए एक *ref* की आवश्यकता होगी।

</Intro>

<YouWillLearn>

- React द्वारा मैनेज किए गए DOM नोड तक `ref` एट्रिब्यूट के साथ कैसे पहुंचें
- `ref` JSX एट्रिब्यूट का `useRef` हुक से क्या संबंध है
- किसी दूसरे कंपोनेंट के DOM नोड तक कैसे पहुंचें
- किन मामलों में React द्वारा मैनेज किए गए DOM को बदलना सुरक्षित है

</YouWillLearn>

## नोड के लिए ref प्राप्त करना {/*getting-a-ref-to-the-node*/}

React द्वारा मैनेज किए गए DOM नोड तक पहुंचने के लिए, सबसे पहले `useRef` हुक को इम्पोर्ट करें:

```js
import { useRef } from 'react';
```

फिर, इसे अपने कंपोनेंट के अंदर एक ref घोषित करने के लिए उपयोग करें:

```js
const myRef = useRef(null);
```

अंत में, अपने ref को उस JSX टैग के `ref` एट्रिब्यूट के रूप में पास करें जिसके लिए आप DOM नोड प्राप्त करना चाहते हैं:

```js
<div ref={myRef}>
```

`useRef` हुक एक ऑब्जेक्ट रिटर्न करता है जिसमें एकमात्र प्रॉपर्टी होती है, जिसे `current` कहा जाता है। शुरुआत में, `myRef.current` का मान `null` होगा। जब React इस `<div>` के लिए एक DOM नोड बनाएगा, तो React इस नोड का रेफरेंस `myRef.current` में डाल देगा। इसके बाद आप इस DOM नोड को अपने [इवेंट हैंडलर्स](/learn/responding-to-events) से एक्सेस कर सकते हैं और उस पर परिभाषित [ब्राउज़र APIs](https://developer.mozilla.org/docs/Web/API/Element) का उपयोग कर सकते हैं।

```js
// आप किसी भी ब्राउज़र API का उपयोग कर सकते हैं, उदाहरण के लिए:
myRef.current.scrollIntoView();
```

### उदाहरण: टेक्स्ट इनपुट पर फोकस करना {/*example-focusing-a-text-input*/}

इस उदाहरण में, बटन पर क्लिक करने से इनपुट पर फोकस होगा:

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
        इनपुट पर फोकस करें
      </button>
    </>
  );
}
```

</Sandpack>

इसका उपयोग करने के लिए:

1. `useRef` हुक के साथ `inputRef` घोषित करें।  
2. इसे `<input ref={inputRef}>` के रूप में पास करें। यह React को यह बताता है कि **इस `<input>` के DOM नोड को `inputRef.current` में डालें।**  
3. `handleClick` फंक्शन में, इनपुट DOM नोड को `inputRef.current` से पढ़ें और `focus()` को `inputRef.current.focus()` के साथ कॉल करें।  
4. `handleClick` इवेंट हैंडलर को `<button>` में `onClick` के साथ पास करें।  

हालांकि DOM मैनिपुलेशन रेफ्स के लिए सबसे आम उपयोग है, `useRef` हुक का उपयोग React के बाहर अन्य चीजों, जैसे टाइमर IDs, को स्टोर करने के लिए भी किया जा सकता है। स्टेट की तरह, रेफ्स रेंडर के बीच बने रहते हैं। रेफ्स स्टेट वेरिएबल्स की तरह हैं, लेकिन इन्हें सेट करने पर री-रेंडर नहीं होता। रेफ्स के बारे में अधिक जानने के लिए पढ़ें [Referencing Values with Refs.](/learn/referencing-values-with-refs)

### उदाहरण: किसी एलिमेंट पर स्क्रॉल करना {/*example-scrolling-to-an-element*/}

एक कंपोनेंट में एक से अधिक रेफ्स हो सकते हैं। इस उदाहरण में, तीन इमेजेस का कैरोसेल है। प्रत्येक बटन एक इमेज को केंद्रित करता है, इसके लिए ब्राउज़र के [`scrollIntoView()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) मेथड को संबंधित DOM नोड पर कॉल किया जाता है:

<Sandpack>

```js
import { useRef } from 'react';

export default function CatFriends() {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);

  function handleScrollToFirstCat() {
    firstCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToSecondCat() {
    secondCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToThirdCat() {
    thirdCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>
          नियो
        </button>
        <button onClick={handleScrollToSecondCat}>
          मिली
        </button>
        <button onClick={handleScrollToThirdCat}>
          बेला
        </button>
      </nav>
      <div>
        <ul>
          <li>
            <img
              src="https://placecats.com/neo/300/200"
              alt="नियो"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/millie/200/200"
              alt="मिली"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/bella/199/200"
              alt="बेला"
              ref={thirdCatRef}
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

<DeepDive>

#### लिस्ट ऑफ़ रिफ्स को `ref` कॉलबैक का उपयोग करके प्रबंधित करना {/*how-to-manage-a-list-of-refs-using-a-ref-callback*/}

उपरोक्त उदाहरणों में, रिफ्स की संख्या पहले से तय होती है। लेकिन कभी-कभी आपको लिस्ट में प्रत्येक आइटम के लिए एक रिफ की ज़रूरत हो सकती है, और आपको पता नहीं होता कि कितने आइटम होंगे। ऐसा कुछ **काम नहीं करेगा**:

```js
<ul>
  {items.map((item) => {
    // काम नहीं करेगा!
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
```

ऐसा इसलिए है क्योंकि **हुक्स को केवल आपके कंपोनेंट के शीर्ष स्तर पर ही कॉल किया जाना चाहिए।** आप `useRef` को किसी लूप, कंडीशन, या `map()` कॉल के अंदर नहीं कॉल कर सकते।

इस समस्या को हल करने का एक तरीका यह है कि उनके पैरेंट एलिमेंट के लिए एक रिफ लें और फिर DOM मैनिपुलेशन विधियों जैसे [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) का उपयोग करके व्यक्तिगत चाइल्ड नोड्स "खोजें"। लेकिन यह तरीका नाजुक है और आपके DOM स्ट्रक्चर के बदलने पर टूट सकता है।

एक और समाधान है कि **`ref` एट्रिब्यूट को एक फ़ंक्शन पास करें।** इसे [`ref` कॉलबैक](/reference/react-dom/components/common#ref-callback) कहा जाता है। React आपके रिफ कॉलबैक को DOM नोड के साथ तब कॉल करेगा जब रिफ सेट करना हो, और `null` के साथ जब रिफ को क्लियर करना हो। यह आपको अपनी खुद की [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) या ऐरे बनाए रखने देता है और किसी रिफ तक इसकी इंडेक्स या किसी प्रकार के ID के माध्यम से पहुंचने देता है।

यह उदाहरण दिखाता है कि आप इस तरीके का उपयोग करके किसी लंबी लिस्ट में किसी भी नोड को स्क्रॉल कैसे कर सकते हैं:

<Sandpack>

```js
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // पहली बार उपयोग पर Map को इनिशियलाइज़ करें।
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
        <button onClick={() => scrollToCat(catList[9])}>Bella</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              ref={(node) => {
                const map = getMap();
                map.set(cat, node);

                return () => {
                  map.delete(cat);
                };
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }

  return catList;
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

इस उदाहरण में, `itemsRef` एक ही DOM नोड को नहीं रखता है। इसके बजाय, यह एक [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) रखता है, जो आइटम ID से DOM नोड को मैप करता है। ([Refs किसी भी वैल्यू को रख सकते हैं!](/learn/referencing-values-with-refs)) प्रत्येक लिस्ट आइटम पर [`ref` कॉलबैक](/reference/react-dom/components/common#ref-callback) Map को अपडेट करने का ध्यान रखता है:

```js
<li
  key={cat.id}
  ref={node => {
    const map = getMap();
    // Map में जोड़ें
    map.set(cat, node);

    return () => {
      // Map से हटाएं
      map.delete(cat);
    };
  }}
>
```

यह आपको बाद में Map से व्यक्तिगत DOM नोड्स पढ़ने की अनुमति देता है।

<Note>

जब Strict Mode सक्षम होता है, तो डेवेलपमेंट में रिफ कॉलबैक दो बार चलेंगे।

`[Ref]` कॉलबैक को फिर से चलाने से बग कैसे ठीक होते हैं, इसके बारे में अधिक जानें। [यहां पढ़ें](/reference/react/StrictMode#fixing-bugs-found-by-re-running-ref-callbacks-in-development)

</Note>

</DeepDive>

## किसी अन्य कंपोनेंट के DOM नोड्स को एक्सेस करना {/*accessing-another-components-dom-nodes*/}  

जब आप किसी बिल्ट-इन कंपोनेंट (जैसे `<input />`) पर एक ref लगाते हैं, जो ब्राउज़र में एक एलिमेंट आउटपुट करता है, React उस ref की `current` प्रॉपर्टी को संबंधित DOM नोड (जैसे ब्राउज़र में वास्तविक `<input />`) पर सेट कर देता है।  

हालांकि, यदि आप अपने **खुद के** कंपोनेंट (जैसे `<MyInput />`) पर ref लगाने का प्रयास करते हैं, तो डिफ़ॉल्ट रूप से आपको `null` मिलेगा। इसे दिखाने के लिए एक उदाहरण नीचे दिया गया है। ध्यान दें कि बटन पर क्लिक करने से इनपुट **फोकस नहीं होता**:  

<Sandpack>

```js
import { useRef } from 'react';

function MyInput(props) {
  return <input {...props} />;
}

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        इनपुट पर फ़ोकस करें
      </button>
    </>
  );
}
```

</Sandpack>

इस समस्या को समझने में मदद करने के लिए, React कंसोल में एक त्रुटि भी प्रिंट करता है:

<ConsoleBlock level="error">

Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

</ConsoleBlock>

यह इसलिए होता है क्योंकि डिफ़ॉल्ट रूप से React किसी भी कंपोनेंट को अन्य कंपोनेंट्स के DOM नोड्स तक पहुँचने की अनुमति नहीं देता है। न ही यह अपने खुद के बच्चों के DOM नोड्स तक पहुँचने की अनुमति देता है! यह जानबूझकर किया गया है। Refs एक बचाव मार्ग हैं, जिन्हें सावधानी से उपयोग करना चाहिए। किसी अन्य कंपोनेंट के DOM नोड्स को मैन्युअली मैनिपुलेट करना आपके कोड को और भी अधिक नाजुक बना सकता है।

इसके बजाय, जो कंपोनेंट्स अपने DOM नोड्स को उजागर करना चाहते हैं, उन्हें इस व्यवहार को **ऑप्ट इन** करना पड़ता है। एक कंपोनेंट यह निर्दिष्ट कर सकता है कि वह अपना ref अपने किसी बच्चे को "फॉरवर्ड" करता है। इस प्रकार `MyInput` कंपोनेंट `forwardRef` API का उपयोग कर सकता है:  

```js
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});
```

यह इस प्रकार काम करता है:

1. `<MyInput ref={inputRef} />` React को यह बताता है कि वह संबंधित DOM नोड को `inputRef.current` में रखे। हालांकि, यह `MyInput` कंपोनेंट पर निर्भर करता है कि वह इस प्रक्रिया को स्वीकार करे—डिफ़ॉल्ट रूप से यह ऐसा नहीं करता।
2. `MyInput` कंपोनेंट को `forwardRef` का उपयोग करके घोषित किया जाता है। **यह इसे `inputRef` को प्राप्त करने के लिए ऑप्ट इन करता है, जो ऊपर दिए गए `ref` के रूप में दूसरा तर्क है**, जिसे `props` के बाद घोषित किया जाता है।
3. `MyInput` स्वयं प्राप्त किए गए `ref` को `<input>` के अंदर पास करता है।

अब, बटन पर क्लिक करने से इनपुट पर फोकस करना काम करता है:

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

डिज़ाइन सिस्टम्स में, यह एक सामान्य पैटर्न है कि निम्न-स्तरीय कंपोनेंट्स जैसे बटन, इनपुट्स आदि अपने रिफ्स को उनके DOM नोड्स पर फॉरवर्ड करते हैं। दूसरी ओर, उच्च-स्तरीय कंपोनेंट्स जैसे फॉर्म्स, लिस्ट्स या पेज सेक्शंस आमतौर पर अपने DOM नोड्स को एक्सपोज़ नहीं करते हैं ताकि DOM संरचना पर दुर्घटनावश निर्भरता से बचा जा सके।

<DeepDive>

#### एक इम्पेरैटिव हैंडल के साथ API के एक उपसेट को एक्सपोज़ करना

उपरोक्त उदाहरण में, `MyInput` मूल DOM इनपुट तत्व को एक्सपोज़ करता है। इससे पैरेंट कंपोनेंट को उस पर `focus()` कॉल करने की अनुमति मिलती है। हालांकि, इससे पैरेंट कंपोनेंट को कुछ और करने की भी अनुमति मिलती है—उदाहरण के लिए, इसके CSS स्टाइल्स को बदलना। असामान्य मामलों में, आप एक्सपोज़ की गई कार्यक्षमता को प्रतिबंधित करना चाह सकते हैं। आप ऐसा `useImperativeHandle` के साथ कर सकते हैं:

<Sandpack>

```js
import {
  forwardRef, 
  useRef, 
  useImperativeHandle
} from 'react';

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
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

यहाँ, `MyInput` के अंदर `realInputRef` वास्तविक इनपुट DOM नोड को रखता है। हालांकि, `useImperativeHandle` React को निर्देश देता है कि वह पैरेंट कंपोनेंट को एक विशेष वस्तु के रूप में अपने कस्टम रेफ को प्रदान करे। इसलिए `Form` कंपोनेंट के अंदर `inputRef.current` केवल `focus` मेथड रखेगा। इस मामले में, रेफ "हैंडल" DOM नोड नहीं है, बल्कि वह कस्टम ऑब्जेक्ट है जो आप `useImperativeHandle` कॉल के अंदर बनाते हैं।

</DeepDive>

## जब React रेफ्स को जोड़ता है {/*when-react-attaches-the-refs*/}

React में, प्रत्येक अपडेट दो चरणों में बाँटा जाता है:

* **रेंडर** के दौरान, React आपके कंपोनेंट्स को कॉल करता है ताकि यह पता लगा सके कि स्क्रीन पर क्या दिखना चाहिए।
* **कमीट** के दौरान, React DOM में बदलाव लागू करता है।

सामान्यतः, आप **रेंडर** के दौरान रेफ्स तक पहुँचने की कोशिश नहीं करना चाहते हैं। यह उन रेफ्स के लिए भी जाता है जो DOM नोड्स को होल्ड करते हैं। पहले रेंडर के दौरान, DOM नोड्स अभी तक बनाए नहीं गए होते हैं, इसलिए `ref.current` `null` होगा। और अपडेट के दौरान रेंडर करते समय, DOM नोड्स अभी तक अपडेट नहीं हुए होते हैं। इसलिए, उन्हें पढ़ने के लिए यह बहुत जल्दी होता है।

React `ref.current` को **कमीट** के दौरान सेट करता है। DOM को अपडेट करने से पहले, React प्रभावित `ref.current` मानों को `null` पर सेट करता है। DOM को अपडेट करने के बाद, React इन्हें तुरंत संबंधित DOM नोड्स पर सेट कर देता है।

**आमतौर पर, आप रेफ्स तक पहुँचने के लिए इवेंट हैंडलर्स का उपयोग करेंगे।** अगर आप किसी रेफ के साथ कुछ करना चाहते हैं, लेकिन ऐसा कोई विशेष इवेंट नहीं है जिसमें इसे करना हो, तो आपको एक Effect की आवश्यकता हो सकती है। हम अगले पृष्ठों पर Effects के बारे में चर्चा करेंगे।

<DeepDive>

#### फ्लशिंग स्टेट अपडेट्स को सिंक्रोनसली फ्लशसिंक के साथ {/*flushing-state-updates-synchronously-with-flush-sync*/}

ऐसे कोड पर विचार करें, जो एक नया टूडू जोड़ता है और स्क्रीन को लिस्ट के आखिरी चाइल्ड तक स्क्रॉल करता है। ध्यान दें कि, किसी कारणवश, यह हमेशा उस टूडू तक स्क्रॉल करता है जो *अभी हाल ही में जोड़ा गया* था:

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    setText('');
    setTodos([ ...todos, newTodo]);
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}
```

</Sandpack>

समस्या इन दो लाइनों में है:

```js
setTodos([ ...todos, newTodo]);
listRef.current.lastChild.scrollIntoView();
```

React में, [state अपडेट्स कतारबद्ध होते हैं.](/learn/queueing-a-series-of-state-updates) सामान्यतः, यही वह चीज़ है जो आप चाहते हैं। हालांकि, यहां यह एक समस्या पैदा करता है क्योंकि `setTodos` तुरंत DOM को अपडेट नहीं करता। इसलिए, जब आप लिस्ट को उसके आखिरी एलिमेंट तक स्क्रॉल करते हैं, तब तक टूडू अभी तक जोड़ा नहीं गया होता है। यही कारण है कि स्क्रॉल हमेशा एक आइटम "पीछे" होता है।

इस समस्या को ठीक करने के लिए, आप React को DOM को सिंक्रोनसली अपडेट करने के लिए मजबूर कर सकते हैं ("flush" कर सकते हैं)। ऐसा करने के लिए, `react-dom` से `flushSync` को इम्पोर्ट करें और **state अपडेट को** `flushSync` कॉल में लपेटें:

```js
flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
```

यह React को निर्देश देगा कि वह `flushSync` में लिपटे कोड के निष्पादन के तुरंत बाद DOM को सिंक्रोनसली अपडेट करे। इसके परिणामस्वरूप, आखिरी टूडू DOM में पहले ही मौजूद होगा जब आप उसे स्क्रॉल करने की कोशिश करेंगे:

<Sandpack>

```js
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    flushSync(() => {
      setText('');
      setTodos([ ...todos, newTodo]);      
    });
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}
```

</Sandpack>

</DeepDive>

## DOM मैनिपुलेशन के लिए सर्वोत्तम प्रथाएँ (Best practices for DOM manipulation with refs)

Refs एक "escape hatch" हैं। आपको इन्हें केवल तब उपयोग करना चाहिए जब आपको "React से बाहर कदम रखना हो"। इसके सामान्य उदाहरणों में फोकस, स्क्रॉल पोजीशन को मैनेज करना, या उन ब्राउज़र APIs को कॉल करना शामिल है जिन्हें React एक्सपोज़ नहीं करता।

अगर आप नष्ट न करने वाली क्रियाएँ जैसे कि फोकस करना और स्क्रॉल करना करते हैं, तो आपको कोई समस्या नहीं होनी चाहिए। हालांकि, अगर आप **DOM को मैन्युअली संशोधित** करने की कोशिश करते हैं, तो आप React द्वारा किए जा रहे परिवर्तनों से टकरा सकते हैं।

इस समस्या को स्पष्ट करने के लिए, इस उदाहरण में एक स्वागत संदेश और दो बटन हैं। पहला बटन अपनी उपस्थिति को [conditional rendering](/learn/conditional-rendering) और [state](/learn/state-a-components-memory) का उपयोग करके टॉगल करता है, जैसा कि आप सामान्य रूप से React में करते हैं। दूसरा बटन [`remove()` DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) का उपयोग करके इसे React के नियंत्रण से बाहर मजबूरी से हटा देता है।

"Toggle with setState" को कुछ बार दबाने का प्रयास करें। संदेश को गायब और फिर से दिखाई देना चाहिए। फिर "Remove from the DOM" दबाएँ। यह इसे मजबूरी से हटा देगा। अंत में, "Toggle with setState" दबाएँ:

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        Toggle with setState
      </button>
      <button
        onClick={() => {
          ref.current.remove();
        }}>
        Remove from the DOM
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
```

```css
p,
button {
  display: block;
  margin: 10px;
}
```

</Sandpack>

एक बार जब आपने मैन्युअली DOM तत्व को हटा दिया, तो `setState` का उपयोग करके उसे फिर से दिखाने की कोशिश करने से क्रैश हो जाएगा। इसका कारण यह है कि आपने DOM को बदल दिया है, और React को यह नहीं पता होता कि इसे सही तरीके से कैसे प्रबंधित किया जाए।

**React द्वारा प्रबंधित DOM नोड्स को बदलने से बचें।** ऐसे तत्वों से बच्चों को संशोधित करना, जोड़ना, या हटाना जो React द्वारा प्रबंधित हैं, असंगत दृश्य परिणामों या ऊपर दिए गए जैसे क्रैश का कारण बन सकता है।

हालाँकि, इसका मतलब यह नहीं है कि आप इसे बिलकुल भी नहीं कर सकते। यह सतर्कता की आवश्यकता होती है। **आप उन DOM भागों को सुरक्षित रूप से संशोधित कर सकते हैं जिन्हें React को अपडेट करने का कोई कारण नहीं होता।** उदाहरण के लिए, यदि कोई `<div>` JSX में हमेशा खाली है, तो React को इसके बच्चों की सूची को छेड़ने का कोई कारण नहीं होगा। इसलिए, वहां तत्वों को मैन्युअली जोड़ना या हटाना सुरक्षित है।

<Recap>

- रिफ़्स एक सामान्य अवधारणा हैं, लेकिन सामान्यत: आप इन्हें DOM तत्वों को रखने के लिए उपयोग करेंगे।
- आप React को `myRef.current` में एक DOM नोड डालने के लिए `<div ref={myRef}>` का उपयोग करके निर्देशित करते हैं।
- सामान्यत: आप रिफ़्स का उपयोग गैर-हानिकारक क्रियाओं के लिए करेंगे जैसे कि फोकस करना, स्क्रॉल करना, या DOM तत्वों का मापना।
- एक कंपोनेंट डिफ़ॉल्ट रूप से अपने DOM नोड्स को एक्सपोज़ नहीं करता। आप `forwardRef` का उपयोग करके और दूसरे `ref` तर्क को एक विशिष्ट नोड तक भेजकर DOM नोड को एक्सपोज़ करने का विकल्प चुन सकते हैं।
- React द्वारा प्रबंधित DOM नोड्स को बदलने से बचें।
- यदि आप React द्वारा प्रबंधित DOM नोड्स को बदलते हैं, तो केवल उन हिस्सों को बदलें जिन्हें React अपडेट करने का कोई कारण नहीं है।

</Recap>



<Challenges>

#### वीडियो को प्ले और पॉज करें

इस उदाहरण में, बटन एक राज्य वेरिएबल को टॉगल करता है ताकि यह प्ले और पॉज्ड स्थिति के बीच स्विच कर सके। हालांकि, वीडियो को वास्तव में प्ले या पॉज करने के लिए, केवल राज्य को टॉगल करना पर्याप्त नहीं है। आपको `<video>` के DOM तत्व पर [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) और [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) को भी कॉल करना होगा। इसके लिए इसे एक ref जोड़ें, और बटन को काम करने योग्य बनाएं।

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
  }

  return (
    <>
      <button onClick={handleClick}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <video width="250">
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

एक अतिरिक्त चुनौती के लिए, "Play" बटन को वीडियो के प्ले होने की स्थिति के साथ सिंक में रखें, भले ही उपयोगकर्ता वीडियो पर राइट-क्लिक करके और ब्राउज़र के बिल्ट-इन मीडिया कंट्रोल का उपयोग करके वीडियो को प्ले करें। ऐसा करने के लिए, आप वीडियो पर `onPlay` और `onPause` इवेंट्स को सुनना चाहेंगे।

<Solution>

एक ref घोषित करें और इसे `<video>` तत्व पर लगाएं। फिर इवेंट हैंडलर में अगले राज्य के आधार पर `ref.current.play()` और `ref.current.pause()` को कॉल करें।

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

ब्राउज़र के बिल्ट-इन कंट्रोल्स को हैंडल करने के लिए, आप `<video>` तत्व पर `onPlay` और `onPause` हैंडलर्स जोड़ सकते हैं और इनसे `setIsPlaying` को कॉल कर सकते हैं। इस तरह, अगर उपयोगकर्ता ब्राउज़र कंट्रोल्स का उपयोग करके वीडियो प्ले करता है, तो राज्य (state) इसके अनुसार समायोजित हो जाएगा।

</Solution>

#### खोज फ़ील्ड को फ़ोकस करें

इस तरह से बनाएं कि "Search" बटन पर क्लिक करने से फ़ोकस फ़ील्ड में चला जाए।

<Sandpack>

```js
export default function Page() {
  return (
    <>
      <nav>
        <button>Search</button>
      </nav>
      <input
        placeholder="Looking for something?"
      />
    </>
  );
}
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

<Solution>

इनपुट में एक रेफ जोड़ें, और DOM नोड पर `focus()` कॉल करें ताकि उसे फ़ोकस किया जा सके:

<Sandpack>

```js
import { useRef } from 'react';

export default function Page() {
  const inputRef = useRef(null);
  return (
    <>
      <nav>
        <button onClick={() => {
          inputRef.current.focus();
        }}>
          Search
        </button>
      </nav>
      <input
        ref={inputRef}
        placeholder="Looking for something?"
      />
    </>
  );
}
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

</Solution>

#### इमेज कैरोसेल को स्क्रॉल करना

इस इमेज कैरोसेल में एक "Next" बटन है जो सक्रिय इमेज को स्विच करता है। जब बटन पर क्लिक किया जाए, तो गैलरी को सक्रिय इमेज की ओर क्षैतिज रूप से स्क्रॉल करें। आपको सक्रिय इमेज के DOM नोड पर [`scrollIntoView()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) कॉल करना होगा:

```js
node.scrollIntoView({
  behavior: 'smooth',
  block: 'nearest',
  inline: 'center'
});
```

<Hint>

इस अभ्यास के लिए आपको हर इमेज के लिए एक `ref` रखने की जरूरत नहीं है। सक्रिय इमेज या पूरी लिस्ट के लिए एक `ref` होना पर्याप्त होगा। DOM को स्क्रॉल करने से पहले अपडेट करने के लिए `flushSync` का उपयोग करें।

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function CatFriends() {
  const [index, setIndex] = useState(0);
  return (
    <>
      <nav>
        <button onClick={() => {
          if (index < catList.length - 1) {
            setIndex(index + 1);
          } else {
            setIndex(0);
          }
        }}>
          Next
        </button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, i) => (
            <li key={cat.id}>
              <img
                className={
                  index === i ?
                    'active' :
                    ''
                }
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://loremflickr.com/250/200/cat?lock=' + i
  });
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

img {
  padding: 10px;
  margin: -10px;
  transition: background 0.2s linear;
}

.active {
  background: rgba(0, 100, 150, 0.4);
}
```

</Sandpack>

<Solution>

आप एक `selectedRef` घोषित कर सकते हैं, और फिर इसे केवल वर्तमान इमेज पर शर्तों के आधार पर पास कर सकते हैं:

```js
<li ref={index === i ? selectedRef : null}>
```

जब `index === i` होता है, यानी इमेज चयनित होती है, तो `<li>` को `selectedRef` प्राप्त होगा। React यह सुनिश्चित करेगा कि `selectedRef.current` हमेशा सही DOM नोड की ओर इशारा करेगा।

ध्यान दें कि `flushSync` कॉल आवश्यक है ताकि React DOM को स्क्रॉल से पहले अपडेट करने के लिए मजबूर कर सके। अन्यथा, `selectedRef.current` हमेशा पिछले चयनित आइटम की ओर इशारा करेगा।
<Sandpack>

```js
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export default function CatFriends() {
  const selectedRef = useRef(null);
  const [index, setIndex] = useState(0);

  return (
    <>
      <nav>
        <button onClick={() => {
          flushSync(() => {
            if (index < catList.length - 1) {
              setIndex(index + 1);
            } else {
              setIndex(0);
            }
          });
          selectedRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });            
        }}>
          Next
        </button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, i) => (
            <li
              key={cat.id}
              ref={index === i ?
                selectedRef :
                null
              }
            >
              <img
                className={
                  index === i ?
                    'active'
                    : ''
                }
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://loremflickr.com/250/200/cat?lock=' + i
  });
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

img {
  padding: 10px;
  margin: -10px;
  transition: background 0.2s linear;
}

.active {
  background: rgba(0, 100, 150, 0.4);
}
```

</Sandpack>

</Solution>

#### अलग-अलग घटकों के साथ सर्च फील्ड पर फोकस करें

ऐसा बनाएं कि "Search" बटन पर क्लिक करने से फोकस फ़ील्ड पर आ जाए। ध्यान दें कि प्रत्येक घटक अलग-अलग फ़ाइल में परिभाषित है और इन्हें अपनी फ़ाइल से बाहर नहीं ले जाया जाना चाहिए। आप इन्हें एक साथ कैसे जोड़ेंगे?

<Hint>

आपको `forwardRef` की आवश्यकता होगी ताकि आप अपने घटक जैसे `SearchInput` से एक DOM नोड को बाहर एक्सपोज़ कर सकें।

</Hint>

<Sandpack>

```js src/App.js
import SearchButton from './SearchButton.js';
import SearchInput from './SearchInput.js';

export default function Page() {
  return (
    <>
      <nav>
        <SearchButton />
      </nav>
      <SearchInput />
    </>
  );
}
```

```js src/SearchButton.js
export default function SearchButton() {
  return (
    <button>
      Search
    </button>
  );
}
```

```js src/SearchInput.js
export default function SearchInput() {
  return (
    <input
      placeholder="Looking for something?"
    />
  );
}
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

<Solution>

आपको `SearchButton` में एक `onClick` प्रॉप जोड़ने की आवश्यकता होगी, और `SearchButton` को इसे ब्राउज़र `<button>` पर पास करना होगा। आप एक ref को `<SearchInput>` में भी पास करेंगे, जो इसे असली `<input>` तक अग्रेषित करेगा और उसे आबाद करेगा। अंत में, क्लिक हैंडलर में, आप उस ref के अंदर संग्रहीत DOM नोड पर `focus` कॉल करेंगे।

<Sandpack>

```js src/App.js
import { useRef } from 'react';
import SearchButton from './SearchButton.js';
import SearchInput from './SearchInput.js';

export default function Page() {
  const inputRef = useRef(null);
  return (
    <>
      <nav>
        <SearchButton onClick={() => {
          inputRef.current.focus();
        }} />
      </nav>
      <SearchInput ref={inputRef} />
    </>
  );
}
```

```js src/SearchButton.js
export default function SearchButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Search
    </button>
  );
}
```

```js src/SearchInput.js
import { forwardRef } from 'react';

export default forwardRef(
  function SearchInput(props, ref) {
    return (
      <input
        ref={ref}
        placeholder="Looking for something?"
      />
    );
  }
);
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

</Solution>

</Challenges>
