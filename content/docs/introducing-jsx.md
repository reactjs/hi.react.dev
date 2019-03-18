---
id: introducing-jsx
title: पेश है JSX
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

इस वेरिएबल घोषणा पर विचार करें::

```js
const element = <h1>नमस्ते दुनिया!</h1>;
```

यह अजीब टैग सिंटैक्स न तो एक स्ट्रिंग है और न ही HTML है।

इसे JSX कहा जाता है, और यह जावास्क्रिप्ट का सिंटैक्स एक्सटेंशन है। UI कैसा दिखना चाहिए, इसके लिए हम React के साथ इसका उपयोग करते हैं। JSX आपको एक टेम्पलेट भाषा की याद दिला सकता है, लेकिन यह जावास्क्रिप्ट की पूरी शक्ति के साथ आता है।

JSX React "एलिमेंट्स" का उत्पादन करता है। हम [अगले भाग](/docs/rendering-elements.html) में उन्हें DOM में रेंडर करने के बारे में देखेंगे।

### JSX क्यों? {#why-jsx}

React इस वास्तिविकता को स्वीकार करती है कि तर्क प्रदान करना स्वाभाविक रूप से अन्य UI तर्क के साथ जुड़ा है: कैसे इवेंट्स को नियंत्रित किया जाता है, समय के साथ state कैसे बदलता है, और प्रदर्शन के लिए डेटा कैसे तैयार किया जाता है।

बनावटी रूप से मार्कअप और लॉजिक को अलग-अलग फाइलों में रख कर *टेक्नोलॉजीज* को अलग करने के बजाय, React लूज़ली कपल्ड यूनिट्स से [*कंसर्नस* को अलग](https://en.wikipedia.org/wiki/Separation_of_concerns) करता है जिसे कंपोनेंट्स कहते है, जिसमें दोनों होते हैं। हम [आगे के भाग](/docs/components-and-props.html) में कौम्पोनॅन्ट पर वापस आएंगे, लेकिन अगर आप अभी तक JS में मार्कअप डालने में सहज नहीं हैं,  अन्यथा [यह टॉक](https://www.youtube.com/watch?v=x7cQ3mrcKaY) आपको समझाने मदद कर सकता है।

JSX का उपयोग करना React के लिए [आवशयक नहीं](/docs/react-without-jsx.html) है, लेकिन अधिकांश लोग इसे जावास्क्रिप्ट कोड के अंदर UI के साथ काम करते समय दृश्य सहायता के रूप में उपयोगी पाते हैं। यह React को अधिक उपयोगी एरर और चेतावनी संदेश दिखाने की भी अनुमति देता है।

इसको समझने के बाद, चलो सुरु करते हैं!

### JSX में एक्सप्रेशंस एम्बेड करना {#embedding-expressions-in-jsx}

नीचे दिए गए उदाहरण में, हम `name` नामक एक वेरिएबल की घोषणा करते हैं और फिर इसे कर्ली ब्रेसिज़ में लपेटकर JSX के अंदर उपयोग करते हैं:

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

आप JSX में कर्ली ब्रेसिज़ के अंदर कोई भी मान्य [जावास्क्रिप्ट एक्सप्रेशंस](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) डाल सकते हैं। उदाहरण के लिए, `2 + 2`, `user.firstName`, या `formatName(user)` सभी मान्य जावास्क्रिप्ट अभिव्यक्तियाँ हैं।

नीचे दिए गए उदाहरण में, हम एक जावास्क्रिप्ट फ़ंक्शन, `formatName(user)`, को `<h1>` एलिमेंट में कॉल करते हैं।

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://introducing-jsx)

हम पठनीयता के लिए JSX को कई लाइनों में विभाजित करते हैं। जबकि यह आवश्यक नहीं है, ऐसा करते समय, हम इसे [आटोमेटिक सेमीकोलन इंसर्शन](https://stackoverflow.com/q/2846283) के नुकसान से बचने के लिए इसे पैरेंथेसेस में लपेटने की भी सलाह देते हैं।

### JSX एक एक्सप्रेशन भी है {#jsx-is-an-expression-too}

कंपाइलेशन के बाद, JSX एक्सप्रेशंस नियमित जावास्क्रिप्ट फ़ंक्शन कॉल बन जाती हैं और जावास्क्रिप्ट ऑब्जेक्ट्स का मूल्यांकन करती हैं।

इसका मतलब है कि आप JSX का उपयोग `if` स्टेटमेंट्स और `फॉर` लूप्स के अंदर कर सकते हैं, इसे वेरिएबल्स को असाइन कर सकते हैं, इसे आर्ग्यूमेंट्स के रूप में स्वीकार कर सकते हैं, और फ़ंक्शंस से इसे वापस कर सकते हैं:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### JSX के साथ ऐट्रिब्यूट्स बनाना {#specifying-attributes-with-jsx}

आप स्ट्रिंग लिटेरल्स को ऐट्रिब्यूट्स के रूप में निर्दिष्ट करने के लिए कोट्स का उपयोग कर सकते हैं:

```js
const element = <div tabIndex="0"></div>;
```

आप एक ऐट्रिब्यूट् में जावास्क्रिप्ट एक्सप्रेशन को एम्बेड करने के लिए कर्ली ब्रेसिज़ का उपयोग भी कर सकते हैं:

```js
const element = <img src={user.avatarUrl}></img>;
```

किसी ऐट्रिब्यूट् में जावास्क्रिप्ट एक्सप्रेशन को एम्बेड करते समय कर्ली ब्रेसिज़ के आसपास कोट्स न डालें। आपको या तो कोट्स (स्ट्रिंग वैल्यूज़ के लिए) या कर्ली ब्रेसिज़ (एक्सप्रेशंस के लिए) का उपयोग करना चाहिए, लेकिन दोनों एक ही ऐट्रिब्यूट् में नहीं।

>**चेतावनी:**
>
>चूंकि JSX HTML की तुलना में जावास्क्रिप्ट के अधिक करीब है, इसलिए React DOM, HTML ऐट्रिब्यूट् नामों के बजाय `camelCase` प्रॉपर्टी नामकरण सम्मेलन का उपयोग करता है।
>
>उदाहरण के लिए, JSX में `class` बन जाता है [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className), और `tabindex` बन जाता है [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)।

### Specifying Children with JSX {#specifying-children-with-jsx}

If a tag is empty, you may close it immediately with `/>`, like XML:

```js
const element = <img src={user.avatarUrl} />;
```

JSX tags may contain children:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX Prevents Injection Attacks {#jsx-prevents-injection-attacks}

It is safe to embed user input in JSX:

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

By default, React DOM [escapes](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that's not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks.

### JSX Represents Objects {#jsx-represents-objects}

Babel compiles JSX down to `React.createElement()` calls.

These two examples are identical:

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` performs a few checks to help you write bug-free code but essentially it creates an object like this:

```js
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

These objects are called "React elements". You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

We will explore rendering React elements to the DOM in the next section.

>**Tip:**
>
>We recommend using the ["Babel" language definition](https://babeljs.io/docs/editors) for your editor of choice so that both ES6 and JSX code is properly highlighted. This website uses the [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/) color scheme which is compatible with it.
