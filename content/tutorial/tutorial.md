---
id: tutorial
title: "ट्यूटोरियल: React से परिचय"
layout: tutorial
sectionid: tutorial
permalink: tutorial/tutorial.html
redirect_from:
  - "docs/tutorial.html"
  - "docs/why-react.html"
  - "docs/tutorial-ja-JP.html"
  - "docs/tutorial-ko-KR.html"
  - "docs/tutorial-zh-CN.html"
---

इस ट्यूटोरियल के लिए React के मौजूदा ज्ञान की कोई आवश्यकता नहीं है।

## ट्यूटोरियल शुरू करने से पहले {#before-we-start-the-tutorial}

हम इस ट्यूटोरियल के दौरान एक छोटा गेम बनाएंगे। **आप इसे छोड़ने के लिए उत्सुक होंगे क्यूंकि आप गेम नहीं बना रहे हैं -- लेकिन इसे एक मौका दें।** ट्यूटोरियल में आपके द्वारा सीखी जाने वाली तकनीकें किसी भी React ऐप्स के निर्माण के लिए मौलिक हैं, और इसमें महारत हासिल करने से आपको React की गहरी समझ मिलेगी।

>ध्यान दें
>
>यह ट्यूटोरियल उन लोगों के लिए बनाया गया है, जो **चीज़ें करके सीखना** पसंद करते हैं। यदि आप बिलकुल बुनियादी कॉन्सेप्ट्स से सीखना पसंद करते हैं, तो हमारे [स्टेप-बाय-स्टेप गाइड](/docs/hello-world.html) देखें। आपको यह ट्यूटोरियल और गाइड एक-दूसरे के संपूरक लग सकते हैं।

ट्यूटोरियल को कई खंडों में विभाजित किया गया है:

* [ट्यूटोरियल के लिए सेटअप](#setup-for-the-tutorial) आपको ट्यूटोरियल का पालन करने के लिए **शुरुआत** देगा।
* [ओवरव्यू](#overview) आपको React की **बुनियादी बातें**: कौम्पोनॅन्ट्स, props और स्टेट सिखाएगा।
* [गेम को पूरा करना](#completing-the-game) आपको React विकास में **सबसे आम तकनीकें** सिखाएगा।
* [टाइम ट्रैवल को गेम में डालना](#adding-time-travel) से आपको React की अद्वितीय शक्तियों के बारे में गहराई से जानकारी मिलेगी।

इस ट्यूटोरियल से मूल्य प्राप्त करने के लिए आपको एक बार में सभी वर्गों को पूरा करने की आवश्यकता नहीं है।
जहां तक ​​हो सके जाने की कोशिश करें -- भले ही यह एक या दो सेक्शन हो।

ट्यूटोरियल के साथ कोड को कॉपी और पेस्ट करना ठीक है, लेकिन हम इसे हाथ से टाइप करने की सलाह देते हैं। यह आपको मांसपेशियों की स्मृति और एक मजबूत समझ विकसित करने में मदद करेगा।

### हम क्या बना रहे हैं? {#what-are-we-building}

इस ट्यूटोरियल में, हम बताएंगे कि किस प्रकार React का उपयोग कर के एक इंटरैक्टिव टिक-टैक-टो गेम का निर्माण किया जा सकता है।

आप यहाँ देख सकते हैं कि हम क्या बनाने जा रहे हैं: **[अंतिम परिणाम](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**। यदि कोड आपके लिए मायने नहीं रखता है, या यदि आप कोड के सिंटैक्स से अपरिचित हैं, चिंता मत करें! इस ट्यूटोरियल का लक्ष्य React और इसके सिंटैक्स को समझने में आपकी मदद करना है।

हम अनुग्रह करते हैं कि आप ट्यूटोरियल को जारी रखने से पहले टिक-टैक-टो खेल के देखें। आप देख सकते हैं की गेम बोर्ड की दाईं ओर एक क्रमांकित सूची है, ये गेम की कई सुविधाओं में से एक है। यह सूची आपको खेल में होने वाली सभी चालों का इतिहास देती है, और गेम के चलते चलते इसे अपडेट किया जाता है।

इससे परिचित होने के बाद आप टिक-टैक-टो खेल को बंद कर सकते हैं। हम इस ट्यूटोरियल में एक सरल टेम्पलेट से शुरू करेंगे। हमारा अगला कदम आपको तैयार करना है ताकि आप खेल का निर्माण शुरू कर सकें।

### आवश्यक शर्तें {#prerequisites}

हम मान लेंगे कि आप HTML और जावास्क्रिप्ट से थोड़े परिचित हैं, लेकिन अगर आप एक अलग प्रोग्रामिंग भाषा से आ रहे हैं तब भी आपको साथ चलने में सक्षम होना चाहिए। हम यह भी मान लेंगे कि आप फ़ंक्शंस, ऑब्जेक्ट्स, अरेस और कुछ हद तक, क्लास जैसी प्रोग्रामिंग कॉन्सेप्ट्स से परिचित हैं।

यदि आपको जावास्क्रिप्ट की समीक्षा करने की आवश्यकता है, तो हम [इस मार्गदर्शिका](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) को पढ़ने की सलाह देते हैं। ध्यान दें कि हम ईएस 6 से कुछ सुविधाओं का उपयोग कर रहे हैं - जो की जावास्क्रिप्ट का एक हालिया संस्करण है। इस ट्यूटोरियल में, हम [एरो फ़ंक्शंस](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [क्लासेस](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) और [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) स्टेटमेंट्स का उपयोग कर रहे हैं। ईएस 6 कोड क्या संकलित करता है यह जांचने के लिए आप [Babel REPL](babel://es5-syntax-example) का उपयोग कर सकते हैं।

## ट्यूटोरियल के लिए सेटअप {#setup-for-the-tutorial}

इस ट्यूटोरियल को पूरा करने के दो तरीके हैं: आप या तो अपने ब्राउज़र में कोड लिख सकते हैं, या आप अपने कंप्यूटर पर स्थानीय विकास वातावरण सेट कर सकते हैं।

### सेटअप विकल्प 1: ब्राउज़र में कोड लिखें {#setup-option-1-write-code-in-the-browser}

यह आरंभ करने का सबसे तेज़ तरीका है!

सबसे पहले, इस **[प्रारंभक कोड](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** को एक नए टैब में खोलें। 
नए टैब में एक खाली टिक-टैक-टो गेम Board और React कोड प्रदर्शित होना चाहिए। हम इस ट्यूटोरियल में React कोड का संपादन करेंगे।

अब आप दूसरे सेटअप विकल्प को छोड़ सकते हैं, और React का ओवरव्यू प्राप्त करने के लिए [ओवरव्यू](#overview) अनुभाग पर जाएं।

### सेटअप विकल्प 2: स्थानीय विकास पर्यावरण {#setup-option-2-local-development-environment}

यह पूरी तरह से ऐच्छिक है और इस टुटोरिअल के लिए आवशयक नहीं है!

<br>

<details>

<summary><b>ऐच्छिक: अपने पसंदीदा टेक्स्ट एडिटर का उपयोग करके अपने लोकल पर्यावरण पर निर्देशों का पालन करें</b></summary>

इस सेटअप में और अधिक काम करने की आवश्यकता है लेकिन आप अपनी पसंद के एडिटर का उपयोग करके ट्यूटोरियल को पूरा कर सकते हैं। इन चरणों का पालन करें:

1. सुनिश्चित करें कि आपके पास हाल ही में स्थापित [Node.js](https://nodejs.org/en/) का संस्करण है।
2. एक नई प्रोजेक्ट बनाने के लिए [Create React App के इंस्टॉलेशन निर्देशों](/docs/create-a-new-react-app.html#create-react-app) का पालन करें।

```bash
npx create-react-app my-app
```

3. नई प्रोजेक्ट के `src/` फ़ोल्डर में सभी फ़ाइलों को हटा दें

>ध्यान दें
>
>**संपूर्ण `src` फ़ोल्डर को न हटाएं, केवल इसके अंदर की मूल स्रोत फ़ाइलों को हटाएं।** हम अगले चरण में इस प्रोजेक्ट के लिए डिफ़ॉल्ट स्रोत फ़ाइलों को उदाहरणों के साथ बदल देंगे।

```bash
cd my-app
cd src

# यदि आप एक मैक या लिनक्स का उपयोग कर रहे हैं:
rm -f *

# या, यदि आप विंडोज पर हैं:
del *

# उसके बाद, प्रोजेक्ट फ़ोल्डर पर वापस जाएँ
cd ..
```

4. [इस CSS कोड](https://codepen.io/gaearon/pen/oWWQNa?editors=0100) के साथ `src/` फ़ोल्डर में `index.css` नामक फ़ाइल बनायें।

5. [इस JS कोड](https://codepen.io/gaearon/pen/oWWQNa?editors=0010) के साथ `src/` फ़ोल्डर में `index.js` नामक एक फ़ाइल बनायें।

6. `src/` फ़ोल्डर में `index.js` के शीर्ष पर इन तीन पंक्तियों को जोड़ें:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

अब अगर आप प्रोजेक्ट फोल्डर में `npm start` चलाते हैं और ब्राउज़र में `http://localhost:3000` ओपन करते हैं, तो आपको एक खाली टिक-टैक-टो फ़ील्ड दिखना चाहिए।

हम आपके एडिटर के लिए सिंटेक्स हाइलाइटिंग को कॉन्फ़िगर करने के लिए [इन निर्देशों](https://babeljs.io/docs/editors/) का पालन करने की सलाह देते हैं।

</details>

### मदद, मैं अटक गया हूँ! {#help-im-stuck}

यदि आप अटक जाते हैं, तो [सामुदायिक सहायता संसाधनों](/community/support.html) की जांच करें। विशेष रूप से, [Reactiflux चैट](https://discord.gg/0ZcbPKXt5bZjGY5n) जल्दी से सहायता प्राप्त करने का एक शानदार तरीका है। यदि आपको कोई उत्तर नहीं मिलता है, या यदि आप अटके रहते हैं, तो कृपया एक इशू दर्ज करें, और हम आपकी मदद करेंगे।

## ओवरव्यू {#overview}

अब जब आपका सेटअप हो गया है, आइए hum React का ओवरव्यू लेते हैं!

### React क्या है? {#what-is-react}

उपयोगकर्ता इंटरफेस के निर्माण के लिए React एक वर्णनात्मक, कुशल और फ्लेक्सिबल जावास्क्रिप्ट लाइब्रेरी है। यह आपको "कौम्पोनॅन्ट्स" नामक कोड के छोटे और पृथक टुकड़ों से जटिल UI की रचना करने देती है।

React में कुछ अलग-अलग प्रकार के कौम्पोनॅन्ट होते हैं, लेकिन हम `React.Component` उपवर्गों के साथ शुरुआत करेंगे:

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>{this.props.name} के लिए खरीदारी की सूची</h1>
        <ul>
          <li>इंस्टाग्राम</li>
          <li>व्हाट्सैप्</li>
          <li>ओकुलस</li>
        </ul>
      </div>
    );
  }
}

// उपयोग उदाहरण: <ShoppingList name="Mark" />
```

हमें जल्दी ही अजीब XML जैसे टैग्स मिलेंगे. हम स्क्रीन पर जो देखना चाहते हैं उसे React करने के लिए हम कौम्पोनॅन्ट्स का उपयोग करते हैं। जब हमारा डेटा बदलता है, तो React कुशलतापूर्वक हमारे कौम्पोनॅन्ट्स को अद्यतन और प्रस्तुत करेगा।

यहाँ, ShoppingList एक **React कौम्पोनॅन्ट क्लास** या **React कौम्पोनॅन्ट टाइप** है। एक कौम्पोनॅन्ट मापदंडों में लेता है, जिसे `props` ("गुणों" के लिए छोटा) कहा जाता है, और `रंडर` मेथड के माध्यम से प्रदर्शित करने के लिए विचारों का एक पदानुक्रम देता है।

`render` मेथड स्क्रीन पर जो आप देखना चाहते हैं उसका *विवरण* देता है। React वर्णन लेती है और परिणाम प्रदर्शित करती है। विशेष रूप से, रेंडर एक **React तत्व** देता है, जो कि प्रस्तुत करना क्या है का एक हल्का विवरण है। अधिकांश React डेवलपर्स "JSX" नामक एक विशेष वाक्यविन्यास का उपयोग करते हैं जो इन संरचनाओं को लिखना आसान बनाता है। `<div />` सिंटैक्स को बिल्ड समय में `React.createElement ('div')` में बदल दिया जाता है। उपरोक्त उदाहरण इसके बराबर है:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 चिल्ड्रन ... */),
  React.createElement('ul', /* ... ul चिल्ड्रन ... */)
);
```

[पूर्ण विस्तारित संस्करण देखें।](babel://tutorial-expanded-version)

यदि आप उत्सुक हैं, तो [एपीआई संदर्भ](/docs/react-api.html#createelement) में `createElement()` को अधिक विवरण में वर्णित किया गया है, लेकिन हम इस ट्यूटोरियल में इसका उपयोग नहीं करेंगे। इसके बजाय, हम JSX का उपयोग करते रहेंगे।

JSX जावास्क्रिप्ट की पूरी शक्ति के साथ आता है। आप JSX के अंदर ब्रेसिज़ के भीतर *कोई* जावास्क्रिप्ट एक्सप्रेशन रख सकते हैं।
प्रत्येक React तत्व एक जावास्क्रिप्ट ऑब्जेक्ट है जिसे आप एक वैरिएबल् में स्टोर कर सकते हैं या अपने प्रोग्राम में चारों ओर से गुज़ार सकते हैं।

`ShoppingList` कौम्पोनॅन्ट ऊपर केवल अंतर्निहित डोम जैसे `<div />` और `<li />` को रेंडर करता है। लेकिन आप कस्टम React कौम्पोनॅन्ट्स को भी कम्पोज़ और रेंडर कर सकते हैं। उदाहरण के लिए, हम अब पूरी खरीदारी सूची को `<ShoppingList />` लिखकर संदर्भित कर सकते हैं। प्रत्येक React कौम्पोनॅन्ट संकुचित है और स्वतंत्र रूप से काम कर सकता है; यह आपको सरल कौम्पोनॅन्टों से जटिल यूआई बनाने की अनुमति देता है।

## स्टार्टर कोड का निरीक्षण {#inspecting-the-starter-code}

यदि आप **अपने ब्राउज़र में** ट्यूटोरियल पर काम करने जा रहे हैं, इस कोड को एक नए टैब में खोलें: **[स्टार्टर कोड।](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. यदि आप **लोकली** रूप से ट्यूटोरियल पर काम करने जा रहे हैं, तो अपने प्रोजेक्ट फ़ोल्डर में `src/index.js` खोलें ([सेटअप](#setup-option-2-local-development-environment) के दौरान आप इस फ़ाइल को पहले ही छू चुके हैं)।

यह स्टार्टर कोड हम जो निर्माण कर रहे हैं उसका आधार है। हमने CSS स्टाइलिंग प्रदान की है ताकि आपको केवल React सीखने और 
टिक-टैक-टो गेम की प्रोग्रामिंग पर ध्यान देने की आवश्यकता हो।

कोड का निरीक्षण करके, आप देखेंगे कि हमारे पास तीन React कौम्पोनॅन्ट हैं:

* Square
* Board
* Game

Square कौम्पोनॅन्ट एक एकल `<button>` और Board को 9 वर्गों रेंडर करता है। Game कौम्पोनॅन्ट प्लेसहोल्डर मानों के साथ एक Board रेंडर करता है जिसे हम बाद में संशोधित करेंगे। वर्तमान में कोई इंटरैक्टिव कौम्पोनॅन्ट नहीं हैं।

### Props के माध्यम से डेटा पास करना {#passing-data-through-props}

बस अपने पैरों को गीला करने के लिए, आइए हमारे Board कौम्पोनॅन्ट से हमारे Square कौम्पोनॅन्ट के कुछ डेटा को पास करने का प्रयास करें।

Board के `renderSquare` मेथड में, Square में `value` नामक एक props पास करने के लिए कोड को बदलें:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
```

`{/ * TODO * /}` को `{this.props.value}` से बदलकर उस वैल्यू को दिखाने के लिए Square का `render` मेथड बदलें:

```js{5}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

पहले:

![React Devtools](../images/tutorial/tictac-empty.png)

बादमे: आपको प्रदान किए गए आउटपुट में प्रत्येक वर्ग में एक संख्या दिखनी चाहिए।

![React Devtools](../images/tutorial/tictac-numbers.png)

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**


बधाई हो! आपने अभि "एक props" पैरेंट Board कौम्पोनॅन्ट से एक चाइल्ड Square कौम्पोनॅन्ट को पास किया है। Props पासिंग यह है कि कैसे React एप्स में पैरेंट से लेकर चाइल्ड तक की जानकारी प्रवाहित होती है।

### इंटरएक्टिव कौम्पोनॅन्ट बनाना {#making-an-interactive-component}

जब हम इसे क्लिक करते हैं तो Square कौम्पोनॅन्ट को "X" से भरें।
सबसे पहले, Square कौम्पोनॅन्ट के `render()` फंक्शन से लौटाए गए button टैग को इसमें बदलें:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { alert('click'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

यदि हम अभी Square पर क्लिक करते हैं, तो हमें अपने ब्राउज़र में अलर्ट प्राप्त करना चाहिए।

>ध्यान दें
>
>टाइपिंग को बचाने और [`this` के भ्रामक व्यवहार](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) से बचने के लिए, हम यहां और आगे के हैंडलर के लिए [एरो फ़ंक्शन सिंटैक्स](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) का उपयोग करेंगे:
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => alert('click')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
>ध्यान दें कि `onClick = {() => alert('click')}` के साथ, हम `onClick` props के रूप में एक फ़ंक्शन पास कर रहे हैं। यह केवल एक क्लिक के बाद फायर करता है। भूल जाना `() =>` और ऐसे `onClick = {alert('click')}` लिखना एक सामान्य गलती है, और हर बार कौम्पोनॅन्ट फिर से रेंडर करने पर अलर्ट दिखायेगा।

अगले चरण के रूप में, हम Square कौम्पोनॅन्ट को "याद रखना" चाहते हैं कि यह क्लिक हो गया, और इसे "X" चिह्न के साथ भरें। चीजों को "याद रखने" के लिए, कौम्पोनॅन्ट **state** का उपयोग करते हैं।

React कौम्पोनॅन्ट को अपने constructors में `this.state` सेट करके state रख सकता है। `this.state` को एक React कौम्पोनॅन्ट के रूप में निजी माना जाना चाहिए जो इसे परिभाषित करता है। चलो `this.state` में Square के वर्तमान मूल्य को स्टोर करते हैं, और Square को क्लिक करने पर इसे बदलते हैं।

सबसे पहले, हम state को इनिशियलाइज़ करने के लिए class में एक कंस्ट्रक्टर जोड़ेंगे:

```javascript{2-7}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

>ध्यान दें
>
>[जावास्क्रिप्ट क्लासेस](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) में, उप-वर्ग के निर्माणकर्ता को परिभाषित करते समय आपको हमेशा `super` कॉल करने की आवश्यकता होती है। सभी React कौम्पोनॅन्ट क्लासेस जिनके पास `कंस्ट्रक्टर` है, उन्हें `super(props)` कॉल से शुरू करना चाहिए।

अब हम क्लिक करने पर वर्तमान state की वैल्यू प्रदर्शित करने के लिए Square के `render` मेथड को बदल देंगे:

* `<button>` टैग के अंदर `this.state.value` के साथ `this.props.value` को बदलें।
* `() = alert()` इवेंट हैंडलर को `() => this.setState ({value: 'X'})` से बदलें।
* बेहतर पठनीयता के लिए `className` और `onClick` को अलग-अलग लाइनों पर रखें।

इन परिवर्तनों के बाद, Square के `render` मेथड द्वारा लौटाया गया `<button>` टैग इस तरह दिखता है:

```javascript{12-13,15}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

Square के `render` मेथड में `onClick` हैंडलर से `this.setState` को कॉल करके, हम React को उस Sqaure को फिर से रेंडर करने के लिए कहते हैं जब भी उसके `<button>` पर क्लिक किया जाता है। अपडेट के बाद, Square का `this.state.value` `'X'` होगा, इसलिए हम गेम Board पर `X` देखेंगे। यदि आप किसी भी Square पर क्लिक करते हैं, तो एक `X` को दिखाना चाहिए।

जब आप किसी कौम्पोनॅन्ट में `setState` कहते हैं, तो React स्वतः ही इसके अंदर के चाइल्ड कौम्पोनॅन्ट को भी अपडेट कर देता है।

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### डेवलपर टूल्स {#developer-tools}

[Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) और [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) के लिए React Devtools एक्सटेंशन आपको अपने ब्राउज़र के डेवलपर टूल्स के साथ एक React कौम्पोनॅन्ट ट्री का निरीक्षण करने देता है।

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

React DevTools आपको अपने React कौम्पोनॅन्ट के props और state की जाँच करने देता हैं।

React DevTools स्थापित करने के बाद, आप पृष्ठ पर किसी भी तत्व पर राइट-क्लिक कर सकते हैं, डेवलपर टूल्स खोलने के लिए "Inspect" पर क्लिक करें, और React टैब दाईं ओर अंतिम टैब के रूप में दिखाई देगा।

**हालाँकि, ध्यान दें कि CodePen के साथ काम करने के लिए कुछ अतिरिक्त चरण हैं:**

1. लॉग इन करें या रजिस्टर करें और अपने ईमेल की पुष्टि करें (स्पैम को रोकने के लिए आवश्यक)।
2. "Fork" बटन पर क्लिक करें।
3. "Change View" पर क्लिक करें और फिर "Debug Mode" चुनें।
4. खुलने वाले नए टैब में, devtools में अब एक React टैब होना चाहिए।

## खेल को पूरा करना {#completing-the-game}

अब हमारे पास टिक-टैक-टो गेम के लिए बुनियादी बिल्डिंग ब्लॉक हैं। एक पूरा गेम बनाने के लिए, अब हमें वैकल्पिक रूप से Board पर "X" और "O" को रखने की आवश्यकता है, और हमें विजेता को निर्धारित करने के लिए एक तरीका चाहिए।

### लिफ्टिंग state अप {#lifting-state-up}

वर्तमान में, प्रत्येक Square कौम्पोनॅन्ट खेल की स्थिति को बनाए रखता है। विजेता की जाँच करने के लिए, हम एक स्थान पर 9 वर्गों में से प्रत्येक का मान बनाए रखेंगे।

हम सोच सकते हैं कि Board को Square के state के लिए प्रत्येक Square से पूछना चाहिए। हालांकि यह दृष्टिकोण React में संभव है, हम इसे हतोत्साहित करते हैं क्योंकि कोड को समझना मुश्किल हो जाता है, कीड़े के लिए अतिसंवेदनशील और रिफ्लेक्टर के लिए कठिन। इसके बजाय, सबसे अच्छा तरीका यह है कि खेल के राज्य को प्रत्येक Square के बजाय पैरेंट Board कौम्पोनॅन्ट में स्टोर किया जाए। Board कौम्पोनॅन्ट प्रत्येक Square को props पास करके यह बता सकता है कि किसी प्रस्ताव को पारित करके क्या प्रदर्शित करना है, [ठीक उसी तरह जैसे हमने प्रत्येक Square के लिए एक नंबर पारित किया था](#passing-data-through-props)।

**कई चिल्ड्रन से डेटा एकत्र करने के लिए, या दो चाइल्ड कौम्पोनॅन्ट को एक दूसरे के साथ संवाद करने के लिए, आपको इसके बजाय उनके पेरेंट कौम्पोनॅन्ट में शेयर्ड state को घोषित करने की आवश्यकता है। पेरेंट कौम्पोनॅन्ट props का उपयोग करके state को वापस चिल्ड्रन को दे सकते हैं; यह चाइल्ड कौम्पोनॅन्ट को एक दूसरे के साथ और पेरेंट कौम्पोनॅन्ट के साथ तालमेल में रखता है।**

React कौम्पोनॅन्ट के अपवर्तित होने पर पेरेंट कौम्पोनॅन्ट में भारोत्तोलन की स्थिति सामान्य है - आइए इस अवसर को आजमाएं। हम Board में एक constructor जोड़ेंगे और 9 null के साथ एक सरणी रखने के लिए Board की प्रारंभिक state सेट करेंगे। ये 9 null 9 Square के अनुरूप हैं:

```javascript{2-7}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

जब हम Board को बाद में भरेंगे, तो Board कुछ इस तरह दिखेगा:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

वर्तमान में Board का `renderSquare` मेथड इस तरह दिखता है:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

शुरुआत में, हमने प्रत्येक Square में 0 से 8 तक संख्या दिखाने के लिए Board से [`value` prop को नीचे पास](#passing-data-through-props) किया। एक अलग पिछले चरण में, हमने संख्याओं को एक "X" चिह्न के साथ बदल दिया था [वर्ग के अपने state द्वारा निर्धारित](#making-an-interactive-component)। यही कारण है कि वर्तमान में Square ने Board द्वारा इसके लिए दिए गए `value` prop को अनदेखा कर दिया है।

हम अब props पासिंग मैकेनिज्म का फिर से उपयोग करेंगे। हम प्रत्येक व्यक्तिगत Square को उसके वर्तमान वैल्यू के बारे में निर्देश देने के लिए Board को संशोधित करेंगे(`'X'`, `'O'`, or `null`). हमने पहले से ही Board के constructor में `squares` array को परिभाषित किया है, और हम इसे पढ़ने के लिए Board के `renderSquare` मेथड को संशोधित करेंगे:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

प्रत्येक स्क्वायर को अब एक `value` prop प्राप्त होगा जो या तो खाली वर्गों के लिए `'X'`, `'O'` या `null` होगा।

अगला, हमें यह बदलने की आवश्यकता है कि Square पर क्लिक करने पर क्या होता है। Board कौम्पोनॅन्ट अब रखता है कि कौन से वर्ग भरे हुए हैं। हमें Board की स्थिति को अपडेट करने के लिए Square के लिए एक रास्ता बनाने की आवश्यकता है। चूंकि state को एक ऐसे कौम्पोनॅन्ट के लिए निजी माना जाता है जो इसे परिभाषित करता है, हम Board के state को सीधे Square से अपडेट नहीं कर सकते।

Board की state की गोपनीयता बनाए रखने के लिए, हम Board से Square के लिए एक फंक्शन पास करेंगे। जब Square पर क्लिक किया जाएगा तो यह फ़ंक्शन कॉल होगा। हम Board में `renderSquare` मेथड को बदलेंगे:

```javascript{5}
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

>ध्यान दें
>
>हमने पठनीयता के लिए दिए गए एलिमेंट को कई लाइनों में विभाजित किया है, और कोष्ठक को जोड़ा है ताकि जावास्क्रिप्ट `return` के बाद सेमीकोलन न डालें और हमारे कोड को तोड़ दें।

अब हम Board से Square तक दो props पास कर रहे हैं: `value` और `onClick`। `OnClick` props एक ऐसा फंक्शन है जिसे क्लिक करने पर Square कॉल कर सकता है। हम Square में निम्नलिखित बदलाव करेंगे:

* Square के `render` मेथड में `this.state.value` को `this.props.value` के साथ बदलें
* Square के `render` मेथड में `this.setState()` को `this.props.onClick()` से बदलें
* Square से `constructor` को हटा दें क्योंकि Square अब खेल की स्थिति का ट्रैक नहीं रखता है


इन परिवर्तनों के बाद, Square कौम्पोनॅन्ट इस तरह दिखता है:

```javascript{1,2,6,8}
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```

जब एक स्क्वायर पर क्लिक किया जाता है, तो Board द्वारा प्रदान किया गया `onClick` फ़ंक्शन कॉल होता है। यहां बताया गया है कि यह कैसे हासिल किया जाता है:

1. अंतर्निहित 'DOM' पर `onClick` prop `<button>` कौम्पोनॅन्ट क्लिक इवेंट लिस्टनेर स्थापित करने के लिए React को बताता है।
2. जब बटन पर क्लिक किया जाता है, तो React `onClick` ईवेंट हैंडलर को कॉल करेगा जिसे Square के `render()` मेथड में परिभाषित किया गया है।
3. यह ईवेंट हैंडलर `this.props.onClick()` कहता है। Board द्वारा Square के `onClick` prop को निर्दिष्ट किया गया था।
4. चूँकि Board ने `onClick = {() => this.handleClick (i)}` को Square में दिया, Square ने 'this.handleClick(i)' को क्लिक किया।
5. हमने अभी तक `handleClick()` मेथड को परिभाषित नहीं किया है, इसलिए हमारा कोड क्रैश हो गया है।

>ध्यान दें
>
>DOM `<button>` एलिमेंट का `onClick` विशेषता React का एक विशेष अर्थ है क्योंकि यह एक अंतर्निर्मित कौम्पोनॅन्ट है। स्क्वायर जैसे कस्टम कौम्पोनॅन्ट के लिए, नामकरण आपके ऊपर है। हम Square के `onClick` prop या Board के `handleClick` मेथड को अलग-अलग नाम दे सकते हैं। हालांकि, React में, यह props के लिए `on[Event]` के नाम का उपयोग करने के लिए एक कन्वेंशन है, जो ईवेंट्स को हैंडल करने वाले तरीकों के लिए ईवेंट और `handle[Event]` का प्रतिनिधित्व करता है।

जब हम एक Square पर क्लिक करने की कोशिश करते हैं, तो हमें एक त्रुटि मिलनी चाहिए क्योंकि हमने अभी तक `handleClick` को परिभाषित नहीं किया है। अब हम Board क्लास में `handleClick` जोड़ेंगे:

```javascript{9-13}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

इन परिवर्तनों के बाद, हम फिर से उन्हें भरने के लिए Squares पर क्लिक करने में सक्षम हैं। हालाँकि, अब state को अलग-अलग Square कौम्पोनॅन्ट के बजाय Board कौम्पोनॅन्ट में संग्रहीत किया जाता है। जब Board का state बदल जाती है, तो Square कौम्पोनॅन्ट स्वचालित रूप से फिर से render करते हैं। Board कौम्पोनॅन्ट में सभी वर्गों की स्थिति को ध्यान में रखते हुए यह भविष्य में विजेता का निर्धारण करने की अनुमति देगा।

चूंकि Square कौम्पोनॅन्ट अब state को बनाए नहीं रखते हैं, इसलिए Square कौम्पोनॅन्ट Board कौम्पोनॅन्ट से वैल्यू प्राप्त करते हैं और क्लिक किए जाने पर Board कौम्पोनॅन्ट को सूचित करते हैं। React के संदर्भ में, Sqaure कौम्पोनॅन्ट अब **controlled components** हैं। Board का उन पर पूरा नियंत्रण है।

ध्यान दें कि कैसे `handleClick` में, हम मौजूदा array को संशोधित करने के बजाय संशोधित करने के लिए `Square` array की एक प्रति बनाने के लिए `.slice()` कहते हैं। हम बताएंगे कि हम अगले भाग में `Square` array की एक कॉपी क्यों बनाते हैं।

### अचल स्थिति होना क्यों महत्वपूर्ण है {#why-immutability-is-important}

पिछले कोड उदाहरण में, हमने सुझाव दिया कि आप मौजूदा सरणी को संशोधित करने के बजाय संशोधित करने के लिए `Square` array की एक प्रति बनाने के लिए `.slice()` ऑपरेटर का उपयोग करें। अब हम अपरिवर्तनीयता पर चर्चा करेंगे और सीखने के लिए अपरिवर्तनशीलता क्यों महत्वपूर्ण है।

डेटा बदलने के लिए आम तौर पर दो दृष्टिकोण होते हैं। पहला तरीका डेटा के मूल्यों को सीधे बदलकर डेटा को *म्यूटेट* करना है। दूसरा दृष्टिकोण डेटा को एक नई प्रति के साथ प्रतिस्थापित करना है जिसमें वांछित परिवर्तन हैं।

#### म्यूटेशन के साथ डेटा बदलें {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// अब खिलाड़ी है {score: 2, name: 'Jeff'}
```

#### म्यूटेशन के बिना डेटा बदलें {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// अब खिलाड़ी अपरिवर्तित है, लेकिन newPlayer है {score: 2, name: 'Jeff'}

// या यदि आप ऑब्जेक्ट स्प्रेड सिंटैक्स प्रस्ताव का उपयोग कर रहे हैं, तो आप लिख सकते हैं:
// var newPlayer = {...player, score: 2};
```

अंतिम परिणाम समान है लेकिन सीधे अंतर्निहित डेटा (या अंतर्निहित डेटा को परिवर्तित नहीं) करके, हम नीचे वर्णित कई लाभ प्राप्त करते हैं।

#### जटिल विशेषताएँ सरल बनें {#complex-features-become-simple}

अपरिवर्तनीयता जटिल सुविधाओं को लागू करने में बहुत आसान बनाती है। इस ट्यूटोरियल में बाद में, हम एक "टाइम ट्रैवल" सुविधा को लागू करेंगे, जो हमें टिक-टैक-टो गेम के इतिहास की समीक्षा करने और पिछली चालों के लिए "वापस कूदने" की अनुमति देगा। यह कार्यक्षमता खेलों के लिए विशिष्ट नहीं है - कुछ कार्यों को पूर्ववत और फिर से करने की क्षमता अनुप्रयोगों में एक सामान्य आवश्यकता है। प्रत्यक्ष डेटा उत्परिवर्तन से बचने से हम खेल के इतिहास के पिछले संस्करणों को बरकरार रख सकते हैं, और बाद में उनका पुन: उपयोग कर सकते हैं।

#### परिवर्तन का पता लगाना {#detecting-changes}

उत्परिवर्तनीय वस्तुओं में परिवर्तन का पता लगाना मुश्किल है क्योंकि वे सीधे संशोधित होते हैं। इसको पता लगाने के लिए परिवर्तनशील वस्तु की आवश्यकता होती है जिसकी पिछली प्रतियों की तुलना की जाए और पूरे ऑब्जेक्ट ट्री को ट्रैवर्स किया जाए।

अपरिवर्तनीय वस्तुओं में परिवर्तनों का पता लगाना काफी आसान है। यदि संदर्भित की जा रही अपरिवर्तनीय वस्तु पिछले एक से भिन्न है, तो वह वस्तु बदल गई है।

#### React में री-रेंडर कब करना है यह निर्धारित करना {#determining-when-to-re-render-in-react}

अपरिवर्तनीयता का मुख्य लाभ यह है कि यह आपको React में _pure Components_ बनाने में मदद करता है। अपरिवर्तनीय डेटा आसानी से निर्धारित कर सकते हैं कि क्या परिवर्तन किए गए हैं जो यह निर्धारित करने में मदद करता है कि एक कौम्पोनॅन्ट को फिर से री-रेंडरिंग की आवश्यकता कब होती है।

आप `shouldComponentUpdate()` के बारे में और जान सकते हैं कि कैसे [ऑप्टिमिज़िंग परफॉरमेंस](/docs/optimizing-performance.html#examples) पढ़कर आप *शुद्ध कौम्पोनॅन्ट* का निर्माण कर सकते हैं।

### फंक्शन कंपोनेंट्स {#function-components}

अब हम स्क्वायर को **फंक्शन कंपोनेंट्स** में बदल देंगे।

React में, **फंक्शन कंपोनेंट्स** उन कौम्पोनॅन्ट को लिखने का एक सरल तरीका है जिनमें केवल एक `render` मेथड शामिल है और उनकी अपनी स्थिति नहीं है। एक वर्ग को परिभाषित करने के बजाय जो `React.Component` का विस्तार करता है, हम एक फ़ंक्शन लिख सकते हैं जो `props` को इनपुट के रूप में लेता है और जो रेंडर किया जाना चाहिए वह देता है। 
फंक्शन कंपोनेंट्स क्लासेज की तुलना में लिखने के लिए कम ग़ैरदिलचस्प हैं, और कई कौम्पोनॅन्ट को इस तरह से व्यक्त किया जा सकता है।

इस फ़ंक्शन के साथ Square क्लास बदलें:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

हमने `this.props` को `props` में बदल दिया है, दोनों जगह जहाँ इसका इस्तेमाल हो रहा था।

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>ध्यान दें
>
>जब हमने Square को फ़ंक्शन कौम्पोनॅन्ट होने के लिए संशोधित किया, तो हमने `onClick = {() => this.props.onClick ()}` को एक छोटे `onClick = {props.onClick}` में बदल दिया (नोट पर कोष्ठक की कमी पर ध्यान दें) *दोनों पक्षों)। एक क्लास में, हमने सही `this` मान को एक्सेस करने के लिए एक एरो फ़ंक्शन का उपयोग किया, लेकिन एक फ़ंक्शन कौम्पोनॅन्ट में हमें `this` के बारे में चिंता करने की आवश्यकता नहीं है।

### बारी लेना {#taking-turns}

अब हमें अपने टिक-टैक-टो गेम में एक स्पष्ट दोष को ठीक करने की आवश्यकता है: Board पर "O" को चिह्नित नहीं किया जा सकता है।

हम डिफ़ॉल्ट रूप से "X" होने के लिए पहला कदम रखेंगे। हम अपने Board constructor में प्रारंभिक स्थिति को संशोधित करके इस डिफ़ॉल्ट को सेट कर सकते हैं:

```javascript{6}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
```

जब भी कोई खिलाड़ी आगे बढ़ता है, `xIsNext` (एक बूलियन) को यह निर्धारित करने के लिए फ़्लिप किया जाता है कि कौन सा खिलाड़ी आगे जाता है और Game का state सेव हो जाएगा। हम `xIsNext` का वैल्यू फ़्लिप करने के लिए Board के `handleClick` फ़ंक्शन को अपडेट करेंगे:

```javascript{3,6}
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

इस परिवर्तन के साथ, "X" का और "O" का परिवर्तन हो सकता है। चलो Board के `render` में "status" टेक्स्ट को भी बदलते हैं ताकि यह प्रदर्शित हो कि किस खिलाड़ी की अगली बारी है:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // बाकी नहीं बदला है
```

इन परिवर्तनों को लागू करने के बाद, आपके पास यह Board कौम्पोनॅन्ट होना चाहिए:

```javascript{6,11-16,29}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### विजेता घोषित करना {#declaring-a-winner}

अब जब हम दिखाते हैं कि किस खिलाड़ी की बारी है, तो हमें यह भी दिखाना चाहिए कि खेल कब जीता जाता है और बनाने के लिए अधिक बारी नहीं होते हैं। हम फ़ाइल के अंत में इस सहायक फ़ंक्शन को जोड़कर एक विजेता निर्धारित कर सकते हैं:

```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

हम Board के `render` फंक्शन में `calculateWinners(squares)` को यह जाँचने के लिए कहेंगे कि क्या कोई खिलाड़ी जीता है। यदि कोई खिलाड़ी जीता है, तो हम "विजेता: X" या "विजेता: O" जैसे टेक्स्ट प्रदर्शित कर सकते हैं। हम इस कोड के साथ Board के `render` फ़ंक्शन में `status` घोषणा को प्रतिस्थापित करेंगे:

```javascript{2-8}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // बाकी नहीं बदला है
```

यदि कोई गेम जीत चुका है या यदि कोई Square पहले से ही भरा है तो हम एक क्लिक को अनदेखा करके जल्दी लौटने के लिए Board के `handleClick` फ़ंक्शन को बदल सकते हैं:

```javascript{3-5}
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

बधाई हो! अब आपके पास काम करने वाला का टिक-टैक-टो खेल है। और आपने अभी-अभी React के बेसिक्स भी सीखे हैं। तो *आप* यहां के असली विजेता हैं।

## टाइम ट्रेवल गेम में डालना {#adding-time-travel}

अंतिम अभ्यास के रूप में, चलिए खेल में पिछली चालों के लिए "समय में वापस जाएं" संभव है।

### मूव्स की हिस्ट्री स्टोर करना {#storing-a-history-of-moves}

यदि हम `Square` array को बदल देते हैं, तो टाइम ट्रेवल को लागू करना बहुत मुश्किल होगा।

हालाँकि, हमने हर चाल के बाद `squares` array की एक नई प्रति बनाने के लिए `slice()` का उपयोग किया, और [इसे अपरिवर्तनीय माना](#why-immutability-is-important). यह हमें `squares` array के हर पिछले संस्करण को संग्रहीत करने की अनुमति देगा, और उन घुमावों के बीच नेविगेट करेगा जो पहले ही हो चुके हैं।

हम `history` नामक एक और सरणी में पिछले `squares` arrays को संग्रहीत करेंगे। `history` array पहली से अंतिम चाल तक सभी Board स्टेट्स का प्रतिनिधित्व करता है, और इस तरह से इसके पास एक आकार है:

```javascript
history = [
  // पहली चाल से पहले
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // पहले कदम के बाद
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // दूसरे कदम के बाद
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

अब हमें यह तय करने की आवश्यकता है कि किस कौम्पोनॅन्ट को `history` state का मालिक होना चाहिए।

### लिफ्टिंग state अप, फिर से {#lifting-state-up-again}

हम पिछले चालों की सूची प्रदर्शित करने के लिए शीर्ष-स्तरीय Game कौम्पोनॅन्ट चाहते हैं। यह करने के लिए `history` तक पहुंचने की आवश्यकता होगी, इसलिए हम शीर्ष स्तर के Game कौम्पोनॅन्ट में `history` state को जगह देंगे।

Game के कौम्पोनॅन्ट में `history` state को रखने से हम अपने चाइल्ड के Board कौम्पोनॅन्ट से `squares` state को हटा सकते हैं। जैसे हम Board कौम्पोनॅन्ट में ["लिफ़्टेड state अप"](#lifting-state-up) को Square कौम्पोनॅन्ट से हटाते हैं, वैसे ही अब हम इसे Board से टॉप-लेवल Game कौम्पोनॅन्ट में उठा रहे हैं। यह गेम Game कौम्पोनॅन्ट को Board के डेटा पर पूर्ण नियंत्रण प्रदान करता है, और इससे Board को `history` से पिछले घुमावों को प्रस्तुत करने का निर्देश मिलता है।

सबसे पहले, हम इसके constructor के भीतर Game कौम्पोनॅन्ट के लिए प्रारंभिक state सेट करेंगे:

```javascript{2-10}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

अगला, हमारे पास Board कौम्पोनॅन्ट Game कौम्पोनॅन्ट से `square` और `onClick` props प्राप्त होगा। चूँकि अब हमारे पास कई Sqaures के लिए Board में एक सिंगल क्लिक हैंडलर है, हमें यह दर्शाने के लिए प्रत्येक Sqaure के स्थान को `onClick` हैंडलर में डालना होगा कि किस वर्ग को क्लिक किया गया था। Board कौम्पोनॅन्ट को बदलने के लिए यहाँ आवश्यक कदम हैं:

* Board में `constructor` को हटा दें।
* Board के `renderSquare` में `this.state.squares[i]` को `this.props.squares[i]` से बदलें।
* Board के `renderSquare` में `this.props.onClick(i)` के साथ `this.handleClick(i)` को बदलें।

Board कौम्पोनॅन्ट अब इस तरह दिखता है:

```javascript{17,18}
class Board extends React.Component {
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

गेम के state को निर्धारित करने और प्रदर्शित करने के लिए सबसे हाल के इतिहास प्रविष्टि का उपयोग करने के लिए हम Game कौम्पोनॅन्ट के `render` फ़ंक्शन को अपडेट करेंगे:

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

चूंकि Game कौम्पोनॅन्ट अब गेम के state को प्रदान कर रहा है, हम Board के `render` मेथड से संबंधित कोड को हटा सकते हैं। रिफैक्टरिंग के बाद, Board का `render` फ़ंक्शन इस तरह दिखता है:

```js{1-4}
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

अंत में, हमें Board कौम्पोनॅन्ट से Game कौम्पोनॅन्ट में `handleClick` मेथड को स्थानांतरित करने की आवश्यकता है। हमें `handleClick` को भी संशोधित करने की आवश्यकता है क्योंकि गेम घटक की स्थिति अलग तरह से संरचित है। गेम के `handleClick` पद्धति के तहत, हम `history` पर नए इतिहास प्रविष्टियों को बदलते हैं।

```javascript{2-4,10-12}
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```

>ध्यान दें
>
>Array के विपरीत `push()` मेथड से आप अधिक परिचित हो सकते हैं, `concat()` मेथड मूल array को म्यूटेट नहीं करती है, इसलिए हम इसे पसंद करते हैं।

इस बिंदु पर, Board कौम्पोनॅन्ट को केवल `renderSquare` और `render` मेथड की आवश्यकता है। Game कौम्पोनॅन्ट के state में गेम का state और `handleClick` मेथड होनी चाहिए।

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### पिछली चाल दिखाना {#showing-the-past-moves}

चूंकि हम टिक-टैक-टो गेम की history को रिकॉर्ड कर रहे हैं, इसलिए हम इसे पिछले चालों की सूची के रूप में खिलाड़ी को प्रदर्शित कर सकते हैं।

हमने पहले सीखा था कि React एलिमेंट्स प्रथम श्रेणी के जावास्क्रिप्ट ऑब्जेक्ट हैं; हम उन्हें अपने अनुप्रयोगों में पास कर सकते हैं। React में कई वस्तुओं को प्रस्तुत करने के लिए, हम React एलिमेंट्स की एक array का उपयोग कर सकते हैं।

जावास्क्रिप्ट में, arrays का एक [`map()` मेथड](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) है जो आमतौर पर डेटा को अन्य डेटा मैप करने के लिए उपयोग किया जाता है, उदाहरण के लिए:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
``` 

`map` मेथड का उपयोग करके, हम चालों के हमारे इतिहास को स्क्रीन पर बटन का प्रतिनिधित्व करने वाले React एलिमेंट्स में मैप कर सकते हैं, और पिछले चालों पर "जाने के लिए" बटन की एक सूची प्रदर्शित कर सकते हैं।

आइए खेल के `render` मेथड में `history` पर `map` करें:

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
```

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

टिक-टैक्-टो के खेल के इतिहास में प्रत्येक चाल के लिए, हम एक सूची आइटम `<li>` बनाते हैं जिसमें एक बटन होता है `<button>`। बटन में एक  `onClick` हैंडलर होता है, जो कि `this.jumpTo()` नामक एक मेथड कॉल करता है। 
हमने अभी तक `jumpTo()` मेथड बनाई नहीं की है। अभी के लिए, हमें खेल में होने वाली चालों की सूची दिखनी चाहिए और डेवलपर टूल्स कंसोल में एक चेतावनी दी गई है जो कहती है:

>  चेतावनी:
>  एक array या पुनरावृत्त में प्रत्येक चाइल्ड के पास एक अद्वितीय "कुंजी" प्रोप होना चाहिए। "Game" की रेंडर मेथड की जाँच करें।

आइए चर्चा करें कि उपरोक्त चेतावनी का क्या मतलब है।

### एक कुंजी उठाना {#picking-a-key}

जब हम एक सूची सौंपते हैं, तो React प्रत्येक रेंडर सूची आइटम के बारे में कुछ जानकारी संग्रहीत करती है। जब हम किसी सूची को अपडेट करते हैं, तो React को यह निर्धारित करने की आवश्यकता होती है कि क्या बदल गया है। हम सूची के आइटम को जोड़, हटा, पुन: व्यवस्थित या अपडेट कर सकते थे।

से संक्रमण की कल्पना करो

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

to

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

अपडेटेड काउंट्स के अलावा, यह पढ़ने वाला एक मानव शायद यह कहेगा कि हमने एलेक्सा और बेन के ऑर्डर को स्वैप किया और एलेक्सा और बेन के बीच क्लाउडिया को डाला। हालाँकि, React एक कंप्यूटर प्रोग्राम है और यह नहीं जानता कि हमने क्या इरादा किया था। क्योंकि React हमारे इरादों को नहीं जान सकती, इसलिए हमें प्रत्येक सूची आइटम के लिए उसके सिब्लिंग्स से अलग करने के लिए प्रत्येक सूची आइटम के लिए एक *कुंजी* गुण निर्दिष्ट करने की आवश्यकता है। 
एक विकल्प strings `एलेक्सा`,` ेन`, `क्लाउडिया` का उपयोग करना होगा। यदि हम एक डेटाबेस से डेटा प्रदर्शित कर रहे थे, तो एलेक्सा, बेन और क्लाउडिया के डेटाबेस आईडी को कुंजी के रूप में इस्तेमाल किया जा सकता है।

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

जब एक सूची को फिर से प्रस्तुत किया जाता है, तो React प्रत्येक सूची आइटम की कुंजी लेता है और मिलान सूची के लिए पिछली सूची के आइटम को खोजता है। यदि वर्तमान सूची में एक कुंजी है जो पहले मौजूद नहीं थी, तो React एक कौम्पोनॅन्ट बनाती है। यदि वर्तमान सूची में पिछली सूची में मौजूद एक कुंजी गायब है, तो React पिछले कौम्पोनॅन्ट को नष्ट कर देती है। यदि दो कुंजी मेल खाती हैं, तो संबंधित घटक स्थानांतरित हो जाता है। कीज़ React को प्रत्येक कौम्पोनॅन्ट की पहचान के बारे में बताती है जो React को पुन: रेंडरर्स के बीच स्थिति बनाए रखने की अनुमति देता है। यदि किसी कौम्पोनॅन्ट की कुंजी बदल जाती है, तो घटक नष्ट हो जाएगा और नए state के साथ फिर से बनाया जाएगा।

`कुंजी` React में एक विशेष और आरक्षित संपत्ति है (`ref`, एक अधिक उन्नत सुविधा के साथ)। जब एक तत्व बनाया जाता है, तो रिएक्ट `key` संपत्ति निकालता है और कुंजी को सीधे दिए गए एलिमेंट पर संग्रहीत करता है। भले ही `key` लग सकता है, लेकिन यह `props` में है, `key` को `this.props.key` का उपयोग करके संदर्भित नहीं किया जा सकता है। React करने के लिए कौन से कौम्पोनॅन्ट को तय करना है, React स्वचालित रूप से `key` का उपयोग करता है। एक कौम्पोनॅन्ट अपने `key` के बारे में पूछताछ नहीं कर सकता।

**यह दृढ़ता से अनुशंसा की जाती है कि जब भी आप डायनामिक सूचियों का निर्माण करते हैं तो आप उचित कुंजी प्रदान करते हैं।** यदि आपके पास एक उपयुक्त कुंजी नहीं है, तो आप अपने डेटा के पुनर्गठन पर विचार कर सकते हैं ताकि आप ऐसा करें।

यदि कोई कुंजी निर्दिष्ट नहीं है, तो React एक चेतावनी पेश करेगा और डिफ़ॉल्ट रूप से array इंडेक्स को कुंजी के रूप में उपयोग करेगा। किसी सूची के आइटम को पुन: क्रम देने या सूची आइटम को सम्मिलित / हटाने की कोशिश करते समय सरणी इंडेक्स को एक कुंजी के रूप में उपयोग करना समस्याग्रस्त है। स्पष्ट रूप से `key = {i}` पास करना चेतावनी को चुप करता है लेकिन सरणी सूचकांकों के समान समस्याएं हैं और ज्यादातर मामलों में अनुशंसित नहीं है।

कुंजी को विश्व स्तर पर अद्वितीय होने की आवश्यकता नहीं है; उन्हें केवल कौम्पोनॅन्ट और उनके सिब्लिंग्स के बीच अद्वितीय होना चाहिए।


### टाइम ट्रेवल लागू करना {#implementing-time-travel}

टिक-टैक-टो खेल के इतिहास में, प्रत्येक पिछले चाल में एक अद्वितीय आईडी जुड़ी होती है: यह चाल की क्रमिक संख्या होती है। चालों को फिर से कभी भी आदेश नहीं दिया जाता है, हटा दिया जाता है, या बीच में डाला जाता है, इसलिए यह कुंजी के रूप में चाल सूचकांक का उपयोग करना सुरक्षित है।

गेम कौम्पोनॅन्ट की `render` मेथड में, हम कुंजी को `<li key = {Move}>` के रूप में जोड़ सकते हैं और key के बारे में React की चेतावनी गायब होनी चाहिए:

```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

किसी भी सूची आइटम के बटन पर क्लिक करने से त्रुटि हो जाती है क्योंकि `jumpTo` मेथड अपरिभाषित है। इससे पहले कि हम `jumpTo` को लागू करते हैं, हम गेम घटक की स्थिति में `stepNumber` जोड़ेंगे, यह इंगित करने के लिए कि हम वर्तमान में कौन सा कदम देख रहे हैं।

सबसे पहले, गेम के `constructor` में प्रारंभिक अवस्था में `stepNumber: 0` जोड़ें:

```js{8}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
```

अगला, हम गेम में `jumpTo` पद्धति को परिभाषित करेंगे ताकि यह अपडेट किया जा सके कि `stepNumber`। यदि हम जिस नंबर को बदल रहे हैं, तो हम `xIsNext` को भी सही सेट करते हैं, यहाँ तक कि `stepNumber` को भी:

```javascript{5-10}
  handleClick(i) {
    // this method has not changed
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // this method has not changed
  }
```

अब हम गेम के 'handleClick' पद्धति में कुछ बदलाव करेंगे, जब आप एक square पर क्लिक करते हैं।

हमारे द्वारा जोड़ा गया `stepNumber` state अब उपयोगकर्ता को प्रदर्शित की गई चाल को दर्शाता है। एक नई चाल बनाने के बाद, हमें `step.Number: history.length` को `this.setState` तर्क के भाग के रूप में जोड़कर `stepNumber` को अपडेट करने की आवश्यकता है। यह सुनिश्चित करता है कि हम एक नए कदम के बाद एक ही चाल दिखाने में फंस न जाएं।

हम `it.state.history.slice(0, this.state.stepNumber + 1)` के साथ `it.state.history` पढ़ने को भी बदल देंगे। यह सुनिश्चित करता है कि यदि हम "समय में वापस जाते हैं" और फिर उस बिंदु से एक नया कदम बनाते हैं, तो हम सभी "भविष्य" इतिहास को फेंक देते हैं जो अब गलत हो जाएगा।

```javascript{2,13}
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
```

अंत में, हम Game कौम्पोनॅन्ट के `render` मेथड को हमेशा अंतिम चरण प्रदान करने से लेकर वर्तमान में चुने गए कदम को `stepNumber` के अनुसार रेंडर करेंगे।

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // बाकी नहीं बदला है
```

यदि हम गेम के history के किसी भी चरण पर क्लिक करते हैं, तो टिक-टैक-टो Board को तुरंत यह दिखाने के लिए अपडेट करना चाहिए कि Board उस चरण के बाद कैसा दिखता था।

**[इस बिंदु पर पूर्ण कोड देखें](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### समाप्त करें {#wrapping-up}

बधाई हो! आपने एक टिक-टैक-टो गेम बनाया है:

* अब टिक-टैक-टो खेलते हैं,
* इंगित करता है कि जब किसी खिलाड़ी ने गेम जीता है,
* एक खेल के रूप में एक खेल के इतिहास को स्टोर करता है,
* खिलाड़ियों को गेम के इतिहास की समीक्षा करने और गेम के बोर्ड के पिछले संस्करणों को देखने की अनुमति देता है।

अच्छा काम! हमें उम्मीद है कि अब आप महसूस करेंगे कि आपके पास React कैसे काम करता है, इस पर एक सभ्य समझ है।

अंतिम परिणाम यहां देखें: **[अंतिम परिणाम](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

यदि आपके पास अतिरिक्त समय है या आप अपने नए React कौशल का अभ्यास करना चाहते हैं, तो यहां सुधार के लिए कुछ विचार दिए गए हैं जो आप टिक-टैक-टो खेल में कर सकते हैं जो कि बढ़ती कठिनाई के क्रम में सूचीबद्ध हैं:

1. चाल इतिहास सूची में प्रारूप (col, row) में प्रत्येक चाल के लिए स्थान प्रदर्शित करें।
2. चाल सूची में वर्तमान में चयनित आइटम को बोल्ड करें।
3. वर्गों को हार्डकोड करने के बजाय दो छोरों का उपयोग करने के लिए रीराइट बोर्ड का उपयोग करें।
4. एक टॉगल बटन जोड़ें जो आपको आरोही या अवरोही क्रम में चालों को क्रमबद्ध करने देता है।
5. जब कोई जीतता है, तो जीत का कारण बनने वाले तीन Square को उजागर करें।
6. जब कोई नहीं जीतता है, तो परिणाम ड्रा होने के बारे में एक संदेश प्रदर्शित करें।

इस ट्यूटोरियल के दौरान, हमने एलिमेंट्स, कौम्पोनॅन्ट, props और state सहित React कॉन्सेप्ट्स पर स्पर्श किया। इनमें से प्रत्येक विषय के अधिक विस्तृत विवरण के लिए, [बाकी दस्तावेज़](/docs/hello-world.html) देखें। घटकों को परिभाषित करने के बारे में अधिक जानने के लिए, [`React.Component` API](/docs/hello-world.html) देखें।
