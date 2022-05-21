---
title: useContext
---

<Intro>

`useContext` is a React Hook that lets you read and subscribe to [context](/learn/passing-data-deeply-with-context) from your component.

`useContext` एक React Hook है जो आपको आपके component से context padh कर

```js
const value = useContext(SomeContext)
```

</Intro>

- [Usage](#usage)
  - [Passing data deeply into the tree](#passing-data-deeply-into-the-tree)
  - [Updating data passed via context](#updating-data-passed-via-context)
  - [Specifying a fallback default value](#specifying-a-fallback-default-value)
  - [Overriding context for a part of the tree](#overriding-context-for-a-part-of-the-tree)
  - [Optimizing re-renders when passing objects and functions](#optimizing-re-renders-when-passing-objects-and-functions)
- [Reference](#reference)
  - [`useContext(SomeContext)`](#usecontext)
- [Troubleshooting](#troubleshooting)
  - [My component doesn't see the value from my provider](#my-component-doesnt-see-the-value-from-my-provider)
  - [I am always getting undefined from my context although the default value is different](#i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different)

---

## Usage {/*usage*/}


### _data_ ko tree ki gahrai tak pass karna {/*passing-data-deeply-into-the-tree*/}

Call `useContext` at the top level of your component to read and subscribe to [context](/learn/passing-data-deeply-with-context).

[context](/learn/passing-data-deeply-with-context) ko padhne aur subscribe karne ke liye, `useContext` ko component ke sabse upari level pe bulaaye.

```js [[2, 4, "theme"], [1, 4, "ThemeContext"]]
import { useContext } from 'react';

function Button() {
  const theme = useContext(ThemeContext);
  // ...
```

`useContext` returns the <CodeStep step={2}>context value</CodeStep> for the <CodeStep step={1}>context</CodeStep> you passed. To determine the context value, React searches the component tree and finds **the closest context provider above** for that particular context.

`useContext` आपके dwaara pass kiya gaya <CodeStep step={1}>context</CodeStep> ka <CodeStep step={2}>context value</CodeStep> return karta hai. Context value ko determine karne ke liye, React component tree me kisi bhi context ke liye **sabse nasdeek context provider** ko doondhtha hai.

To pass context to a `Button`, wrap it or one of its parent components into the corresponding context provider:

`Button` me context pass karne ke liye, hum usse ya usske parent component ko uske tadanusaar context provider me wrap karte hai.

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

isse koi farak nahi padta ki provider aur `Button` ke pich me kitne layers hai. Jab `Form` ke andar kahi bhi koi `Button` `useContext(ThemeContext)` ko bulaata hai, usse value ki roop pr  `"dark"` milega.

<Gotcha>

`useContext()` always looks for the closest provider *above* the component that calls it. It searches upwards and **does not** consider providers in the component from which you're calling `useContext()`.

`useContext()` hamesha sabse nasdeek provider apne bulaane waale component ke upar doondtha hai. Ye hamesha upar ki aur doondtha hai aur jis componenet se `useContext()` bula rahe ho uske context provider ko consider **nahi karta**.

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
### Context dwaara pass kiya gaya data ko update karna {/*updating-data-passed-via-context*/}

Often, you'll want the context to change over time. To update context, you need to combine it with [state](/apis/usestate). Declare a state variable in the parent component, and pass the current state down as the <CodeStep step={2}>context value</CodeStep> to the provider.

Akhsar aap chahenge ki context samay ke saath badle. Context update karne ke liye, aap ko usse [state](/apis/usestate) ke saath jodna hoga. parent component me state variable declare कर, aur current state ko <CodeStep step={2}>context value</CodeStep> ke roop me niche provider ko pass kare.

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

Now any `Button` inside of the provider will receive the current `theme` value. If you call `setTheme` to update the `theme` value that you pass to the provider, all `Button` components will re-render with the new `'light'` value.

Kisi bhi `Button` ke andar ke provider ko abhi ka `theme` value milega. Agar aap `setTheme` ko bulaate hai `theme` ka value update karne ke liye jo aap provider ko pass karte hai, to saare `Button` ke components re-render honge naye `light` value ke saath.

<Recipes titleText="Examples of updating context / Context update karne ke udharan" titleId="examples-basic">

### Updating a value via context {/*updating-a-value-via-context*/}
### Context dwaara value ko update karna {/*updating-a-value-via-context*/}

In this example, the `MyApp` component holds a state variable which is then passed to the `ThemeContext` provider. Checking the "Dark mode" checkbox updates the state. Changing the provided value re-renders all the components using that context.

Is udhaaran me `MyApp` component me ek state variable hai jo `ThemeContext` provider me pass kiya jata hai. "Dark mode" checkbox ko check karne se state update hota hai. diye gaye value ko badalne se uss context ko USE karke saare components re-render hote hai.

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

Dhyaan dijiye ki `value="dark"` `"dark"` string ko pass karta hai lekin `value={theme}` JavaScipt ka `theme` variable ka value pass karta hai [JSX curly braces](/learn/javascript-in-jsx-with-curly-braces) ke saath. Curly braces aapko wo context value pass karne dete hai jo strings nahi hai.

<Solution />

### Updating an object via context {/*updating-an-object-via-context*/}
### Context dwaara object ko update karna {/*updating-an-object-via-context*/}

In this example, there is a `currentUser` state variable which holds an object. You combine `{ currentUser, setCurrentUser }` into a single object and pass it down through the context inside the `value={}`. This lets any component below, such as `LoginButton`, read both `currentUser` and `setCurrentUser`, and then call `setCurrentUser` when needed.

Is udhaaran me ek `currentUser` state variable jisme ek object hai. aap `{ currentUser, setCurrentUser }` ko ek single object me combine कर usse context pass karte hai `value={}` ke andar. Ye koi bhi nichli component jaise `LoginButton`, dono `currentUser` aur `setCurrentUser` ko padte hai, aur phir zaroorat ke anusaar `setCurrentUser` ko bulaate hai.

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
### Multiple contexts {/*multiple-contexts*/}

In this example, there are two independent contexts. `ThemeContext` provides the current theme, which is a string, while `CurrentUserContext` holds the object representing the current user.

Is udhaaran me do independent context hai. `ThemeContext` abhi ka theme deta hai string ke roop me, jabki `CurrentUserContext` ek object hold karta hai jo current user ko represent karta hai.

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
### Extracting providers to a component {/*extracting-providers-to-a-component*/}

As your app grows, it is expected that you'll have a "pyramid" of contexts closer to the root of your app. There is nothing wrong with that. However, if you dislike the nesting aesthetically, you can extract the providers into a single component. In this example, `MyProviders` hides the "plumbing" and renders the children passed to it inside the necessary providers. Note that the `theme` and `setTheme` state is needed in `MyApp` itself, so `MyApp` still owns that piece of the state.

Jaise आपका app grow karta hai, ye umeed hoti hai ki app ke root ke nasdeek context ka "pyramid" hoga. Isme kuch galata nahi hai. Lekin agar aapko nesting saundarya ki drishti se pasand nahi, aap ek hi component me providers ko extract कर sakte hai. Is udhaaran me, `MyProviders`"plumbing" ko chupatha hai and saare children jo apne zaroorat ke providers ke andar pass kiye gaye hai usse render karta hai. Dhyaan rakha ki `theme` aur `setTheme` state ki zaroorat `MyApp` me hi hai, to `MyApp` ab bhi us state ka maalik hai.

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
### Reducer aur context ke saath scale karna {/*scaling-up-with-context-and-a-reducer*/}

In larger apps, it is common to combine context with a [reducer](/apis/usereducer) to extract the logic related to some state out of components. In this example, all the "wiring" is hidden in the `TasksContext.js`, which contains a reducer and two separate contexts.

Bade apps me ye samaanya baath hai ki context ko [reducer](/apis/usereducer) ke saath combine karna taaki components se logic extract कर sake jo kisi state se संबंधित hai.

Read a [full walkthrough](/learn/scaling-up-with-reducer-and-context) of this example.
Is udhaaran ka [pura walkthrough](/learn/scaling-up-with-reducer-and-context) padhiye.

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

### Specifying a fallback default value {/*specifying-a-fallback-default-value*/}

If React can't find any providers of that particular <CodeStep step={1}>context</CodeStep> in the parent tree, the context value returned by `useContext()` will be equal to the <CodeStep step={3}>default value</CodeStep> that you specified when you [created that context](/api/createcontext):
Agar React us विशिष्ट (particular) <CodeStep step={1}>context</CodeStep> ka providers parent tree me naa doondh paye, to `useContext()` dwaara return kiya gaya context value [context banate samay](/api/createcontext) rakhe gaye <CodeStep step={3}>default value</CodeStep> ke samaan hoga:

```js [[1, 1, "ThemeContext"], [3, 1, "null"]]
const ThemeContext = createContext(null);
```

The default value **never changes**. If you want to update context, use it with state as [described above](#updating-data-passed-via-context).
Default value kabhi **badalta nahi hai**. Agar aapko context update karna hai to usse state ke saath [aise use kare](#updating-data-passed-via-context).

Often, instead of `null`, there is some more meaningful value you can use as a default, for example:
Akhsar `null` ki jagah aur bhi saarthak value hai jo aap default ke roop me istemaal कर sakte hai, udhaaran:

```js [[1, 1, "ThemeContext"], [3, 1, "light"]]
const ThemeContext = createContext('light');
```

This way, if you accidentally render some component without a corresponding provider, it won't break. This also helps your components work well in a test environment without setting up a lot of providers in the tests.
is tarah, agar app galati se koi component bina provider ke render karte hai, to wo tootega nahi. Ye आपके components ko sahi se test environment kaam karne deta hai test me adhik providers ko set up kiye bagair.

In the example below, the "Toggle theme" button is always light because it's **outside any theme context provider** and the default context theme value is `'light'`. Try editing the default theme to be `'dark'`.
Niche diye gaye udhaaran me, "Toggle theme" button hamesha /light/ rehta hai kyunki ye **kisi bhi context provider ke bahar hai** aur default context me theme value `'light'` hai. Default theme ko `'dark'` edit karne ki koshish kare.

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
### Tree ke hissa ke liye context override karna {/*overriding-context-for-a-part-of-the-tree*/}

You can override the context for a part of the tree by wrapping that part in a provider with a different value.
Aap tree ke kisi bhi hisse ka context override कर sakte hai us hisse ko ek provider me wrap karke jiska dusra value hai.

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
aap providers ko nest aur override जितनी बार आपको आवश्यकता हो कर sakte ho.

<Recipes title="Examples of overriding context/ Context ko override karne ke udhaaran">

### Overriding a theme {/*overriding-a-theme*/}

Here, the button *inside* the `Footer` receives a different context value (`"light"`) than the buttons outside (`"dark"`).
yaha, `Footer` ke *andar* jo button hai usse bahar ke buttons (`"dark"`) se alag context value(`"light"`) milta hai.

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

Jab aap context providers ko nest karte hai, aap information ko "जमा" कर sakte ho. Is udhaaran me, `Section` component `LevelContext` pe nazar rakhta hai jo vishesh roop se section nesting ki gahrai kahta hai.Yah parent section se `LevelContext` ko padhta hai aur `LevelContext` ko ek se badhake apne baccho ko deta hai. नतीजतन, `Heading` component खुद ब खुद fesla le sakta hai ki `<h1>`, `<h2>`, `<h3>`, ..., me se kaunsa tegs istemaal karna hai aur kitne `Section` components ke andar nested hai.

Read a [detailed walkthrough](/learn/passing-data-deeply-with-context) of this example.
Is udhaaran ka [विस्तृत walkthrough](/learn/passing-data-deeply-with-context) padhiye.

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

### Optimizing re-renders when passing objects and functions {/*optimizing-re-renders-when-passing-objects-and-functions*/}
### Re-render ko optimize karna jab objects aur functions pass kiye jaate hai. {/*optimizing-re-renders-when-passing-objects-and-functions*/}

You can pass any values via context, including objects and functions.
Context dwaara aap koi bhi value pass कर sakte hai, objects aur functions समेत.

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

Here, the <CodeStep step={2}>context value</CodeStep> is a JavaScript object with two properties, one of which is a function. Whenever `MyApp` re-renders (for example, on a route update), this will be a *different* object pointing at a *different* function, so React will also have to re-render all components deep in the tree that call `useContext(AuthContext)`.

yaha pe, <CodeStep step={2}>context value</CodeStep> ek JavaScript object hai jiske do गुण hai, jisme se ek function hai. Jab bhi `MyApp` re-render hota hai (udhaaran me, kisi route ka update hona), ye ek *alag* object hoga jo *alag* function ko point karta hai. To React ko tree ke gahrai me saare components jo `useContext(AuthContext)` bulaate hai unhe re-render karna hoga.

In smaller apps, this is not a problem. However, there is no need to re-render them if the underlying data, like `currentUser`, has not changed. To help React take advantage of that fact, you may wrap the `login` function with [`useCallback`](/apis/usecallback) and wrap the object creation into [`useMemo`](/apis/usememo). This is a performance optimization:

Chotte apps me ye ek problem nahi hai. Lekin, jab koi आधारभूत data, jaise `currentUser`, ka value badla nahi to usse re-render karne ki zaroorat nahi hai. React ko uska fayda utane me madad karne ke liye, aap `login` function ko [`useCallback`](/apis/usecallback) ke saaath wrap कर sakte hai aur object creation [`useMemo`](/apis/usememo) ke saath. Ye ek performance optimization:


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

The `login` function does not use any information from the render scope, so you can specify an empty array of dependencies. The `contextValue` object consists of `currentUser` and `login`, so it needs to list both as dependencies. As a result of this change, the components calling `useContext(AuthProvider)` won't need to re-render unless `currentUser` changes. Read more about [skipping re-renders with memoization](TODO).

`login` function render scope ka koi bhi information use nahi karta, to aap dependencies ki ek khali array उल्लिखित कर sakte hai. `contextValue` `currentUser` aur `login` se bana hua hai, to usse dono ko dependencies ke roop me सूचीt karna hoga. Is change ke नतीजतन, `useContext(AuthProvider)`ko bulaane waale components ko tab tak re-render nahi karna hoga jab tak `currentUser` nahi badalta. [memoization ke saath re-renders ko skip karna](TODO) ke baare me padhiye.

---

## Reference {/*reference*/}

### `useContext(SomeContext)` {/*usecontext*/}

Call `useContext` at the top level of your component to read and subscribe to [context](/learn/passing-data-deeply-with-context).

[context](/learn/passing-data-deeply-with-context) ko padne aur subscribe karne ke liye, `useContext` ko sabse uupri level pe bulaaye.

```js
import { useContext } from 'react';

function MyComponent() {
  const theme = useTheme(ThemeContext);
  // ...
```

[See more examples above.](#examples-basic)
[Aur udhaaran ke liye, uupar dekhiye](#examples-basic)

#### Parameters {/*parameters*/}

* `SomeContext`: The context that you've previously created with [`createContext`](/api/createcontext). The context itself does not hold the information, it only represents the kind of information you can provide or read from components.

* `SomeContext`: Vaha context jo aapne pehle [`createContext`](/api/createcontext) ke saath banaaya tha. Apne aap me context me koi information nahi hai, wo sirf represent karta hai information ka kind jo component se padh ya de sakte ho.

#### Returns {/*returns*/}

`useContext` returns the context value for the calling component. It is determined as the `value` passed to the closest `SomeContext.Provider` above the calling component in the tree. If there is no such provider, then the returned value will be the `defaultValue` you have passed to [`createContext`](/api/createcontext) for that context. The returned value is always up-to-date. React automatically re-renders components that read some context if it changes.

`useContext` bulaane waale component ko context value return karta hai. Tree me bulaane waale component ke sabse nasdeek `SomeContext.Provider` me pass kiya gaya `value` ko determine kiya jaata hai.

#### Caveats {/*caveats*/}

* `useContext()` call in a component is not affected by providers returned from the *same* component. The corresponding `<Context.Provider>` **needs to be *above*** the component doing the `useContext()` call.

* kisi bhi component me `useContext()` ka call *ussi* component ke providers se affected nahi hai. Uske corresponding me `<Context.Provider>` ko `useContext()` bulaane waale component ke ***upar* hona hi chaiye**.

* React **automatically re-renders** all the children that use a particular context starting from the provider that receives a different `value`. The previous and the next values are compared with the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. Skipping re-renders with [`memo`](/apis/memo) does not prevent the children receiving fresh context values from above.

* React saare bacche ko **auto matically re-render karta hai** jo particular context ka istemaal karte hai us provider se shuru karta hai jisse `value` ka alag value milta hai. Pehle ka aur agla value ko [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) ke saath compare kiya jaata hai.

* If your build system produces duplicates modules in the output (which can happen if you use symlinks), this can break context. Passing something via context only works if `SomeContext` that you use to provide context and `SomeContext` that you use to read it are ***exactly* the same object**, as determined by a `===` comparison.

* Agar आपका build system duplicate module output me produce karta hai (agar symlinks karte ho to ho sakta hai), ye context tod sakta hai. Context dwaara pass karna sirf tab kaam karta hai jab आपके dwaare use kiya gaya `SomeContext` provide karne ke liye aur `SomeContext` padne ke liye ***exactly* ek hi object ke hai** jo `===` comparison se determine kiya jaa tha hai.

---

## Troubleshooting {/*troubleshooting*/}
## Troubleshooting {/*troubleshooting*/}

### My component doesn't see the value from my provider {/*my-component-doesnt-see-the-value-from-my-provider*/}
### Mera component ko provider ka value nahi dikh raha {/*my-component-doesnt-see-the-value-from-my-provider*/}

There are a few common ways that this can happen:
Ye bahut kam aur aam tarike hai jisse ye ho sakta hai:

1. You're rendering `<SomeContext.Provider>` in the same component (or below) as where you're calling `useContext()`. Move `<SomeContext.Provider>` *above and outside* the component calling `useContext()`.

1. Aap `<SomeContext.Provider>` ko usi (ya uske niche) component me render कर rahe hai jaha aap `useContext()` ko bula rahe hai. `<SomeConterx.Provider>` ko `useContext()` ko bulaane waale component ke *upar aur bahar* move kijiye.

2. You may have forgotten to wrap your component with `<SomeContext.Provider>`, or you might have put it in a different part of the tree than you thought. Check whether the hierarchy is right using [React DevTools](/learn/react-developer-tools).

2.Aap apne component `<SomeContext.Provider>` ke saath wrap karna bhul gaye honge ya phir tree ke kisi aur hisse me rakha hoga. [React DevTools](/learn/react-developer-tools) ke sahyod se check kare yadi आपका hierarchy sahi hai.

3. You might be running into some build issue with your tooling that causes `SomeContext` as seen from the providing component and `SomeContext` as seen by the reading component to be two different objects. This can happen if you use symlinks, for example. You can verify this by assigning them to globals like `window.SomeContext1` and `window.SomeContext2` and then checking whether `window.SomeContext1 === window.SomeContext2` in the console. If they're not the same, you need to fix that issue on the build tool level.

3. Aap apne tooling ke saath kisi build issue ko encounter कर rahe honge jiske कारण `SomeContext` dene waale component aur padne waale component ko alag-alag objects dikh rahe honge. udhaaran ke liye, ye symlinks use karne se ho sakta hai. Veriy karne ke liye, aap unhe globals assign kariye jaise `window.SomeContext1` and `window.SomeContext2` aur phir console me check kariye yadi `window.SomeContext1 === window.SomeContext2`. Yadi vaha dono same nahi hai to aapko yh issue build tool level pe fix karna hoga.

### I am always getting `undefined` from my context although the default value is different {/*i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different*/}
### Mujhe mere context se hamesha `undefined` mil raha hai jabki default value alag hai {/*i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different*/}
You might have a provider without a `value` in the tree:
आपके tree me ek provider hoga jiska `value` nahi hai.

```js {1,2}
// 🚩 Doesn't work: no value prop
// 🚩 Kaam nahi karta: value prop nahi hai
<ThemeContext.Provider>
   <Button />
</ThemeContext.Provider>
```

If you forget to specify `value`, it's like passing `value={undefined}`.

Agar aap `value` ko spasht roop se nahi pass karte to `value={undefined}` ko pass karne ke bara bar hua.

You may have also mistakingly used a different prop name by mistake:
Aap ne galti se koi aur prop name ka istemaal kiya hoga.

```js {1,2}
// 🚩 Doesn't work: prop should be called "value"
// 🚩 Kaam nahi karta: prop ka naam "value" hona chahiye
<ThemeContext.Provider theme={theme}>
   <Button />
</ThemeContext.Provider>
```

In both of these cases you should see a warning from React in the console. To fix them, call the prop `value`:

In dono case me aapko console me React se ek warning milna chahiye. Isse fix karne ke liye, `value` prop ko bulaaye:

```js {1,2}
// ✅ Passing the value prop
// ✅ Value prop ko pass karna
<ThemeContext.Provider value={theme}>
   <Button />
</ThemeContext.Provider>
```

Note that the [default value from your `createContext(defaultValue)` call](#specifying-a-fallback-default-value) is only used **if there is no matching provider above at all.** If there is a `<SomeContext.Provider value={undefined}>` component somewhere in the parent tree, the component calling `useContext(SomeContext)` *will* receive `undefined` as the context value.

Dhyaan rakhe ki [आपके `createContext(defaultValue)` call ki default value](#specifying-a-fallback-default-value) tab hi use hoti hai jab **upar koi bhi matching provider nahi hai.** Agar parent tree me kahi pe koi `<SomeContext.Provider value={undefined}>` component hai to `useContext(SomeContext)` ko bulaane waala component context value `undefined` *hi* milega.
