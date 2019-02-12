---
id: tutorial
title: "ट्यूटोरियल: रियेक्ट से परिचय"
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

यह ट्यूटोरियल किसी भी मौजूदा रियेक्ट ज्ञान को ग्रहण नहीं करेगा।

## ट्यूटोरियल शुरू करने से पहले {#before-we-start-the-tutorial}

हम इस ट्यूटोरियल के दौरान एक छोटा गेम बनाएंगे। **आप इसे छोड़ सकते हैं क्योंकि आप गेम नहीं बना रहे हैं -- लेकिन इसे एक मौका दें।** ट्यूटोरियल में आपके द्वारा सीखी जाने वाली तकनीकें किसी भी React ऐप्स के निर्माण के लिए मौलिक हैं, और इसमें महारत हासिल करने से आपको React की गहरी समझ मिलेगी।

>सलाह
>
>यह ट्यूटोरियल उन लोगों के लिए बनाया गया है, जो **करके सीखना** पसंद करते हैं। यदि आप नीचे से ऊपर अवधारणाओं को सीखना पसंद करते हैं, हमारे [क्रमशः मार्गदर्शिका](/docs/hello-world.html) देखें। आपको यह ट्यूटोरियल और गाइडमार्गदर्शिका एक-दूसरे के संपूरक लग सकते हैं।

ट्यूटोरियल को कई खंडों में विभाजित किया गया है:

* [ट्यूटोरियल के लिए व्यवस्था](#setup-for-the-tutorial) आपको ट्यूटोरियल का पालन करने के लिए **एक प्रारंभिक बिंदु** देगा।
* [सिंहावलोकन](#overview) आपको सिखाएगा रियेक्ट की **बुनियादी बातें**: कंपोनेंट्स, props और स्टेट।
* [गेम को पूरा करना](#completing-the-game) आपको React विकास में **सबसे आम तकनीकों** को सिखाएगा।
* [टाइम ट्रैवल को जोड़ने](#adding-time-travel) से आपको React की अद्वितीय शक्तियों के बारे में गहराई से जानकारी मिलेगी।


इस ट्यूटोरियल से मूल्य प्राप्त करने के लिए आपको एक बार में सभी वर्गों को पूरा करने की आवश्यकता नहीं है।
जहां तक ​​हो सके जाने की कोशिश करें -- भले ही यह एक या दो सेक्शन हो।

ट्यूटोरियल के साथ कोड का कॉपी और पेस्ट करना ठीक है, लेकिन हम इसे हाथ से टाइप करने की सलाह देते हैं। इससे आपको मांसपेशियों की याददाश्त और मजबूत समझ विकसित करने में मदद मिलेगी।

### हम क्या बना रहे हैं? {#what-are-we-building}

इस ट्यूटोरियल में, हम बताएंगे कि कैसे React के साथ एक इंटरैक्टिव टिक-टैक-टो गेम का निर्माण करना है।

आप देख सकते हैं कि हम यहां क्या बना रहे हैं: **[अंतिम परिणाम](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. यदि कोड आपके लिए मायने नहीं रखता है, या यदि आप कोड के सिंटैक्स से अपरिचित हैं, चिंता मत करो! इस ट्यूटोरियल का लक्ष्य React और इसके सिंटैक्स को समझने में आपकी मदद करना है।

हम अनुशंसा करते हैं कि आप ट्यूटोरियल को जारी रखने से पहले टिक-टैक-टो खेल के देखें। सुविधाओं में से एक है कि आप देखेंगे कि खेल के बोर्ड के दाईं ओर एक क्रमांकित सूची है। यह सूची आपको खेल में होने वाली सभी चालों का इतिहास देती है, और खेल की प्रगति के रूप में अद्यतन किया जाता है।

इससे परिचित होने के बाद आप टिक-टैक-टो खेल को बंद कर सकते हैं। हम इस ट्यूटोरियल में एक सरल टेम्पलेट से शुरू करेंगे। हमारा अगला कदम आपको स्थापित करना है ताकि आप खेल का निर्माण शुरू कर सकें।

### आवश्यक शर्तें {#prerequisites}

हम मान लेंगे कि आप एचटीएमएल और जावास्क्रिप्ट से थोड़े परिचित हैं, लेकिन अगर आप एक अलग प्रोग्रामिंग भाषा से आ रहे हैं तब भी आपको साथ चलने में सक्षम होना चाहिए। हम यह भी मान लेंगे कि आप फ़ंक्शंस, ऑब्जेक्ट्स, अरेस और कुछ हद तक, क्लास जैसी प्रोग्रामिंग अवधारणाओं से परिचित हैं।

यदि आपको जावास्क्रिप्ट की समीक्षा करने की आवश्यकता है, तो हम [इस मार्गदर्शिका](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) पढ़ने की सलाह देते हैं। ध्यान दें कि हम ईएस 6 से कुछ सुविधाओं का उपयोग कर रहे हैं - जावास्क्रिप्ट का एक हालिया संस्करण। इस ट्यूटोरियल में, हम [एरो फ़ंक्शंस](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [क्लासेस](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) और [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) स्टेटमेंट्स का उपयोग कर रहे हैं। ईएस 6 कोड क्या संकलित करता है यह जांचने के लिए आप [बैबल आरईपीएल](babel://es5-syntax-example) का उपयोग कर सकते हैं।

## ट्यूटोरियल के लिए व्यवस्था {#setup-for-the-tutorial}

इस ट्यूटोरियल को पूरा करने के दो तरीके हैं: आप या तो अपने ब्राउज़र में कोड लिख सकते हैं, या आप अपने कंप्यूटर पर स्थानीय विकास वातावरण सेट कर सकते हैं।

### व्यवस्था विकल्प 1: ब्राउज़र में कोड लिखें {#setup-option-1-write-code-in-the-browser}

यह आरंभ करने का सबसे तेज़ तरीका है!

सबसे पहले, इस **[प्रारंभक कोड](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** को एक नए टैब में खोलें। 
नए टैब में एक खाली टिक-टैक-टो गेम बोर्ड और React कोड प्रदर्शित होना चाहिए। हम इस ट्यूटोरियल में React कोड का संपादन करेंगे।

अब आप दूसरे व्यवस्था विकल्प को छोड़ सकते हैं, और रियेक्ट का सिंहावलोकन प्राप्त करने के लिए [सिंहावलोकन](#overview) अनुभाग पर जाएं।

### व्यवस्था विकल्प 1: स्थानीय विकास पर्यावरण {#setup-option-2-local-development-environment}

यह पूरी तरह से वैकल्पिक है और इस ट्यूटोरियल की आवश्यकता नहीं है!

<br>

<details>

<summary><b>वैकल्पिक: अपने पसंदीदा पाठ संपादक का उपयोग करके स्थानीय स्तर पर अनुसरण करने के निर्देश</b></summary>

इस व्यवस्था को और अधिक काम करने की आवश्यकता है लेकिन आप अपनी पसंद के संपादक का उपयोग करके ट्यूटोरियल को पूरा कर सकते हैं। यहाँ चरणों का पालन करें:

1. सुनिश्चित करें कि आपके पास हाल ही में स्थापित [Node.js](https://nodejs.org/en/) का संस्करण है।
2. एक नई प्रोजेक्ट बनाने के लिए [क्रिएट React ऐप के इंस्टॉलेशन निर्देशों](/docs/create-a-new-react-app.html#create-react-app) का पालन करें।

```bash
npx create-react-app my-app
```

3. नई प्रोजेक्ट के `src/` फ़ोल्डर में सभी फ़ाइलों को हटा दें

> ध्यान दें:
>
>**संपूर्ण `src` फ़ोल्डर को न हटाएं, केवल मूल स्रोत फ़ाइलों को इसके अंदर रखें।** हम अगले चरण में इस प्रोजेक्ट के लिए डिफ़ॉल्ट स्रोत फ़ाइलों को उदाहरणों के साथ बदल देंगे।

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

हम आपके संपादक के लिए वाक्य रचना हाइलाइटिंग को कॉन्फ़िगर करने के लिए [इन निर्देशों](https://babeljs.io/docs/editors/) का पालन करने की सलाह देते हैं।

</details>

### मदद, मैं अटक गया हूँ! {#help-im-stuck}

यदि आप अटक जाते हैं, तो [सामुदायिक सहायता संसाधनों](/community/support.html) की जांच करें। विशेष रूप से, [Reactiflux चैट](https://discord.gg/0ZcbPKXt5bZjGY5n) जल्दी से सहायता प्राप्त करने का एक शानदार तरीका है। यदि आपको कोई उत्तर नहीं मिलता है, या यदि आप अटके रहते हैं, तो कृपया एक समस्या दर्ज करें, और हम आपकी मदद करेंगे।

## सिंहावलोकन {#overview}

अब जब आप सेट हो गए हैं, तो रियेक्ट का सिंहावलोकन करें!

### रियेक्ट क्या है? {#what-is-react}

उपयोगकर्ता इंटरफेस के निर्माण के लिए रियेक्ट एक घोषणापत्र, कुशल और लचीली जावास्क्रिप्ट लाइब्रेरी है। यह आपको "कौम्पोनॅन्ट्स" नामक कोड के छोटे और पृथक टुकड़ों से जटिल यूआई की रचना करने देता है।

रियेक्ट के कुछ अलग-अलग प्रकार के कौम्पोनॅन्ट होते हैं, लेकिन हम `React.Component` उपवर्गों के साथ शुरुआत करेंगे:

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

हम जल्द ही मज़ेदार एक्सएमएल-जैसे टैग प्राप्त करेंगे. हम स्क्रीन पर जो देखना चाहते हैं उसे React करने के लिए हम कौम्पोनॅन्ट्स का उपयोग करते हैं। जब हमारा डेटा बदलता है, तो React कुशलतापूर्वक हमारे कौम्पोनॅन्ट्स को अद्यतन और प्रस्तुत करेगा।

यहाँ, ShoppingList एक **React कौम्पोनॅन्ट क्लास** या **React कौम्पोनॅन्ट टाइप** है। एक कौम्पोनॅन्ट मापदंडों में लेता है, जिसे `props` ("गुणों" के लिए छोटा) कहा जाता है, और `रंडर` विधि के माध्यम से प्रदर्शित करने के लिए विचारों का एक पदानुक्रम देता है।

`रेंडर` विधि स्क्रीन पर जो आप देखना चाहते हैं उसका *विवरण* देता है। React वर्णन लेती है और परिणाम प्रदर्शित करती है। विशेष रूप से, रेंडर एक **React तत्व** देता है, जो कि प्रस्तुत करना क्या है का एक हल्का विवरण है। अधिकांश React डेवलपर्स "JSX" नामक एक विशेष वाक्यविन्यास का उपयोग करते हैं जो इन संरचनाओं को लिखना आसान बनाता है। `<div />` सिंटैक्स को बिल्ड समय में `React.createElement ('div')` में बदल दिया जाता है। उपरोक्त उदाहरण इसके बराबर है:

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

`ShoppingList` कौम्पोनॅन्ट ऊपर केवल अंतर्निहित डोम जैसे `<div />` और `<li />` को रेंडर करता है। लेकिन आप कस्टम React कौम्पोनॅन्ट्स को भी कम्पोज़ और रेंडर कर सकते हैं। उदाहरण के लिए, हम अब पूरी खरीदारी सूची को `<ShoppingList />` लिखकर संदर्भित कर सकते हैं। प्रत्येक React कौम्पोनॅन्ट संकुचित है और स्वतंत्र रूप से काम कर सकता है; यह आपको सरल घटकों से जटिल यूआई बनाने की अनुमति देता है।

## स्टार्टर कोड का निरीक्षण {#inspecting-the-starter-code}

यदि आप **अपने ब्राउज़र में** ट्यूटोरियल पर काम करने जा रहे हैं, इस कोड को एक नए टैब में खोलें: **[स्टार्टर कोड।](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. यदि आप **लोकली** रूप से ट्यूटोरियल पर काम करने जा रहे हैं, तो अपने प्रोजेक्ट फ़ोल्डर में `src/index.js` खोलें ([सेटअप](#setup-option-2-local-development-environment) के दौरान आप इस फ़ाइल को पहले ही छू चुके हैं)।

यह स्टार्टर कोड हम जो निर्माण कर रहे हैं उसका आधार है। हमने CSS स्टाइलिंग प्रदान की है ताकि आपको केवल React सीखने और 
टिक-टैक-टो गेम की प्रोग्रामिंग पर ध्यान देने की आवश्यकता हो।

कोड का निरीक्षण करके, आप देखेंगे कि हमारे पास तीन React कौम्पोनॅन्ट हैं:

* Square
* Board
* Game

Square कौम्पोनॅन्ट एक एकल `<button>` और Board को 9 वर्गों रेंडर करता है। Game कौम्पोनॅन्ट प्लेसहोल्डर मानों के साथ एक बोर्ड रेंडर करता है जिसे हम बाद में संशोधित करेंगे। वर्तमान में कोई इंटरैक्टिव कौम्पोनॅन्ट नहीं हैं।

### Props के माध्यम से डेटा पास करना {#passing-data-through-props}

बस अपने पैरों को गीला करने के लिए, आइए हमारे Board कौम्पोनॅन्ट से हमारे Square कौम्पोनॅन्ट के कुछ डेटा को पास करने का प्रयास करें।

Board के `renderSquare` मेथड में, Square में `value` नामक एक props पास करने के लिए कोड को बदलें:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
```

`{/ * TODO * /}` को `{this.props.value}` से बदलकर उस वेलयु को दिखाने के लिए Square का `रेंडर` तरीका बदलें:

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


बधाई हो! आपने अभि "एक props" पैरेंट Board कौम्पोनॅन्ट से एक चाइल्ड Square कौम्पोनॅन्ट को पास किया है। Props पासिंग यह है कि कैसे रिएक्ट एप्स में पैरेंट से लेकर चाइल्ड तक की जानकारी प्रवाहित होती है।

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

>सलाह
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

अगले चरण के रूप में, हम Square कौम्पोनॅन्ट को "याद रखना" चाहते हैं कि यह क्लिक हो गया, और इसे "x" चिह्न के साथ भरें। चीजों को "याद रखने" के लिए, कौम्पोनॅन्ट **राज्य** का उपयोग करते हैं।

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

>सलाह
>
>[जावास्क्रिप्ट क्लासेस](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) में, उप-वर्ग के निर्माणकर्ता को परिभाषित करते समय आपको हमेशा `super` कॉल करने की आवश्यकता होती है। सभी React कौम्पोनॅन्ट क्लासेस जिनके पास `कंस्ट्रक्टर` है, उन्हें `super(props)` कॉल से शुरू करना चाहिए।

Now we'll change the Square's `render` method to display the current state's value when clicked:

* Replace `this.props.value` with `this.state.value` inside the `<button>` tag.
* Replace the `() => alert()` event handler with `() => this.setState({value: 'X'})`.
* Put the `className` and `onClick` props on separate lines for better readability.

After these changes, the `<button>` tag that is returned by the Square's `render` method looks like this:

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

By calling `this.setState` from an `onClick` handler in the Square's `render` method, we tell React to re-render that Square whenever its `<button>` is clicked. After the update, the Square's `this.state.value` will be `'X'`, so we'll see the `X` on the game board. If you click on any Square, an `X` should show up.

When you call `setState` in a component, React automatically updates the child components inside of it too.

**[View the full code at this point](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Developer Tools {#developer-tools}

The React Devtools extension for [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) lets you inspect a React component tree with your browser's developer tools.

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

The React DevTools let you check the props and the state of your React components.

After installing React DevTools, you can right-click on any element on the page, click "Inspect" to open the developer tools, and the React tab will appear as the last tab to the right.

**However, note there are a few extra steps to get it working with CodePen:**

1. Log in or register and confirm your email (required to prevent spam).
2. Click the "Fork" button.
3. Click "Change View" and then choose "Debug mode".
4. In the new tab that opens, the devtools should now have a React tab.

## Completing the Game {#completing-the-game}

We now have the basic building blocks for our tic-tac-toe game. To have a complete game, we now need to alternate placing "X"s and "O"s on the board, and we need a way to determine a winner.

### Lifting State Up {#lifting-state-up}

Currently, each Square component maintains the game's state. To check for a winner, we'll maintain the value of each of the 9 squares in one location.

We may think that Board should just ask each Square for the Square's state. Although this approach is possible in React, we discourage it because the code becomes difficult to understand, susceptible to bugs, and hard to refactor. Instead, the best approach is to store the game's state in the parent Board component instead of in each Square. The Board component can tell each Square what to display by passing a prop, [just like we did when we passed a number to each Square](#passing-data-through-props).

**To collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their parent component instead. The parent component can pass the state back down to the children by using props; this keeps the child components in sync with each other and with the parent component.**

Lifting state into a parent component is common when React components are refactored -- let's take this opportunity to try it out. We'll add a constructor to the Board and set the Board's initial state to contain an array with 9 nulls. These 9 nulls correspond to the 9 squares:

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

When we fill the board in later, the board will look something like this:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

The Board's `renderSquare` method currently looks like this:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

In the beginning, we [passed the `value` prop down](#passing-data-through-props) from the Board to show numbers from 0 to 8 in every Square. In a different previous step, we replaced the numbers with an "X" mark [determined by Square's own state](#making-an-interactive-component). This is why Square currently ignores the `value` prop passed to it by the Board.

We will now use the prop passing mechanism again. We will modify the Board to instruct each individual Square about its current value (`'X'`, `'O'`, or `null`). We have already defined the `squares` array in the Board's constructor, and we will modify the Board's `renderSquare` method to read from it:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[View the full code at this point](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Each Square will now receive a `value` prop that will either be `'X'`, `'O'`, or `null` for empty squares.

Next, we need to change what happens when a Square is clicked. The Board component now maintains which squares are filled. We need to create a way for the Square to update the Board's state. Since state is considered to be private to a component that defines it, we cannot update the Board's state directly from Square.

To maintain the Board's state's privacy, we'll pass down a function from the Board to the Square. This function will get called when a Square is clicked. We'll change the `renderSquare` method in Board to:

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

>Note
>
>We split the returned element into multiple lines for readability, and added parentheses so that JavaScript doesn't insert a semicolon after `return` and break our code.

Now we're passing down two props from Board to Square: `value` and `onClick`. The `onClick` prop is a function that Square can call when clicked. We'll make the following changes to Square:

* Replace `this.state.value` with `this.props.value` in Square's `render` method
* Replace `this.setState()` with `this.props.onClick()` in Square's `render` method
* Delete the `constructor` from Square because Square no longer keeps track of the game's state

After these changes, the Square component looks like this:

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

When a Square is clicked, the `onClick` function provided by the Board is called. Here's a review of how this is achieved:

1. The `onClick` prop on the built-in DOM `<button>` component tells React to set up a click event listener.
2. When the button is clicked, React will call the `onClick` event handler that is defined in Square's `render()` method.
3. This event handler calls `this.props.onClick()`. The Square's `onClick` prop was specified by the Board.
4. Since the Board passed `onClick={() => this.handleClick(i)}` to Square, the Square calls `this.handleClick(i)` when clicked.
5. We have not defined the `handleClick()` method yet, so our code crashes.

>Note
>
>The DOM `<button>` element's `onClick` attribute has a special meaning to React because it is a built-in component. For custom components like Square, the naming is up to you. We could name the Square's `onClick` prop or Board's `handleClick` method differently. In React, however, it is a convention to use `on[Event]` names for props which represent events and `handle[Event]` for the methods which handle the events.

When we try to click a Square, we should get an error because we haven't defined `handleClick` yet. We'll now add `handleClick` to the Board class:

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

**[View the full code at this point](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

After these changes, we're again able to click on the Squares to fill them. However, now the state is stored in the Board component instead of the individual Square components. When the Board's state changes, the Square components re-render automatically. Keeping the state of all squares in the Board component will allow it to determine the winner in the future.

Since the Square components no longer maintain state, the Square components receive values from the Board component and inform the Board component when they're clicked. In React terms, the Square components are now **controlled components**. The Board has full control over them.

Note how in `handleClick`, we call `.slice()` to create a copy of the `squares` array to modify instead of modifying the existing array. We will explain why we create a copy of the `squares` array in the next section.

### Why Immutability Is Important {#why-immutability-is-important}

In the previous code example, we suggested that you use the `.slice()` operator to create a copy of the `squares` array to modify instead of modifying the existing array. We'll now discuss immutability and why immutability is important to learn.

There are generally two approaches to changing data. The first approach is to *mutate* the data by directly changing the data's values. The second approach is to replace the data with a new copy which has the desired changes.

#### Data Change with Mutation {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}
```

#### Data Change without Mutation {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2};
```

The end result is the same but by not mutating (or changing the underlying data) directly, we gain several benefits described below.

#### Complex Features Become Simple {#complex-features-become-simple}

Immutability makes complex features much easier to implement. Later in this tutorial, we will implement a "time travel" feature that allows us to review the tic-tac-toe game's history and "jump back" to previous moves. This functionality isn't specific to games -- an ability to undo and redo certain actions is a common requirement in applications. Avoiding direct data mutation lets us keep previous versions of the game's history intact, and reuse them later.

#### Detecting Changes {#detecting-changes}

Detecting changes in mutable objects is difficult because they are modified directly. This detection requires the mutable object to be compared to previous copies of itself and the entire object tree to be traversed.

Detecting changes in immutable objects is considerably easier. If the immutable object that is being referenced is different than the previous one, then the object has changed.

#### Determining When to Re-render in React {#determining-when-to-re-render-in-react}

The main benefit of immutability is that it helps you build _pure components_ in React. Immutable data can easily determine if changes have been made which helps to determine when a component requires re-rendering.

You can learn more about `shouldComponentUpdate()` and how you can build *pure components* by reading [Optimizing Performance](/docs/optimizing-performance.html#examples).

### Function Components {#function-components}

We'll now change the Square to be a **function component**.

In React, **function components** are a simpler way to write components that only contain a `render` method and don't have their own state. Instead of defining a class which extends `React.Component`, we can write a function that takes `props` as input and returns what should be rendered. Function components are less tedious to write than classes, and many components can be expressed this way.

Replace the Square class with this function:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

We have changed `this.props` to `props` both times it appears.

**[View the full code at this point](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Note
>
>When we modified the Square to be a function component, we also changed `onClick={() => this.props.onClick()}` to a shorter `onClick={props.onClick}` (note the lack of parentheses on *both* sides). In a class, we used an arrow function to access the correct `this` value, but in a function component we don't need to worry about `this`.

### Taking Turns {#taking-turns}

We now need to fix an obvious defect in our tic-tac-toe game: the "O"s cannot be marked on the board.

We'll set the first move to be "X" by default. We can set this default by modifying the initial state in our Board constructor:

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

Each time a player moves, `xIsNext` (a boolean) will be flipped to determine which player goes next and the game's state will be saved. We'll update the Board's `handleClick` function to flip the value of `xIsNext`:

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

With this change, "X"s and "O"s can take turns. Let's also change the "status" text in Board's `render` so that it displays which player has the next turn:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // the rest has not changed
```

After applying these changes, you should have this Board component:

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

**[View the full code at this point](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### Declaring a Winner {#declaring-a-winner}

Now that we show which player's turn is next, we should also show when the game is won and there are no more turns to make. We can determine a winner by adding this helper function to the end of the file:

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

We will call `calculateWinner(squares)` in the Board's `render` function to check if a player has won. If a player has won, we can display text such as "Winner: X" or "Winner: O". We'll replace the `status` declaration in Board's `render` function with this code:

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
      // the rest has not changed
```

We can now change the Board's `handleClick` function to return early by ignoring a click if someone has won the game or if a Square is already filled:

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

**[View the full code at this point](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

Congratulations! You now have a working tic-tac-toe game. And you've just learned the basics of React too. So *you're* probably the real winner here.

## Adding Time Travel {#adding-time-travel}

As a final exercise, let's make it possible to "go back in time" to the previous moves in the game.

### Storing a History of Moves {#storing-a-history-of-moves}

If we mutated the `squares` array, implementing time travel would be very difficult.

However, we used `slice()` to create a new copy of the `squares` array after every move, and [treated it as immutable](#why-immutability-is-important). This will allow us to store every past version of the `squares` array, and navigate between the turns that have already happened.

We'll store the past `squares` arrays in another array called `history`. The `history` array represents all board states, from the first to the last move, and has a shape like this:

```javascript
history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
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

Now we need to decide which component should own the `history` state.

### Lifting State Up, Again {#lifting-state-up-again}

We'll want the top-level Game component to display a list of past moves. It will need access to the `history` to do that, so we will place the `history` state in the top-level Game component.

Placing the `history` state into the Game component lets us remove the `squares` state from its child Board component. Just like we ["lifted state up"](#lifting-state-up) from the Square component into the Board component, we are now lifting it up from the Board into the top-level Game component. This gives the Game component full control over the Board's data, and lets it instruct the Board to render previous turns from the `history`.

First, we'll set up the initial state for the Game component within its constructor:

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

Next, we'll have the Board component receive `squares` and `onClick` props from the Game component. Since we now have a single click handler in Board for many Squares, we'll need to pass the location of each Square into the `onClick` handler to indicate which Square was clicked. Here are the required steps to transform the Board component:

* Delete the `constructor` in Board.
* Replace `this.state.squares[i]` with `this.props.squares[i]` in Board's `renderSquare`.
* Replace `this.handleClick(i)` with `this.props.onClick(i)` in Board's `renderSquare`.

The Board component now looks like this:

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

We'll update the Game component's `render` function to use the most recent history entry to determine and display the game's status:

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

Since the Game component is now rendering the game's status, we can remove the corresponding code from the Board's `render` method. After refactoring, the Board's `render` function looks like this:

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

Finally, we need to move the `handleClick` method from the Board component to the Game component. We also need to modify `handleClick` because the Game component's state is structured differently. Within the Game's `handleClick` method, we concatenate new history entries onto `history`.

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

>Note
>
>Unlike the array `push()` method you might be more familiar with, the `concat()` method doesn't mutate the original array, so we prefer it.

At this point, the Board component only needs the `renderSquare` and `render` methods. The game's state and the `handleClick` method should be in the Game component.

**[View the full code at this point](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Showing the Past Moves {#showing-the-past-moves}

Since we are recording the tic-tac-toe game's history, we can now display it to the player as a list of past moves.

We learned earlier that React elements are first-class JavaScript objects; we can pass them around in our applications. To render multiple items in React, we can use an array of React elements.

In JavaScript, arrays have a [`map()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) that is commonly used for mapping data to other data, for example:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
``` 

Using the `map` method, we can map our history of moves to React elements representing buttons on the screen, and display a list of buttons to "jump" to past moves.

Let's `map` over the `history` in the Game's `render` method:

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

**[View the full code at this point](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

For each move in the tic-tac-toes's game's history, we create a list item `<li>` which contains a button `<button>`. The button has a `onClick` handler which calls a method called `this.jumpTo()`. We haven't implemented the `jumpTo()` method yet. For now, we should see a list of the moves that have occurred in the game and a warning in the developer tools console that says:

>  Warning:
>  Each child in an array or iterator should have a unique "key" prop. Check the render method of "Game".

Let's discuss what the above warning means.

### Picking a Key {#picking-a-key}

When we render a list, React stores some information about each rendered list item. When we update a list, React needs to determine what has changed. We could have added, removed, re-arranged, or updated the list's items.

Imagine transitioning from

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

In addition to the updated counts, a human reading this would probably say that we swapped Alexa and Ben's ordering and inserted Claudia between Alexa and Ben. However, React is a computer program and does not know what we intended. Because React cannot know our intentions, we need to specify a *key* property for each list item to differentiate each list item from its siblings. One option would be to use the strings `alexa`, `ben`, `claudia`. If we were displaying data from a database, Alexa, Ben, and Claudia's database IDs could be used as keys.

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

When a list is re-rendered, React takes each list item's key and searches the previous list's items for a matching key. If the current list has a key that didn't exist before, React creates a component. If the current list is missing a key that existed in the previous list, React destroys the previous component. If two keys match, the corresponding component is moved. Keys tell React about the identity of each component which allows React to maintain state between re-renders. If a component's key changes, the component will be destroyed and re-created with a new state.

`key` is a special and reserved property in React (along with `ref`, a more advanced feature). When an element is created, React extracts the `key` property and stores the key directly on the returned element. Even though `key` may look like it belongs in `props`, `key` cannot be referenced using `this.props.key`. React automatically uses `key` to decide which components to update. A component cannot inquire about its `key`.

**It's strongly recommended that you assign proper keys whenever you build dynamic lists.** If you don't have an appropriate key, you may want to consider restructuring your data so that you do.

If no key is specified, React will present a warning and use the array index as a key by default. Using the array index as a key is problematic when trying to re-order a list's items or inserting/removing list items. Explicitly passing `key={i}` silences the warning but has the same problems as array indices and is not recommended in most cases.

Keys do not need to be globally unique; they only need to be unique between components and their siblings.


### Implementing Time Travel {#implementing-time-travel}

In the tic-tac-toe game's history, each past move has a unique ID associated with it: it's the sequential number of the move. The moves are never re-ordered, deleted, or inserted in the middle, so it's safe to use the move index as a key.

In the Game component's `render` method, we can add the key as `<li key={move}>` and React's warning about keys should disappear:

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

**[View the full code at this point](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Clicking any of the list item's buttons throws an error because the `jumpTo` method is undefined. Before we implement `jumpTo`, we'll add `stepNumber` to the Game component's state to indicate which step we're currently viewing.

First, add `stepNumber: 0` to the initial state in Game's `constructor`:

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

Next, we'll define the `jumpTo` method in Game to update that `stepNumber`. We also set `xIsNext` to true if the number that we're changing `stepNumber` to is even:

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

We will now make a few changes to the Game's `handleClick` method which fires when you click on a square.

The `stepNumber` state we've added reflects the move displayed to the user now. After we make a new move, we need to update `stepNumber` by adding `stepNumber: history.length` as part of the `this.setState` argument. This ensures we don't get stuck showing the same move after a new one has been made.

We will also replace reading `this.state.history` with `this.state.history.slice(0, this.state.stepNumber + 1)`. This ensures that if we "go back in time" and then make a new move from that point, we throw away all the "future" history that would now become incorrect.

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

Finally, we will modify the Game component's `render` method from always rendering the last move to rendering the currently selected move according to `stepNumber`:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // the rest has not changed
```

If we click on any step in the game's history, the tic-tac-toe board should immediately update to show what the board looked like after that step occurred.

**[View the full code at this point](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### Wrapping Up {#wrapping-up}

Congratulations! You've created a tic-tac-toe game that:

* Lets you play tic-tac-toe,
* Indicates when a player has won the game,
* Stores a game's history as a game progresses,
* Allows players to review a game's history and see previous versions of a game's board.

Nice work! We hope you now feel like you have a decent grasp on how React works.

Check out the final result here: **[Final Result](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game which are listed in order of increasing difficulty:

1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.

Throughout this tutorial, we touched on React concepts including elements, components, props, and state. For a more detailed explanation of each of these topics, check out [the rest of the documentation](/docs/hello-world.html). To learn more about defining components, check out the [`React.Component` API reference](/docs/react-component.html).
