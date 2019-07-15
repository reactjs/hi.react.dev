---
id: conditional-rendering
title: Conditional Rendering
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

React में, आप अलग-अलग कौम्पोनॅन्ट बना सकते हैं जो आपके लिए आवश्यक व्यवहार को संक्षिप्त करते हैं। फिर, आप अपने ऍप की स्टेट के आधार पर उनमें से कुछ को ही रिप्रेजेंट कर सकते हैं।

कंडीशनल रेंडरिंग React में वैसे ही काम करता हे जैसे कंडीशंस जावास्क्रिप्ट में करते हे। जावास्क्रिप्ट ऑपरेटर्स जैसे [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) और [`कंडीशनल ऑपरेटर्स `](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) जो एलिमेंट्स बनके करंट स्टेट को रिप्रेजेंट करते हे। फिर React UI को अपडेट करके मैच कर देगा।

उदाहरण के तौर पे यह दो कौम्पोनॅन्ट देखो:

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

हम `Greeting` कौम्पोनॅन्ट बना रहे हे। अगर यूजर लॉगिन हे तभी देखेगा:

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

[**Try it on CodePen**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

यह उदहारण `isLoggedIn` प्रोप के वैल्यू के अनुसार अलग अलग ग्रीटिंग्स रेंडर करता हे।

### एलिमेंट वेरिएबल {#element-variables}

आप एलिमेंट्स को स्टोर करने के लिए वेरिएबल्स का उसे कर सकते हो। जिससे आपको कंडीशनल रेंडरिंग में मदद होगी और बाकि का आउटपुट चेंज नहीं होगा। 

अब लॉगिन और लॉगआउट बटन्स नए कौम्पोनॅन्टस को देखो :

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


इस उदहारण में हम बना रहे हे [स्टेटफुल कौम्पोनॅन्ट](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) जिसे बोलते हे  `LoginControl`। 

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

वेरिएबल डिक्लेअर करते वक्त, `if` स्टेटमेंट उसे कर्कटे कौम्पोनॅन्ट को कण्डीशनली रेंडर करना सही तरीका है, कभी आपको छोटा शार्ट सिंटेक्स उसे करना पड़ सकता हे। यहाँ नीचे, JSX में इन लाइन कंडीशंस के कुछ पर्याय दिए गए हैं। 

### लॉजिकल && ऑपरेटर के साथ इन लाइन `if` का इस्तेमाल  {#inline-if-with-logical--operator}

आप  [कोई भी एक्सप्रेशन `jsx` में डाल सकते हे](/docs/introducing-jsx.html#embedding-expressions-in-jsx) उसको कर्ली ब्रेसेस के अंदर व्रैप करना पड़ेगा।  इसमें जावास्क्रिप्ट का लॉजिकल `&&` ऑपरेटर भी शामिल हे. इसकी मदद से हम कोई एलिमेंट को कंडीशंस से इन्क्लूड कर सकते हे: 

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

जैवसक्रिप्ट मे  यह काम करता हे,  `true && expression` हमेशा `expression` होता हे, और `false && expression` हमेशा `false` होता हे।

इसीलिए, अगर कोई कंडीशन `true` हे, तोह `&&` के आगे का एलिमेंट आउटपुट में आ जाता हे। अगर यह `false` हे, फिर रियेक्ट इसको इग्नोर कर स्किप करेगा। 

### कंडीशनल ऑपरेटर्स के साथ इन लाइन if-else {#inline-if-else-with-conditional-operator}

जावास्क्रिप्ट की कंडीशनल ऑपरेटर्स का उसे करना [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) यह इन लाइन एलिमेंट्स की कंडीशनल रेंडरिंग की दूसरी पद्धति हे।

जैसे नीचे के एक्साम्पल में, कंडीशनल रेंडर कर छोटे टेक्स्ट ब्लॉक को रेंडर किआ।

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

इसे हम बड़े एक्सप्रेशन्स के साथ भी उसे कर सकते हे इससे कैसे काम हो रहा हे यह समझना आसान हो जाता हे:

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

जैसे की जावास्क्रिप्ट में होता हे, यह हम पे निर्भर करता हे की कोनसा स्टाइल उसे करे जिससे आप और आपि टीम को समझना आसान हो. यह भी याद रहना की जैसे कंडीशंस बड़ी और बेचिदा हो, तब कौम्पोनॅन्ट को एक्सट्रेक्ट करना अच्छा रहता हे [कौम्पोनॅन्ट को एक्सट्रेक्ट](/docs/components-and-props.html#extracting-components)।

### कौम्पोनॅन्ट को रेंडर करने से बचाये {#preventing-component-from-rendering}

कुछ केसेस में कंपोनेंट को छिपाना पड़ता हे जब की वह किसी दूसरे कौम्पोनॅन्ट में रेंडर हो रहे हो. तब हमको आउटपुट को रेंडर करने के अलावा `null` रीटर्न करना हे।

जैसे नीचे के एक्साम्पल में, `<WarningBanner />` यह कौम्पोनॅन्ट  `warn` प्रोप के वैल्यू के अनुसार रेंडर हुआ हे. अगर इसकी वैल्यू `false` रहती तोह कौम्पोनॅन्ट रेंडर नहीं होता:

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

कौम्पोनॅन्ट के `रेंडर` से `null` रीटर्न करने का और कौम्पोनॅन्ट के लाइफ साइकिल मेथड्स पर कोई असर नहीं पड़ता। जैसे की `componentDidUpdate` फिर भी कॉल होगा।
