---
title: useReducer
---

<Intro>

`useReducer` is a React Hook that lets you add a [reducer](/learn/extracting-state-logic-into-a-reducer) to your component.

`useReducer` ek React Hook hai jo aapko apne component me ek [reducer](/learn/extracting-state-logic-into-a-reducer) add karne deta hai.

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
  - [I'm getting an error: "Too many re-renders"](#im-getting-an-error-too-many-re-renders)
  - [My reducer or initializer function runs twice](#my-reducer-or-initializer-function-runs-twice)

---

## Usage {/*usage*/}

### Adding a reducer to a component {/*adding-a-reducer-to-a-component*/}
### component me ek reducer add karna {/*adding-a-reducer-to-a-component*/}

Call `useReducer` at the top level of your component to manage state with a [reducer](/learn/extracting-state-logic-into-a-reducer).

State ko [reducer](/learn/extracting-state-logic-into-a-reducer) ke saath manage karne ke liye, apne component ke sabse upari level me `useReducer` ko bulaaye.

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
`useReducer` ek array retrn karta hai jisme exactly do items hai:

1. The <CodeStep step={1}>current state</CodeStep> of this state variable, initially set to the <CodeStep step={3}>initial state</CodeStep> you provided.
1. is state variable ka <CodeStep step={1}>current state</CodeStep> jo initially आपके dwaare diye gaye <CodeStep step={3}>initial state</CodeStep> pe set hai.
2. The <CodeStep step={2}>`dispatch` function</CodeStep> that lets you change it in response to interaction.
2. ek <CodeStep step={2}>`dispatch` function</CodeStep> jo aapko interaction ke response me badalne deta hai.

To update what's on the screen, call <CodeStep step={2}>`dispatch`</CodeStep> with an object representing what the user did, called an *action*:

screen update karne ke liye, <CodeStep step={2}>`dispatch`</CodeStep> ko bulaaye *action*, ek aisa object jo represent karta hai ki user ne kya kiya:

```js [[2, 2, "dispatch"]]
function handleClick() {
  dispatch({ type: 'incremented_age' });
}
```

React will pass the current state and the action to your <CodeStep step={4}>reducer function</CodeStep>. Your reducer will calculate and return the next state. React will store that next state, render your component with it, and update the UI.

आपके <CodeStep step={4}>reducer function</CodeStep> me React abhi ka state aur action pass karega. आपका reducer agle state ko calculate कर usse return karega. React us state ko store karega, component ko uske saath render कर UI ko update karega.

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

`useReducer` aur [`useState`](/apis/usestate) jyada tar ek jaise hi hai lekin `useReducer` aapko event handlers se state update logic ek single function me component ke bahar le jaane deta hai. [choosing between `useState` and `useReducer`](/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer) ke baare me aur padhiye.

---

### Writing the reducer function {/*writing-the-reducer-function*/}
### reducer function likhna {/*writing-the-reducer-function*/}

A reducer function is declared like this:
Kisi bhi reducer function aise declare kiya jaata hai:

```js
function reducer(state, action) {
  // ...
}
```

Then you need to fill in the code that will calculate and return the next state. By convention, it is common to write it as a [`switch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch). For each `case` in the `switch`, you need to calculate and return some next state.

Phir aapko wo code likhna hoga jo agle state to calculae कर return karega. By convention, isse [`switch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) ke roop me likhna ek aam baat hai. `switch` me aapko har `case` ke liye agla state calculate karke return karna hoga.

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

Actions ka koi bhi aakar ho sakta hai, By convention, objects ko `type` property (jo action ko identify karta hai) ke saath pass kiya jaata hai. Usme kam se kam aur zaroori information honi chahiye jisse reducer agla state computer कर sake.
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

Action ke type naam आपके component ke local hote hai. [Har ek action ek interaction describe karta hai, even if usme kai saare data change hoga](/learn/extracting-state-logic-into-a-reducer#writing-reducers-well). State ka akaar arbitrary hota hai, lekin usually ek object hoga ya phir ek array hoga.

Read [extracting state logic into a reducer](/learn/extracting-state-logic-into-a-reducer) to learn more.
Aur jaanne ke liye, [reducer me state logic extract karne ](/learn/extracting-state-logic-into-a-reducer) ke baare me padhiye.

<Gotcha>

State is read-only. Don't modify any objects or arrays in state:
State ko aap sirf read कर sakte hai i.e. read-only. State ke andar ke objects ya arrays ko modify na kare:

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
Instead, hamesha apne reducer se naya objects return karna:

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
Aur jaanne ke liye, [updating arrays in state](/learn/updating-arrays-in-state) aur [updating objects in state](/learn/updating-objects-in-state) ke baare me padhiye.

</Gotcha>

<Recipes titleText="Basic useReducer examples / useReducer ke basic udhaaran" titleId="examples-basic">

### Form (object) {/*form-object*/}

In this example, the reducer manages a state object with two fields: `name` and `age`.
Is udhaaran me, reducer ek state ko manage कर raha hai jiske do fields hai: `name` aur `age`.

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
Is udharran me, reducer task ke array ko manage कर raha hai. [Bina mutation](/learn/updating-arrays-in-state) ke array ko update ko karna hoga.

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
### Immer ke saath concise update logic likhna {/*writing-concise-update-logic-with-immer*/}

If updating arrays and objects without mutation feels tedious, you can use a library like [Immer](https://github.com/immerjs/use-immer#useimmerreducer) to reduce repetitive code. Immer lets you write concise code as if you were mutating objects, but under the hood it performs immutable updates:
Yadi bina mutation ke array ya objects ko updata karna hai to aap ek library jaise [Immer](https://github.com/immerjs/use-immer#useimmerreducer) ko repetitive code kam karne ke liye use कर sakte hai.

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
### Initial state ko phir recreate karna avoid kijiye {/*avoiding-recreating-the-initial-state*/}

React saves the initial state once and ignores it on the next renders.
React initial state ko ek baar save karta hai aur agle render me usse ignore karta hai.

```js
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, createInitialState(username));
  // ...
```

Although the result of `createInitialState(username)` is only used for the initial render, you're still calling this function on every render. This can be wasteful if it's creating large arrays or performing expensive calculations.

Halanki `createInitialState(username)` ka result sirf inital render ke liye use kiya jaata hai, aap is function phir bhi har render pe bulaate hai. Agar mehenge calculations कर rahe hai ya bade bade arrays bana rahe hai ye wasteful ho sakta hai.

To solve this, you may **pass it as an _initializer_ function** to `useReducer` as the third argument instead:
Isse solve karne ke liye, aap usse `useReducer` me thisre argument ke staan pr **_initializer_ function ke roop me pass कर sakte hai**.

```js {6}
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, username, createInitialState);
  // ...
```

Notice that you’re passing `createInitialState`, which is the *function itself*, and not `createInitialState()`, which is the result of calling it. This way, the initial state does not get re-created after initialization.

Dhyaan dijiye ki aap `createInitialState` pass कर rahe hai jo *function khud* hai lekin `createIntialState()` nahi, jo ki function ko bulaane pr milne waala result hai. Is tareeke se initial state intialization ke baad re-create nahi hota.

In the above example, `createInitialState` takes a `username` argument. If your initializer doesn't need any information to compute the initial state, you may pass `null` as the second argument to `useReducer`.

Upar diye gaye udhaaran me, `createIntialState` ek argument leta hai, `username`. Agar आपका intializer ko initial state ko compute karne ke liye kisi bhi information ki zaroorat nahi hai, to aap `useReducer` ke dusre argument ke staan pr `null` pass कर sakte hai.

<Recipes titleText="The difference between passing an initializer and passing the initial state directly / initializer pass karna aur initial state pass karne me antar" titleId="examples-initializer">

### Passing the initializer function {/*passing-the-initializer-function*/}
### Intializer function pass karna {/*passing-the-initializer-function*/}

This example passes the initializer function, so the `createInitialState` function only runs during initialization. It does not run when component re-renders, such as when you type into the input.

Is udhaaran me initializer function pass kiya jata hai, to `createInitialState` function sirf intialization ke dauraan chalta hai. Component re-render hone pe, jaise input me type karne pe, ye function ahi chalta.
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
### intial state directly pass karna {/*passing-the-initial-state-directly*/}

This example **does not** pass the initializer function, so the `createInitialState` function runs on every render, such as when you type into the input. There is no observable difference in behavior, but this code is less efficient.

Is udhaaran me initializer function **nahi** pass kiya jaata, to `createInitialState` function har render pe chalta hai, jaise jab ab input me type karte hai. Vyahvarik roop se dekhne par koi antar nahi hai lekin is code ki efficiency kam ho jaati hai.
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
Kisi bhi component ke state ko [reducer](/learn/extracting-state-logic-into-a-reducer) ke sahyog ke saath manage karne ke liye apne component ki sabse upari level pe `useReducer` ko bulaaye.

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
[Aur udhaaran ke liye upar dekhiye.](#examples-basic)

#### Parameters {/*parameters*/}

* `reducer`: The reducer function that specifies how the state gets updated. It must be pure, should take the state and action as arguments, and should return the next state. State and action can be of any types.
* `initialArg`: The value from which the initial state is calculated. It can be a value of any type. How the initial state is calculated from it depends on the next `init` argument.
* **optional** `init`: The initializer function that specifies how the initial state is calculated. If it's not specified, the initial state is set to `initialArg`. Otherwise, the initial state is set to the result of calling `init(initialArg)`.

* `reducer`: reducer function yeh spasht karta hai ki state kaise update hota hai. Isse pure hona chahiye, state aur action ko argument ke roop me lena chahiye aur agla state return karna chahiye. State aur action kisi bhi type ke ho sakte hai.
* `initalArg`: Wo value jisse initial state calculate kiya jaata hai. initial state ka calculate karne ka tareeka iske agle waale argument, `init` pe nirbhar karta hai.
#### Returns {/*returns*/}

`useReducer` returns an array with exactly two values:
`useReducer` ek array return karta hai jisme exactly do value hai:

1. The current state. During the first render, it's set to `init(initialArg)` or `initialArg` (if there's no `init`).
2. The [`dispatch` function](#dispatch) that lets you update the state to a different value and trigger a re-render.

1. Abhi ka state. Pehli render ke dauraan, isse `init(initialArg)` ya phir `initalArg` (agar `init`) pe set kiya jaata hai.
2. [`dispatch` function](#dispatch) jo aapko state ko ek alag value ke saath update karne aur re-render trigger karne deta hai.

#### Caveats {/*caveats*/}

* `useReducer` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can't call it inside loops or conditions. If you need that, extract a new component and move the state into it.
* In Strict Mode, React will **call your reducer and initializer twice** in order to [help you find accidental impurities](#my-initializer-or-updater-function-runs-twice). This is development-only behavior and does not affect production. If your reducer and initializer are pure (as they should be), this should not affect the logic of your component. The result from one of the calls is ignored.

* `useReducer` ek Hook hai, to aap usse sirf **component ke sabse upar waale level** pe bula sakte hai ya apne Hooks me bula sakte ho. Isse loops aur conditions ke andar nahi bula sakte. Agar uski zaroorat hai to ek naya component extract kare aur usme state move karna hoga.
* Strict Mode me, accidental impurities doondhne ke liye React **आपके reducer aur intializer ko do baar** bulata hai

---

### `dispatch` functions {/*dispatch*/}

The `dispatch` function returned by `useReducer` lets you update the state to a different value and trigger a re-render. You need to pass the action as the only argument to the `dispatch` function:

`ueReducer` dwaara return kiya gaya `dispatch` function aapko state ko ek alag value ke saath update aur re-render trigger karne deta hai. `dispatch` function me apko argument ke roop me sirf action ko pass karna hoga:

```js
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {
  dispatch({ type: 'incremented_age' });
  // ...
```

React will set the next state to the result of calling the `reducer` function you've provided with the current `state` and the action you've passed to `dispatch`.

`reducer` function me आपके daara diya gaya abhi ka `state` aur `dispatch` me pass kiye gaye action ke result se React agla state set karega.

#### Parameters {/*dispatch-parameters*/}

* `action`: The action performed by the user. It can be a value of any type. By convention, an action is usually an object with a `type` property identifying it and, optionally, other properties with additional information.

* `action`: Wo action jo user dwaara kiya gaya ho. Yh kisi bhi prakaar ka balue ho sakta hai. By convetion, ek action usually ek object hai jiska `type` property hai identify karne ke liye aur, optionally, aur bhi properties hai jisme additional information hai.

#### Returns {/*dispatch-returns*/}

`dispatch` functions do not have a return value.
`dispatch` function ka koi return value nahi hota.

#### Caveats {/*setstate-caveats*/}

* The `dispatch` function **only updates the state variable for the *next* render**. If you read the state variable after calling the `dispatch` function, [you will still get the old value](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value) that was on the screen before your call.

* If the new value you provide is identical to the current `state`, as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison, React will **skip re-rendering the component and its children.** This is an optimization. React may still need to call your component before ignoring the result, but it shouldn't affect your code.

* React [batches state updates](/learn/queueing-a-series-of-state-updates). It updates the screen **after all the event handlers have run** and have called their `set` functions. This prevents multiple re-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use [`flushSync`](/apis/flushsync).

* `dispatch` function ***agle* render ke liye sirf state variable ko update karta hai**.  Agar aap `dispatch` function bulaane ke baad state variable ko padhte hai, to [aapko abhi bhi puraana value milega](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value) jo call ke pehle screen pe tha.

* Agar [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) ke dwaara determine kiya jaata hai ki diya gaya naya value abhi ke `state` ke baraabar hai to React **us component ko aur uske baccho ka re-rendering skip कर dega**. Yeh ek optimization hai. result ignore karne ke pehle React ko आपके component ko bulaane ki zaroorat padh sakti hai lekin isse आपका code affect nahi hona chahiye.

---

## Troubleshooting {/*troubleshooting*/}

### I've dispatched an action, but logging gives me the old state value {/*ive-dispatched-an-action-but-logging-gives-me-the-old-state-value*/}
### Maine action dispatch kiya hai lekin mujhe abhi bhi puraane state ki value mil rahi hai {/*ive-dispatched-an-action-but-logging-gives-me-the-old-state-value*/}

Calling the `dispatch` function **does not change state in the running code**:
`dispatch` function bulaane se **chalte code ka state nahi badalta**:

```js {4,5,8}
function handleClick() {
  console.log(state.age);  // 42

  dispatch({ type: 'incremented_age' }); // Request a re-render with 43
  console.log(state.age);  // Still 42!

  setTimeout(() => {
    console.log(state.age); // Also 42!
  }, 5000);
}
```

This is because [states behaves like a snapshot](/learn/state-as-a-snapshot). Updating state requests another render with the new state value, but does not affect the `state` JavaScript variable in your already-running event handler.

Yeh aisa hai kyunki [state snapshot ki tarah kaam karta hai](/learn/state-as-a-snapshot). State update karne se naye state value ke saath render karne ka request hota hai, lekin आपके pehle se hi chal rahe event handler me `state` JavaScript variable ko affect nahi karta.

If you need to guess the next state value, you can calculate it manually by calling the reducer yourself:
Agar aapko agla state value ka anumaan lagana ho to aap usse manually calculate कर sakte ho reducer bulaake:

```js
const action = { type: 'incremented_age' };
dispatch(action);

const nextState = reducer(state, action);
console.log(state);     // { age: 42 }
console.log(nextState); // { age: 43 }
```

---

### I've dispatched an action, but the screen doesn't update {/*ive-dispatched-an-action-but-the-screen-doesnt-update*/}
### Maine action dispatch kiya hai lekin screen update nahi ho raha {/*ive-dispatched-an-action-but-the-screen-doesnt-update*/}

React will **ignore your update if the next state is equal to the previous state,** as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. This usually happens when you change an object or an array in state directly:

React आपके **update ignore कर dega agar आपका agla state आपके pehle ke state ke samaan hai**, ye [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison ke dwaara determine kiya jaata hai. Ye usually tab hota hai jab aap kisi state me object ya array ko directly change karte ho:

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

Aapne ek existing `state` object ko mutate कर return kiya to React ne update ignore कर diya. Is fix karne ke liye, aapko ensure karna hoga ki app hamesha [state me objects aur arrays ko _replace_ कर rahe ho na ki mutate karna](#updating-objects-and-arrays-in-state):

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
### Dispatch karne ke baad mere reducer state ka ek hissa undefined ho jaata hai {/*a-part-of-my-reducer-state-becomes-undefined-after-dispatching*/}

Make sure that every `case` branch **copies all of the existing fields** when returning the new state:
Dhyaan rakheb ki har `case` ka branch naya state return karte samay **saare मौजूदा fields ko copy kare**.
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
upar, `...state` ke bina return kiye gaye naye state me `age` field ke alawa aur kuch nahi hoga.

---

### My entire reducer state becomes undefined after dispatching {/*my-entire-reducer-state-becomes-undefined-after-dispatching*/}
### Mera संपूर्ण reducer state dispatch ke baad undefined ho jaata hai {/*my-entire-reducer-state-becomes-undefined-after-dispatching*/}

If your state unexpectedly becomes `undefined`, you're likely forgetting to `return` state in one of the cases, or your action type doesn't match any of the `case` statements. To find why, throw an error outside the `switch`:

yadi आपका state अप्रत्याशित रूप से `undefined` ban jaata hai, to संभावित hai ki aap kisi ek case me `return` state ko bhul rahe hai, ya phir आपका action type kisi bhi `case` statement se मेल नहीं खाता. `switch` ke bahar error phekne se aapko कारण pata chal jayega:

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
in galtiyon ko pakadne ke liye, aap TypeScript jaise static type checker ko bhi istemaal कर sakte hai

---

### I'm getting an error: "Too many re-renders" {/*im-getting-an-error-too-many-re-renders*/}
### "Too many re-renders" ka error mil raha hai {/*im-getting-an-error-too-many-re-renders*/}

You might get an error that says: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` Typically, this means that you're unconditionally dispatching an action *during render*, so your component enters a loop: render, dispatch (which causes a render), render, dispatch (which causes a render), and so on. Very often, this is caused by a mistake in specifying an event handler:

Aapko ek error mil sakta hai jo kahe: `Too many re-renders. React limits the number of renders to prevent an infinite loop.`. आम तौर पर iska matlab yh hai ki aap *render karte samay* aap बिना शर्त ke action ko dispatch कर rahe hai, isse आपका component loop me chala jaata hai: render, dispatch (jiske कारण render hota hai), render, dispatch (jiske कारण render hota hai), aur aadi.

```js {1-2}
// 🚩 Wrong: calls the handler during render
return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler
return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

If you can't find the cause of this error, click on the arrow next to the error in the console and look through the JavaScript stack to find the specific `dispatch` function call responsible for the error.

Yadi aapko is error ka kaaran nahi pata chalta to console me error ke bagal me arrow click kare aur JavaScript stack me देखना ki is error ke liye kaunsa `dispatch` function ka bulaawa जिम्मेदार hai.

---

### My reducer or initializer function runs twice {/*my-reducer-or-initializer-function-runs-twice*/}
### Mera reducer ya initializer function do baar chalta hai {/*my-reducer-or-initializer-function-runs-twice*/}

In [Strict Mode](/apis/strictmode), React will call your reducer and initializer functions twice. This shouldn't break your code.
[Strict Mode](/apis/strictmode) me, React aapke reducer aur intializer function ko do baar bulaayega. isse aapke code ko koi nuksaan nahi hona chahiye.

This **development-only** behavior helps you [keep components pure](/learn/keeping-components-pure). React uses the result of one of the calls, and ignores the result of the other call. As long as your component, initializer, and reducer functions are pure, this shouldn't affect your logic. However, if they are accidentally impure, this helps you notice the mistakes and fix it.

yh **development-only** vyavaar [aapke components shudh rakhne](/learn/keeping-components-pure) me sahyog karta hai. React kisi bhi bulaawe ka result use karta hai aur dusre bulaawe ka result ignore कर deta hai. Jab tak aapka component, initializer, aur render function shudh hai, isse aapke logic pe koi prbhaav nahi padna chahiye.

For example, this impure reducer function mutates an array in state:
Udhaaran me, is ashudh reducer function state me ek array ko mutate karta hai:

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

क्योंकि React reducer function ko do baar bulaata hai, aapko todo baar जोड़ा dikhega, to aapko pata lagega ki galti hui hai. Is udhaaran me, aap ye galti ko sudharne ke liye [array ko mutate karne ki jagah replace karoge](#updating-objects-and-arrays-in-state):

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

ab jab yh reducer function shudh hai, is ek aur baar bulaane se vyavhaar me koi antar nahi dikhta. Isiliye React isse do baar bulaane se aapko galtiyaan doondne me aasaani padti hai. **Sirf component, initializer, aur reducer function ko shudh hona chahiye.** Event handlers jo shudh hone ki avashyakta nahi hai to React aapke event handlers ko kabhi bhi do baar nahi bulaayega.

Read [keeping components pure](/learn/keeping-components-pure) to learn more.

Aur jaanne ke liye, [components shudh rakhne ke baare](/learn/keeping-components-pure) padhiye.
