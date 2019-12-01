---
id: forms
title: फॉर्म्स
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

React में HTML फॉर्म एलिमेंट्स दूसरे DOM एलिमेंट्स से कुछ अलग तरह से काम करते हैं, क्यूंकि फॉर्म एलिमेंट्स नैचुरली कुछ इंटरनल state रखते हैं। उदाहरण के तौर पर, यह फॉर्म सादे HTML में एक ही नाम स्वीकार करेगा:

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

ऊपर दिया गया फॉर्म अन्य HTML फॉर्म की तरह सबमिट करने पर नए पेज पर चला जाता है। यदि आप इस व्यवहार को React में चाहते हैं, तो यह काम करता है। लेकिन ज्यादातर मामलों में, जावास्क्रिप्ट फ़ंक्शन का उपयोग करना सुविधाजनक होता है क्यूंकि वह फॉर्म को सब्मिट करने के साथ साथ, उसकी उस डाटा तक भी पहुँच होती है जो यूजर फॉर्म मैं भरता है। इसे प्राप्त करने का मानक तरीका "कंट्रोल्ड कौम्पोनॅन्ट" नामक एक तकनीक के साथ है।

## कंट्रोल्ड कौम्पोनॅन्टस {#controlled-components}

HTML में, फॉर्म के एलिमेंट्स जैसे की `<input>`, `<textarea>`, और `<select>` आमतौर पर अपनी state बनाये रखते हैं और यूजर के इनपुट पर अपडेट करते हैं। React में, म्यूटेबल state को आमतौर पर कौम्पोनॅन्टस की state प्रॉपर्टी में रखा जाता है, और सिर्फ तभी अपडेट होता है जब [`setState()`](/docs/react-component.html#setstate) किया जाता है।

हम इन दोनों को जोड़कर React state को "सत्य का एकमात्र स्रोत" मानेंगे। इससे फिर React कौम्पोनॅन्ट जो फॉर्म दिखायेगा वो यह भी कन्ट्रोल करेगा की उस फॉर्म में यूजर के इनपुट करने पर क्या होता है। इस तरह का इनपुट फॉर्म एलिमेंट जो React से कन्ट्रोल किया जाता है, उसे ही "कंट्रोल्ड कौम्पोनॅन्ट" कहते हैं।

उदाहरण के तौर पर, अगर हम चाहते हैं की पिछले उदाहरण में सबमिट किया गया नाम दिखाया जाये, तो हम फॉर्म को एक कंट्रोल्ड कौम्पोनॅन्ट की तरह लिख सकते हैं :

```javascript{4,10-12,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

क्यूंकि `value` एट्रिब्यूट हमारे फॉर्म एलिमेंट पर सेट हुई है, दिखने वाली वैल्यू हमेशा `this.state.value` होगी, जिससे की React state ही सत्य का स्रोत होगा। क्यूंकि `handleChange` हर keystroke पर React state को अपडेट करता है, दिखने वाली वैल्यू हमेशा वही होगी जो यूजर टाइप करता है।

कंट्रोल्ड कौम्पोनॅन्ट के होने से, हर state परिवर्तन पर एक एसोसिएटेड हैंडलर फंक्शन होगा। इससे यूजर इनपुट को बदलना या वैलिडेट करना बहुत सरल हो जायेगा। उदाहरण के तौर पर, अगर हम चाहते हैं की नाम uppercase में लिखा जाये, तो हम इस तरह से `handleChange` लिख सकते हैं:

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

## textarea टैग {#the-textarea-tag}

HTML में, एक `<textarea>` एलिमेंट, अपने टेक्स्ट को अपने चिल्ड्रन के जरिये परिभाषित करता है:

```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

React में, एक `<textarea>` एक `value` एट्रिब्यूट का उपयोग करता है। इस तरह से एक `<textarea>` को एक single-line इनपुट फॉर्म के जैसा लिखा जा सकता है:

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

ध्यान दीजिये की `this.state.value` को कंसट्रक्टर में इनिशियलाइज़ किया गया है, जिससे की टेक्स्ट एरिया में कुछ टेक्स्ट पहले से ही हो।

## सेलेक्ट टैग {#the-select-tag}

HTML में, `<select>` एक ड्राप-डाउन लिस्ट बनाता है। उदाहरण के तौर पर, यह HTML फ्लेवर्स की एक ड्राप-डाउन लिस्ट बनाती है:

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

ध्यान दीजिये की `selected` एट्रिब्यूट की वजह से Coconut ऑप्शन पहले से सेलेक्टेड है। React में, `selected` एट्रिब्यूट इस्तेमाल करने के बजाए, `value` एट्रिब्यूट का इस्तेमाल रुट `select` टैग पर किया जाता है। यह एक कंट्रोल्ड कौम्पोनॅन्ट में बहुत सुविधाजनक रहता है क्यूंकि हमे इसे सिर्फ एक जगह अपडेट करना होता है। उदाहरण के तौर पर:

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

सब मिलाकर, अर्थ यह है की `<input type="text">`, `<textarea>`, और `<select>` सब एक जैसे ही काम करते हैं - यह सब एक `value` एट्रिब्यूट एक्सेप्ट करते हैं जिसे आप एक कंट्रोल्ड कौम्पोनॅन्ट इम्प्लीमेंट करने के लिए इस्तेमाल कर सकते हैं।

> ध्यान दीजिये
>
> आप एक array को `value` एट्रिब्यूट में भेज सकते हैं, जिससे आप `select` टैग से बहुत ऑप्शंस का चयन कर सकते हैं:
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## फाइल इनपुट टैग {#the-file-input-tag}

HTML में, एक `<input type="file">` यूजर को चयन करने देता है, अपने डिवाइस की स्टोरेज से एक या अनेक file जिसे या तो सर्वर पर अपलोड किया जाता है या जावास्क्रिप्ट के [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) से मैनिपुलेट किया जाता है।

```html
<input type="file" />
```

क्यूंकि इसकी वैल्यू read-only होती है, यह React में एक **uncontrolled** कौम्पोनॅन्ट है। इसके बारे में विस्तार से दूसरे अनकंट्रोल्ड कौम्पोनॅन्टस के साथ [डॉक्यूमेंटेशन में बाद में](/docs/uncontrolled-components.html#the-file-input-tag) चर्चा की गई है।
## हैंडलिंग मल्टीप्ल इनपुट्स {#handling-multiple-inputs}

जब आपको मल्टीप्ल कंट्रोल्ड `input` एलिमेंट्स को हैंडल करने की जरुरत हो, तो आप हर `name` एलिमेंट पर एक एट्रिब्यूट ऐड कर सकते हैं और हैंडलर फंक्शन को चयन करने दें की `event.target.name` वैल्यू के लिए क्या करना है।

उदाहरण के तौर पर:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

ध्यान दीजिये की हमने दिए गए इनपुट नाम के लिए state key को अपडेट करने के लिए ES6 [कंप्यूटेड प्रॉपर्टी के नाम](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) के सिंटेक्स का उपयोग किया है।

```js{2}
this.setState({
  [name]: value
});
```

यह निचे दिए गए ES5 code के समान है:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

और क्यूंकि `setState()` अपने आप [एक आंशिक state को अभी के state में मिला देता है](/docs/state-and-lifecycle.html#state-updates-are-merged)], इसीलिए हमे इसे सिर्फ बदले हुए हिस्सों के लिए उपयोग करना होगा।

## कंट्रोल्ड इनपुट Null वैल्यू {#controlled-input-null-value}

एक [कंट्रोल्ड कौम्पोनॅन्ट](/docs/forms.html#controlled-components) पर वैल्यू प्रॉपर्टी लगा देने से हम यूजर को इनपुट बदलने से तब तक रोक सकते हैं जब तक हम ना चाहें। अगर हमने `value` प्रॉपर्टी दी है लेकिन फिर भी इनपुट को बदला जा सकता है, तो इसका मतलब यह है की हमने गलती से `value` को या तो `undefined` या `null` सेट कर दिया है।

निचे दिया गया कोड यही दर्शाता है। (इनपुट पहले लॉक रहता है लेकिन थोड़े डिले के बाद एडिटेब्ल हो जाता है।)

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## कंट्रोल्ड कौम्पोनॅन्टस के अल्टेरनेटिव्स {#alternatives-to-controlled-components}

कई बार कंट्रोल्ड कौम्पोनॅन्टस का उपयोग करना बहुत कठिन हो जाता है, क्यूंकि हमे डाटा के हर बदलाव के तरीके के लिए एक हैंडलर लिखना होता है और सभी इनपुट state को एक React कौम्पोनॅन्ट के जरिये एक साथ जोड़े रखना होता है। यह बहुत परेशानी भरा काम हो सकता है जब हमे एक पहले से लिखे गए कोडबेस को React में बदलना पड़े या किसी React एप्लीकेशन को एक non-React लाइब्रेरी के साथ इंटेग्रटे करना पड़े। ऐसी परिस्तिथियों में, आप [अनकंट्रोल्ड कौम्पोनॅन्टस](/docs/uncontrolled-components.html) को देखना चाहेंगे, जो की इनपुट फॉर्म्स इम्प्लीमेंट करने की एक दूसरी तकनीक है।

## फुल्ली-फ्लेजड सोल्यूशन्स {#fully-fledged-solutions}

अगर आप एक कम्पलीट सोल्युशन चाहते हैं जो प्रमाणित करे, विज़िट किए गए फ़ील्ड का ध्यान रखे और फॉर्म सबमिशन को हैंडल भी करे तो [Formik](https://jaredpalmer.com/formik) एक बेहद चर्चित चयन है। लेकिन, क्यूंकि ये उन्हीं आदर्शों पर बना हुआ है जिनपर कंट्रोल्ड कौम्पोनॅन्ट और मैनेजिंग state बने हैं - इसीलिए उन्हें सीखना भूले नहीं।