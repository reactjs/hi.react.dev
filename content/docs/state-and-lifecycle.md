---
id: state-and-lifecycle
title: State और जीवनचक्र
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

यह पृष्ठ एक React कौम्पोनॅन्ट में स्थिति और जीवनचक्र की अवधारणा का परिचय देता है। आप [यहाँ एक विस्तृत कौम्पोनॅन्ट API संदर्भ पा सकते हैं](/docs/react-component.html)।

[पिछले अनुभागों में से एक](/docs/rendering-elements.html#updating-the-rendered-element) से घड़ी के उदाहरण पर विचार करें। 
[रेंडरइंड एलिमेंट्स](/docs/rendering-elements.html#rendering-an-element-into-the-dom) में हमने यूआई को अपडेट करने का केवल एक तरीका सीखा है। प्रदान किए गए आउटपुट को बदलने के लिए हम `ReactDOM.render ()` कहते हैं :

```js{8-11}
function टिक() {
  const  element = (
    <div>
      <h1> नमस्ते, दुनिया!</h1>
      <h2>यह {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(टिक, 1000);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

इस खंड में, हम सीखेंगे कि `क्लॉक` कौम्पोनॅन्ट को वास्तव में पुन: प्रयोज्य और समझाया कैसे बनाया जाए। यह अपना खुद का टाइमर सेट करेगा और हर सेकंड खुद को अपडेट करेगा।

हम कैसे घड़ी लग रहा है encapsulating द्वारा शुरू कर सकते हैं:

```js{3-6,12}
function क्लॉक(props) {
  return (
    <div>
      <h1>नमस्ते, दुनिया!</h1>
      <h2>यह  {props.date.toLocaleTimeString()} है। </h2>
    </div>
  );
}

function टिक () {
  ReactDOM.render(
    <क्लॉक date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(टिक, 1000);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

हालांकि, यह एक महत्वपूर्ण आवश्यकता को याद करता है: यह तथ्य कि `क्लॉक` एक टाइमर सेट करता है और यूआई को अपडेट करता है हर सेकंड` क्लॉक` का कार्यान्वयन विवरण होना चाहिए।

आदर्श रूप से हम इसे एक बार लिखना चाहते हैं और `क्लॉक` को स्वयं अपडेट करते हैं:

```js{2}
ReactDOM.render(
  <क्लॉक />,
  document.getElementById('root')
);
```

इसे लागू करने के लिए, हमें `क्लॉक` कौम्पोनॅन्ट में" state "जोड़ना होगा।

State "प्रॉप्स" के समान है, लेकिन यह निजी और कौम्पोनॅन्ट द्वारा पूरी तरह से नियंत्रित है।

हमने [पहले उल्लेख किया है](/docs/components-and-props.html#functional-and-class-components) कि कक्षाओं के रूप में परिभाषित कौम्पोनॅन्टों में कुछ अतिरिक्त विशेषताएं हैं। स्थानीय स्थिति ठीक यही है: एक सुविधा जो केवल कक्षाओं के लिए उपलब्ध है।

## किसी फंक्शन को क्लास में बदलना {#converting-a-function-to-a-class}

आप `क्लॉक` जैसे फंक्शन कंपोनेंट को पांच चरणों में क्लास में बदल सकते हैं:

1. एक ही नाम के साथ [ES6 वर्ग](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) बनाएँ, जो `React.Component` का विस्तार करता है।

2. इसमें एक एकल खाली विधि जोड़ें, जिसे `Render()` कहा जाता है।

3. फ़ंक्शन के शरीर को `Render()` विधि में ले जाएँ।

4. `Props` को `Render()` बॉडी में ` this.props` से बदलें।

5. शेष खाली फ़ंक्शन घोषणा को हटा दें।

```js
class क्लॉक extends React.Component {
  render() {
    return (
      <div>
        <h1>नमस्ते, दुनिया! </h1>
        <h2>यह {this.props.date.toLocaleTimeString()} है। </h2>
      </div>
    );
  }
}
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`क्लॉक` को अब एक फ़ंक्शन के बजाय एक वर्ग के रूप में परिभाषित किया गया है।

`Render` विधि को हर बार अपडेट होने के बाद कहा जाएगा, लेकिन जब तक हम` <क्लॉक /> `को एक ही डोम नोड में रेंडर करते हैं, तब तक` क्लॉक` क्लास का केवल एक ही उदाहरण इस्तेमाल किया जाएगा। इससे हम स्थानीय state और जीवनचक्र विधियों जैसी अतिरिक्त सुविधाओं का उपयोग कर सकते हैं।

## क्लास में स्थानीय state जोड़ना {#adding-local-state-to-a-class}

हम तीन चरणों में प्रॉप्स से `Date` को state में स्थानांतरित करेंगे:

1) `Render()` विधि में `this.props.date` को `this.state.date `के साथ बदलें:

```js{6}
class क्लॉक extends React.Component {
  render() {
    return (
      <div>
        <h1>नमस्ते, दुनिया!</h1>
        <h2>यह  {this.state.date.toLocaleTimeString()} है।</h2>
      </div>
    );
  }
}
```

2) एक [class constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) जोड़ें जो प्रारंभिक `this.state` को असाइन करता है:

```js{4}
class क्लॉक extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>नमस्ते, दुनिया!</h1>
        <h2>यह  {this.state.date.toLocaleTimeString()} है।</h2>
      </div>
    );
  }
}
```

ध्यान दें कि हम बेस constructor के लिए `props` कैसे पास करते हैं:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

क्लास के घटकों को हमेशा बेस कंस्ट्रक्टर को `props` के साथ कॉल करना चाहिए।

3) `<क्लॉक />` तत्व से `date` प्रोप निकालें:

```js{2}
ReactDOM.render(
  <क्लॉक />,
  document.getElementById('root')
);
```

हम बाद में टाइमर कोड को कौम्पोनॅन्ट में वापस जोड़ देंगे।

परिणाम इस तरह दिखता है:

```js{2-5,11,18}
class क्लॉक extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>नमस्ते, दुनिया!</h1>
        <h2>यह  {this.state.date.toLocaleTimeString()} है।</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <क्लॉक />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

इसके बाद, हम `क्लॉक` को अपना टाइमर सेट करेंगे और हर सेकंड में खुद को अपडेट करेंगे।

## क्लास में जीवनचक्र की विधियाँ जोड़ना {#adding-lifecycle-methods-to-a-class}

कई कौम्पोनॅन्ट के साथ अनुप्रयोगों में, जब वे नष्ट हो जाते हैं तो कौम्पोनॅन्ट द्वारा लिए गए संसाधनों को मुक्त करना बहुत महत्वपूर्ण है।

हम चाहते हैं कि जब भी `क्लॉक` को पहली बार DOM को प्रदान किया जाए तो एक [टाइमर सेट करें](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) । इसे रिएक्ट में "माउंटिंग" कहा जाता है।

हम यह भी चाहते हैं कि जब भी `क्लॉक` द्वारा निर्मित DOM को हटाया जाए तो वह [उस टाइमर](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) को साफ़ कर दे। इसे रिएक्ट में "अनमाउंटिंग" कहा जाता है।

हम कौम्पोनॅन्ट कोड पर कुछ तरीकों को चलाने के लिए विशेष तरीकों की घोषणा कर सकते हैं जब एक कौम्पोनॅन्ट माउंट करता है और अनमाउंट करता है:

```js{7-9,11-13}
class क्लॉक extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>नमस्ते, दुनिया!</h1>
        <h2>यह  {this.state.date.toLocaleTimeString()} है।</h2>
      </div>
    );
  }
}
```

इन विधियों को "जीवनचक्र विधियां" कहा जाता है।

DOM के लिए कंपोनेंट आउटपुट दिए जाने के बाद `ComponentsDidMount ()` विधि चलती है। टाइमर सेट करने के लिए यह एक अच्छी जगह है:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.टिक(),
      1000
    );
  }
```


ध्यान दें कि हम टाइमर आईडी को `this` पर सही तरीके से सहेजते हैं।

जबकि `this.props` को React द्वारा स्थापित किया गया है और` this.state` का एक विशेष अर्थ है, यदि आप डेटा प्रवाह में भाग नहीं लेने वाली किसी चीज़ को संग्रहीत करने की आवश्यकता है, तो आप वर्ग में अतिरिक्त फ़ील्ड जोड़ने के लिए स्वतंत्र हैं (एक टाइमर आईडी की तरह)।

हम `componentWillUnmount()` जीवनचक्र विधि में टाइमर को फाड़ देंगे:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

अंत में, हम `टिक ()` नामक एक विधि को लागू करेंगे कि `क्लॉक` कौम्पोनॅन्ट हर सेकंड चलेगा।

यह कौम्पोनॅन्ट स्थानीय स्थिति के अपडेट को शेड्यूल करने के लिए `this.setState ()` का उपयोग करेगा:

```js{18-22}
class क्लॉक extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.टिक(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  टिक() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>नमस्ते, दुनिया!</h1>
        <h2>यह  {this.state.date.toLocaleTimeString()} है।</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <क्लॉक />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

अब घड़ी हर सेकंड टिक जाती है।

आइए जल्दी से फिर से तैयार करें कि क्या हो रहा है और किस क्रम में विधियाँ कहलाती हैं

1) जब `<क्लॉक />` `ReactDOM.render ()` को दिया जाता है, तो रिएक्ट `क्लॉक` कौम्पोनॅन्ट के निर्माता को बुलाता है। चूँकि `क्लॉक` को वर्तमान समय को प्रदर्शित करने की आवश्यकता है, यह वर्तमान समय सहित किसी ऑब्जेक्ट के साथ` this.state` को आरंभ करता है। हम बाद में इस स्थिति को अपडेट करेंगे।

2) React तब `क्लॉक` कौम्पोनॅन्ट के` Render () `विधि कहते हैं। यह कैसे React स्क्रीन पर प्रदर्शित किया जाना चाहिए सीखता है। रिएक्ट तो DOM को `क्लॉक` के रेंडर आउटपुट से मैच करने के लिए अपडेट करता है।

3) जब DOM में `क्लॉक` आउटपुट डाला जाता है, तो रिएक्ट` componentDidMount () `जीवनचक्र विधि को कॉल करता है। इसके अंदर, `क्लॉक` कौम्पोनॅन्ट एक सेकंड में एक बार कौम्पोनॅन्ट के` टिक () `विधि को कॉल करने के लिए एक टाइमर सेट करने के लिए ब्राउज़र से पूछता है।

4) हर सेकंड ब्राउज़र `टिक ()` विधि कहता है। इसके अंदर, `क्लॉक` कौम्पोनॅन्ट वर्तमान समय वाले ऑब्जेक्ट के साथ`  setstate() `कहकर UI अपडेट को शेड्यूल करता है। `SetState()` कॉल के लिए धन्यवाद, React जानता है कि स्थिति बदल गई है, और स्क्रीन पर क्या होना चाहिए जानने के लिए फिर से `Render()` विधि को कॉल करता है। इस बार `Render()` विधि में `this.state.date` अलग होगा, और इसलिए रेंडर आउटपुट में अपडेटेड समय शामिल होगा। React तदनुसार DOM को अपडेट करता है।

5) यदि DOM से `क्लॉक` कंपोनेंट को कभी हटा दिया जाता है, तो रिएक्ट` componentWillUnmount()` जीवनचक्र विधि को कॉल करता है ताकि टाइमर बंद हो जाए।

## सही ढंग से state का उपयोग करना {#using-state-correctly}

`SetState()` के बारे में आपको तीन बातें पता होनी चाहिए।

### सीधे state को संशोधित न करें {#do-not-modify-state-directly}

उदाहरण के लिए, यह एक कौम्पोनॅन्ट को फिर से प्रस्तुत नहीं करेगा:

```js
// Wrong
this.state.comment = 'नमस्ते';
```

इसके बजाय, `setState ()` का उपयोग करें:

```js
// Correct
this.setState({comment: 'नमस्ते'});
```

एकमात्र जगह जहां आप `this.state` को असाइन कर सकते हैं, वह है कंस्ट्रक्टर।

### State अपडेट्स असिंक्रोनस हो सकते हैं {#state-updates-may-be-asynchronous}

React एक ही अपडेट में कई `setState ()` कॉल को बैच सकता है।

क्योंकि `this.props` और` this.state` को एसिंक्रोनस रूप से अपडेट किया जा सकता है, आपको अगले राज्य की गणना के लिए उनके मूल्यों पर भरोसा नहीं करना चाहिए।

उदाहरण के लिए, यह कोड काउंटर को अपडेट करने में विफल हो सकता है:

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

इसे ठीक करने के लिए, `setState ()` के दूसरे रूप का उपयोग करें, जो एक वस्तु के बजाय एक फ़ंक्शन को स्वीकार करता है। वह फ़ंक्शन पिछली स्थिति को पहले तर्क के रूप में प्राप्त करेगा, और उस समय के अपडेट के बाद दूसरा तर्क के रूप में लागू होता है:

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

हमने ऊपर एक [एरो फंक्शन](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) इस्तेमाल किया, लेकिन यह नियमित कार्यों के साथ भी काम करता है:

```js
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### State अपडेट्स मर्ज किए गए हैं {#state-updates-are-merged}

जब आप `setState ()` कहते हैं, तो React आपके द्वारा वर्तमान स्थिति में प्रदान की गई वस्तु को मर्ज कर देती है।

उदाहरण के लिए, आपके state में कई स्वतंत्र चर हो सकते हैं:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

फिर आप उन्हें अलग-अलग `setState ()` कॉल के साथ स्वतंत्र रूप से अपडेट कर सकते हैं:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

विलय उथला है, इसलिए `this.setState ({comments})` को `this.state.posts` बरकरार रखता है, लेकिन पूरी तरह से` this.state.comments` को बदल देता है।

## डेटा नीचे बहती है {#the-data-flows-down}

यदि कोई निश्चित कौम्पोनॅन्ट स्टेटफुल या स्टेटलेस है, तो न तो माता-पिता और न ही बच्चे कौम्पोनॅन्ट को पता चल सकता है, और उन्हें परवाह नहीं करनी चाहिए कि क्या यह एक फ़ंक्शन या वर्ग के रूप में परिभाषित किया गया है।

यही कारण है कि state को अक्सर स्थानीय या समझाया जाता है। यह किसी भी कौम्पोनॅन्ट के अलावा अन्य के लिए सुलभ नहीं है जो इसका मालिक है और इसे सेट करता है।

एक कौम्पोनॅन्ट अपने state को अपने बाल कौम्पोनॅन्ट के लिए सहारा के रूप में पारित करने का विकल्प चुन सकता है:

```js
<h2>यह {this.state.date.toLocaleTimeString()}है।</h2>
```

यह उपयोगकर्ता द्वारा परिभाषित कौम्पोनॅन्ट के लिए भी काम करता है:

```js
<FormattedDate date={this.state.date} />
```

`FormattedDate` कौम्पोनॅन्ट को उसके प्रॉप्स में` date `प्राप्त होगी और यह नहीं पता चलेगा कि वह `क्लॉक` के state से आया है,` क्लॉक` के प्रॉप्स से, या हाथ से टाइप किया गया था:

```js
function FormattedDate(props) {
  return <h2>यह {props.date.toLocaleTimeString()}है।</h2>;
}
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

इसे आमतौर पर "टॉप-डाउन" या "यूनिडायरेक्शनल" डेटा प्रवाह कहा जाता है। कोई भी state हमेशा कुछ विशिष्ट कौम्पोनॅन्ट के स्वामित्व में होता है, और उस state से प्राप्त कोई भी डेटा या UI केवल पेड़ में "नीचे" कौम्पोनॅन्ट को प्रभावित कर सकता है।

यदि आप एक कौम्पोनॅन्ट के पेड़ को प्रॉप्स के झरने के रूप में कल्पना करते हैं, तो प्रत्येक कौम्पोनॅन्ट की स्थिति एक अतिरिक्त पानी के स्रोत की तरह होती है जो इसे एक मनमाना बिंदु पर मिलती है लेकिन नीचे बहती है।

यह दर्शाने के लिए कि सभी कौम्पोनॅन्ट वास्तव में अलग-थलग हैं, हम एक `App` कौम्पोनॅन्ट बना सकते हैं जो तीन` <क्लॉक> `s प्रदान करता है:

```js{4-6}
function App() {
  return (
    <div>
      <क्लॉक />
      <क्लॉक />
      <क्लॉक />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

प्रत्येक `क्लॉक` अपने टाइमर और स्वतंत्र रूप से अपडेट करता है।

रिएक्ट ऐप्स में, चाहे कोई कौम्पोनॅन्ट स्टेटफुल हो या स्टेटलेस, उस कौम्पोनॅन्ट का कार्यान्वयन विवरण माना जाता है जो समय के साथ बदल सकता है। आप स्टेटफुल कौम्पोनॅन्ट के अंदर स्टेटलेस कौम्पोनॅन्ट का उपयोग कर सकते हैं, और इसके विपरीत।

