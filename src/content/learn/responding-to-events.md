---
title: Events पर प्रतिक्रिया देना
---

<Intro>

React आपको अपने JSX में *event handler* डालने की सुविधा देता है। Event handler आपकी स्वयं की फंक्शन्स होती हैं, जिन्हें क्लिक करना, होवर करना, फॉर्म इनपुट्स को फोकस करना आदि जैसी इंटरैक्शंस पर प्रतिक्रिया स्वरूप ट्रिगर किया जाता है।

</Intro>

<YouWillLearn>

* Event handler लिखने के विभिन्न तरीके
* पैरेंट कौम्पोनॅन्ट से event handling लॉजिक को पास करने का तरीका
* Events का प्रचार कैसे होता है और इसे कैसे रोका जा सकता है

</YouWillLearn>

## Event handler डालना {/*adding-event-handlers*/}

Event handler जोड़ने के लिए, पहले एक फंक्शन को परिभाषित करें और फिर उसे props के रूप में पास करें उपयुक्त JSX टैग में। उदाहरण के लिए, यहाँ एक बटन है जो अभी कुछ नहीं करता है:

<Sandpack>

```js
export default function Button() {
  return (
    <button>
      I don't do anything
    </button>
  );
}
```

</Sandpack>

आप उपयोगकर्ता द्वारा क्लिक करने पर संदेश दिखाने के लिए निम्न तीन चरणों का पालन कर सकते हैं:

1. अपने `Button` कौम्पोनॅन्ट के *अंदर* `handleClick` नाम का एक फंक्शन घोषित करें।
2. उस फंक्शन के अंदर लॉजिक को लागू करें (संदेश दिखाने के लिए `alert` का उपयोग करें)।
3. `<button>` JSX में `onClick={handleClick}` जोड़ें।

<Sandpack>

```js
export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>


आपने `handleClick` फंक्शन को परिभाषित किया और फिर इसे [props के रूप में पास किया](/learn/passing-props-to-a-component) `<button>` में। `handleClick` एक **event handler** है। Event हैंडलर फंक्शन्स:

* आमतौर पर *अंदर* आपके कौम्पोनॅन्ट्स के परिभाषित होते हैं।
* उनके नाम `handle` से शुरू होते हैं, इसके बाद event का नाम आता है।

परंपरा के अनुसार, event handlers को `handle` और event के नाम के बाद नामित करना सामान्य है। आप अक्सर `onClick={handleClick}`, `onMouseEnter={handleMouseEnter}`, आदि देखते हैं।

वैकल्पिक रूप से, आप JSX में event handler को इनलाइन भी परिभाषित कर सकते हैं:


```jsx
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```

या, अधिक संक्षेप में, एरो फंक्शन का उपयोग करते हुए:

```jsx
<button onClick={() => {
  alert('You clicked me!');
}}>
```

इन सभी स्टाइल्स समकक्ष हैं। इनलाइन event handlers छोटे फंक्शन्स के लिए सुविधाजनक होते हैं।


<Pitfall>

Event handlers में पास की गई फंक्शन्स को पास किया जाना चाहिए, न कि कॉल किया जाना चाहिए। उदाहरण के लिए:

| फंक्शन पास करना (सही)               | फंक्शन कॉल करना (गलत)               |
| ------------------------------------ | ---------------------------------- |
| `<button onClick={handleClick}>`     | `<button onClick={handleClick()}>` |

अंतर सूक्ष्म है। पहले उदाहरण में, `handleClick` फंक्शन को `onClick` event handler के रूप में पास किया गया है। यह React को इसे याद रखने और तब कॉल करने का कहता है जब उपयोगकर्ता बटन पर क्लिक करता है।

दूसरे उदाहरण में, `handleClick()` के अंत में `()` फंक्शन को *तत्काल* [रेंडरिंग](/learn/render-and-commit) के दौरान कॉल कर देता है, बिना किसी क्लिक के। इसका कारण यह है कि [JSX `{` और `}`](/learn/javascript-in-jsx-with-curly-braces) के अंदर जावास्क्रिप्ट तुरंत निष्पादित होता है।

जब आप इनलाइन कोड लिखते हैं, तो वही खतरा एक अलग तरीके से सामने आता है:

| फंक्शन पास करना (सही)                        | फंक्शन कॉल करना (गलत)            |
| --------------------------------------------- | --------------------------------- |
| `<button onClick={() => alert('...')}>`      | `<button onClick={alert('...')}>` |

इस तरह से इनलाइन कोड पास करना क्लिक पर फायर नहीं करेगा—यह हर बार जब कौम्पोनॅन्ट रेंडर होता है, तब फायर होता है:

```jsx
// यह अलर्ट तब फायर होता है जब कौम्पोनॅन्ट रेंडर होता है, न कि जब क्लिक किया जाता है!
<button onClick={alert('You clicked me!')}>
```

यदि आप अपना event handler इनलाइन परिभाषित करना चाहते हैं, तो इसे एक अनाम फंक्शन में लपेटें, जैसे:

```jsx
<button onClick={() => alert('You clicked me!')}>
```
इस कोड को हर रेंडर के दौरान निष्पादित करने के बजाय, यह एक फंक्शन बनाता है जिसे बाद में कॉल किया जाएगा।

दोनों मामलों में, जो आपको पास करना चाहिए वह एक फंक्शन है:

* `<button onClick={handleClick}>` `handleClick` फंक्शन को पास करता है।
* `<button onClick={() => alert('...')}>` `() => alert('...')` फंक्शन को पास करता है।
  
[एरो फंक्शन्स के बारे में और पढ़ें](https://javascript.info/arrow-functions-basics)

</Pitfall> 

### Event हैंडलर्स में props को पढ़ना {/*reading-props-in-event-handlers*/}

चूंकि event हैंडलर कौम्पोनॅन्ट के अंदर परिभाषित होते हैं, उन्हें कौम्पोनॅन्ट की props तक पहुंच प्राप्त होती है। यहाँ एक बटन है, जो क्लिक होने पर अपनी `message` props के साथ एक अलर्ट दिखाता है:


<Sandpack>

```js
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">
        Play Movie
      </AlertButton>
      <AlertButton message="Uploading!">
        Upload Image
      </AlertButton>
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

यह इन दो बटनों को अलग-अलग संदेश दिखाने देता है। उनके पास किए गए संदेशों को बदलकर देखें।


### Event हैंडलर्स को props के रूप में पास करना {/*passing-event-handlers-as-props*/}

अक्सर आपको पैरेंट कौम्पोनॅन्ट को बच्चे के event हैंडलर को निर्दिष्ट करने की आवश्यकता होती है। बटनों पर विचार करें: जिस स्थान पर आप `Button` कौम्पोनॅन्ट का उपयोग कर रहे हैं, वहां आप एक अलग फंक्शन चलाना चाह सकते हैं—शायद एक फिल्म चलाता है और दूसरा इमेज अपलोड करता है। 

इसके लिए, उस event हैंडलर के रूप में props को पास करें जो कौम्पोनॅन्ट अपने पैरेंट से प्राप्त करता है, जैसे कि:


<Sandpack>

```js
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Play "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>


यहाँ, `Toolbar` कौम्पोनॅन्ट एक `PlayButton` और एक `UploadButton` रेंडर करता है:

- `PlayButton` `handlePlayClick` को `onClick` props के रूप में `Button` को पास करता है।
- `UploadButton` `() => alert('Uploading!')` को `onClick` prop के रूप में `Button` को पास करता है।

अंत में, आपका `Button` कौम्पोनॅन्ट एक prop स्वीकार करता है जिसे `onClick` कहा जाता है। यह prop को सीधे बिल्ट-इन ब्राउज़र `<button>` में `onClick={onClick}` के साथ पास करता है। यह React को यह बताता है कि क्लिक पर पास किया गया फंक्शन कॉल किया जाए।

यदि आप [डिज़ाइन सिस्टम](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969) का उपयोग करते हैं, तो यह सामान्य है कि बटनों जैसे कौम्पोनॅन्ट्स में स्टाइलिंग होती है लेकिन व्यवहार निर्दिष्ट नहीं होता। इसके बजाय, `PlayButton` और `UploadButton` जैसे कौम्पोनॅन्ट्स event हैंडलर्स को पास करेंगे।


### Event हैंडलर props का नामकरण {/*naming-event-handler-props*/}

बिल्ट-इन कौम्पोनॅन्ट्स जैसे `<button>` और `<div>` केवल [ब्राउज़र event नामों](/reference/react-dom/components/common#common-props) का समर्थन करते हैं जैसे `onClick`। हालांकि, जब आप अपने खुद के कौम्पोनॅन्ट्स बना रहे होते हैं, तो आप उनके event हैंडलर props का नाम किसी भी तरीके से रख सकते हैं जो आपको पसंद हो।

परंपरा के अनुसार, event हैंडलर props को `on` से शुरू करना चाहिए, इसके बाद एक बड़ा अक्षर होना चाहिए।

उदाहरण के लिए, `Button` कौम्पोनॅन्ट के `onClick` prop को `onSmash` भी कहा जा सकता था:


<Sandpack>

```js
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onSmash={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>


इस उदाहरण में, `<button onClick={onSmash}>` यह दिखाता है कि ब्राउज़र `<button>` (लोअरकेस) को अभी भी `onClick` नामक prop की आवश्यकता होती है, लेकिन आपकी कस्टम `Button` कौम्पोनॅन्ट द्वारा प्राप्त prop का नाम आपके ऊपर है!

जब आपका कौम्पोनॅन्ट कई इंटरएक्शन्स का समर्थन करता है, तो आप event हैंडलर props को ऐप-स्पेसिफिक अवधारणाओं के लिए नाम दे सकते हैं। उदाहरण के लिए, यह `Toolbar` कौम्पोनॅन्ट `onPlayMovie` और `onUploadImage` event हैंडलर्स प्राप्त करता है:


<Sandpack>

```js
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>


ध्यान दें कि `App` कौम्पोनॅन्ट को यह जानने की आवश्यकता नहीं है कि `Toolbar` `onPlayMovie` या `onUploadImage` के साथ *क्या* करेगा। यह `Toolbar` का एक कार्यान्वयन विवरण है। यहाँ, `Toolbar` इन्हें `onClick` हैंडलर्स के रूप में अपने `Button` कौम्पोनॅन्ट्स को पास करता है, लेकिन बाद में इसे कीबोर्ड शॉर्टकट पर भी ट्रिगर किया जा सकता है। ऐप-स्पेसिफिक इंटरएक्शन्स जैसे `onPlayMovie` के आधार पर props का नामकरण आपको लचीलापन देता है कि आप बाद में इनका उपयोग कैसे करें।

  
<Note>


सुनिश्चित करें कि आप अपने event-handler के लिए उपयुक्त HTML टैग्स का उपयोग करें। उदाहरण के लिए, क्लिक हैंडल करने के लिए [`<button onClick={handleClick}>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) का उपयोग करें, न कि `<div onClick={handleClick}>`। एक वास्तविक ब्राउज़र `<button>` का उपयोग करने से कीबोर्ड नेविगेशन जैसी बिल्ट-इन ब्राउज़र विशेषताएँ सक्षम होती हैं। यदि आपको बटन की डिफ़ॉल्ट ब्राउज़र स्टाइलिंग पसंद नहीं है और आप इसे लिंक या किसी अन्य UI एलिमेंट की तरह दिखाना चाहते हैं, तो आप इसे CSS के साथ प्राप्त कर सकते हैं। [सुलभ मार्कअप लिखने के बारे में अधिक जानें।](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)

  
</Note>


## Event प्रचारण {/*event-propagation*/}

Event handler आपके कौम्पोनॅन्ट के किसी भी बच्चे से event को भी पकड़ेंगे। हम कहते हैं कि एक event "बबल्स" या "प्रचारित" होती है: यह उस स्थान से शुरू होती है जहाँ event हुआ था, और फिर पेड़ (ट्री) में ऊपर की ओर जाती है।

यह `<div>` दो बटनों को शामिल करता है। `<div>` *और* प्रत्येक बटन के अपने-अपने `onClick` हैंडलर्स होते हैं। क्या आपको लगता है कि जब आप बटन पर क्लिक करेंगे, तो कौन से हैंडलर्स फायर होंगे?


<Sandpack>

```js
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}
```

```css
.Toolbar {
  background: #aaa;
  padding: 5px;
}
button { margin: 5px; }
```

</Sandpack>


यदि आप किसी भी बटन पर क्लिक करते हैं, तो उसका `onClick` पहले चलेगा, फिर पैरेंट `<div>` का `onClick` चलेगा। इसलिए दो संदेश दिखाई देंगे। अगर आप स्वयं टूलबार पर क्लिक करते हैं, तो केवल पैरेंट `<div>` का `onClick` चलेगा।

<Pitfall>

सभी events्स React में प्रचारित होते हैं, सिवाय `onScroll` के, जो केवल उसी JSX टैग पर काम करता है जिसे आपने इसे अटैच किया है।

</Pitfall>


### प्रचारण को रोकना {/*stopping-propagation*/}

Event handler एक **event ऑब्जेक्ट** को अपने एकमात्र आर्ग्युमेंट के रूप में प्राप्त करते हैं। परंपरा के अनुसार, इसे आमतौर पर `e` कहा जाता है, जो "event" के लिए खड़ा है। आप इस ऑब्जेक्ट का उपयोग event के बारे में जानकारी पढ़ने के लिए कर सकते हैं।

यह event ऑब्जेक्ट आपको प्रचारण को रोकने की भी अनुमति देता है। यदि आप किसी event को पैरेंट कौम्पोनॅन्ट्स तक पहुँचने से रोकना चाहते हैं, तो आपको `e.stopPropagation()` कॉल करना होगा, जैसे कि यह `Button` कौम्पोनॅन्ट करता है:


<Sandpack>

```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

```css
.Toolbar {
  background: #aaa;
  padding: 5px;
}
button { margin: 5px; }
```

</Sandpack>

जब आप किसी बटन पर क्लिक करते हैं:

1. React `<button>` को पास किए गए `onClick` हैंडलर को कॉल करता है।
2. वह हैंडलर, जो `Button` में परिभाषित है, निम्नलिखित करता है:
   * `e.stopPropagation()` को कॉल करता है, जिससे event का बबलिंग आगे नहीं बढ़ता।
   * `onClick` फंक्शन को कॉल करता है, जो `Toolbar` कौम्पोनॅन्ट से पास की गई एक prop है।
3. वह फंक्शन, जो `Toolbar` कौम्पोनॅन्ट में परिभाषित है, बटन का अपना अलर्ट दिखाता है।
4. चूंकि प्रचारण को रोका गया था, पैरेंट `<div>` का `onClick` हैंडलर *नहीं* चलेगा।

`e.stopPropagation()` के परिणामस्वरूप, बटन पर क्लिक करने से अब केवल एक ही अलर्ट (जो `<button>` से आता है) दिखाई देता है, न कि दोनों (जो `<button>` और पैरेंट टूलबार `<div>` से आते थे)। बटन पर क्लिक करना और आसपास के टूलबार पर क्लिक करना एक जैसा नहीं है, इसलिए प्रचारण को रोकना इस UI के लिए उचित है।


<DeepDive>

#### कैप्चर चरण events {/*capture-phase-events*/}

कभी-कभी, आपको बच्चों के तत्वों पर सभी events को पकड़ने की आवश्यकता हो सकती है, *यहाँ तक कि अगर उन्होंने प्रचारण को रोक दिया हो*। उदाहरण के लिए, हो सकता है कि आप हर क्लिक को एनालिटिक्स में लॉग करना चाहते हों, चाहे प्रचारण लॉजिक कुछ भी हो। आप यह `Capture` को event नाम के अंत में जोड़कर कर सकते हैं:


```js
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

प्रत्येक event तीन चरणों में प्रचारित होता है:

1. यह नीचे की ओर यात्रा करता है, सभी `onClickCapture` हैंडलर्स को कॉल करता है।
2. यह क्लिक किए गए तत्व का `onClick` हैंडलर चलाता है।
3. यह ऊपर की ओर यात्रा करता है, सभी `onClick` हैंडलर्स को कॉल करता है।

कैप्चर events राउटर्स या एनालिटिक्स जैसे कोड के लिए उपयोगी होते हैं, लेकिन आप इन्हें ऐप कोड में शायद ही कभी उपयोग करेंगे।


</DeepDive>

### प्रचारण के विकल्प के रूप में हैंडलर्स को पास करना {/*passing-handlers-as-alternative-to-propagation*/}

ध्यान दें कि कैसे यह क्लिक हैंडलर एक लाइन का कोड चलाता है _और फिर_ पैरेंट द्वारा पास किए गए `onClick` prop को कॉल करता है:


```js {4,5}
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

आप इस हैंडलर में पैरेंट के `onClick` event handler को कॉल करने से पहले और भी कोड जोड़ सकते हैं। यह पैटर्न प्रचारण का एक *विकल्प* प्रदान करता है। यह बच्चे के कौम्पोनॅन्ट को event को संभालने देता है, जबकि पैरेंट कौम्पोनॅन्ट को कुछ अतिरिक्त व्यवहार निर्दिष्ट करने की अनुमति देता है। प्रचारण के विपरीत, यह स्वचालित नहीं होता है। लेकिन इस पैटर्न का लाभ यह है कि आप उस पूरी कोड चेन को स्पष्ट रूप से देख सकते हैं जो किसी event के परिणामस्वरूप निष्पादित होती है।

अगर आप प्रचारण पर निर्भर हैं और यह ट्रेस करना मुश्किल हो कि कौन से हैंडलर्स निष्पादित होते हैं और क्यों, तो इसके बजाय यह तरीका आजमाएं।


### डिफ़ॉल्ट व्यवहार को रोकना {/*preventing-default-behavior*/}

कुछ ब्राउज़र events के साथ डिफ़ॉल्ट व्यवहार जुड़ा होता है। उदाहरण के लिए, एक `<form>` सबमिट event, जो तब होता है जब इसके अंदर एक बटन पर क्लिक किया जाता है, डिफ़ॉल्ट रूप से पूरी पेज को रीलोड कर देता है:

<Sandpack>

```js
export default function Signup() {
  return (
    <form onSubmit={() => alert('Submitting!')}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

आप `e.preventDefault()` को event ऑब्जेक्ट पर कॉल कर सकते हैं ताकि इस प्रक्रिया को रुकवाया जा सके:

<Sandpack>

```js
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

`e.stopPropagation()` और `e.preventDefault()` को भ्रमित न करें। ये दोनों उपयोगी होते हैं, लेकिन अप्रत्याशित होते हैं:

* [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) event handler को ऊपर के टैग्स से फायर होने से रोकता है।
* [`e.preventDefault()`](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) कुछ events के लिए डिफ़ॉल्ट ब्राउज़र व्यवहार को रोकता है जिनके पास यह व्यवहार होता है।



## क्या event handlers में साइड इफेक्ट्स हो सकते हैं? {/*can-event-handlers-have-side-effects*/}

बिल्कुल! event handlers साइड इफेक्ट्स के लिए सबसे अच्छा स्थान होते हैं।

रेंडरिंग फंक्शन्स के विपरीत, event handlers को [प्योर](/learn/keeping-components-pure) होने की आवश्यकता नहीं होती, इसलिए यह कुछ *बदलने* के लिए एक बेहतरीन स्थान है—उदाहरण के लिए, टाइपिंग के जवाब में इनपुट के मान को बदलना, या बटन दबाने पर सूची को बदलना। हालांकि, कुछ जानकारी बदलने के लिए, आपको पहले इसे स्टोर करने का कोई तरीका चाहिए। React में, यह [state, एक कौम्पोनॅन्ट की मेमोरी](/learn/state-a-components-memory) का उपयोग करके किया जाता है। आप इसके बारे में अगली पेज पर सब कुछ सीखेंगे।
<Recap>

* आप events को एक फंक्शन को props के रूप में किसी एलिमेंट् जैसे `<button>` में पास करके हैंडल कर सकते हैं।
* Event handlers को पास किया जाना चाहिए, **न कि कॉल किया जाना चाहिए!** `onClick={handleClick}`, न कि `onClick={handleClick()}`।
* आप event handler फंक्शन को अलग से या इनलाइन परिभाषित कर सकते हैं।
* Event handler एक कौम्पोनॅन्ट के अंदर परिभाषित होते हैं, इसलिए ये props तक पहुंच सकते हैं।
* आप एक पैरेंट में event handler डिक्लेयर कर सकते हैं और इसे चाइल्ड को props के रूप में पास कर सकते हैं।
* आप अपने खुद के event handler props को ऐप्लिकेशन-विशिष्ट नामों के साथ परिभाषित कर सकते हैं।
* Events ऊपर की ओर प्रचारित होते हैं। इसे रोकने के लिए पहले आर्गुमेंट पर `e.stopPropagation()` कॉल करें।
* Events के पास अवांछित डिफ़ॉल्ट ब्राउज़र व्यवहार हो सकता है। इसे रोकने के लिए `e.preventDefault()` कॉल करें।
* एक चाइल्ड हैंडलर से event handler props को स्पष्ट रूप से कॉल करना प्रचारण के एक अच्छे विकल्प के रूप में काम करता है।


</Recap>



<Challenges>

#### एक event handler को ठीक करना {/*fix-an-event-handler*/}

इस बटन पर क्लिक करने से पेज का बैकग्राउंड सफेद और काला के बीच स्विच होना चाहिए। हालांकि, जब आप इसे क्लिक करते हैं, तो कुछ भी नहीं होता। समस्या को ठीक करें। (चिंता न करें, `handleClick` के अंदर की लॉजिक सही है—वह हिस्सा ठीक है।)


<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick()}>
      Toggle the lights
    </button>
  );
}
```

</Sandpack>

<Solution>

समस्या यह है कि `<button onClick={handleClick()}>` event handler को रेंडर करते समय _कॉल_ करता है, बजाय इसे _पास_ करने के। `()` कॉल को हटाकर `<button onClick={handleClick}>` कर देने से यह समस्या ठीक हो जाती है:

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick}>
      Toggle the lights
    </button>
  );
}
```

</Sandpack>

वैकल्पिक रूप से, आप कॉल को एक अन्य फंक्शन में लपेट सकते हैं, जैसे `<button onClick={() => handleClick()}>`:

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={() => handleClick()}>
      Toggle the lights
    </button>
  );
}
```

</Sandpack>

</Solution>

#### Events को कनेक्ट करना {/*wire-up-the-events*/}

यह `ColorSwitch` कौम्पोनॅन्ट एक बटन रेंडर करता है। इसका उद्देश्य पेज का रंग बदलना है। इसे पैरेंट से प्राप्त `onChangeColor` event handler prop से कनेक्ट करें ताकि बटन पर क्लिक करने से रंग बदल जाए।

इसके बाद, ध्यान दें कि बटन पर क्लिक करने से पेज का क्लिक काउंटर भी बढ़ जाता है। आपका सहकर्मी, जिसने पैरेंट कौम्पोनॅन्ट लिखा है, का कहना है कि `onChangeColor` काउंटर नहीं बढ़ाता है। और क्या हो सकता है? इसे ठीक करें ताकि बटन पर क्लिक करने से केवल रंग बदले, और काउंटर न बढ़े।


<Sandpack>

```js src/ColorSwitch.js active
export default function ColorSwitch({
  onChangeColor
}) {
  return (
    <button>
      Change color
    </button>
  );
}
```

```js src/App.js hidden
import { useState } from 'react';
import ColorSwitch from './ColorSwitch.js';

export default function App() {
  const [clicks, setClicks] = useState(0);

  function handleClickOutside() {
    setClicks(c => c + 1);
  }

  function getRandomLightColor() {
    let r = 150 + Math.round(100 * Math.random());
    let g = 150 + Math.round(100 * Math.random());
    let b = 150 + Math.round(100 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleChangeColor() {
    let bodyStyle = document.body.style;
    bodyStyle.backgroundColor = getRandomLightColor();
  }

  return (
    <div style={{ width: '100%', height: '100%' }} onClick={handleClickOutside}>
      <ColorSwitch onChangeColor={handleChangeColor} />
      <br />
      <br />
      <h2>Clicks on the page: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>

<Solution>

पहले, आपको event handler जोड़ने की आवश्यकता है, जैसे `<button onClick={onChangeColor}>`।

हालांकि, इससे काउंटर के बढ़ने की समस्या उत्पन्न होती है। अगर `onChangeColor` ऐसा नहीं करता, जैसा कि आपके सहकर्मी का कहना है, तो समस्या यह है कि यह event ऊपर की ओर प्रचारित हो रहा है, और इसके ऊपर कोई हैंडलर इसे कर रहा है। इस समस्या को हल करने के लिए, आपको प्रचारण को रोकने की आवश्यकता है। लेकिन यह न भूलें कि आपको `onChangeColor` को अभी भी कॉल करना चाहिए।


<Sandpack>

```js src/ColorSwitch.js active
export default function ColorSwitch({
  onChangeColor
}) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onChangeColor();
    }}>
      Change color
    </button>
  );
}
```

```js src/App.js hidden
import { useState } from 'react';
import ColorSwitch from './ColorSwitch.js';

export default function App() {
  const [clicks, setClicks] = useState(0);

  function handleClickOutside() {
    setClicks(c => c + 1);
  }

  function getRandomLightColor() {
    let r = 150 + Math.round(100 * Math.random());
    let g = 150 + Math.round(100 * Math.random());
    let b = 150 + Math.round(100 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleChangeColor() {
    let bodyStyle = document.body.style;
    bodyStyle.backgroundColor = getRandomLightColor();
  }

  return (
    <div style={{ width: '100%', height: '100%' }} onClick={handleClickOutside}>
      <ColorSwitch onChangeColor={handleChangeColor} />
      <br />
      <br />
      <h2>Clicks on the page: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
