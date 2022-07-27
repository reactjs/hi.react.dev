---
title: useReducer
---

<Intro>

`useReducer` is a React Hook that lets you add a [reducer](/learn/extracting-state-logic-into-a-reducer) to your component.

`useReducer` एक React Hook है जो आपको अपने कौम्पोनॅन्ट में एक [रेडूसर](/learn/extracting-state-logic-into-a-reducer) ऐड करने देता है.

```js
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

</Intro>

- [Usage](#usage)
  - [Adding a reducer to a component](#adding-a-reducer-to-a-component)
  - [Writing the reducer function](#writing-the-reducer-function)
  - [Avoiding recreating the initial state](#avoiding-recreating-the-initial-state)
- [Reference](#reference)
  - [`useReducer(reducer, initialArg, init?)`](#usereducer)
  - [`dispatch` functions](#dispatch)
- [Troubleshooting](#troubleshooting)
  - [I've dispatched an action, but logging gives me the old state value](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value)
  - [I've dispatched an action, but the screen doesn't update](#ive-dispatched-an-action-but-the-screen-doesnt-update)
  - [A part of my reducer state becomes undefined after dispatching](#a-part-of-my-reducer-state-becomes-undefined-after-dispatching)
  - [My entire reducer state becomes undefined after dispatching](#my-entire-reducer-state-becomes-undefined-after-dispatching)
  - [I'm getting an error: "Too many री-renders"](#im-getting-an-error-too-many-री-renders)
  - [My reducer or initializer function runs twice](#my-reducer-or-initializer-function-runs-twice)

---

## यूसेज {/*usage*/}

### Adding a reducer to a component {/*adding-a-reducer-to-a-component*/}
### कौम्पोनॅन्ट में एक रेडूसर ऐड करना {/*adding-a-reducer-to-a-component*/}

Call `useReducer` at the top level of your component to manage state with a [reducer](/learn/extracting-state-logic-into-a-reducer).

State को [रेडूसर](/learn/extracting-state-logic-into-a-reducer) के साथ प्रबंधित करने के लिए, अपने कौम्पोनॅन्ट के सबसे उपरी स्तर में `useReducer` को बुलाए.

```js [[1, 8, "state"], [2, 8, "dispatch"], [4, 8, "reducer"], [3, 8, "{ age: 42 }"]]
import { useReducer } from 'react';

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

`useReducer` returns an array with exactly two items:
`useReducer` एक अरे रिटर्न करता है जिसमे पूरी तरह से दो आइटम हैं:

1. The <CodeStep step={1}>current state</CodeStep> of this state variable, initially set to the <CodeStep step={3}>initial state</CodeStep> you provided.
1. इस state वेरिएबल का <CodeStep step={1}>करेंट state</CodeStep> जो शुरू में आपके द्वारा दिए गए <CodeStep step={3}>initial state</CodeStep> पर सेट है.
2. The <CodeStep step={2}>`dispatch` function</CodeStep> that lets you change it in response to interaction.
2. एक <CodeStep step={2}>`dispatch` function</CodeStep> जो आपको इंटरैक्शन के रेस्पॉन्स में बदलने देता है.

To update what's on the screen, call <CodeStep step={2}>`dispatch`</CodeStep> with an object representing what the user did, called an *action*:

स्क्रीन अप्डेट करने के लिए, <CodeStep step={2}>`dispatch`</CodeStep> को बुलाए *ऐक्शन*, एक ऐसा ऑब्जेक्ट जो रेप्रेज़ेंट करता है कि यूज़र ने क्या किया:

```js [[2, 2, "dispatch"]]
function handleClick() {
  dispatch({ type: 'incremented_age' });
}
```

React will pass the current state and the action to your <CodeStep step={4}>reducer function</CodeStep>. Your reducer will calculate and return the next state. React will स्टोर that next state, render your component with it, and update the UI.

आपके <CodeStep step={4}>रेडूसर फ़ंक्शन</CodeStep> में React अभी का state और ऐक्शन पास करेगा. आपका रेडूसर अगले state को कैल्क्युलेट कर उसे रिटर्न करेगा. React उस state को स्टोर करेगा, कौम्पोनॅन्ट को उसके साथ रेंडर कर UI को अप्डेट करेगा.

<Sandpack>

```js
import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (
    <>
      <button onClick={() => {
        dispatch({ type: 'incremented_age' })
      }}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack>

`useReducer` is very similar to [`useState`](/apis/usestate), but it lets you move the state update logic from event handlers into a single function outside of your component. Read more about [choosing between `useState` and `useReducer`](/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer).

`useReducer` और [`useState`](/apis/usestate) ज़्यादातर एक जैसे ही है लेकिन `useReducer` आपको event handlers से state अप्डेट लॉजिक एक सिंगल फ़ंक्शन में कौम्पोनॅन्ट के बाहर ले जाने देता है. [choosing between `useState` and `useReducer`](/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer) के बारे me और padhiye.

---

### Writing the reducer function {/*writing-the-reducer-function*/}
### रेडूसर फ़ंक्शन लिखना {/*writing-the-reducer-function*/}

A reducer function is declared like this:
किसी भी रेडूसर फ़ंक्शन सिर्फ डिक्लेर किया जाता है:

```js
function reducer(state, action) {
  // ...
}
```

Then you need to fill in the code that will calculate and return the next state. By convention, it is common to write it as a [`switch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch). For each `case` in the `switch`, you need to calculate and return some next state.

फ़िर आपको वह कोड लिखना होगा जो अगले state को कैल्क्युलेट कर रिटर्न करेगा. परम्परागत तरीक़े से, इससे [`switch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) के रूप में लिखना एक आम बात है. `switch` में आपको हर `case` के लिए अगला state कैल्क्युलेट करके रिटर्न करना होगा.

```js {4-7,10-13}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}
```

Actions can have any shape. By convention, it's common to pass objects with a `type` property identifying the action. It should include the minimal necessary information that the reducer needs to compute the next state.

ऐक्शंज़ का कोई भी आकार हो सकता है, परम्परागत रूप से, आब्जेक्ट्स को `type` प्रॉपर्टी (जो ऐक्शन को आयडेंटिफ़ाई करता है) के साथ पास किया जाता है. उसमें कम से कम और ज़रूरी जानकारी होनी चाहिए जिससे रेडूसर अगला state computer कर सके.
```js {5,9-12}
function Form() {
  const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });

  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    });
  }
  // ...
```

The action type names are local to your component. [Each action describes a single interaction, even if that leads to multiple changes in data](/learn/extracting-state-logic-into-a-reducer#writing-reducers-well). The shape of the state is arbitrary, but usually it'll be an object or an array.

ऐक्शन के प्रकार नाम आपके कौम्पोनॅन्ट के लोकल होते है. [हर एक ऐक्शन एक इंटरैक्शन वर्णित करता है, चाहे अगर उसमें के सारे डेटा परिवर्तित होगा](/learn/extracting-state-logic-into-a-reducer#writing-reducers-well). State का आकार मनमाना होता है, लेकिन आम तौर पर एक ऑब्जेक्ट होगा या फ़िर एक array होगा.

Read [extracting state logic into a reducer](/learn/extracting-state-logic-into-a-reducer) to learn more.
और जानने के लिए, [reducer me state logic extract करने ](/learn/extracting-state-logic-into-a-reducer) के बारे में पढ़िए.

<Gotcha>

State is read-only. Don't modify any objects or arrays in state:
State को आप सिर्फ पढ़ सकते है i.e. read-only. State के अंदर के आब्जेक्ट्स या arrays को संशोधित ना करे:

```js {4,5}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // 🚩 Don't mutate an object in state like this:
      state.age = state.age + 1;
      return state;
    }
```

Instead, always return new objects from your reducer:
बदले में, हमेशा अपने रेडूसर से नए आब्जेक्ट्स रिटर्न करना:

```js {4-8}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // ✅ Instead, return a new object
      return {
        ...state,
        age: state.age + 1
      };
    }
```

Read [updating objects in state](/learn/updating-objects-in-state) and [updating arrays in state](/learn/updating-arrays-in-state) to learn more.
और जानने के लिए, [updating arrays in state](/learn/updating-arrays-in-state) और [updating objects in state](/learn/updating-objects-in-state) के बारे में पढ़िए.

</Gotcha>

<Recipes titleText="Basic useReducer examples / useReducer के मूल उदाहरण" titleId="examples-basic">

### Form (object) {/*form-object*/}

In this example, the reducer manages a state object with two fields: `name` and `age`.
इस उदाहरण में, रेडूसर एक state को प्रबंधित कर रहा है जिसके दो विस्तार है: `name` और `age`.

<Sandpack>

```js
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

const initialState = { name: 'Taylor', age: 42 };

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    });
  }

  return (
    <>
      <input
        value={state.name}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>
        Increment age
      </button>
      <p>Hello, {state.name}. You are {state.age}.</p>
    </>
  );
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack>

<Solution />

### Todo list (array) {/*todo-list-array*/}

In this example, the reducer manages an array of tasks. The array needs to be updated [without mutation](/learn/updating-arrays-in-state).
इस उदाहरण में, रेडूसर टास्क के array को प्रबंधित कर रहा है. [बिना mutation](/learn/updating-arrays-in-state) के array को अप्डेट करना होगा.

<Sandpack>

```js App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

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

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];
```

```js AddTask.js hidden
import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Add</button>
    </>
  )
}
```

```js TaskList.js hidden
import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
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
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
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

### Writing concise update logic with Immer {/*writing-concise-update-logic-with-immer*/}
### Immer के साथ संक्षिप्त अप्डेट लॉजिक लिखना {/*writing-concise-update-logic-with-immer*/}

If updating arrays and objects without mutation feels tedious, you can use a library like [Immer](https://github.com/immerjs/use-immer#useimmerreducer) to reduce repetitive code. Immer lets you write concise code as if you were mutating objects, but under the hood it performs immutable updates:
यदि बिना परिवर्तन के array या आब्जेक्ट्स को अप्डेट करना है तो आप एक library जैसे [Immer](https://github.com/immerjs/use-immer#useimmerreducer) को दोहराए जाने वाले कोड कम करने के लिए इस्तेमाल कर सकते है. Immer आपको सिर्फ कोड लिखने देता है जैसे आप कोड परिवर्तित कर रहे हो लेकिन हुड के नीचे यह अपरिवर्तनीय अप्डेट पर्फ़ॉर्म करता है:

<Sandpack>

```js App.js
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex(t =>
        t.id === action.task.id
      );
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];
```

```js AddTask.js hidden
import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Add</button>
    </>
  )
}
```

```js TaskList.js hidden
import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
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
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
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

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

<Solution />

</Recipes>

---

### Avoiding recreating the initial state {/*avoiding-recreating-the-initial-state*/}
### Initial state को पुनः सृष्ट करने से बचना {/*avoiding-recreating-the-initial-state*/}

React saves the initial state once and ignores it on the next renders.
React initial state को एक बार सहेज कर रखता है और अगले रेंडर में उसे नज़रंदाज़ करता है.

```js
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, createInitialState(username));
  // ...
```

Although the result of `createInitialState(username)` is only used for the initial render, you're still calling this function on every render. This can be wasteful if it's creating large arrays or performing expensive calculations.

हालाँकि `createInitialState(username)` का परिणाम सिर्फ शुरूआती रेंडर के लिए इस्तेमाल किया जाता है, आप इस फ़ंक्शन फ़िर भी हर रेंडर पे bulaate है. अगर महंगे कैल्क्युलेशंज़ कर रहे है या बड़े बड़े arrays बना रहे है यह अपव्ययी हो सकता है.

To solve this, you may **pass it as an _initializer_ function** to `useReducer` as the third argument instead:
इससे हल करने के लिए, आप उसे `useReducer` में तीसरे वितर्क के स्थान पर **_इनिशिलीयसेर_ फ़ंक्शन के रूप में पास कर सकते है**.

```js {6}
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, username, createInitialState);
  // ...
```

Notice that you’re passing `createInitialState`, which is the *function itself*, and not `createInitialState()`, which is the result of calling it. This way, the initial state does not get री-created after initialization.

अंदर दीजिए कि आप `createInitialState` पास कर रहे है जो *फ़ंक्शन खुद* है लेकिन `createIntialState()` नहीं, जो कि फ़ंक्शन को बुलाने पर मिलनेवाला परिणाम है. इस तरीक़े से शुरुआती state इनिशलिज़ेशन के बाद री-क्रीएट नहीं होता.

In the above example, `createInitialState` takes a `username` argument. If your initializer doesn't need any information to compute the initial state, you may pass `null` as the second argument to `useReducer`.

उपर दिए गए उदाहरण में, `createIntialState` एक तर्क लेता है, `username`. अगर आपका इनिशीयलिसेर को initial state को कम्प्यूट करने के लिए किसी भी जानकारी की ज़रूरत नहीं है, तो आप `useReducer` के दूसरे तर्क के स्थान पर `null` पास कर सकते है.

<Recipes titleText="The difference between passing an initializer and passing the initial state directly / initializer pass करना और initial state pass करने me अंतर" titleId="examples-initializer">

### Passing the initializer function {/*passing-the-initializer-function*/}
### Intializer फ़ंक्शन पास करना {/*passing-the-initializer-function*/}

This example passes the initializer function, so the `createInitialState` function only runs during initialization. It does not run when component री-रेंडर्ज़, such as when you type into the input.

इस उदाहरण में इनिशीयलिसेर फ़ंक्शन पास किया जाता है,तो `createInitialState` फ़ंक्शन सिर्फ प्रारम्भ के दौरान चलता है. कौम्पोनॅन्ट री-रेंडर होने पर, जैसे इनपुट में टाइप करने पर, यह फ़ंक्शन नहीं चलता.
<Sandpack>

```js App.js hidden
import TodoList from './TodoList.js';

export default function App() {
  return <TodoList username="Taylor" />;
}
```

```js TodoList.js active
import { useReducer } from 'react';

function createInitialState(username) {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: username + "'s task #" + (i + 1)
    });
  }
  return {
    draft: '',
    todos: initialTodos,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'changed_draft': {
      return {
        draft: action.nextDraft,
        todos: state.todos,
      };
    };
    case 'added_todo': {
      return {
        draft: '',
        todos: [{
          id: state.todos.length,
          text: state.draft
        }, ...state.todos]
      }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

export default function TodoList({ username }) {
  const [state, dispatch] = useReducer(
    reducer,
    username,
    createInitialState
  );
  return (
    <>
      <input
        value={state.draft}
        onChange={e => {
          dispatch({
            type: 'changed_draft',
            nextDraft: e.target.value
          })
        }}
      />
      <button onClick={() => {
        dispatch({ type: 'added_todo' });
      }}>Add</button>
      <ul>
        {state.todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

<Solution />

### Passing the initial state directly {/*passing-the-initial-state-directly*/}
### intial state directly pass करना {/*passing-the-initial-state-directly*/}

This example **does not** pass the initializer function, so the `createInitialState` function runs on every render, such as when you type into the input. There is no observable difference in behavior, but this code is less efficient.

इस उदाहरण में इनिशलीयसेर फ़ंक्शन **नहीं**पास किया जाता,तो `createInitialState` फ़ंक्शन हर रेंडर पर चलता है, जैसे जब अब इनपुट में टाइप करते हैं. व्यवहारिक रूप से देखने पर कोई अंतर नही है लेकिन इस कोड की क्षमता कम हो जाती है.
<Sandpack>

```js App.js hidden
import TodoList from './TodoList.js';

export default function App() {
  return <TodoList username="Taylor" />;
}
```

```js TodoList.js active
import { useReducer } from 'react';

function createInitialState(username) {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: username + "'s task #" + (i + 1)
    });
  }
  return {
    draft: '',
    todos: initialTodos,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'changed_draft': {
      return {
        draft: action.nextDraft,
        todos: state.todos,
      };
    };
    case 'added_todo': {
      return {
        draft: '',
        todos: [{
          id: state.todos.length,
          text: state.draft
        }, ...state.todos]
      }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

export default function TodoList({ username }) {
  const [state, dispatch] = useReducer(
    reducer,
    createInitialState(username)
  );
  return (
    <>
      <input
        value={state.draft}
        onChange={e => {
          dispatch({
            type: 'changed_draft',
            nextDraft: e.target.value
          })
        }}
      />
      <button onClick={() => {
        dispatch({ type: 'added_todo' });
      }}>Add</button>
      <ul>
        {state.todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

<Solution />

</Recipes>

---

## Reference {/*reference*/}

### `useReducer(reducer, initialArg, init?)` {/*usereducer*/}

Call `useReducer` at the top level of your component to manage its state with a [reducer](/learn/extracting-state-logic-into-a-reducer).
किसी भी कौम्पोनॅन्ट के स्टेट को [रेडूसर](/learn/extracting-state-logic-into-a-reducer) के सहयोग के साथ प्रबंधित करने के लिए अपने कौम्पोनॅन्ट की सबसे उपरी स्तर पर `useReducer` को बुलाए.

```js
import { useReducer } from 'react';

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

[See more examples above.](#examples-basic)
[और उधारण के लिए उपर dekhiye.](#examples-basic)

#### Parameters {/*parameters*/}

* `reducer`: The reducer function that specifies how the state gets updated. It must be pure, should take the state and action as arguments, and should return the next state. State and action can be of any types.
* `initialArg`: The value from which the initial state is calculated. It can be a value of any type. How the initial state is calculated from it depends on the next `init` argument.
* **optional** `init`: The initializer function that specifies how the initial state is calculated. If it's not specified, the initial state is set to `initialArg`. Otherwise, the initial state is set to the result of calling `init(initialArg)`.

* `reducer`: रेडूसर फ़ंक्शन यह स्पष्ट करता है कि state कैसे अप्डेट होता है. इससे शुद्ध होना चाहिए, स्टेट और ऐक्शन को तर्क के रूप में लेना चाहिए और अगला state रिटर्न करना चाहिए. स्टेट और ऐक्शन किसी भी टाइप के हो सकते है.
* `initalArg`: वह वैल्यू जिससे इनिशल state कैल्क्युलेट किया जाता है. इनिशल state को कैल्क्युलेट करने का तरीक़ा इसके अगले वाले तर्क, `init` पर निर्भर करता है.
#### Returns {/*returns*/}

`useReducer` returns an array with exactly two values:
`useReducer` एक array रिटर्न करता है जिसमे इग्ज़ैक्ट्ली दो वैल्यू है:

1. The current state. During the first render, it's set to `init(initialArg)` or `initialArg` (if there's no `init`).
2. The [`dispatch` function](#dispatch) that lets you update the state to a different value and trigger a री-render.

1. अभी का state. पहली रेंडर के दौरान, इससे `init(initialArg)` या फ़िर `initalArg` (अगर `init`) पर सेट किया जाता है.
2. [`dispatch` फ़ंक्शन ](#dispatch) जो आपको state को एक अलग वैल्यू के साथ अप्डेट करने और री-रेंडर चालू करने देता है.

#### Caveats {/*caveats*/}

* `useReducer` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can't call it inside loops or conditions. If you need that, extract a new component and move the state into it.
* In Strict Mode, React will **call your reducer and initializer twice** in order to [help you find accidental impurities](#my-initializer-or-updater-function-runs-twice). This is development-only behavior and does not affect production. If your reducer and initializer are pure (as they should be), this should not affect the logic of your component. The result from one of the calls is ignored.

* `useReducer` एक hook है,तो आप उसे सिर्फ **कौम्पोनॅन्ट के सबसे उपर वाले स्तर** पर बुला सकते है या अपने Hooks में बुला सकते हो. इससे लूप्स और कंडिशंज़ के अंदर नहीं बुला सकते. अगर उसकी ज़रूरत है तो एक नया कौम्पोनॅन्ट इक्स्ट्रैक्ट करे और उसमें state मूव करना होगा.
* Strict मोड में,ऐक्सिडेंटल इम्प्युरिटीज ढूँढने के लिए रीऐक्ट **आपके रेडूसर और इनिशलिसेर को दो बार** बुलाता है

---

### `dispatch` functions {/*dispatch*/}

The `dispatch` function returned by `useReducer` lets you update the state to a different value and trigger a री-रेंडर. You need to pass the action as the only argument to the `dispatch` function:

`ueReducer` द्वारा वापस किया गया `dispatch` फ़ंक्शन आपको state को एक अलग वैल्यू के साथ अप्डेट और री-रेंडर चालू करने देता है. `dispatch` फ़ंक्शन में आपको तर्क के रूप में सिर्फ ऐक्शन को पास करना होगा:

```js
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {
  dispatch({ type: 'incremented_age' });
  // ...
```

React will set the next state to the result of calling the `reducer` फ़ंक्शन you've provided with the current `state` and the action you've passed to `dispatch`.

`रेडूसर`फ़ंक्शन में आपके द्वारा दिया गया अभी का `state` और `dispatch` में पास किये गए ऐक्शन के परिणाम से रीऐक्ट अगला state सेट करेगा.

#### Parameters {/*dispatch-parameters*/}

* `action`: The action performed by the user. It can be a value of any type. By convention, an action is usually an object with a `type` property identifying it and, optionally, other properties with additional information.

* `action`: वह ऐक्शन जो यूज़र द्वारा किया गया हो. यह किसी भी प्रकार का मूल्य हो सकता है. परम्परागत रूप से, एक ऐक्शन सामान्य रूप से एक ऑब्जेक्ट है जिसका `type` प्रॉपर्टी है पहचान करने के लिए और,वैकल्पिक तौर पर, और भी विशेषताएँ हैं जिसमे अतिरिक्त जानकारी है.

#### Returns {/*dispatch-returns*/}

`dispatch` functions do not have a return value.
`dispatch` फ़ंक्शन का कोई रिटर्न वैल्यू नहीं होता.

#### Caveats {/*setstate-caveats*/}

* The `dispatch` function **only updates the state variable for the *next* render**. If you read the state variable after calling the `dispatch` function, [you will still get the old value](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value) that was on the screen before your call.

* If the new value you provide is identical to the current `state`, as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison, React will **skip री-rendering the component and its children.** This is an optimization. React may still need to call your component before ignoring the result, but it shouldn't affect your code.

* React [batches state updates](/learn/queueing-a-series-of-state-updates). It updates the screen **after all the event handlers have run** and have called their `set` functions. This prevents multiple री-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use [`flushSync`](/apis/flushsync).

* `dispatch` फ़ंक्शन ***अगले* रेंडर के लिए सिर्फ state वेरिएबल को अप्डेट करता है**. अगर आप `dispatch` फ़ंक्शन बुलाने के बाद state वेरिएबल को पढ़ते है,तो [आपको अभी भी puraana वैल्यू मिलेगा](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value) जो call के पहले screen पे था.

* अगर [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) के द्वारा निर्धारित किया जाता है कि दिया गया naya वैल्यू अभी के `state` के समकक्ष है तो रीऐक्ट **us कौम्पोनॅन्ट को और उसके बच्चों का री-रेंडरिंग skip कर देगा**. यह एक optimization है. result ignore करने के पहले React को आपके कौम्पोनॅन्ट को बुलाने की ज़रूरत पढ़ सकती है लेकिन इससे आपका कोड प्रभावित नहीं होना चाहिए.

---

## Troubleshooting {/*troubleshooting*/}

### I've dispatched an action, but logging gives me the old state value {/*ive-dispatched-an-action-but-logging-gives-me-the-old-state-value*/}
### Maine action dispatch किया है लेकिन mujhe अभी भी puraane state कि वैल्यू मिल rahi है {/*ive-dispatched-an-action-but-logging-gives-me-the-old-state-value*/}

Calling the `dispatch` function **does not change state in the running code**:
`dispatch` फ़ंक्शन बुलाने से **चलते कोड का state नहीं बदलता**:

```js {4,5,8}
function handleClick() {
  console.log(state.age);  // 42

  dispatch({ type: 'incremented_age' }); // Request a री-रेंडर with 43
  console.log(state.age);  // Still 42!

  setTimeout(() => {
    console.log(state.age); // Also 42!
  }, 5000);
}
```

This is because [states behaves like a snapshot](/learn/state-as-a-snapshot). Updating state requests another render with the new state value, but does not affect the `state` JavaScript variable in your already-running event handler.

यह ऐसा है क्योंकि [state snapshot कि तरह काम करता है](/learn/state-as-a-snapshot). State अप्डेट करने से नए state वैल्यू के साथ रेंडर करने का अनुरोध होता है, लेकिन आपके पहले से ही चल रहे event handler में `state` जावास्क्रिप्ट वेरिएबल को प्रभावित नहीं करता.

If you need to guess the next state value, you can calculate it manually by calling the reducer yourself:
अगर आपको अगला state वैल्यू का अनुमान लगाना हो तो मैन्यूअल रूप से आप उसकी manually गणना कर सकते हो रेडूसर बुलाकर:

```js
const action = { type: 'incremented_age' };
dispatch(action);

const nextState = reducer(state, action);
console.log(state);     // { age: 42 }
console.log(nextState); // { age: 43 }
```

---

### I've dispatched an action, but the screen doesn't update {/*ive-dispatched-an-action-but-the-screen-doesnt-update*/}
### Maine action dispatch किया है लेकिन screen update नही हो रहा {/*ive-dispatched-an-action-but-the-screen-doesnt-update*/}

React will **ignore your update if the next state is equal to the previous state,** as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. This usually happens when you change an object or an array in state directly:

React आपके **update ignore कर देगा अगर आपका अगला state आपके पहले के state के samaan है**, यह [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison के द्वारा निर्धारित किया जाता है. यह सामान्यत: तब होता है जब आप किसी state में ऑब्जेक्ट या array को सीधे परिवर्तित करते हो:

```js {4-5,9-10}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // 🚩 Wrong: mutating existing object
      state.age++;
      return state;
    }
    case 'changed_name': {
      // 🚩 Wrong: mutating existing object
      state.name = action.nextName;
      return state;
    }
    // ...
  }
}
```

You mutated an existing `state` object and returned it, so React ignored the update. To fix this, you need to ensure that you're always [_replacing_ objects and arrays in state instead of _mutating_ them](#updating-objects-and-arrays-in-state):

आपने एक मौजूदा `state` ऑब्जेक्ट को परिवर्तित कर वापिस किया तो रीऐक्ट ने अप्डेट इग्नोर कर दिया. इसे हल करने के लिए, आपको सुनिश्चित करना होगा कि आप हमेशा [state me objects और arrays को _बदल_ कर रहे हो ना कि परिवर्तित करना](#updating-objects-and-arrays-in-state):

```js {4-8,11-15}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // ✅ Correct: creating a new object
      return {
        ...state,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      // ✅ Correct: creating a new object
      return {
        ...state,
        name: action.nextName
      };
    }
    // ...
  }
}
```

---

### A part of my reducer state becomes undefined after dispatching {/*a-part-of-my-reducer-state-becomes-undefined-after-dispatching*/}
### प्रेषण करने के बाद मेरे रेडूसर state का एक हिस्सा अपरिभाषित हो जाता है {/*a-part-of-my-reducer-state-becomes-undefined-after-dispatching*/}

Make sure that every `case` branch **copies all of the existing fields** when returning the new state:
अंदर रखे कि हर `case` का शाखा नया state वापिस करते समय **सारे मौजूदा fields को प्रतिलिपित करे**.
```js {5}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        ...state, // Don't forget this!
        age: state.age + 1
      };
    }
    // ...
```

Without `...state` above, the returned next state would only contain the `age` field and nothing else.
उपर, `...state` के बिना वापिस किये गए नए state में `age` field के अलावा और कुछ नहीं होगा.

---

### My entire reducer state becomes undefined after dispatching {/*my-entire-reducer-state-becomes-undefined-after-dispatching*/}
### Mera संपूर्ण reducer state dispatch के बाद undefined हो जाता है {/*my-entire-reducer-state-becomes-undefined-after-dispatching*/}

If your state unexpectedly becomes `undefined`, you're likely forgetting to `return` state in one of the cases, or your action type doesn't match any of the `case` statements. To find why, throw an error outside the `switch`:

यदि आपका state अप्रत्याशित रूप से `undefined` बन जाता है,तो संभावित है कि आप किसी एक केस में `return` state को भूल रहे हैं, या फ़िर आपका action type किसी भी `case` स्टेट्मेंट से मेल नहीं खाता. `switch` के बाहर एरर फेंकने से आपको कारण पता चल जाएगा:

```js {10}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // ...
    }
    case 'edited_name': {
      // ...
    }
  }
  throw Error('Unknown action: ' + action.type);
}
```

You can also use a static type checker like TypeScript to catch such mistakes.
इन ग़लतियों को पकड़ने के लिए, आप TypeScript जैसे स्थिर type checker को भी इस्तेमाल कर सकते है

---

### I'm getting an error: "Too many री-renders" {/*im-getting-an-error-too-many-री-renders*/}
### "Too many री-renders" का error मिल रहा है {/*im-getting-an-error-too-many-री-renders*/}

You might get an error that says: `Too many री-renders. React limits the number of renders to prevent an infinite loop.` Typically, this means that you're unconditionally dispatching an action *during render*, so your component enters a loop: render, dispatch (which causes a render), render, dispatch (which causes a render), and so on. Very often, this is caused by a mistake in specifying an event handler:

आपको एक error मिल सकता है जो कहे: `Too many री-renders. React limits the number of renders to prevent an infinite loop.`. आम तौर पर इसका मतलब यह है कि आप *रेंडर करते समय* आप बिना शर्त के action को प्रेषित कर रहे है, इससे आपका कौम्पोनॅन्ट लूप में चला जाता है: रेंडर, dispatch (जिसके कारण रेंडर होता है), रेंडर, dispatch (जिसके कारण रेंडर होता है), और आदि.

```js {1-2}
// 🚩 Wrong: calls the handler during render
return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler
return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

If you can't find the cause of this error, click on the arrow next to the error in the console and look through the JavaScript stack to find the specific `dispatch` function call responsible for the error.

यदि आपको इस एरर का कारण नहीं पता चलता तो कोंसोल में एरर के बग़ल में ऐरो क्लिक करे और जावास्क्रिप्ट स्टेक में देखना कि इस्स एरर के लिए कौनसा `dispatch` फ़ंक्शन का बुलावा जिम्मेदार है.

---

### My reducer or initializer function runs twice {/*my-reducer-or-initializer-function-runs-twice*/}
### Mera reducer या initializer फ़ंक्शन do बार चलता है {/*my-reducer-or-initializer-function-runs-twice*/}

In [Strict Mode](/apis/strictmode), React will call your reducer and initializer functions twice. This shouldn't break your code.
[Strict Mode](/apis/strictmode)में, React आपके रेडूसर और इनिशलिसेर फ़ंक्शन को दो बार बुलाएगा. इससे आपके कोड को कोई नुक़सान नहीं होना चाहिए.

This **development-only** behavior helps you [keep components pure](/learn/keeping-components-pure). React uses the result of one of the calls, and ignores the result of the other call. As long as your component, initializer, and reducer functions are pure, this shouldn't affect your logic. However, if they are accidentally impure, this helps you notice the mistakes and fix it.

यह **development-only** व्यवहार [आपके components शुद्ध रखने](/learn/keeping-components-pure)में सहयोग करता है. React किसी भी बुलावे के परिणाम का उपयोग करता है और दूसरे बुलावे का परिणाम नज़रंदाज़ कर देता है. जब तक आपका कौम्पोनॅन्ट, इनिशलिसेर, और रेंडर फ़ंक्शन शुद्धहै, इससे आपके लॉजिक पर कोई प्रभाव नहीं पड़ना चाहिए.

For example, this impure reducer function mutates an array in state:
उदाहरण में,इस अशुद्ध रेडूसर फ़ंक्शन state में एक अरे को परिवर्तित करता है:

```js {4-6}
function reducer(state, action) {
  switch (action.type) {
    case 'added_todo': {
      // 🚩 Mistake: mutating state
      state.todos.push({ id: nextId++, text: action.text });
      return state;
    }
    // ...
  }
}
```

Because React calls your reducer function twice, you'll see the todo was added twice, so you'll know that there is a mistake. In this example, you can fix the mistake by [replacing the array instead of mutating it](#updating-objects-and-arrays-in-state):

क्योंकि रीऐक्ट रेडूसर फ़ंक्शन को दो बार बुलाता है, आपको तो दो बार जोड़ा दिखेगा,तो आपको पता लगेगा कि गलती हुई है.इस उदाहरण में, आप यह गलती को सुधारने के लिए [अरे को परिवर्तित करने की जगह प्रतिस्थापित करोगे](#updating-objects-and-arrays-in-state):

```js {4-11}
function reducer(state, action) {
  switch (action.type) {
    case 'added_todo': {
      // ✅ Correct: replacing with new state
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: nextId++, text: action.text }
        ]
      };
    }
    // ...
  }
}
```

Now that this reducer function is pure, calling it an extra time doesn't make a difference in behavior. This is why React calling it twice helps you find mistakes. **Only component, initializer, and reducer functions need to be pure.** Event handlers don't need to be pure, so React will never call your event handlers twice.

अब जब यह रेडूसर फ़ंक्शन शुद्ध है, इसे एक और बार बुलाने से व्यवहार में कोई अंतर नही दिखता. इसलिए रीऐक्ट इससे दो बार बुलाने से आपको ग़लतियाँ ढूँढने में आसानी होती है. **सिर्फ कौम्पोनॅन्ट, इनिशलिसेर, और रेडूसर फ़ंक्शन को शुद्ध होना चाहिए.** Event handlers जो शुद्ध होने की आवश्यकता नहीं है तो रीऐक्ट आपके event handlers को कभी भी दो बार नहीं बुलाएगा.

Read [keeping components pure](/learn/keeping-components-pure) to learn more.

और जानने के लिए, [components शुद्ध रखने के बारे](/learn/keeping-components-pure) पढ़िए.
