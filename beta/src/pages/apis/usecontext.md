---
title: useContext
---

<Intro>

`useContext` is a React Hook that lets you read and subscribe to [context](/learn/passing-data-deeply-with-context) from your component.

`useContext` एक React Hook है जो आपको आपके कौम्पोनॅन्ट से context पढ़ कर

```js
const value = useContext(SomeContext)
```

</Intro>

- [Usage](#usage)
  - [Passing data deeply into the tree](#passing-data-deeply-into-the-tree)
  - [Updating data passed via context](#updating-data-passed-via-context)
  - [Specifying a fallback default value](#specifying-a-fallback-default-value)
  - [Overriding context for a part of the tree](#overriding-context-for-a-part-of-the-tree)
  - [Optimizing री-renders when passing objects and functions](#optimizing-री-renders-when-passing-objects-and-functions)
- [Reference](#reference)
  - [`useContext(SomeContext)`](#usecontext)
- [Troubleshooting](#troubleshooting)
  - [My component doesn't see the value from my provider](#my-component-doesnt-see-the-value-from-my-provider)
  - [I am always getting undefined from my context although the default value is different](#i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different)

---

## उसैज {/*usage*/}


### डेटा को ट्री की गहराई तक पास करना {/*passing-data-deeply-into-the-tree*/}

Call `useContext` at the top level of your component to read and subscribe to [context](/learn/passing-data-deeply-with-context).

[context](/learn/passing-data-deeply-with-context) को पढ़ने और सब्स्क्राइब करने के लिए, `useContext` को कौम्पोनॅन्ट के सबसे उपरी लेवल पर बुलाए.

```js [[2, 4, "theme"], [1, 4, "ThemeContext"]]
import { useContext } from 'react';

function Button() {
  const theme = useContext(ThemeContext);
  // ...
```

`useContext` returns the <CodeStep step={2}>context value</CodeStep> for the <CodeStep step={1}>context</CodeStep> you passed. To determine the context value, React searches the component tree and finds **the closest context provider above** for that particular context.

`useContext` आपके द्वारा पास किया गया <CodeStep step={1}>context</CodeStep> का <CodeStep step={2}>context वैल्यू</CodeStep> रिटर्न करता है. Context वैल्यू को निश्चित करने के लिए, React कौम्पोनॅन्ट ट्री मे किसी भी context के लिए **सबसे नज़दीक context प्रोवाइडर ** को ढूँढता है.

To pass context to a `Button`, wrap it or one of its parent components into the corresponding context provider:

`Button` मे context पास करने के लिए, हम उसे या उसके पैरेंट कौम्पोनॅन्ट को उसके तदनुसार context प्रोवाइडर मे रैप करते है.

```js [[1, 3, "ThemeContext"], [2, 3, "\"dark\""], [1, 5, "ThemeContext"]]
function MyPage() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  );
}

function Form() {
  // ... renders buttons inside ...
}
```

It doesn't matter how many layers of components there are between the provider and the `Button`. When a `Button` *anywhere* inside of `Form` calls `useContext(ThemeContext)`, it will receive `"dark"` as the value.

इससे कोई फ़र्क़ नही पड़ता कि प्रोवाइडर और `Button` के बीच मे कौम्पोनॅन्ट्स के कितने लेअर्ज़ है. जब `Form` के अंदर कहीं भी कोई `Button` `useContext(ThemeContext)` को बुलाता है, उसे वैल्यू के रूप में `"dark"` मिलेगा.

<Gotcha>

`useContext()` always looks for the closest provider *above* the component that calls it. It searches upwards and **does not** consider providers in the component from which you're calling `useContext()`.

`useContext()` हमेशा सबसे नज़दीक के प्रोवाइडर अपने बुलाने वाले कौम्पोनॅन्ट के ऊपर ढूँढता है. यह हमेशा ऊपर की ओर ढूँढता है और जिस कौंपोनेंट से `useContext()` बुला रहे हो उसके context प्रोवाइडर को कन्सिडर **नही करता**.

</Gotcha>

<Sandpack>

```js
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
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

### Updating data passed via context {/*updating-data-passed-via-context*/}
### Context द्वारा पास किया गया डेटा को अप्डेट करना {/*updating-data-passed-via-context*/}

Often, you'll want the context to change over time. To update context, you need to combine it with [state](/apis/usestate). Declare a state variable in the parent component, and pass the current state down as the <CodeStep step={2}>context value</CodeStep> to the provider.

अक्सर आप चाहेंगे कि context समय के साथ बदले. Context अप्डेट करने के लिए, आप को उसे [state](/apis/usestate) के सात जोड़ना होगा. पैरेंट कौम्पोनॅन्ट मे स्टेट वेरिएबल डिक्लेर कर, और करेंट state को <CodeStep step={2}>context वैल्यू</CodeStep> के रूप मे नीचे प्रोवाइडर को पास करे.

```js {2} [[1, 4, "ThemeContext"], [2, 4, "theme"], [1, 11, "ThemeContext"]]
function MyPage() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <Button onClick={() => {
        setTheme('light');
      }}>
        Switch to light theme
      </Button>
    </ThemeContext.Provider>
  );
}
```

Now any `Button` inside of the provider will receive the current `theme` value. If you call `setTheme` to update the `theme` value that you pass to the provider, all `Button` components will री-रेंडर with the new `'light'` value.

किसी भी `Button` के अंदर के प्रोवाइडर को अभी का `theme` वैल्यू मिलेगा. अगर आप `setTheme` को बुलाते है `theme` का वैल्यू अप्डेट करने के लिए जो आप प्रोवाइडर को पास करते है, तो सारे `Button` के कौम्पोनॅन्ट्स री-रेंडर होंगे नए `light` वैल्यू के साथ.

<Recipes titleText="Examples of updating context / Context update करने के udharan" titleId="examples-basic">

### Updating a value via context {/*updating-a-value-via-context*/}
### Context द्वारा वैल्यू को अप्डेट करना {/*updating-a-value-via-context*/}

In this example, the `MyApp` component holds a state variable which is then passed to the `ThemeContext` provider. Checking the "Dark mode" checkbox updates the state. Changing the provided value री-renders all the components using that context.

इस उदाहरण मे `MyApp` कौम्पोनॅन्ट मे एक state वेरिएबल है जो `ThemeContext` प्रोवाइडर मे पास किया जाता है. "Dark mode" चेकबॉक्स को चेक करने से state अप्डेट होता है. दिए गए वैल्यू को बदलने से उस context को इस्तेमाल करके सारे कौम्पोनॅन्ट्स री-रेंडर होते है.

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
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
    </ThemeContext.Provider>
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

Note that `value="dark"` passes the `"dark"` string, but `value={theme}` passes the value of the JavaScript `theme` variable with [JSX curly braces](/learn/javascript-in-jsx-with-curly-braces). Curly braces also let you pass context values that aren't strings.

अंदर दीजिए कि `value="dark"` `"dark"` स्ट्रिंग को पास करता है लेकिन `value={theme}` जावास्क्रिप्ट का `theme` वेरिएबल का वैल्यू पास करता है [JSX कर्ली ब्रेसिज़](/learn/javascript-in-jsx-with-curly-braces) के सात. कर्ली ब्रेसिज़ आपको वह context वैल्यू पास करने देते है जो स्ट्रिंज़ नही है.

<Solution />

### Updating an object via context {/*updating-an-object-via-context*/}
### Context द्वारा ऑब्जेक्ट को अप्डेट करना {/*updating-an-object-via-context*/}

In this example, there is a `currentUser` state variable which holds an object. You combine `{ currentUser, setCurrentUser }` into a single object and pass it down through the context inside the `value={}`. This lets any component below, such as `LoginButton`, read both `currentUser` and `setCurrentUser`, and then call `setCurrentUser` when needed.

इस उदाहरण मे एक `currentUser` state वेरिएबल जिसमे एक ऑब्जेक्ट है. आप `{ currentUser, setCurrentUser }` को एक सिंगल ऑब्जेक्ट मे कम्बाइन कर उसे context पास करते है `value={}` के अंदर. यह कोई भी निचली कौम्पोनॅन्ट जैसे `LoginButton`, दोनो `currentUser` और `setCurrentUser` को पड़ते है, और फ़िर ज़रूरत के अनुसार `setCurrentUser` को बुलाते है.

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const CurrentUserContext = createContext(null);

export default function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      <Form />
    </CurrentUserContext.Provider>
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

### Multiple contexts {/*multiple-contexts*/}
### मल्टिपल contexts {/*multiple-contexts*/}

In this example, there are two independent contexts. `ThemeContext` provides the current theme, which is a string, while `CurrentUserContext` holds the object representing the current user.

इस उदाहरण मे दो स्वतंत्र context है. `ThemeContext` अभी का थीम देता है स्ट्रिंग के रूप मे, जबकि `CurrentUserContext` एक ऑब्जेक्ट होल्ड करता है जो करेंट यूज़र का प्रतिनिधित्व करता है.

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider
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
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
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

### Extracting providers to a component {/*extracting-providers-to-a-component*/}
### कौम्पोनॅन्ट के लिए प्रोवाइडर इक्स्ट्रैक्ट करना {/*extracting-providers-to-a-component*/}

As your app grows, it is expected that you'll have a "pyramid" of contexts closer to the root of your app. There is nothing wrong with that. However, if you dislike the nesting aesthetically, you can extract the providers into a single component. In this example, `MyProviders` hides the "plumbing" and renders the children passed to it inside the necessary providers. Note that the `theme` and `setTheme` state is needed in `MyApp` itself, so `MyApp` still owns that piece of the state.

जैसे आपका एप्प ग्रो करता है, यह उम्मीद होती है कि एप्प के रूट के नज़दीक context का "पिरामिड" होगा. इसमें कुछ ग़लत नही है. लेकिन अगर आपको नेस्टिंग सौंदर्य की दृष्टि से पसंद नही, आप एक ही कौम्पोनॅन्ट मे प्रोवाइडर को इक्स्ट्रैक्ट कर सकते है. इस उदाहरण मे, `MyProviders`"प्लमबिंग" को छुपाता है और सारे बच्चे जो अपने ज़रूरत के प्रोवाइडर के अंदर पास किये गए है उसे रेंडर करता है. अंदर रखा कि `theme` और `setTheme` state की ज़रूरत `MyApp` मे ही है, तो `MyApp` अब भी उस state का मालिक है.

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
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser
        }}
      >
        {children}
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
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

### Scaling up with context and a reducer {/*scaling-up-with-context-and-a-reducer*/}
### रेडूसर और context के साथ स्केल करना {/*scaling-up-with-context-and-a-reducer*/}

In larger apps, it is common to combine context with a [reducer](/apis/usereducer) to extract the logic related to some state out of components. In this example, all the "wiring" is hidden in the `TasksContext.js`, which contains a reducer and two separate contexts.

बड़े ऍप्स मे यह सामान्य बात है कि context को [रेडूसर](/apis/usereducer) के साथ कम्बाइन करना ताकि कौम्पोनॅन्ट्स से लॉजिक इक्स्ट्रैक्ट कर सके जो किसी state से संबंधित है.

Read a [full walkthrough](/learn/scaling-up-with-reducer-and-context) of this example.
इस उदाहरण का [पूरा वॉक थ्रू](/learn/scaling-up-with-reducer-and-context) पढ़िए.

<Sandpack>

```js App.js
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

```js TasksContext.js
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
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

```js AddTask.js
import { useState, useContext } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask({ onAddTask }) {
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

```js TaskList.js
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

### फ़ॉलबैक डिफ़ॉल्ट वैल्यू को स्पेसिफ़ाई करना {/*specifying-a-fallback-default-value*/}

If React can't find any providers of that particular <CodeStep step={1}>context</CodeStep> in the parent tree, the context value returned by `useContext()` will be equal to the <CodeStep step={3}>default value</CodeStep> that you specified when you [created that context](/api/createcontext):
अगर React उस विशिष्ट (particular) <CodeStep step={1}>context</CodeStep> का प्रोवाइडर पैरेंट ट्री मे ना ढूँढ पाए, to `useContext()` द्वारा रिटर्न किया गया context वैल्यू [context banate समय](/api/createcontext) रखे गए <CodeStep step={3}>डिफ़ॉल्ट वैल्यू</CodeStep> के समान होगा:

```js [[1, 1, "ThemeContext"], [3, 1, "null"]]
const ThemeContext = createContext(null);
```

The default value **never changes**. If you want to update context, use it with state as [described above](#updating-data-passed-via-context).
डिफ़ॉल्ट वैल्यू कभी **बदलता नही है**. अगर आपको context अप्डेट करना है to उसे state के साथ [सिर्फ यूज़ करे](#updating-data-passed-via-context).

Often, instead of `null`, there is some more meaningful value you can use as a default, for example:
अक्सर `null` की जगह और भी सार्थक वैल्यू है जो आप डिफ़ॉल्टके रूप मे इस्तेमाल कर सकते है, उदाहरण:

```js [[1, 1, "ThemeContext"], [3, 1, "light"]]
const ThemeContext = createContext('light');
```

This way, if you accidentally render some component without a corresponding provider, it won't break. This also helps your components work well in a test environment without setting up a lot of providers in the tests.
इस तरह, अगर आप गलती से कोई कौम्पोनॅन्ट बिना प्रोवाइडर के रेंडर करते है,तो वह टूटेगा नही. यह आपके कौम्पोनॅन्ट्स को सही से टेस्ट इन्वायरॉन्मेंट काम करने देता है टेस्ट मे अधिक प्रोवाइडर को सेट अप किये बग़ैर.

In the example below, the "Toggle theme" button is always light because it's **outside any theme context provider** and the default context theme value is `'light'`. Try editing the default theme to be `'dark'`.

नीचे दिए गए उदाहरण मे, "Toggle theme" button हमेशा /light/ रहता है क्योंकि यह **किसी भी context प्रोवाइडर के बाहर है** और डिफ़ॉल्ट context मे theme वैल्यू `'light'` है. डिफ़ॉल्ट थीम को `'dark'` edit करने की कोशिश करे.

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Form />
      </ThemeContext.Provider>
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

### Overriding context for a part of the tree {/*overriding-context-for-a-part-of-the-tree*/}
### ट्री के हिस्से के लिए context ओवरराइड करना {/*overriding-context-for-a-part-of-the-tree*/}

You can override the context for a part of the tree by wrapping that part in a provider with a different value.
आप ट्री के किसी भी हिस्से का context ओवरराइड कर सकते है उस हिस्से को एक प्रोवाइडर मे रैप करके जिसका दूसरा वैल्यू है.

```js {3,5}
<ThemeContext.Provider value="dark">
  ...
  <ThemeContext.Provider value="light">
    <Footer />
  </ThemeContext.Provider>
  ...
</ThemeContext.Provider>
```

You can nest and override providers as many times as you need.
आप प्रोवाइडरस को नेस्ट और ओवरराइड जितनी बार आपको आवश्यकता हो कर सकते हो.

<Recipes title="Examples of overriding context/ Context को ओवरराइड करने के उधारण">

### थीम को ओवरराइड करना {/*overriding-a-theme*/}

Here, the button *inside* the `Footer` receives a different context value (`"light"`) than the buttons outside (`"dark"`).
यहा, `Footer` के *अंदर* जो button है उसे बाहर के buttons (`"dark"`) से अलग context वैल्यू(`"light"`) मिलता है.

<Sandpack>

```js
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
      <ThemeContext.Provider value="light">
        <Footer />
      </ThemeContext.Provider>
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

### Automatically nested headings {/*automatically-nested-headings*/}

You can "accumulate" information when you nest context providers. In this example, the `Section` component keeps track of the `LevelContext` which specifies the depth of the section nesting. It reads the `LevelContext` from the parent section, and provides the `LevelContext` number increased by one to its children. As a result, the `Heading` component can automatically decide which of the `<h1>`, `<h2>`, `<h3>`, ..., tags to use based on how many `Section` components it is nested inside of.

जब आप context प्रोवाइडरस को नेस्ट करते है, आप इन्फ़र्मेशन को "जमा" कर सकते हो. इस उदाहरण मे, `Section` कौम्पोनॅन्ट `LevelContext` पर नज़र रखता है जो विशेष रूप से सेक्शन नेस्टिंग की गहराई कहता है.यह पैरेंट section से `LevelContext` को पढ़ता है और `LevelContext` को एक से बढ़ा कर अपने बच्चों को देता है. नतीजतन, `Heading` कौम्पोनॅन्ट खुद ब खुद फ़ैसला ले सकता है कि `<h1>`, `<h2>`, `<h3>`, ..., मे से कौनसा टैग इस्तेमाल करना है और कितने `Section` कौम्पोनॅन्ट्स के अंदर नेस्टेड है.

Read a [detailed walkthrough](/learn/passing-data-deeply-with-context) of this example.
इस उदाहरण का [विस्तृत walkthrough](/learn/passing-data-deeply-with-context) पढ़िए.

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

```js Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

```js Heading.js
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

```js LevelContext.js
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

### Optimizing री-renders when passing objects and functions {/*optimizing-री-renders-when-passing-objects-and-functions*/}
### री-रेंडर को ऑप्टिमायज़ करना जब ऑब्जेक्ट और फ़ंक्शन पास किये जाते है. {/*optimizing-री-renders-when-passing-objects-and-functions*/}

You can pass any values via context, including objects and functions.
Context द्वारा आप कोई भी वैल्यू पास कर सकते है, ऑब्जेक्ट और फ़ंक्शन समेत.

```js [[2, 10, "{ currentUser, login }"]]
function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  function login(response) {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      <Page />
    </AuthContext.Provider>
  );
}
```

Here, the <CodeStep step={2}>context value</CodeStep> is a JavaScript object with two properties, one of which is a function. Whenever `MyApp` री-renders (for example, on a route update), this will be a *different* object pointing at a *different* function, so React will also have to री-render all components deep in the tree that call `useContext(AuthContext)`.

यहा पे, <CodeStep step={2}>context वैल्यू</CodeStep> एक जावास्क्रिप्ट object है जिसके दो गुण है, जिसमे से एक फ़ंक्शन है. जब भी `MyApp` री-रेंडर होता है (उदाहरण मे, किसी रूट का अप्डेट होना), यह एक *अलग* ऑब्जेक्ट होगा जो *अलग* फ़ंक्शन को पोईँट करता है. तो react को ट्री के गहराई मे सारे कौम्पोनॅन्ट्स जो `useContext(AuthContext)` बुलाते है उन्हें री-रेंडर करना होगा.

In smaller apps, this is not a problem. However, there is no need to री-render them if the underlying data, like `currentUser`, has not changed. To help React take advantage of that fact, you may wrap the `login` function with [`useCallback`](/apis/usecallback) and wrap the object creation into [`useMemo`](/apis/usememo). This is a performance optimization:

छोटे ऍप्स मे यह एक समस्या नही है. लेकिन, जब कोई आधारभूत डेटा , जैसे `currentUser`, का वैल्यू बदला नही तो उसे री-रेंडर करने कि ज़रूरत नही है. React को उसका फ़ायदा उठाने मे मदद करने के लिए, आप `login` function को [`useCallback`](/apis/usecallback) के साथ रैप कर सकते है और ऑब्जेक्ट क्रीएशन [`useMemo`](/apis/usememo) के सात. यह एक पर्फ़ॉर्मन्स ऑप्टिमायज़ेशन है:


```js {1,6-9,11-14}
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
    <AuthContext.Provider value={contextValue}>
      <Page />
    </AuthContext.Provider>
  );
}
```

The `login` function does not use any information from the render scope, so you can specify an empty array of dependencies. The `contextValue` object consists of `currentUser` and `login`, so it needs to list both as dependencies. As a result of this change, the components calling `useContext(AuthProvider)` won't need to री-render unless `currentUser` changes. Read more about [skipping री-renders with memoization](TODO).

`login` फ़ंक्शन रेंडर स्कोप का कोई भी इन्फ़र्मेशन यूज़ नही करता, तो आप डिपेंडेन्सीज़ की एक ख़ाली अरे उल्लेखित कर सकते है. `contextValue` `currentUser` और `login` से बना हुआ है,तो उसे दोनो को डिपेंडेन्सीज़ के रूप मे सूचित करना होगा. इस चेंज के नतीजतन, `useContext(AuthProvider)`को बुलाने वाले कौम्पोनॅन्ट्स को tab तक री-रेंडर नही करना होगा जब तक `currentUser` नही बदलता. [मेमोइजाशन के साथ रि-रेंडर को स्किप करना](TODO) के बारे मे पढ़िए.

---

## Reference {/*reference*/}

### `useContext(SomeContext)` {/*usecontext*/}

Call `useContext` at the top level of your component to read and subscribe to [context](/learn/passing-data-deeply-with-context).

[context](/learn/passing-data-deeply-with-context) को padne और subscribe करने के लिए, `useContext` को सबसे uupri level पे bulaaye.

```js
import { useContext } from 'react';

function MyComponent() {
  const theme = useTheme(ThemeContext);
  // ...
```

[See more examples above.](#examples-basic)
[और उदाहरण के लिए, ऊपर देखिए](#examples-basic)

#### परामीटेर {/*parameters*/}

* `SomeContext`: The context that you've previously created with [`createContext`](/api/createcontext). The context itself does not hold the information, it only represents the kind of information you can provide or read from components.

* `SomeContext`: वहाँ context जो आपने पहले [`createContext`](/api/createcontext) के साथ बनाया था. अपने आप मे context मे कोई जानकारी नही है, वह सिर्फ प्रतिनिधित्व करता है जानकारी का प्रकार जो कौम्पोनॅन्ट से पढ़ या दे सकते हो.

#### Returns {/*returns*/}

`useContext` returns the context value for the calling component. It is determined as the `value` passed to the closest `SomeContext.Provider` above the calling component in the tree. If there is no such provider, then the returned value will be the `defaultValue` you have passed to [`createContext`](/api/createcontext) for that context. The returned value is always up-to-date. React automatically री-renders components that read some context if it changes.

`useContext` बुलाने वाले कौम्पोनॅन्ट को context वैल्यू रिटर्न करता है. ट्री मे बुलाने वाले कौम्पोनॅन्ट के सबसे नज़दीक `SomeContext.Provider` मे पास किया गया `value` को निर्धारित किया जाता है.

#### चेतावनी {/*caveats*/}

* `useContext()` call in a component is not affected by providers returned from the *same* component. The corresponding `<Context.Provider>` **needs to be *above*** the component doing the `useContext()` call.

* किसी भी कौम्पोनॅन्ट मे `useContext()` का कॉल *उसी* कौम्पोनॅन्ट के प्रोवाइडरस से प्रभावित नही है. उसके कॉरेस्पॉंडिंग मे `<Context.Provider>` को `useContext()` बुलाने वाले कौम्पोनॅन्ट के ***उपर* होना ही चाहिए।**.

* React **automatically री-renders** all the children that use a particular context starting from the provider that receives a different `value`. The previous and the next values are compared with the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. Skipping री-renders with [`memo`](/apis/memo) does not prevent the children receiving fresh context values from above.

* React सारे बच्चे को **auto matically री-रेंडर करता है** जो पर्टिक्युलर context का इस्तेमाल करते है उस प्रोवाइडर से शुरू करता है जिससे `value` का अलग वैल्यू मिलता है. पहले का और अगला वैल्यू को [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) के साथ तुलना की जाती है.

* If your build system produces duplicates modules in the output (which can happen if you use symlinks), this can break context. Passing something via context only works if `SomeContext` that you use to provide context and `SomeContext` that you use to read it are ***exactly* the same object**, as determined by a `===` comparison.

* अगर आपका बिल्ड सिस्टम आउट्पुट में डूप्लिकेट मोडयूल मे प्रडूस करता है (अगर symlinks इस्तेमाल करते हो तो हो सकता है), यह context तोड़ सकता है. Context द्वारा पास करना सिर्फ टैब काम करता है जब आपके द्वारा उपयोग किया गया `SomeContext` प्रोवाइड करने के लिए और `SomeContext` पढ़ने के लिए ***इग्ज़ैक्ट्ली* एक ही ऑब्जेक्ट के है** जो `===` तुलना से निर्धारित किया जाता है.

---

## Troubleshooting {/*troubleshooting*/}
## ट्रबल्शूटिंग {/*troubleshooting*/}

### My component doesn't see the value from my provider {/*my-component-doesnt-see-the-value-from-my-provider*/}
### मेरा कौम्पोनॅन्ट को प्रोवाइडर का वैल्यू नही दिख रहा {/*my-component-doesnt-see-the-value-from-my-provider*/}

There are a few common ways that this can happen:
यह बहुत कम और आम तरीक़े है जिससे यह हो सकता है:

1. You're rendering `<SomeContext.Provider>` in the same component (or below) as where you're calling `useContext()`. Move `<SomeContext.Provider>` *above and outside* the component calling `useContext()`.

1. आप `<SomeContext.Provider>` को usi (या उसके नीचे) कौम्पोनॅन्ट मे रेंडर कर रहे है जहाँ आप `useContext()` को बुला रहे है. `<SomeConterx.Provider>` को `useContext()` को बुलाने वाले कौम्पोनॅन्ट के *उपर और बाहर * मूव कीजिए.

2. You may have forgotten to wrap your component with `<SomeContext.Provider>`, or you might have put it in a different part of the tree than you thought. Check whether the hierarchy is right using [React DevTools](/learn/react-developer-tools).

2.आप अपने कौम्पोनॅन्ट `<SomeContext.Provider>` के साथ रैप करना भूल गए होंगे या फ़िर ट्री के किसी और हिस्से मे रखा होगा. [React DevTools](/learn/react-developer-tools) के सहयोग से जाँच करे यदि आपकी पदानुक्रम सही है.

3. You might be running into some build issue with your tooling that causes `SomeContext` as seen from the providing component and `SomeContext` as seen by the reading component to be two different objects. This can happen if you use symlinks, for example. You can verify this by assigning them to globals like `window.SomeContext1` and `window.SomeContext2` and then checking whether `window.SomeContext1 === window.SomeContext2` in the console. If they're not the same, you need to fix that issue on the build tool level.

3. आप अपने टूलिंग के साथ किसी बिल्ड इशू को एंकाउंटर कर रहे होंगे जिसके कारण `SomeContext` देने वाले कौम्पोनॅन्ट और पढ़ने वाले कौम्पोनॅन्ट को अलग-अलग आब्जेक्ट्स दिख रहे होंगे. उदाहरण के लिए, यह symlinks उसे करने से हो सकता है. वेरिफ़ाई करने के लिए, आप उन्हें ग्लोबलस असाइन करिए जैसे `window.SomeContext1` and `window.SomeContext2` और फ़िर कान्सोल मे चेक करिए यदि `window.SomeContext1 === window.SomeContext2`. यदि वहाँ दोनो समान नही है तो आपको यह इशू बिल्ड टूल लेवल पर फ़िक्स करना होगा.

### I am always getting `undefined` from my context although the default value is different {/*i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different*/}
### मुझे मेरे context से हमेशा `undefined` मिल रहा है जबकि डिफ़ॉल्ट वैल्यू अलग है {/*i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different*/}
You might have a provider without a `value` in the tree:
आपके tree मे एक प्रोवाइडर होगा जिसका `value` नही है.

```js {1,2}
// 🚩 Doesn't work: no value prop
// 🚩 काम नही करता: वैल्यू prop नही है
<ThemeContext.Provider>
   <Button />
</ThemeContext.Provider>
```

If you forget to specify `value`, it's like passing `value={undefined}`.

अगर आप `value` को स्पष्ट रूप से नही पास करते to `value={undefined}` को पास करने के बराबर हुआ.

You may have also mistakingly used a different prop name by mistake:
आपने गलती से कोई और prop नेम का इस्तेमाल किया होगा.

```js {1,2}
// 🚩 Doesn't work: prop should be called "value"
// 🚩 काम नही करता: prop का नाम "value" होना चाहिए
<ThemeContext.Provider theme={theme}>
   <Button />
</ThemeContext.Provider>
```

In both of these cases you should see a warning from React in the console. To fix them, call the prop `value`:

इन दोनो केस मे आपको कान्सोल मे React से एक चेतावनी मिलनी चाहिए. इसे फ़िक्स करने के लिए, `value` prop को बुलाए:

```js {1,2}
// ✅ Passing the value prop
// ✅ वैल्यू prop को पास करना
<ThemeContext.Provider value={theme}>
   <Button />
</ThemeContext.Provider>
```

Note that the [default value from your `createContext(defaultValue)` call](#specifying-a-fallback-default-value) is only used **if there is no matching provider above at all.** If there is a `<SomeContext.Provider value={undefined}>` component somewhere in the parent tree, the component calling `useContext(SomeContext)` *will* receive `undefined` as the context value.

अंदर रखे कि [आपके `createContext(defaultValue)`कॉल की डिफ़ॉल्ट वैल्यू](#specifying-a-fallback-default-value) तब ही यूज़ होती है जब **उपर कोई भी मैचिंग प्रोवाइडर नही है.** अगर पैरेंट ट्री मे कहीं पर कोई `<SomeContext.Provider value={undefined}>` कौम्पोनॅन्ट है to `useContext(SomeContext)` को बुलाने वाला कौम्पोनॅन्ट context वैल्यू `undefined` *ही* मिलेगा.
