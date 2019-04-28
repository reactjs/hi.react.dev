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
कौम्पोनॅन्टस हमें UI को स्वतंत्र, पुन: प्रयोज्य टुकड़ो में विभाजित करने में मदद करते हैं, तथा हर हिस्से को अलग मानते है| यह पेज कौम्पोनॅन्टस का परिचय देता है| आपको [यहाँ पर विस्तृत कौम्पोनॅन्ट API reference](/docs/react-component.html) मिल जाएगी|

सैद्धांतिक रूप से, कौम्पोनॅन्टस जावास्क्रिप्ट फंक्शन्स जैसे हैं| वे अर्बिट्ररी इनपुट्स स्वीकार करते है (जिसे "props" बुलाया जाता है ) और React एलिमेंट्स रीटर्न करते हैं जो वर्णन करती है की स्क्रीन पर क्या दिखना चाहिए|

## फंक्शन्स तथा क्लास कौम्पोनॅन्टस {#function-and-class-components}

कौम्पोनॅन्ट को परिभाषित करने कासबसे सरल तरीका एक जावास्क्रिप्ट फंक्शन् है:

```js
function Welcome(props) {
  return <h1>नमस्ते, {props.name}</h1>;
}
```

यह फंक्शन्स एक वैध React कौम्पोनॅन्ट है क्योकि यह एक अकेला "props" (जो properties का प्रतिनिधित्व करता है) ऑब्जेक्ट आर्गुमेंट डाटा सहित स्वीकार करता है और React एलिमेंट् वापस करता है| हम इन कौम्पोनॅन्टस को "फंक्शन्स कौम्पोनॅन्टस" कहते है क्योकि वो वाकई में एक जावास्क्रिप्ट फंक्शन् है|

आप कौम्पोनॅन्ट को परिभाषित करने के लिए एक [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) का उपयोग भी कर सकते हैं:

```js
class Welcome extends React.Component {
  render() {
    return <h1>नमस्ते, {this.props.name}</h1>;
  }
}
```

ऊपर के दोनों कौम्पोनॅन्ट React के दृष्टिकोण से बराबर है|

क्लासेज की कुछ अतिरिक्त विशेषताएं भी हैं जिसकी हम चर्चा [अगले खंड](/docs/state-and-lifecycle.html) में करेंगे| तब तक, हम उनकी संक्षिप्तता के लिए फ़ंक्शन कौम्पोनॅन्टस का उपयोग करेंगे।

## कौम्पोनॅन्ट रेंडरिंग {#rendering-a-component}

इससे पहले, हमने केवल वही React एलिमेंट्स का सामना किया जो DOM टैग्स को दर्शाते थे:

```js
const element = <div />;
```

हालाँकि, एलिमेंट्स यूज़र डिफ़ाइंड कौम्पोनॅन्टस को भी दर्शा सकते है:

```js
const element = <Welcome name="नेहा" />;
```

जब कभी भी React एक एलिमेंट को यूजर-डिफाइंड कौम्पोनॅन्ट का प्रतिनिधित्व करते हुए देखता है, तुरंत ही इन कौम्पोनॅन्टs को एक ऑब्जेक्ट के रूप में JSX ऐट्रिब्यूट्स पास कर देता है| हम इस ऑब्जेक्ट को "props" कहते हैं|

उदाहरण के लिए, यह कोड पेज पर रेंडर करता है "नमस्ते, नेहा":

```js{1,5}
function Welcome(props) {
  return <h1>नमस्ते, {props.name}</h1>;
}

const element = <Welcome name="नेहा" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

चलिए देख़ते है इस उदाहरण में क्या होता है:

1. हम `<Welcome name="नेहा" />` के द्वारा `ReactDOM.render()` को call karte है|
2. React `Welcome` कौम्पोनॅन्ट को `name: 'नेहा'}` के साथ props के रूप मे call करती है|
3. हमारा `Welcome` कौम्पोनॅन्ट परिणाम के तौर पर `<h1>नमस्ते, नेहा</h1>` एलिमेंट वापस लौटाता करता है|
4. React DOM कुशलता पूर्वक DOM को `<h1>नमस्ते, नेहा</h1>` से अपडेट करता है|

>**ध्यान दें:** कौम्पोनॅन्टस के नाम की शुरुवात हमेशा कैपिटल लेटर से होनी चाहिए|
>
>React उन कौम्पोनॅन्टस को DOM टैग्स मानता है जो लोअरकेस अक्षरों से स्टार्ट होते है| उदाहरण के लिए, `<div />` HTML div टैग्स को दर्शाता है, पर `<Welcome />` एक कौम्पोनॅन्ट को दर्शाता है और इसके लिए Welcome स्कोप में चाहिए होता है|
>
>इसके पीछे की सोच के बारे में और गहराई में जानने के लिए, कृपया [JSX गहराई में](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) पढ़ें|

## कौम्पोनॅन्टस की रचना {#composing-components}

कौम्पोनॅन्टस अपने आउटपुट में अन्य कौम्पोनॅन्टस को रेफेर कर सकते हैं| यह हमें कौम्पोनॅन्ट अब्स्ट्रक्शंस का उपयोग विवरण के किसी भी स्तर के लिए करने देता है| एक बटन, एक फॉर्म, एक डायलॉग, एक स्क्रीन: इन React ऍप्स में सबको आमतौर पर कौम्पोनॅन्टस के रूप में व्यक्त किया जाता है|

उदाहरण के लिए, हम एक `App` बना सकते हैं जो Welcome को कई बार रेंडर करती है:

```js{8-10}
function Welcome(props) {
  return <h1>नमस्ते, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="नेहा" />
      <Welcome name="चहल" />
      <Welcome name="राम" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

आम तौर पर, नए React ऍप्स के अंदर एक अकेला `App` कॉम्पोनेन्ट सबसे ऊपर होता है| हालाँकि, अगर आप React को एक मौजूदा ऐप में इंटेग्रेट करते है, आप बेहद छोटी चीज़ो के रेंडर्स से शुरुवात कर सकते हैं जैसे `Button` और धीरे-धीरे दृश्य पदानुक्रम के नीचे से ऊपर तक जा सकते है|

## कौम्पोनॅन्टस निकालना {#extracting-components}

कौम्पोनॅन्टस को छोटे छोटे कौम्पोनॅन्टस में विभाजित करने में संकोच ना करे|

उदाहरण के लिए, इस `Comment` कौम्पोनॅन्ट पर विचार करें:

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

यह `author` (एक ऑब्जेक्ट), `text` (एक string), और `date` (एक date) को props के द्वारा स्वीकार करता है, और सोशल मीडिया वेबसाइट पर एक टिप्पणी का वर्णन करता है|

इस कौम्पोनॅन्टस की नेस्टिंग की वजह से बदलना मुश्किल हो सकता है, तथा इसके अकेले पार्ट्स का पुन: उपयोग करना भी कठिन है| चलिए इसमें से कुछ कौम्पोनॅन्टस निकालने की कोशिश करते हैं |

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

इस `Avatar` को जानने की जरूरत नहीं है कि यह एक `Comment` के अंदर रेंडर किया जा रहा है| इसलिए हमने इसके prop को `author` के बजाय एक ज्यादा
सामान्य नाम `user` दिया है|

Props का नामकरण हम कौम्पोनॅन्टस के अनुसार करने की सलाह देते हैं बजाय जिसमें इसका उपयोग किया जा रहा है उसके अनुसार हो|

हम अब `Comment` को थोड़ा सरल कर सकते हैं:

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

आगे, हम इसमें से एक `UserInfo` कौम्पोनॅन्टस निकालेंगे जो यूजर के नाम के पास `Avatar` को रेंडर करेगा:

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

यह हमे `Comment` को और भी ज्यादा आसान बनाने का मौका देता है:

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

कौम्पोनॅन्टस निकालने के लिए पहली बार में असंतोषजनक काम लग सकता है, लेकिन पुन: प्रयोज्य कौम्पोनॅन्टस का एक पैलेट होना बड़े ऐप्स बनाने में सहायता करता है| यह एक अच्छी आदत है की अगर आपके UI के पार्ट कई बार इस्तेमाल किये गए हो (`Button`, `Panel`, `Avatar`), या अपने आप में काफी जटिल हो (`App`, `FeedStory`, `Comment`), तब इन परिस्तियों में यह पुन: प्रयोज्य कौम्पोनॅन्ट होने के लिए एक अच्छा उम्मीदवार होगा|

## Props केवल-पढ़ने के लिए हैं {#props-are-read-only}

जब भी आप एक कॉम्पोनेन्ट को [फंक्शन या क्लास के जैसे](#function-and-class-components) डिक्लेअर करें, इसे कभी भी खुदके props का संशोधित नहीं करना चाहिए| इस `sum` फंक्शन्स पर विचार करो:

```js
function sum(a, b) {
  return a + b;
}
```

ऐसे फंक्शन्स को हम ["pure"](https://en.wikipedia.org/wiki/Pure_function) कहते है क्योंकि वे अपने इनपुट को बदलने का प्रयास नहीं करते हैं, और हमेशा समान इनपुट के लिए समान परिणाम लौटाते हैं| 

इसके विपरीत, यह फंक्शन्स impure है क्योंकि यह अपना इनपुट खुद बदलता है:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React बहुत लचीला है, लेकिन इसमें एक सख्त नियम है:

**सारे React कौम्पोनॅन्टस को अपने props के अनुसार pure फंक्शन्स की तरह कार्य करना चाहिए|**


बेशक, एप्लीकेशन UI गतिशील हैं और समय के साथ बदलते रहते हैं| अब [अगले सेक्शन](/docs/state-and-lifecycle.html) में, हम एक नई अवधारणा "state" पेश करेंगे| State React कौम्पोनॅन्टस को उपयोगकर्ता क्रियाओं, नेटवर्क प्रतिक्रियाएँ या कुछ भी, के जवाब में समय के साथ अपने आउटपुट को बदलने के लिए अनुमति देता है, बिना इस नियम का उल्लंघन किए|
