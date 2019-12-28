---
id: hooks-state
title: Using the State Hook
permalink: docs/hooks-state.html
next: hooks-effect.html
prev: hooks-overview.html
---

React 16.8 में *Hooks* एक नया ऐडीशं है। ये आपको बिना class लिखे state और React की अन्य सुविधाओं का उपयोग करने देते हैं।

[इंट्रोडक्शन पृष्ठ](/docs/hooks-intro.html) ने Hooks से परिचित कराने के लिए इस उदाहरण का उपयोग किया है:

```js{4-5}
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

हम इस कोड की तुलना एक समान class उदाहरण से करके Hooks के बारे में सीखना शुरू करेंगे।

## एक्विवैलेन्ट Class उदाहरण {#equivalent-class-example}

यदि आपने पहले React में classes इस्तेमाल की हैं, तो यह कोड परिचित लगना चाहिए:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

state `{ count: 0 }` के रूप में शुरू होता है, और जब यूजर बटन को क्लिक करता है तब हम `this.setState()` को कॉल करके `state.count` को बढ़ाते हैं। हम पूरे पृष्ठ में इस class के स्निपेट का उपयोग करेंगे।

>नोट
>
>आप सोच रहे होंगे कि हम अधिक यथार्थवादी उदाहरण के बजाय यहां एक काउंटर का उपयोग क्यों कर रहे हैं। जबतक हम Hooks की तरफ पहला कदम बड़ा रहे हैं, यह हमें API पर ध्यान केंद्रित करने में मदद करने के लिए है।

## Hooks और फ़ंक्शन कौम्पोनॅन्टस {#hooks-and-function-components}

एक अनुस्मारक के रूप में, React में फ़ंक्शन कौम्पोनॅन्टस इस तरह दिखते हैं:

```js
const Example = (props) => {
  // You can use Hooks here!
  return <div />;
}
```

or this:

```js
function Example(props) {
  // You can use Hooks here!
  return <div />;
}
```

आप पहले इन्हें "स्टेटलेस कौम्पोनॅन्टस" के रूप में जानते होंगे। अब हम इनमें से React state का उपयोग करने की क्षमता का परिचय दे रहे हैं, इसलिए अब हम इन्हे "फ़ंक्शन कौम्पोनॅन्टस" कहना पसंद करते हैं।

Hooks classes के अंदर काम **नहीं** करते हैं। लेकिन आप classes को लिखने के बजाय इनका उपयोग कर सकते हैं।

## क्या है एक Hook? {#whats-a-hook}

हमारा नया उदाहरण React से `useState` Hook के आयात से शुरू होता है:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**क्या है एक Hook?** Hook एक विशेष फ़ंक्शन है जो आपको React के फीचर्स "में हुक" करने देता है। उदाहरण के लिए, `useState` एक ऐसा Hook है जो आपके फ़ंक्शन कौम्पोनॅन्टस में React state जोड़ने देता है। हम अन्य Hooks के बारे में बाद में सीखेंगे।

**मैं एक Hook का उपयोग कब करूंगा?** यदि आप एक फ़ंक्शन कौम्पोनॅन्ट लिखते हैं और महसूस करते हैं कि आपको इसमें कुछ state जोड़ने की आवश्यकता है, तो पहले आपको इसे एक class में बदलना पड़ता। अब आप मौजूदा फ़ंक्शन कौम्पोनॅन्ट के अंदर एक Hook का उपयोग कर सकते हैं। हम अभी ऐसा ही करने जा रहे हैं!

>Note:
>
>कुछ विशेष नियम हैं जो बताते है की आप किस कौम्पोनॅन्ट के भीतर Hooks का उपयोग कर सकते हैं और किस में नहीं कर सकते हैं। हम उन्हें [Hooks के नियमों](/docs/hooks-rules.html) में सीखेंगे।

## एक State वेरिएबल घोषित करना {#declaring-a-state-variable}

एक class में, constructor में हम `this.state` को `{ count: 0 }` सेट कर के `count` state को `0` इनिशियलाइज़ करते हैं:

```js{4-6}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

एक फ़ंक्शन कौम्पोनॅन्ट में, हमारे पास `this` नहीं है, इसलिए हम `this.state` को असाइन नहीं कर सकते हैं और न ही इसे पढ़ सकते हैं। इसके बजाय, हम सीधे हमारे कौम्पोनॅन्ट के अंदर `useState` Hook को कॉल करते हैं:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
```

**कॉलिंग `useState` क्या करता है?** यह एक "state वेरिएबल" घोषित करता है। हमारे वेरिएबल को `count` कहा जाता है लेकिन हम इसे कुछ और भी कह सकते हैं जैसे की `banana`। यह फ़ंक्शन कॉल के बीच कुछ वैल्यूज को "संरक्षित" करने का एक तरीका है - `useState` एक class में `this.state` दवारा प्रदान की क्षमताओं को उपयोग करने का एक नया तरीका है। आम तौर पर, फ़ंक्शन के ख़तम होने पर वेरिएबल्स "गायब" हो जाते हैं, लेकिन state वेरिएबल्स React द्वारा संरक्षित होते हैं।

**हम `useState` को एक आर्गुमेंट के रूप में क्या पास करते हैं?** `useState()` Hook के लिए initial state एकमात्र आर्गुमेंट है। classes के विपरीत, state को एक object होना आवश्यक नहीं है। अगर हमें आवश्यकता है तो हम एक संख्या या एक स्ट्रिंग रख सकते हैं। हमारे उदाहरण में, हम केवल एक संख्या चाहते हैं कि कितनी बार उपयोगकर्ता ने क्लिक किया, इसलिए हमारे वेरिएबल के लिए initial state के रूप में `0` पास करें। (यदि हम state में दो अलग-अलग वैल्यूज को संग्रहीत करना चाहते हैं, तो हम दो बार `useState()` का उपयोग करेंगे।)

**`useState` क्या return करता है?** यह वैल्यूज की एक जोड़ी return करता है: current state और एक फ़ंक्शन जो इसे अपडेट करता है। यही कारण है कि हम `const [count, setCount] = useState()` लिखते हैं। यह class के `this.state.count` और `this.setState` के समान है, सिवाय इसके कि आप को ये एक जोड़ी में मिले हैं। यदि आप हमारे द्वारा उपयोग किए गए सिंटेक्स से परिचित नहीं हैं, तो हम इस पर [पृष्ठ के अंत भाग में](/docs/hooks-state.html#tip-what-do-square-brackets-mean) वापस आएंगे।

अब जब हम जानते हैं कि `useState` Hook क्या करता है, तो हमारे उदाहरण और अधिक समझ में आना चाहिए:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
```

हम `count` नामक एक state वेरिएबल घोषित करते हैं, और इसे `0` पर सेट करते हैं। React री-रेंडरर्स के बीच इसकी मौजूदा वैल्यू को याद रखेगा, और हमारे फ़ंक्शन को सबसे हाल ही की वैल्यू प्रदान करेगा। यदि हम current `count` को अपडेट करना चाहते हैं, तो हम `setCount` को कॉल कर सकते हैं।

>ध्यान दें
>
>आप सोच रहे होंगे: क्यों `useState` को `createState` नाम नहीं दिया गया है?
>
>"Create" बहुत सटीक नहीं होगा क्योंकि state केवल हमारे कौम्पोनॅन्ट के पहली बार रेंडर पर बनाता है। अगले रेंडर्स के दौरान, `useState` हमें वर्तमान स्थिति देता है। अन्यथा यह बिल्कुल भी "state" नहीं होगा! Hook नाम हमेशा `use` से शुरू होने का एक कारण है। हम बाद में [Hooks के नियमों](/docs/hooks-rules.html) में सीखेंगे क्यों।

## रीडिंग State {#reading-state}

जब हम एक class में वर्तमान count प्रदर्शित करना चाहते हैं, तो हम `this.state.count` को पढ़ते हैं:

```js
  <p>You clicked {this.state.count} times</p>
```

एक फ़ंक्शन में, हम सीधे `count` का उपयोग कर सकते हैं:


```js
  <p>You clicked {count} times</p>
```

## अपडेटिंग State {#updating-state}

एक class में, हमें `count` state को अपडेट करने के लिए `this.setState()` को कॉल करने की आवश्यकता होती है:

```js{1}
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>
```

एक फ़ंक्शन में, `setCount` और `count` पहले से ही हमारे पास वेरिएबल्स के रूप है, इसलिए हमें `this` की आवश्यकता नहीं है:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    Click me
  </button>
```

## Recap {#recap}

चलिए अब जो **हमने सीखा है उसे लाइन से फिर से पढ़ते हैं** और अपनी समझ की जाँच करते हैं।

<!--
  I'm not proud of this line markup. Please somebody fix this.
  But if GitHub got away with it for years we can cheat.
-->
```js{1,4,9}
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```

* **Line 1:** हम React से `useState` Hook हुक का import करते हैं। यह हमें फंक्शन कौम्पोनॅन्ट में लोकल state रखने की सुविधा देता है।
* **Line 4:** `Example` कौम्पोनॅन्ट के अंदर, हम `useState` Hook को कॉल करके एक नया state वेरिएबल घोषित करते हैं। यह एक जोड़ी वैल्यूज लौटाता है, जिसे हम नाम देते हैं। हम अपनी वेरिएबल `count` को बुला रहे हैं क्योंकि यह बटन क्लिकों की संख्या रखती है। हम `useState` में केवल `0` को आर्गुमेंट के रूप में पास करके इसे शून्य पर इनिशियलाइज़ करते हैं। दूसरा लौटा आइटम स्वयं एक फ़ंक्शन है। इससे हम `count` को अपडेट कर सकते हैं इसलिए हम इसे `setCount` नाम देते हैं।
* **Line 9:** जब उपयोगकर्ता क्लिक करता है, हम एक नए वैल्यू के साथ `setCount` को कॉल करते हैं। React तब `Example` कौम्पोनॅन्ट को फिर से री-रेंडर करेगी, नई `count` वैल्यू को पास करके।

यह पहली बार में समझने के लिए बहुत कुछ लग सकता है। इसे जल्दी मत करो! यदि आप स्पष्टीकरण में खो गए हैं, तो ऊपर दिए गए कोड को फिर से देखें और इसे ऊपर से नीचे तक पढ़ने की कोशिश करें। हम वादा करते हैं कि जब आप state classes में कैसे काम करता है को एक बार "भूलकर", इस कोड को दोबारा से देखेंगे, तो यह आपको समझ में आएगा।

### टिप: स्क्वायर ब्रैकेट्स का क्या मतलब है? {#tip-what-do-square-brackets-mean}

जब हमने state वेरिएबल घोषित किया तो आपने स्क्वायर ब्रैकेट्स देखे होंगे:

```js
  const [count, setCount] = useState(0);
```

बाईं ओर के नाम React API का एक हिस्सा नहीं हैं। आप state वेरिएबल्स को अपने स्वयं के नाम दे सकते हैं:

```js
  const [fruit, setFruit] = useState('banana');
```

इस जावास्क्रिप्ट सिंटैक्स को ["array destructuring"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) कहा जाता है। इसका मतलब है कि हम दो नए वेरिएबल्स `fruit` और `setFruit` बना रहे हैं, जहाँ `fruit` को `useState` के दवारा लौटाए गए पहले वैल्यू पर सेट किया जाता है, और `setFruit` को दूसरे पर। यह इस कोड के बराबर है:

```js
  var fruitStateVariable = useState('banana'); // Returns a pair
  var fruit = fruitStateVariable[0]; // First item in a pair
  var setFruit = fruitStateVariable[1]; // Second item in a pair
```

जब हम `useState` के साथ एक state वैरिएबल घोषित करते हैं, तो यह एक जोड़ी देता है - दो आइटम का array। पहला आइटम वर्तमान वैल्यू है, और दूसरा एक फ़ंक्शन है जो हमें इसे अपडेट करने देता है। उन्हें एक्सेस करने के लिए `[0]` और `[1]` का उपयोग करना थोड़ा भ्रामक है क्योंकि उनका एक विशिष्ट अर्थ है। यही कारण है कि हम इसके बजाय array destructuring का उपयोग करते हैं।

>ध्यान दें
>
>आप उत्सुक हो सकते हैं कि कैसे React जानता है कि कौन सा कौम्पोनॅन्ट `useState` से मेल खाता है क्योंकि हम `this` की तरह का कुछ भी React में पास नहीं कर रहे हैं। हम FAQ अनुभाग में [इस सवाल](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) का जवाब देंगे और कई अन्य परशनो का भी।

### टिप: एकाधिक State वेरिएबल्स का उपयोग करना {#tip-using-multiple-state-variables}

state के वेरिएबल्स को एक जोड़ी के रूप में `[something, setSomething]` घोषित करना भी सुविधाजनक है क्योंकि यह हमें अलग-अलग state वेरिएबल्स को *अलग* नाम देने देता है यदि हम एक से अधिक का उपयोग करना चाहते हैं:

```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

उपरोक्त कौम्पोनॅन्ट में, हमारे पास स्थानीय वेरिएबल्स के रूप में `age`, `fruit`, और `todos` हैं, और हम उन्हें व्यक्तिगत रूप से अपडेट कर सकते हैं:

```js
  function handleOrangeClick() {
    // Similar to this.setState({ fruit: 'orange' })
    setFruit('orange');
  }
```

आपको कई state वेरिएबल्स का उपयोग **नहीं करना होगा**। State वेरिएबल्स में objects और arrays को भी रखा जा सकता हैं, इसलिए आप अभी भी संबंधित डेटा को एक साथ समूहित कर सकते हैं। हालाँकि, एक class के `this.setState` के विपरीत, एक state वैरिएबल को अपडेट करना उसे मर्ज करने के बजाय हमेशा उसे बदल देता है।

हम [FAQ में](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables) स्वतंत्र state वेरिएबल्स को विभाजित करने के लिए अधिक सिफारिशें प्रदान करते हैं।

## अगला कदम {#next-steps}

इस पृष्ठ पर हमने React द्वारा प्रदान किए गए Hooks में से एक के बारे में सीखा, जिसे `useState` कहा जाता है। हम कभी-कभी इसे "State Hook" के रूप में भी संदर्भित करेंगे। यह हमें React फ़ंक्शन कौम्पोनॅन्ट्स में लोकल state जोड़ने देता है - जो हमने पहली बार किया है!

Hooks क्या हैं इसके बारे में हमने थोड़ा और सीखा। Hooks ऐसे फ़ंक्शन हैं जो आपको फ़ंक्शन कौम्पोनॅन्ट्स में React फीचर्स "hook इन" करने देते हैं। उनके नाम हमेशा `use` के साथ शुरू होते हैं, और ऐसे कई Hooks हैं जिन्हें हमने अभी तक नहीं देखा है।

**अब इसे जारी रखते हुए [अगले Hook सीखे: `useEffect`।](/docs/hooks-effect.html)** यह आपको कौम्पोनॅन्ट्स में साइड इफेक्ट्स करने देता है, और यह classes में lifecycle मेथड्स के समान है।
