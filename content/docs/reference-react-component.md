---
id: react-component
title: React.Component
layout: docs
category: Reference
permalink: docs/react-component.html
redirect_from:
  - "docs/component-api.html"
  - "docs/component-specs.html"
  - "docs/component-specs-ko-KR.html"
  - "docs/component-specs-zh-CN.html"
  - "tips/UNSAFE_componentWillReceiveProps-not-triggered-after-mounting.html"
  - "tips/dom-event-listeners.html"
  - "tips/initial-ajax.html"
  - "tips/use-react-with-other-libraries.html"
---

इस पृष्ठ में React component class की परिभाषा के लिए एक विस्तृत API का संदर्भ शामिल है। यह मानता है कि आप मूलभूत React अवधारणाओं से परिचित हैं, जैसे Components और Props, साथ ही State और Lifecycle। यदि आप नहीं हैं, तो उन्हें पहले पढ़ें।

## अवलोकन {#overview}

React आपको classes या functions के रूप में घटकों को परिभाषित करने देता है। क्लास के रूप में परिभाषित Components वर्तमान में अधिक सुविधाएँ प्रदान करते हैं जो इस पृष्ठ पर विस्तार से वर्णित किए गए । React component class को परिभाषित करने के लिए, आपको `React.Component` को विस्तारित (extend) करना होगा:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

[`render()`](#render) एकमात्र method है जिसे आपको `React.Component` से विस्तारित (extend) किये हुए एक subclass में परिभाषित (define) *करना ही* होगा। इस पृष्ठ पर वर्णित अन्य सभी methods वैकल्पिक हैं।

**हम आपको सलाह देते है की आप अपने base component classes बनाने से परहेज़ करे।** रिएक्ट components में, [कोड का पुन: उपयोग मुख्य रूप से विरासत (inheritance) के बजाय संयोजन (composition) के माध्यम से प्राप्त किया जाता है](/docs/composition-vs-inheritance.html)।

>ध्यान दें:
>
>React आपको ES6 class वाक्य-रचना (सिंटैक्स) का उपयोग करने के लिए बाध्य नहीं करता है। यदि आप इससे बचना पसंद करते हैं, तो आप इसके बजाय `create-react-class` मॉड्यूल या इसी तरह के कस्टम निराकार (अब्स्ट्रक्शन) का उपयोग कर सकते हैं। अधिक जानने के लिए [ES6 के बिना React का उपयोग करना](/docs/react-without-es6.html) पर एक नज़र डालें।

### Component जीवनचक्र (लाइफसाईकल) {#the-component-lifecycle}

प्रत्येक component में कई "लाइफसाईकल मेथड्स" होती हैं, जिन्हें आप प्रक्रिया में विशेष समय पर कोड चलाने के लिए ओवरराइड कर सकते हैं। **आप इस [लाइफसाईकल आकृति](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) को एक नकल पुस्तिका (चीट शीट) के रूप में उपयोग कर सकते हैं।** नीचे दी गई सूची में, आमतौर पर उपयोग की जाने वाली जीवनचक्र विधियों को **बोल्ड** के रूप में चिह्नित किया गया है। उनमें से बाकी अपेक्षाकृत दुर्लभ उपयोग के मामलों के लिए मौजूद हैं।

#### माउंटिंग - ढांचा खड़ा करना (Mounting) {#mounting}

जब एक component का एक उदाहरण बनाया जा रहा हो और DOM में डाला जाता हो, तो इन मेथड्स को निम्न क्रम में बुलाया जाता है:

- [**`constructor()`**](#constructor)
- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [**`render()`**](#render)
- [**`componentDidMount()`**](#componentdidmount)

>ध्यान दें:
>
>इन मेथड्स को लेगसी (विरासत) माना जाता है और आपको नए कोड में इनसे [बचना चाहिए](/blog/2018/03/27/update-on-async-rendering.html):
>
>- [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)

#### अपडेटिंग (Updating) {#updating}

अपडेट करने के लिए प्रॉप्स या स्टेट में बदलाव किया जा सकता है। इन मेथड्स को निम्नलिखित क्रम में बुलाया जाता है जब एक component को फिर से प्रस्तुत किया जा रहा है:

- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](#shouldcomponentupdate)
- [**`render()`**](#render)
- [`getSnapshotBeforeUpdate()`](#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](#componentdidupdate)

>ध्यान दें:
>
>इन मेथड्स को लेगसी (विरासत) माना जाता है और आपको नए कोड में इनसे [बचना चाहिए](/blog/2018/03/27/update-on-async-rendering.html):
>
>- [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate)
>- [`UNSAFE_componentWillReceiveProps()`](#unsafe_componentwillreceiveprops)

#### अनमाउंट (Unmounting) {#unmounting}

यह मेथड उस समय बुलाई जाती है जब DOM से component को हटाया जा रहा हो:

- [**`componentWillUnmount()`**](#componentwillunmount)

#### एरर हैंडलिंग (Error Handling) {#error-handling}

इन मेथड्स को तब बुलाया जाता है जब रेंडरिंग के दौरान कोई त्रुटि हो, एक लाइफसाईकल में कोई त्रुटि होती है या किसी भी child के component के कंस्ट्रक्टर में कोई त्रुटि हो।

- [`static getDerivedStateFromError()`](#static-getderivedstatefromerror)
- [`componentDidCatch()`](#componentdidcatch)

### अन्य API {#other-apis}

प्रत्येक component कुछ अन्य API भी प्रदान करता है:

  - [`setState()`](#setstate)
  - [`forceUpdate()`](#forceupdate)

### क्लास प्रॉपर्टीज़ {#class-properties}

  - [`defaultProps`](#defaultprops)
  - [`displayName`](#displayname)

### इंस्टेंस प्रॉपर्टीज़ {#instance-properties}

  - [`props`](#props)
  - [`state`](#state)

* * *

## संदर्भ {#reference}

### आमतौर पर इस्तेमाल किया जाने वाले लाइफसाईकल मेथड्स

इस अनुभाग की मेथड्स उन अधिकांश उपयोग मामलों को कवर करती हैं, जो आप एक रिएक्ट component बनाते समय पाएंगे। **एक दृश्य संदर्भ के लिए, इस [लाइफसाईकल आकृति](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) की जाँच करें।**

### `रेंडर` {#render}

```javascript
render()
```

रेंडर `render()` मेथड एक class में एकमात्र आवश्यक विधि है।

जब इस `render()` को कॉल किया जाता है, तो इसे this.props और this.state की जांच करनी करनी पड़ती है और निम्न प्रकारों में से एक को वापस करना होता है:

- **रिएक्ट एलिमेंट्स (React elements).** यह आमतौर पर [JSX](/docs/introducing-jsx.html) के माध्यम से बनाया जाता है। उदाहरण के लिए, `<div />` और `<MyComponent />` रिएक्ट एलिमेंट्स हैं जो क्रमशः DOM नोड, या किसी अन्य उपयोगकर्ता द्वारा परिभाषित component को प्रस्तुत करने के लिए React को निर्देश देते हैं।
- **अर्रे एंड फ्रेग्मेंट्स (Arrays and fragments).**  यह आपको रेंडर से कई एलिमेंट्स वापस करने देता है। अधिक विवरण के लिए [फ़्रेगमेंट](/docs/fragments.html) के प्रलेखन को देखें।
- **पोर्टल्स (Portals).** यह आपको कम्पोनेंट के अंदर दिखने वाले एलिमेंट्स यानि की कम्पोनेंट के बच्चों को एक अलग DOM सबट्री में रेंडर करता है। अधिक विवरण के लिए [पोर्टल](/docs/portals.html) पर प्रलेखन देखें।
- **स्ट्रिंग और संख्या (String and numbers).** ये DOM में टेक्स्ट नोड्स के रूप में प्रस्तुत किए जाते हैं।
- **बूलियनस या नल (Booleans or `null`).** यह कुछ भी रेंडर नहीं करता है। यह ज्यादातर `return test && <Child />` पैटर्न का समर्थन करने के लिए मौजूद है, जिसमे `टेस्ट` बूलियन है।

रेंडर `render()` फ़ंक्शन शुद्ध होना चाहिए (प्योर फंक्शन), जिसका अर्थ है कि यह component के state को बदलता नहीं है, इसे जब बुलाया जाता है यह हर बार एक ही परिणाम देता है, और यह सीधे ब्राउज़र के साथ बातचीत नहीं करता है।

यदि आपको ब्राउज़र के साथ सहभागिता (इंटरेक्ट) करने की आवश्यकता है, तो अपने काम को `componentDidMount()` या उसके बजाय अन्य लाइफसाईकल मेथड्स में करें। रेंडर `render()` शुद्ध रखने से कंपोनेंट्स के बारे में सोचना आसान हो जाता है।

> ध्यान दें
>
> रेंडर `render()` को नहीं बुलाया जाएगा अगर shouldComponentUpdate () फाल्स (false) रिटर्न करता है।

* * *

### कंस्ट्रक्टर `constructor()` {#constructor}

```javascript
constructor(props)
```

**यदि आप स्टेट को इनिशियलाइज़ नहीं करते हैं और आप मेथड्स नहीं बाँधते हैं, तो आपको अपने रिएक्ट कंपोनेंट के लिए कंस्ट्रक्टर लागू करने की आवश्यकता नहीं है।**

रिएक्टर कंपोनेंट के कंस्ट्रक्टर को कंपोनेंट के माउंट होने से पहले बुलाया जाता है। जब एक `React.Component` सबक्लास के लिए कंस्ट्रक्टर को लागू किया जाता है, तो आपको किसी अन्य स्टेटमेंट से पहले सुपर (प्रॉप्स) `super(props)` को कॉल करना चाहिए। अन्यथा, कंस्ट्रक्टर में `this.props` के लिए अनडिफाइंड मिलेगा, जिससे आपके कोड में बग्स आ सकते हैं।

आमतौर पर, रिएक्ट में कंस्ट्रक्टर केवल दो उद्देश्यों के लिए उपयोग किए जाते हैं:

* `this.state` को ऑब्जेक्ट असाइन करके लोकल स्टेट [local state](/docs/state-and-lifecycle.html) को इनिशियलाइज़ करना।
* एक इंस्टेंस के लिए इवेंट हैंडलर [event handler](/docs/handling-events.html) बाइंड करना।

आपको कंस्ट्रक्टर `constructor()` में सेटस्टेट `setState()` **नहीं बुलाना चाहिए**। इसके बजाय, यदि आपके घटक को स्थानीय राज्य का उपयोग करने की आवश्यकता है, **तो प्रारंभिक state को सीधे निर्माणकर्ता में `this.state` को असाइन करें:

```js
constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

कंस्ट्रक्टर एकमात्र ऐसी जगह है जहाँ आपको सीधे `this.state` असाइन करना चाहिए। अन्य सभी तरीकों में, आपको इसके बजाय `this.setState()` का उपयोग करने की आवश्यकता है।

कंस्ट्रक्टर में किसी भी साइड-इफेक्ट्स या सब्सक्रिप्शन को उपयोग करने से बचें। उन मामलों का उपयोग करने के लिए, इसके बजाय `componentDidMount()` का उपयोग करें।

>ध्यान दें
>
>**स्टेट में प्रॉप्स कॉपी करने से बचें! यह एक सामान्य गलती है:**
>
>```js
>constructor(props) {
>  super(props);
>  // Don't do this!
>  this.state = { color: props.color };
>}
>```
>
>समस्या यह है कि यह दोनों अनावश्यक है (आप इसके बजाय सीधे `this.props.color` का उपयोग कर सकते हैं), और यह आपके कोड में बग बनाता है (`color` प्रोप में अपडेट स्टेट में रिफ्लेक्टेड नहीं होगा)।
>
>**यदि आप जानबूझकर प्रोप अपडेट को अनदेखा करना चाहते हैं तो केवल इस पैटर्न का उपयोग करें।** उस स्थिति में यह समझ में आता है .prop का नाम बदल के इसे इनिशियलकलर `initialColor` या डिफॉल्टकॉलर `defaultColor` रखा जाए। फिर आप आवश्यक होने पर इसके [`key` को बदलकर](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) इसकी इंटरनल स्टेट को "रीसेट" करने के लिए एक कम्पोनेंट को बाध्य कर सकते हैं।
>
>अगर आपको लगता है कि आपको प्रॉप्स पर निर्भर रहने के लिए कुछ स्टेट की आवश्यकता है, तो इसके बारे में जानने के लिए डीराइव स्टेट से बचने के लिए क्या करे इस बारे में हमारे [ब्लॉग पोस्ट](/blog/2018/06/07/you-probably-dont-need-derived-state.html) को पढ़ें।

* * *

### `componentDidMount()` {#componentdidmount}

```javascript
componentDidMount()
```

`componentDidMount()` is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

This method is a good place to set up any subscriptions. If you do that, don't forget to unsubscribe in `componentWillUnmount()`.

You **may call `setState()` immediately** in `componentDidMount()`. It will trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the `render()` will be called twice in this case, the user won't see the intermediate state. Use this pattern with caution because it often causes performance issues. In most cases, you should be able to assign the initial state in the `constructor()` instead. It can, however, be necessary for cases like modals and tooltips when you need to measure a DOM node before rendering something that depends on its size or position.

* * *

### `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

`componentDidUpdate()` is invoked immediately after updating occurs. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

```js
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

You **may call `setState()` immediately** in `componentDidUpdate()` but note that **it must be wrapped in a condition** like in the example above, or you'll cause an infinite loop. It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance. If you're trying to "mirror" some state to a prop coming from above, consider using the prop directly instead. Read more about [why copying props into state causes bugs](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

If your component implements the `getSnapshotBeforeUpdate()` lifecycle (which is rare), the value it returns will be passed as a third "snapshot" parameter to `componentDidUpdate()`. Otherwise this parameter will be undefined.

> Note
>
> `componentDidUpdate()` will not be invoked if [`shouldComponentUpdate()`](#shouldcomponentupdate) returns false.

* * *

### `componentWillUnmount()` {#componentwillunmount}

```javascript
componentWillUnmount()
```

`componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in `componentDidMount()`.

You **should not call `setState()`** in `componentWillUnmount()` because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.

* * *

### Rarely Used Lifecycle Methods {#rarely-used-lifecycle-methods}

The methods in this section correspond to uncommon use cases. They're handy once in a while, but most of your components probably don't need any of them. **You can see most of the methods below on [this lifecycle diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) if you click the "Show less common lifecycles" checkbox at the top of it.**


### `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

Use `shouldComponentUpdate()` to let React know if a component's output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.

`shouldComponentUpdate()` is invoked before rendering when new props or state are being received. Defaults to `true`. This method is not called for the initial render or when `forceUpdate()` is used.

This method only exists as a **[performance optimization](/docs/optimizing-performance.html).** Do not rely on it to "prevent" a rendering, as this can lead to bugs. **Consider using the built-in [`PureComponent`](/docs/react-api.html#reactpurecomponent)** instead of writing `shouldComponentUpdate()` by hand. `PureComponent` performs a shallow comparison of props and state, and reduces the chance that you'll skip a necessary update.

If you are confident you want to write it by hand, you may compare `this.props` with `nextProps` and `this.state` with `nextState` and return `false` to tell React the update can be skipped. Note that returning `false` does not prevent child components from re-rendering when *their* state changes.

We do not recommend doing deep equality checks or using `JSON.stringify()` in `shouldComponentUpdate()`. It is very inefficient and will harm performance.

Currently, if `shouldComponentUpdate()` returns `false`, then [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate), [`render()`](#render), and [`componentDidUpdate()`](#componentdidupdate) will not be invoked. In the future React may treat `shouldComponentUpdate()` as a hint rather than a strict directive, and returning `false` may still result in a re-rendering of the component.

* * *

### `static getDerivedStateFromProps()` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

`getDerivedStateFromProps` is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing.

This method exists for [rare use cases](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) where the state depends on changes in props over time. For example, it might be handy for implementing a `<Transition>` component that compares its previous and next children to decide which of them to animate in and out.

Deriving state leads to verbose code and makes your components difficult to think about.
[Make sure you're familiar with simpler alternatives:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)

* If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](#componentdidupdate) lifecycle instead.

* If you want to **re-compute some data only when a prop changes**, [use a memoization helper instead](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).

* If you want to **"reset" some state when a prop changes**, consider either making a component [fully controlled](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.

This method doesn't have access to the component instance. If you'd like, you can reuse some code between `getDerivedStateFromProps()` and the other class methods by extracting pure functions of the component props and state outside the class definition.

Note that this method is fired on *every* render, regardless of the cause. This is in contrast to `UNSAFE_componentWillReceiveProps`, which only fires when the parent causes a re-render and not as a result of a local `setState`.

* * *

### `getSnapshotBeforeUpdate()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

`getSnapshotBeforeUpdate()` is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle will be passed as a parameter to `componentDidUpdate()`.

This use case is not common, but it may occur in UIs like a chat thread that need to handle scroll position in a special way.

A snapshot value (or `null`) should be returned.

For example:

`embed:react-component-reference/get-snapshot-before-update.js`

In the above examples, it is important to read the `scrollHeight` property in `getSnapshotBeforeUpdate` because there may be delays between "render" phase lifecycles (like `render`) and "commit" phase lifecycles (like `getSnapshotBeforeUpdate` and `componentDidUpdate`).

* * *

### Error boundaries {#error-boundaries}

[Error boundaries](/docs/error-boundaries.html) are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

A class component becomes an error boundary if it defines either (or both) of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch()`. Updating state from these lifecycles lets you capture an unhandled JavaScript error in the below tree and display a fallback UI.

Only use error boundaries for recovering from unexpected exceptions; **don't try to use them for control flow.**

For more details, see [*Error Handling in React 16*](/blog/2017/07/26/error-handling-in-react-16.html).

> Note
>
> Error boundaries only catch errors in the components **below** them in the tree. An error boundary can’t catch an error within itself.

### `static getDerivedStateFromError()` {#static-getderivedstatefromerror}
```javascript
static getDerivedStateFromError(error)
```

This lifecycle is invoked after an error has been thrown by a descendant component.
It receives the error that was thrown as a parameter and should return a value to update state.

```js{7-10,13-16}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

> Note
>
> `getDerivedStateFromError()` is called during the "render" phase, so side-effects are not permitted.
For those use cases, use `componentDidCatch()` instead.

* * *

### `componentDidCatch()` {#componentdidcatch}

```javascript
componentDidCatch(error, info)
```

This lifecycle is invoked after an error has been thrown by a descendant component.
It receives two parameters:

1. `error` - The error that was thrown.
2. `info` - An object with a `componentStack` key containing [information about which component threw the error](/docs/error-boundaries.html#component-stack-traces).


`componentDidCatch()` is called during the "commit" phase, so side-effects are permitted.
It should be used for things like logging errors:

```js{12-19}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

> Note
>
> In the event of an error, you can render a fallback UI with `componentDidCatch()` by calling `setState`, but this will be deprecated in a future release.
> Use `static getDerivedStateFromError()` to handle fallback rendering instead.

* * *

### Legacy Lifecycle Methods {#legacy-lifecycle-methods}

The lifecycle methods below are marked as "legacy". They still work, but we don't recommend using them in the new code. You can learn more about migrating away from legacy lifecycle methods in [this blog post](/blog/2018/03/27/update-on-async-rendering.html).

### `UNSAFE_componentWillMount()` {#unsafe_componentwillmount}

```javascript
UNSAFE_componentWillMount()
```

> Note
>
> This lifecycle was previously named `componentWillMount`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

`UNSAFE_componentWillMount()` is invoked just before mounting occurs. It is called before `render()`, therefore calling `setState()` synchronously in this method will not trigger an extra rendering. Generally, we recommend using the `constructor()` instead for initializing state.

Avoid introducing any side-effects or subscriptions in this method. For those use cases, use `componentDidMount()` instead.

This is the only lifecycle method called on server rendering.

* * *

### `UNSAFE_componentWillReceiveProps()` {#unsafe_componentwillreceiveprops}

```javascript
UNSAFE_componentWillReceiveProps(nextProps)
```

> Note
>
> This lifecycle was previously named `componentWillReceiveProps`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

> Note:
>
> Using this lifecycle method often leads to bugs and inconsistencies
>
> * If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](#componentdidupdate) lifecycle instead.
> * If you used `componentWillReceiveProps` for **re-computing some data only when a prop changes**, [use a memoization helper instead](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).
> * If you used `componentWillReceiveProps` to **"reset" some state when a prop changes**, consider either making a component [fully controlled](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.
>
> For other use cases, [follow the recommendations in this blog post about derived state](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

`UNSAFE_componentWillReceiveProps()` is invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method.

Note that if a parent component causes your component to re-render, this method will be called even if props have not changed. Make sure to compare the current and next values if you only want to handle changes.

React doesn't call `UNSAFE_componentWillReceiveProps()` with initial props during [mounting](#mounting). It only calls this method if some of component's props may update. Calling `this.setState()` generally doesn't trigger `UNSAFE_componentWillReceiveProps()`.

* * *

### `UNSAFE_componentWillUpdate()` {#unsafe_componentwillupdate}

```javascript
UNSAFE_componentWillUpdate(nextProps, nextState)
```

> Note
>
> This lifecycle was previously named `componentWillUpdate`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

`UNSAFE_componentWillUpdate()` is invoked just before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

Note that you cannot call `this.setState()` here; nor should you do anything else (e.g. dispatch a Redux action) that would trigger an update to a React component before `UNSAFE_componentWillUpdate()` returns.

Typically, this method can be replaced by `componentDidUpdate()`. If you were reading from the DOM in this method (e.g. to save a scroll position), you can move that logic to `getSnapshotBeforeUpdate()`.

> Note
>
> `UNSAFE_componentWillUpdate()` will not be invoked if [`shouldComponentUpdate()`](#shouldcomponentupdate) returns false.

* * *

## Other APIs {#other-apis-1}

Unlike the lifecycle methods above (which React calls for you), the methods below are the methods *you* can call from your components.

There are just two of them: `setState()` and `forceUpdate()`.

### `setState()` {#setstate}

```javascript
setState(updater[, callback])
```

`setState()` enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.

Think of `setState()` as a *request* rather than an immediate command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately.

`setState()` does not always immediately update the component. It may batch or defer the update until later. This makes reading `this.state` right after calling `setState()` a potential pitfall. Instead, use `componentDidUpdate` or a `setState` callback (`setState(updater, callback)`), either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, read about the `updater` argument below.

`setState()` will always lead to a re-render unless `shouldComponentUpdate()` returns `false`. If mutable objects are being used and conditional rendering logic cannot be implemented in `shouldComponentUpdate()`, calling `setState()` only when the new state differs from the previous state will avoid unnecessary re-renders.

The first argument is an `updater` function with the signature:

```javascript
(state, props) => stateChange
```

`state` is a reference to the component state at the time the change is being applied. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from `state` and `props`. For instance, suppose we wanted to increment a value in state by `props.step`:

```javascript
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

Both `state` and `props` received by the updater function are guaranteed to be up-to-date. The output of the updater is shallowly merged with `state`.

The second parameter to `setState()` is an optional callback function that will be executed once `setState` is completed and the component is re-rendered. Generally we recommend using `componentDidUpdate()` for such logic instead.

You may optionally pass an object as the first argument to `setState()` instead of a function:

```javascript
setState(stateChange[, callback])
```

This performs a shallow merge of `stateChange` into the new state, e.g., to adjust a shopping cart item quantity:

```javascript
this.setState({quantity: 2})
```

This form of `setState()` is also asynchronous, and multiple calls during the same cycle may be batched together. For example, if you attempt to increment an item quantity more than once in the same cycle, that will result in the equivalent of:

```javaScript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

Subsequent calls will override values from previous calls in the same cycle, so the quantity will only be incremented once. If the next state depends on the current state, we recommend using the updater function form, instead:

```js
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```

For more detail, see:

* [State and Lifecycle guide](/docs/state-and-lifecycle.html)
* [In depth: When and why are `setState()` calls batched?](https://stackoverflow.com/a/48610973/458193)
* [In depth: Why isn't `this.state` updated immediately?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

* * *

### `forceUpdate()` {#forceupdate}

```javascript
component.forceUpdate(callback)
```

By default, when your component's state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.

Calling `forceUpdate()` will cause `render()` to be called on the component, skipping `shouldComponentUpdate()`. This will trigger the normal lifecycle methods for child components, including the `shouldComponentUpdate()` method of each child. React will still only update the DOM if the markup changes.

Normally you should try to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.

* * *

## Class Properties {#class-properties-1}

### `defaultProps` {#defaultprops}

`defaultProps` can be defined as a property on the component class itself, to set the default props for the class. This is used for undefined props, but not for null props. For example:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

If `props.color` is not provided, it will be set by default to `'blue'`:

```js
  render() {
    return <CustomButton /> ; // props.color will be set to blue
  }
```

If `props.color` is set to null, it will remain null:

```js
  render() {
    return <CustomButton color={null} /> ; // props.color will remain null
  }
```

* * *

### `displayName` {#displayname}

The `displayName` string is used in debugging messages. Usually, you don't need to set it explicitly because it's inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component, see [Wrap the Display Name for Easy Debugging](/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging) for details.

* * *

## Instance Properties {#instance-properties-1}

### `props` {#props}

`this.props` contains the props that were defined by the caller of this component. See [Components and Props](/docs/components-and-props.html) for an introduction to props.

In particular, `this.props.children` is a special prop, typically defined by the child tags in the JSX expression rather than in the tag itself.

### `state` {#state}

The state contains data specific to this component that may change over time. The state is user-defined, and it should be a plain JavaScript object.

If some value isn't used for rendering or data flow (for example, a timer ID), you don't have to put it in the state. Such values can be defined as fields on the component instance.

See [State and Lifecycle](/docs/state-and-lifecycle.html) for more information about the state.

Never mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.
