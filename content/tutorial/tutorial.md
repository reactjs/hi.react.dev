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

इस ट्यूटोरियल से मूल्य प्राप्त करने के लिए आपको एक बार में सभी स्क्वायरस को पूरा करने की आवश्यकता नहीं है।
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

अब जब आपका सेटअप हो गया है, आइए हम React का ओवरव्यू लेते हैं!

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

हमें जल्दी ही अजीब XML जैसे टैग्स मिलेंगे. हम स्क्रीन पर जो देखना चाहते हैं उसे React को बताने के लिए हम कौम्पोनॅन्ट्स का उपयोग करते हैं। जब हमारा डेटा बदलता है, तो React कुशलतापूर्वक हमारे कौम्पोनॅन्ट्स को अपडेट और प्रस्तुत करेगा।

यहाँ, ShoppingList एक **React कौम्पोनॅन्ट क्लास** या **React कौम्पोनॅन्ट टाइप** है। एक कौम्पोनॅन्ट पैरामीटर्स लेता है, जिसे `props` ("properties" के लिए छोटा) कहा जाता है, और `render` मेथड के माध्यम से प्रदर्शित करने के लिए व्यूज की हायरार्की देता है।

`render` मेथड स्क्रीन पर जो आप देखना चाहते हैं उसका *वर्णन* देती है। React वर्णन लेती है और परिणाम प्रदर्शित करती है। विशेष रूप से, रेंडर एक **React एलिमेंट** पास करता है, जो की क्या रेंडर करना है उसका सामान्य विवरण है। अधिकांश React डेवलपर्स "JSX" नामक एक विशेष सिंटेक्स का उपयोग करते हैं जो इन इस्ट्रक्टर्स को लिखना आसान बनाता है। `<div />` सिंटैक्स को बिल्ड समय में `React.createElement ('div')` में बदल दिया जाता है। ऊपर दिया गया उदाहरण इसके बराबर है:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 चिल्ड्रन ... */),
  React.createElement('ul', /* ... ul चिल्ड्रन ... */)
);
```

[पूर्ण विस्तारित संस्करण देखें।](babel://tutorial-expanded-version)

यदि आप उत्सुक हैं, तो [API संदर्भ](/docs/react-api.html#createelement) में `createElement()` को अधिक वर्णन के साथ बताया गया है, लेकिन हम इस ट्यूटोरियल में इसका उपयोग नहीं करेंगे। इसके बजाय, हम JSX का उपयोग करते रहेंगे।

JSX जावास्क्रिप्ट की पूरी शक्ति के साथ आता है। आप JSX के अंदर ब्रेसिज़ के भीतर *कोई* जावास्क्रिप्ट एक्सप्रेशन रख सकते हैं। प्रत्येक React एलिमेंट एक जावास्क्रिप्ट ऑब्जेक्ट है जिसे आप एक वैरिएबल् में स्टोर कर सकते हैं या अपने प्रोग्राम में कहीं भी पास कर सकते हैं।

`ShoppingList` कौम्पोनॅन्ट ऊपर केवल बिल्ट-इन DOM जैसे `<div />` और `<li />` को रेंडर करता है। लेकिन आप कस्टम React कौम्पोनॅन्ट्स को भी कम्पोज़ और रेंडर कर सकते हैं। उदाहरण के लिए, हम अब पूरी खरीदारी सूची को `<ShoppingList />` लिखकर संदर्भित कर सकते हैं। प्रत्येक React कौम्पोनॅन्ट संकुचित है और स्वतंत्र रूप से काम कर सकता है; यह आपको सरल कौम्पोनॅन्टस से कॉम्प्लेक्स UI बनाने की अनुमति देता है।

<<<<<<< HEAD
## स्टार्टर कोड का निरीक्षण {#inspecting-the-starter-code}
=======
### Inspecting the Starter Code {#inspecting-the-starter-code}
>>>>>>> 82b8c9f2ab094eb7b0268029ab72fc99ffcadaf6

यदि आप **अपने ब्राउज़र में** ट्यूटोरियल पर काम करने जा रहे हैं, इस कोड को एक नए टैब में खोलें: **[स्टार्टर कोड।](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. यदि आप **लोकली** रूप से ट्यूटोरियल पर काम करने जा रहे हैं, तो अपने प्रोजेक्ट फ़ोल्डर में `src/index.js` खोलें ([सेटअप](#setup-option-2-local-development-environment) के दौरान आप इस फ़ाइल को पहले ही देख चुके हैं)।

यह स्टार्टर कोड हम जो निर्माण कर रहे हैं उसका आधार है। CSS स्टाइलिंग पपहले से ही प्रदान की हुई है ताकि आपको केवल React सीखने और 
टिक-टैक-टो गेम की प्रोग्रामिंग पर ध्यान देने की आवश्यकता हो।

कोड का निरीक्षण करने पर, आप देखेंगे कि हमारे पास तीन React कौम्पोनॅन्ट हैं:

* Square
* Board
* Game

Square कौम्पोनॅन्ट एक अकेले `<button>` और Board के 9 स्क्वायरस को रेंडर करता है। Game कौम्पोनॅन्ट प्लेसहोल्डर वैल्यूज़ के साथ एक Board रेंडर करता है जिसे हम बाद में संशोधित करेंगे। वर्तमान में इस कोड में कोई इंटरैक्टिव कौम्पोनॅन्ट नहीं हैं।

### Props के माध्यम से डेटा पास करना {#passing-data-through-props}

शुरुआत के लिए, आइए हम Board कौम्पोनॅन्ट से हमारे Square कौम्पोनॅन्ट को कुछ डेटा पास करने का प्रयास करते हैं।

हम दृढ़ता से सलाह देते हैं कि आप कोड हाथ से लिखें क्योंकि आप ट्यूटोरियल के माध्यम से सीख रहे हैं और कॉपी / पेस्ट का उपयोग न करना आप के लिए फायदेमंद रहेगा। यह आपकी मांसपेशियों की स्मृति और एक मजबूत समझ विकसित करने में मदद करेगा।

Board के `renderSquare` मेथड में, Square में `value` नामक एक props पास करने के लिए कोड को कुछ ऐसे बदलें:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
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

बादमे: आपको प्रदान किए गए आउटपुट में प्रत्येक स्क्वायर में एक संख्या दिखनी चाहिए।

![React Devtools](../images/tutorial/tictac-numbers.png)

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

बधाई हो! आपने अभी "एक props" पैरेंट Board कौम्पोनॅन्ट से एक चाइल्ड Square कौम्पोनॅन्ट को पास किया है। Props पासिंग से हमारा मतलब यह है कि, कैसे React एप्स में पैरेंट से लेकर चाइल्ड तक जानकारी कैसे जाती है।

### इंटरएक्टिव कौम्पोनॅन्ट बनाना {#making-an-interactive-component}

- अब हम Square कौम्पोनॅन्ट को क्लिक करने पर "X" से भरेंगे।
- सबसे पहले, Square कौम्पोनॅन्ट के `render()` फंक्शन से लौटाए गए button टैग को इसमें बदलें:

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

- यदि आप अभी Square पर क्लिक करते हैं, तो आपको आपके ब्राउज़र में एक अलर्ट दिखना चाहिए।

>ध्यान दें
>
>ज़्यादा टाइपिंग और [`this` के भ्रमित करने वाले व्यवहार](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) से बचने के लिए, हम यहां और आगे के हैंडलर के लिए [एरो फ़ंक्शन सिंटैक्स](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) का उपयोग करेंगे:
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
>ध्यान दें कि `onClick = {() => alert('click')}` के साथ, हम `onClick` props के रूप में *एक फ़ंक्शन* पास कर रहे हैं। यह केवल एक क्लिक के बाद फायर करता है। ऐसे `() =>` लिखना भूल जाना और ऐसे `onClick = {alert('click')}` लिखना एक सामान्य गलती है, और हर बार कौम्पोनॅन्ट के रेंडर करने पर यह अलर्ट दिखायेगा।

अगले चरण के रूप में, हम चाहते हैं की स्क्वैर कौम्पोनॅन्ट याद रखे की वह क्लिक हुआ था, और खुद को "X" मार्क से भर ले। चीजों को "याद रखने" के लिए, कौम्पोनॅन्ट **state** का उपयोग किया जाता है।

React कौम्पोनॅन्ट को अपने constructors में `this.state` सेट करके state रख सकता है। `this.state` को उसके React कौम्पोनॅन्ट में प्राइवेट माना जाता है। चलो `this.state` में Square के वर्तमान मूल्य को स्टोर करते हैं, और Square को क्लिक करने पर इसे बदलते हैं।

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
>[जावास्क्रिप्ट क्लासेस](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) में, सबक्लास के constructor को परिभाषित करते समय आपको हमेशा `super` कॉल करने की आवश्यकता होती है। सभी React कौम्पोनॅन्ट क्लासेस जिनके पास `constructor` है, उन्हें `super(props)` कॉल से शुरू करना चाहिए।

अब हम क्लिक करने पर वर्तमान state की वैल्यू प्रदर्शित करने के लिए Square के `render` मेथड को कुछ ऐसे बदलेंगे :

* `<button>` टैग में `this.state.value` को `this.props.value` से बदलें।
* `() = alert()` इवेंट हैंडलर को `() => this.setState ({value: 'X'})` से बदलें।
* बेहतर पठनीयता के लिए `className` और `onClick` को अलग-अलग लाइनों पर रखें।

इन परिवर्तनों के बाद, Square के `render` मेथड द्वारा लौटाया गया `<button>` टैग इस तरह दिखेगा:

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

Square के `render` मेथड में `onClick` हैंडलर से `this.setState` को कॉल करके, हम React को उस Sqaure को फिर से रेंडर करने के लिए कहते हैं जब भी उसके `<button>` पर क्लिक किया जाता है। अपडेट के बाद, Square का `this.state.value` `'X'` होगा, इसलिए हम गेम Board पर `X` देखेंगे। यदि आप किसी भी Square पर क्लिक करते हैं, तो एक `X` दिखाना चाहिए।

जब आप किसी कौम्पोनॅन्ट में `setState` को कॉल करते हैं, तो React स्वतः ही इसके अंदर के चाइल्ड कौम्पोनॅन्ट को भी अपडेट कर देता है।

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### डेवलपर टूल्स {#developer-tools}

[Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) और [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) के लिए React Devtools एक्सटेंशन आपको अपने ब्राउज़र के डेवलपर टूल्स के साथ एक React कौम्पोनॅन्ट ट्री का निरीक्षण करने देता है।

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

React DevTools आपको अपने React कौम्पोनॅन्ट के props और state की जाँच करने देता हैं।

React DevTools स्थापित करने के बाद, आप पृष्ठ पर किसी भी एलिमेंट पर राइट-क्लिक कर सकते हैं, डेवलपर टूल्स खोलने के लिए "Inspect" पर क्लिक करें, और React टैब ("⚛️ कौम्पोनॅन्टस" और "⚛️ प्रोफाईलर") दाईं ओर अंतिम टैब के रूप में दिखाई देगा। "⚛️ कौम्पोनॅन्टस" का इस्तेमाल कौम्पोनॅन्ट ट्री को इंस्पेक्ट करने लिए करें।

**हालाँकि, ध्यान दें कि CodePen के साथ काम करने के लिए कुछ अतिरिक्त चरण हैं:**

1. लॉग इन करें या रजिस्टर करें और अपने ईमेल की पुष्टि करें (स्पैम को रोकने के लिए आवश्यक)।
2. "Fork" बटन पर क्लिक करें।
3. "Change View" पर क्लिक करें और फिर "Debug Mode" चुनें।
4. खुलने वाले नए टैब में, devtools में अब एक React टैब होना चाहिए।

## खेल को पूरा करना {#completing-the-game}

अब हमारे पास टिक-टैक-टो गेम के लिए बुनियादी बिल्डिंग ब्लॉक हैं। एक पूरा गेम बनाने के लिए, अब हमें वैकल्पिक रूप से Board पर "X" और "O" को रखने की आवश्यकता है, और हमें विजेता को निर्धारित करने के लिए एक तरीका चाहिए।

### लिफ्टिंग state अप {#lifting-state-up}

वर्तमान में, प्रत्येक Square कौम्पोनॅन्ट खेल की स्थिति को बनाए रखता है। विजेता की जाँच करने के लिए, हम एक स्थान पर 9 स्क्वायरस में से प्रत्येक का मान बनाए रखेंगे।

हम सोच सकते हैं कि Board को Square के state के लिए प्रत्येक Square से पूछना चाहिए। हालांकि यह तरीका React में इस्तेमाल करना संभव है, हम इसे न इस्तेमाल करने की सलाह देते हैं क्योंकि कोड को समझना मुश्किल हो जाता है, और साथ ही कोड बग्स के लिए ग्रहणशील हो जाता है और रीफैक्टरिंग मुश्किल हो जाती है। इसके बजाय, सबसे अच्छा तरीका यह है कि Game के state को प्रत्येक Square के बजाय पैरेंट Board कौम्पोनॅन्ट में स्टोर किया जाए। Board कौम्पोनॅन्ट प्रत्येक Square को props पास करके बता सकता है की उसे क्या दिखाना है, [ठीक उसी तरह जैसे हमने हर Square को एक नंबर दिया था](#passing-data-through-props)।

**कई चिल्ड्रन से डेटा एकत्र करने के लिए, या दो चाइल्ड कौम्पोनॅन्ट को एक दूसरे के साथ संवाद करने के लिए, आपको इसके बजाय उनके पेरेंट कौम्पोनॅन्ट में शेयर्ड state को घोषित करने की आवश्यकता है। पेरेंट कौम्पोनॅन्ट props का उपयोग करके state को वापस चिल्ड्रन को दे सकते हैं; यह चाइल्ड कौम्पोनॅन्ट को एक दूसरे के साथ और पेरेंट कौम्पोनॅन्ट के साथ तालमेल में रखता है।**

React कौम्पोनॅन्ट रीफैक्टर होने पर state को पैरेंट कौम्पोनॅन्ट में रखना सामान्य है -- आइए इसको आजमाएं।

हम Board में एक constructor जोड़ेंगे और 9 null के साथ एक array रखने के लिए Board की प्रारंभिक state सेट करेंगे। ये 9 null 9 Square के अनुरूप हैं:

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
```

जब हम Board को बाद में भरेंगे, तो `this.state.squares` कुछ इस तरह दिखेगा:

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

शुरुआत में, हमने प्रत्येक Square में 0 से 8 तक संख्या दिखाने के लिए Board से [`value` prop को नीचे पास](#passing-data-through-props) किया था। एक अलग पिछले चरण में, हमने संख्याओं को एक "X" चिह्न के साथ बदल दिया था [Square के अपने state द्वारा निर्धारित है](#making-an-interactive-component)। यही कारण है कि वर्तमान स्तिथि में Square ने Board द्वारा इसके लिए दिए गए `value` prop को अनदेखा कर दिया है।

हम अब props पासिंग मैकेनिज्म का फिर से उपयोग करेंगे। हम प्रत्येक व्यक्तिगत Square को उसके वर्तमान वैल्यू के बारे में निर्देश देने के लिए Board को (`'X'`, `'O'`, or `null`) से संशोधित करेंगे। हमने पहले से ही Board के constructor में `squares` array को परिभाषित किया है, और हम इसे पढ़ने के लिए Board के `renderSquare` मेथड को संशोधित करेंगे:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

प्रत्येक स्क्वायर को अब एक `value` prop प्राप्त होगा जो खाली स्क्वायरस के लिए `'X'`, `'O'` या `null` होगा।

अगला, हमें यह बदलने की आवश्यकता है कि Square पर क्लिक करने पर क्या होता है। Board कौम्पोनॅन्ट अब यह जानकारी रखता है कि कौन से square भरे हुए हैं। हमें एक ऐसे तरीके की आवशयक्ता है जिसके द्वारा Square कौम्पोनॅन्ट Board कौम्पोनॅन्ट के state को अपडेट कर सके। चूंकि state को एक ऐसे कौम्पोनॅन्ट के लिए निजी माना जाता है जो इसे परिभाषित करता है, हम Board के state को सीधे Square से अपडेट नहीं कर सकते।

इसके बजाय, हम Board से Square के लिए एक फंक्शन पास करेंगे। जब Square पर क्लिक किया जाएगा तो यह फ़ंक्शन कॉल होगा। हम Board में `renderSquare` मेथड को कुछ ऐसे बदलेंगे:

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
>हमने पठनीयता के लिए दिए गए एलिमेंट को कई लाइनों में विभाजित किया है, और पैरेंथेसेस को जोड़ा है ताकि जावास्क्रिप्ट `return` के बाद सेमीकोलन न डालें और हमारे कोड को छोटे हिस्सों मैं बाँट दें।

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

1. बिल्ट-इन DOM के कौम्पोनॅन्ट का onClick prop React को क्लिक इवेंट लिंस्टेनेर सेट करने को कहता है।
2. जब बटन पर क्लिक किया जाता है, तो React `onClick` ईवेंट हैंडलर को कॉल करेगा जिसे Square के `render()` मेथड में परिभाषित किया गया है।
3. यह ईवेंट हैंडलर `this.props.onClick()` को कॉल करता है। Board द्वारा Square के `onClick` prop को निर्दिष्ट किया गया था।
4. चूँकि Board ने `onClick = {() => this.handleClick (i)}` को Square में दिया, Square ने क्लिक करने पर `this.handleClick(i)` को कॉल किया।
5. हमने अभी तक `handleClick()` मेथड को परिभाषित नहीं किया है, इसलिए हमारा कोड क्रैश हो गया है। यदि आप अभी एक स्क्वायर क्लिक करते हैं, तो आपको एक लाल एरर स्क्रीन दिखनी चाहिए, जिसमें ये एरर "this.handleClick is not a function"  दिखेगा।

>ध्यान दें
>
>DOM `<button>` एलिमेंट के `onClick` एट्रिब्यूट का React के लिए एक विशेष अर्थ है, क्यूंकि यह एक बिल्ट-इन कौम्पोनॅन्ट है। Sqaure जैसे कस्टम कौम्पोनॅन्ट के लिए आप कुछ भी नाम दे सकते हैं। हम Square के `onClick` prop या Board के `handleClick` मेथड को अलग-अलग नाम दे सकते हैं, और कोड पहले जैसा ही काम करेगा। हालांकि, React में, props के नाम जो इवेंट्स को दर्शाते है उनके लिए `on[Event]` और मेथड्स जो इवेंट्स हैंडल करते हैं उनके लिए `handle[Event]` का उपयोग करना कन्वेंशनल है।

जब हम एक Square पर क्लिक करने की कोशिश करते हैं, तो हमें एक एरर मिलना चाहिए क्योंकि हमने अभी तक `handleClick` को परिभाषित नहीं किया है। अब हम Board क्लास में `handleClick` को ऐड करेंगे  :

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

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

इन परिवर्तनों के बाद, हम पहले के जैसे Squares को क्लिक कर पा रहे हैं। हालाँकि, अब state को अलग-अलग Square कौम्पोनॅन्ट के बजाय Board कौम्पोनॅन्ट में संग्रहीत किया गया है। जब Board का state बदलता है, तो Square कौम्पोनॅन्ट स्वचालित रूप से फिर से render होता है। Board कौम्पोनॅन्ट में सभी स्क्वायरस की स्थिति को ध्यान में रखते हुए यह भविष्य में विजेता का निर्धारण करने की अनुमति देगा।

चूंकि Square कौम्पोनॅन्ट अब state को बनाए नहीं रखते हैं, Square कौम्पोनॅन्ट Board कौम्पोनॅन्ट से वैल्यू प्राप्त करते हैं और क्लिक किए जाने पर Board कौम्पोनॅन्ट को सूचित करते हैं। React के संदर्भ में, Sqaure कौम्पोनॅन्ट अब **controlled components** है। Board का उन पर पूरा नियंत्रण है।

ध्यान दें कि कैसे `handleClick` में, हम `.slice()` को कॉल करके `squares` array की कॉपी बनाते है और मौजूदा array का संसोधन करने के बनजाये इस नए array का संसोधन करते है।

### अचल स्थिति होना क्यों महत्वपूर्ण है {#why-immutability-is-important}

पिछले कोड उदाहरण में, हमने सुझाव दिया कि `.slice()` ऑपरेटर का इस्तेमाल करके `squares` array की कॉपी बनाये और मौजूदा array का संसोधन करने के बजाये नए array का संसोधन करें। अब हम अपरिवर्तनीयता पर चर्चा करेंगे और सीखने के लिए अपरिवर्तनशीलता क्यों महत्वपूर्ण है।

डेटा बदलने के लिए आम तौर पर दो दृष्टिकोण होते हैं। पहला तरीका डेटा के मूल्यों को सीधे बदलकर डेटा को *म्यूटेट* करना है। ददूसरा दृश्टिकोण डाटा को उसके नई कॉपी से बदलने का है जिसमें ज़रूरी परिवर्तन हैं।

#### म्यूटेशन के साथ डेटा बदलें {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// अब खिलाड़ी {score: 2, name: 'Jeff'}  ै 
```

#### म्यूटेशन के बिना डेटा बदलें {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// अब खिलाड़ी अपरिवर्तित है, लेकिन newPlayer {score: 2, name: 'Jeff'} है

// या यदि आप ऑब्जेक्ट स्प्रेड सिंटैक्स प्रस्ताव का उपयोग कर रहे हैं, तो आप लिख सकते हैं:
// var newPlayer = {...player, score: 2};
```

स्टेट सीधे मूतते न करके (या अंतर्निहित डेटा का परिवर्तन करे बिना) हमने सामान अंतिम परिणाम पाया, पर इससे हमें निचे वर्णित कई लाभ प्राप्त हुए

#### जटिल विशेषताएँ सरल बनें {#complex-features-become-simple}

अपरिवर्तनीयता जटिल फीचर्स को लागू करने में बहुत आसान बनाती है। इस ट्यूटोरियल में बाद में, हम एक "टाइम ट्रैवल" फीचर्स को लागू करेंगे, जो हमें टिक-टैक-टो गेम के इतिहास की समीक्षा करने और पिछली चालों के लिए "पीछे जाने" की अनुमति देगा। यह कार्यक्षमता खेलों के लिए विशिष्ट नहीं है -- एप्लीकेशन में कुछ कार्यों को पूर्ववत और फिर से करने की क्षमता एक सामान्य बात है। प्रत्यक्ष डेटा म्युटेशन से बचने से हम खेल के इतिहास के पिछले संस्करणों को बरकरार रख सकते हैं, और बाद में उनका पुन: उपयोग कर सकते हैं।

#### परिवर्तन का पता लगाना {#detecting-changes}

मयुटेबल वस्तुओं में परिवर्तन का पता लगाना मुश्किल है क्योंकि वे सीधे संशोधित होते हैं। इसको पता लगाने के लिए परिवर्तनशील वस्तु की आवश्यकता होती है जिसकी पिछली प्रतियों की तुलना की जाए और पूरे ऑब्जेक्ट ट्री को ट्रैवर्स किया जाए।

अपरिवर्तनीय वस्तुओं में परिवर्तनों का पता लगाना काफी आसान है। यदि संदर्भित की जा रही अपरिवर्तनीय ऑब्जेक्ट पहले से भिन्न है, तो वह ऑब्जेक्ट बदल गई है।

#### React में री-रेंडर कब करना है यह निर्धारित करना {#determining-when-to-re-render-in-react}

अपरिवर्तनीयता का मुख्य लाभ यह है कि यह आपको React में _pure components_ बनाने में मदद करता है। अपरिवर्तनीय डेटा आसानी से निर्धारित कर सकते हैं कि क्या परिवर्तन किए गए हैं जो यह निर्धारित करने में मदद करता है कि एक कौम्पोनॅन्ट को फिर से री-रेंडरिंग की आवश्यकता कब होगी।

[ऑप्टिमिज़िंग परफॉरमेंस](/docs/optimizing-performance.html#examples) पढ़ के आप `shouldComponentUpdate()` के बारे में और जानकारी प्राप्त कर सकते हैं और *pure कौम्पोनॅन्ट* बनाने के बारे में जान सकते हैं।

### फंक्शन कौम्पोनॅन्टस {#function-components}

अब हम स्क्वायर को **फंक्शन कौम्पोनॅन्टस** में बदलेंगे।

React में, **फंक्शन कौम्पोनॅन्टस** उन कौम्पोनॅन्ट को लिखने का एक सरल तरीका है जिनमें केवल एक `render` मेथड शामिल है और उनका अपना state नहीं है। हम एक फंक्शन लिख सकते है जो एक class को परिभाषित करने के बजाय `React.Component` को extend करेगा और यह कौम्पोनॅन्ट props इनपुट लेगा और जो render करना है वो रिटर्न करेगा। 
फ़ंक्शन कौम्पोनॅन्टस classes की तुलना में लिखना आसान है, और कई कौम्पोनॅन्टस को इस तरह से व्यक्त किया जा सकता है।

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

हमनें दोनों जगह this.props को props में बदल दिया है।

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>ध्यान दें
>
>जब हमने Square को फ़ंक्शन कौम्पोनॅन्ट होने के लिए संशोधित किया, तो हमने `onClick = {() => this.props.onClick ()}` को एक छोटे `onClick = {props.onClick}` में बदल दिया था(फंक्शन के *दोनों तरफ* पैरेंथेसेस ना होने पर ध्यान दें)।

### टेकिंग टर्न्स {#taking-turns}

अब हमें अपने टिक-टैक-टो गेम में एक ज़ाहिर कमी को ठीक करने की आवश्यकता है: Board पर "O" को चिह्नित नहीं किया जा सकता है।

हम "X" चलने को पहला मूव रखेंगे। हम initial state को Board constructor में बदलेंगे ताकि यह पहले मूव के लिए इस्तेमाल हो सके:

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

जब भी कोई खिलाड़ी आगे बढ़ता है, `xIsNext` (एक बूलियन) को यह निर्धारित करने के लिए फ़्लिप किया जाता है कि कौन सा खिलाड़ी आगे जाता है और यह चाल गेम का state सेव करती है। हम `xIsNext` का वैल्यू फ़्लिप करने के लिए Board के `handleClick` फ़ंक्शन को अपडेट करेंगे:

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

इस परिवर्तन से, "X" और "O" अपनी अपनी बारी ले सकते हैं। एक बार कोशिश करके देखिये!

चलो Board के `render` में "status" टेक्स्ट को भी बदलते हैं ताकि यह प्रदर्शित हो कि किस खिलाड़ी की अगली बारी है:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // इसके आगे कुछ बदला नहीं है
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

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### विजेता घोषित करना {#declaring-a-winner}

अब जब हम दिखाते हैं कि किस खिलाड़ी की बारी है, तो हमें यह भी दिखाना चाहिए कि खेल कब जीत लिया गया है और इसके आगे कोई चाल बाकि नहीं है। हम फ़ाइल के अंत में इस सहायक फ़ंक्शन को जोड़कर एक विजेता निर्धारित कर सकते हैं:

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

9 स्क्वायरस के एक array को देखते हुए, यह फ़ंक्शन एक विजेता की जाँच करेगा और उपयुक्त के रूप में `'X'`,`' O`, या `null` लौटाएगा।

हम Board के `render` फंक्शन में `calculateWinners(squares)` को यह जाँचने के लिए कहेंगे कि क्या कोई खिलाड़ी जीता है या नहीं। यदि कोई खिलाड़ी जीता है, तो हम "विजेता: X" या "विजेता: O" जैसे टेक्स्ट प्रदर्शित कर सकते हैं। हम इस कोड के साथ Board के `render` फ़ंक्शन में `status` घोषणा को बदल देंगे:

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
      // और इसके आगे कोई चाल बाकि नहीं है
```

यदि कोई गेम जीत चुका है या यदि कोई Square पहले से ही भरा है तो हम एक क्लिक को अनदेखा करके जल्दी लौटने के लिए Board के `handleClick` फ़ंक्शन को कुछ ऐसे बदलेंगे:

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

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

बधाई हो! अब आपके पास काम करने वाला का टिक-टैक-टो खेल है। और आपने अभी-अभी React के बेसिक्स भी सीखे हैं। तो *आप* यहां के असली विजेता हैं।

## टाइम ट्रेवल गेम में डालना {#adding-time-travel}

अंतिम अभ्यास के रूप में, चलिए "समय में पीछे जाना" खेल की पिछली चालों तक संभव बनाते है।

### मूव्स की हिस्ट्री स्टोर करना {#storing-a-history-of-moves}

यदि हम `Square` array को बदल देते हैं, तो टाइम ट्रेवल को लागू करना बहुत मुश्किल होगा।

हालाँकि, हमने हर चाल के बाद `squares` array की एक नई प्रति बनाने के लिए `slice()` का उपयोग किया, और [इसे अपरिवर्तनीय माना](#why-immutability-is-important)। यह हमें `squares` array के हर पिछले वर्शन को स्टोर करके रखने में मदद करेगा, और पिछली चालों के बीच नेविगेट करने देगा जो पहले ही हो चुके हैं।

हम `history` नामक एक और array में पिछले `squares` arrays को संग्रहीत करेंगे। `history` array पहली से अंतिम चाल तक सभी Board स्टेट्स का प्रतिनिधित्व करता है, और कुछ ऐसा दिखता है:

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

हम पिछले चालों की सूची प्रदर्शित करने के लिए टॉप-लेवल Game कौम्पोनॅन्ट का उपयोग करेंगे। यह करने के लिए `history` तक पहुंचने की आवश्यकता होगी, इसलिए हम शीर्ष स्तर के Game कौम्पोनॅन्ट में `history` state को जगह देंगे।

Game के कौम्पोनॅन्ट में `history` state को रखने से हम अपने चाइल्ड के Board कौम्पोनॅन्ट से `squares` state को हटा सकते हैं। जैसे हम Board कौम्पोनॅन्ट में ["लिफ़्टेड state अप"](#lifting-state-up) को Square कौम्पोनॅन्ट से हटाया था, वैसे ही अब हम इसे Board से टॉप-लेवल Game कौम्पोनॅन्ट में उठा रहे हैं। यह गेम Game कौम्पोनॅन्ट को Board के डेटा पर पूर्ण नियंत्रण प्रदान करता है, और इससे Board को `history` की पिछली चालों को प्रस्तुत करने का निर्देश मिलता है।

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

इसके बाद, हमारे पास Board कौम्पोनॅन्ट को Game कौम्पोनॅन्ट से `square` और `onClick` props मिलेगा। चूँकि अब हमारे पास Board में एक सिंगल क्लिक हैंडलर है जो कई Sqaures के लिए इस्तेमाल होगा, हमें यह दर्शाने के लिए प्रत्येक Sqaure के स्थान को `onClick` हैंडलर में भेजना होगा। Board कौम्पोनॅन्ट को बदलने के लिए यह आवश्यक कदम हैं:

* Board से `constructor` को हटा दें।
* Board के `renderSquare` में `this.state.squares[i]` को `this.props.squares[i]` से बदलें।
* Board के `renderSquare` में `this.props.onClick(i)` के साथ `this.handleClick(i)` को बदलें।

Board कौम्पोनॅन्ट अब कुछ इस तरह दिखता है:

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

गेम की स्थिति को निर्धारित और प्रदर्शित करने के लिए हम सबसे हाल की history का उपयोग करके Game कौम्पोनॅन्ट के `render` फ़ंक्शन को अपडेट करेंगे:

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

चूंकि Game कौम्पोनॅन्ट अब गेम के state को प्रदान कर रहा है, हम Board के `render` मेथड से संबंधित कोड को हटा सकते हैं। रिफैक्टरिंग के बाद, Board का `render` फ़ंक्शन इस तरह दिखेगा:

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

  अंत में, हमें Board कौम्पोनॅन्ट से Game कौम्पोनॅन्ट में `handleClick` मेथड को स्थानांतरित करने की आवश्यकता है। हमें `handleClick` को भी बदलने और अलग तरह से बनाने की आवश्यकता है क्योंकि गेम कौम्पोनॅन्ट की state अलग तरह से स्थापित की गई है। गेम के `handleClick` मेथड के अंदर हम नयी `history` को पहले की `history` के साथ जोड़ते हैं।

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
>Array के `push()` मेथड से आप अधिक परिचित हो सकते हैं, `concat()` मेथड मूल array को म्यूटेट नहीं करता है, इसलिए हम इसे पसंद करते हैं।

इस वक्त, Board कौम्पोनॅन्ट को केवल `renderSquare` और `render` मेथड की आवश्यकता है। Game कौम्पोनॅन्ट के state में गेम का state और `handleClick` मेथड होना चाहिए।

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### पिछली चाल दिखाना {#showing-the-past-moves}

चूंकि हम टिक-टैक-टो गेम की history को रिकॉर्ड कर रहे हैं, अब हम इसे पिछले चालों की सूची के रूप में खिलाड़ी को प्रदर्शित कर सकते हैं।

हमने पहले सीखा था कि React एलिमेंट्स प्रथम श्रेणी के जावास्क्रिप्ट ऑब्जेक्ट हैं; और हम उन्हें अपने ऍप्लिकेशन्स में पास कर सकते हैं। React में कई वस्तुओं को रेंडर करने के लिए, हम React एलिमेंट्स की एक array का उपयोग कर सकते हैं।

जावास्क्रिप्ट में, arrays का एक [`map()` मेथड](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) होता है जिसका आमतौर पर डेटा को अन्य डेटा मैप करने के लिए उपयोग किया जाता है, उदाहरण के लिए:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

`map` मेथड का उपयोग करके, हम चालों की हिस्ट्री को स्क्रीन पर बटन का प्रतिनिधित्व करने वाले React एलिमेंट्स में मैप कर सकते हैं, और पिछले चालों पर "जाने के लिए" बटन की एक सूची प्रदर्शित कर सकते हैं।

आइए खेल के `render` मेथड में `history` पर `map` का प्रयोग करें:

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

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

टिक-टैक्-टो के खेल के इतिहास में प्रत्येक चाल के लिए, हम एक सूची आइटम `<li>` बनाएँगे जिसमे एक बटन `<button>` होगा। बटन में एक  `onClick` हैंडलर होगा, जो कि `this.jumpTo()` नामक एक मेथड कॉल करेगा। हमने अभी तक `jumpTo()` मेथड नहीं बनाया है। अभी के लिए, हमें खेल में हुई सारी चालें दिखेगी और एक ऐसी चेतावनी डेवलपर कंसोल में दिखनी चाहिए:

>  चेतावनी:
>  एक array या iterator में प्रत्येक चाइल्ड के पास एक अद्वितीय "कुंजी" प्रोप होना चाहिए। "Game" के रेंडर मेथड की जाँच करें।

आइए चर्चा करें कि उपरोक्त चेतावनी का क्या मतलब है।

### एक key उठाना {#picking-a-key}

जब हम एक लिस्ट render करते हैं, React हर rendered लिस्ट आइटम की कुछ इनफार्मेशन स्टोर करता है। जब हम एक लिस्ट को अपडेट करते हैं, तो React को ये पता करना होता है की क्या अपडेट हुआ है। हमनें लिस्ट के आइटम्स को जोड़, हटा, re-arrange या अपडेट किया हो सकता है।

सोचिये अगर हम state इस तरह बदलते हैं की यह लिस्ट

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

इसमें बदल जाएगी

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

अपडेटेड काउंट्स के अलावा, यह पढ़ने वाला एक मानव शायद यह कहेगा कि हमने एलेक्सा और बेन के ऑर्डर को स्वैप किया और एलेक्सा और बेन के बीच क्लाउडिया को डाला। हालाँकि, React एक कंप्यूटर प्रोग्राम है और यह नहीं जानता कि हमारा क्या इरादा था। क्योंकि React हमारे इरादों को नहीं जान सकता की हम कोड से क्या करना चाहते हैं इसलिए हमें लिस्ट आइटम और उसके सिब्लिंग्स को अलग करने के लिए एक *key* प्रॉपर्टी हर लिस्ट आइटम पर लगाते हैं। एक विकल्प strings `alexa`,`ben`, `claudia` का उपयोग करना होगा। यदि हम एक डेटाबेस से डेटा प्रदर्शित कर रहे थे, तो Alexa, Ben और Claudia के डेटाबेस आईडी को keys के रूप में इस्तेमाल किया जा सकता है।

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

जब एक सूची को फिर से प्रस्तुत किया जाता है, तो React प्रत्येक सूची आइटम की key लेता है और मिलान सूची के लिए पिछली सूची के आइटम को खोजता है। यदि वर्तमान सूची में एक key है जो पहले मौजूद नहीं थी, तो React एक कौम्पोनॅन्ट बनाती है। यदि वर्तमान सूची में पिछली सूची में मौजूद एक key गायब है, तो React पिछले कौम्पोनॅन्ट को नष्ट कर देती है। यदि दो key मेल खाती हैं, तो संबंधित घटक स्थानांतरित हो जाता है। कीज़ React को प्रत्येक कौम्पोनॅन्ट की पहचान के बारे में बताती है जो React को पुन: रेंडरर्स के बीच स्थिति बनाए रखने की अनुमति देता है। यदि किसी कौम्पोनॅन्ट की key बदल जाती है, तो घटक नष्ट हो जाएगा और नए state के साथ फिर से बनाया जाएगा।

`key` React की एक विशेष और रिजर्व्ड property है (`ref` के साथ, जो की और भी एडवांस्ड फीचर है)। जब React में एक एलिमेंट बनता है, React `key` property को निकालता है और रिटर्न्ड एलिमेंट में सीधे स्टोर करता है। भले ही लगे की `key` props के साथ है, लेकिन `key` को `this.props.key` से रिफरेन्स नहीं कर सकते। React अपने आप `key` को इस्तेमाल करता है और तय करता है की कोनसा कौम्पोनॅन्ट अपडेट करना है। कौम्पोनॅन्ट अपनी `key` के बारे में जांच नहीं कर सकता।     

**यह दृढ़ता से अनुशंसा की जाती है कि जब भी आप डायनामिक सूचियों का निर्माण करते हैं तो आप उचित key जरूर प्रदान करे** यदि आपके पास एक उपयुक्त key नहीं है, तो आप डाटा को restructure करने का सोचें, ताकि key आपके पास रहे।

यदि कोई कुंजी निर्दिष्ट नहीं है, तो React एक चेतावनी पेश करेगा और डिफ़ॉल्ट रूप से array इंडेक्स को कुंजी के रूप में उपयोग करेगा। ऐरे इंडेक्स को `key` की तरह इस्तेमाल करना लिस्ट आइटम re-order या डालना / हटाना समस्यात्मक हो सकता है। स्पष्ट रूप से `key={i}` चेतावनी को शांत करता है लेकिन ऐरे इंडिसिस वाली ही समस्या रहती है और ज़्यादातर केसेस में ये रेकमेंडेड नहीं है।

key को विश्व स्तर पर अद्वितीय होने की आवश्यकता नहीं है; उन्हें केवल कौम्पोनॅन्ट और उनके सिब्लिंग्स के बीच अद्वितीय होना चाहिए।


### टाइम ट्रेवल लागू करना {#implementing-time-travel}

टिक-टैक-टो खेल के इतिहास में, प्रत्येक पिछले चाल में एक अद्वितीय आईडी जुड़ी होती है: यह चाल की क्रमिक संख्या होती है। सारी चालें कभी भी re-order, हटाइ या बीच में डाली नहीं जाती है, तो चाल के इंडेक्स को key की तरफ इस्तेमाल करना सुरक्षित है।

गेम कौम्पोनॅन्ट की `render` मेथड में, हम key को `<li key = {Move}>` के रूप में जोड़ सकते हैं और key के बारे में React की चेतावनी गायब होनी चाहिए:

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

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

किसी भी सूची आइटम के बटन पर क्लिक करने से त्रुटि हो जाती है क्योंकि `jumpTo` मेथड अपरिभाषित है। इससे पहले कि हम `jumpTo` को लागू करते हैं, हम अभी कोनसे स्टेप पर है, ये दिखाने के लिए हम Game कॉम्पोनेन्ट के स्टेट में `stepNumber` डालेंगे।

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

अब, हम `stepNumber` को अपडेट करने के लिए Game में `jumpTo` मेथड लिखेंगे। यदि हम जिस नंबर को बदल रहे हैं, तो हम `xIsNext` को भी सही सेट करते हैं, यहाँ तक कि `stepNumber` को भी:

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

हम Game के `handleClick` मेथड में कुछ बदलाव करेंगें जो स्क्वायर पर क्लिक करने से execute होता है।

हमारे द्वारा जोड़ा गया `stepNumber` state अब उपयोगकर्ता को प्रदर्शित की गई चाल को दर्शाता है। एक नई चाल चलने के बाद, हमें `stepNumber: history.length` को `this.setState` के आर्गुमेंट में ऐड करके `stepNumber` को  अपडेट करना है। यह सुनिश्चित करता है कि हम एक नए कदम के बाद फिर से वही चाल दिखाने में फंस न जाएं।

हम हिस्ट्री `this.state.history` से रीड करने को `this.state.history.slice(0, this.state.stepNumber + 1)` से रीड करने में बदल देंगे। इससे ये पक्का हो जाएगा की अगर हम "गेम में पीछे" जाके एक नयी चाल चलते हैं तो "बाद" की चली हुई सारी चालें हिस्ट्री से हट जाएगी जोकि अब गलत हो गयी है।

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

    // इसके इलावा और कुछ नहीं बदला है
```

यदि हम गेम के history के किसी भी चरण पर क्लिक करते हैं, तो टिक-टैक-टो Board को तुरंत यह दिखाने के लिए अपडेट करना चाहिए कि Board उस चरण के बाद कैसा दिखता था।

**[अभी तक का पूरा कोड देखें](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### अंतिम स्टेप्स {#wrapping-up}

बधाई हो! आपने एक टिक-टैक-टो गेम बनाया है जो:

* जो आपको टिक-टैक-टो खेलने देता है 
* संकेत करता है जब कोई खिलाड़ी गेम जीतता है,
* खेल के प्रोग्रेस को गेम की हिस्ट्री में रखता है,
* प्लेयर्स को गेम के हिस्ट्री को रिव्यु करने और गेम के बोर्ड के पिछले वर्शनस को देखने की अनुमति देता है।


बहुत अच्छे! हमें उम्मीद है कि अब आप महसूस करेंगे कि आपके पास React कैसे काम करता है, इस पर एक सभ्य समझ है।

अंतिम परिणाम यहां देखें: **[अंतिम परिणाम](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

यदि आपके पास और समय बाकि है या आप अपने नए React स्किल्स का अभ्यास करना चाहते हैं, तो यहां सुधार के लिए कुछ विचार दिए गए हैं जो आप टिक-टैक-टो खेल में कर सकते हैं जो कि बढ़ती कठिनाई के क्रम में हैं:

1. हर चाल को चाल की हिस्ट्री सूचि में (col, row) फार्मेट में दिखाना।
2. चाल सूची में वर्तमान में चयनित आइटम को बोल्ड करना।
3. स्क्वायरस को हार्डकोड करने के बजाय दो लूप्स का उपयोग करने के लिए रीराइट बोर्ड का उपयोग करना।
4. एक टॉगल बटन डालना जो आपको सभी चालों को असेंडिंग या डिसेंडिंग आर्डर में करने देगा
5. जब कोई जीतता है, तो जीत का कारण बनने वाले तीन Square को उजागर करना।
6. जब कोई नहीं जीतता है, तो परिणाम ड्रा होने के बारे में एक संदेश प्रदर्शित करना।

इस ट्यूटोरियल के दौरान, हमने एलिमेंट्स, कौम्पोनॅन्ट, props और state सहित React कॉन्सेप्ट्स पर स्पर्श किया। इनमें से प्रत्येक विषय के अधिक विस्तृत विवरण के लिए, [बाकी दस्तावेज़](/docs/hello-world.html) देखें। डिफाइनिंग कौम्पोनॅन्ट के बारे में और जानने के लिए, [`React.Component` API](/docs/hello-world.html) देखें।
