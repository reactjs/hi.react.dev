---
id: conditional-rendering
title: Conditional Rendering
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

React में, आप अलग-अलग कौम्पोनॅन्ट बना सकते हैं जो आपके लिए आवश्यक व्यवहार को एनकैप्सुलेट करते हैं। फिर, आप अपने ऍप की स्टेट के आधार पर उनमें से कुछ को ही रिप्रेजेंट कर सकते हैं।

कंडीशनल रेंडरिंग React में वैसे ही काम करता है जैसे कंडीशंस जावास्क्रिप्ट में करते है। जावास्क्रिप्ट के ऑपरेटर्स [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) और [`कंडीशनल ऑपरेटर्स `](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) का इस्तेमाल ऐसे एलिमेंट्स बनाने के लिए किया जा सकता हे जो करंट स्टेट को रिप्रेजेंट करे, और React उस हिसाब से UI को अपडेट करेगा ताकि वेह UI से मैच करे।

उदाहरण के तौर पे यह दो कौम्पोनॅन्ट को देखे:

```js
function UserGreeting(props) {
  return <h1>वापसी पर स्वागत है!</h1>;
}

function GuestGreeting(props) {
  return <h1>कृपया साइन अप करो।</h1>;
}
```

हम एक Greeting कौम्पोनॅन्ट बनाएंगे जो यूजर की लॉग्डइन स्थिति के अनुसार इन दोनों में से एक कॉम्पोनेन्ट दिखायेगा:

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[**CodePen में कोशिश करो**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

यह उदहारण `isLoggedIn` प्रोप के वैल्यू के अनुसार अलग अलग ग्रीटिंग्स रेंडर करता है।

### एलिमेंट वेरिएबल्स {#element-variables}

आप एलिमेंट्स को स्टोर करने के लिए वेरिएबल्स का उसे उपयोग कर सकते हैं। यह आपको कंडीशनल रेंडरिंग में मदद करेगा जबकि बाकि का आउटपुट नहीं बदलेगा। 

लॉगिन और लॉगआउट बटन्स के नए कौम्पोनॅन्टस पर विचार करें :

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```


इस उदहारण में हम बना रहे है [स्टेटफुल कौम्पोनॅन्ट](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) जिसे बोलते हैं `LoginControl`। 

जो करंट स्टेट के हिसाब से `<LoginButton />` या  `<LogoutButton />` को रेंडर करेगा। वो `<Greeting />` को भी रेंडर करेगा जैसे पिछले उदहारण में बताया था:

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

वेरिएबल डिक्लेअर करते वक्त, `if` स्टेटमेंट से कौम्पोनॅन्ट को कण्डीशनली रेंडर करना सही तरीका है, कभी आपको छोटा शार्ट सिंटेक्स उसे करना पड़ सकता है। यहाँ नीचे, JSX में इन लाइन कंडीशंस के कुछ पर्याय दिए गए हैं। 

### लॉजिकल && ऑपरेटर के साथ इन लाइन `if` का इस्तेमाल  {#inline-if-with-logical--operator}

आप [किसी भी एक्सप्रेशन को `jsx`](/docs/introducing-jsx.html#embedding-expressions-in-jsx) में कर्ली ब्रेसेस इस्तेमाल करके ड़ाल सकते हैं। इसमें जावास्क्रिप्ट का लॉजिकल `&&` ऑपरेटर भी शामिल है। इसकी मदद से हम किसी भी एलिमेंट को कंडीशंस से इन्क्लूड कर सकते है: 

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

जैवसक्रिप्ट मे यह काम करता है क्यूंकि, `true && expression` हमेशा `expression` बन जाता है, और `false && expression` हमेशा `false` बन जाता है।

इसीलिए, अगर कोई कंडीशन `true` है, तोह `&&` के आगे का एलिमेंट आउटपुट में आ जाता है। अगर यह `false` है, फिर React इसको रेंडर नहीं करता है। 

### कंडीशनल ऑपरेटर्स के साथ इन लाइन If-Else {#inline-if-else-with-conditional-operator}

जावास्क्रिप्ट कंडीशनल ऑपरेटर [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) इस्तेमाल करके एलिमेंट्स को इन लाइन में कण्डीशनली रेंडर भी कर सकते हैं।

जैसे नीचे के उदहारण में, छोटे टेक्स्ट ब्लॉक को इसे इस्तेमाल करके कण्डीशनली रेंडर किया है।

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

इसे हम बड़े एक्सप्रेशन्स के साथ भी उसे कर सकते है हालांकि यह जानना कम स्पष्ट है कि क्या हो रहा है:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

जैसे की जावास्क्रिप्ट में होता है, यह हम पे निर्भर करता है की कोनसा स्टाइल इस्तेमाल करें जिससे आप और आपकी टीम को समझना आसान हो। यह भी याद रहना की जैसे कंडीशंस बड़ी और पेचीदा हो, तब कौम्पोनॅन्ट को एक्सट्रेक्ट करना अच्छा रहता है [कौम्पोनॅन्ट एक्सट्रेक्ट करना](/docs/components-and-props.html#extracting-components)।

### कौम्पोनॅन्ट को रेंडर होने से रोकें {#preventing-component-from-rendering}

कुछ केसेस में कौम्पोनॅन्ट को छिपाना पड़ता है जब की वह किसी दूसरे कौम्पोनॅन्ट में रेंडर हो रहे हो। तब हमको आउटपुट को रेंडर करने के बजाये `null` रीटर्न करना है।

जैसे नीचे के उदहारण में, `<WarningBanner />` यह कौम्पोनॅन्ट `warn` प्रोप के वैल्यू के अनुसार रेंडर हुआ है। अगर इसकी वैल्यू `false` रहती तो कौम्पोनॅन्ट रेंडर नहीं होता:

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

कौम्पोनॅन्ट के `रेंडर` से `null` रीटर्न करने का कौम्पोनॅन्ट के लाइफ साइकिल मेथड्स पर कोई असर नहीं पड़ता। जैसे की `componentDidUpdate` फिर भी कॉल होगा।
