---
title: useState
---

<Intro>

`useState` is a React Hook that lets you add a [state variable](/learn/state-a-components-memory) to your component.
`useState` ek React Hook hai jo aapko apne component me ek [state variable](/learn/state-a-components-memory) add karne deta hai.

```js
const [state, setState] = useState(initialState)
```

</Intro>

- [Usage](#usage)
  - [Adding state to a component](#adding-state-to-a-component)
  - [Updating state based on the previous state](#updating-state-based-on-the-previous-state)
  - [Updating objects and arrays in state](#updating-objects-and-arrays-in-state)
  - [Avoiding recreating the initial state](#avoiding-recreating-the-initial-state)
  - [Resetting state with a key](#resetting-state-with-a-key)
  - [Storing information from previous renders](#storing-information-from-previous-renders)
- [Reference](#reference)
  - [`useState(initialState)`](#usestate)
  - [`set` functions, like `setSomething(nextState)`](#setstate)
- [Troubleshooting](#troubleshooting)
  - [I’ve updated the state, but logging gives me the old value](#ive-updated-the-state-but-logging-gives-me-the-old-value)
  - [I've updated the state, but the screen doesn't update](#ive-updated-the-state-but-the-screen-doesnt-update)
  - [I'm getting an error: "Too many re-renders"](#im-getting-an-error-too-many-re-renders)
  - [My initializer or updater function runs twice](#my-initializer-or-updater-function-runs-twice)
  - [I'm trying to set state to a function, but it gets called instead](#im-trying-to-set-state-to-a-function-but-it-gets-called-instead)

---

## Usage {/*usage*/}

### Adding state to a component {/*adding-state-to-a-component*/}
### Component me state add karna {/*adding-state-to-a-component*/}

Call `useState` at the top level of your component to declare one or more [state variables](/learn/state-a-components-memory).
Apne component ke sabse upari level me `useState` ko bulaaye ek ya adhik [state variables](/learn/state-a-components-memory) declare karne ke liye.

```js [[1, 4, "age"], [2, 4, "setAge"], [3, 4, "42"], [1, 5, "name"], [2, 5, "setName"], [3, 5, "'Taylor'"]]
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(42);
  const [name, setName] = useState('Taylor');
  // ...
```

The convention is to name state variables like `[something, setSomething]` using [array destructuring](/learn/a-javascript-refresher#array-destructuring).
state variables ko [array destructuring](/learn/a-javascript-refresher#array-destructuring) ke saath naam karna convention hai, jaise `[something, setSomething]`.

`useState` returns an array with exactly two items:
`useState` ek array return karta hai jisme exactly do items hai:

1. The <CodeStep step={1}>current state</CodeStep> of this state variable, initially set to the <CodeStep step={3}>initial state</CodeStep> you provided.
2. The <CodeStep step={2}>`set` function</CodeStep> that lets you change it to any other value in response to interaction.

1. Is state variable ka <CodeStep step={1}>current state</CodeStep>, jisse initially aapke dwaara diya gaya <CodeStep step={3}>initial state</CodeStep> pe set kiya jaata hai.

To update what’s on the screen, call the `set` function with some next state:
Screen ko update karne ke liye, `set` function ko kisi aur state ke saath bulaao.

```js [[2, 2, "setName"]]
function handleClick() {
  setName('Robin');
}
```

React will store the next state, render your component again with the new values, and update the UI.
React agla state store kar dega, naye values ke saath component render karega aur UI ko update karega.

<Gotcha>

Calling the `set` function [**does not** change the current state in the already executing code](#ive-updated-the-state-but-logging-gives-me-the-old-value):
`set` function bulaane se [chal rahe code me abhi ka state **nahi badalta**](#ive-updated-the-state-but-logging-gives-me-the-old-value):

```js {3}
function handleClick() {
  setName('Robin');
  console.log(name); // Still "Taylor"!
}
```

It only affects what `useState` will return starting from the *next* render.
Wo sirf *agle* render se `useState` ka return value ko affect karega.

</Gotcha>

<Recipes titleText="Basic useState examples / useState ke basic udhaaran" titleId="examples-basic">

### Counter (number) {/*counter-number*/}

In this example, the `count` state variable holds a number. Clicking the button increments it.
is udhaaran me, `count` state variable ek number hold karta hai. Button dabane se wo increment hota hai.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```

</Sandpack>

<Solution />

### Text field (string) {/*text-field-string*/}

In this example, the `text` state variable holds a string. When you type, `handleChange` reads the latest input value from the browser input DOM element, and calls `setText` to update the state. This allows you to display the current `text` below.
is udhaaran me, `text` state variable ek string hold karta hai. Jab aap type karte hai, `handleChange` sabse latest input value browser input DOM element se padhta hai, `setText` ko state update karne ke liye bulaata hai. ye aapko niche `current` text display karne deta hai.

<Sandpack>

```js
import { useState } from 'react';

export default function MyInput() {
  const [text, setText] = useState('hello');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <input value={text} onChange={handleChange} />
      <p>You typed: {text}</p>
      <button onClick={() => setText('hello')}>
        Reset
      </button>
    </>
  );
}
```

</Sandpack>

<Solution />

### Checkbox (boolean) {/*checkbox-boolean*/}

In this example, the `liked` state variable holds a boolean. When you click the input, `setLiked` updates the `liked` state variable with whether the browser checkbox input is checked. The `liked` variable is used to render the text below the checkbox.

is udhaaran me, `liked` state variable ek boolean hold karta hai. Jab aap input click karte hai, `setLiked` `liked` state variable ko update karta hai with whether the browser input checkbox input is checked. `liked` variable ko checkbox ke niche text ko render karne ke liye use kiya jaata hai.
<Sandpack>

```js
import { useState } from 'react';

export default function MyCheckbox() {
  const [liked, setLiked] = useState(true);

  function handleChange(e) {
    setLiked(e.target.checked);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={liked}
          onChange={handleChange}
        />
        I liked this
      </label>
      <p>You {liked ? 'liked' : 'did not like'} this.</p>
    </>
  );
}
```

</Sandpack>

<Solution />

### Form (two variables) {/*form-two-variables*/}

You can declare more than one state variable in the same component. Each state variable is completely independent.
Aap ek component me ek se zyaada state variable declare kar sakte hai. Har state variable puri tarah se independent hai.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => setAge(age + 1)}>
        Increment age
      </button>
      <p>Hello, {name}. You are {age}.</p>
    </>
  );
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack>

<Solution />

</Recipes>

---

### Updating state based on the previous state {/*updating-state-based-on-the-previous-state*/}
### Pichle state ke adhaar pe state update karna {/*updating-state-based-on-the-previous-state*/}

Suppose the `age` is `42`. This handler calls `setAge(age + 1)` three times:
Suppose `age` ka value `42` hai. yeh handler `setAge(age + 1)` teen baar bulaata hai:

```js
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

However, after one click, `age` will only be `43` rather than `45`! This is because calling the `set` function [does not update](/learn/state-as-a-snapshot) the `age` state variable in the already running code. So each `setAge(age + 1)` call becomes `setAge(43)`.

parantu, ek click ke baad, `age` ka value `43` hi hoga na ki `45`! Aisa isiliye hai kyunki `set` function pehle se hi chal rahe code me [update nahi karta](/learn/state-as-a-snapshot). To har `setAge(age + 1)` ka bulaawa `setAge(43)` ban jaata hai.

To solve this problem, **you may pass an *updater function*** to `setAge` instead of the next state:
Is problem ko solve karne ke liye agle state ki jagah, aap `setAge` ko **ek *updater function* pass kar sakte** hai.

```js [[1, 2, "a", 0], [2, 2, "a + 1"], [1, 3, "a", 0], [2, 3, "a + 1"], [1, 4, "a", 0], [2, 4, "a + 1"]]
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

Here, `a => a + 1` is your updater function. It takes the <CodeStep step={1}>pending state</CodeStep> and calculates the <CodeStep step={2}>next state</CodeStep> from it.
Yaha pe, `a => a + 1` aapka updater function hai. yh <CodeStep step={1}>pending state</CodeStep> ko istemaal kar <CodeStep step={2}>next state</CodeStep> calculate karta hai.

React puts your updater functions in a [queue](/learn/queueing-a-series-of-state-updates). Then, during the next render, it will call them in the same order:
React aapke updater function ek [queue](/learn/queueing-a-series-of-state-updates) me rakhta hai. Phir agle render me, usse vahi order me bulaayega:

1. `a => a + 1` will receive `42` as the pending state and return `43` as the next state.
1. `a => a + 1` will receive `43` as the pending state and return `44` as the next state.
1. `a => a + 1` will receive `44` as the pending state and return `45` as the next state.

1. `a => a + 1` ko  `42` pending state ke roop me milega aur agle state ke roop me `43` return karega.
1. `a => a + 1` ko  `43` pending state ke roop me milega aur agle state ke roop me `44` return karega.
1. `a => a + 1` ko  `44` pending state ke roop me milega aur agle state ke roop me `45` return karega.

There are no other queued updates, so React will store `45` as the current state in the end.
aur koi updates queue me nahi hai to React current state ke roop me `45` ko store karega.

By convention, it's common to name the pending state argument for the first letter of the state variable name, like `a` for `age`. However, you may also call it like `prevAge` or something else that you find clearer.
By convention, pending state argument ko state variable ke pehle akshar ke saath naam karna aam baat hai jaise `age` ke liye `a`.

React may [call your updaters twice](#my-initializer-or-updater-function-runs-twice) in development to verify that they are [pure](/learn/keeping-components-pure).
React development ke samay aapke [updaters do baar bula sakta hai](#my-initializer-or-updater-function-runs-twice) yh verify karne ke liye vh [pure](/learn/keeping-components-pure) hai.

<DeepDive title="Is using an updater always preferred? / Kya updater use karna preferred hai?">

You might hear a recommendation to always write code like `setAge(a => a + 1)` if the state you're setting is calculated from the previous state. There is no harm in it, but it is also not always necessary.
Aapko code is tarah se likhne `setAge(a => a + 1)` ka recommendation mil sakta hai yadi jo state aap set kar rahe vh pichle state se calculated hai.

In most cases, there is no difference between these two approaches. React always makes sure that for intentional user actions, like clicks, the `age` state variable would be updated before the next click. This means there is no risk of a click handler seeing a "stale" `age` at the beginning of the event handler.
zyadatar case me in dono approaches me koi antar nahi hai. React hamesha dhyaan rakhta hai ki user ke intentional actions ke liye, jaise clicks, `age` state variable agle click ke pehle update ho jayega. Iska arth hai ki click handler event handler ke shuruaat me "stale" age dekhne ka koi risk nahi hai.

However, if you do multiple updates within the same event, updaters can be helpful. They're also helpful if accessing the state variable itself is inconvenient (you might run into this when optimizing re-renders).
However, agar aap ek hi event me multiple update karte hai to updaters helpful ho sakte hai. Wo tab bhi sahyogi hai jab state variable ko khud access karna inconvinient hai. (re-render optimize karte samay aap isme run kar sakte hai)

If you prefer consistency over slightly more verbose syntax, it's reasonable to always write an updater if the state you're setting is calculated from the previous state. If it's calculated from the previous state of some *other* state variable, you might want to combine them into one object and [use a reducer](/learn/extracting-state-logic-into-a-reducer).
Agar aap thoda sa verbose syntax se zyaada consistency prefer karte hai, to yeh updater likhna reasonable hota hai agar aap ke dwaara set kiye jaane waala state pichle state se calculated hai.

</DeepDive>

<Recipes titleText="The difference between passing an updater and passing the next state directly / updater pass karne aur directly next state pass karne me antar" titleId="examples-updater">

### Passing the updater function {/*passing-the-updater-function*/}
### Updater function pass karna {/*passing-the-updater-function*/}

This example passes the updater function, so the "+3" button works.
Yh udhaaran me updater function passkiya jaata hai to "+3" button kaam karta hai.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [age, setAge] = useState(42);

  function increment() {
    setAge(a => a + 1);
  }

  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <button onClick={() => {
        increment();
      }}>+1</button>
    </>
  );
}
```

```css
button { display: block; margin: 10px; font-size: 20px; }
h1 { display: block; margin: 10px; }
```

</Sandpack>

<Solution />

### Passing the next state directly {/*passing-the-next-state-directly*/}
### Agla state directly pass karna {/*passing-the-next-state-directly*/}

This example **does not** pass the updater function, so the "+3" button **doesn't work as intended**.
Ye udhaaran updater function pass **nahi** karta, to "+3" button **iccha anusaar kaam nahi karta**.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [age, setAge] = useState(42);

  function increment() {
    setAge(age + 1);
  }

  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <button onClick={() => {
        increment();
      }}>+1</button>
    </>
  );
}
```

```css
button { display: block; margin: 10px; font-size: 20px; }
h1 { display: block; margin: 10px; }
```

</Sandpack>

<Solution />

</Recipes>

---

### Updating objects and arrays in state {/*updating-objects-and-arrays-in-state*/}
### State me objects aur arrays update karna {/*updating-objects-and-arrays-in-state*/}

You can put objects and arrays into state. In React, state is considered read-only, so **you should *replace* it rather than *mutate* your existing objects**. For example, if you have a `form` object in state, don't update it like this:
Aap state me objects aur arrays daal sakte hai. React me, state ko read-only hi consider kiya jaata hai, to **aapko usse *replace* karna hoga na ki *mutate* karna**.

```js
// 🚩 Don't mutate an object in state like this:
form.firstName = 'Taylor';
```

Instead, replace the whole object by creating a new one:
Instead, naya object bana ke pura object replace karna:

```js
// ✅ Replace state with a new object
setForm({
  ...form,
  firstName: 'Taylor'
});
```

Read [updating objects in state](/learn/updating-objects-in-state) and [updating arrays in state](/learn/updating-arrays-in-state) to learn more.
[state me objects update karna](/learn/updating-objects-in-state) aur [state me array update karne](/learn/updating-arrays-in-state) ke baare me aur padhiye.

<Recipes titleText="Examples of objects and arrays in state / state me objects aur arrays ke udhaaran" titleId="examples-objects">

### Form (object) {/*form-object*/}

In this example, the `form` state variable holds an object. Each input has a change handler that calls `setForm` with the next state of the entire form. The `{ ...form }` spread syntax ensures that the state object is replaced rather than mutated.
Is udhaaran me, `form` state variable ek object ko hold karta hai. Har input me ek change handler hai jo `setForm` ko puure form ke agle state ke saath bulaata hai. `{ ...form}` ka spread syntax yh ensure karta hai ki state object mutate nahi replace ho jaaye.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [form, setForm] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  });

  return (
    <>
      <label>
        First name:
        <input
          value={form.firstName}
          onChange={e => {
            setForm({
              ...form,
              firstName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Last name:
        <input
          value={form.lastName}
          onChange={e => {
            setForm({
              ...form,
              lastName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Email:
        <input
          value={form.email}
          onChange={e => {
            setForm({
              ...form,
              email: e.target.value
            });
          }}
        />
      </label>
      <p>
        {form.firstName}{' '}
        {form.lastName}{' '}
        ({form.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; }
```

</Sandpack>

<Solution />

### Form (nested object) {/*form-nested-object*/}

In this example, the state is more nested. When you update nested state, you need to create a copy of the object you're updating, as well as any objects "containing" it on the way upwards. Read [updating a nested object](/learn/updating-objects-in-state#updating-a-nested-object) to learn more.

is udhaaran me state aur be nested hai. Jab aap nested state ko update karte hai, to aapko update karne waale object ke saath me upar ke raste me jo bhi objects us object ko "contain" karte hai unke copy banane honge.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img
        src={person.artwork.image}
        alt={person.artwork.title}
      />
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

<Solution />

### List (array) {/*list-array*/}

In this example, the `todos` state variable holds an array. Each button handler calls `setTodos` with the next version of that array. The `[...todos]` spread syntax, `todos.map()` and `todos.filter()` ensure the state array is replaced rather than mutated.

is udhaaran me, `todos` state variable ek array hold karta hai. Har ek button handler `setTodos` us array ke agle version ke saath bulaata hai. `[...todos]` ka spread syntax, `todos.map()` aur `todos.filter()` ensure karte hai ki state array ko mutate nahi replace kiya jaayega.

<Sandpack>

```js App.js
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
  }

  function handleChangeTodo(nextTodo) {
    setTodos(todos.map(t => {
      if (t.id === nextTodo.id) {
        return nextTodo;
      } else {
        return t;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    setTodos(
      todos.filter(t => t.id !== todoId)
    );
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
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
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
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

If updating arrays and objects without mutation feels tedious, you can use a library like [Immer](https://github.com/immerjs/use-immer) to reduce repetitive code. Immer lets you write concise code as if you were mutating objects, but under the hood it performs immutable updates:

Yadi bina mutation ke array ya objects ko updata karna hai to aap ek library jaise [Immer](https://github.com/immerjs/use-immer#useimmerreducer) ko repetitive code kam karne ke liye use कर sakte hai. Immer aapko aise code likhne deta hai jaise aap code mutate kar rahe ho lekin hood ke niche ye immutable updates perform karta hai:
<Sandpack>

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, updateList] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
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
### Initial state ko phir recreate karna avoid karna {/*avoiding-recreating-the-initial-state*/}

React saves the initial state once and ignores it on the next renders.
React initial state ko ek baar save karta hai aur agle render me usse ignore karta hai.

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
```

Although the result of `createInitialTodos()` is only used for the initial render, you're still calling this function on every render. This can be wasteful if it's creating large arrays or performing expensive calculations.

Halanki `createInitialTodos()` ka result sirf inital render ke liye use kiya jaata hai, aap is function phir bhi har render pe bulaate hai. Agar mehenge calculations कर rahe hai ya bade bade arrays bana rahe hai ye wasteful ho sakta hai.

To solve this, you may **pass it as an _initializer_ function** to `useState` instead:
Isse solve karne ke liye, aap usse `useState` me **_initializer_ function ke roop me pass कर sakte hai**.

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

Notice that you’re passing `createInitialTodos`, which is the *function itself*, and not `createInitialTodos()`, which is the result of calling it. If you pass a function to `useState`, React will only call it during initialization.
Dhyaan dijiye ki aap `createInitialTodos` pass कर rahe hai jo *function khud* hai lekin `createIntialTodos()` nahi, jo ki function ko bulaane pr milne waala result hai. Is tareeke se initial state intialization ke baad re-create nahi hota.

React may [call your initializers twice](#my-initializer-or-updater-function-runs-twice) in development to verify that they are [pure](/learn/keeping-components-pure).
React development ke samay aapke [initializers ko do baar bulaa sakta hai](#my-initializer-or-updater-function-runs-twice) yh verify karne ke liye ki vh [pure](/learn/keeping-components-pure) hai ki nahi.

<Recipes titleText="The difference between passing an initializer and passing the initial state directly / initializer pas karna aur initial state pass karne me antar" titleId="examples-initializer">

### Passing the initializer function {/*passing-the-initializer-function*/}
### Intializer function pass karna {/*passing-the-initializer-function*/}

This example passes the initializer function, so the `createInitialTodos` function only runs during initialization. It does not run when component re-renders, such as when you type into the input.

Is udhaaran me initializer function pass kiya jata hai, to `createInitialTodos` function sirf intialization ke dauraan chalta hai. Component re-render hone pe, jaise input me type karne pe, ye function ahi chalta.

<Sandpack>

```js
import { useState } from 'react';

function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: 'Item ' + (i + 1)
    });
  }
  return initialTodos;
}

export default function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState('');

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        setTodos([{
          id: todos.length,
          text: text
        }, ...todos]);
      }}>Add</button>
      <ul>
        {todos.map(item => (
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

This example **does not** pass the initializer function, so the `createInitialTodos` function runs on every render, such as when you type into the input. There is no observable difference in behavior, but this code is less efficient.

Is udhaaran me initializer function **nahi** pass kiya jaata, to `createInitialState` function har render pe chalta hai, jaise jab ab input me type karte hai. Vyahvarik roop se dekhne par koi antar nahi hai lekin is code ki efficiency kam ho jaati hai.

<Sandpack>

```js
import { useState } from 'react';

function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: 'Item ' + (i + 1)
    });
  }
  return initialTodos;
}

export default function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  const [text, setText] = useState('');

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        setTodos([{
          id: todos.length,
          text: text
        }, ...todos]);
      }}>Add</button>
      <ul>
        {todos.map(item => (
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

### Resetting state with a key {/*resetting-state-with-a-key*/}
### Key ke saath state reset karna {/*resetting-state-with-a-key*/}

Typically, you might encounter the `key` attribute when [rendering lists](/learn/rendering-lists). However, it also serves another purpose.

[list render karte samay](/learn/rendering-lists) aap `key` attribute ko encounter kar sakte hai. However, uska ek aur purpose hai.

You can **reset a component's state by passing a different `key` to a component.** In this example, the Reset button changes the `version` state variable, which we pass as a `key` to the `Form`. When the `key` changes, React re-creates the `Form` component (and all of its children) from scratch, so its state gets reset.

Aap **alag `key` pass kar kisi component ka state reset kar sakte ho.** Is udhaaran me, Reset button `version` state variable ko badalta hai jo hum `key` ke roop me `Form` ko bhejte hai. Jab `key` badalta hai, React `Form` (aur uske baccho ko) scratch se recreate karta hai, to uska state reset ho jaata hai.

Read [preserving and resetting state](/learn/preserving-and-resetting-state) to learn more.

[state ko preserve aur reset karne ke baare me](/learn/preserving-and-resetting-state) aur padhiye.
<Sandpack>

```js App.js
import { useState } from 'react';

export default function App() {
  const [version, setVersion] = useState(0);

  function handleReset() {
    setVersion(version + 1);
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <Form key={version} />
    </>
  );
}

function Form() {
  const [name, setName] = useState('Taylor');

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Hello, {name}.</p>
    </>
  );
}
```

```css
button { display: block; margin-bottom: 20px; }
```

</Sandpack>

---

### Storing information from previous renders {/*storing-information-from-previous-renders*/}
### Pichle render ke information ko store karna {/*storing-information-from-previous-renders*/}

Usually, you will update state in event handlers. However, in rare cases you might want to adjust state in response to rendering -- for example, you might want to change a state variable when a prop changes.
Usually aap state ko event handlers me update karenge. However, rare cases me aapko state rendering ke hisaab se adjust karna hoga -- udhaaran me aapko prop change hone ke kaaran state variable change karna hoga.

In most cases, you don't need this:
Bahut se case me aapko iski zaroorat nahi hai:

* **If the value you need can be computed entirely from the current props or other state, [remove that redundant state altogether](/learn/choosing-the-state-structure#avoid-redundant-state).** If you're worried about recomputing too often, the [`useMemo` Hook](/apis/usememo) can help.
* If you want to reset the entire component tree's state, [pass a different `key` to your component.](#resetting-state-with-a-key)
* If you can, update all the relevant state in the event handlers.

* **Agar zaroorat ki value abhi ke props se ya kisi aur state se puri tarah se compute ho sakta hai, to [us redundant state ko puri tarah se hata do](/learn/choosing-the-state-structure#avoid-redundant-state).** Agar chintit hai ki aap kuch zyaada hi recompute kar rahe hai, to [`useMemo` Hook](/apis/usememo) aapki madad kar sakta hai.
* Agar pure component tree ka state reset karna chahe to [apne component me dusra `key` pass kare.](#resetting-state-with-a-key)
* Agar kar paaye to event handlers me saare relevent state update kare.

In the rare case that none of these apply, there is a pattern you can use to update state based on the values that have been rendered so far, by calling a `set` function while your component is rendering.
Kisi rare case me jaha koi bhi apply na ho, render kiye gaye values ke adhaar pr state update karne ke liye ek pattern istemaal ho sakta hai `set` function ko component render hote samay bulaake.

Here's an example. This `CountLabel` component displays the `count` prop passed to it:
Yh ek udhaaran hai. `CountLabel` component usme pass kiya gaya `count` prop ko display karta hai:

```js CountLabel.js
export default function CountLabel({ count }) {
  return <h1>{count}</h1>
}
```

Say you want to show whether the counter has *increased or decreased* since the last change. The `count` prop doesn't tell you this -- you need to keep track of its previous value. Add the `prevCount` state variable to track it. Add another state variable called `trend` to hold whether the count has increased or decreased. Compare `prevCount` with `count`, and if they're not equal, update both `prevCount` and `trend`. Now you can show both the current count prop and *how it has changed since the last render*.

Say aapko dikhna hai counter last change ke comparison me *increase ya decrease* hua hai. `count` prop aapko yh nahi batata -- aapko uska previous value track karna hoga. usse track karne ke liye `prevCount` ko add kare. Ek aur state variable `trend` add kare jo batata hai whether count badha hai ya ghata hai. `prevCount` ko `count` ke saath compare kare aur agar wo dono equal nahi hai to dono `prevCount` aur trend ko update kare. Ab aap dono abhi ka count prop aur *pichle render se kaise badla hai* dikha sakte ho.

<Sandpack>

```js App.js
import { useState } from 'react';
import CountLabel from './CountLabel.js';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <CountLabel count={count} />
    </>
  );
}
```

```js CountLabel.js active
import { useState } from 'react';

export default function CountLabel({ count }) {
  const [prevCount, setPrevCount] = useState(count);
  const [trend, setTrend] = useState(null);
  if (prevCount !== count) {
    setPrevCount(count);
    setTrend(count > prevCount ? 'increasing' : 'decreasing');
  }
  return (
    <>
      <h1>{count}</h1>
      {trend && <p>The count is {trend}</p>}
    </>
  );
}
```

```css
button { margin-bottom: 10px; }
```

</Sandpack>

Note that if you call a `set` function while rendering, it must be inside a condition like `prevCount !== count`, and there must be a call like `setPrevCount(count)` inside of the condition. Otherwise, your component would re-render in a loop until it crashes. Also, you can only update the state of the *currently rendering* component like this. Calling the `set` function of *another* component during rendering is an error. Finally, your `set` call should still [update state without mutation](#updating-objects-and-arrays-in-state) -- this special case doesn't mean you can break other rules of [pure functions](/learn/keeping-components-pure).

Dhyaan rakhe ki agar aap `set` ko render karte samay bulaayenge to usse kisi condition ke andar hona chahiye jaise `prevCount !== count`, aur us condition ke andar `setPrevCount(count)` jaise ek call bhi hona chahiye. Nahi to aapka component ek loop me tab tak re-render karega jab tak wo crash nahi jo jaata. Aur, aap sirf *Abhi render hone waale* component ka state aise update kar sakte hai. `set` function ko render karte samay *dusre* component me bulaana ek error hai. Ant me, aapka `set` ka bulaawa ko abhi bhi [mutation ke bagair state update karna hoga](#updating-objects-and-arrays-in-state) -- is special case ka yh matlab nahi hai ki aap [pure functions](/learn/keeping-components-pure) ke baaki rules tod de.

This pattern can be hard to understand and is usually best avoided. However, it's better than updating state in an effect. When you call the `set` function during render, React will re-render that component immediately after your component exits with a `return` statement, and before rendering the children. This way, children don't need to render twice. The rest of your component function will still execute (and the result will be thrown away), but if your condition is below all the calls to Hooks, you may add `return null` inside it to restart rendering earlier.

Yh patter samajme ne mushkil hai aur usually best hai ki ye avoid kiya jay, Lekin effect me se to state update karne se accha hai. Jab aap `set` function ko render karte samay bulaate hai, React baccho ko render karne ke pehle aur component ek `return` statement je saath exit karte hi uss component ko turant update karta hai.
---

## Reference {/*reference*/}

### `useState(initialState)` {/*usestate*/}

Call `useState` at the top level of your component to declare a [state variable](/learn/state-a-components-memory).
apne component ke sabse upar waale level pe [state variable](/learn/state-a-components-memory) declare karne ke liye `useState` ko bulaaye.

```js
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
```

The convention is to name state variables like `[something, setSomething]` using [array destructuring](/learn/a-javascript-refresher#array-destructuring).

state variables ko [array destructuring](/learn/a-javascript-refresher#array-destructuring) ke saath naam karna convention hai jaise `[something, setSomething]`

[See more examples above.](#examples-basic)
[upar aur udhaaran dekhiye](#examples-basic)

#### Parameters {/*parameters*/}

* `initialState`: The value you want the state to be initially. It can be a value of any type, but there is a special behavior for functions. This argument is ignored after the initial render.
  * If you pass a function as `initialState`, it will be treated as an _initializer function_. It should be pure, should take no arguments, and should return a value of any type. React will call your initializer function when initializing the component, and store its return value as the initial state. [See an example above.](#avoiding-recreating-the-initial-state)

* `initialState`: Vo value jo aap chahte ho ki state ke pass intially ho. Kisi bhi prakaar ka value ho sakta hai lekin function ke liye special behaviour hai. Ye argument pehle render ke baad ignore kiya jaata hai.
  * Agar aap ek function ko `initialState` me pass kare, to usse ek _initializer function_ ke roop me treat kiya jaayga. Usse pure hona chahiye, arguments nahi lena chahiye aur kisi bhi prakaar ka value return karna hoga. React aapka initializer function tab bulaayega jab aapka component initialize karna ho aur uska return value ko initial state ke roop me store karna ho. [Upar ek udhaaran dekhiye.](#avoiding-recreating-the-initial-state)

#### Returns {/*returns*/}

`useState` returns an array with exactly two values:
`useState` ek array return karta hai jisme exactly do values hai:

1. The current state. During the first render, it will match the `initialState` you have passed.
2. The [`set` function](#setstate) that lets you update the state to a different value and trigger a re-render.

1. Abhi ka state. Pehle render ke dauraan, ye aapke dwaara pass kiya gaya `initialState`ke saath match karega.
2. [`set` function](#setstate) aapko state ko alag value ke saath update karne deta hai aur re-render trigger hota hai.

#### Caveats {/*caveats*/}

* `useState` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can't call it inside loops or conditions. If you need that, extract a new component and move the state into it.
* In Strict Mode, React will **call your initializer function twice** in order to [help you find accidental impurities](#my-initializer-or-updater-function-runs-twice). This is development-only behavior and does not affect production. If your initializer function is pure (as it should be), this should not affect the logic of your component. The result from one of the calls will be ignored.

* `useState` ek Hook hai to aap usse sirf **component ke sabse upar waale level** pe bula sakte hai ya apne Hooks me bula sakte ho. Isse loops aur conditions ke andar nahi bula sakte. Agar uski zaroorat hai to ek naya component extract kare aur usme state move karna hoga.
* Strict Mode me, [accidental impurities doondhne](#my-initializer-or-updater-function-runs-twice) ke liye React **आपके intializer ko do baar** bulata hai. Ye ek development-only vyavhaar hai aur aapke production ko affect nahi karega. Agar aapka initializer function pure hai (jo hona chahiye), to usse aapke component ke logic affect nahi karna chahiye. kisi ek call ka result ignore ho jayega.

---

### `set` functions, like `setSomething(nextState)` {/*setstate*/}

The `set` function returned by `useState` lets you update the state to a different value and trigger a re-render. You can pass the next state directly, or a function that calculates it from the previous state:

`useState` dwaara return kiya gaya `set` function aapko dusre value ke saath state update karne deta hai aur re-render trigger karne deta hai. Aap agle state ko directly pass kar sakte ho ya phir ek function usse pichle state se calculate kar sakta hai.

```js
const [name, setName] = useState('Edward');

function handleClick() {
  setName('Taylor');
  setAge(a => a + 1);
  // ...
```

#### Parameters {/*setstate-parameters*/}

* `nextState`: The value that you want the state to be. It can be a value of any type, but there is a special behavior for functions.
  * If you pass a function as `nextState`, it will be treated as an _updater function_. It must be pure, should take the pending state as its only argument, and should return the next state. React will put your updater function in a queue and re-render your component. During the next render, React will calculate the next state by applying all of the queued updaters to the previous state. [See an example above.](#updating-state-based-on-the-previous-state)

* `nextState`: Wo value jo chahte hai ki state ke pass ho. ye value kisi bhi prakaar ki ho sakti hai lekin function ke liye special vyavhaar hai.
  * Agar aap function ko `nextState` ke roop me pass karte hai to usse ek _update function_ mana jayega. Usse pure hone ke alawa sirf pending state ko argument ke roop me lena chahiye aur agla state return karna chahiye. React aapka updater function ek queue me daal aapka component re-render karega. Agle render ke samay, react saare queue kiye gaye updaters ko pichle state me laga kar naya state calculate karta hai.

#### Returns {/*setstate-returns*/}

`set` functions do not have a return value.
`set` function ka koi return value nahi hai.

#### Caveats {/*setstate-caveats*/}

* The `set` function **only updates the state variable for the *next* render**. If you read the state variable after calling the `set` function, [you will still get the old value](#ive-updated-the-state-but-logging-gives-me-the-old-value) that was on the screen before your call.

* `set` function ***agle* render ke liye sirf state variable update karta hai**. Agar aap state variable ko `set` function bulaane ke baad padhte ho to aapko call ke pehle screen pe rakhe gaye [puraana value hi milega](#ive-updated-the-state-but-logging-gives-me-the-old-value).

* If the new value you provide is identical to the current `state`, as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison, React will **skip re-rendering the component and its children.** This is an optimization. Although in some cases React may still need to call your component before skipping the children, it shouldn't affect your code.

* Agar aapka diya gaya naya value abhi ke `state` se identical [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison se determine kiya jaata hai to React **us component ko aur uske baccho ka re-rendering skip कर dega**. Yeh ek optimization hai. result ignore karne ke pehle React ko आपके component ko bulaane ki zaroorat padh sakti hai lekin isse आपका code affect nahi hona chahiye.

* React [batches state updates](/learn/queueing-a-series-of-state-updates). It updates the screen **after all the event handlers have run** and have called their `set` functions. This prevents multiple re-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use [`flushSync`](/apis/flushsync).

* React [state update ko batch karta hai](/learn/queueing-a-series-of-state-updates). **saare event handlers ke chalne ke baad** aur unke `set` functions bulaane ke baad wo screen update karta hai. ye ekl event me multiple re-renders prevent karta hai. Kisi rare case me yadi aapko React pehle screen update karne ke liye update karne ke liye force karna hoga jaise DOM acces karne ke loye, aap [`flushSync`](/apis/flushsync) ka istemaal kar sakte ho.

* Calling the `set` function *during rendering* is only allowed from within the currently rendering component. React will discard its output and immediately attempt to render it again with the new state. This pattern is rarely needed, but you can use it to **store information from the previous renders**. [See an example above.](#storing-information-from-previous-renders)

* *render karte samay* aap `set` function ussi component ke andar se bula sakte ho jo us samay render ho raha hai. React uska output discard kar turant phir se naye state ke saath render karne lagega. yh patter ka istemaal bahut hi kam hota hai leki aap isse **pichle render ke information store karne ke liye** istemaal kar sakte hai. [udhaaran ke liye upaar dekhiye.](#storing-information-from-previous-renders)

* In Strict Mode, React will **call your updater function twice** in order to [help you find accidental impurities](#my-initializer-or-updater-function-runs-twice). This is development-only behavior and does not affect production. If your updater function is pure (as it should be), this should not affect the logic of your component. The result from one of the calls will be ignored.

* Strict Mode me, [accidental impurities doondhne](#my-initializer-or-updater-function-runs-twice) ke liye React **आपके intializer ko do baar** bulata hai. Ye ek development-only vyavhaar hai aur aapke production ko affect nahi karega. Agar aapka initializer function pure hai (jo hona chahiye), to usse aapke component ke logic affect nahi karna chahiye. kisi ek call ka result ignore ho jayega.
---

## Troubleshooting {/*troubleshooting*/}

### I've updated the state, but logging gives me the old value {/*ive-updated-the-state-but-logging-gives-me-the-old-value*/}
### maine state ka value update kiya hai magar log karte samay mujhe puraana value milta hai. {/*ive-updated-the-state-but-logging-gives-me-the-old-value*/}

Calling the `set` function **does not change state in the running code**:
`set` function bulaane se **chalte code ka state nahi badalta**:

```js {4,5,8}
function handleClick() {
  console.log(count);  // 0

  setCount(count + 1); // Request a re-render with 1
  console.log(count);  // Still 0!

  setTimeout(() => {
    console.log(count); // Also 0!
  }, 5000);
}
```

This is because [states behaves like a snapshot](/learn/state-as-a-snapshot). Updating state requests another render with the new state value, but does not affect the `count` JavaScript variable in your already-running event handler.
Iska kaaran hai ki [states ka vyavhaar snapshot ki tarah hai](/learn/state-as-a-snapshot). update hone waala state naye state ke saath dusra render request karta hai lekin wo event handler me pehle se hi chal rahe `count` JavaScript ko affect nahi karega.

If you need to use the next state, you can save it in a variable before passing it to the `set` function:
agar aapko agla state use karna ho to aap usse `set` function me bhejne se pehle ek variable me store kar sakte hai:

```js
const nextCount = count + 1;
setCount(nextCount);

console.log(count);     // 0
console.log(nextCount); // 1
```

---

### I've updated the state, but the screen doesn't update {/*ive-updated-the-state-but-the-screen-doesnt-update*/}
### state update kar liya hai lekin sreen update nahi ho raha {/*ive-updated-the-state-but-the-screen-doesnt-update*/}

React will **ignore your update if the next state is equal to the previous state,** as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. This usually happens when you change an object or an array in state directly:

React आपके **update ignore कर dega agar आपका agla state आपके pehle ke state ke samaan hai**, ye [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison ke dwaara determine kiya jaata hai. Ye usually tab hota hai jab aap kisi state me object ya array ko directly change karte ho:

```js
obj.x = 10;  // 🚩 Wrong: mutating existing object
setObj(obj); // 🚩 Doesn't do anything
```

You mutated an existing `obj` object and passed it back to `setObj`, so React ignored the update. To fix this, you need to ensure that you're always [_replacing_ objects and arrays in state instead of _mutating_ them](#updating-objects-and-arrays-in-state):

aapne मौजूदा `obj` object ko mutate kar usse `setObj` me wapas pass kar diya, isiliye React ne update ignore kar diya. Isse sudhaarne ke liye, aapko ensure karna hoga ki aap [objects aur arrays ko _replacing_ kar rahe hai na ki  _mutating_ karna](#updating-objects-and-arrays-in-state):

```js
// ✅ Correct: creating a new object
setObj({
  ...obj,
  x: 10
});
```

---

### I'm getting an error: "Too many re-renders" {/*im-getting-an-error-too-many-re-renders*/}
### IMujhe ek error mil raha hai: "Too many re-renders" {/*im-getting-an-error-too-many-re-renders*/}

You might get an error that says: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` Typically, this means that you're unconditionally setting state *during render*, so your component enters a loop: render, set state (which causes a render), render, set state (which causes a render), and so on. Very often, this is caused by a mistake in specifying an event handler:

Aapko ek error mil sakta hai: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` आम तौर पर iska arth hai ki aap *render ke dauraan* बिना शर्त ke action ko dispatch कर rahe hai, isse आपका component loop me chala jaata hai: render, dispatch (jiske कारण render hota hai), render, dispatch (jiske कारण render hota hai), aur aadi.
```js {1-2}
// 🚩 Wrong: calls the handler during render
return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler
return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

If you can't find the cause of this error, click on the arrow next to the error in the console and look through the JavaScript stack to find the specific `set` function call responsible for the error.

Yadi aapko is error ka kaaran nahi pata chalta to console me error ke bagal me arrow click kare aur JavaScript stack me देखना ki is error ke liye kaunsa `set` function ka bulaawa जिम्मेदार hai.
---

### My initializer or updater function runs twice {/*my-initializer-or-updater-function-runs-twice*/}
### Mera reducer ya initializer function do baar chalta hai {/*my-reducer-or-initializer-function-runs-twice*/}

In [Strict Mode](/apis/strictmode), React will call some of your functions twice instead of once:
[Strict Mode](/apis/strictmode) me, React aapke kuch function ko do baar bulaayega:

```js {2,5-6,11-12}
function TodoList() {
  // This component function will run twice for every render.

  const [todos, setTodos] = useState(() => {
    // This initializer function will run twice during initialization.
    return createTodos();
  });

  function handleClick() {
    setTodos(prevTodos => {
      // This updater function will run twice for every click.
      return [...prevTodos, createTodo()];
    });
  }
  // ...
```

This is expected and shouldn't break your code.
Yh अपेक्षित hai aur isse aapke code ko koi nuksaan nahi hona chahiye.

This **development-only** behavior helps you [keep components pure](/learn/keeping-components-pure). React uses the result of one of the calls, and ignores the result of the other call. As long as your component, initializer, and updater functions are pure, this shouldn't affect your logic. However, if they are accidentally impure, this helps you notice the mistakes and fix it.

yh **development-only** vyavaar [aapke components shudh rakhne](/learn/keeping-components-pure) me sahyog karta hai. React kisi bhi bulaawe ka result use karta hai aur dusre bulaawe ka result ignore कर deta hai. Jab tak aapka component, initializer, aur render function shudh hai, isse aapke logic pe koi prbhaav nahi padna chahiye.

For example, this impure updater function mutates an array in state:
Udhaaran me, is ashudh reducer function state me ek array ko mutate karta hai:

```js {2,3}
setTodos(prevTodos => {
  // 🚩 Mistake: mutating state
  prevTodos.push(createTodo());
});
```

Because React calls your updater function twice, you'll see the todo was added twice, so you'll know that there is a mistake. In this example, you can fix the mistake by [replacing the array instead of mutating it](#updating-objects-and-arrays-in-state):

क्योंकि React reducer function ko do baar bulaata hai, aapko todo baar जोड़ा dikhega, to aapko pata lagega ki galti hui hai. Is udhaaran me, aap ye galti ko sudharne ke liye [array ko mutate karne ki jagah replace karoge](#updating-objects-and-arrays-in-state):

```js {2,3}
setTodos(prevTodos => {
  // ✅ Correct: replacing with new state
  return [...prevTodos, createTodo()];
});
```

Now that this updater function is pure, calling it an extra time doesn't make a difference in behavior. This is why React calling it twice helps you find mistakes. **Only component, initializer, and updater functions need to be pure.** Event handlers don't need to be pure, so React will never call your event handlers twice.

ab jab yh reducer function shudh hai, is ek aur baar bulaane se vyavhaar me koi antar nahi dikhta. Isiliye React isse do baar bulaane se aapko galtiyaan doondne me aasaani padti hai. **Sirf component, initializer, aur reducer function ko shudh hona chahiye.** Event handlers jo shudh hone ki avashyakta nahi hai to React aapke event handlers ko kabhi bhi do baar nahi bulaayega.

Read [keeping components pure](/learn/keeping-components-pure) to learn more.
Aur jaanne ke liye, [components shudh rakhne ke baare](/learn/keeping-components-pure) padhiye.

---

### I'm trying to set state to a function, but it gets called instead {/*im-trying-to-set-state-to-a-function-but-it-gets-called-instead*/}
### Me function me state set karne ka pryaas kar raha hu lekin wo call ho jaata hai {/*im-trying-to-set-state-to-a-function-but-it-gets-called-instead*/}

You can't put a function into state like this:
aap state me function aise nahi daal sakte:

```js
const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

Because you're passing a function, React assumes that `someFunction` is an [initializer function](#avoiding-recreating-the-initial-state), and that `someOtherFunction` is an [updater function](#updating-state-based-on-the-previous-state), so it tries to call them and store the result. To actually *store* a function, you have to put `() =>` before them in both cases. Then React will store the functions you pass.

Kyunki aap ek function pass kar rahe hai, React maanta hai ki `someFunction` ek [initializer function](#avoiding-recreating-the-initial-state) hai, aur `someOtherFunction` ek [updater function](#updating-state-based-on-the-previous-state) hai, to wo unhe bulaane ki koshish kar uske result ko store karta hai. Function ko *actually* store karne ke liye, aapko `() =>` unke pehle daalna hoga dono cases me, Phir react aapke dwaara pass kiye gay functions ko store karega.
```js {1,4}
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```
