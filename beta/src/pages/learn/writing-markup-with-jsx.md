---
title: JSX के साथ मार्कअप लिखना
---

<Intro>

*JSX* जावास्क्रिप्ट के लिए एक सिंटैक्स एक्सटेंशन है जो आपको जावास्क्रिप्ट फ़ाइल के अंदर HTML जैसा मार्कअप लिखने देता है। यद्यपि कौम्पोनॅन्ट्स को लिखने के अन्य तरीके हैं, अधिकांश React डेवलपर्स JSX की संक्षिप्तता को पसंद करते हैं, और अधिकांश कोडबेस इसका उपयोग करते हैं।

</Intro>

<YouWillLearn>

* React मार्कअप को रेंडरिंग लॉजिक के साथ क्यों मिलाता है
* JSX HTML से कैसे अलग है
* JSX के साथ जानकारी कैसे डिस्प्ले करें

</YouWillLearn>

## JSX: जावास्क्रिप्ट में मार्कअप डालना {/*jsx-putting-markup-into-javascript*/}

वेब को HTML, CSS और जावास्क्रिप्ट पर बनाया गया है। कई वर्षों तक, वेब डेवलपर्स ने HTML में कंटेंट, CSS में डिज़ाइन और जावास्क्रिप्ट में लॉजिक अक्सर अलग-अलग फाइलों में रखा! कंटेंट को HTML के अंदर चिह्नित किया गया था जबकि पेज का लॉजिक जावास्क्रिप्ट में अलग से रहता था:

<DiagramGroup>

<Diagram name="writing_jsx_html" height={237} width={325} alt="HTML markup with purple background and a div with two child tags: p and form. ">

HTML

</Diagram>

<Diagram name="writing_jsx_js" height={237} width={325} alt="Three JavaScript handlers with yellow background: onSubmit, onLogin, and onClick.">

JavaScript

</Diagram>

</DiagramGroup>

लेकिन जैसे-जैसे वेब अधिक इंटरैक्टिव होता गया, लॉजिक कंटेंट को अधिकाधिक निर्धारित करता गया। जावास्क्रिप्ट HTML का इन्चार्ज था! यही कारण है कि **React में, रेंडरिंग लॉजिक और मार्कअप एक ही स्थान पर एक साथ रहते हैं—कौम्पोनॅन्टस!**

<DiagramGroup>

<Diagram name="writing_jsx_sidebar" height={330} width={325} alt="React component with HTML and JavaScript from previous examples mixed. Function name is Sidebar which calls the function isLoggedIn, highlighted in yellow. Nested inside the function highlighted in purple is the p tag from before, and a Form tag referencing the component shown in the next diagram.">

`Sidebar.js` React component

</Diagram>

<Diagram name="writing_jsx_form" height={330} width={325} alt="React component with HTML and JavaScript from previous examples mixed. Function name is Form containing two handlers onClick and onSubmit highlighted in yellow. Following the handlers is HTML highlighted in purple. The HTML contains a form element with a nested input element, each with an onClick prop.">

`Form.js` React component

</Diagram>

</DiagramGroup>

एक बटन के रेंडरिंग लॉजिक और मार्कअप को एक साथ रखने से यह सुनिश्चित होता है कि वे प्रत्येक संपादन पर एक दूसरे के साथ तालमेल बिठाते रहें। इसके विपरीत, जो डिटेल्स असंबंधित हैं, जैसे कि बटन का मार्कअप और साइडबार का मार्कअप, एक दूसरे से अलग हो जाते हैं, जिससे उनमें से किसी एक को अपने आप बदलना सुरक्षित हो जाता है।

प्रत्येक React कौम्पोनॅन्ट एक जावास्क्रिप्ट फ़ंक्शन है जिसमें कुछ मार्कअप हो सकते हैं जो React ब्राउज़र में रेंडर करता है। React कौम्पोनॅन्ट मार्कअप को रिप्रेजेंट करने के लिए JSX नामक एक सिंटैक्स एक्सटेंशन का उपयोग करते हैं। JSX HTML की तरह दिखता है, लेकिन यह थोड़ा सख्त है और डायनामिक जानकारी डिस्प्ले कर सकता है। इसे समझने का सबसे अच्छा तरीका कुछ HTML मार्कअप को JSX मार्कअप में बदलना है।

<Note>

[JSX और React दो अलग चीजें हैं](/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) आप एक दूसरे से स्वतंत्र रूप से उपयोग कर सकते हैं।

</Note>

## HTML को JSX में बदलना {/*converting-html-to-jsx*/}

मान लीजिए कि आपके पास कुछ (पूरी तरह से वैलिड) HTML है:

```html
<h1>Hedy Lamarr's Todos</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
 >
<ul>
  <li>नई ट्रैफिक लाइट का आविष्कार करें
  <li>एक फिल्म के दृश्य का पूर्वाभ्यास करें
  <li>स्पेक्ट्रम तकनीक में सुधार
</ul>
```

और आप इसे अपने कौम्पोनॅन्ट में रखना चाहते हैं:

```js
export default function TodoList() {
  return (
    // ???
  )
}
```

यदि आप इसे वैसे ही कॉपी और पेस्ट करते हैं, तो यह काम नहीं करेगा:

<Sandpack>

```js
export default function TodoList() {
  return (
    // यह काम नहीं करता!
    <h1>Hedy Lamarr's Todos</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      class="photo"
    >
    <ul>
      <li>नई ट्रैफिक लाइट का आविष्कार करें
      <li>एक फिल्म के दृश्य का पूर्वाभ्यास करें
      <li>स्पेक्ट्रम तकनीक में सुधार
    </ul>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

ऐसा इसलिए है क्योंकि JSX सख्त है और इसमें HTML की तुलना में कुछ और नियम हैं! यदि आप ऊपर दिए गए एरर मैसेजेस को पढ़ते हैं, तो वे मार्कअप को ठीक करने के लिए आपका मार्गदर्शन करेंगे, या आप नीचे दी गई गाइड का फॉलो कर सकते हैं।

<Note>

अधिकांश समय, React के ऑन-स्क्रीन एरर मैसेजेस आपको यह पता लगाने में मदद करेंगे कि समस्या कहाँ है। अगर आप फंस गए हैं तो उन्हें पढ़ लें!
</Note>

## JSX के नियम {/*the-rules-of-jsx*/}

### 1. एक सिंगल रुट एलिमेंट रिटर्न करें {/*1-return-a-single-root-element*/}

एक कौम्पोनॅन्ट से कई एलिमेंट्स को रिटर्न करने के लिए, **उन्हें सिंगल पैरेंट टैग मैं ऐड करें**।

उदाहरण के लिए, आप एक `<div>` का उपयोग कर सकते हैं:

```js {1,11}
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```

यदि आप अपने मार्कअप में एक्स्ट्रा `<div>` ऐड नहीं करना चाहते हैं, तो आप इसके बजाय `<>` और `</>` लिख सकते हैं:

```js {1,11}
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

इस खाली टैग को *[React fragment](TODO)* कहा जाता है। React fragments आपको ब्राउज़र HTML ट्री में कोई निशान छोड़े बिना चीजों को ग्रुप करने देते हैं।

<DeepDive title="मल्टीप्ल JSX टैग को रैप की आवश्यकता क्यों है?">

JSX HTML की तरह दिखता है, लेकिन असल में प्लेन जावास्क्रिप्ट ऑब्जेक्ट्स में बदल दिया जाता है। आप किसी फ़ंक्शन से दो ऑब्जेक्ट्स को एक ऐरे में रैप किये बिना रिटर्न नहीं कर सकते। यह बताता है कि आप दो JSX टैग को दूसरे टैग या fragment में रैप किये बिना रिटर्न क्यों नहीं कर सकते।

</DeepDive>

### 2. सभी टैग बंद करें {/*2-close-all-the-tags*/}

JSX को टैग को स्पष्ट रूप से बंद करने की आवश्यकता है: `<img>` जैसे सेल्फ-क्लोजिंग टैग `<img />` बनने चाहिए, और `<li>संतरा` जैसे रैपिंग टैग को `<li>संतरा</li>` के रूप में लिखा जाना चाहिए।

इस प्रकार Hedy Lamarr की इमेज और लिस्ट आइटम बंद दिखते हैं:

```js {2-6,8-10}
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo" 
   />
  <ul>
    <li>नई ट्रैफिक लाइट का आविष्कार करें</li>
    <li>एक फिल्म के दृश्य का पूर्वाभ्यास करें</li>
    <li>स्पेक्ट्रम तकनीक में सुधार</li>
  </ul>
</>
```

### 3. camelCase करें <s>सब</s> ज़्यादातर चीज़ें! {/*3-camelcase-salls-most-of-the-things*/}

JSX जावास्क्रिप्ट में बदल जाता है और JSX में लिखी ऐट्रिब्यूट्स जावास्क्रिप्ट ऑब्जेक्ट्स की keys बन जाती हैं। अपने स्वयं के कौम्पोनॅन्ट्स में, आप अक्सर उन ऐट्रिब्यूट्स को वेरिएबल्स में पढ़ना चाहेंगे। लेकिन जावास्क्रिप्ट में वेरिएबल के नामों की सीमाएँ हैं। उदाहरण के लिए, उनके नामों में डैश नहीं हो सकते हैं या `class` जैसे रिज़र्व शब्द नहीं हो सकते हैं।

यही कारण है कि, React में, कई HTML और SVG ऐट्रिब्यूट्स camelCase में लिखी जाती हैं। उदाहरण के लिए, `stroke-width` के बजाय आप `strokeWidth` का उपयोग करते हैं। चूंकि `class` एक रिजर्व्ड शब्द है, इसलिए React में आप इसके बजाय `className` लिखते हैं, जिसका नाम [संबंधित DOM प्रॉपर्टी](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) के नाम पर रखा गया है।:

```js {4}
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo" 
/>
```

आप [इन सभी ऐट्रिब्यूट्स को React DOM एलिमेंट्स में पा सकते हैं](TODO). यदि आप एक गलत पाते हैं, तो चिंता न करें React संभावित सुधार के साथ एक संदेश [ब्राउज़र कंसोल](https://developer.mozilla.org/docs/Tools/Browser_Console) पर प्रिंट करेगी।

<Gotcha>

ऐतिहासिक कारणों से, [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) और [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) ऐट्रिब्यूट्स HTML में डैश के साथ लिखी जाती हैं।

</Gotcha>

### प्रो-टिप: JSX कन्वर्टर का उपयोग करें {/*pro-tip-use-a-jsx-converter*/}

इन सभी ऐट्रिब्यूट्स को मौजूदा मार्कअप में बदलना थकाऊ हो सकता है! हम रिकमेंड करते हैं कि आप अपने मौजूदा HTML और SVG का JSX में अनुवाद करने के लिए [कन्वर्टर](https://transform.tools/html-to-jsx) का उपयोग करें। कन्वर्टर्स व्यवहार में बहुत उपयोगी होते हैं, लेकिन यह अभी भी समझने योग्य है कि क्या हो रहा है ताकि आप आराम से JSX को स्वयं लिख सकें।

यहाँ आपका अंतिम परिणाम है:

<Sandpack>

```js
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>नई ट्रैफिक लाइट का आविष्कार करें</li>
        <li>एक फिल्म के दृश्य का पूर्वाभ्यास करें</li>
        <li>स्पेक्ट्रम तकनीक में सुधार</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px; }
```

</Sandpack>

<Recap>

अब आप जानते हैं कि JSX क्यों मौजूद है और इसे कौम्पोनॅन्ट्स में कैसे उपयोग किया जाए:

* React कौम्पोनॅन्ट समूह मार्कअप के साथ लॉजिक रेंडर करता है क्योंकि वे संबंधित हैं।
* JSX कुछ अंतरों के साथ HTML के समान है। जरूरत पड़ने पर आप [कन्वर्टर](https://transform.tools/html-to-jsx) का उपयोग कर सकते हैं।
* एरर मैसेजेस अक्सर आपको अपना मार्कअप ठीक करने की सही दिशा में इंगित करेंगे।

</Recap>

<Challenges>

### कुछ HTML को JSX में बदलें {/*convert-some-html-to-jsx*/}

यह HTML एक कौम्पोनॅन्ट में पेस्ट गया था, लेकिन यह JSX वैलिड नहीं है। इसे ठीक करें:

<Sandpack>

```js
export default function Bio() {
  return (
    <div class="intro">
      <h1>मेरी वेबसाइट पर स्वागत है!</h1>
    </div>
    <p class="summary">
      आप यहां मेरे विचार पा सकते हैं।
      <br><br>
      <b>और <i>तस्वीरें</b></i> वैज्ञानिकों की!
    </p>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

इसे हाथ से करना है या कनवर्टर का उपयोग करना आप पर निर्भर है!

<Solution>

<Sandpack>

```js
export default function Bio() {
  return (
    <div>
      <div className="intro">
         <h1>मेरी वेबसाइट पर स्वागत है!</h1>
      </div>
      <p className="summary">
       आप यहां मेरे विचार पा सकते हैं।
        <br /><br />
        <b>और <i>तस्वीरें</i></b> वैज्ञानिकों की!
      </p>
    </div>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

</Solution>

</Challenges>
