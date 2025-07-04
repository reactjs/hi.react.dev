---
title: useContext
---

<Intro>

`useContext` एक React हुक है जो आपको अपने कौम्पोनॅन्ट से [कॉन्टेक्स्ट](/learn/passing-data-deeply-with-context) को पढ़ने और सब्सक्राइब करने की सुविधा देता है।

```js
const value = useContext(SomeContext)
```

</Intro>

<InlineToc />

---

## रेफरेंस {/*reference*/}

### `useContext(SomeContext)` {/*usecontext*/}

अपने कौम्पोनॅन्ट के टॉप लेवल पर `useContext` कॉल करें ताकि आप [कॉन्टेक्स्ट](/learn/passing-data-deeply-with-context) को पढ़ और सब्सक्राइब कर सकें।

```js
import { useContext } from 'react';

function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
```

[नीचे और उदाहरण देखें।](#usage)

#### पैरामीटर्स {/*parameters*/}

* `SomeContext`: वह कॉन्टेक्स्ट जिसे आपने पहले [`createContext`](/reference/react/createContext) के साथ बनाया है। खुद कॉन्टेक्स्ट में जानकारी नहीं होती, यह केवल उस प्रकार की जानकारी को दर्शाता है जिसे आप कौम्पोनॅन्ट्स से प्रोवाइड या पढ़ सकते हैं।

#### रिटर्न्स {/*returns*/}

`useContext` कॉल करने वाले कौम्पोनॅन्ट के लिए कॉन्टेक्स्ट वैल्यू रिटर्न करता है। यह वैल्यू उस सबसे नज़दीकी `SomeContext` प्रोवाइडर के `value` के अनुसार तय होती है, जो कौम्पोनॅन्ट ट्री में ऊपर होता है। अगर ऐसा कोई प्रोवाइडर नहीं है, तो रिटर्न की गई वैल्यू [`createContext`](/reference/react/createContext) में दिए गए `defaultValue` के बराबर होगी। रिटर्न की गई वैल्यू हमेशा अपडेटेड रहती है। React अपने-आप उन कौम्पोनॅन्ट्स को री-रेंडर करता है जो किसी कॉन्टेक्स्ट को पढ़ते हैं, अगर वह बदलता है।

#### सावधानियाँ {/*caveats*/}

* किसी कौम्पोनॅन्ट में `useContext()` कॉल उसी कौम्पोनॅन्ट से रिटर्न हुए प्रोवाइडर्स से प्रभावित नहीं होती। संबंधित `<Context>` **ज़रूरी है कि वह उस कौम्पोनॅन्ट के *ऊपर* हो** जो `useContext()` कॉल कर रहा है।
* React **अपने-आप उन सभी चिल्ड्रन को री-रेंडर करता है** जो किसी विशेष कॉन्टेक्स्ट का उपयोग करते हैं, उस प्रोवाइडर से शुरू होकर जिसे नया `value` मिलता है। पिछली और अगली वैल्यू की तुलना [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) से होती है। [`memo`](/reference/react/memo) से री-रेंडर स्किप करने पर भी चिल्ड्रन को नई कॉन्टेक्स्ट वैल्यू मिलती है।
* अगर आपका बिल्ड सिस्टम आउटपुट में डुप्लिकेट मॉड्यूल्स बनाता है (जैसा कि symlinks के साथ हो सकता है), तो इससे कॉन्टेक्स्ट टूट सकता है। कॉन्टेक्स्ट के ज़रिए कुछ पास करना तभी काम करता है जब प्रोवाइड करने और पढ़ने के लिए उपयोग किया गया `SomeContext` ***बिल्कुल* वही ऑब्जेक्ट** हो, जैसा कि `===` तुलना से तय होता है।

---

## उपयोग {/*usage*/}

### डेटा को ट्री में गहराई तक पास करना {/*passing-data-deeply-into-the-tree*/}

अपने कौम्पोनॅन्ट के टॉप लेवल पर `useContext` कॉल करें ताकि आप [कॉन्टेक्स्ट](/learn/passing-data-deeply-with-context) को पढ़ और सब्सक्राइब कर सकें।

```js [[2, 4, "theme"], [1, 4, "ThemeContext"]]
import { useContext } from 'react';

function Button() {
  const theme = useContext(ThemeContext);
  // ... 
```

`useContext` आपके द्वारा पास किए गए <CodeStep step={1}>कॉन्टेक्स्ट</CodeStep> के लिए <CodeStep step={2}>कॉन्टेक्स्ट वैल्यू</CodeStep> रिटर्न करता है। इस वैल्यू को निर्धारित करने के लिए, React कौम्पोनॅन्ट ट्री में ऊपर की ओर खोजता है और उस विशेष कॉन्टेक्स्ट के लिए **सबसे नज़दीकी कॉन्टेक्स्ट प्रोवाइडर** ढूंढता है।

अगर आप किसी `Button` को कॉन्टेक्स्ट देना चाहते हैं, तो उसे या उसके किसी पैरेंट कौम्पोनॅन्ट को संबंधित कॉन्टेक्स्ट प्रोवाइडर में रैप करें:

```js [[1, 3, "ThemeContext"], [2, 3, "\\"dark\\""], [1, 5, "ThemeContext"]]
function MyPage() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  );
}

function Form() {
  // ... बटन को अंदर रेंडर करता है ...
}
```

इससे कोई फर्क नहीं पड़ता कि प्रोवाइडर और `Button` के बीच कितनी लेयर्स हैं। जब भी `Form` के अंदर कहीं भी कोई `Button` `useContext(ThemeContext)` कॉल करता है, उसे `"dark"` वैल्यू मिलेगी।

<Pitfall>

`useContext()` हमेशा उस कौम्पोनॅन्ट के *ऊपर* सबसे नज़दीकी प्रोवाइडर को खोजता है जो इसे कॉल करता है। यह ऊपर की ओर खोजता है और **उस कौम्पोनॅन्ट के अंदर के प्रोवाइडर्स को नहीं देखता** जिसमें आप `useContext()` कॉल कर रहे हैं।

</Pitfall>

<Sandpack>

```js
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```

```css
.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

---

### कॉन्टेक्स्ट के ज़रिए पास किए गए डेटा को अपडेट करना {/*updating-data-passed-via-context*/}

अक्सर, आप चाहेंगे कि कॉन्टेक्स्ट समय के साथ बदल सके। कॉन्टेक्स्ट को अपडेट करने के लिए, इसे [स्टेट](/reference/react/useState) के साथ मिलाएँ। पैरेंट कौम्पोनॅन्ट में एक स्टेट वेरिएबल डिक्लेयर करें, और वर्तमान स्टेट को <CodeStep step={2}>कॉन्टेक्स्ट वैल्यू</CodeStep> के रूप में प्रोवाइडर को पास करें।

```js {2} [[1, 4, "ThemeContext"], [2, 4, "theme"], [1, 11, "ThemeContext"]]
function MyPage() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext value={theme}>
      <Form />
      <Button onClick={() => {
        setTheme('light');
      }}>
        लाइट थीम पर स्विच करें
      </Button>
    </ThemeContext>
  );
}
```

अब प्रोवाइडर के अंदर का कोई भी `Button` वर्तमान `theme` वैल्यू प्राप्त करेगा। यदि आप प्रोवाइडर को पास की गई `theme` वैल्यू को अपडेट करने के लिए `setTheme` कॉल करते हैं, तो सभी `Button` कौम्पोनॅन्ट्स नई `'light'` वैल्यू के साथ री-रेंडर हो जाएँगे।

<Recipes titleText="कॉन्टेक्स्ट को अपडेट करने के उदाहरण" titleId="examples-basic">

#### कॉन्टेक्स्ट के ज़रिए वैल्यू अपडेट करना {/*updating-a-value-via-context*/}

इस उदाहरण में, `MyApp` कौम्पोनॅन्ट एक स्टेट वेरिएबल होल्ड करता है जिसे बाद में `ThemeContext` प्रोवाइडर को पास किया जाता है। "डार्क मोड" चेकबॉक्स को चेक करने से स्टेट अपडेट होती है। प्रोवाइड की गई वैल्यू बदलने पर उस कॉन्टेक्स्ट का उपयोग करने वाले सभी कौम्पोनॅन्ट्स री-रेंडर हो जाते हैं।

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext value={theme}>
      <Form />
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>
    </ThemeContext>
  )
}

function Form({ children }) {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```

```css
.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

ध्यान दें कि `value="dark"` `"dark"` स्ट्रिंग पास करता है, लेकिन `value={theme}` जावास्क्रिप्ट के `theme` वेरिएबल की वैल्यू पास करता है, जिसमें [JSX कर्ली ब्रेसेस](/learn/javascript-in-jsx-with-curly-braces) का उपयोग होता है। कर्ली ब्रेसेस की मदद से आप ऐसी कॉन्टेक्स्ट वैल्यू भी पास कर सकते हैं जो स्ट्रिंग न हों।

<Solution />

#### ऑब्जेक्ट को कॉन्टेक्स्ट के ज़रिए अपडेट करना {/*updating-an-object-via-context*/}

इस उदाहरण में, एक `currentUser` स्टेट वेरिएबल है जिसमें एक ऑब्जेक्ट स्टोर होता है। आप `{ currentUser, setCurrentUser }` को एक ही ऑब्जेक्ट में मिलाकर उसे `value={}` के अंदर कॉन्टेक्स्ट के ज़रिए नीचे पास करते हैं। इससे नीचे के किसी भी कौम्पोनॅन्ट, जैसे कि `LoginButton`, को `currentUser` और `setCurrentUser` दोनों पढ़ने की सुविधा मिलती है, और ज़रूरत पड़ने पर `setCurrentUser` को कॉल किया जा सकता है।

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const CurrentUserContext = createContext(null);

export default function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <CurrentUserContext
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      <Form />
    </CurrentUserContext>
  );
}

function Form({ children }) {
  return (
    <Panel title="Welcome">
      <LoginButton />
    </Panel>
  );
}

function LoginButton() {
  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

  if (currentUser !== null) {
    return <p>You logged in as {currentUser.name}.</p>;
  }

  return (
    <Button onClick={() => {
      setCurrentUser({ name: 'Advika' })
    }}>Log in as Advika</Button>
  );
}

function Panel({ title, children }) {
  return (
    <section className="panel">
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
label {
  display: block;
}

.panel {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
}

.button {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}
```

</Sandpack>

<Solution />

#### एक से अधिक कॉन्टेक्स्ट्स {/*multiple-contexts*/}

इस उदाहरण में, दो स्वतंत्र कॉन्टेक्स्ट्स हैं। `ThemeContext` वर्तमान थीम प्रोवाइड करता है, जो एक स्ट्रिंग है, जबकि `CurrentUserContext` वर्तमान यूज़र को दर्शाने वाला ऑब्जेक्ट होल्ड करता है।

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ThemeContext value={theme}>
      <CurrentUserContext
        value={{
          currentUser,
          setCurrentUser
        }}
      >
        <WelcomePanel />
        <label>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={(e) => {
              setTheme(e.target.checked ? 'dark' : 'light')
            }}
          />
          Use dark mode
        </label>
      </CurrentUserContext>
    </ThemeContext>
  )
}

function WelcomePanel({ children }) {
  const {currentUser} = useContext(CurrentUserContext);
  return (
    <Panel title="Welcome">
      {currentUser !== null ?
        <Greeting /> :
        <LoginForm />
      }
    </Panel>
  );
}

function Greeting() {
  const {currentUser} = useContext(CurrentUserContext);
  return (
    <p>You logged in as {currentUser.name}.</p>
  )
}

function LoginForm() {
  const {setCurrentUser} = useContext(CurrentUserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const canLogin = firstName.trim() !== '' && lastName.trim() !== '';
  return (
    <>
      <label>
        First name{': '}
        <input
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name{': '}
        <input
        required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </label>
      <Button
        disabled={!canLogin}
        onClick={() => {
          setCurrentUser({
            name: firstName + ' ' + lastName
          });
        }}
      >
        Log in
      </Button>
      {!canLogin && <i>Fill in both fields.</i>}
    </>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, disabled, onClick }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

```css
label {
  display: block;
}

.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

<Solution />

#### प्रोवाइडर्स को एक कौम्पोनॅन्ट में एक्सट्रैक्ट करना {/*extracting-providers-to-a-component*/}

जैसे-जैसे आपकी एप्प बढ़ती है, यह सामान्य है कि आपकी एप्प की रूट के पास कई कॉन्टेक्स्ट्स की एक "पिरामिड" बन जाए। इसमें कोई समस्या नहीं है। हालाँकि, अगर आपको नेस्टिंग देखने में अच्छा नहीं लगता, तो आप सभी प्रोवाइडर्स को एक ही कौम्पोनॅन्ट में एक्सट्रैक्ट कर सकते हैं। इस उदाहरण में, `MyProviders` "प्लम्बिंग" को छुपाता है और पास किए गए चिल्ड्रन को ज़रूरी प्रोवाइडर्स के अंदर रेंडर करता है। ध्यान दें कि `theme` और `setTheme` स्टेट की ज़रूरत `MyApp` में ही है, इसलिए `MyApp` ही उस स्टेट का मालिक रहता है।

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <MyProviders theme={theme} setTheme={setTheme}>
      <WelcomePanel />
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>
    </MyProviders>
  );
}

function MyProviders({ children, theme, setTheme }) {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ThemeContext value={theme}>
      <CurrentUserContext
        value={{
          currentUser,
          setCurrentUser
        }}
      >
        {children}
      </CurrentUserContext>
    </ThemeContext>
  );
}

function WelcomePanel({ children }) {
  const {currentUser} = useContext(CurrentUserContext);
  return (
    <Panel title="Welcome">
      {currentUser !== null ?
        <Greeting /> :
        <LoginForm />
      }
    </Panel>
  );
}

function Greeting() {
  const {currentUser} = useContext(CurrentUserContext);
  return (
    <p>You logged in as {currentUser.name}.</p>
  )
}

function LoginForm() {
  const {setCurrentUser} = useContext(CurrentUserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const canLogin = firstName !== '' && lastName !== '';
  return (
    <>
      <label>
        First name{': '}
        <input
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name{': '}
        <input
        required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </label>
      <Button
        disabled={!canLogin}
        onClick={() => {
          setCurrentUser({
            name: firstName + ' ' + lastName
          });
        }}
      >
        Log in
      </Button>
      {!canLogin && <i>Fill in both fields.</i>}
    </>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, disabled, onClick }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

```css
label {
  display: block;
}

.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

<Solution />

#### कॉन्टेक्स्ट और रिड्यूसर के साथ स्केल करना {/*scaling-up-with-context-and-a-reducer*/}

बड़ी ऍप्स में, अक्सर कॉन्टेक्स्ट को [रिड्यूसर](/reference/react/useReducer) के साथ मिलाकर उपयोग किया जाता है ताकि किसी स्टेट से जुड़ी लॉजिक को कौम्पोनॅन्ट्स से बाहर निकाला जा सके। इस उदाहरण में, सारी "वायरिंग" `TasksContext.js` में छुपी हुई है, जिसमें एक रिड्यूसर और दो अलग-अलग कॉन्टेक्स्ट्स होते हैं।

इस उदाहरण का [पूरा वॉकथ्रू](/learn/scaling-up-with-reducer-and-context) पढ़ें।

<Sandpack>

```js src/App.js
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

```js src/TasksContext.js
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        {children}
      </TasksDispatchContext>
    </TasksContext>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```js src/AddTask.js
import { useState, useContext } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button>
    </>
  );
}

let nextId = 3;
```

```js src/TaskList.js
import { useState, useContext } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

<Solution />

</Recipes>

---

### एक फॉलबैक डिफॉल्ट वैल्यू निर्दिष्ट करना {/*specifying-a-fallback-default-value*/}

अगर React पैरेंट ट्री में उस विशेष <CodeStep step={1}>कॉन्टेक्स्ट</CodeStep> का कोई प्रोवाइडर नहीं ढूंढ पाता, तो `useContext()` द्वारा रिटर्न की गई कॉन्टेक्स्ट वैल्यू उस <CodeStep step={3}>डिफॉल्ट वैल्यू</CodeStep> के बराबर होगी जिसे आपने [वह कॉन्टेक्स्ट बनाते समय](/reference/react/createContext) निर्दिष्ट किया था:

```js [[1, 1, "ThemeContext"], [3, 1, "null"]]
const ThemeContext = createContext(null);
```

डिफॉल्ट वैल्यू **कभी नहीं बदलती**। अगर आप कॉन्टेक्स्ट को अपडेट करना चाहते हैं, तो ऊपर [बताए अनुसार]((#updating-data-passed-via-context)) इसे स्टेट के साथ उपयोग करें।

अक्सर, `null` की जगह आप कोई और अधिक अर्थपूर्ण वैल्यू डिफॉल्ट के रूप में दे सकते हैं, उदाहरण के लिए:

```js [[1, 1, "ThemeContext"], [3, 1, "light"]]
const ThemeContext = createContext('light');
```

इस तरह, अगर आप गलती से किसी कौम्पोनॅन्ट को बिना संबंधित प्रोवाइडर के रेंडर कर देते हैं, तो भी वह टूटेगा नहीं। यह आपके कौम्पोनॅन्ट्स को टेस्ट एनवायरनमेंट में भी बिना ज़्यादा प्रोवाइडर्स सेट किए अच्छे से काम करने में मदद करता है।

नीचे दिए गए उदाहरण में, "Toggle theme" बटन हमेशा light रहता है क्योंकि वह **किसी भी थीम कॉन्टेक्स्ट प्रोवाइडर के बाहर** है और डिफॉल्ट कॉन्टेक्स्ट थीम वैल्यू `'light'` है। डिफॉल्ट थीम को `'dark'` करके देखें।

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <>
      <ThemeContext value={theme}>
        <Form />
      </ThemeContext>
      <Button onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}>
        Toggle theme
      </Button>
    </>
  )
}

function Form({ children }) {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, onClick }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

---

### ट्री के किसी हिस्से के लिए कॉन्टेक्स्ट ओवरराइड करना {/*overriding-context-for-a-part-of-the-tree*/}

आप ट्री के किसी हिस्से के लिए कॉन्टेक्स्ट को ओवरराइड कर सकते हैं, बस उस हिस्से को अलग वैल्यू वाले प्रोवाइडर में रैप करें।

```js {3,5}
<ThemeContext value="dark">
  ...
  <ThemeContext value="light">
    <Footer />
  </ThemeContext>
  ...
</ThemeContext>
```

आप जितनी बार चाहें, प्रोवाइडर्स को नेस्ट और ओवरराइड कर सकते हैं।

<Recipes titleText="कॉन्टेक्स्ट ओवरराइड करने के उदाहरण">

#### थीम ओवरराइड करना {/*overriding-a-theme*/}

यहाँ, `Footer` के *अंदर* वाला बटन बाहर के बटनों (`"dark"`) की तुलना में अलग कॉन्टेक्स्ट वैल्यू (`"light"`) प्राप्त करता है।

<Sandpack>

```js
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
      <ThemeContext value="light">
        <Footer />
      </ThemeContext>
    </Panel>
  );
}

function Footer() {
  return (
    <footer>
      <Button>Settings</Button>
    </footer>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      {title && <h1>{title}</h1>}
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```

```css
footer {
  margin-top: 20px;
  border-top: 1px solid #aaa;
}

.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

<Solution />

#### अपने-आप नेस्ट होने वाले हेडिंग्स {/*automatically-nested-headings*/}

जब आप कॉन्टेक्स्ट प्रोवाइडर्स को नेस्ट करते हैं, तो आप जानकारी को "एकत्रित" कर सकते हैं। इस उदाहरण में, `Section` कौम्पोनॅन्ट `LevelContext` को ट्रैक करता है, जो सेक्शन नेस्टिंग की गहराई को दर्शाता है। यह पैरेंट सेक्शन से `LevelContext` पढ़ता है, और अपने चिल्ड्रन को `LevelContext` की वैल्यू एक बढ़ाकर प्रोवाइड करता है। नतीजतन, `Heading` कौम्पोनॅन्ट अपने-आप तय कर सकता है कि उसे `<h1>`, `<h2>`, `<h3>`, ... में से कौन-सा टैग उपयोग करना है, इस आधार पर कि वह कितने `Section` कौम्पोनॅन्ट्स के अंदर नेस्टेड है।

इस उदाहरण का [विस्तृत पूर्वाभ्यास](/learn/passing-data-deeply-with-context) पढ़ें।

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(0);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

<Solution />

</Recipes>

---

### ऑब्जेक्ट्स और फंक्शन्स पास करते समय री-रेंडर को ऑप्टिमाइज़ करना {/*optimizing-re-renders-when-passing-objects-and-functions*/}

आप कॉन्टेक्स्ट के ज़रिए कोई भी वैल्यू पास कर सकते हैं, जिनमें ऑब्जेक्ट्स और फंक्शन्स भी शामिल हैं।

```js [[2, 10, "{ currentUser, login }"]] 
function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  function login(response) {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }

  return (
    <AuthContext value={{ currentUser, login }}>
      <Page />
    </AuthContext>
  );
}
```

यहाँ, <CodeStep step={2}>कॉन्टेक्स्ट वैल्यू</CodeStep> एक जावास्क्रिप्ट ऑब्जेक्ट है जिसमें दो प्रॉपर्टीज़ हैं, जिनमें से एक एक फंक्शन है। जब भी `MyApp` री-रेंडर होता है (जैसे कि रूट अपडेट पर), यह एक *नया* ऑब्जेक्ट और *नया* फंक्शन बनेगा, इसलिए React को ट्री में गहराई तक उन सभी कौम्पोनॅन्ट्स को भी री-रेंडर करना पड़ेगा जो `useContext(AuthContext)` कॉल करते हैं।

छोटी ऍप्स में यह कोई समस्या नहीं है। हालाँकि, अगर अंदर का डेटा, जैसे कि `currentUser`, नहीं बदला है तो उन्हें री-रेंडर करने की ज़रूरत नहीं है। React को इसका लाभ उठाने में मदद करने के लिए, आप `login` फंक्शन को [`useCallback`](/reference/react/useCallback) से रैप कर सकते हैं और ऑब्जेक्ट क्रिएशन को [`useMemo`](/reference/react/useMemo) में रख सकते हैं। यह एक परफॉर्मेंस ऑप्टिमाइज़ेशन है:

```js {6,9,11,14,17}
import { useCallback, useMemo } from 'react';

function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback((response) => {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }, []);

  const contextValue = useMemo(() => ({
    currentUser,
    login
  }), [currentUser, login]);

  return (
    <AuthContext value={contextValue}>
      <Page />
    </AuthContext>
  );
}
```

इस बदलाव के परिणामस्वरूप, भले ही `MyApp` को री-रेंडर होना पड़े, वे कौम्पोनॅन्ट्स जो `useContext(AuthContext)` कॉल करते हैं, उन्हें तब तक री-रेंडर नहीं करना पड़ेगा जब तक `currentUser` नहीं बदला है।

[`useMemo`](/reference/react/useMemo#skipping-re-rendering-of-components) और [`useCallback`](/reference/react/useCallback#skipping-re-rendering-of-components) के बारे में और पढ़ें।

---

## समस्या निवारण {/*troubleshooting*/}

### मेरा कौम्पोनॅन्ट मेरे प्रोवाइडर से वैल्यू नहीं देख पा रहा {/*my-component-doesnt-see-the-value-from-my-provider*/}

ऐसा होने के कुछ सामान्य कारण हैं:

1. आप `<SomeContext>` को उसी कौम्पोनॅन्ट (या उसके नीचे) में रेंडर कर रहे हैं जहाँ आप `useContext()` कॉल कर रहे हैं। `<SomeContext>` को उस कौम्पोनॅन्ट के *ऊपर और बाहर* ले जाएँ जो `useContext()` कॉल करता है।
2. हो सकता है आपने अपने कौम्पोनॅन्ट को `<SomeContext>` के साथ रैप करना भूल गए हों, या आपने उसे ट्री के उस हिस्से में रखा हो जहाँ आप सोच रहे थे वहाँ नहीं है। [React DevTools](/learn/react-developer-tools) का उपयोग करके देखें कि हायरार्की सही है या नहीं।
3. हो सकता है आपके टूलिंग में कोई बिल्ड इश्यू हो, जिससे प्रोवाइड करने वाले कौम्पोनॅन्ट से दिखने वाला `SomeContext` और पढ़ने वाले कौम्पोनॅन्ट से दिखने वाला `SomeContext` दो अलग-अलग ऑब्जेक्ट्स बन गए हों। ऐसा symlinks के उपयोग से हो सकता है। आप इन्हें ग्लोबल्स जैसे `window.SomeContext1` और `window.SomeContext2` में असाइन करके और फिर कंसोल में `window.SomeContext1 === window.SomeContext2` चेक करके वेरिफाई कर सकते हैं। अगर ये समान नहीं हैं, तो बिल्ड टूल लेवल पर उस समस्या को ठीक करें।

### मुझे हमेशा अपने कॉन्टेक्स्ट से `undefined` मिल रहा है, जबकि डिफॉल्ट वैल्यू अलग है {/*i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different*/}

हो सकता है आपके ट्री में कोई प्रोवाइडर बिना `value` के हो:

```js {1,2}
// 🚩 काम नहीं करेगा: कोई value प्रॉप नहीं है
<ThemeContext>
   <Button />
</ThemeContext>
```

अगर आप `value` को निर्दिष्ट करना भूल जाते हैं, तो यह ऐसा है जैसे आप `value={undefined}` पास कर रहे हैं।

आपने गलती से कोई दूसरा प्रॉप नाम भी इस्तेमाल कर लिया हो सकता है:

```js {1,2}
// 🚩 काम नहीं करेगा: प्रॉप का नाम "value" होना चाहिए
<ThemeContext theme={theme}>
   <Button />
</ThemeContext>
```

इन दोनों ही मामलों में आपको React की तरफ से कंसोल में एक चेतावनी दिखनी चाहिए। इन्हें ठीक करने के लिए, प्रॉप को `value` कहें:

```js {1,2}
// ✅ value प्रॉप पास करना
<ThemeContext value={theme}>
   <Button />
</ThemeContext>
```

ध्यान दें कि [`createContext(defaultValue)` कॉल से मिलने वाली डिफॉल्ट वैल्यू](#specifying-a-fallback-default-value) का उपयोग **तभी होता है जब ऊपर कहीं भी कोई मिलती-जुलती प्रोवाइडर न हो।** अगर पैरेंट ट्री में कहीं `<SomeContext value={undefined}>` कौम्पोनॅन्ट है, तो `useContext(SomeContext)` कॉल करने वाले कौम्पोनॅन्ट को कॉन्टेक्स्ट वैल्यू के रूप में *undefined* ही मिलेगा।
