---
id: test-utils
title: परीक्षण उपयोगिताएँ
permalink: docs/test-utils.html
layout: docs
category: Reference
---

**आयात करना**

```javascript
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5, npm के द्वारा
```

## अवलोकन {#overview}

`ReactTestUtils` आपकी पसंद के परीक्षण ढांचे में रिएक्ट घटकों का परीक्षण करना आसान बनाता है। फेसबुक में हम व्यथाहीन जावास्क्रिप्ट परीक्षण के लिए [Jest](https://facebook.github.io/jest/) का उपयोग करते हैं। Jest वेबसाइट के माध्यम से Jest के साथ शुरुआत करने का तरीका जानें [React ट्यूटोरियल](https://jestjs.io/docs/tutorial-react).

> नोट:
>
> हम [React टेस्टिंग लाइब्रेरी](https://testing-library.com/react) का उपयोग करने की सलाह देते हैं, जो अंतिम उपयोगकर्ताओं के रूप में आपके घटकों का उपयोग करने वाले लेखन परीक्षणों को सक्षम और प्रोत्साहित करने के लिए डिज़ाइन किया गया है।
>
> वैकल्पिक रूप से, Airbnb ने [Enzyme](https://airbnb.io/enzyme/) नामक एक परीक्षण उपयोगिता जारी की है, जो आपके React कौम्पोनॅन्ट के आउटपुट को मुखर, हेरफेर करना और ट्रैवर्स करना आसान बनाता है।

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

कथनों के लिए एक कौम्पोनॅन्ट तैयार करने के लिए, उसे प्रदान करने वाले कोड को लपेटें और `act()` कॉल के अंदर अपडेट करते हुए। यह आपके टेस्ट को ब्राउज़र में React कैसे काम करता है, के करीब लाता है।

>नोट
>
>यदि आप `react-test-renderer` का उपयोग करते हैं, तो यह एक `act` एक्सपोर्ट भी प्रदान करता है जो उसी तरह व्यवहार करता है।

उदाहरण के लिए, मान लें कि हमारे पास यह `Counter` कौम्पोनॅन्ट है:

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

- यह मत भूलिए कि DOM स्पर्धाएँ को प्रेषण तभी काम करता है जब DOM कंटेनर को `document` में जोड़ा जाता है। आप बॉयलरप्लेट कोड को कम करने के लिए [React Testing Library](https://testing-library.com/react) जैसी लाइब्रेरी का उपयोग कर सकते हैं।

- [`रेसिपी`](/docs/testing-recipes.html) डॉक्यूमेंट में उदाहरण और उपयोग के साथ `act()` व्यवहार करता है, पर अधिक विवरण हैं।

* * *

### `mockComponent()` {#mockcomponent}

```javascript
mockComponent(
  componentClass,
  [mockTagName]
)
```

इस विधि के लिए एक नकली कौम्पोनॅन्ट मॉड्यूल को पारित करें इसे उपयोगी विधियों के साथ संवर्धित करें जो इसे डमी React कौम्पोनॅन्ट के रूप में उपयोग करने की अनुमति देता है। हमेशा की तरह रेंडर करने के बजाय, कौम्पोनॅन्ट प्रदान किया जाएगा एक सरल `<div>` (या अन्य टैग यदि `mockTagName` प्रदान किया गया है) किसी भी प्रदान की बच्चों से युक्त।

> नोट:
>
> `mockComponent()` एक विरासत API है। हम इसके बजाय [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-react-native.html#mock-native-modules-use-jestockock) का उपयोग करने की सलाह देते हैं।

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

रिटर्न `true` अगर `element` कोई React एलिमेंट है।

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

रिटर्न `true` अगर `element` एक React एलिमेंट है जिसका टाइप एक रिएक्ट `componentClass` है।

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

रिटर्न `true` यदि `instance` एक DOM कौम्पोनॅन्ट है (जैसे कि `<div>` या `<span>`)।

* * *

### `isCompositeComponent()` {#iscompositecomponent}

```javascript
isCompositeComponent(instance)
```

रिटर्न `true` यदि `instance` एक उपयोगकर्ता-परिभाषित कौम्पोनॅन्ट है, जैसे कि class या फ़ंक्शन।

* * *

### `isCompositeComponentWithType()` {#iscompositecomponentwithtype}

```javascript
isCompositeComponentWithType(
  instance,
  componentClass
)
```

रिटर्न `true` अगर `instance` एक कौम्पोनॅन्ट है जिसका प्रकार एक प्रतिक्रिया `componentClass` है।

* * *

### `findAllInRenderedTree()` {#findallinrenderedtree}

```javascript
findAllInRenderedTree(
  tree,
  test
)
```

सभी कौम्पोनॅन्ट को `tree` में रखें और उन सभी कौम्पोनॅन्ट को संचित करें जहां `test(component)` `true` है। यह अपने आप में उपयोगी नहीं है, लेकिन इसका उपयोग अन्य परीक्षण बर्तनों के लिए एक आदिम के रूप में किया जाता है।

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

प्रदान किए गए पेड़ में कौम्पोनॅन्ट के सभी DOM तत्वों को ढूँढता है जो DOM कौम्पोनॅन्ट हैं जिनका नाम `className` से मेल खाते हैं।

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

जैसे [`scryRenderedDOMCompordsWithClass()`](#scryrendereddomcompocuswithclass) लेकिन एक परिणाम होने की उम्मीद करता है, और एक परिणाम देता है, या एक के अलावा किसी अन्य संख्या के मैच होने पर अपवाद फेंकता है।

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

प्रदान किए गए ट्री में कौम्पोनॅन्ट के सभी DOM तत्वों को ढूँढता है जो DOM टैग `tagName` नाम के टैग के साथ कौम्पोनॅन्ट हैं।

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

जैसे [`scryRenderedDOMCompordsWithTag()`](#scryrendereddomcompocuswithtag), लेकिन वहाँ एक परिणाम होने की उम्मीद करता है, और वह एक परिणाम देता है, या एक के अलावा किसी अन्य संख्या के मैच होने पर अपवाद फेंकता है।

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

प्रकार के घटकों के सभी उदाहरणों को `componentClass` के बराबर जोड़ता है।

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

के रूप में ही [`scryRenderedCompordsWithType()`](#scryrenderedcompordswithtype), लेकिन वहाँ एक परिणाम होने की उम्मीद करता है और एक परिणाम देता है, या एक के अलावा किसी भी संख्या में मैच होने पर अपवाद छोड़ देता है।

***

### `renderIntoDocument()` {#renderintodocument}

```javascript
renderIntoDocument(element)
```

दस्तावेज़ में एक अलग DOM नोड में एक प्रतिक्रिया तत्व प्रदान करें। **इस फ़ंक्शन के लिए DOM की आवश्यकता है।** यह प्रभावी रूप से इसके बराबर है:

```js
const domContainer = document.createElement('div');
ReactDOM.render(element, domContainer);
```

> नोट:
>
> आपके द्वारा `React` आयात करने से **पहले** आपको `window`, `window.document` और `window.document.createElement` को विश्व स्तर पर उपलब्ध कराने की आवश्यकता होगी। अन्यथा प्रतिक्रिया से लगता है कि यह DOM तक नहीं पहुंच सकता है और `setState` जैसे तरीके काम नहीं करेंगे।
* * *

## अन्य उपयोगिताएँ {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

वैकल्पिक `eventData` घटना डेटा के साथ एक DOM नोड पर एक घटना प्रेषण अनुकरण।

`Simulate` के पास [प्रत्येक घटना के लिए एक विधि है जो प्रतिक्रिया को समझती है](/docs/events.html#supported-events)।

**किसी तत्व पर क्लिक करना**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**इनपुट फ़ील्ड का मान बदलना और फिर ENTER दबाना।**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Note
>
> आपके द्वारा अपने घटक में उपयोग की जा रही कोई भी घटना संपत्ति (जैसे कि keyCode, which, आदि...) आपको प्रदान करनी होगी क्योंकि React आपके लिए इनमें से कोई भी नहीं बना रहा है।

* * *
