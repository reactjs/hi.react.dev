---
id: components-and-props
title: कौम्पोनॅन्ट तथा Props
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

कौम्पोनॅन्टस हमें UI को स्वतंत्र, पुन: प्रयोज्य टुकड़ो में विभाजित करने में मदद करता है ,तथा
हर हिस्से को अलग मानता है. यह पन्ना कौम्पोनॅन्टस का परिचय देता है. आप खोज सकते है [ विस्तृत कौम्पोनॅन्ट API reference यहाँ पर](/docs/react-component.html).

सैद्धांतिक रूप से, कौम्पोनॅन्टस जावास्क्रिप्ट फंक्शन्स जैसा है. 
वे अर्बिट्ररी इनपुट्स स्वीकार करते है (जिससे "props" बुलाया जाता है ) और वापस आती है React एलिमेंट्स जो वर्णन करती है की स्क्रीन पर क्या आना चाहिए.

## फंक्शन्स तथा कौम्पोनॅन्टस {#function-and-class-components}

सबसे सरल तरीका एक कौम्पोनॅन्ट को परिभाषित करने की यह है की एक  जावास्क्रिप्ट फंक्शन्स लिखी जाए:

```js
function Welcome(props) {
  return <h1>नमस्ते, {props.name}</h1>;
}
```

यह फंक्शन्स एक वैध React कौम्पोनॅन्ट है क्योकि यह स्वीकार करता है एक अकेला "props" (which stands for properties) object argument with data और वापस आती है React एलिमेंट्स. हम उन कौम्पोनॅन्टस "फंक्शन्स कहते है  कौम्पोनॅन्टस "फंक्शन्स कौम्पोनॅन्टस" क्योकि वो वाकई में एक जावास्क्रिप्ट फंक्शन्स है.


आप भी उपयोग कर सकते हैं [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) का ताकि परिभाषित कर सके कौम्पोनॅन्ट को:

```js
class Welcome extends React.Component {
  render() {
    return <h1>नमस्ते, {this.props.name}</h1>;
  }
}
```

ऊपर के दोनों कौम्पोनॅन्टस बराबर है React's दृष्टिकोण से.

Classes की कुछ अतिरिक्त विशेषताएं भी हैं जिसकी हम चर्चा करेंगे [अगले खंड](/docs/state-and-lifecycle.html) में. तब तक, हम इस्तेमाल करेंगे फंक्शन्स कौम्पोनॅन्टस के संक्षिप्ति होने का.

## कौम्पोनॅन्ट रेंडरिंग {#rendering-a-component}

इससे पहले, हमने केवल वही React एलिमेंट्स का सामना किया जो DOM टैग्स का दर्शाता था:

```js
const element = <div />;
```

हालाँकि, एलिमेंट्स उपयोगकर्ता परिभाषित कौम्पोनॅन्टस को भी दर्शा सकते है:

```js
const element = <Welcome name="Sara" />;
```

जब कभी भी React देखता है एलिमेंट को यूजर-डिफाइंड  कौम्पोनॅन्ट का प्रतिनिधित्व करते हुए, it passes JSX attributes to this कौम्पोनॅन्ट as a single object. We call this object "props".

उदाहरण के लिए, यह कोड पेज पर रेंडर करता है "नमस्ते, Sara" :

```js{1,5}
function Welcome(props) {
  return <h1>नमस्ते, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

चलो देकते है इस उदाहरण में क्या होता है:

1. हम बुलाते है `ReactDOM.render()` को `<Welcome name="Sara" />` एलिमेंट्स से.
2. React बुलाते है `Welcome` कौम्पोनॅन्ट को `name: 'Sara'}` के साथ props के रूप में.
3. यह `Welcome` रेंडरस और वापस आती है `<h1>नमस्ते, Sara</h1>` एलिमेंट परिणाम के तौर पर .
4. React DOM कुशलता पूर्वक DOM को अपडेट करता है `<h1>नमस्ते, Sara</h1>` से.

>**Note:** हमेशा रेंडरस में नेम्स की शुरुवात कैपिटल लेटर से  होना चाहिए.
>
>React उन कौम्पोनॅन्टस को जो लोअरकेस से स्टार्ट होते है उससे DOM टैग्स मानता है. उदाहरण के लिए, `<div />` HTML div टैग्स को दर्शाता है, पर `<Welcome />` दर्शाता है रेंडरस को और ज़रुरत होती है `Welcome` को दायरे में होने की.
>
>इस सम्मेलन के पीछे तर्क के बारे में अधिक जानने के लिए, कृपया पढ़ें [JSX गहराई में](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## कौम्पोनॅन्टस लिखना {#composing-components}

कौम्पोनॅन्टस अन्य कौम्पोनॅन्टस का उल्लेख कर सकते हैं अपने आउटपुट में. इससे हम उसी रेंडरस का उपयोग कर सकते हैं, विस्तार के किसी भी स्तर के लिए. एक बटन, फॉर्म, डायलॉग, स्क्रीन: React अप्प्स में, वे सब को आमतौर पर कौम्पोनॅन्टस के रूप में व्यक्त किया जाता है.

उदाहरण के लिए, हम एक `App` बना सकते हैं जो रेंडरस करता है `Welcome` को कई बार:

```js{8-10}
function Welcome(props) {
  return <h1>नमस्ते, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

आम तौर पर, नया React अप्प्स के पास एक अकेला `App`  रेंडरस होता है सबसे ऊपर में. हालाँकि, अगर आप एकीकृत करते हैं React एक मौजूदा ऐप में, आप नीचे शुरू कर सकते छोटी चीज़ो के रेंडर्स से हैं जैसे `Button` और धीरे-धीरे दृश्य पदानुक्रम के ऊपर तक.

## कौम्पोनॅन्टस निकालना {#extracting-components}

कौम्पोनॅन्टस को छोटे छोटे कौम्पोनॅन्टस में विभाजित करने से डरना नहीं चाहिए.

उदाहरण के लिए, इस पर विचार करो की `Comment` रेंडरस:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components)

यह स्वीकार करता है `author` (एक ऑब्जेक्ट), `text` (एक स्ट्रिंग), और `date` (एक डेट) जैसे props, और सोशल मीडिया वेबसाइट पर एक टिप्पणी का वर्णन करता है.

यह रेंडरस को बदलने के लिए मुश्किल हो सकता है क्योंकि एक के अंदर दूसरी संरचना के वजह से,तथा इसकी अकेली पार्ट्स का पुन: उपयोग करना भी कठिन है. चलो कुछ कौम्पोनॅन्टस निकालते हैं.

सबसे पहले, हम निकालेंगे `Avatar`:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```
 

यह `Avatar` को जानने की जरूरत नहीं है कि यह एक `Comment` के अंदर रेंडर किया जा रहा है. इसलिए हमने इसके prop को एक ज्यादा सामान्य नाम दिया है : `user` 
बजाय `author` के.

We recommend naming props from the रेंडरस's own point of view rather than the context in which it is being used.

We can now simplify `Comment` a tiny bit:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Next, we will extract a `UserInfo` रेंडरस that रेंडरस an `Avatar` next to the user's name:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

This lets us simplify `Comment` even further:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components-continued)

Extracting कौम्पोनॅन्टस might seem like grunt work at first, but having a palette of reusable कौम्पोनॅन्टस pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be a reusable कौम्पोनॅन्ट.

## Props are Read-Only {#props-are-read-only}

Whether you declare a कौम्पोनॅन्ट [as a फंक्शन्स or a class](#function-and-class-components), it must never modify its own props. Consider this `sum` फंक्शन्स:

```js
function sum(a, b) {
  return a + b;
}
```

Such फंक्शन्स are called ["pure"](https://en.wikipedia.org/wiki/Pure_function) because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this फंक्शन्स is impure because it changes its own input:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React is pretty flexible but it has a single strict rule:

**All React कौम्पोनॅन्टस must act like pure फंक्शन्स with respect to their props.**

Of course, application UIs are dynamic and change over time. In the [next section](/docs/state-and-lifecycle.html), we will introduce a new concept of "state". State allows React कौम्पोनॅन्टस to change their output over time in response to user actions, network responses, and anything else, without violating this rule.
