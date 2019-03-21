---
id: lists-and-keys
title: Lists and Keys
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

पहले, आइए समीक्षा करें कि आप जावास्क्रिप्ट में लिस्ट्स को कैसे बदलते हैं।


नीचे दिए गए कोड में हम `numbers` की एक array लेने और उनके मूल्यों को दोगुना करने के लिए मैप फ़ंक्शन का उपयोग करते हैं। हम मैप द्वारा दिए गए नए array को `double` नाम के वेरिएबल को सौपते हैं और फिर लॉग करते हैं।

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```
यह कोड [2, 4, 6, 8, 10] को कंसोल पर लोग कर देगा।

रियेक्ट में,array को लिस्ट ऑफ़ [एलिमेंट्स](/docs/rendering-elements.html) में बदलना लगभग समान है।

### कई कौम्पोनॅन्ट का की रेंडरिंग {# कई कौम्पोनॅन्ट का की रेंडरिंग }

आप एलिमेंट्स का संग्रह बना सकते हैं और कर्ली ब्रेसिज़ `{}` का उपयोग करके [उन्हें Jsx में शामिल करें](/docs/introducing-jsx.html#embedding-expressions-in-jsx)

हमने जावास्क्रिप्ट [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) फंक्शन का उपयोग करके `numbers` नाम की array में लूप लगाया है। हमने प्रत्येक आइटम के लिए  `<li>` एलिमेंट को रिटर्न किया है।  अंत में, हम परिणामस्वरूप  आयी हुई एलिमेंट्स की array को `listItems` को सौपते है। 

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

पुरे `listItems` ऐरे को `<ul>` एलिमेंट में शामिल करके इसे [DOM को रेंडर करे](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**कोडपेन पर इसे आजमाएं**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

यह कोड 1 से 5 के बीच संख्याओं की एक बुलेट लिस्ट प्रदर्शित करता है।

###मूल लिस्टस कौम्पोनॅन्ट{#मूल लिस्टस कौम्पोनॅन्ट}

आमतौर पर आप एक [कौम्पोनॅन्ट](/docs/components-and-props.html) के अंदर लिस्ट प्रस्तुत करेंगे। 

हम पिछले उदाहरण को एक कौम्पोनॅन्ट में बदल सकते हैं जो `numbers ` की एक array को स्वीकार करता है और एलिमेंटस की लिस्ट को आउटपुट करता है।

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

जब आप यह कोड चलाते हैं, तो आपको एक चेतावनी दी जाती है कि लिस्ट आइटम के लिए एक key प्रदान की जानी चाहिए। "key" एक विशेष स्ट्रिंग विशेषता है जिसे आपको 
एलिमेंटस की सूची बनाते समय शामिल करने की आवश्यकता होती है। हम चर्चा करेंगे अगले भाग में कि यह महत्वपूर्ण क्यों है।

आइए `numbers.map() ` के अंदर हमारी लिस्ट आइटम की एक `key`असाइन करें और लापता key की समस्या को ठीक करें।

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**कोडपेन पर इसे आजमाएं**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Keys{#Keys}

Keys प्रतिक्रिया को पहचानने में मदद करती हैं कि कौन से आइटम बदले गए हैं, जोड़े गए हैं, या हटा दिए गए हैं। एलिमेंटस को स्थिर पहचान देने के लिए array के अंदर तत्वों को key  दी जानी चाहिए:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

key चुनने का सबसे अच्छा तरीका एक स्ट्रिंग का उपयोग करना है जो विशिष्ट रूप से अपने भाई-बहनों के बीच एक लिस्ट आइटम की पहचान करता है। अक्सर आप चाबी के रूप में अपने डेटा से आईडी का उपयोग करेंगे:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

जब आपके पास प्रदान की गई वस्तुओं के लिए स्थिर आईडी नहीं है, तो आप अंतिम उपाय के रूप में key के रूप में आइटम इंडेक्स का उपयोग कर सकते हैं:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

यदि आइटम का क्रम बदल सकता है तो हम key के लिए इंडेक्स का उपयोग करने की अनुशंसा नहीं करते हैं। यह प्रदर्शन को नकारात्मक रूप से प्रभावित कर सकता है और कौम्पोनॅन्ट की अवस्था के साथ समस्या पैदा कर सकता है। [इंडेक्स को key  के रूप में उपयोग करने के नकारात्मक प्रभावों](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318). पर गहन व्याख्या के लिए रॉबिन पोकोर्न के लेख को देखें। यदि आप आइटमों को सूचीबद्ध करने के लिए एक स्पष्ट key  निर्दिष्ट नहीं करने का विकल्प चुनते हैं तो रिएक्ट key  के रूप में इंडेक्स का उपयोग करने के लिए डिफ़ॉल्ट होगा।

यदि आप अधिक सीखने में रुचि रखते हैं, [तो key क्यों आवश्यक है](/docs/reconciliation.html#recursing-on-children) , इस बारे में गहराई से व्याख्या की गई है।
###key  के साथ कौम्पोनॅन्ट निकालना{#key के साथ कौम्पोनॅन्ट निकालना}

keys केवल आस-पास के array के संदर्भ में समझ में आती हैं।

उदाहरण के लिए, यदि आप एक ListItem कौम्पोनॅन्ट को [निकालते](/docs/components-and-props.html#extracting-components) हैं,तो आपको key  array के `<ListItem />` एलिमेंट पर रखनी चाहिए बजाये खुद `ListItem` के `<li>` एलिमेंट पर रखने के। 

**उदाहरण: गलत key  का उपयोग**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**उदाहरण:key  का सही उपयोग**

```javascript{2,3,9,10}
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**कोडपेन पर इसे आजमाएं**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

एक अच्छा नियम यह है कि एलिमेंटस  को `map()` कॉल के समय पर key  की जरुरत पड़ती है।  

### keys सिर्फ़ भाई-बहनों के बीच अद्वितीय होनी चाहिए{#कीज़ सिर्फ़ भाई-बहनों के बीच अद्वितीय होनी चाहिए}

arrays के भीतर उपयोग की जाने वाली key उनके भाई-बहनों के बीच अद्वितीय होनी चाहिए। हालाँकि उन्हें विश्व स्तर पर अद्वितीय होने की आवश्यकता नहीं है। जब हम दो अलग-अलग arrays का उत्पादन करते हैं, तो हम उसी key  का उपयोग कर सकते हैं

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**CodePen पर इसे आज़माएं**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

keys रियेक्ट के लिए संकेत के रूप में काम करती हैं  लेकिन वे आपके कौम्पोनॅन्टस  को पास नहीं की जाती हैं।  यदि आपको अपने कौम्पोनॅन्ट में समान मूल्य की आवश्यकता है,तो इसे अलग नाम के साथ prop के रूप में स्पष्ट रूप से पास करें:

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

ऊपर के उदाहरण के साथ,`Post` कौम्पोनॅन्ट `props.id` पढ़ सकता है, लेकिन `props.key` नहीं।

### JSX में मैप की एम्बेडिंग  {#JSX में मैप की एम्बेडिंग}

ऊपर दिए गए उदाहरणों में हमने एक अलग `listItems` वेरिएबल को घोषित किया था और इसे JSX में शामिल किया था:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX allows [embedding any expression](/docs/introducing-jsx.html#embedding-expressions-in-jsx) in curly braces so we could inline the `map()` result:
JSX कर्ली ब्रेसिज़ में किसी भी एक्सप्रेशन को एम्बेडिंग करने की अनुमति देता है ताकि हम `map()` के परिणाम को इनलाइन कर सकें:

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**CodePen पर इसे आज़माएं**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

कभी-कभी इसका परिणाम स्पष्ट कोड होता है, लेकिन इस शैली का दुरुपयोग भी किया जा सकता है। जावास्क्रिप्ट की तरह, यह आपको तय करना है कि यह पठनीयता के लिए एक चर निकालने के लायक है या नहीं। ध्यान रखें कि यदि `map()` बॉडी बहुत नेस्टेड है, तो [कंपोनेंट निकालने](/docs/components-and-props.html#extracting-components).का अच्छा समय हो सकता है।
