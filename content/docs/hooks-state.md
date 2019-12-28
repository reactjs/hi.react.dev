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

Let's now **recap what we learned line by line** and check our understanding.

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

* **Line 1:** We import the `useState` Hook from React. It lets us keep local state in a function component.
* **Line 4:** Inside the `Example` component, we declare a new state variable by calling the `useState` Hook. It returns a pair of values, to which we give names. We're calling our variable `count` because it holds the number of button clicks. We initialize it to zero by passing `0` as the only `useState` argument. The second returned item is itself a function. It lets us update the `count` so we'll name it `setCount`.
* **Line 9:** When the user clicks, we call `setCount` with a new value. React will then re-render the `Example` component, passing the new `count` value to it.

This might seem like a lot to take in at first. Don't rush it! If you're lost in the explanation, look at the code above again and try to read it from top to bottom. We promise that once you try to "forget" how state works in classes, and look at this code with fresh eyes, it will make sense.

### Tip: What Do Square Brackets Mean? {#tip-what-do-square-brackets-mean}

You might have noticed the square brackets when we declare a state variable:

```js
  const [count, setCount] = useState(0);
```

The names on the left aren't a part of the React API. You can name your own state variables:

```js
  const [fruit, setFruit] = useState('banana');
```

This JavaScript syntax is called ["array destructuring"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring). It means that we're making two new variables `fruit` and `setFruit`, where `fruit` is set to the first value returned by `useState`, and `setFruit` is the second. It is equivalent to this code:

```js
  var fruitStateVariable = useState('banana'); // Returns a pair
  var fruit = fruitStateVariable[0]; // First item in a pair
  var setFruit = fruitStateVariable[1]; // Second item in a pair
```

When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that lets us update it. Using `[0]` and `[1]` to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

>Note
>
>You might be curious how React knows which component `useState` corresponds to since we're not passing anything like `this` back to React. We'll answer [this question](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) and many others in the FAQ section.

### Tip: Using Multiple State Variables {#tip-using-multiple-state-variables}

Declaring state variables as a pair of `[something, setSomething]` is also handy because it lets us give *different* names to different state variables if we want to use more than one:

```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

In the above component, we have `age`, `fruit`, and `todos` as local variables, and we can update them individually:

```js
  function handleOrangeClick() {
    // Similar to this.setState({ fruit: 'orange' })
    setFruit('orange');
  }
```

You **don't have to** use many state variables. State variables can hold objects and arrays just fine, so you can still group related data together. However, unlike `this.setState` in a class, updating a state variable always *replaces* it instead of merging it.

We provide more recommendations on splitting independent state variables [in the FAQ](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables).

## अगला कदम {#next-steps}

इस पृष्ठ पर हमने React द्वारा प्रदान किए गए Hooks में से एक के बारे में सीखा, जिसे `useState` कहा जाता है। हम कभी-कभी इसे "State Hook" के रूप में भी संदर्भित करेंगे। यह हमें React फ़ंक्शन कौम्पोनॅन्ट्स में लोकल state जोड़ने देता है - जो हमने पहली बार किया है!

Hooks क्या हैं इसके बारे में हमने थोड़ा और सीखा। Hooks ऐसे फ़ंक्शन हैं जो आपको फ़ंक्शन कौम्पोनॅन्ट्स में React फीचर्स "hook इन" करने देते हैं। उनके नाम हमेशा `use` के साथ शुरू होते हैं, और ऐसे कई Hooks हैं जिन्हें हमने अभी तक नहीं देखा है।

**अब इसे जारी रखते हुए [अगले Hook सीखे: `useEffect`।](/docs/hooks-effect.html)** यह आपको कौम्पोनॅन्ट्स में साइड इफेक्ट्स करने देता है, और यह classes में lifecycle मेथड्स के समान है।
