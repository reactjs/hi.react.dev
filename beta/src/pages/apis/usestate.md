---
title: useState
---

<Intro>

`useState` is a React Hook that lets you add a [state variable](/learn/state-a-components-memory) to your component.
`useState` एक React Hook है जो आपको अपने कौम्पोनॅन्ट में एक [state वेरिएबल](/learn/state-a-components-memory) ऐड करने देता है.

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
  - [I'm getting an error: "Too many री-renders"](#im-getting-an-error-too-many-री-renders)
  - [My initializer or updater function runs twice](#my-initializer-or-updater-function-runs-twice)
  - [I'm trying to set state to a function, but it gets called instead](#im-trying-to-set-state-to-a-function-but-it-gets-called-instead)

---

## युसेज {/*usage*/}

### Adding state to a component {/*adding-state-to-a-component*/}
### कौम्पोनॅन्ट में state ऐड करना {/*adding-state-to-a-component*/}

Call `useState` at the top level of your component to declare one or more [state variables](/learn/state-a-components-memory).
अपने कौम्पोनॅन्ट के सबसे उपरी लेवल में `useState` को बुलाए एक या अधिक [state वेरिएबलस](/learn/state-a-components-memory) डिक्लेर करने के लिए.

```js [[1, 4, "age"], [2, 4, "setAge"], [3, 4, "42"], [1, 5, "name"], [2, 5, "setName"], [3, 5, "'Taylor'"]]
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(42);
  const [name, setName] = useState('Taylor');
  // ...
}
```

The convention is to name state variables like `[something, setSomething]` using [array destructuring](/learn/a-javascript-refresher#array-destructuring).
state वेरिएबलस को [array डीस्ट्रक्चरिंग ](/learn/a-javascript-refresher#array-destructuring) के साथ नाम करना परिपाटी है, जैसे `[something, setSomething]`.

`useState` returns an array with exactly two items:
`useState` एक array रिटर्न करता है जिसमे इग्ज़ैक्ट्ली दो आइटम्ज़ है:

1. The <CodeStep step={1}>current state</CodeStep> of this state variable, initially set to the <CodeStep step={3}>initial state</CodeStep> you provided.
2. The <CodeStep step={2}>`set` function</CodeStep> that lets you change it to any other value in response to interaction.

1. इस state वेरिएबल का <CodeStep step={1}>current state</CodeStep>, जिससे शुरुआत में आपके द्वारा दिया गया <CodeStep step={3}>initial state</CodeStep> पर सेट किया जाता है.

To update what’s on the screen, call the `set` function with some next state:
स्क्रीन को अप्डेट करने के लिए, `set` फ़ंक्शन को किसी और state के साथ बुलाओ.

```js [[2, 2, "setName"]]
function handleClick() {
  setName('Robin');
}
```

React will store the next state, render your component again with the new values, and update the UI.
React अगला state स्टोर कर देगा, नए वैल्यूस के सात कौम्पोनॅन्ट रेंडर करेगा और UI को अप्डेट करेगा.

<Gotcha>

Calling the `set` function [**does not** change the current state in the already executing code](#ive-updated-the-state-but-logging-gives-me-the-old-value):
`set`फ़ंक्शन बुलाने से [चल रहे कोड में अभी का state **नही बदलता**](#ive-updated-the-state-but-logging-gives-me-the-old-value):

```js {3}
function handleClick() {
  setName('Robin');
  console.log(name); // Still "Taylor"!
}
```

It only affects what `useState` will return starting from the *next* render.
वह सिर्फ *अगले* रेंडर से `useState` का रिटर्न वैल्यू को प्रभावित करेगा.

</Gotcha>

<Recipes titleText="Basic useState examples / useState के बेसिक उदाहरण" titleId="examples-basic">

### Counter (number) {/*counter-number*/}

In this example, the `count` state variable holds a number. Clicking the button increments it.
इस उदाहरण में, `count` state वेरिएबल एक नम्बर होल्ड करता है. बटन दबाने से वह बढ़ता है।

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

### टेक्स्ट फ़ील्ड (स्ट्रिंग) {/*text-field-string*/}

In this example, the `text` state variable holds a string. When you type, `handleChange` reads the latest input value from the browser input DOM element, and calls `setText` to update the state. This allows you to display the current `text` below.
इस उदाहरण me, `text` state वेरिएबल एक स्ट्रिंग होल्ड करता है. जब आप टाइप करते है, `handleChange` सबसे लेटेस्ट इनपुट वैल्यू ब्राउज़र इनपुट DOM एलेमेंट से पढ़ता है, `setText` को state अप्डेट करने के लिए बुलाता है. यह आपको नीचे `current` टेक्स्ट डिस्प्ले करने देता है.

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

### चेक्बाक्स (बूलियन) {/*checkbox-boolean*/}

In this example, the `liked` state variable holds a boolean. When you click the input, `setLiked` updates the `liked` state variable with whether the browser checkbox input is checked. The `liked` variable is used to render the text below the checkbox.

इस उदाहरण में, `liked` state वेरिएबल एक बूलियन होल्ड करता है. जब आप इनपुट क्लिक करते है, `setLiked` `liked` state वेरिएबल को अप्डेट करता है साथ में यदि ब्राउज़र का चेक्बाक्स इनपुट की जाँच हुई है या नहीं. `liked` वेरिएबल को चेक्बाक्स के नीचे टेक्स्ट को रेंडर करने के लिए यूज़ किया जाता है.
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

### फ़ॉर्म (दो वेरीअबल) {/*form-two-variables*/}

You can declare more than one state variable in the same component. Each state variable is completely independent.
आप एक कौम्पोनॅन्ट में एक से ज़्यादा state वेरिएबल डिक्लेर कर सकते है. हर state वेरिएबल पूरी तरह से स्वतंत्र है.

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
### पिचले state के आधार पर state अप्डेट करना {/*updating-state-based-on-the-previous-state*/}

Suppose the `age` is `42`. This handler calls `setAge(age + 1)` three times:
मान लीजिए `age` का वैल्यू `42` है. यह हैंड्लर `setAge(age + 1)` तीन बार बुलाता है:

```js
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

However, after one click, `age` will only be `43` rather than `45`! This is because calling the `set` function [does not update](/learn/state-as-a-snapshot) the `age` state variable in the already running code. So each `setAge(age + 1)` call becomes `setAge(43)`.

परंतु, एक क्लिक के बाद, `age` का वैल्यू `43` ही होगा ना कि `45`! ऐसा इसीलिए है क्योंकि `set` फ़ंक्शन पहले से ही चल रहे कोड में [अप्डेट नही करता](/learn/state-as-a-snapshot). तो हर `setAge(age + 1)` का बुलावा`setAge(43)` बन जाता है.

To solve this problem, **you may pass an *updater function*** to `setAge` instead of the next state:
इस समस्या को हल करने के लिए अगले state की जगह, आप `setAge` को **एक *अप्डेटर फ़ंक्शन* पास कर सकते** है.

```js [[1, 2, "a", 0], [2, 2, "a + 1"], [1, 3, "a", 0], [2, 3, "a + 1"], [1, 4, "a", 0], [2, 4, "a + 1"]]
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

Here, `a => a + 1` is your updater function. It takes the <CodeStep step={1}>pending state</CodeStep> and calculates the <CodeStep step={2}>next state</CodeStep> from it.
यहा पे, `a => a + 1` आपका अप्डेटर फ़ंक्शन है. यह <CodeStep step={1}>pending state</CodeStep> को इस्तेमाल कर <CodeStep step={2}>next state</CodeStep> कैल्क्युलेट करता है.

React puts your updater functions in a [queue](/learn/queueing-a-series-of-state-updates). Then, during the next render, it will call them in the same order:
React आपके अप्डेटर फ़ंक्शन एक [क़तार](/learn/queueing-a-series-of-state-updates) में रखता है. फ़िर अगले रेंडर में, उसे वही ऑर्डर में बुलाएगा:

1. `a => a + 1` will receive `42` as the pending state and return `43` as the next state.
1. `a => a + 1` will receive `43` as the pending state and return `44` as the next state.
1. `a => a + 1` will receive `44` as the pending state and return `45` as the next state.

1. `a => a + 1` को `42` pending state के रूप me मिलेगा और अगले state के रूप me `43` return करेगा.
1. `a => a + 1` को `43` pending state के रूप me मिलेगा और अगले state के रूप me `44` return करेगा.
1. `a => a + 1` को `44` pending state के रूप me मिलेगा और अगले state के रूप me `45` return करेगा.

There are no other queued updates, so React will store `45` as the current state in the end.
और कोई अप्डेटस क़तार में नही है तो React वर्तमान state के रूप में `45` को स्टोर करेगा.

By convention, it's common to name the pending state argument for the first letter of the state variable name, like `a` for `age`. However, you may also call it like `prevAge` or something else that you find clearer.
परिपाटी के अनुसार, बकाया state तर्क को state वेरीअबल के पहले अक्षर के साथ नाम करना आम बात है जैसे `age` के लिए `a`.

React may [call your updaters twice](#my-initializer-or-updater-function-runs-twice) in development to verify that they are [pure](/learn/keeping-components-pure).
React विकास के समय आपके [अप्डेटरस दो बार बुला सकता है](#my-initializer-or-updater-function-runs-twice) यह वेरिफ़ाई करने के लिए वह [शुद्ध](/learn/keeping-components-pure) है.

<DeepDive title="Is using an updater always preferred? / क्या अप्डेटर यूज़ करना मुनासिब है?">

You might hear a recommendation to always write code like `setAge(a => a + 1)` if the state you're setting is calculated from the previous state. There is no harm in it, but it is also not always necessary.
आपको कोड इस तरह से लिखने `setAge(a => a + 1)` की सिफ़ारिश मिल सकती है यदि जो state आप सेट कर रहे हैं वह पिछले state से परिगणित है.

In most cases, there is no difference between these two approaches. React always makes sure that for intentional user actions, like clicks, the `age` state variable would be updated before the next click. This means there is no risk of a click handler seeing a "stale" `age` at the beginning of the event handler.
ज़्यादातर मामलों में इन दोनो दृष्टिकोण में कोई अंतर नही है. React हमेशा अंदर रखता है कि यूज़र के अभीष्ट गतिविधियों के लिए, जैसे क्लिक्स, `age` state वेरिएबल अगले क्लिक के पहले अप्डेट हो जाएगा. इसका अर्थ है कि क्लिक इवेंट हैंड्लर के शुरुआत में "पुराना" age देखने का कोई रिस्क नही है.

However, if you do multiple updates within the same event, updaters can be helpful. They're also helpful if accessing the state variable itself is inconvenient (you might run into this when optimizing री-renders).
हालाँकि , अगर आप एक ही इवेंट में विभिन्न अप्डेट करते है तो अप्डेटरस सहायक हो सकते है. वह तब भी सहयोगी है जब state वेरिएबल को खुद ऐक्सेस करना असुविधाजनक है. (री-रेंडर अनुकूलन करते समय आप इसमें रन कर सकते है)

If you prefer consistency over slightly more verbose syntax, it's reasonable to always write an updater if the state you're setting is calculated from the previous state. If it's calculated from the previous state of some *other* state variable, you might want to combine them into one object and [use a reducer](/learn/extracting-state-logic-into-a-reducer).
अगर आप थोड़ा सा वर्बोस सिंटैक्स से ज़्यादा संगतता को वरीयता देते हैं, तो यह अप्डेटर लिखना तर्कसंगत होता है अगर आप के द्वारा सेट किये जानेवाला state पिछले state से परिगणित है.

</DeepDive>

<Recipes titleText="The difference between passing an updater and passing the next state directly / updater pass करने और directly next state pass करने me अंतर" titleId="examples-updater">

### Passing the updater function {/*passing-the-updater-function*/}
### Updater function pass करना {/*passing-the-updater-function*/}

This example passes the updater function, so the "+3" button works.
इस उदाहरण में अप्डेटर फ़ंक्शन पास किया जाता है तो "+3" बटन काम करता है.

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
### अगला state प्रत्यक्ष पास करना {/*passing-the-next-state-directly*/}

This example **does not** pass the updater function, so the "+3" button **doesn't work as intended**.
यह उदाहरण अप्डेटर function पास **नहीं** करता, to "+3"बटन **इच्छानुसार काम नहीं करता**.

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
### State me objects और arrays update करना {/*updating-objects-and-arrays-in-state*/}

You can put objects and arrays into state. In React, state is considered read-only, so **you should *replace* it rather than *mutate* your existing objects**. For example, if you have a `form` object in state, don't update it like this:
आप state में ऑब्जेक्टस और अरेज़ डाल सकते हैं. रीऐक्ट में, state को केवल पठन के लिए ही विचार किया जाता है, तो **आपको उसे *प्रतिस्थापित* करना होगा ना कि *रूपांतरित* करना**.

```js
// 🚩 Don't mutate an object in state like this:
form.firstName = 'Taylor';
```

Instead, replace the whole object by creating a new one:
Instead, naya object बना के पूरा object replace करना:

```js
// ✅ Replace state with a new object
setForm({
  ...form,
  firstName: 'Taylor'
});
```

Read [updating objects in state](/learn/updating-objects-in-state) and [updating arrays in state](/learn/updating-arrays-in-state) to learn more.
[state में ऑब्जेक्टस अप्डेट करना](/learn/updating-objects-in-state) और [state में अरे अप्डेट करने](/learn/updating-arrays-in-state) के बारे में और पढ़िए.

<Recipes titleText="Examples of objects and arrays in state / state me objects और arrays के उधारण" titleId="examples-objects">

### Form (object) {/*form-object*/}

In this example, the `form` state variable holds an object. Each input has a change handler that calls `setForm` with the next state of the entire form. The `{ ...form }` spread syntax ensures that the state object is replaced rather than mutated.
इस उदाहरण में, `form` state वेरिएबल एक ऑब्जेक्ट को होल्ड करता है. हर इनपुट में एक चेंज हैंड्लर है जो `setForm` को शुद्ध रूप के अगले state के साथ बुलाता है. `{ ...form}` का स्प्रेड सिंटैक्स यह सुनिश्चित करता है कि state object रूपांतरित नहीं हो प्रतिस्थापित हो जाए.

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

इस उदाहरण में state और भी नेस्टेड है. जब आप नेस्टेड state को अप्डेट करते है, तो आपको अप्डेट करने वाले ऑब्जेक्ट के साथ में ऊपर के रास्ते में जो भी आब्जेक्ट्स उस ऑब्जेक्ट को "समाविष्ट" करते है उनके प्रतिलिपि बनाने होंगे.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki दे Saint Phalle',
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

### लिस्ट (अरे) {/*list-array*/}

In this example, the `todos` state variable holds an array. Each button handler calls `setTodos` with the next version of that array. The `[...todos]` spread syntax, `todos.map()` and `todos.filter()` ensure the state array is replaced rather than mutated.

इस उदाहरण में, `todos` state वेरिएबल एक अरे होल्ड करता है. हर एक बटन हैंड्लर `setTodos` उस अरे के अगले के साथ वर्शन बुलाता है. `[...todos]` का स्प्रेड सिंटैक्स, `todos.map()` और `todos.filter()` सुनिश्चित करते है कि स्टेट अरे को रूपांतरित नही प्रतिस्थापित किया जाएगा.

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
### Immer के साथ संक्षिप्त अप्डेट लॉजिक लिखना {/*writing-concise-update-logic-with-immer*/}

If updating arrays and objects without mutation feels tedious, you can use a library like [Immer](https://github.com/immerjs/use-immer) to reduce repetitive code. Immer lets you write concise code as if you were mutating objects, but under the hood it performs immutable updates:

यदि बिना परिवर्तन के अरे या आब्जेक्ट्स को अप्डेट करना है तो आप एक लाइब्रेरी जैसे [Immer](https://github.com/immerjs/use-immer#useimmerreducer) को बार-बार आने वाले कोड कम करने के लिए यूज़ कर सकते है. Immer आपको सिर्फ कोड लिखने देता है जैसे आप कोड परिवर्तित कर रहे हो लेकिन हुड के नीचे यह अपरिवर्तनीय अप्डेट् निष्पादित करता है:
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
### इनिशल state को फ़िर सृष्ट करने से बचना {/*avoiding-recreating-the-initial-state*/}

React saves the initial state once and ignores it on the next renders.
React इनिशल state को एक बार सहेज कर रखता है और अगले रेंडर में उसे नज़रंदाज़ करता है.

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
```

Although the result of `createInitialTodos()` is only used for the initial render, you're still calling this function on every render. This can be wasteful if it's creating large arrays or performing expensive calculations.

हालाँकि `createInitialTodos()` का परिणाम सिर्फ़ इनिशल रेंडर के लिए यूज़ किया जाता है, आप इस फ़ंक्शन फ़िर भी हर रेंडर पर बुलाते हैं. अगर महंगे कैल्क्युलेशंज़ कर रहे हैं या बड़े बड़े अरेज़ बना रहे है यह अपव्ययी हो सकता है.

To solve this, you may **pass it as an _initializer_ function** to `useState` instead:
इसे हल करने के लिए, आप उसे `useState` में **_प्रारंभकर्ता_ फ़ंक्शन के रूप में पास कर सकते है**.

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

Notice that you’re passing `createInitialTodos`, which is the *function itself*, and not `createInitialTodos()`, which is the result of calling it. If you pass a function to `useState`, React will only call it during initialization.
ध्यान दीजिए कि आप `createInitialTodos` पास कर रहे है जो *फ़ंक्शन खुद* है लेकिन `createIntialTodos()` नही, जो कि फ़ंक्शन को बुलाने पर मिलनेवाला परिणाम है. इस तरीक़े से इनिशल state आरंभिकरण के बाद री-क्रीएट नहीं होता.

React may [call your initializers twice](#my-initializer-or-updater-function-runs-twice) in development to verify that they are [pure](/learn/keeping-components-pure).
React डिवेलप्मेंट के समय आपके [प्रारंभकर्ता को दो बार बुला सकता है](#my-initializer-or-updater-function-runs-twice) यह सत्यापित करने के लिए कि वह [pure](/learn/keeping-components-pure) है कि नहीं.

<Recipes titleText="The difference between passing an initializer and passing the initial state directly / इनितीयलिसेर पास करना और इनिशल state pass करने में अंतर" titleId="examples-initializer">

### Passing the initializer function {/*passing-the-initializer-function*/}
### Intializer function pass करना {/*passing-the-initializer-function*/}

This example passes the initializer function, so the `createInitialTodos` function only runs during initialization. It does not run when component री-renders, such as when you type into the input.

इस उदाहरण में इनिशलिसेर फ़ंक्शन पास किया जाता है, तो `createInitialTodos` फ़ंक्शन सिर्फ प्रारम्भ के दौरान चलता है. कौम्पोनॅन्ट री-रेंडर होने पर, जैसे इनपुट में टाइप करने पर, यह फ़ंक्शन नहीं चलता.

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
### intial state directly pass करना {/*passing-the-initial-state-directly*/}

This example **does not** pass the initializer function, so the `createInitialTodos` function runs on every render, such as when you type into the input. There is no observable difference in behavior, but this code is less efficient.

इस उदाहरण में इनिशलिसेर फ़ंक्शन **नहीं** पास किया जाता, to `createInitialState` फ़ंक्शन हर रेंडर पर चलता है, जैसे जब अब इनपुट में टाइप करते है. व्यवहारिक रूप से देखने पर कोई अंतर नही है लेकिन इस कोड की दक्षता कम हो जाती है.

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
### Key के सात state reset करना {/*resetting-state-with-a-key*/}

Typically, you might encounter the `key` attribute when [rendering lists](/learn/rendering-lists). However, it also serves another purpose.

[list रेंडर करते समय](/learn/rendering-lists) आप `key` एट्रिब्यूट का सामना कर सकते है. हालाँकि, उसका एक और प्रयोजन है.

You can **reset a component's state by passing a different `key` to a component.** In this example, the Reset button changes the `version` state variable, which we pass as a `key` to the `Form`. When the `key` changes, React री-creates the `Form` component (and all of its children) from scratch, so its state gets reset.

आप **अलग `key` पास कर किसी कौम्पोनॅन्ट का state रीसेट कर सकते हो.** इस उदाहरण में, Reset button `version` state वेरिएबल को बदलता है जो हम `key` के रूप में `Form` को भेजते हैं. जब `key` बदलता है, रीऐक्ट `Form` (और उसके बच्चों को) शून्य से रीक्रीएट करता है, तो उसका state रीसेट हो जाता है.

Read [preserving and resetting state](/learn/preserving-and-resetting-state) to learn more.

[state को preserve और reset करने के बारे में](/learn/preserving-and-resetting-state) और पढ़िए.
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
### पिचले रेंडर के information को store करना {/*storing-information-from-previous-renders*/}

Usually, you will update state in event handlers. However, in rare cases you might want to adjust state in response to rendering -- for example, you might want to change a state variable when a prop changes.
आम तौर पर आप state को इवेंट हैंडलर्स में अप्डेट करेंगे. हालाँकि, कुछ दुर्लभ मामलों में आपको state रेंडरिंग के हिसाब से अनुकूलन करना होगा -- उदाहरण में आपको prop बदलने के कारण state वेरिएबल बदलना होगा.

In most cases, you don't need this:
बहुत से केस में आपको इसकी ज़रूरत नहीं है:

* **If the value you need can be computed entirely from the current props or other state, [remove that redundant state altogether](/learn/choosing-the-state-structure#avoid-redundant-state).** If you're worried about recomputing too often, the [`useMemo` Hook](/apis/usememo) can help.
* If you want to reset the entire component tree's state, [pass a different `key` to your component.](#resetting-state-with-a-key)
* If you can, update all the relevant state in the event handlers.

* **अगर zaroorat कि वैल्यू अभी के props से या किसी और state से पूरी तरह से compute हो सकता है, to [us redundant state को पूरी तरह से hata do](/learn/choosing-the-state-structure#avoid-redundant-state).** अगर चिंतित है कि आप कुछ ज़्यादा ही री-कम्प्यूट कर रहे है, तो [`useMemo` Hook](/apis/usememo)आपकी मदद कर सकता है.
* अगर शुद्ध कौम्पोनॅन्ट ट्री का state रीसेट करना चाहे तो [अपने कौम्पोनॅन्ट में दूसरा `key`पास करे.](#resetting-state-with-a-key)
* अगर कर paaye to event handlers me सारे relevent state update करे.

In the rare case that none of these apply, there is a pattern you can use to update state based on the values that have been rendered so far, by calling a `set` function while your component is rendering.
किसी दुर्लभ केस में जहाँ कोई भी लागू न हो, रेंडर किये गए वैल्यूस के आधार पर state अप्डेट करने के लिए एक प्रतिमान इस्तेमाल हो सकता है `set` function को कौम्पोनॅन्ट रेंडर होते समय बुलाकर.

Here's an example. This `CountLabel` component displays the `count` prop passed to it:
यह एक उदाहरण है. `CountLabel` कौम्पोनॅन्ट उसमें पास किया गया `count` prop को प्रदर्शित करता है:

```js CountLabel.js
export default function CountLabel({ count }) {
  return <h1>{count}</h1>
}
```

Say you want to show whether the counter has *increased or decreased* since the last change. The `count` prop doesn't tell you this -- you need to keep track of its previous value. Add the `prevCount` state variable to track it. Add another state variable called `trend` to hold whether the count has increased or decreased. Compare `prevCount` with `count`, and if they're not equal, update both `prevCount` and `trend`. Now you can show both the current count prop and *how it has changed since the last render*.

मान लीजिए आपको दिखाना है counter पिछले बदलाव की तुलना में *बढ़ा या घटा* हुआ है. `count` prop आपको यह नहीं बताता -- आपको उसका पिछला वैल्यू ट्रैक करना होगा. उसे ट्रैक करने के लिए `prevCount` को ऐड करे. एक और state वेरिएबल `trend` ऐड करे जो बताता है कि काउंट बढ़ा है या घटा है. `prevCount` को `count` के साथ तुलना करे और अगर वह दोनों समान नही है तो दोनों `prevCount` और trend को अप्डेट करे. अब आप दोनो अभी का count prop और *पिछले रेंडर से कैसे बदला है* दिखा सकते हो.

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

Note that if you call a `set` function while rendering, it must be inside a condition like `prevCount !== count`, and there must be a call like `setPrevCount(count)` inside of the condition. Otherwise, your component would री-render in a loop until it crashes. Also, you can only update the state of the *currently rendering* component like this. Calling the `set` function of *another* component during rendering is an error. Finally, your `set` call should still [update state without mutation](#updating-objects-and-arrays-in-state) -- this special case doesn't mean you can break other rules of [pure functions](/learn/keeping-components-pure).

ध्यान रखें कि अगर आप `set` को रेंडर करते समय बुलाएँगे तो उसे किसी अवस्था के अंदर होना चाहिए जैसे `prevCount !== count`, और उस अवस्था के अंदर `setPrevCount(count)` जैसे एक कॉल भी होना चाहिए. नहीं तो आपका कौम्पोनॅन्ट एक लूप में तब तक री-रेंडर करेगा जब तक वह क्रैश नहीं जो जाता. और, आप सिर्फ *अभी रेंडर होने वाले* कौम्पोनॅन्ट का state सिर्फ update कर सकते है. `set` function को रेंडर करते समय *दूसरे* कौम्पोनॅन्ट में बुलाना एक एरर है. अंत में, आपका `set` का बुलावे को अभी भी [रूपांतरण के बग़ैर state अप्डेट करना होगा](#updating-objects-and-arrays-in-state) -- इस विशेष केस का यह मतलब नहीं है कि आप [pure functions](/learn/keeping-components-pure) के बाकी नियम तोड़ दे.

This pattern can be hard to understand and is usually best avoided. However, it's better than updating state in an effect. When you call the `set` function during render, React will री-render that component immediately after your component exits with a `return` statement, and before rendering the children. This way, children don't need to render twice. The rest of your component function will still execute (and the result will be thrown away), but if your condition is below all the calls to Hooks, you may add `return null` inside it to restart rendering earlier.

यह स्वरूप समझने में है और सामन्यत: सर्वश्रेष्ठ है कि यह टाला किया जाए, लेकिन प्रभाव में से तो state अप्डेट करने से अच्‍छा है. जब आप `set` फ़ंक्शन को रेंडर करते समय बुलाते है, रीऐक्ट बच्चों को रेंडर करने के पहले और कौम्पोनॅन्ट एक `return` कथन के साथ निकास करते ही उस कौम्पोनॅन्ट को तुरंत अप्डेट करता है.

---

## Reference {/*reference*/}

### `useState(initialState)` {/*usestate*/}

Call `useState` at the top level of your component to declare a [state variable](/learn/state-a-components-memory).
अपने कौम्पोनॅन्ट के सबसे उपर वाले स्तर पर [state वेरिएबल](/learn/state-a-components-memory) घोषित करने के लिए `useState` को बुलाए.

```js
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
```

The convention is to name state variables like `[something, setSomething]` using [array destructuring](/learn/a-javascript-refresher#array-destructuring).

state वेरिएबलस को [array destructuring](/learn/a-javascript-refresher#array-destructuring) के साथ नाम करना कन्वेन्शन है जैसे `[something, setSomething]`

[See more examples above.](#examples-basic)
[उपर और उदाहरण देखिए](#examples-basic)

#### Parameters {/*parameters*/}

* `initialState`: The value you want the state to be initially. It can be a value of any type, but there is a special behavior for functions. This argument is ignored after the initial render.
  * If you pass a function as `initialState`, it will be treated as an _initializer function_. It should be pure, should take no arguments, and should return a value of any type. React will call your initializer function when initializing the component, and store its return value as the initial state. [See an example above.](#avoiding-recreating-the-initial-state)

* `initialState`: वो वैल्यू जो आप चाहते हो कि state के पास इनिशली हो. किसी भी प्रकार का वैल्यू हो सकता है लेकिन फ़ंक्शन के लिए विशेष व्यवहार है. यह तर्क पहले रेंडर के बाद इग्नोर किया जाता है.
  * अगर आप एक फ़ंक्शन को `initialState` में पास करे,तो उसे एक _इनिशलिसेर फ़ंक्शन_ के रूप में ट्रीट किया जाएगा. उसे शुद्ध होना चाहिए, तर्क नहीं लेना चाहिए और किसी भी प्रकार का वैल्यू वापस करना होगा. रीऐक्ट आपका इनिशलिसेर फ़ंक्शन तब बुलाएगा जब आपका कौम्पोनॅन्ट इनिशलाएस करना हो और उसका रिटर्न वैल्यू को इनिशल state के रूप me संग्रहित करना हो. [उपर एक उदाहरण देखिए.](#avoiding-recreating-the-initial-state)

#### Returns {/*returns*/}

`useState` returns an array with exactly two values:
`useState` एक अरे रिटर्न करता है जिसमे इग्ज़ैक्ट्ली दो वैल्यूज़ है:

1. The current state. During the first render, it will match the `initialState` you have passed.
2. The [`set` function](#setstate) that lets you update the state to a different value and trigger a री-रेंडर.

1. अभी का state. पहले रेंडर के दौरान, यह आपके द्वारा पास किया गया `initialState`के साथ मैच करेगा.
2. [`set` function](#setstate) आपको state को अलग वैल्यू के साथ अप्डेट करने देता है और री-रेंडर ट्रिगर होता है.

#### Caveats {/*caveats*/}

* `useState` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can't call it inside loops or conditions. If you need that, extract a new component and move the state into it.
* In Strict Mode, React will **call your initializer function twice** in order to [help you find accidental impurities](#my-initializer-or-updater-function-runs-twice). This is development-only behavior and does not affect production. If your initializer function is pure (as it should be), this should not affect the logic of your component. The result from one of the calls will be ignored.

* `useState` एक हुक है तो आप उसे सिर्फ **कौम्पोनॅन्ट के सबसे उपर वाले स्तर** पर बुला सकते है या अपने हुक्स में बुला सकते हो. इससे लूप्स और कंडिशंज़ के अंदर नहीं बुला सकते. अगर उसकी ज़रूरत है तो एक नया कौम्पोनॅन्ट इक्स्ट्रैक्ट करे और उसमें स्टेट मूव करना होगा.
* Strict Mode me, [accidental impurities doondhne](#my-initializer-or-updater-function-runs-twice) के लिए React **आपके intializer को do बार** bulata है. यह एक development-only vyavhaar है और आपके production को प्रभावित नहीं करेगा. अगर आपका इनिशलिसेर फ़ंक्शन शुद्ध है (जो होना चाहिए), तो उसे आपके कौम्पोनॅन्ट के लॉजिक प्रभावित नहीं करना चाहिए. किसी एक कॉल का परिणाम इग्नोर हो जाएगा.

---

### `set` functions, like `setSomething(nextState)` {/*setstate*/}

The `set` function returned by `useState` lets you update the state to a different value and trigger a री-render. You can pass the next state directly, or a function that calculates it from the previous state:

`useState` द्वारा वापस किया गया `set` फ़ंक्शन आपको दूसरे वैल्यू के साथ state अप्डेट करने देता है और री-रेंडर ट्रिगर करने देता है. आप अगले state को सीधे ही पास कर सकते हो या फ़िर एक फ़ंक्शन उसे पिछले state से कैल्क्युलेट कर सकता है.

```js
const [name, setName] = useState('Edward');

function handleClick() {
  setName('Taylor');
  setAge(a => a + 1);
  // ...
```

#### Parameters {/*setstate-parameters*/}

* `nextState`: The value that you want the state to be. It can be a value of any type, but there is a special behavior for functions.
  * If you pass a function as `nextState`, it will be treated as an _updater function_. It must be pure, should take the pending state as its only argument, and should return the next state. React will put your updater function in a queue and री-render your component. During the next render, React will calculate the next state by applying all of the queued updaters to the previous state. [See an example above.](#updating-state-based-on-the-previous-state)

* `nextState`: वह वैल्यू जो चाहते है कि state के पास हो. यह वैल्यू किसी भी प्रकार की हो सकती है लेकिन फ़ंक्शन के लिए विशेष व्यवहार है.
  * अगर आप फ़ंक्शन को `nextState` के रूप में पास करते है तो उसे एक _अप्डेट फ़ंक्शन_ माना जाएगा. उसे शुद्ध होने के अलावा सिर्फ पेंडिंग state को तर्क के रूप में लेना चाहिए और अगला state रिटर्न करना चाहिए. रीऐक्ट आपका अप्डेटर फ़ंक्शन एक क़तार में डाल आपका कौम्पोनॅन्ट री-रेंडर करेगा. अगले रेंडर के समय, रीऐक्ट सारे क्यू किये गए अप्डेटर को पिछले state में लगा कर नया state कैल्क्युलेट करता है.

#### Returns {/*setstate-returns*/}

`set` functions do not have a return value.
`set` फ़ंक्शन का कोई रिटर्न वैल्यू नही है.

#### Caveats {/*setstate-caveats*/}

* The `set` function **only updates the state variable for the *next* रेंडर**. If you read the state variable after calling the `set` function, [you will still get the old value](#ive-updated-the-state-but-logging-gives-me-the-old-value) that was on the screen before your call.

* `set` function ***अगले* रेंडर के लिए सिर्फ state वेरिएबल अप्डेट करता है**. अगर आप state वेरिएबल को `set` फ़ंक्शन बुलाने के बाद पढ़ते हो तो आपको कॉल के पहले स्क्रीन पर रखे गए [पुराना वैल्यू ही मिलेगा](#ive-updated-the-state-but-logging-gives-me-the-old-value).

* If the new value you provide is identical to the current `state`, as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison, React will **skip री-rendering the component and its children.** This is an optimization. Although in some cases React may still need to call your component before skipping the children, it shouldn't affect your code.

* अगर आपका दिया गया नया वैल्यू अभी के `state` से सदृश [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) तुलना से निर्धारित किया जाता है तो रीऐक्ट **us कौम्पोनॅन्ट को और उसके बच्चों का री-rendering skip कर देगा**. यह एक अनुकूलन है. परिणाम इग्नोर करने के पहले रीऐक्ट को आपके कौम्पोनॅन्ट को बुलाने की ज़रूरत पड़ सकती है लेकिन इससे आपका कोड प्रभावित नही होना चाहिए.

* React [batches state updates](/learn/queueing-a-series-of-state-updates). It updates the screen **after all the event handlers have run** and have called their `set` functions. This prevents multiple री-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use [`flushSync`](/apis/flushsync).

* React [state update को batch करता है](/learn/queueing-a-series-of-state-updates). **सारे event handlers के chalne के बाद** और unke `set` functions बुलाने के बाद वह screen update करता है. यह ek event me multiple री-renders prevent करता है. किसी दुर्लभ स्थिति में यदि आपको रीऐक्ट पहले स्क्रीन अप्डेट करने के लिए अप्डेट करने के लिए बल लगाना होगा जैसे DOM acces करने के लिए, आप [`flushSync`](/apis/flushsync) का इस्तेमाल कर सकते हो.

* Calling the `set` function *during rendering* is only allowed from within the currently rendering component. React will discard its output and immediately attempt to render it again with the new state. This pattern is rarely needed, but you can use it to **store information from the previous renders**. [See an example above.](#storing-information-from-previous-renders)

* *रेंडर करते समय* आप `set` function उसी कौम्पोनॅन्ट के अंदर से बुला सकते हो जो us समय रेंडर हो रहा है. React उसका output discard कर turant फ़िर से नए state के सात रेंडर करने lagega. यह pattern का इस्तेमाल बहुत hi कम होता है leki आप isse **पिचले रेंडर के information store करने के लिए** इस्तेमाल कर सकते है. [उधारण के लिए upaar dekhiye.](#storing-information-from-previous-renders)

* In Strict Mode, React will **call your updater function twice** in order to [help you find accidental impurities](#my-initializer-or-updater-function-runs-twice). This is development-only behavior and does not affect production. If your updater function is pure (as it should be), this should not affect the logic of your component. The result from one of the calls will be ignored.

* Strict Mode me, [accidental impurities doondhne](#my-initializer-or-updater-function-runs-twice) के लिए React **आपके इनिशलिसेर को दो बार** bulata है. यह एक विकास-केवल व्यवहार है और आपके निर्माण को प्रभावित नहीं करेगा. अगर आपका इनिशलाइज़ फ़ंक्शन शुद्ध है (जो होना चाहिए), तो उसे आपके कौम्पोनॅन्ट के लॉजिक प्रभावित नहीं करना चाहिए. किसी एक कॉल का परिणाम इग्नोर हो जाएगा.
---

## Troubleshooting {/*troubleshooting*/}

### I've updated the state, but logging gives me the old value {/*ive-updated-the-state-but-logging-gives-me-the-old-value*/}
### maine state का वैल्यू update किया है magar log करते समय mujhe puraana वैल्यू milta है. {/*ive-updated-the-state-but-logging-gives-me-the-old-value*/}

Calling the `set` function **does not change state in the running code**:
`set` फ़ंक्शन बुलाने से **चलते कोड का state नहीं बदलता**:

```js {4,5,8}
function handleClick() {
  console.log(count);  // 0

  setCount(count + 1); // Request a री-render with 1
  console.log(count);  // Still 0!

  setTimeout(() => {
    console.log(count); // Also 0!
  }, 5000);
}
```

This is because [states behaves like a snapshot](/learn/state-as-a-snapshot). Updating state requests another render with the new state value, but does not affect the `count` JavaScript variable in your already-running event handler.
इसका कारण है कि [states का व्यवहार स्नैप्शाट की तरह है](/learn/state-as-a-snapshot). update hone waala state नए state के साथ दूसरा रेंडर रिक्वेस्ट करता है लेकिन वह इवेंट हैंड्लर में पहले से ही चल रहे `count` जावास्क्रिप्ट वेरिएबल को प्रभावित नहीं करेगा.

If you need to use the next state, you can save it in a variable before passing it to the `set` function:
अगर आपको अगला state इस्तेमाल करना हो तो आप उसे `set` फ़ंक्शन में भेजने से पहले एक वेरिएबल में स्टोर कर सकते है:

```js
const nextCount = count + 1;
setCount(nextCount);

console.log(count);     // 0
console.log(nextCount); // 1
```

---

### I've updated the state, but the screen doesn't update {/*ive-updated-the-state-but-the-screen-doesnt-update*/}
### state update कर liya है लेकिन sreen update नही हो रहा {/*ive-updated-the-state-but-the-screen-doesnt-update*/}

React will **ignore your update if the next state is equal to the previous state,** as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. This usually happens when you change an object or an array in state directly:

React आपके **update ignore कर देगा अगर आपका अगला state आपके पहले के state के samaan है**, यह [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison के द्वारा निर्धारित किया जाता है. यह आम तौर टैब होता है जब आप किसी state में ऑब्जेक्ट या अरे को सीधे ही बदलाव करते हो:

```js
obj.x = 10;  // 🚩 Wrong: mutating existing object
setObj(obj); // 🚩 Doesn't do anything
```

You mutated an existing `obj` object and passed it back to `setObj`, so React ignored the update. To fix this, you need to ensure that you're always [_replacing_ objects and arrays in state instead of _mutating_ them](#updating-objects-and-arrays-in-state):

आपने मौजूदा `obj` ऑब्जेक्ट को रूपांतरित कर उसे `setObj`में वापस पास कर दिया, इसीलिए रीऐक्ट ने अप्डेट इग्नोर कर दिया.इसे सुधारने के लिए, आपको सुनिश्चित करना होगा कि आप [objects और arrays को _replacing_ कर रहे है न कि _रूपांतरित_ करना](#updating-objects-and-arrays-in-state):

```js
// ✅ Correct: creating a new object
setObj({
  ...obj,
  x: 10
});
```

---

### I'm getting an error: "Too many री-renders" {/*im-getting-an-error-too-many-री-renders*/}
### IMujhe एक error मिल रहा है: "Too many री-renders" {/*im-getting-an-error-too-many-री-renders*/}

You might get an error that says: `Too many री-renders. React limits the number of renders to prevent an infinite loop.` Typically, this means that you're unconditionally setting state *during render*, so your component enters a loop: render, set state (which causes a render), render, set state (which causes a render), and so on. Very often, this is caused by a mistake in specifying an event handler:

आपको एक एरर मिल सकता है: `Too many री-renders. React limits the number of renders to prevent an infinite loop.` आम तौर पर इसका अर्थ है कि आप *रेंडर के दौरान* बिना शर्त के ऐक्शन को डिस्पैच कर रहे है,इससे आपका कौम्पोनॅन्ट लूप में चला जाता है: रेंडर, डिस्पैच (जिसके कारण रेंडर होता है), रेंडर, डिस्पैच (जिसके कारण रेंडर होता है), और आदि.
```js {1-2}
// 🚩 Wrong: calls the handler during render
return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler
return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

If you can't find the cause of this error, click on the arrow next to the error in the console and look through the JavaScript stack to find the specific `set` function call responsible for the error.

यदि आपको इस एरर का कारण नहीं पता चलता तो कान्सोल में एरर के बग़ल में ऐरो क्लिक करे और जावास्क्रिप्ट स्टेक में देखना कि इस एरर के लिए कौनसा `set`फ़ंक्शन का बुलावा जिम्मेदार है.
---

### My initializer or updater function runs twice {/*my-initializer-or-updater-function-runs-twice*/}
### Mera reducer या initializer function do बार चलता है {/*my-reducer-or-initializer-function-runs-twice*/}

In [Strict Mode](/apis/strictmode), React will call some of your functions twice instead of once:
[Strict Mode](/apis/strictmode) में, रीऐक्ट आपके कुछ फ़ंक्शन को दो बार बुलाएगा:

```js {2,5-6,11-12}
function TodoList() {
  // This कौम्पोनॅन्ट function will run twice for every render.

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
यह अपेक्षित है और इससे आपके कोड को कोई नुक़सान नहीं होना चाहिए.

This **development-only** behavior helps you [keep components pure](/learn/keeping-components-pure). React uses the result of one of the calls, and ignores the result of the other call. As long as your component, initializer, and updater functions are pure, this shouldn't affect your logic. However, if they are accidentally impure, this helps you notice the mistakes and fix it.

यह **development-only** व्यवहार [आपके कम्पोनेंट्स शुद्ध रखने](/learn/keeping-components-pure)में सहयोग करता है. रीऐक्ट किसी भी बुलवाए का परिणाम इस्तेमाल करता है और दूसरे बुलावे का परिणाम इग्नोर कर देता है. जब तक आपका कौम्पोनॅन्ट, इनिशलिसेर, और रेंडर फ़ंक्शन शुद्ध है, इससे आपके लॉजिक पर कोई प्रभाव नहीं पढ़ना चाहिए.

For example, this impure updater function mutates an array in state:
उदाहरण में, इस अशुद्ध रेडूसर फ़ंक्शन state में एक अरे को रूपांतरित करता है:

```js {2,3}
setTodos(prevTodos => {
  // 🚩 Mistake: mutating state
  prevTodos.push(createTodo());
});
```

Because React calls your updater function twice, you'll see the todo was added twice, so you'll know that there is a mistake. In this example, you can fix the mistake by [replacing the array instead of mutating it](#updating-objects-and-arrays-in-state):

क्योंकि React रेडूसर फ़ंक्शन को दो बार बुलाता है, आपको तोड़ो बार जोड़ा दिखेगा,तो आपको पता लगेगा कि गलती हुई है. इस उदाहरण में, आप यह गलती को सुधारने के लिए [अरे को रूपांतरित करने की जगह रिप्लेस करोगे](#updating-objects-and-arrays-in-state):

```js {2,3}
setTodos(prevTodos => {
  // ✅ Correct: replacing with new state
  return [...prevTodos, createTodo()];
});
```

Now that this updater function is pure, calling it an extra time doesn't make a difference in behavior. This is why React calling it twice helps you find mistakes. **Only component, initializer, and updater functions need to be pure.** Event handlers don't need to be pure, so React will never call your event handlers twice.

अब जब यह रेडूसर फ़ंक्शन शुद्ध है, इस एक और बार बुलाने से व्यवहार में कोई अंतर नही दिखता. इसीलिए React इससे दो बार बुलाने से आपको ग़लतियाँ ढूँढने में आसानी पड़ती है. **सिर्फ कौम्पोनॅन्ट, इनिशलिसेर, और रेडूसर फ़ंक्शन को शुद्ध होना चाहिए.** इवेंट हैंड्लरस जो शुद्ध होने की आवश्यकता नहीं है तो रीऐक्ट आपके इवेंट हैंड्लर्स को कभी भी दो बार नहीं बुलाएगा.

Read [keeping components pure](/learn/keeping-components-pure) to learn more.
और जानने के लिए, [components शुद्ध रखने के बारे](/learn/keeping-components-pure) पढ़िए.

---

### I'm trying to set state to a function, but it gets called instead {/*im-trying-to-set-state-to-a-function-but-it-gets-called-instead*/}
### Me function me state set करने का pryaas कर रहा hu लेकिन वह call हो जाता है {/*im-trying-to-set-state-to-a-function-but-it-gets-called-instead*/}

You can't put a function into state like this:
आप state में फ़ंक्शन सिर्फ नही डाल सकते:

```js
const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

Because you're passing a function, React assumes that `someFunction` is an [initializer function](#avoiding-recreating-the-initial-state), and that `someOtherFunction` is an [updater function](#updating-state-based-on-the-previous-state), so it tries to call them and store the result. To actually *store* a function, you have to put `() =>` before them in both cases. Then React will store the functions you pass.

क्युंकि आप एक फ़ंक्शन पास कर रहे है, रीऐक्ट मानता है कि `someFunction` एक [initializer function](#avoiding-recreating-the-initial-state) है, और `someOtherFunction` एक [updater function](#updating-state-based-on-the-previous-state) है, तो वह उन्हें बुलाने की कोशिश कर उसके परिणाम को संग्रहित करता है.फ़ंक्शन को *actually* स्टोर करने के लिए, आपको `() =>` उनके पहले डालना होगा दोनो केस में, फ़िर रीऐक्ट आपके द्वारा पास किये गए फ़ंक्शन को स्टोर करेगा.
```js {1,4}
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```
