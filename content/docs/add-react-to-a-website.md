---
id: add-react-to-a-website
title: React को Website में ऐड करे 
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---
अपनी आवश्यकता के अनुसार कम या ज्यादा React का उपयोग करें।

क्रमिक गोद या अपने तरीके से उपयोग करने के लिए शुरू से ही React इसी तरह डिज़ाइन किया गया है, और **आप आवश्यकतानुसार कम या ज्यादा इसका उपयोग कर सकते हैं**। शायद आप केवल एक मौजूदा पेज पर कुछ "इंट्रक्टिवित्य का छिड़काव" डालना चाहते हैं। React कौम्पोनॅन्ट ऐसा करने का एक शानदार तरीका है।

अधिकांश वेबसाइटें एक-पेज की ऐप्स नहीं है, और होने की आवश्यकता भी नहीं है। **कोड की कुछ पंक्तियों और बिना किसी बिल्ड टूलिंग** के साथ, अपनी वेबसाइट के एक छोटे से हिस्से में React उपयोग करने का प्रयास करें। आप तब या तो धीरे-धीरे अपनी उपस्थिति का विस्तार कर सकते हैं, या इसे कुछ गतिशील विजेट में समाहित में रखे।

---

- [एक मिनट में React ऐड करें](#add-react-in-one-minute)
- [ऑप्शनल: JSX के साथ React का उपयोग करे](#optional-try-react-with-jsx) ( किसी भी बंडल आवश्यकता नहीं!)

## एक मिनट में React ऐड करें {#add-react-in-one-minute}

इस अनुभाग में, हम यह दिखाएंगे कि किसी मौजूदा HTML पेज पर एक React कौम्पोनॅन्ट कैसे ऐड किया जाए। आप अपनी वेबसाइट के साथ अनुसरण कर सकते हैं, या अभ्यास करने के लिए एक खाली HTML फ़ाइल बना सकते हैं।

यहाँ कोई जटिल उपकरण नहीं होगा या आवश्यकताओं को स्थापित( इनस्टॉल ) नहीं किया जाएगा -- **इस अनुभाग को पूरा करने के लिए, आपको केवल एक इंटरनेट कनेक्शन और आपके समय का एक मिनट चाहिए।**

ऑप्शनल: [पूरा उदाहरण डाउनलोड करें (2KB zipped)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### चरण 1: HTML में DOM कंटेनर ऐड करें {#step-1-add-a-dom-container-to-the-html}

सबसे पहले, उस HTML पेज को खोलें जिसे आप संपादित( एडिट ) करना चाहते हैं। उस स्थान को चिह्नित करने के लिए एक खाली `<div>` टैग जोड़ें जहां आप React के साथ कुछ प्रदर्शित करना चाहते हैं। उदाहरण के लिए:

```html{3}
<!-- ... existing HTML ... -->

<div id="like_button_container"></div>

<!-- ... existing HTML ... -->
```

हमने इस `<div>`  को एक अद्वितीय ( नया ) `id` HTML attribute दिया  है। यह हमें बाद में जावास्क्रिप्ट ( JavaScript ) कोड से इसे खोजने और इसके अंदर एक React कौम्पोनॅन्ट प्रदर्शित करने की अनुमति देगा।

>टिप
>
>आप एक "कंटेनर" `<div>` को इस तरह से **कहीं भी** `<body>` टैग के अंदर रख सकते हैं। आपके पास एक पेज पर कई स्वतंत्र डोम कंटेनर हो सकते हैं जैसी आपकी आवश्यकता हो। वे आम तौर पर खाली होते हैं - React डोम (Dom) कंटेनर के अंदर किसी भी मौजूदा सामग्री को बदल देगी।

### चरण 2: स्क्रिप्ट टैग ऐड करें {#step-2-add-the-script-tags}

अगला, `</ body>` टैग बंद करने से ठीक पहले HTML पेज पर तीन `<script>` टैग जोड़ें:

```html{5,6,9}
  <!-- ... other HTML ... -->

  <!-- Load React. -->
  <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <!-- Load our React कौम्पोनॅन्ट. -->
  <script src="like_button.js"></script>

</body>
```

पहले दो टैग React लोड करते हैं। तीसरा आपके घटक (कौम्पोनॅन्ट) कोड को लोड करेगा।

### चरण 3: एक React कौम्पोनॅन्ट(प्रतिक्रिया घटक) बनाएँ {#step-3-create-a-react-component}

अपने HTML पेज के बगल में `like_button.js` नामक एक फ़ाइल बनाएँ।

खोले **[इस स्टार्टर कोड](https://gist.github.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** और आपके द्वारा बनाई गई फ़ाइल में पेस्ट करें या छांपे।

>Tip
>
>यह कोड `LikeButton` नामक एक रिएक्ट घटक (React कौम्पोनॅन्ट) को परिभाषित करता है। चिंता न करें अगर आप इसे अभी तक नहीं समझे हैं - हम बाद में रिएक्ट  (React) के बिल्डिंग ब्लॉक्स को अपने [हैंड्स-ऑन टुटोरिअल (हाथों पर ट्यूटोरियल)](/tutorial/tutorial.html) और [मुख्य अवधारणा गाइड](/docs/hello-world.html) में कवर करेंगे। अभी के लिए, चलो इसे स्क्रीन पर देख कर प्राप्त करे!

**[स्टार्टर कोड](https://gist.github.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** के बाद, like_button.js के नीचे दो लाइनें जोड़ें:

```js{3,4}
// ... the starter code you pasted ...

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```

कोड की ये दो पंक्तियाँ उस `<div>` को ढूंढती है जिसे हमने पहले चरण में अपने HTML में जोड़ा था, और फिर इसके अंदर अपने "Like" बटन रिएक्ट घटक (React कौम्पोनॅन्ट) को प्रदर्शित करते हैं।

### बस! {#thats-it}

कोई चरण चार नहीं है। **आपने अपनी वेबसाइट पर पहला रिएक्ट घटक जोड़ा चुके है।**

React को एकीकृत (इंटिग्रेटिंग) करने के बारे में अधिक सुझावों के लिए अगला अनुभाग देखें।

**[पूर्ण उदाहरण स्रोत कोड देखें](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[पूरा उदाहरण डाउनलोड करें (2KB zipped)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)**

### सुझाव: एक घटक का पुन: उपयोग करें {#tip-reuse-a-component}

आमतौर पर, आप HTML पेज पर कई स्थानों पर React कौम्पोनॅन्ट (प्रतिक्रिया घटकों) को प्रदर्शित करना चाह सकते हैं। यहाँ एक उदाहरण है जो "लाइक" बटन को तीन बार प्रदर्शित करता है और इसके लिए कुछ डेटा पास करता है:

[पूर्ण उदाहरण स्रोत कोड देखें](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[पूरा उदाहरण डाउनलोड करें (2KB zipped)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/9d0dd0ee941fea05fd1357502e5aa348abb84c12.zip)

>Note
>
>यह रणनीति सबसे उपयोगी है, जब पेज के रिएक्ट-संचालित हिस्से एक-दूसरे से अलग-थलग (आइसोलेटेड) हो। रिएक्ट कोड के अंदर, इसके बजाय [कौम्पोनॅन्ट composition (घटक संरचना) ](/docs/components-and-props.html#composing-components) का उपयोग करना आसान है।

### सुझाव: उत्पादन के लिए JavaScript (जावास्क्रिप्ट) को छोटा करें {#tip-minify-javascript-for-production}

अपनी वेबसाइट को उत्पादन में तैनात या अपलोड करने से पहले, इस बात का ध्यान रखें कि निर्विवाद (अनावश्यक) JavaSript (जावास्क्रिप्ट) कोड आपके उपयोगकर्ताओं के लिए पेज को काफी धीमा कर सकता है।

यदि आप पहले से ही एप्लिकेशन स्क्रिप्ट को छोटा करते हैं, तो **आपकी साइट का उत्पादन तैयार हो जाएगा** यदि आप सुनिश्चित करते हैं कि तैनात HTML रिएक्शन के संस्करणों (वर्जन) को `production.min.js` में समाप्त करता है:

```js
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

यदि आपके पास अपनी स्क्रिप्ट के लिए कोई मिनिमाइज़ेशन चरण नहीं है, [यहाँ इसे स्थापित करने का एक तरीका है](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).

## ऑप्शनल: JSX के साथ React का उपयोग करे {#optional-try-react-with-jsx}

ऊपर दिए गए उदाहरणों में, हम केवल उन विशेषताओं पर भरोसा करते हैं जो ब्राउज़र द्वारा मूल रूप से समर्थित (सपोर्टेड) हैं। यही कारण है कि हमें React को बताने के लिए
JavaScript (जावास्क्रिप्ट) फ़ंक्शन कॉल का उपयोग किया कि क्या प्रदर्शित करें:

```js
const e = React.createElement;

// Display a "Like" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```

हालाँकि, React इसके बजाय [JSX](/docs/introducing-jsx.html) का उपयोग करने का एक विकल्प प्रदान करता है:

```js
// Display a "Like" <button>
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```

ये दोनों कोड स्निपेट समान हैं। जबकि **JSX [पूरी तरह से वैकल्पिक](/docs/react-without-jsx.html) है**, कई लोगों को यह UI (यूआई) कोड लिखने के लिए उपयोगी लगता है - दोनों React (रिएक्ट) के साथ और अन्य पुस्तकालयों (लिबरेरिएस) के साथ।

[यह ऑनलाइन कनवर्टर](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3) का उपयोग करके आप JSX के साथ खेल सकते हैं।

### जल्दी से JSX की कोशिश करो {#quickly-try-jsx}

JSX को अपने प्रोजेक्ट में आज़माने का सबसे तेज़ तरीका है कि इस `<script>` टैग को अपने पेज में जोड़ें:

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

अब आप JSX का उपयोग किसी भी `<script>` टैग में `type="text/babel"` विशेषता को जोड़कर कर सकते हैं। यहां [JSX के साथ एक उदाहरण HTML फ़ाइल](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html) है जिसे आप डाउनलोड कर सकते हैं और साथ खेल सकते हैं।

सीखने और सरल डेमो बनाने के लिए यह दृष्टिकोण ठीक है। हालाँकि, यह आपकी वेबसाइट को धीमा और **उत्पादन के लिए उपयुक्त नहीं** बनाता है। जब आप आगे बढ़ने के लिए तैयार हों, तो इस नई `<script>` टैग और आपके द्वारा जोड़े गए `type="text/babel"` विशेषता (attributes) को हटा दें। इसके बजाय, अगले भाग में आप अपने सभी `<script>` टैग को स्वचालित रूप से परिवर्तित करने के लिए JSX प्रीप्रोसेसर सेट करेंगे।

### JSX को किसी प्रोजेक्ट में ऐड करें {#add-jsx-to-a-project}

JSX को किसी प्रोजेक्ट में जोड़ने के लिए किसी बंडल या डेवलपमेंट सर्वर जैसे जटिल टूल की आवश्यकता नहीं होती है। अनिवार्य रूप से, JSX को जोड़ना **एक सीएसएस प्रीप्रोसेसर को जोड़ने जैसा है।** केवल आवश्यकता आपके कंप्यूटर पर [Node.js](https://nodejs.org/) को स्थापित करने की है।

टर्मिनल में अपने प्रोजेक्ट फ़ोल्डर में जाएं, और इन दोनों कमांडों को पेस्ट करें:

1. **चरण 1:** Run `npm init -y` (यदि यह विफल रहता है, [तो यहां एक तय (उपाय) है](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. **चरण 2:** Run `npm install babel-cli@6 babel-preset-react-app@3`

>सुझाव
>
>हम **केवल JSX प्रीप्रोसेसर को स्थापित करने के लिए npm का उपयोग कर रहे हैं;** आपको किसी और चीज़ के लिए इसकी आवश्यकता नहीं है React और एप्लिकेशन कोड दोनों ही बिना किसी बदलाव के `<script>` टैग के रूप में रह सकते हैं।

बधाई हो! आप अपनी परियोजना (प्रोजेक्ट) में **उत्पादन-तैयार JSX सेटअप** जोड़ चुके है।


### JSX प्रीप्रोसेसर चलाएँ {#run-jsx-preprocessor}

`src` नामक एक फ़ोल्डर बनाएँ और इस टर्मिनल कमांड को चलाएं:

```
npx babel --watch src --out-dir . --presets react-app/prod 
```

>ध्यान दें
>
>`npx` एक टाइपो नहीं है -- यह एक [पैकेज रनर उपकरण है जो npm 5.2+ के साथ आता](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) है।
>
>यदि आपको एक त्रुटि संदेश दिखाई देता है, जिसमें कहा गया है कि "आपने गलती से `babel (बैबल)` पैकेज स्थापित किया है", तो आप [पिछले चरण](#add-jsx-to-a-project) से चूक गए होंगे। इसे उसी फ़ोल्डर में निष्पादित (परफॉर्म) करें, और फिर पुन: प्रयास करें।

इसके खत्म होने का इंतजार न करें -- यह कमांड JSX के लिए एक स्वचालित वॉचर शुरू करता है।

 JSX स्टार्टर कोड के साथ src / like_button.js नामक एक फाइल बनाते हैं, तो देखने वाला ब्राउज़र के लिए उपयुक्त सादे जावास्क्रिप्ट कोड के साथ preprocessed like_button.js बना देगा। जब आप JSX के साथ स्रोत फ़ाइल को संपादित करते हैं, तो परिवर्तन स्वचालित रूप से फिर से चलेगा।

यदि आप अब इस **[JSX स्टार्टर कोड](https://gist.github.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)** के साथ `src/like_button.js` नामक एक फाइल बनाते हैं, तो देखने वाला ब्राउज़र के लिए उपयुक्त सादे जावास्क्रिप्ट कोड के साथ प्रेप्रोसेस्सेड (पहले से तैयार) `like_button.js` बना देगा। जब आप JSX के साथ स्रोत फ़ाइल को संपादित (एडिट) करते हैं, तो परिवर्तन स्वचालित रूप से फिर से चलेगा।

एक बोनस के रूप में, यह आपको पुराने ब्राउज़रों को तोड़ने के बारे में चिंता किए बिना classes (कक्षाओं) की तरह आधुनिक जावास्क्रिप्ट सिंटैक्स सुविधाओं का उपयोग करने देता है। जिस उपकरण का हमने अभी उपयोग किया है उसे babel (बैबल) कहा जाता है, और आप [इसके प्रलेखन](https://babeljs.io/docs/en/babel-cli/) से इसके बारे में अधिक जान सकते हैं। 

यदि आप देखते हैं कि आप बिल्ड टूल के साथ सहज हो रहे हैं और चाहते हैं कि वे आपके लिए और अधिक करें, तो  [अगला भाग](/docs/create-a-new-react-app.html) कुछ सबसे लोकप्रिय और स्वीकार्य टूलचैनस का वर्णन करता है। यदि नहीं -- तो वे स्क्रिप्ट टैग ठीक काम करेंगे!
