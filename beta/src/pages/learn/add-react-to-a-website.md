---
title: किसी वेबसाइट पर React ऐड करें
---

<Intro>

React को शुरू से ही धीरे-धीरे अपनाने के लिए डिज़ाइन किया गया है, और आप जितना चाहें उतना कम या ज्यादा React का उपयोग कर सकते हैं। चाहे आप माइक्रो-फ्रंटेंड, या एक मौजूदा सिस्टम के साथ काम कर रहे हों, या सिर्फ React को आज़मा रहे हों, आप HTML पेज पर इंटरेक्टिव React कौम्पोनॅन्ट के कोड की कुछ पंक्तियों के साथ ऐड करना शुरू कर सकते हैं - और कोई बिल्ड टूलिंग की ज़रूरत नहीं!

</Intro>

## एक मिनट में React ऐड करें {/*add-react-in-one-minute*/}

आप एक मिनट से भी कम समय में मौजूदा HTML पेज पर एक React कौम्पोनॅन्ट ऐड कर सकते हैं। इसे अपनी वेबसाइट या [एक खाली HTML फ़ाइल](https://gist.github.com/rachelnabors/7b33305bf33776354797a2e3c1445186/archive/859eac2f7079c9e1f0a6eb818a9684a464064d80.zip) के साथ आज़माएं—आपको बस एक इंटरनेट कनेक्शन और नोटपैड (या VSCode—को [कैसे सेट अप करें](/learn/editor-setup/) इस पर हमारी गाइड देखें) जैसे टेक्स्ट एडिटर की आवश्यकता है!

### स्टेप 1: HTML में एक एलिमेंट ऐड करें {/*step-1-add-an-element-to-the-html*/}

जिस HTML पेज को एडिट करके आप React के साथ कुछ डिस्प्ले करना चाहते हैं, वहां पर  एक खाली `<div>` टैग के साथ एक यूनिक ‘id’ वाला HTML एलिमेंट ऐड करें।

आप इस तरह का "कंटेनर" एलिमेंट `<div>` को `<body>` टैग के अंदर कहीं भी रख सकते हैं। React HTML एलिमेंट के अंदर किसी भी मौजूदा कंटेंट को बदल देगा, इसलिए वे आमतौर पर खाली होते हैं। आप अपनी ज़रूरत के हिसाब से ऐसे कितने भी HTML एलिमेंट्स एक पेज पर इस्तेमाल कर सकते हैं।

```html {3}
<!-- ... मौजूदा HTML ... -->

<div id="कौम्पोनॅन्ट-यहाँ-जाएगा"></div>

<!-- ... मौजूदा HTML ... -->
```

### स्टेप 2: Script टैग ऐड करें {/*step-2-add-the-script-tags*/}

HTML पेज में, क्लोजिंग `</body>` टैग से ठीक पहले, निम्न फ़ाइलों के लिए तीन `<script>` टैग ऐड करें:

- [**react.development.js**](https://unpkg.com/react@17/umd/react.development.js) React के कोर को लोड करता है
- [**react-dom.development.js**](https://unpkg.com/react-dom@17/umd/react-dom.development.js) React को HTML एलिमेंट्स [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model) को रेंडर करने देता है।
- **like_button.js** वह जगह है जहाँ आप स्टेप 3 में अपना कौम्पोनॅन्ट लिखेंगे!

<Gotcha>

डेप्लॉय करते समय, "development.js" को "production.min.js" से बदलें।

</Gotcha>

```html
  <!-- पेज का अंत -->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="like_button.js"></script>
</body>
```

### स्टेप 3: एक React कौम्पोनॅन्ट बनाएँ {/*step-3-create-a-react-component*/}

अपने HTML पेज के बगल में **like_button.js** नाम की एक फाइल बनाएं, इस कोड स्निपेट को ऐड करें और फाइल को सेव करें। यह कोड `LikeButton` नामक एक React कौम्पोनॅन्ट को डिफाइन करता है। [आप हमारे गाइड में कौम्पोनॅन्ट बनाने के बारे में अधिक जान सकते हैं।](/learn/your-first-component)

```js
'use strict';

function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return 'You liked this!';
  }

  return React.createElement(
    'button',
    {
      onClick: () => setLiked(true),
    },
    'Like'
  );
}
```

### स्टेप 4: पेज पर अपना React कौम्पोनॅन्ट ऐड करें {/*step-4-add-your-react-component-to-the-page*/}

अंत में, **like_button.js** के नीचे दो पंक्तियाँ ऐड करें। कोड की ये दो पंक्तियाँ पहले स्टेप में आपके द्वारा अपने HTML में ऐड किये गए `<div>` को ढूंढती हैं और फिर उसके अंदर "Like" बटन React कौम्पोनॅन्ट को डिस्प्ले करती हैं।

```js
const domContainer = document.getElementById('कौम्पोनॅन्ट-यहाँ-जाएगा');
ReactDOM.render(React.createElement(LikeButton), domContainer);
```

**बधाई हो! आपने अभी-अभी अपनी वेबसाइट पर अपना पहला React कौम्पोनॅन्ट रेंडर किया है!**

- [पूरा उदाहरण सोर्स कोड देखें](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9)
- [पूरा उदाहरण डाउनलोड करें (2KB zipped)](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9/archive/7b41a88cb1027c9b5d8c6aff5212ecd3d0493504.zip)

#### आप कौम्पोनॅन्ट का पुन: उपयोग कर सकते हैं! {/*you-can-reuse-components*/}

आप एक ही HTML पेज पर कई स्थानों पर एक React कौम्पोनॅन्ट को डिस्प्ले करना चाह सकते हैं। यह सबसे उपयोगी है जबकि पेज के React-संचालित हिस्से एक दूसरे से अलग-थलग हैं। आप कई कंटेनर एलिमेंट के साथ `ReactDOM.render()` को कई बार कॉल करके ऐसा कर सकते हैं।

1. **index.html** में, एक और कंटेनर एलिमेंट ऐड करें `<div id="कौम्पोनॅन्ट-यहाँ-भी-जाएगा"></div>`.
2. **like_button.js** में, नए कंटेनर एलिमेंट के लिए एक और `ReactDOM.render()` ऐड करें:

```js {6,7,8,9}
ReactDOM.render(
  React.createElement(LikeButton),
  document.getElementById('कौम्पोनॅन्ट-यहाँ-जाएगा')
);

ReactDOM.render(
  React.createElement(LikeButton),
  document.getElementById('कौम्पोनॅन्ट-यहाँ-भी-जाएगा')
);
```

देखें [एक उदाहरण जो "Like" बटन को तीन बार को डिस्प्ले करता है और उसमें कुछ डेटा भेजता है](https://gist.github.com/rachelnabors/c0ea05cc33fbe75ad9bbf78e9044d7f8)!

### स्टेप 5: प्रोडक्शन के लिए जावास्क्रिप्ट को छोटा करें {/*step-5-minify-javascript-for-production*/}

अनमिनिफाइड जावास्क्रिप्ट आपके यूज़रस के लिए पेज लोड समय को महत्वपूर्ण रूप से धीमा कर सकता है। अपनी वेबसाइट को प्रोडक्शन में लगाने से पहले, इसकी स्क्रिप्ट को छोटा करना एक अच्छा विचार है।

- **यदि आपके पास अपनी स्क्रिप्ट के लिए छोटा करने का स्टेप नहीं है**, [इसे सेट करने का एक तरीका यहां दिया गया है](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).
- **यदि आप अपनी एप्लिकेशन स्क्रिप्ट को पहले ही छोटा कर चुके हैं**, तो आपकी साइट प्रोडक्शन के लिए तैयार हो जाएगी यदि आप सुनिश्चित करते हैं कि डेप्लॉयड HTML React के संस्करणों को `product.min.js` में समाप्त करता है, जैसे:

```html
<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
```

## JSX के साथ React का प्रयास करें {/*try-react-with-jsx*/}

ऊपर दिए गए उदाहरण उन विशेषताओं पर निर्भर करते हैं जो कोर रूप से ब्राउज़र द्वारा समर्थित हैं। यही कारण है कि **like_button.js** React बताने के लिए जावास्क्रिप्ट फ़ंक्शन कॉल का उपयोग करता है की क्या डिस्प्ले करना है:

```js
return React.createElement('button', {onClick: () => setLiked(true)}, 'Like');
```

हालाँकि, React इसके बजाय एक HTML-जैसे जावास्क्रिप्ट सिंटैक्स [JSX](/learn/writing-markup-with-jsx), इस्तेमाल करने का ऑप्शन भी प्रदान करता है:

```jsx
return <button onClick={() => setLiked(true)}>Like</button>;
```

बहुत से लोग इसे React के साथ और अन्य लाइब्रेरी के साथ UI कोड लिखने के लिए परिचित और सहायक पाते हैं। आप अन्य प्रोजेक्ट्स में "आपके पूरे जावास्क्रिप्ट में फैला हुआ मार्कअप" देख सकते हैं!

> आप [इस ऑनलाइन कनवर्टर](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3) का उपयोग करके HTML मार्कअप को JSX में बदलने के साथ खेल सकते हैं।

### JSX का प्रयास करें {/*try-jsx*/}

अपने प्रोजेक्ट में JSX को आज़माने का सबसे तेज़ तरीका है कि आप अपने पेज के `<head>` में Babel कंपाइलर को React और ReactDom के साथ ऐड दें:

```html {6}
<!-- ... बाकी का <head> टैग ... -->

<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>

<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

</head>
<!-- ... बाकी का <body> टैग ... -->
```

अब आप किसी भी `<script>` टैग में `type="text/babel"` एट्रिब्यूट ऐड करके JSX का उपयोग कर सकते हैं। उदाहरण के लिए:

```jsx {1}
<script type="text/babel">
  ReactDOM.render(
  <h1>Hello, world!</h1>, document.getElementById('root') );
</script>
```

**like_button.js** को JSX में बदलने के लिए:

1. **like_button.js** में, निचे के कोड को

```js
return React.createElement(
  'button',
  {
    onClick: () => setLiked(true),
  },
  'Like'
);
```

इससे बदलें:

```jsx
return <button onClick={() => setLiked(true)}>Like</button>;
```

2. **index.html** में, लाइक बटन के script टैग में `type="text/babel"` ऐड करें:

```html
<script src="like_button.js" type="text/babel"></script>
```

यहाँ [JSX के साथ एक उदाहरण HTML फ़ाइल](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) है जिसे आप डाउनलोड कर सकते हैं और उसके साथ खेल सकते हैं।

सरल डेमो सीखने और बनाने के लिए यह तरीका ठीक है। हालांकि, यह आपकी वेबसाइट को धीमा कर देता है और **प्रोडक्शन के लिए उपयुक्त नहीं है**। जब आप आगे बढ़ने के लिए तैयार हों, तो यह नया `<script>` टैग और आपके द्वारा ऐड की गई `type="text/babel"` एट्रिब्यूट को हटा दें। इसके बजाय, अगले भाग में आप अपने सभी `<script>` टैग को ऑटोमेटेड रूप से बदलने के लिए एक JSX प्रीप्रोसेसर सेटअप करेंगे।

### किसी प्रोजेक्ट में JSX ऐड करें {/*add-jsx-to-a-project*/}

किसी प्रोजेक्ट में JSX को ऐडने के लिए [bundler](/learn/start-a-new-react-project#custom-toolchains) जैसे जटिल टूल या एक डेवलपमेंट सर्वर की आवश्यकता नहीं होती है।JSX प्रीप्रोसेसर ऐड करना एक CSS प्रीप्रोसेसर ऐड करने जैसा है।

टर्मिनल में अपने प्रोजेक्ट फ़ोल्डर में जाएं, और इन दो कमांड्स को पेस्ट करें (**सुनिश्चित करें कि आपने [Node.js](https://nodejs.org/) इंस्टॉल किया हुआ है!**):

1. `npm init -y` (यदि यह फ़ैल होता है, [यहाँ एक समाधान है](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. `npm install babel-cli@6 babel-preset-react-app@3`

JSX प्रीप्रोसेसर को सेटअप करने के लिए आपको केवल npm की आवश्यकता है। आपको किसी और चीज के लिए इसकी आवश्यकता नहीं होगी। React और एप्लिकेशन कोड दोनों बिना किसी बदलाव के `<script>` टैग के रूप में रह सकते हैं।

बधाई हो! आपने अभी-अभी अपने प्रोजेक्ट में **प्रोडक्शन के लिए तैयार JSX सेटअप** ऐड किया है।

### JSX प्रीप्रोसेसर चलाएँ {/*run-the-jsx-preprocessor*/}

आप JSX को प्रीप्रोसेस कर सकते हैं ताकि हर बार जब आप किसी फ़ाइल को JSX के साथ सहेजते हैं, तो JSX फ़ाइल को एक नई, सादी जावास्क्रिप्ट फ़ाइल में परिवर्तित करते हुए, ट्रांसफ़ॉर्म फिर से चलाया जाएगा।

1. **src** नाम का फोल्डर बनाएं
2. अपने टर्मिनल में, यह कमांड चलाएँ: `npx babel --watch src --out-dir . --presets react-app/prod ` (इसके खत्म होने की प्रतीक्षा न करें! यह कमांड JSX के लिए एक ऑटोमेटेड वॉचर शुरू करता है।)
3. अपने JSX-ified **like_button.js** को नए **src** फ़ोल्डर में ले जाएं (या एक **like_button.js** बनाएं जिसमें यह [JSX स्टार्टर कोड] हो (https://gist.githubusercontent.com/ rachelnabors/ffbc9a0e33665a58d4cfdd1676f05453/raw/652003ff54d2dab8a1a1e5cb3bb1e28ff207c1a6/like_button.js))

वाचर ब्राउज़र के लिए उपयुक्त सादे जावास्क्रिप्ट कोड के साथ एक प्रीप्रोसेस्ड **like_button.js** बनाएगा।

<Gotcha>

यदि आपको यह कहते हुए एक एरर मैसेज दिखाई देता है कि "आपने गलती से `babel` पैकेज सेटअप कर लिया है", तो आप [पिछला स्टेप](#add-jsx-to-a-project) चूक गए होंगे। इसे उसी फ़ोल्डर में निष्पादित करें, और फिर पुन: प्रयास करें।

</Gotcha>

एक बोनस के रूप में, यह आपको पुराने ब्राउज़रों में ब्रेक होने की चिंता किए बिना classes जैसी आधुनिक जावास्क्रिप्ट सिंटैक्स सुविधाओं का उपयोग करने देता है। हमारे द्वारा अभी-अभी उपयोग किए गए टूल को babel कहा जाता है, और आप इसके बारे में [इसके डॉक्यूमेंटेशन](https://babeljs.io/docs/en/babel-cli/) से अधिक जान सकते हैं।

यदि आप बिल्ड टूल्स के साथ कम्फ़र्टेबल हो रहे हैं और चाहते हैं कि वे आपके लिए और अधिक करें, [हम यहां कुछ सबसे लोकप्रिय और पहुंचने योग्य टूलचेन को कवर करते हैं](/learn/start-a-new-react-project)।

<DeepDive title="React बिना JSX के">

कोर रूप से JSX को React के कौम्पोनॅन्ट लिखने को HTML लिखने के रूप में परिचित बनाने के लिए पेश किया गया था। तब से, वाक्यविन्यास व्यापक हो गया है। हालाँकि, ऐसे उदाहरण हो सकते हैं जहाँ आप JSX का उपयोग नहीं करना चाहते हैं या नहीं कर सकते हैं। आपके पास दो ऑप्शन हैं:

- [htm](https://github.com/developit/htm) जैसे JSX अल्टरनेटिव का उपयोग करें, जो कंपाइलर का उपयोग नहीं करता है—यह जावास्क्रिप्ट के नेटिव टैग किए गए टेम्प्लेट का उपयोग करता है।
- [`React.createElement()`](/reference/createelement) का उपयोग करें, जिसकी एक विशेष स्ट्रक्चर नीचे बताया गया है।

JSX के साथ, आप एक कौम्पोनॅन्ट लिखेंगे जैसे:

```jsx
function Hello(props) {
  return <div>Hello {props.toWhat}</div>;
}

ReactDOM.render(<Hello toWhat="World" />, document.getElementById('root'));
```

With `React.createElement()`, you would write it like this:

```js
function Hello(props) {
  return React.createElement('div', null, `Hello ${props.toWhat}`);
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

यह तीन आर्ग्यूमेंट्स को स्वीकार करता है: `React.createElement(component, props, children)`। यहां बताया गया है कि वे कैसे काम करते हैं:

1. एक **component**, जो एक HTML एलिमेंट या एक फ़ंक्शन कौम्पोनॅन्ट को रिप्रेजेंट करने वाला एक स्ट्रिंग हो सकता है
2. किसी भी [**props** का एक ऑब्जेक्ट जिसे आप पास करना चाहते हैं](/learn/passing-props-to-a-component)
3. कौम्पोनॅन्ट में किसी भी **children** का ऑब्जेक्ट हो सकता है, जैसे टेक्स्ट स्ट्रिंग्स

यदि आप `React.createElement()` टाइप करते-करते थक गए हैं, तो एक सामान्य पैटर्न शॉर्टहैंड असाइन करना है:

```js
const e = React.createElement;

ReactDOM.render(e('div', null, 'Hello World'), document.getElementById('root'));
```

यदि आप `React.createElement()` के लिए इस शॉर्टहैंड फॉर्म का उपयोग करते हैं, तो JSX के बिना React का उपयोग करना लगभग उतना ही सुविधाजनक हो सकता है।

</DeepDive>
