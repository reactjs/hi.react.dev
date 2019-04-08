---
id: lifting-state-up
title: स्टेट को ऊपर लेजाना
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

अक्सर, कई कौम्पोनॅन्टस को एक ही बदलते डेटा को प्रतिबिंबित करने की आवश्यकता होती है। हम उनके निकटतम सामान्य पूर्वज तक स्टेट को उठाने की सलाह देते हैं| आइए देखें कि यह कैसे कार्य करता है।

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

इसके बाद, हम 'Calculator' नामक एक कौम्पोनॅन्ट बनाएंगे। यह एक `<input>` बनाएगा, जिसमे आप तापमान दर्ज कर सकते हैं, जिसकी value `this.state.temperature` में रहेगी.

इसके अतिरिक्त, यह वर्तमान इनपुट मूल्य के लिए `BoilingVerdict` बना देता है।

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

[**Try it on CodePen**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## एक दूसरा इनपुट जोड़ना {#adding-a-second-input}

हमारी नई आवश्यकता यह है कि, एक Celsius इनपुट के अलावा, हम एक Fahrenheit इनपुट प्रदान करें, और वे sync में रहें|

हम `Calculator` से एक `TemperatureInput` कौम्पोनॅन्ट निकालने से शुरुआत कर सकते हैं| हम इसमें एक नया `scale` prop जोड़ेंगे, जो या तो `"c"` या `"f"` हो सकता है:

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

अब हम `Calculator` को दो अलग-अलग तापमान इनपुट दिखाने के लिए बदल सकते हैं: 

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

अभ हमारे पास दो इनपुट हैं, लेकिन जब आप उनमें से एक में तापमान दर्ज करते हैं, तो दूसरा अपडेट नहीं होता| यह हमारी आवश्यकता के विपरीत है: हम उन्हें sync में रखना चाहते हैं।

हम `Calculator` से `BoilingVerdict` भी प्रदर्शित नहीं कर सकते| `Calculator` वर्तमान तापमान को नहीं जानता है क्योंकि यह `TemperatureInput` के अंदर छिपा हुआ है।

## कन्वर्शन फंक्शन्स लिखना {#writing-conversion-functions}

सबसे पहले, हम दो फंक्शन्स लिखेंगे| Celsius से Fahrenheit और वापस Fahrenheit से Celsius में बदलने के लिए:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

यह दो फंक्शन्स संख्याओं को परिवर्तित करते हैं|हम एक और फ़ंक्शन लिखेंगे जो एक स्ट्रिंग `temperature` और एक कनवर्टर फ़ंक्शन को आर्गुमेंट के रूप में लेता है और एक स्ट्रिंग देता है। हम इसका उपयोग एक इनपुट के आधार पर दूसरे इनपुट की गणना करने के लिए करेंगे।

यह अमान्य `temperature` पर एक खाली स्ट्रिंग देता है, और यह आउटपुट को तीसरे दशमलव स्थान पर रखता है:

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

उदाहरण के लिए, `tryConvert ('abc', toCelsius)` एक खाली स्ट्रिंग लौटाता है, और `tryConvert ('10 .22 ', toFahrenheit)` लौटाता है ` '50 .396'`|

## स्टेट को ऊपर लेजाना {#lifting-state-up}

वर्तमान में, दोनों `TemperatureInput` कौम्पोनॅन्टस अपनी स्थानीय स्टेट को स्वतंत्र रूप में बनाये रखते हैं:

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

हालाँकि, हम चाहते हैं कि ये दोनों इनपुट एक दूसरे के sync में रहें। जब हम Celsius इनपुट को अपडेट करें, तो Fahrenheit इनपुट अपडेट हो और इसके विपरीत को प्रतिबिंबित करना चाहिए।

React में , state साझाकरण का कार्य उसे कौम्पोनॅन्टस के निकटतम सामान्य पूर्वज तक ले जाकर पूरा किया जाता है|यह "स्टेट को ऊपर लेजाना" कहलाता है| हम लोकल स्टेट को `TemperatureInput` से हटा देंगे एवं  `Calculator` में ले जायेंगे|

यदि साझा स्टेट का मालिक `Calculator` हे, तो वह दोनों इन्पुट्स में वर्तमान तापमान के लिए "सत्य का स्रोत" बन जाता है| यह उन दोनों को एक दूसरे के अनुरूप वैल्यूज रखने का निर्देश दे सकता है| चूंकि दोनों `TemperatureInput` कौम्पोनॅन्टस के props एक ही मूल `Calculator` कौम्पोनॅन्ट से हैं, यह दोनों हमेशा sync में रहेंगे| 

आइए देखें कि यह चरण दर चरण कैसे काम करता है।

सबसे पहले, हम `TemperatureInput` कौम्पोनॅन्ट में `this.state.temperature` को `this.props.temperature` से बदल देंगे| अभी के लिए, मान लीजिये कि `this.props.temperature` पहले से ही मौजूद है, हालाँकि हमें भविष्य में इसे `Calculator` से पास करना होगा:

```js{3}
  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

हम जानते हैं कि [Props केवल-पढ़ने के लिए हैं](/docs/components-and-props.html#props-are-read-only). जब `temperature` local state में था, तो `TemperatureInput` इसे बदलने के लिए `this.setState ()` को कॉल कर सकता है| हालाँकि, अब `temperature` अपने मूल से prop बनकर आ रहा है, `TemperatureInput' का इस पर कोई नियंत्रण नहीं है।

React में, यह मसला आमतौर पर कौम्पोनॅन्ट को "नियंत्रित" बनाकर हल किया जाता है| जैसे DOM `<input>`, `value` एवं `onChange` prop दोनों को स्वीकार करता है, ठीक वैसे ही, `TemperatureInput` दोनों `temperature` एवं `onTemperatureChange` props को उसके मूल `Calculator` से स्वीकार करता है|

अब, जब `TemperatureInput` अपने तापमान को अपडेट करना चाहेगा, तो वह `this.props.onTemperChange` को कॉल करेगा:

```js{3}
  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>ध्यान दें:
>
>कस्टम कौम्पोनॅन्टस में `temperature` या `onTemperatureChange` prop नामों का कोई विशेष अर्थ नहीं है। हम उन्हें और कुछ भी कह सकते थे, जैसे कि `value` और `onChange` जो एक आम परंपरा है।

`Calculator` कौम्पोनॅन्ट के द्वारा `onTemperatureChange` prop को `temperature` prop के साथ प्रदान किया जाएगा| यह स्वयं के local state को संशोधित करके परिवर्तन को नियंत्रित करेगा, और इस प्रकार दोनों इनपुट्स को नए मूल्यों के साथ फिर से प्रस्तुत करेगा| हम बहुत जल्द नए `Calculator` के परिपालन को देखेंगे।

आईये `Calculator` में परिवर्तन करने से पहले, `TemperatureInput` कौम्पोनॅन्ट में किये गए परिवर्तनों को याद कर लेते हैं| हमने इसमें से local state को हटा दिया है, और `this.state.temperature` रीड करने के बजाय, हम अब `this.props.temperature` रीड करते हैं| जब हम कोई बदलाव करना चाहते हैं तो `this.setState()` को कॉल करने के बजाय हम अब `this.props.onTemperatureChange()` को कॉल करते हैं, जो `Calculator` प्रदान करता है|

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

हम वर्तमान इनपुट के `temperature` और `scale` को उसके local state में जमा करेंगे. यह वही स्टेट जिसे हमने इनपुट्स से "lifted up" किया, और यह उन दोनों के लिए "source of truth" के रूप में काम करेगी| यह दोनों इनपुट्स को रेंडर करने के लिए हमारे द्वारा आवश्यक सभी डेटा का न्यूनतम प्रतिनिधित्व है।

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

हम दोनों इनपुट्स की वैल्यू स्टोर कर सकते थे लेकिन यह अनावश्यक है। सबसे हाल ही में बदले गये इनपुट की वैल्यू एवं उसका प्रतिनिधित्व करने वाले scale को ही स्टोर करना पर्याप्त है| तब हम वर्तमान `temperature` और `scale` के आधार पर अन्य इनपुट के वैल्यू का अनुमान लगा सकते हैं|

इनपुट्स sync में रहेंगे क्योंकि उनकी वैल्यूज की गणना एक ही state से होगी:

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

[**Try it on CodePen**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

अब, कोई फर्क नहीं पड़ता कि आप किस इनपुट को संपादित करते हैं, `Calculator` के `this.state.temperature` और `this.state.scale` अपडेट हो जायेंगे| One of the inputs gets the value as is, so any user input is preserved, and the other input value is always recalculated based on it.

Let's recap what happens when you edit an input:

* React calls the function specified as `onChange` on the DOM `<input>`. In our case, this is the `handleChange` method in the `TemperatureInput` component.
* The `handleChange` method in the `TemperatureInput` component calls `this.props.onTemperatureChange()` with the new desired value. Its props, including `onTemperatureChange`, were provided by its parent component, the `Calculator`.
* When it previously rendered, the `Calculator` has specified that `onTemperatureChange` of the Celsius `TemperatureInput` is the `Calculator`'s `handleCelsiusChange` method, and `onTemperatureChange` of the Fahrenheit `TemperatureInput` is the `Calculator`'s `handleFahrenheitChange` method. So either of these two `Calculator` methods gets called depending on which input we edited.
* Inside these methods, the `Calculator` component asks React to re-render itself by calling `this.setState()` with the new input value and the current scale of the input we just edited.
* React calls the `Calculator` component's `render` method to learn what the UI should look like. The values of both inputs are recomputed based on the current temperature and the active scale. The temperature conversion is performed here.
* React calls the `render` methods of the individual `TemperatureInput` components with their new props specified by the `Calculator`. It learns what their UI should look like.
* React calls the `render` method of the `BoilingVerdict` component, passing the temperature in Celsius as its props.
* React DOM updates the DOM with the boiling verdict and to match the desired input values. The input we just edited receives its current value, and the other input is updated to the temperature after conversion.

Every update goes through the same steps so the inputs stay in sync.

## Lessons Learned {#lessons-learned}

There should be a single "source of truth" for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the [top-down data flow](/docs/state-and-lifecycle.html#the-data-flows-down).

Lifting state involves writing more "boilerplate" code than two-way binding approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state "lives" in some component and that component alone can change it, the surface area for bugs is greatly reduced. Additionally, you can implement any custom logic to reject or transform user input.

If something can be derived from either props or state, it probably shouldn't be in the state. For example, instead of storing both `celsiusValue` and `fahrenheitValue`, we store just the last edited `temperature` and its `scale`. The value of the other input can always be calculated from them in the `render()` method. This lets us clear or apply rounding to the other field without losing any precision in the user input.

When you see something wrong in the UI, you can use [React Developer Tools](https://github.com/facebook/react-devtools) to inspect the props and move up the tree until you find the component responsible for updating the state. This lets you trace the bugs to their source:

<img src="../images/docs/react-devtools-state.gif" alt="Monitoring State in React DevTools" max-width="100%" height="100%">

