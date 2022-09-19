---
title: useState
---

<Intro>

`useState` एक React Hook है जो आपको अपने कौम्पोनॅन्ट में एक [state वेरिएबल](/learn/state-a-components-memory) ऐड करने देता है|

```js
const [state, setState] = useState(initialState)
```

</Intro>

- [प्रयोग](#usage)
  - [कौम्पोनॅन्ट में state ऐड करना](#adding-state-to-a-component)
  - [पिचले state के आधार पर state अप्डेट करना](#updating-state-based-on-the-previous-state)
  - [State में ऑब्जेक्ट्स और अर्रेस अपडेट करना](#updating-objects-and-arrays-in-state)
  - [इनिशल state को फ़िर सृष्ट करने से बचना](#avoiding-recreating-the-initial-state)
  - [ Key के सात state रिसेट करना](#resetting-state-with-a-key)
  - [पिचले रेंडर के जानकारी को स्टोर करना](#storing-information-from-previous-renders)
- [संदर्भ](#reference)
  - [`useState(initialState)`](#usestate)
  - [`set` functions, like `setSomething(nextState)`](#setstate)
- [ट्रबलशूटिंग](#troubleshooting)
  - [मैंने state का वैल्यू अपडेट किया है मगर log करते समय मुझे पुराना वैल्यू मिलता है](#ive-updated-the-state-but-logging-gives-me-the-old-value)
  - [state अपडेट कर लिया है लेकिन स्क्रीन अपडेट नही हो रहा](#ive-updated-the-state-but-the-screen-doesnt-update)
  - [मुझे एक एरर मिल रहा है: "Too many re-renders"](#im-getting-an-error-too-many-री-renders)
  - [मेरा reducer या एनिशिअलिज़ेर फंक्शन दो बार चलता है  ](#my-initializer-or-updater-function-runs-twice)
  - [I'm trying to set state to a function, but it gets called instead](#im-trying-to-set-state-to-a-function-but-it-gets-called-instead)

---

## प्रयोग {/*usage*/}

### कौम्पोनॅन्ट में state ऐड करना {/*adding-state-to-a-component*/}

अपने कौम्पोनॅन्ट के सबसे उपरी लेवल में `useState` को बुलाए एक या अधिक [state वेरिएबलस](/learn/state-a-components-memory) डिक्लेर करने के लिए|

```js [[1, 4, "age"], [2, 4, "setAge"], [3, 4, "42"], [1, 5, "name"], [2, 5, "setName"], [3, 5, "'Taylor'"]]
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(42);
  const [name, setName] = useState('Taylor');
  // ...
}
```

state वेरिएबलस को [array डीस्ट्रक्चरिंग ](/learn/a-javascript-refresher#array-destructuring) के साथ नाम करना परिपाटी है, जैसे `[something, setSomething]`|

`useState` एक array रिटर्न करता है जिसमे इग्ज़ैक्ट्ली दो आइटम्ज़ है:

1. इस state वेरिएबल का <CodeStep step={1}>current state</CodeStep>, जिससे शुरुआत में आपके द्वारा दिया गया <CodeStep step={3}>initial state</CodeStep> पर सेट किया जाता है|
2. <CodeStep step={2}>`set` function</CodeStep> आपको परस्पर क्रिया के जवाब में वैल्यू बदलने देता है|

स्क्रीन को अप्डेट करने के लिए, `set` फ़ंक्शन को किसी और state के साथ बुलाओ|

```js [[2, 2, "setName"]]
function handleClick() {
  setName('Robin');
}
```

React अगला state स्टोर कर देगा, नए वैल्यूस के सात कौम्पोनॅन्ट रेंडर करेगा और UI को अप्डेट करेगा|

<Gotcha>

`set`फ़ंक्शन बुलाने से [चल रहे कोड में अभी का state **नही बदलता**](#ive-updated-the-state-but-logging-gives-me-the-old-value):

```js {3}
function handleClick() {
  setName('Robin');
  console.log(name); // Still "Taylor"!
}
```

वह सिर्फ *अगले* रेंडर से `useState` का रिटर्न वैल्यू को प्रभावित करेगा|

</Gotcha>

<Recipes titleText="useState के बेसिक उदाहरण" titleId="examples-basic">

### Counter (number) {/*counter-number*/}

इस उदाहरण में, `count` state वेरिएबल एक नम्बर होल्ड करता है| बटन दबाने से वह बढ़ता है।

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

इस उदाहरण me, `text` state वेरिएबल एक स्ट्रिंग होल्ड करता है| जब आप टाइप करते है, `handleChange` सबसे लेटेस्ट इनपुट वैल्यू ब्राउज़र इनपुट DOM एलेमेंट से पढ़ता है, `setText` को state अप्डेट करने के लिए बुलाता है| यह आपको नीचे `current` टेक्स्ट डिस्प्ले करने देता है|

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

इस उदाहरण में, `liked` state वेरिएबल एक बूलियन होल्ड करता है| जब आप इनपुट क्लिक करते है, `setLiked` `liked` state वेरिएबल को अप्डेट करता है साथ में यदि ब्राउज़र का चेक्बाक्स इनपुट की जाँच हुई है या नहीं| `liked` वेरिएबल को चेक्बाक्स के नीचे टेक्स्ट को रेंडर करने के लिए यूज़ किया जाता है|
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

आप एक कौम्पोनॅन्ट में एक से ज़्यादा state वेरिएबल डिक्लेर कर सकते है| हर state वेरिएबल पूरी तरह से स्वतंत्र है|

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

### पिचले state के आधार पर state अप्डेट करना {/*updating-state-based-on-the-previous-state*/}

मान लीजिए `age` का वैल्यू `42` है| यह हैंड्लर `setAge(age + 1)` तीन बार बुलाता है:

```js
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

परंतु, एक क्लिक के बाद, `age` का वैल्यू `43` ही होगा ना कि `45`! ऐसा इसीलिए है क्योंकि `set` फ़ंक्शन पहले से ही चल रहे कोड में [अप्डेट नही करता](/learn/state-as-a-snapshot)| तो हर `setAge(age + 1)` का बुलावा`setAge(43)` बन जाता है|

इस समस्या को हल करने के लिए अगले state की जगह, आप `setAge` को **एक *अप्डेटर फ़ंक्शन* पास कर सकते** है|

```js [[1, 2, "a", 0], [2, 2, "a + 1"], [1, 3, "a", 0], [2, 3, "a + 1"], [1, 4, "a", 0], [2, 4, "a + 1"]]
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

यहा पर, `a => a + 1` आपका अप्डेटर फ़ंक्शन है| यह <CodeStep step={1}>pending state</CodeStep> को इस्तेमाल कर <CodeStep step={2}>next state</CodeStep> कैल्क्युलेट करता है|

React आपके अप्डेटर फ़ंक्शन एक [क़तार](/learn/queueing-a-series-of-state-updates) में रखता है| फ़िर अगले रेंडर में, उसे वही ऑर्डर में बुलाएगा:

1. `a => a + 1` को `42` लंबित state के रूप में मिलेगा और अगले state के रूप में `43` रिटर्न करेगा|
2. `a => a + 1` को `43` लंबित state के रूप में मिलेगा और अगले state के रूप में `44` रिटर्न करेगा|
3. `a => a + 1` को `44` लंबित state के रूप में मिलेगा और अगले state के रूप में `45` रिटर्न करेगा|

और कोई अप्डेटस क़तार में नही है तो React वर्तमान state के रूप में `45` को स्टोर करेगा|

परिपाटी के अनुसार, बकाया state तर्क को state वेरीअबल के पहले अक्षर के साथ नाम करना आम बात है जैसे `age` के लिए `a`|

React विकास के समय आपके [अप्डेटरस दो बार बुला सकता है](#my-initializer-or-updater-function-runs-twice) यह वेरिफ़ाई करने के लिए वह [शुद्ध](/learn/keeping-components-pure) है| हालांकि, आप उससे `prevAge` जैसे कुछ बुला सकते हो जिससे आपको स्पष्ट लगे|

<DeepDive title="क्या अप्डेटर यूज़ करना मुनासिब है?">

आपको कोड इस तरह से लिखने `setAge(a => a + 1)` की सिफ़ारिश मिल सकती है यदि जो state आप सेट कर रहे हैं वह पिछले state से परिगणित है| यह करने से कोई नुक्सान नहीं है पर यह करना ज़रूरी नहीं है

ज़्यादातर मामलों में इन दोनो दृष्टिकोण में कोई अंतर नही है| React हमेशा अंदर रखता है कि यूज़र के अभीष्ट गतिविधियों के लिए, जैसे क्लिक्स, `age` state वेरिएबल अगले क्लिक के पहले अप्डेट हो जाएगा| इसका अर्थ है कि क्लिक इवेंट हैंड्लर के शुरुआत में "पुराना" `age` देखने का कोई रिस्क नही है|

हालाँकि , अगर आप एक ही इवेंट में विभिन्न अप्डेट करते है तो अप्डेटरस सहायक हो सकते है| वह तब भी सहयोगी है जब state वेरिएबल को खुद ऐक्सेस करना असुविधाजनक है| (री-रेंडर अनुकूलन करते समय आप इसमें रन कर सकते है)

अगर आप थोड़ा सा वर्बोस सिंटैक्स से ज़्यादा संगतता को वरीयता देते हैं, तो यह अप्डेटर लिखना तर्कसंगत होता है अगर आप के द्वारा सेट किये जानेवाला state पिछले state से परिगणित है| अगर वह किसी *और* state वेरिएबल के पिछले state से कैलकुलेट किया गया है, तो आपको उन्हें कंबाइन करना होगा और [reducer का इस्तेमाल करना होगा](/learn/extracting-state-logic-into-a-reducer)|

</DeepDive>

<Recipes titleText="उपदटेर पास करने और सीधे अगले state पास करने में अंतर" titleId="examples-updater">

### उपदटेर फंक्शन को पास करना {/*passing-the-updater-function*/}

इस उदाहरण में अप्डेटर फ़ंक्शन पास किया जाता है तो "+3" बटन काम करता है|

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

### अगला state प्रत्यक्ष पास करना {/*passing-the-next-state-directly*/}

यह उदाहरण अप्डेटर function पास **नहीं** करता, to "+3"बटन **इच्छानुसार काम नहीं करता**|

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

### State में ऑब्जेक्ट्स और अर्रेस अपडेट करना {/*updating-objects-and-arrays-in-state*/}

आप state में ऑब्जेक्टस और अरेज़ डाल सकते हैं| React में, state को केवल पठन के लिए ही विचार किया जाता है, तो **आपको उसे *प्रतिस्थापित* करना होगा ना कि *रूपांतरित* करना**| उदाहरण में अगर आपके state में `form` ऑब्जेक्ट है तो उससे ऐसे अपडेट न करे:

```js
// 🚩 किसी भी state में ऑब्जेक्ट को ऐसे मुतयत ना करे:
form.firstName = 'Taylor';
```

बजाय, नया ऑब्जेक्ट बना के पूरा ऑब्जेक्ट रेप्लस करना:

```js
// ✅ state को नए ऑब्जेक्ट के साथ बदलो
setForm({
  ...form,
  firstName: 'Taylor'
});
```

[state में ऑब्जेक्टस अप्डेट करना](/learn/updating-objects-in-state) और [state में अरे अप्डेट करने](/learn/updating-arrays-in-state) के बारे में और पढ़िए|

<Recipes titleText="state में ऑब्जेक्ट्स और अर्रेस के उधारण" titleId="examples-objects">

### Form (object) {/*form-object*/}

इस उदाहरण में, `form` state वेरिएबल एक ऑब्जेक्ट को होल्ड करता है| हर इनपुट में एक चेंज हैंड्लर है जो `setForm` को शुद्ध रूप के अगले state के साथ बुलाता है| `{ ...form}` का स्प्रेड सिंटैक्स यह सुनिश्चित करता है कि state object रूपांतरित नहीं हो प्रतिस्थापित हो जाए|

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

इस उदाहरण में state और भी नेस्टेड है| जब आप नेस्टेड state को अप्डेट करते है, तो आपको अप्डेट करने वाले ऑब्जेक्ट के साथ में ऊपर के रास्ते में जो भी आब्जेक्ट्स उस ऑब्जेक्ट को "समाविष्ट" करते है उनके प्रतिलिपि बनाने होंगे| और जानने के लिए [नेस्टेड ऑब्जेक्ट को अपडेट](/learn/updating-objects-in-state#updating-a-nested-object) करने के बारे में पढ़िए

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

इस उदाहरण में, `todos` state वेरिएबल एक अरे होल्ड करता है| हर एक बटन हैंड्लर `setTodos` उस अरे के अगले के साथ वर्शन बुलाता है| `[...todos]` का स्प्रेड सिंटैक्स, `todos.map()` और `todos.filter()` सुनिश्चित करते है कि स्टेट अरे को रूपांतरित नही प्रतिस्थापित किया जाएगा|

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

### Immer के साथ संक्षिप्त अप्डेट लॉजिक लिखना {/*writing-concise-update-logic-with-immer*/}

यदि बिना परिवर्तन के अरे या आब्जेक्ट्स को अप्डेट करना है तो आप एक लाइब्रेरी जैसे [Immer](https://github.com/immerjs/use-immer#useimmerreducer) को बार-बार आने वाले कोड कम करने के लिए यूज़ कर सकते है| Immer आपको सिर्फ कोड लिखने देता है जैसे आप कोड परिवर्तित कर रहे हो लेकिन हुड के नीचे यह अपरिवर्तनीय अप्डेट् निष्पादित करता है:
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

### इनिशल state को फ़िर सृष्ट करने से बचना {/*avoiding-recreating-the-initial-state*/}

React इनिशल state को एक बार सहेज कर रखता है और अगले रेंडर में उसे नज़रंदाज़ करता है|

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
```

हालाँकि `createInitialTodos()` का परिणाम सिर्फ़ इनिशल रेंडर के लिए यूज़ किया जाता है, आप इस फ़ंक्शन फ़िर भी हर रेंडर पर बुलाते हैं| अगर महंगे कैल्क्युलेशंज़ कर रहे हैं या बड़े बड़े अरेज़ बना रहे है यह अपव्ययी हो सकता है|

इसे हल करने के लिए, आप उसे `useState` में **_प्रारंभकर्ता_ फ़ंक्शन के रूप में पास कर सकते है**:

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

ध्यान दीजिए कि आप `createInitialTodos` पास कर रहे है जो *फ़ंक्शन खुद* है लेकिन `createIntialTodos()` नही, जो कि फ़ंक्शन को बुलाने पर मिलनेवाला परिणाम है| इस तरीक़े से इनिशल state आरंभिकरण के बाद री-क्रीएट नहीं होता|

React डिवेलप्मेंट के समय आपके [प्रारंभकर्ता को दो बार बुला सकता है](#my-initializer-or-updater-function-runs-twice) यह सत्यापित करने के लिए कि वह [pure](/learn/keeping-components-pure) है कि नहीं|

<Recipes titleText="इनितीयलिसेर पास करना और इनिशल state पास करने में अंतर" titleId="examples-initializer">

### एनिटिअलिज़ेर फंक्शन पास करना {/*passing-the-initializer-function*/}

इस उदाहरण में इनिशलिसेर फ़ंक्शन पास किया जाता है, तो `createInitialTodos` फ़ंक्शन सिर्फ प्रारम्भ के दौरान चलता है| कौम्पोनॅन्ट री-रेंडर होने पर, जैसे इनपुट में टाइप करने पर, यह फ़ंक्शन नहीं चलता|

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

### एनीटीएल state सीधे पास करना {/*passing-the-initial-state-directly*/}

इस उदाहरण में इनिशलिसेर फ़ंक्शन **नहीं** पास किया जाता, to `createInitialState` फ़ंक्शन हर रेंडर पर चलता है, जैसे जब अब इनपुट में टाइप करते है| व्यवहारिक रूप से देखने पर कोई अंतर नही है लेकिन इस कोड की दक्षता कम हो जाती है|

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

### Key के सात state रिसेट करना {/*resetting-state-with-a-key*/}

[list रेंडर करते समय](/learn/rendering-lists) आप `key` एट्रिब्यूट का सामना कर सकते है| हालाँकि, उसका एक और प्रयोजन है|

आप **अलग `key` पास कर किसी कौम्पोनॅन्ट का state रीसेट कर सकते हो|** इस उदाहरण में, Reset button `version` state वेरिएबल को बदलता है जो हम `key` के रूप में `Form` को भेजते हैं| जब `key` बदलता है, React `Form` (और उसके बच्चों को) शून्य से रीक्रीएट करता है, तो उसका state रीसेट हो जाता है|

[state को preserve और reset करने के बारे में](/learn/preserving-and-resetting-state) और पढ़िए|
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

### पिचले रेंडर के जानकारी को स्टोर करना {/*storing-information-from-previous-renders*/}

आम तौर पर आप state को इवेंट हैंडलर्स में अप्डेट करेंगे| हालाँकि, कुछ दुर्लभ मामलों में आपको state रेंडरिंग के हिसाब से अनुकूलन करना होगा -- उदाहरण में आपको prop बदलने के कारण state वेरिएबल बदलना होगा|

बहुत से केस में आपको इसकी ज़रूरत नहीं है:

* **अगर ज़रुरत कि वैल्यू अभी के props से या किसी और state से पूरी तरह से कंप्यूट हो सकता है, तो [उस अनावश्यक state को पूरी तरह से हटा दो](/learn/choosing-the-state-structure#avoid-redundant-state)|** अगर चिंतित है कि आप कुछ ज़्यादा ही री-कम्प्यूट कर रहे है, तो [`useMemo` Hook](/apis/usememo)आपकी मदद कर सकता है|
* अगर शुद्ध कौम्पोनॅन्ट ट्री का state रीसेट करना चाहे तो [अपने कौम्पोनॅन्ट में दूसरा `key`पास करे|](#resetting-state-with-a-key)
* अगर कर पाए तो event हैंडलर्स में सारे उचित state अपडेट करे|

किसी दुर्लभ केस में जहाँ कोई भी लागू न हो, रेंडर किये गए वैल्यूस के आधार पर state अप्डेट करने के लिए एक प्रतिमान इस्तेमाल हो सकता है `set` function को कौम्पोनॅन्ट रेंडर होते समय बुलाकर|

यह एक उदाहरण है| `CountLabel` कौम्पोनॅन्ट उसमें पास किया गया `count` prop को प्रदर्शित करता है:

```js CountLabel.js
export default function CountLabel({ count }) {
  return <h1>{count}</h1>
}
```

मान लीजिए आपको दिखाना है counter पिछले बदलाव की तुलना में *बढ़ा या घटा* हुआ है| `count` prop आपको यह नहीं बताता -- आपको उसका पिछला वैल्यू ट्रैक करना होगा| उसे ट्रैक करने के लिए `prevCount` को ऐड करे| एक और state वेरिएबल `trend` ऐड करे जो बताता है कि काउंट बढ़ा है या घटा है| `prevCount` को `count` के साथ तुलना करे और अगर वह दोनों समान नही है तो दोनों `prevCount` और trend को अप्डेट करे| अब आप दोनो अभी का count prop और *पिछले रेंडर से कैसे बदला है* दिखा सकते हो|

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

ध्यान रखें कि अगर आप `set` को रेंडर करते समय बुलाएँगे तो उसे किसी अवस्था के अंदर होना चाहिए जैसे `prevCount !== count`, और उस अवस्था के अंदर `setPrevCount(count)` जैसे एक कॉल भी होना चाहिए| नहीं तो आपका कौम्पोनॅन्ट एक लूप में तब तक री-रेंडर करेगा जब तक वह क्रैश नहीं जो जाता| और, आप सिर्फ *अभी रेंडर होने वाले* कौम्पोनॅन्ट का state सिर्फ update कर सकते है| `set` function को रेंडर करते समय *दूसरे* कौम्पोनॅन्ट में बुलाना एक एरर है| अंत में, आपका `set` का बुलावे को अभी भी [रूपांतरण के बग़ैर state अप्डेट करना होगा](#updating-objects-and-arrays-in-state) -- इस विशेष केस का यह मतलब नहीं है कि आप [शुद्ध फंक्शन](/learn/keeping-components-pure) के बाकी नियम तोड़ दे|

यह स्वरूप समझने में है और सामन्यत: सर्वश्रेष्ठ है कि यह टाला किया जाए, लेकिन प्रभाव में से तो state अप्डेट करने से अच्‍छा है| जब आप `set` फ़ंक्शन को रेंडर करते समय बुलाते है, React बच्चों को रेंडर करने के पहले और कौम्पोनॅन्ट एक `return` कथन के साथ निकास करते ही उस कौम्पोनॅन्ट को तुरंत अप्डेट करता है| इस तरीके से, बच्चों को दो बार रेंडर होने की ज़रुरत नहीं है| आपका बाकी का  कौम्पोनॅन्ट फंक्शन अभी भी एक्सेक्यूटे होगा (और रिजल्ट को फ़ेंक दिया जाएगा), लेकिन आपका कंडीशन सारे Hooks के कॉल्स के नीचे है , आप पहले रेंडर रीस्टार्ट करने के लिए `return null` को अंदर ऐड करना होगा|

---

## संदर्भ {/*reference*/}

### `useState(initialState)` {/*usestate*/}

अपने कौम्पोनॅन्ट के सबसे उपर वाले स्तर पर [state वेरिएबल](/learn/state-a-components-memory) घोषित करने के लिए `useState` को बुलाए|

```js
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
```

state वेरिएबलस को [array destructuring](/learn/a-javascript-refresher#array-destructuring) के साथ नाम करना कन्वेन्शन है जैसे `[something, setSomething]`

[उपर और उदाहरण देखिए](#examples-basic)

#### पैरामीटर्स {/*parameters*/}

* `initialState`: वो वैल्यू जो आप चाहते हो कि state के पास इनिशली हो| किसी भी प्रकार का वैल्यू हो सकता है लेकिन फ़ंक्शन के लिए विशेष व्यवहार है| यह तर्क पहले रेंडर के बाद इग्नोर किया जाता है|

* अगर आप एक फ़ंक्शन को `initialState` में पास करे,तो उसे एक _इनिशलिसेर फ़ंक्शन_ के रूप में ट्रीट किया जाएगा| उसे शुद्ध होना चाहिए, तर्क नहीं लेना चाहिए और किसी भी प्रकार का वैल्यू वापस करना होगा| React आपका इनिशलिसेर फ़ंक्शन तब बुलाएगा जब आपका कौम्पोनॅन्ट इनिशलाएस करना हो और उसका रिटर्न वैल्यू को इनिशल state के रूप me संग्रहित करना हो| [उपर एक उदाहरण देखिए|](#avoiding-recreating-the-initial-state)

#### रिटर्न्स {/*returns*/}

`useState` एक अरे रिटर्न करता है जिसमे इग्ज़ैक्ट्ली दो वैल्यूज़ है:

1. अभी का state| पहले रेंडर के दौरान, यह आपके द्वारा पास किया गया `initialState`के साथ मैच करेगा|
2. [`set` function](#setstate) आपको state को अलग वैल्यू के साथ अप्डेट करने देता है और री-रेंडर ट्रिगर होता है|

#### चेतावनियां {/*caveats*/}

* `useState` एक हुक है तो आप उसे सिर्फ **कौम्पोनॅन्ट के सबसे उपर वाले स्तर** पर बुला सकते है या अपने हुक्स में बुला सकते हो| इससे लूप्स और कंडिशंज़ के अंदर नहीं बुला सकते| अगर उसकी ज़रूरत है तो एक नया कौम्पोनॅन्ट इक्स्ट्रैक्ट करे और उसमें स्टेट मूव करना होगा|
* स्ट्रिक्ट मोड में, [आकस्मिक अशुद्धियाँ ढूंढने](#my-initializer-or-updater-function-runs-twice) के लिए React **आपके इन्शिअलिज़ेर को दो बार** बुलाता है| यह एक development-only व्यवहार है और आपके प्रोडक्शन को प्रभावित नहीं करेगा| अगर आपका इनिशलिसेर फ़ंक्शन शुद्ध है (जो होना चाहिए), तो उसे आपके कौम्पोनॅन्ट के लॉजिक प्रभावित नहीं करना चाहिए| किसी एक कॉल का परिणाम इग्नोर हो जाएगा|

---

### `set` फंक्शन, `setSomething(nextState)` जैसे {/*setstate*/}

`useState` द्वारा वापस किया गया `set` फ़ंक्शन आपको दूसरे वैल्यू के साथ state अप्डेट करने देता है और री-रेंडर ट्रिगर करने देता है| आप अगले state को सीधे ही पास कर सकते हो या फ़िर एक फ़ंक्शन उसे पिछले state से कैल्क्युलेट कर सकता है:

```js
const [name, setName] = useState('Edward');

function handleClick() {
  setName('Taylor');
  setAge(a => a + 1);
  // ...
```

#### पैरामीटर्स {/*setstate-parameters*/}

* `nextState`: वह वैल्यू जो चाहते है कि state के पास हो| यह वैल्यू किसी भी प्रकार की हो सकती है लेकिन फ़ंक्शन के लिए विशेष व्यवहार है|
  * अगर आप फ़ंक्शन को `nextState` के रूप में पास करते है तो उसे एक _अप्डेट फ़ंक्शन_ माना जाएगा| उसे शुद्ध होने के अलावा सिर्फ पेंडिंग state को तर्क के रूप में लेना चाहिए और अगला state रिटर्न करना चाहिए| React आपका अप्डेटर फ़ंक्शन एक क़तार में डाल आपका कौम्पोनॅन्ट री-रेंडर करेगा| अगले रेंडर के समय, React सारे क्यू किये गए अप्डेटर को पिछले state में लगा कर नया state कैल्क्युलेट करता है| [ऊपर उदहारण देखिये|](#updating-state-based-on-the-previous-state)

#### रिटर्न्स {/*setstate-returns*/}

`set` फ़ंक्शन का कोई रिटर्न वैल्यू नही है|

#### चेतावनियां {/*setstate-caveats*/}

* `set` function ***अगले* रेंडर के लिए सिर्फ state वेरिएबल अप्डेट करता है**| अगर आप state वेरिएबल को `set` फ़ंक्शन बुलाने के बाद पढ़ते हो तो आपको कॉल के पहले स्क्रीन पर रखे गए [पुराना वैल्यू ही मिलेगा](#ive-updated-the-state-but-logging-gives-me-the-old-value)|

* अगर आपका दिया गया नया वैल्यू अभी के `state` से सदृश [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) तुलना से निर्धारित किया जाता है तो React **उस कौम्पोनॅन्ट को और उसके बच्चों का री-रेंडरिंग स्किप कर देगा**| यह एक अनुकूलन है| परिणाम इग्नोर करने के पहले React को आपके कौम्पोनॅन्ट को बुलाने की ज़रूरत पड़ सकती है लेकिन इससे आपका कोड प्रभावित नही होना चाहिए|

* React [state अपडेट को बैच करता है](/learn/queueing-a-series-of-state-updates)| **सारे event handlers के चलने के बाद** और उनके `set` फंक्शन बुलाने के बाद वह स्क्रीन अपडेट करता है| यह एक ही इवेंट में विभिन्न री-रेंडर रोकता है| किसी दुर्लभ स्थिति में यदि आपको React पहले स्क्रीन अप्डेट करने के लिए अप्डेट करने के लिए बल लगाना होगा जैसे DOM एक्सेस करने के लिए, आप [`flushSync`](/apis/flushsync) का इस्तेमाल कर सकते हो|

* *रेंडर करते समय* आप `set` function उसी कौम्पोनॅन्ट के अंदर से बुला सकते हो जो  समय रेंडर हो रहा है| React उसका आउटपुट डिस्कार्ड कर तुरंत फ़िर से नए state के सात रेंडर करने लगेगा| यह pattern का इस्तेमाल बहुत ही कम होता है लेकिन आप इससे **पिचले रेंडर के इनफार्मेशन स्टोर करने के लिए** इस्तेमाल कर सकते है| [ऊपर उदहारण देखिये|](#storing-information-from-previous-renders)

* स्ट्रिक्ट मोड में, [आकस्मिक अशुद्धियाँ ढूंढने](#my-initializer-or-updater-function-runs-twice) के लिए React **आपके इनिशलिसेर को दो बार** बुलाता है| यह एक विकास-केवल व्यवहार है और आपके निर्माण को प्रभावित नहीं करेगा| अगर आपका इनिशलाइज़ फ़ंक्शन शुद्ध है (जो होना चाहिए), तो उसे आपके कौम्पोनॅन्ट के लॉजिक प्रभावित नहीं करना चाहिए| किसी एक कॉल का परिणाम इग्नोर हो जाएगा|
---

## ट्रबलशूटिंग {/*troubleshooting*/}

### मैंने state का वैल्यू अपडेट किया है मगर log करते समय मुझे पुराना वैल्यू मिलता है {/*ive-updated-the-state-but-logging-gives-me-the-old-value*/}

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

इसका कारण है कि [states का व्यवहार स्नैप्शाट की तरह है](/learn/state-as-a-snapshot)| अपडेट होने वाला state नए state के साथ दूसरा रेंडर रिक्वेस्ट करता है लेकिन वह इवेंट हैंड्लर में पहले से ही चल रहे `count` जावास्क्रिप्ट वेरिएबल को प्रभावित नहीं करेगा|

अगर आपको अगला state इस्तेमाल करना हो तो आप उसे `set` फ़ंक्शन में भेजने से पहले एक वेरिएबल में स्टोर कर सकते है:

```js
const nextCount = count + 1;
setCount(nextCount);

console.log(count);     // 0
console.log(nextCount); // 1
```

---

### I've updated the state, but the screen doesn't update {/*ive-updated-the-state-but-the-screen-doesnt-update*/}
### state अपडेट कर लिया है लेकिन स्क्रीन अपडेट नही हो रहा {/*ive-updated-the-state-but-the-screen-doesnt-update*/}

React आपके **update ignore कर देगा अगर आपका अगला state आपके पहले के state के samaan है**, यह [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison के द्वारा निर्धारित किया जाता है| यह आम तौर टैब होता है जब आप किसी state में ऑब्जेक्ट या अरे को सीधे ही बदलाव करते हो:

```js
obj.x = 10;  // 🚩 गलत: मौजूदा ऑब्जेक्ट को म्यूटेट कर रहे हो
setObj(obj); // 🚩 कुछ नहीं होता
```

आपने मौजूदा `obj` ऑब्जेक्ट को रूपांतरित कर उसे `setObj`में वापस पास कर दिया, इसीलिए React ने अप्डेट इग्नोर कर दिया|इसे सुधारने के लिए, आपको सुनिश्चित करना होगा कि आप [objects और arrays को _replacing_ कर रहे है न कि _रूपांतरित_ करना](#updating-objects-and-arrays-in-state):

```js
// ✅ सही: नया ऑब्जेक्ट बना रहे हो
setObj({
  ...obj,
  x: 10
});
```

---

### मुझे एक एरर मिल रहा है: "Too many re-renders" {/*im-getting-an-error-too-many-री-renders*/}

आपको एक एरर मिल सकता है: `Too many री-renders. React limits the number of renders to prevent an infinite loop.` आम तौर पर इसका अर्थ है कि आप *रेंडर के दौरान* बिना शर्त के ऐक्शन को डिस्पैच कर रहे है,इससे आपका कौम्पोनॅन्ट लूप में चला जाता है: रेंडर, डिस्पैच (जिसके कारण रेंडर होता है), रेंडर, डिस्पैच (जिसके कारण रेंडर होता है), और आदि| अख्सर ये event handler स्पष्ट करने में गलती के कारण है:

```js {1-2}
// 🚩 गलत: रेंडर करते समय हैंडलर को बुलाता है
return <button onClick={handleClick()}>Click me</button>

// ✅ सही: event handler में पास होता है
return <button onClick={handleClick}>Click me</button>

// ✅ सही: इनलाइन फंक्शन में पास होता है
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

यदि आपको इस एरर का कारण नहीं पता चलता तो कान्सोल में एरर के बग़ल में ऐरो क्लिक करे और जावास्क्रिप्ट स्टेक में देखना कि इस एरर के लिए कौनसा `set`फ़ंक्शन का बुलावा जिम्मेदार है|
---

### मेरा reducer या एनिशिअलिज़ेर फंक्शन दो बार चलता है {/*my-reducer-or-initializer-function-runs-twice*/}

[स्ट्रिक्ट मोड](/apis/strictmode) में, React आपके कुछ फ़ंक्शन को दो बार बुलाएगा:

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

यह अपेक्षित है और इससे आपके कोड को कोई नुक़सान नहीं होना चाहिए|

यह **development-only** व्यवहार [आपके कम्पोनेंट्स शुद्ध रखने](/learn/keeping-components-pure)में सहयोग करता है| React किसी भी बुलवाए का परिणाम इस्तेमाल करता है और दूसरे बुलावे का परिणाम इग्नोर कर देता है| जब तक आपका कौम्पोनॅन्ट, इनिशलिसेर, और रेंडर फ़ंक्शन शुद्ध है, इससे आपके लॉजिक पर कोई प्रभाव नहीं पढ़ना चाहिए|लेकिन अगर यह गलती से अशुद्ध है तो यह आपको गलतियां देखने और सुलझाने में मदद करता है|

उदाहरण में, इस अशुद्ध रेडूसर फ़ंक्शन state में एक अरे को रूपांतरित करता है:

```js {2,3}
setTodos(prevTodos => {
  // 🚩 गलत: state को म्यूटेट करना
  prevTodos.push(createTodo());
});
```

क्योंकि React रेडूसर फ़ंक्शन को दो बार बुलाता है, आपको तोड़ो बार जोड़ा दिखेगा,तो आपको पता लगेगा कि गलती हुई है| इस उदाहरण में, आप यह गलती को सुधारने के लिए [अरे को रूपांतरित करने की जगह रिप्लेस करोगे](#updating-objects-and-arrays-in-state):

```js {2,3}
setTodos(prevTodos => {
  // ✅ सही: नए स्टेट के साथ बदलना
  return [...prevTodos, createTodo()];
});
```

अब जब यह रेडूसर फ़ंक्शन शुद्ध है, इस एक और बार बुलाने से व्यवहार में कोई अंतर नही दिखता| इसीलिए React इससे दो बार बुलाने से आपको ग़लतियाँ ढूँढने में आसानी पड़ती है| **सिर्फ कौम्पोनॅन्ट, इनिशलिसेर, और रेडूसर फ़ंक्शन को शुद्ध होना चाहिए|** इवेंट हैंड्लरस जो शुद्ध होने की आवश्यकता नहीं है तो React आपके इवेंट हैंड्लर्स को कभी भी दो बार नहीं बुलाएगा|

और जानने के लिए, [components शुद्ध रखने के बारे](/learn/keeping-components-pure) पढ़िए|

---

### में फंक्शन में state सेट करने का प्रयास कर रहा हु लेकिन वह कॉल हो जाता है {/*im-trying-to-set-state-to-a-function-but-it-gets-called-instead*/}

आप state में फ़ंक्शन सिर्फ नही डाल सकते:

```js
const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

क्युंकि आप एक फ़ंक्शन पास कर रहे है, React मानता है कि `someFunction` एक [एनिशिअलिज़ेर फंक्शन](#avoiding-recreating-the-initial-state) है, और `someOtherFunction` एक [अपडेटर फंक्शन](#updating-state-based-on-the-previous-state) है, तो वह उन्हें बुलाने की कोशिश कर उसके परिणाम को संग्रहित करता है| फ़ंक्शन को *वास्तव में* स्टोर करने के लिए, आपको `() =>` उनके पहले डालना होगा दोनो केस में, फ़िर React आपके द्वारा पास किये गए फ़ंक्शन को स्टोर करेगा|
```js {1,4}
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```
