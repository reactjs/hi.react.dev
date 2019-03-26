---
id: state-and-lifecycle
title: State और जीवनचक्र
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

यह पृष्ठ एक React कौम्पोनॅन्ट में state और जीवनचक्र की अवधारणा का परिचय देता है। आप [यहाँ एक विस्तृत कौम्पोनॅन्ट API संदर्भ](/docs/react-component.html) पा सकते हैं।

[पिछले अनुभागों में से एक](/docs/rendering-elements.html#updating-the-rendered-element) घड़ी के उदाहरण पर विचार करें। [रेंडरिंग एलिमेंट्स](/docs/rendering-elements.html#rendering-an-element-into-the-dom) में हमने UI को अपडेट करने का केवल एक तरीका सीखा है। प्रदान किए गए आउटपुट को बदलने के लिए हम `ReactDOM.render()` को कॉल करते हैं :

```js{8-11}
function tick() {
  const element = (
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

setInterval(tick, 1000);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

इस खंड में, हम सीखेंगे कि `Clock` कौम्पोनॅन्ट को वास्तव में पुन: प्रयोज्य और समझाया कैसे बनाया जाए। यह अपना खुद का टाइमर सेट करेगा और हर सेकंड खुद को अपडेट करेगा।

घडी देखने में कैसी लगेगी यह हम एन्काप्सुलेटिंग द्वारा सुरु कर सकते हैं:

```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>नमस्ते, दुनिया!</h1>
      <h2>यह  {props.date.toLocaleTimeString()} है। </h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

हालांकि, यह तथ्य कि `Clock` एक टाइमर सेट करना और हर सेकंड UI को अपडेट करना `Clock` का कार्यान्वयन विवरण होना चाहिए।

आदर्श रूप से हम इसे एक बार लिखना चाहते हैं और चाहेंगे की `Clock` स्वयं को अपडेट करे:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

इसे लागू करने के लिए, हमें `Clock` कौम्पोनॅन्ट में "state" को `Clock` में डालना होगा।

State "props" के समान है, लेकिन यह निजी और कौम्पोनॅन्ट द्वारा पूरी तरह से नियंत्रित है।

हमने [पहले उल्लेख किया है](/docs/components-and-props.html#functional-and-class-components) कि क्लासेज के रूप में परिभाषित कौम्पोनॅन्टों में कुछ अतिरिक्त विशेषताएं हैं। लोकल state ठीक यही है: एक सुविधा जो केवल क्लासेज के लिए उपलब्ध है।

## किसी फंक्शन को क्लास में बदलना {#converting-a-function-to-a-class}

आप `Clock` जैसे फंक्शन कौम्पोनॅन्टों को पांच चरणों में क्लास में बदल सकते हैं:

1. `Clock` फंक्शन कंपोनेंट के नाम की ही एक `[ES6 क्लास]`(https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) बनाएँ, जो `React.Component` को एक्सटेंड करता है।

2. इसमें `render()` नाम का एक खाली फंक्शन लिखें।

3. फ़ंक्शन से सबकुछ `render()` फ़ंक्शन में ले जाएँ।

4. `render()` फंक्शन में `props` को `this.props` से बदलें।

5. शेष खाली फ़ंक्शन घोषणा को हटा दें।

```js
class Clock extends React.Component {
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

`Clock` को अब एक फ़ंक्शन के बजाय एक क्लास के रूप में परिभाषित किया गया है।

हर अपडेट पर `render` फंक्शन कॉल होगा, लेकिन जब तक हम `<Clock />` को एक ही DOM नोड में रेंडर करते हैं, तब तक `Clock` क्लास का केवल एक ही उदाहरण इस्तेमाल किया जाएगा। इससे हम लोकल state और जीवनचक्र विधियों जैसी अतिरिक्त सुविधाओं का उपयोग कर सकते हैं।

## क्लास में लोकल state ऐड करना {#adding-local-state-to-a-class}

हम तीन चरणों में date को props से state में भेजेंगे:

1) `render()` फंक्शन में `this.props.date` को `this.state.date` के साथ बदलें:

```js{6}
class Clock extends React.Component {
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
class Clock extends React.Component {
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

क्लास के कौम्पोनॅन्टों को हमेशा बेस कंस्ट्रक्टर को `props` के साथ कॉल करना चाहिए।

3) `<Clock />` एलिमेंट से `date` prop निकालें:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

हम बाद में टाइमर कोड को कौम्पोनॅन्ट में वापस डाल देंगे।

परिणाम इस तरह दिखता है:

```js{2-5,11,18}
class Clock extends React.Component {
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
  <Clock />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

इसके बाद, हम `Clock` को अपना टाइमर सेट और हर सेकंड में खुद को अपडेट करने देंगे।

## क्लास में जीवनचक्र की विधियाँ डालना {#adding-lifecycle-methods-to-a-class}

कई कौम्पोनॅन्ट के साथ अनुप्रयोगों में, जब वे नष्ट हो जाते हैं तो कौम्पोनॅन्ट द्वारा लिए गए संसाधनों को मुक्त करना बहुत महत्वपूर्ण है।

हम चाहते हैं कि जब भी `Clock` को पहली बार DOM को प्रदान किया जाए तो एक [टाइमर सेट करें](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) । इसे रिएक्ट में "माउंटिंग" कहा जाता है।

हम यह भी चाहते हैं कि जब भी `Clock` द्वारा निर्मित DOM को हटाया जाए तो वह [उस टाइमर](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) को हटा दे। इसे रिएक्ट में "अनमाउंटिंग" कहा जाता है।

जब एक कौम्पोनॅन्ट माउंट और अनमाउंट करता है तब कौम्पोनॅन्ट क्लास में कोड को चलने के लिए हम कुछ विशेष तरीकों की घोषणा कर सकते हैं:

```js{7-9,11-13}
class Clock extends React.Component {
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

DOM के लिए कौम्पोनॅन्ट आउटपुट दिए जाने के बाद `componentsDidMount()` फंक्शन चलता है। टाइमर सेट करने के लिए यह एक अच्छी जगह है:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

ध्यान दें कि हम टाइमर ID को `this` पर सही तरीके से सहेजते हैं।

जबकि `this.props` को React द्वारा स्थापित किया गया है और `this.state` का एक विशेष अर्थ है, यदि आप डेटा प्रवाह में भाग नहीं लेने वाली किसी चीज़ को संग्रहीत करने की आवश्यकता है, तो आप क्लास में अतिरिक्त फ़ील्ड ऐड के लिए स्वतंत्र हैं (एक टाइमर ID की तरह)।

हम `componentWillUnmount()` जीवनचक्र विधि में टाइमर को नष्ट कर देंगे:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

अंत में, हम `tick()` नामक एक फंक्शन को लागू करेंगे कि `Clock` कौम्पोनॅन्ट हर सेकंड चलेगा।

यह कौम्पोनॅन्ट लोकल state के अपडेट को शेड्यूल करने के लिए `this.setState()` का उपयोग करेगा:

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
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
  <Clock />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

अब घड़ी हर सेकंड tick होती है।

आइए जल्दी से फिर से तैयार करें कि क्या हो रहा है और किस क्रम में विधियाँ कहलाती हैं

1) जब `<Clock />` `ReactDOM.render()` को दिया जाता है, तो React `Clock` कौम्पोनॅन्ट के निर्माता को बुलाता है। चूँकि `Clock` को वर्तमान समय को प्रदर्शित करने की आवश्यकता है, यह वर्तमान समय सहित किसी ऑब्जेक्ट के साथ` this.state` को आरंभ करता है। हम बाद में इस state को अपडेट करेंगे।

2) इसके बाद React `Clock` कौम्पोनॅन्ट के `render()` फंक्शन को कॉल करता है। यह कैसे React स्क्रीन पर प्रदर्शित किया जाना चाहिए सीखता है। रिएक्ट तो DOM को `Clock` के रेंडर आउटपुट से मैच करने के लिए अपडेट करता है।

3) जब DOM में `Clock` आउटपुट डाला जाता है, तो React `componentDidMount()` जीवनचक्र फंक्शन को कॉल करता है। इसके अंदर, `Clock` कौम्पोनॅन्ट एक सेकंड में एक बार कौम्पोनॅन्ट के `tick()` फंक्शन को कॉल करने के लिए एक टाइमर सेट करने के लिए ब्राउज़र से पूछता है।

4) हर सेकंड ब्राउज़र `tick()` फंक्शन को कॉल करता है। इसके अंदर, `Clock` कौम्पोनॅन्ट वर्तमान समय वाले ऑब्जेक्ट के साथ `setstate()` कॉल करके UI अपडेट को शेड्यूल करता है। `setState()` कॉल के लिए धन्यवाद, React जानता है कि state बदल गई है, और स्क्रीन पर क्या होना चाहिए जानने के लिए फिर से `render()` फंक्शन को कॉल करता है। इस बार `render()` फंक्शन में `this.state.date` अलग होगा, और इसलिए रेंडर आउटपुट में अपडेटेड समय शामिल होगा। React उसी हिसाब से DOM को अपडेट करता है।

5) यदि DOM से `Clock` कौम्पोनॅन्ट को कभी हटा दिया जाता है, तो React `componentWillUnmount()` जीवनचक्र फंक्शन को कॉल करता है ताकि टाइमर बंद हो जाए।

## सही ढंग से state का उपयोग करना {#using-state-correctly}

`setState()` के बारे में आपको तीन बातें पता होनी चाहिए।

### सीधे state को संशोधित न करें {#do-not-modify-state-directly}

उदाहरण के लिए, यह एक कौम्पोनॅन्ट को फिर से प्रस्तुत नहीं करेगा:

```js
// Wrong
this.state.comment = 'नमस्ते';
```

इसके बजाय, `setState()` का उपयोग करें:

```js
// Correct
this.setState({comment: 'नमस्ते'});
```

एकमात्र जगह जहां आप `this.state` को असाइन कर सकते हैं, वह है कंस्ट्रक्टर।

### State अपडेट्स असिंक्रोनस हो सकते हैं {#state-updates-may-be-asynchronous}

React परफॉरमेंस के लिए कई सरे `setState()` कॉल को एक ही बार में चला देता है।

क्योंकि `this.props` और `this.state` को एसिंक्रोनस रूप से अपडेट किया जा सकता है, आपको अगले state की गणना के लिए उनके वैल्यूस पर निर्भर नहीं होना चाहिए

उदाहरण के लिए, यह कोड काउंटर को अपडेट करने में विफल हो सकता है:

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

इसे ठीक करने के लिए, `setState()` के दूसरे रूप का उपयोग करें, जो एक ऑब्जेक्ट के बजाय एक फ़ंक्शन को स्वीकार करता है। वह फ़ंक्शन पिछली state को पहले तर्क के रूप में प्राप्त करेगा, और अपडेट के समय के props दूसरे तर्क के रूप में लागू होते हैं:

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

जब आप `setState()` को कॉल करते हैं, तो React आपके द्वारा वर्तमान state में प्रदान किये गए ऑब्जेक्ट को मर्ज कर देता है।

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

फिर आप उन्हें अलग-अलग `setState()` कॉल के साथ स्वतंत्र रूप से अपडेट कर सकते हैं:

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

विलय उथला है, इसलिए `this.setState({comments})` को `this.state.posts` बरकरार रखता है, लेकिन पूरी तरह से `this.state.comments` को बदल देता है।

## डेटा नीचे बहता है {#the-data-flows-down}

यदि कोई निश्चित कौम्पोनॅन्ट स्टेटफुल या स्टेटलेस है, तो न तो पैरेंट और न ही चाइल्ड कौम्पोनॅन्ट को पता चल सकता है, और उन्हें परवाह नहीं करनी चाहिए कि क्या यह एक फ़ंक्शन या क्लास के रूप में परिभाषित किया गया है।

यही कारण है कि state को अक्सर लोकल या एनकेप्सुलेटेड भी कहा जाता है। यह किसी भी कौम्पोनॅन्ट के अलावा अन्य के लिए सुलभ नहीं है जो इसका मालिक है और इसे सेट करता है।

एक कौम्पोनॅन्ट अपने state को अपने चाइल्ड कौम्पोनॅन्ट के लिए सहारा के रूप में पारित करने का विकल्प चुन सकता है:

```js
<h2>यह {this.state.date.toLocaleTimeString()} है।</h2>
```

यह उपयोगकर्ता द्वारा परिभाषित कौम्पोनॅन्ट के लिए भी काम करता है:

```js
<FormattedDate date={this.state.date} />
```

`FormattedDate` कौम्पोनॅन्ट को उसके props में `date` प्राप्त होगी और यह नहीं पता चलेगा कि वह `Clock` के state से आया है, `Clock` के props से, या हाथ से टाइप किया गया था:

```js
function FormattedDate(props) {
  return <h2>यह {props.date.toLocaleTimeString()} है।</h2>;
}
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

इसे आमतौर पर "टॉप-डाउन" या "यूनिडायरेक्शनल" डेटा प्रवाह कहा जाता है। कोई भी state हमेशा कुछ विशिष्ट कौम्पोनॅन्ट के स्वामित्व में होता है, और उस state से प्राप्त कोई भी डेटा या UI केवल ट्री में खुद से "नीचे" कौम्पोनॅन्ट को प्रभावित कर सकता है।

यदि आप एक कौम्पोनॅन्ट के ट्री को props को वॉटरफॉल के रूप में कल्पना करते हैं, तो प्रत्येक कौम्पोनॅन्ट की state एक अतिरिक्त पानी के स्रोत की तरह होती है जो इसे एक मनमाने बिंदु पर मिलती है लेकिन नीचे बहती है।

यह दर्शाने के लिए कि सभी कौम्पोनॅन्ट वास्तव में अलग-थलग हैं, हम एक `App` कौम्पोनॅन्ट बना सकते हैं जो तीन `Clock>` s को रेंडर करेंगा:

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

प्रत्येक `Clock` अपने टाइमर और स्वतंत्र रूप से अपडेट करता है।

रिएक्ट ऐप्स में, चाहे कोई कौम्पोनॅन्ट स्टेटफुल हो या स्टेटलेस, उस कौम्पोनॅन्ट को कार्यान्वयन विवरण माना जाता है जो समय के साथ बदल सकता है। आप स्टेटफुल कौम्पोनॅन्ट के अंदर स्टेटलेस कौम्पोनॅन्ट का उपयोग कर सकते हैं, और इसके विपरीत।

