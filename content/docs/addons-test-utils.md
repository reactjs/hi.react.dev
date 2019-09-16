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

Pass a mocked component module to this method to augment it with useful methods that allow it to be used as a dummy React component. Instead of rendering as usual, the component will become a simple `<div>` (or other tag if `mockTagName` is provided) containing any provided children.

> Note:
>
> `mockComponent()` is a legacy API. We recommend using [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock) instead.

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

Returns `true` if `element` is any React element.

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

Returns `true` if `element` is a React element whose type is of a React `componentClass`.

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

Returns `true` if `instance` is a DOM component (such as a `<div>` or `<span>`).

* * *

### `isCompositeComponent()` {#iscompositecomponent}

```javascript
isCompositeComponent(instance)
```

Returns `true` if `instance` is a user-defined component, such as a class or a function.

* * *

### `isCompositeComponentWithType()` {#iscompositecomponentwithtype}

```javascript
isCompositeComponentWithType(
  instance,
  componentClass
)
```

Returns `true` if `instance` is a component whose type is of a React `componentClass`.

* * *

### `findAllInRenderedTree()` {#findallinrenderedtree}

```javascript
findAllInRenderedTree(
  tree,
  test
)
```

Traverse all components in `tree` and accumulate all components where `test(component)` is `true`. This is not that useful on its own, but it's used as a primitive for other test utils.

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

Finds all DOM elements of components in the rendered tree that are DOM components with the class name matching `className`.

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

Like [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass) but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

Finds all DOM elements of components in the rendered tree that are DOM components with the tag name matching `tagName`.

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

Like [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag) but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

Finds all instances of components with type equal to `componentClass`.

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

Same as [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype) but expects there to be one result and returns that one result, or throws exception if there is any other number of matches besides one.

***

### `renderIntoDocument()` {#renderintodocument}

```javascript
renderIntoDocument(element)
```

Render a React element into a detached DOM node in the document. **This function requires a DOM.** It is effectively equivalent to:

```js
const domContainer = document.createElement('div');
ReactDOM.render(element, domContainer);
```

> Note:
>
> You will need to have `window`, `window.document` and `window.document.createElement` globally available **before** you import `React`. Otherwise React will think it can't access the DOM and methods like `setState` won't work.

* * *

## Other Utilities {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

Simulate an event dispatch on a DOM node with optional `eventData` event data.

`Simulate` has a method for [every event that React understands](/docs/events.html#supported-events).

**Clicking an element**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**Changing the value of an input field and then pressing ENTER.**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Note
>
> You will have to provide any event property that you're using in your component (e.g. keyCode, which, etc...) as React is not creating any of these for you.

* * *
