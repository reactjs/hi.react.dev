---
id: lifting-state-up
title: लिफ्टिंग स्टेट अप
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

अक्सर, कई कौम्पोनॅन्टस को एक ही बदलते डेटा को प्रतिबिंबित करने की आवश्यकता होती है। हम उनके निकटतम सामान्य पैरेंट तक स्टेट को उठाने की सलाह देते हैं। आइए देखें कि यह कैसे कार्य करता है।

इस खंड में, हम एक तापमान कैलकुलेटर बनाएंगे जो गणना करता है कि पानी किसी दिए गए तापमान पर उबलता है या नहीं।

हम `BoilingVerdict` नामक एक कौम्पोनॅन्ट के साथ शुरुआत करेंगे। यह `celsius` तापमान को prop के रूप में स्वीकार करता है, और प्रिंट करता है यदि पानी उबलने वाला है:

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

इसके बाद, हम 'Calculator' नामक एक कौम्पोनॅन्ट बनाएंगे। यह एक `<input>` रेंडर करेगा, जिसमे आप तापमान दर्ज कर सकते हैं, जिसकी value `this.state.temperature` में रहेगी।

इसके अतिरिक्त, यह वर्तमान इनपुट मूल्य के लिए `BoilingVerdict` को रेंडर करेगा।

```js{5,9,13,17-21}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## एक दूसरा इनपुट जोड़ना {#adding-a-second-input}

हमारी नई आवश्यकता यह है कि, एक Celsius इनपुट के अलावा, हम एक Fahrenheit इनपुट प्रदान करें, और वे sync में रहें।

हम `Calculator` से एक `TemperatureInput` कौम्पोनॅन्ट को निकालने से शुरुआत कर सकते हैं। हम इसमें एक नया `scale` prop जोड़ेंगे, जो या तो `"c"` या `"f"` हो सकता है:

```js{1-4,19,22}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

अब हम `Calculator` को दो अलग-अलग तापमान इनपुट्स दिखाने के लिए बदल सकते हैं: 

```js{5,6}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

अभ हमारे पास दो इनपुट हैं, लेकिन जब आप उनमें से एक में तापमान दर्ज करते हैं, तो दूसरा अपडेट नहीं होता। यह हमारी आवश्यकता के विपरीत है: हम उन्हें sync में रखना चाहते हैं।

हम `Calculator` से `BoilingVerdict` भी प्रदर्शित नहीं कर सकते। `Calculator` वर्तमान तापमान को नहीं जानता है क्योंकि यह `TemperatureInput` के अंदर छिपा हुआ है।

## कन्वर्शन फंक्शन्स लिखना {#writing-conversion-functions}

सबसे पहले, हम दो फंक्शन्स लिखेंगे, Celsius से Fahrenheit और वापस Fahrenheit से Celsius में बदलने के लिए:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

यह दो फंक्शन्स संख्याओं को परिवर्तित करते हैं। हम एक और फ़ंक्शन लिखेंगे जो एक स्ट्रिंग `temperature` और एक कनवर्टर फ़ंक्शन को आर्गुमेंट के रूप में लेता है और एक स्ट्रिंग वापिस देता है। हम इसका उपयोग एक इनपुट के आधार पर दूसरे इनपुट की गणना करने के लिए करेंगे।

यह अमान्य `temperature` पर एक खाली स्ट्रिंग देता है, और यह आउटपुट को तीसरे दशमलव स्थान तक सीमित रखता है:

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

उदाहरण के लिए, `tryConvert('abc', toCelsius)` एक खाली स्ट्रिंग लौटाता है, और `tryConvert('10.22', toFahrenheit)` `'50.396'` लौटाता है।

## लिफ्टिंग स्टेट अप {#lifting-state-up}

वर्तमान में, दोनों `TemperatureInput` कौम्पोनॅन्टस अपनी लोकल स्टेट को स्वतंत्र रूप में बनाये रखते हैं:

```js{5,9,13}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```

हालाँकि, हम चाहते हैं कि ये दोनों इनपुट एक दूसरे के sync में रहें। जब हम Celsius इनपुट को अपडेट करें, तो Fahrenheit इनपुट अपडेट हो और इसके विपरीत भी रिफ्लेक्ट होना चाहिए।

React में, state साझा करने का कार्य उसे कौम्पोनॅन्टस के निकटतम सामान्य पूर्वज तक ले जाकर पूरा किया जाता है। यह "लिफ्टिंग स्टेट अप" कहलाता है। हम लोकल स्टेट को `TemperatureInput` से हटा देंगे एवं  `Calculator` में ले जायेंगे।

यदि साझा स्टेट का मालिक `Calculator` हे, तो वह दोनों इन्पुट्स में वर्तमान तापमान के लिए "सत्य का स्रोत" बन जाता है। यह उन दोनों को एक दूसरे के अनुरूप वैल्यूज रखने का निर्देश दे सकता है। चूंकि दोनों `TemperatureInput` कौम्पोनॅन्टस के props एक ही `Calculator` पैरेंट कौम्पोनॅन्ट से हैं, यह दोनों हमेशा sync में रहेंगे। 

आइए देखें कि यह स्टेप-बाय-स्टेप कैसे काम करता है।

सबसे पहले, हम `TemperatureInput` कौम्पोनॅन्ट में `this.state.temperature` को `this.props.temperature` से बदल देंगे। अभी के लिए, मान लीजिये कि `this.props.temperature` पहले से ही मौजूद है, हालाँकि हमें भविष्य में इसे `Calculator` से पास करना होगा:

```js{3}
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

हम जानते हैं कि [props read-only हैं](/docs/components-and-props.html#props-are-read-only). जब `temperature` लोकल state में था, तो `TemperatureInput` इसे बदलने के लिए `this.setState()` को कॉल कर सकता था। हालाँकि, अब `temperature` अपने पैरेंट से prop बनकर आ रहा है, `TemperatureInput' का इस पर कोई नियंत्रण नहीं होगा।

React में, यह मसला आमतौर पर कौम्पोनॅन्ट को "controlled" बनाकर हल किया जाता है। जैसे DOM `<input>`, `value` एवं `onChange` prop दोनों को स्वीकार करता है, ठीक वैसे ही, `TemperatureInput` दोनों `temperature` एवं `onTemperatureChange` props को उसके पैरेंट `Calculator` से स्वीकार करेगा।

अब, जब `TemperatureInput` अपने तापमान को अपडेट करना चाहेगा, तो वह `this.props.onTemperatureChange` को कॉल करेगा:

```js{3}
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>ध्यान दें:
>
>कस्टम कौम्पोनॅन्टस में `temperature` या `onTemperatureChange` prop नामों का कोई विशेष अर्थ नहीं है। हम उन्हें और कुछ भी कह सकते थे, जैसे कि `value` और `onChange` जो एक आम परंपरा है।

पैरेंट `Calculator` कौम्पोनॅन्ट के द्वारा `onTemperatureChange` prop को `temperature` prop के साथ प्रदान किया जाएगा। वह अपने लोकल state में बदलाव के द्वारा इस परिवर्तन को नियंत्रित करेगा, और इस प्रकार दोनों इनपुट्स को नए मूल्यों के साथ फिर से प्रस्तुत करेगा। हम बहुत जल्द नए `Calculator` के इम्प्लीमेंटेशन को देखेंगे।

आईये `Calculator` में परिवर्तन करने से पहले, `TemperatureInput` कौम्पोनॅन्ट में किये गए परिवर्तनों को संक्षेप में दोहरातें हैं। हमने इसमें से लोकल state को हटा दिया है, और `this.state.temperature` रीड करने के बजाय, हम अब `this.props.temperature` रीड करते हैं। जब हम कोई बदलाव करना चाहते हैं तो `this.setState()` को कॉल करने के बजाय हम अब `this.props.onTemperatureChange()` को कॉल करते हैं, जो `Calculator` उपलब्ध कराता है।

```js{8,12}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

अब `Calculator` कौम्पोनॅन्ट की ओर मुड़ते हैं।

हम वर्तमान इनपुट के `temperature` और `scale` को उसके लोकल state में स्टोर करेंगे। यह वही state है जिसे हमने इनपुट्स से "ऊपर उठा लिया था", और यह उन दोनों के लिए "सत्य के स्रोत" के रूप में काम करेगी। यह उन सभी डेटा का न्यूनतम प्रतिनिधित्व है जिन्हें हमें जानना आवश्यक है, दोनों इनपुट को रेंडर करने के लिए|

उदाहरण के लिए, यदि हम Celsius इनपुट में 37 दर्ज करते हैं, तो `Calculator` कौम्पोनॅन्ट की state होगी:

```js
{
  temperature: '37',
  scale: 'c'
}
```

यदि हम बाद में Fahrenheit फ़ील्ड को 212 में संपादित करते हैं, तो `Calculator` की state होगी:

```js
{
  temperature: '212',
  scale: 'f'
}
```

हम दोनों इनपुट्स की वैल्यू स्टोर कर सकते थे लेकिन यह अनावश्यक है। सबसे हाल ही में बदले गये इनपुट की वैल्यू एवं उसका प्रतिनिधित्व करने वाले scale को ही स्टोर करना पर्याप्त है। तब हम वर्तमान `temperature` और `scale` के आधार पर अन्य इनपुट की वैल्यू को निकाल सकते हैं।

इनपुट्स sync में रहेंगे क्योंकि उनकी वैल्यूज की गणना एक ही state से हो रही है:

```js{6,10,14,18-21,27-28,31-32,34}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

[**इसे CodePen पर आज़माएँ**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

अब, कोई फर्क नहीं पड़ता कि आप किस इनपुट को संपादित करते हैं, `Calculator` के `this.state.temperature` और `this.state.scale` अपडेट हो जायेंगे। इनपुट्स में से एक को वैल्यू मिलती है, इसलिए कोई भी user input संरक्षित रहता है, और अन्य इनपुट वैल्यू हमेशा इसके आधार पर पुनर्गणना होता है।

आइये संक्षेप में देखते हैं की एक इनपुट को संपादित करने पर क्या होता है :

* React `onChange` के द्वारा निर्दिष्ट फंक्शन को DOM `<input>` पर कॉल करता है। हमारे लिए, यह `TemperatureInput` कौम्पोनॅन्ट का `handleChange` मेथड है।
* `TemperatureInput` कौम्पोनॅन्ट का `handleChange` मेथड, नए वांछित वैल्यू के साथ `this.props.onTemperChange()` को कॉल करता है। इसके props, जिनमें `onTemperatureChange` शामिल हैं, को इसके पैरेंट कौम्पोनॅन्ट `Calculator` द्वारा प्रदान किया जाता है।
* जब यह पूर्व में रेंडर किया गया था, तो `Calculator` ने निर्दिष्ट किया है कि Celsius `TemperatureInput` का `onTemperatureChange` ही `Calculator` का `handleCelsiusChange` मेथड है, इसी प्रकार Fahrenheit `TemperatureInput` का `onTemperatureChange` ही `Calculator` का `handleFahrenheitChange` मेथड है। इनपुट के सम्पादन के आधार इन दोनों `Calculator` मेथडस में से किसी एक को कॉल किया जाता है। 
* इन मेथडस के अंदर, `Calculator` कौम्पोनॅन्ट React से `this.setState()` को कॉल करके, नयी इनपुट वैल्यू एवं वर्तमान scale जिसको हमने बस अभी सम्पादित किया, के साथ फिर से रेंडर होने को कहता है।
* `Calculator` कौम्पोनॅन्ट के `render` मेथड को React कॉल करता है ताकि वह UI कैसा दिखता है यह जान सखे। दोनों इनपुट के वैल्यूज की वर्तमान तापमान और सक्रिय scale के आधार पर पुनर्गणना की जाती है। तापमान रूपांतरण यहां किया जाता है।
* React `Calculator` द्वारा निर्देशित नए props के साथ `TemperatureInput` कौम्पोनॅन्टस के `render` मेथडस को कॉल करता है।
* React DOM, boiling verdict के साथ DOM को अपडेट करता है और वांछित इनपुट वैल्यूज से मेल कराता है। जिस इनपुट को हमने अभी संपादित किया है, वह अपनी वर्तमान वैल्यू प्राप्त करता है, और अन्य इनपुट को रूपांतरण के बाद तापमान में अपडेट किया जाता है।

हर अपडेट समान स्टेप्स के माध्यम से जाता है ताकि इनपुट sync में रहें।

## सबक सीखा {#lessons-learned}

React एप्लीकेशन में परिवर्तन करने वाले किसी भी डेटा के लिए "सत्य का एक स्रोत" केवल एक होना चाहिए। आमतौर पर, state को पहले कौम्पोनॅन्ट में जोड़ा जाता है जो इसे रेंडर करने के लिए आवश्यक होता है। फिर, अगर अन्य कौम्पोनॅन्टस को भी इसकी आवश्यकता होती है, तो आप इसे अपने निकटतम सामान्य पूर्वज तक उठा सकते हैं।. अलग-अलग कौम्पोनॅन्टस के बीच state को sync करने की कोशिश करने के बजाय, आपको इस पर भरोसा करना चाहिए [ऊपर से नीचे डेटा प्रवाह](/docs/state-and-lifecycle.html#the-data-flows-down).

state को लिफ्ट करने में दो-तरफ़ा बंधन दृष्टिकोण की तुलना में अधिक "boilerplate" कोड लिखना शामिल है, लेकिन एक लाभ के रूप में, bug को खोजने और अलग करने में कम काम लगता है। चूंकि कोई भी state किसी कौम्पोनॅन्ट में "रहता है" और वह कौम्पोनॅन्ट अकेले इसे बदल सकता है, bug के लिए सतह क्षेत्र बहुत कम हो गया है। इसके अतिरिक्त, आप यूजर इनपुट को अस्वीकार या परिवर्तित करने के लिए कोई भी कस्टम लॉजिक लागू कर सकते हैं।

यदि किसी को props या state के द्वारा प्राप्त किया जा सकता है, तो यह संभवतः state में नहीं होना चाहिए। उदाहरण के लिए, दोनों `celsiusValue` और `fahrenheitValue` को स्टोर करने के बजाय, हम केवल अंतिम संपादित `temperature` और इसके `scale` को स्टोर करते हैं। 'render()' मेथड् में उनकी सहायता से अन्य इनपुट की वैल्यू की गणना हमेशा की जा सकती है। यह हमें यूजर इनपुट में कोई भी सटीकता खोए बिना दूसरे फील्ड में राउंडिंग को हटाने या लागू करने देता है।

जब आप UI में कुछ गलत देखते हैं, तब आप उपयोग कर सकते हैं [React Developer Tools](https://github.com/facebook/react-devtools) props का निरीक्षण करने और पेड़ के ऊपर चढ़ने के लिए जब तक कि आप कौम्पोनॅन्ट को state अपडेट करने के लिए जिम्मेदार नहीं पाते। यह आपको bugs के स्रोत का पता लगाने देता है:

<img src="../images/docs/react-devtools-state.gif" alt="Monitoring State in React DevTools" max-width="100%" height="100%">

