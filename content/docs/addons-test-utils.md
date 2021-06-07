---
id: test-utils
title: परीक्षण उपयोगिताएँ
permalink: docs/test-utils.html
layout: docs
category: Reference
---

**इम्पॉर्टिंग**

```javascript
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5, npm के द्वारा
```

## ओवरव्यू {#overview}

`ReactTestUtils` आपकी पसंद के परीक्षण फ्रेमवर्क में React कौम्पोनॅन्ट का परीक्षण करना आसान बनाता है। Facebook में हम पीड़ारहित जावास्क्रिप्ट परीक्षण के लिए [Jest](https://facebook.github.io/jest/) का उपयोग करते हैं। Jest वेबसाइट के [React ट्यूटोरियल](https://jestjs.io/docs/tutorial-react) के माध्यम से Jest के साथ शुरुआत करने का तरीका जान सकते हैं।

> नोट:
>
<<<<<<< HEAD
> हम [React Testing Library](https://testing-library.com/react) का उपयोग करने की सलाह देते हैं। ये लाइब्रेरी इस प्रकार डिज़ाइन की गई है की आप टेस्ट्स उस ही प्रकार लिखें जिस प्रकार उपयोगकर्ता उसे इस्तेमाल करेंगें।
>
> वैकल्पिक रूप से, Airbnb ने [Enzyme](https://airbnb.io/enzyme/) नामक एक परीक्षण उपयोगिता जारी की है, जो आपके React कौम्पोनॅन्ट के आउटपुट को अस्सर्ट, मैनयुपुलेट और ट्रैवर्स करना आसान बनाता है।
=======
> We recommend using [React Testing Library](https://testing-library.com/react) which is designed to enable and encourage writing tests that use your components as the end users do.
> 
> For React versions <= 16, the [Enzyme](https://airbnb.io/enzyme/) library makes it easy to assert, manipulate, and traverse your React Components' output.


>>>>>>> 68e4efcf93b6e589355f6aa3cbc3f3c811c0ad37

 - [`act()`](#act)
 - [`mockComponent()`](#mockcomponent)
 - [`isElement()`](#iselement)
 - [`isElementOfType()`](#iselementoftype)
 - [`isDOMComponent()`](#isdomcomponent)
 - [`isCompositeComponent()`](#iscompositecomponent)
 - [`isCompositeComponentWithType()`](#iscompositecomponentwithtype)
 - [`findAllInRenderedTree()`](#findallinrenderedtree)
 - [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass)
 - [`findRenderedDOMComponentWithClass()`](#findrendereddomcomponentwithclass)
 - [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag)
 - [`findRenderedDOMComponentWithTag()`](#findrendereddomcomponentwithtag)
 - [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype)
 - [`findRenderedComponentWithType()`](#findrenderedcomponentwithtype)
 - [`renderIntoDocument()`](#renderintodocument)
 - [`Simulate`](#simulate)

## संदर्भ {#reference}

### `act()` {#act}

कौम्पोनॅन्ट को पुष्टि के लिए तयार करने के लिए, उसे रेंडर व अपडेट करने वाले कोड को `act()` कॉल के अंदर सम्मिलित करें। यह आपके टेस्ट को ब्राउज़र में React जैसे काम करता है, उसके करीब लाएगा।

>नोट
>
 >यदि आप `react-test-renderer` का उपयोग करते हैं, तो यह एक `act` एक्सपोर्ट देता है जो उसी तरह से व्यवहार करता है।

उदाहरण के लिए, अगर हमारे पास यह `Counter` कौम्पोनॅन्ट है:

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.title = `आपने ${this.state.count} बार क्लिक किया`;
  }
  componentDidUpdate() {
    document.title = `आपने ${this.state.count} बार क्लिक किया`;
  }
  handleClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
  }
  render() {
    return (
      <div>
        <p>आपने ${this.state.count} बार क्लिक किया</p>
        <button onClick={this.handleClick}>
          क्लिक करें
        </button>
      </div>
    );
  }
}
```

हम इसे इस तरह से परख सकते हैं:

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('काउंटर रेंडर और अपडेट कर सकते हैं', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('आपने 0 बार क्लिक किया');
  expect(document.title).toBe('आपने 0 बार क्लिक किया');

  // Test second render and componentDidUpdate
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('आपने 1 बार क्लिक किया');
  expect(document.title).toBe('आपने 1 बार क्लिक किया');
});
```

- यह मत भूलिए कि DOM इवेंट्स भेजना सिर्फ़ तभी काम करता है जब DOM कंटेनर को `document` में ऐड किया गया हो। आप बॉयलरप्लेट कोड को कम करने के लिए [React Testing Library](https://testing-library.com/react) जैसी लाइब्रेरी का उपयोग कर सकते हैं।

- [`रेसिपी`](/docs/testing-recipes.html) डॉक्यूमेंट में उदाहरण और उपयोग के साथ `act()` कैसे बर्ताव करता है, इस पर अधिक विवरण है।

* * *

### `mockComponent()` {#mockcomponent}

```javascript
mockComponent(
  componentClass,
  [mockTagName]
)
```

एक प्रतिरूप कौम्पोनॅन्ट बनायें जो एक डमी React कौम्पोनॅन्ट के रूप में उपयोग होगा। सामान्य रूप से रेंडर करने के बजाय, कौम्पोनॅन्ट एक `<div>` (या अन्य टैग यदि `mockTagName` दिया गया है) बन जाएगा जिसके अंदर दिए गए चिल्ड्रन होंगे।

> नोट:
>
> `mockComponent()` एक लेगसी API है। हम इसके बजाय [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock) का उपयोग करने की सलाह देते हैं।

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

`true` रिटर्न करता है यदि `element` कोई React एलिमेंट है।

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

`true` रिटर्न करता है यदि `element` एक React एलिमेंट है जिसका टाइप एक React `componentClass` है।

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

`true` रिटर्न करता है यदि `instance` एक DOM कौम्पोनॅन्ट है (जैसे कि `<div>` या `<span>`)।

* * *

### `isCompositeComponent()` {#iscompositecomponent}

```javascript
isCompositeComponent(instance)
```

`true` रिटर्न करता है यदि `instance` एक उपयोगकर्ता-परिभाषित कौम्पोनॅन्ट है, जैसे कि class या फ़ंक्शन।

* * *

### `isCompositeComponentWithType()` {#iscompositecomponentwithtype}

```javascript
isCompositeComponentWithType(
  instance,
  componentClass
)
```

रिटर्नस `true` यदि `instance` एक कौम्पोनॅन्ट है जिसका प्रकार एक React `componentClass` है।

* * *

### `findAllInRenderedTree()` {#findallinrenderedtree}

```javascript
findAllInRenderedTree(
  tree,
  test
)
```

सब कौम्पोनॅन्ट को `tree` में खोजें और उन सभी कौम्पोनॅन्ट को संचित करें जहां `test(component)` `true` है। यह अपने आप में उपयोगी नहीं है, लेकिन इसका उपयोग अन्य परीक्षण मॉड्यूल में किया जाता है।

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

रेंडर किए गए ट्री में कौम्पोनॅन्ट के सभी DOM एलिमेंट्स को ढूँढता है जो DOM कौम्पोनॅन्ट हैं और जिनका नाम `className` से मिलता है।

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

[`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass) के समान, लेकिन एक परिणाम होने की उम्मीद करता है, और एक परिणाम देता है, या एक के अलावा किसी अन्य संख्या के मैच होने पर एक्सेप्शन थ्रो करता है।

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

रेंडर किए गए ट्री में कौम्पोनॅन्ट के सभी DOM एलिमेंट्स को ढूँढता है जो DOM कौम्पोनॅन्ट `tagName` नाम के टैग के साथ हैं।

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

[`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag) के समान, लेकिन वहाँ एक परिणाम होने की उम्मीद करता है, और वह एक परिणाम देता है, या एक के अलावा किसी अन्य संख्या के मैच होने पर एक्सेप्शन थ्रो करता है।

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

सभी कौम्पोनॅन्ट के इन्सटेंसेस को ढूंढता जो `componentClass` से मिलते हैं।

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

[`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype) के जैसे ही, लेकिन वहाँ एक परिणाम होने की उम्मीद करता है और एक परिणाम देता है, या एक के अलावा किसी भी संख्या में मैच होने पर एक्सेप्शन थ्रो करता है।

***

### `renderIntoDocument()` {#renderintodocument}

```javascript
renderIntoDocument(element)
```

React एलिमेंट को दस्तावेज़ के एक अलग DOM नोड में रेंडर करें। **इस फ़ंक्शन के लिए DOM की आवश्यकता है।** यह प्रभावी रूप से इसके बराबर है:

```js
const domContainer = document.createElement('div');
ReactDOM.render(element, domContainer);
```

> नोट:
>
> आपके द्वारा `React` इम्पोर्ट करने से **पहले** आपको `window`, `window.document` और `window.document.createElement` को ग्लोबल स्तर पर उपलब्ध कराने की आवश्यकता होगी। अन्यथा React को लगेगा कि यह DOM तक नहीं पहुंच सकता है और `setState` जैसे तरीके काम नहीं करेंगे।
* * *

## अन्य उपयोगिताएँ {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

वैकल्पिक `eventData` इवेंट डेटा के साथ एक DOM नोड पर एक इवेंट भेजने का अनुकरण।

`Simulate` के पास [प्रत्येक इवेंट के लिए एक मेथड है जो React समझता है](/docs/events.html#supported-events)।

**किसी एलिमेंट पर क्लिक करना**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**इनपुट फ़ील्ड का वैल्यू बदलना और फिर ENTER दबाना।**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Note
>
> आपके द्वारा अपने कौम्पोनॅन्ट में उपयोग की जा रही कोई भी इवेंट प्रॉपर्टी (जैसे कि keyCode, which, आदि...) आपको रेंडर करनी होगी क्योंकि React आपके लिए इनमें से कोई भी नहीं बना रहा है।

* * *
