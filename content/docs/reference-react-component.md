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

**हम आपको सलाह देते है की आप अपने base component classes बनाने से परहेज़ करे।** रिऍक्ट components में, [कोड का पुन: उपयोग मुख्य रूप से विरासत (inheritance) के बजाय संयोजन (composition) के माध्यम से प्राप्त किया जाता है](/docs/composition-vs-inheritance.html)।

>ध्यान दें:
>
>React आपको ES6 class वाक्य-रचना (सिंटैक्स) का उपयोग करने के लिए बाध्य नहीं करता है। यदि आप इससे बचना पसंद करते हैं, तो आप इसके बजाय `create-react-class` मॉड्यूल या इसी तरह के कस्टम निराकार (अब्स्ट्रक्शन) का उपयोग कर सकते हैं। अधिक जानने के लिए [ES6 के बिना React का उपयोग करना](/docs/react-without-es6.html) पर एक नज़र डालें।

### Component जीवनचक्र (लाइफसाईकल) {#the-component-lifecycle}

प्रत्येक component में कई "लाइफसाईकल मेथड्स" होती हैं, जिन्हें आप प्रक्रिया में विशेष समय पर कोड चलाने के लिए ओवरराइड कर सकते हैं। **आप इस [लाइफसाईकल आकृति](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) को एक नकल पुस्तिका (चीट शीट) के रूप में उपयोग कर सकते हैं।** नीचे दी गई सूची में, आमतौर पर उपयोग की जाने वाली जीवनचक्र विधियों को **बोल्ड** के रूप में चिह्नित किया गया है। उनमें से बाकी अपेक्षाकृत दुर्लभ उदाहरणों के लिए मौजूद हैं।

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

इस अनुभाग की मेथड्स उन अधिकांश उदाहरणों को कवर करती हैं, जो आप एक रिऍक्ट component बनाते समय पाएंगे। **एक दृश्य संदर्भ के लिए, इस [लाइफसाईकल आकृति](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) की जाँच करें।**

### `रेंडर` {#render}

```javascript
render()
```

रेंडर `render()` मेथड एक class में एकमात्र आवश्यक विधि है।

जब इस `render()` को कॉल किया जाता है, तो इसे this.props और this.state की जांच करनी करनी पड़ती है और निम्न प्रकारों में से एक को वापस करना होता है:

- **रिऍक्ट एलिमेंट्स (React elements).** यह आमतौर पर [JSX](/docs/introducing-jsx.html) के माध्यम से बनाया जाता है। उदाहरण के लिए, `<div />` और `<MyComponent />` रिऍक्ट एलिमेंट्स हैं जो क्रमशः DOM नोड, या किसी अन्य उपयोगकर्ता द्वारा परिभाषित component को प्रस्तुत करने के लिए React को निर्देश देते हैं।
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

**यदि आप स्टेट को इनिशियलाइज़ नहीं करते हैं और आप मेथड्स नहीं बाँधते हैं, तो आपको अपने रिऍक्ट कंपोनेंट के लिए कंस्ट्रक्टर लागू करने की आवश्यकता नहीं है।**

रिऍक्टर कंपोनेंट के कंस्ट्रक्टर को कंपोनेंट के माउंट होने से पहले बुलाया जाता है। जब एक `React.Component` सबक्लास के लिए कंस्ट्रक्टर को लागू किया जाता है, तो आपको किसी अन्य स्टेटमेंट से पहले सुपर (प्रॉप्स) `super(props)` को कॉल करना चाहिए। अन्यथा, कंस्ट्रक्टर में `this.props` के लिए अनडिफाइंड मिलेगा, जिससे आपके कोड में बग्स आ सकते हैं।

आमतौर पर, रिऍक्ट में कंस्ट्रक्टर केवल दो उद्देश्यों के लिए उपयोग किए जाते हैं:

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

कंस्ट्रक्टर में किसी भी साइड-इफेक्ट्स या सब्सक्रिप्शन को उपयोग करने से बचें। उन उदाहरणों करने के लिए, इसके बजाय `componentDidMount()` का उपयोग करें।

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

### कॉम्पोनेन्ट डीड माउंट `componentDidMount()` {#componentdidmount}

```javascript
componentDidMount()
```

एक .component के माउंट (ट्री में सम्मिलित) होने के तुरंत बाद `componentDidMount()` को बुलाया किया जाता है। यदि इनिशियलाइज़ेशन के लिए DOM नोड की आवश्यकता होती है, तो उस कोड को यहाँ जाना होना चाहिए। यदि आपको रिमोट एंडपॉइंट से डेटा लोड करने की आवश्यकता है, तो नेटवर्क अनुरोध (network request) को आरंभ करने के लिए यह एक अच्छी जगह है।

यह मेथड किसी भी सब्स्क्रिप्शन (सदस्यता or subscriptions) को स्थापित करने के लिए एक अच्छी जगह है। यदि आप ऐसा करते हैं, तो कॉम्पोनेन्ट विल अनमाउंट `componentWillUnmount()` में सब्स्क्रिप्शन समाप्त करना न भूलें।

आप `setState()` को `componentDidMount()` में तुरंत कॉल कर सकते हैं। यह एक अतिरिक्त रेंडरिंग को ट्रिगर करेगा, लेकिन यह ब्राउज़र द्वारा स्क्रीन को अपडेट करने से पहले होगा। यह गारंटी देता है कि भले ही रेंडर `render()` को इस परिस्थिति में दो बार बुलाया जाएगा, लेकिन यूजर (उपयोगकर्ता - user) बीच का स्टेट नहीं देखेगा। इस पैटर्न का उपयोग सावधानी के साथ करें क्योंकि यह अक्सर परफॉरमेंस समस्याओं का कारण बनता है। ज्यादातर परिस्थितियो में, आपको इसके बजाय कंस्ट्रक्टर `constructor()` में इनिशियल स्टेट (प्रारंभिक स्थिति) सेट करने में सक्षम होना चाहिए। हालाँकि, यह उन मोडल्स और टूलटिप्स जैसे परिस्थितियो के लिए आवश्यक हो सकता है जब आपको किसी ऐसी चीज़ को प्रस्तुत करने से पहले एक डोम नोड को मापने की आवश्यकता होती है जो उसके आकार या स्थिति पर निर्भर करता है।

* * *

### कॉम्पोनेन्ट डीड अपडेट `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

अपडेट करने के तुरंत बाद `componentDidUpdate()` को कॉल होता है। इनिशियल रेंडर के लिए यह विधि कॉल नहीं होता है।

जब कंपोनेंट को अपडेट किया गया हो तो इसे DOM पर ऑपरेट करने के अवसर के रूप में उपयोग करें। यह नेटवर्क रिक्वेस्ट्स करने के लिए भी एक अच्छा स्थान है जब तक कि आप वर्तमान प्रॉप्स की तुलना पिछले प्रॉप्स से करते हैं (e.g. यदि प्रॉप्स नहीं बदले गए हैं तो नेटवर्क रिक्वेस्ट्स आवश्यक नहीं हो सकता है).

```js
componentDidUpdate(prevProps) {
  // टिपिकल उपयोग (प्रॉप्स की तुलना करना मत भूलना):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

आप **`componentDidUpdate()` में तुरंत `setState()` कॉल कर सकते** हैं, लेकिन ध्यान दें कि इसे ऊपर दिए उदाहरण की तरह **एक शर्त में लपेटा जाना चाहिए**, अन्यथा यह एक इनफिनिट (अनंत - infinite) लूप का कारण होगा। यह अतिरिक्त री-रेंडरिंग का कारण भी बनेगा, जो उपयोगकर्ता को दिखाई नहीं देगा, लेकिन यह component के performance को प्रभावित कर सकता है। यदि आप ऊपर से आने वाले किसी प्रॉप को स्टेट में "मिरर" करने की कोशिश कर रहे हैं, तो इसके बजाय सीधे प्रॉप का उपयोग करने पर विचार करें। [स्टेट में प्रॉप्स कॉपी करने से बग के कारण](/blog/2018/06/07/you-probably-dont-need-derived-state.html) के बारे में और पढ़ें।

यदि आपका component `getSnapshotBeforeUpdate()` लाइफसाइकिल को लागू करता है (जो शायद ही कभी उपयोग किया जाता है), तो यह जो वॅल्यू रिटर्न देता है, उसे एक तीसरे पैरामीटर "स्नैपशॉट" के रूप में पास जाएगा `componentDidUpdate()`। अन्यथा यह पैरामीटर अन्डिफ़ाइंड हो जाएगा।

> ध्यान दें
>
> यदि `shouldComponentUpdate()` फाल्स (false) लौटाता है तो [`componentDidUpdate()`](#shouldcomponentupdate) बुलाया नहीं जाएगा।
* * *

### कम्पोनेंट विल अनमाउंट `componentWillUnmount()` {#componentwillunmount}

```javascript
componentWillUnmount()
```

`componentWillUnmount()` को तब बुलाया किया जाता है, जब एक कम्पोनेंट को अनमाउंट किया जाता है और नष्ट कर दिया जाता है। इस विधि में कोई भी आवश्यक सफाई करें, जैसे कि टाइमर को अमान्य करना, नेटवर्क अनुरोधों को रद्द करना, या किसी भी सदस्यता को साफ करना जो कि `componentDidMount()` में बनाए गए थे।

आपको **`setState()` में `componentWillUnmount()` कॉल नहीं करना चाहिए** क्योंकि कम्पोनेंट कभी भी रे-रेंडरड नहीं होगा। एक बार कम्पोनेंट के अनमाउंट होने के बाद, इसे फिर से माउंट नहीं किया जाएगा।

* * *

### बहुत कम उपयोग होने वाले लाइफसाइकिल मेथडस {#rarely-used-lifecycle-methods}

इस भाग में बताये गए मेथडस का उपयोग असामान्य उदाहरणों के अनुरूप हैं। वे कभी कभी ही काम में आते है, लेकिन आपके अधिकांश कम्पोनेंटस को शायद उनमें से किसी की भी आवश्यकता नहीं होती। **यदि आप [लाइफसाइकिल आकृति](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) केे शीर्ष पर "Show less common lifecylces" चेकबॉक्स पर क्लिक करते हैं तो आप इसके नीचे दिए गए अधिकांश मेथडस को देख सकते हैं**।

### शुड कॉम्पोनेन्ट अपडेट `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

यदि स्टेट या प्रॉप्स में बदलाव से किसी कॉम्पोनेन्ट का आउटपुट प्रभावित न करना चाहे, तो ये रिऍक्ट को बताने के लिए `shouldComponentUpdate()` का उपयोग करें। इसका डिफ़ॉल्ट व्यवहार है कि हर स्टेट परिवर्तन पर कॉम्पोनेन्ट को रे-रेंडर करना है, और अधिकांश परिस्थितियो में आपको डिफ़ॉल्ट व्यवहार पर भरोसा करना चाहिए।

जब नया प्रॉप्स या स्टेट प्राप्त किया जा रहा हो तो रेंडर करने से पहले `shouldComponentUpdate()` को कॉल किया जाता है। इसका डिफ़ॉल्ट वॅल्यू है `true`। इस मेथड को न तो प्रारंभिक रेंडर के दौरान बुलाया जाता है और न ही जब `forceUpdate()` का उपयोग किया जाता है।

यह मेथड केवल **[परफॉरमेंस ऑप्टिमाइजेशन](/docs/optimizing-performance.html)** के रूप में मौजूद है। इसका उपयोग रेंडरिंग रोकने के लिए न करे नहीं तो आपके ऍप्लिकेशन में बग्स आ सकते है। खुद से `shouldComponentUpdate()` लिखने के बजाय **रिऍक्ट में बने हुए [PureComponent](/docs/react-api.html#reactpurecomponent) का उपयोग करने पर विचार करें**। `PureComponent`, प्रॉप्स और स्टेट्स की एक ऊपरी तुलना करता है, और इस संभावना को कम कर देता है कि आप एक आवश्यक अपडेट छोड़ देंगे।

यदि आप आश्वस्त हैं कि आप इसे स्वयं लिखना चाहते हैं, तो आप `this.props` की तुलना `nextProps` के साथ कर सकते हैं और `this.state` की तुलना `nextState` के साथ तुलना कर सकते हैं, और React को `false` वापस कर अपडेट को टाल सकते हैं। ध्यान दे की जब चाइल्ड कंपोनेंट्स का स्टेट बदलता है तो `false` रिटर्न कर के भी उन कंपोनेंट्स को रेंडर होने से टाला नहीं जा सकता।

हम आपको `state` or `props` की गहरी समानता की जाँच करने या `shouldComponentUpdate()` में `JSON.stringify()` का उपयोग करने की सलाह नहीं देते हैं। यह बहुत अक्षम है और कार्य को नुकसान पहुंचाएगा।

वर्तमान में, अगर `shouldComponentUpdate()` `false` रिटर्न करता है, तो [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate), [`render()`](#render), और [`componentDidUpdate()`](#componentdidupdate) लागू नहीं होगा। भविष्य में रिऍक्ट `shouldComponentUpdate()` को एक सख्त निर्देश के बजाय एक संकेत के रूप में मान सकता है, और `false` को वापस करने पर भी कम्पोनेंट पुन: रेंडर हो सकता है।

* * *

### `स्टॅटिक गेट-डीराइव्ड-स्टेट-फ्रॉम-प्रॉप्स` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

`getDerivedStateFromProps` को रेंडर विधि को कॉल करने से पहले, आरंभिक माउंट पर और बाद के अपडेट्स पर लागू किया जाता है। इसे स्टेट को अपडेट करने के लिए एक ऑब्जेक्ट वापस भेजना चाहिए, या इसे कुछ भी अपडेट नहीं करने के लिए null वापस करना चाहिए।

यह विधि [दुर्लभ उदाहरणों](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) के लिए मौजूद है जहां स्टेट समय के साथ प्रॉप्स में हो रहे परिवर्तनों पर निर्भर करता है। उदाहरण के लिए, यह एक `<Transition>` कम्पोनेंट को लागू करने के लिए आसान हो सकता है जो अपने पिछले और अगले बच्चों की तुलना करता है ताकि यह तय किया जा सके कि उनमें से कौन से बच्चों को जीवित या निर्जीव करना है।

स्टेट प्राप्त करने से आपका कोड वर्बोज़ (जरूरत से ज्यादा कोड) बनता है और आपके कंपोनेंट्स के बारे में सोचना मुश्किल हो जाता है।
[सुनिश्चित करें कि आप सरल विकल्पों से परिचित हैं:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)
* यदि आपको प्रॉप्स में परिवर्तन के जवाब में एक **साइड इफेक्ट** (उदाहरण के लिए, डेटा लाने या एनीमेशन) करने की आवश्यकता है, तो इसके बजाय [`componentDidUpdate`](#componentdidupdate) जलाइफसाईकल का उपयोग करें।

* यदि आप किसी **डेटा को केवल तभी बदलते हैं, जब कोई प्रॉप बदलता है**, [तो इसके बजाय एक मेमोइज़ेशन (संस्मरण) सहायक का उपयोग करें](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)।

* यदि आप प्रॉप में परिवर्तन होने पर कुछ स्टेट को "रीसेट" करना चाहते हैं, तो एक कम्पोनेंट को या तो [पूरी तरह से नियंत्रित](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) करने या [एक की (कुंजी) के साथ पूरी तरह से अनियंत्रित](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) बनाने पर विचार करें।

इस मेथड को घटक तक पहुँच नहीं है। यदि आप चाहें तो, आप `getDerivedStateFromProps()` और अन्य क्लास मेथडस् के बीच क्लास डेफिनिशन के कम्पोनेंट प्रॉप्स और स्टेट के प्योर फंक्शंस को बाहर निकालकर कुछ कोड का पुन: उपयोग कर सकते हैं।

ध्यान दें कि इस मेथड को *हर* &nbsp;रेंडर पर फायर किया जाता है, कारण चाहे जो भी हो। यह `UNSAFE_componentWillReceiveProps` के विपरीत है, जो केवल तभी फायर करता है जब पैरेंट पुन: रेंडर का कारण बनता है, न कि स्थानीय `setState` के परिणामस्वरूप।

* * *

### `गेट-स्नॅपशॉट-बिफोर-अपडेट()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

`getSnapshotBeforeUpdate()` को हाल ही में प्रस्तुत किए गए आउटपुट से पहले, उदाहरण के लिए DOM के लिए, प्रतिबद्ध होने से ठीक पहले बुलाया जाता है। यह आपके घटक को संभावित रूप से परिवर्तित होने से पहले DOM (जैसे स्क्रॉल स्थिति) से कुछ जानकारी कैप्चर करने में सक्षम बनाता है। इस लाइफसाईकल द्वारा लौटाए गए किसी भी मान को `componentDidUpdate()` के पैरामीटर के रूप में पारित किया जाएगा।

यह उदाहरण आम नहीं है, लेकिन यह UI में हो सकता है, एक चैट थ्रेड की तरह, जिसे एक विशेष तरीके से स्क्रॉल स्थिति को संभालने की आवश्यकता है।

एक स्नैपशॉट वॅल्यू (या `null`) वापस किया जाना चाहिए।

उदाहरण के लिए:

`embed:react-component-reference/get-snapshot-before-update.js`

उपरोक्त उदाहरणों में, `getSnapshotBeforeUpdate` में `scrollHeight` प्रॉपर्टी का वॅल्यू पढ़ना महत्वपूर्ण है क्योंकि "रेंडर" चरण लाइफसाईकल (जैसे `render`) और "commit" चरण लाइफसाईकल (जैसे `getSnapshotBeforeUpdate` और `componentDidUpdate`) के बीच देरी हो सकती है।

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
setState(updater, [callback])
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
