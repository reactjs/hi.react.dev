---
title: रेड्यूसर में State Logic निकालना
---

<Intro>
कई Event Handlers में फैले कई State logic वाले Event भारी पड़ सकते हैं। इन मामलों के लिए, आप अपने Event  के बाहर सभी State Update Logic को एक एकल फ़ंक्शन में संघटित (consolidate) कर सकते हैं, जिसे _रेड्यूसर कहा जाता है।_
</Intro>

<YouWillLearn>

- रिड्यूसर फ़ंक्शन क्या है
- `useState` को `useReducer` में Re-factor कैसे करें
- रेड्यूसर का उपयोग कब करें
- एक अच्छा कैसे लिखें

</YouWillLearn>

## रिड्यूसर (Reducer) के साथ State Logic को संघटित करें {/*consolidate-state-logic-with-a-reducer*/}

जैसे-जैसे आपके Components की जटिलता बढ़ती है, किसी Component की स्थिति को update करने के सभी अलग-अलग तरीकों को एक नज़र में देखना कठिन हो जाता है। उदाहरण के लिए, नीचे दिया गया `TaskApp` component state में `tasks` की एक सरणी (array) रखता है और कार्यों को जोड़ने, हटाने और संपादित (edit) करने के लिए तीन अलग-अलग ईवेंट हैंडलर का उपयोग करता है:

<Sandpack>

```js App.js
import { useState } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
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
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
```

```js AddTask.js hidden
import { useState } from 'react';

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </>
  );
}
```

```js TaskList.js hidden
import { useState } from 'react';

export default function TaskList({tasks, onChangeTask, onDeleteTask}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({task, onChange, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
```

```css
button {
  margin: 5px;
}
li {
  list-style-type: none;
}
ul,
li {
  margin: 0;
  padding: 0;
}
```

</Sandpack>

इसका प्रत्येक इवेंट हैंडलर State को Update करने के लिए `setTasks` को कॉल करता है। जैसे-जैसे यह Component  बढ़ता है, वैसे-वैसे इसमें State Logic की मात्रा भी बढ़ती जाती है। इस जटिलता को कम करने और अपने सभी तर्कों को एक आसान पहुंच वाले स्थान पर रखने के लिए, आप उस 'state logic' को अपने component के बाहर एक single फ़ंक्शन में ले जा सकते हैं, जिसे "रेड्यूसर" कहा जाता है।

रेड्यूसर State को संभालने का एक अलग तरीका है। आप तीन चरणों में `useState` से `useReducer` पर माइग्रेट कर सकते हैं:

1. सेटिंग स्थिति से प्रेषण क्रियाओं (dispatching action) के लिए **Move**।
2. एक रेड्यूसर फ़ंक्शन के लिए **Write**।
3. अपने Component से रेड्यूसर का **Use** करें।

### चरण 1: सेटिंग स्थिति से प्रेषण क्रियाओं की ओर बढ़ें : {/*चरण-1-सेटिंग-स्थिति-से-प्रेषण-क्रियाओं-की-ओर-बढ़ें-*/}
## {/*step-1-move-from-setting-state-to-dispatching-actions*/} {/*step-1-move-from-setting-state-to-dispatching-actions*/}

आपके ईवेंट हैंडलर वर्तमान में निर्दिष्ट करते हैं setting state द्वारा क्या करें  :

```js
function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ]);
}

function handleChangeTask(task) {
  setTasks(
    tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    })
  );
}

function handleDeleteTask(taskId) {
  setTasks(tasks.filter((t) => t.id !== taskId));
}
```

सभी setting state तर्क हटाएँ। आपके पास तीन इवेंट हैंडलर बचे हैं:

-  जब User "Add"  `handleAddTask(text)` कॉल किया जाता है .
-  जब User "Save"  `handleChangeTask(task)` कॉल किया जाता है .
-  जब User "Delete" दबाता है तो `handleDeleteTask(taskId)` कॉल किया जाता है .

Reducer के साथ Setting State का management सीधे State की स्थापना से थोड़ा अलग है।

```js
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
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
```

जिस ऑब्जेक्ट को आप `dispatch` के लिए पास करते हैं उसे "action" कहा जाता है:

```js {3-7}
function handleDeleteTask(taskId) {
  dispatch(
    // "action" object:
    {
      type: 'deleted',
      id: taskId,
    }
  );
}
```
यह एक नियमित जावास्क्रिप्ट ऑब्जेक्ट है। आप तय करें कि इसमें क्या डालना है, लेकिन आम तौर पर इसमें _what happened_ के बारे में न्यूनतम जानकारी होनी चाहिए।
(आप बाद के चरण में `dispatch` फ़ंक्शन स्वयं जोड़ देंगे।)

<Note>

Action object का कोई भी आकार हो सकता है।

परंपरा के अनुसार, इसे एक स्ट्रिंग `type` देना आम बात है जो बताती है कि क्या हुआ, और अन्य क्षेत्रों में कोई अतिरिक्त जानकारी भेजती है। 'type' एक event के लिए विशिष्ट है, इसलिए इस उदाहरण में या तो 'added' या 'added_task' ठीक रहेगा। ऐसा नाम चुनें जो कहे कि क्या हुआ!

```js
dispatch({
  // specific to component
  type: 'what_happened',
  // other fields go here
});
```

</Note>

### Step 2: एक रिड्यूसर फ़ंक्शन लिखें : {/*step-2-write-a-reducer-function*/}

रिड्यूसर फ़ंक्शन वह जगह है जहां आप अपना State logic डालेंगे। यह दो arguments लेता है, current state और action object, और यह अगली state लौटाता है:

```js
function yourReducer(state, action) {
  // return next state for React to set
}
```

React उस state को सेट कर देगा जो आप रिड्यूसर से लौटाते हैं।

इस उदाहरण में अपने state setting logic को अपने ईवेंट हैंडलर से रेड्यूसर फ़ंक्शन में स्थानांतरित करने के लिए, आप यह करेंगे:

1. cureent state ('tasks') को first argument के रूप में घोषित (declare) करें।
2. 'action' ऑब्जेक्ट को second argument के रूप में घोषित करें।
3. रिड्यूसर से _next_ state लौटाएं (जो React स्थिति को सेट करेगा)।

यहां सभी setting  state logic एक reducer फ़ंक्शन में माइग्रेट किए गए हैं:

```js
function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [
      ...tasks,
      {
        id: action.id,
        text: action.text,
        done: false,
      },
    ];
  } else if (action.type === 'changed') {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    });
  } else if (action.type === 'deleted') {
    return tasks.filter((t) => t.id !== action.id);
  } else {
    throw Error('Unknown action: ' + action.type);
  }
}
```

क्योंकि रेड्यूसर फ़ंक्शन राज्य (`tasks`) को एक argument के रूप में लेता है, 
आप **इसे अपने event के बाहर घोषित - declare कर सकते हैं।** 
इससे indentatation स्तर कम हो जाता है और आपके कोड को पढ़ना आसान हो सकता है।

<Note>

उपरोक्त कोड if/else स्टेटमेंट का उपयोग करता है, लेकिन यह रिड्यूसर के अंदर [स्विच स्टेटमेंट](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/switch) का उपयोग करने की परंपरा है। परिणाम वही है, लेकिन स्विच स्टेटमेंट को एक नज़र में पढ़ना आसान हो सकता है।

हम इस दस्तावेज़ के शेष भाग में उनका उपयोग इस प्रकार करेंगे:

```js
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

हम प्रत्येक `case` ब्लॉक को ` {` and `}` curly braces में लपेटने की सलाह देते हैं ताकि अलग-अलग `case` के अंदर घोषित वेरिएबल एक-दूसरे से न टकराएं। इसके अलावा, एक `case` आमतौर पर `return` के साथ समाप्त होना चाहिए। यदि आप `return` करना भूल जाते हैं, तो कोड अगले `case` में "fall through", जिससे गलतियाँ हो सकती हैं!

यदि आप अभी तक स्विच स्टेटमेंट के साथ सहज नहीं हैं, तो if/else का उपयोग करना पूरी तरह से ठीक है।

</Note>

<DeepDive>

#### State 2: रिड्यूसर को इस तरह क्यों `call`किया जाता है? {/*why-are-reducers-called-this-way*/}

हालाँकि रिड्यूसर आपके component के अंदर कोड की मात्रा को "reduce" कर सकते हैं, वास्तव में उनका नाम [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/) के नाम पर रखा गया है। Global_Objects/Array/Reduce) ऑपरेशन जिसे आप arrays पर निष्पादित(perform) कर सकते हैं।

`reduce()` ऑपरेशन आपको एक array लेने और कई में से एक मान को "accumulate" करने की सुविधा देता है:

```js
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce(
  (result, number) => result + number
); // 1 + 2 + 3 + 4 + 5
```
जिस फ़ंक्शन को आप `reduce` करने के लिए पास करते हैं उसे "reducer" के रूप में जाना जाता है। यह अब तक का परिणाम और _current item_ लेता है, फिर अगला परिणाम लौटाता है। React reducer उसी Idea का एक उदाहरण है:
 वे अब _state so far_ और _action_ लेते हैं, और अगली state वापस करते हैं। इस तरह से , वे समय के साथ actions को state में जमा करते हैं।

आप अपने रेड्यूसर फ़ंक्शन को पास करके अंतिम स्थिति की गणना करने के लिए `initialState` और `actions` की एक सरणी के साथ `reduce()` विधि का भी उपयोग कर सकते हैं:

<Sandpack>

```js index.js active
import tasksReducer from './tasksReducer.js';

let initialState = [];
let actions = [
  {type: 'added', id: 1, text: 'Visit Kafka Museum'},
  {type: 'added', id: 2, text: 'Watch a puppet show'},
  {type: 'deleted', id: 1},
  {type: 'added', id: 3, text: 'Lennon Wall pic'},
];

let finalState = actions.reduce(tasksReducer, initialState);

const output = document.getElementById('output');
output.textContent = JSON.stringify(finalState, null, 2);
```

```js tasksReducer.js
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```html public/index.html
<pre id="output"></pre>
```

</Sandpack>

आपको संभवतः इसे स्वयं करने की आवश्यकता नहीं होगी, लेकिन यह React के समान है!

</DeepDive>

### Step 3: अपने component से Reducer का उपयोग करें {/*step-3-use-the-reducer-from-your-component*/}

अंत में, आपको `tasksReducer` को अपने component से जोड़ना होगा। React से `useReducer` Hook Import करें:

```js
import { useReducer } from 'react';
```

फिर आप `useState` को प्रतिस्थापित (replace) कर सकते हैं:

```js
const [tasks, setTasks] = useState(initialTasks);
```

with `useReducer` like so:

```js
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

`useReducer` hook `useState` के समान है - आपको इसे initial state में पास करना होगा और यह एक stateful value और set state करने का एक तरीका देता है (इस मामले में, dispatch फ़ंक्शन)। 
लेकिन यह थोड़ा अलग है.

`useReducer` hook two aruguments लेता है:

1. एक रेड्यूसर फ़ंक्शन
2. एक initial state

और यह लौटाता है:

1. एक stateful value
2. एक dispatch फ़ंक्शन (रेड्यूसर को user actions को "dispatch" करने के लिए)

अब यह पूरी तरह से व्यवस्थित हो गया है! यहां, रेड्यूसर को component फ़ाइल के नीचे घोषित किया गया है:

<Sandpack>

```js App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

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
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
```

```js AddTask.js hidden
import { useState } from 'react';

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </>
  );
}
```

```js TaskList.js hidden
import { useState } from 'react';

export default function TaskList({tasks, onChangeTask, onDeleteTask}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({task, onChange, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
```

```css
button {
  margin: 5px;
}
li {
  list-style-type: none;
}
ul,
li {
  margin: 0;
  padding: 0;
}
```

</Sandpack>

यदि आप चाहें, तो आप रिड्यूसर को किसी भिन्न फ़ाइल में भी ले जा सकते हैं:

<Sandpack>

```js App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import tasksReducer from './tasksReducer.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

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
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
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
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
```

```js tasksReducer.js
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js AddTask.js hidden
import { useState } from 'react';

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </>
  );
}
```

```js TaskList.js hidden
import { useState } from 'react';

export default function TaskList({tasks, onChangeTask, onDeleteTask}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({task, onChange, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
```

```css
button {
  margin: 5px;
}
li {
  list-style-type: none;
}
ul,
li {
  margin: 0;
  padding: 0;
}
```

</Sandpack>

जब आप इस तरह की concerns को अलग करते हैं तो component logic को पढ़ना आसान हो सकता है। 
अब ईवेंट हैंडलर केवल कार्रवाई भेजकर निर्दिष्ट करते हैं कि क्या हुआ, और रिड्यूसर फ़ंक्शन यह निर्धारित करता है कि उनके जवाब में state कैसे अपडेट होता है।

## तुलना  करे `useState` और `useReducer` के बिच {/*comparing-usestate-and-usereducer*/}

रेड्यूसर कमियों से रहित नहीं हैं! यहां कुछ तरीके दिए गए हैं जिनसे आप उनकी तुलना कर सकते हैं:

- **Code Size:** आम तौर पर, `useState` के साथ आपको पहले कम कोड लिखना होता है। `useReducer` के साथ, आपको रेड्यूसर फ़ंक्शन _और_ डिस्पैच क्रियाएं दोनों लिखनी होंगी। हालाँकि, यदि कई ईवेंट हैंडलर इसी तरह से स्थिति को संशोधित करते हैं, तो `useReducer` कोड को कम करने में मदद कर सकता है।

- **Readability:** state अपडेट सरल होने पर `useState` को पढ़ना बहुत आसान है। जब वे अधिक जटिल हो जाते हैं, तो वे आपके component के कोड को फूला सकते हैं और स्कैन करना कठिन बना सकते हैं। इस मामले में, `useReducer` आपको अपडेट लॉजिक के _how_ को इवेंट हैंडलर के _what happened_ से स्पष्ट रूप से अलग करने देता है।

- **Debugging:** जब आपके पास `useState` के साथ कोई बग होता है, तो यह बताना मुश्किल हो सकता है कि _where_ State गलत तरीके से सेट की गई थी, और _why_। `useReducer` के साथ, आप प्रत्येक State अपडेट को देखने के लिए अपने रेड्यूसर में एक कंसोल लॉग जोड़ सकते हैं, और _क्यों_ ऐसा हुआ (किस `action` के कारण)। यदि प्रत्येक `action` सही है, तो आपको पता चल जाएगा कि गलती रिड्यूसर लॉजिक में ही है। हालाँकि, आपको `useState` की तुलना में अधिक कोड से गुजरना होगा।

- **Testing** रिड्यूसर एक शुद्ध फ़ंक्शन है जो आपके component पर निर्भर नहीं करता है। इसका मतलब है कि आप इसे अलग से import और परीक्षण कर सकते हैं। जबकि आम तौर पर अधिक यथार्थवादी वातावरण में event का परीक्षण करना सबसे अच्छा होता है, complex state update logic के लिए यह दावा करना उपयोगी हो सकता है कि आपका रेड्यूसर एक विशेष initial state और कार्रवाई के लिए एक विशेष state लौटाता है।
- **व्यक्तिगत प्राथमिकता:** कुछ लोगों को रिड्यूसर पसंद होते हैं, अन्य को नहीं। वह ठीक है। यह प्राथमिकता का मामला है. आप हमेशा `useState` और `useReducer` के बीच आगे और पीछे कनवर्ट कर सकते हैं: वे समकक्ष हैं!

यदि आप किसी घटक में गलत स्थिति अपडेट के कारण अक्सर बग का सामना करते हैं, और इसके कोड में अधिक संरचना जोड़ना चाहते हैं, तो हम रेड्यूसर का उपयोग करने की सलाह देते हैं। आपको हर चीज़ के लिए रिड्यूसर का उपयोग करने की ज़रूरत नहीं है: बेझिझक मिश्रण और मिलान करें! आप एक ही घटक में `useState` और `useReducer` भी कर सकते हैं।

## रिड्यूसर अच्छी तरह से लिखना {/*writing-reducers-well*/}

रिड्यूसर लिखते समय इन दो युक्तियों को ध्यान में रखें:

- **रेड्यूसर शुद्ध होने चाहिए।** [स्टेट अपडेटर फ़ंक्शंस](/learn/queueing-a-series-of-state-updates) के समान, रेंडरिंग के दौरान रेड्यूसर चलते हैं! (अगले रेंडर तक क्रियाएं कतारबद्ध हैं।) इसका मतलब है कि रिड्यूसर [शुद्ध होना चाहिए] 
(/ सीखें/रख-घटकों-शुद्ध) - समान इनपुट का परिणाम हमेशा समान आउटपुट होता है। 
उन्हें अनुरोध नहीं भेजना चाहिए, टाइमआउट शेड्यूल नहीं करना चाहिए, या कोई साइड इफेक्ट (ऑपरेशन जो घटक के बाहर की चीजों को प्रभावित करते हैं) नहीं करना चाहिए। 
उन्हें उत्परिवर्तन के बिना [objects] (/ सीखें/अपडेट-ऑब्जेक्ट्स-इन-स्टेट) और [array] (/ सीखें/update-array-in-state) को अपडेट करना चाहिए।
- ** प्रत्येक क्रिया एक single user इंटरैक्शन का वर्णन करती है, भले ही इससे डेटा में कई परिवर्तन होते हों।
 ** उदाहरण के लिए, यदि कोई user रिड्यूसर द्वारा प्रबंधित पांच फ़ील्ड वाले फॉर्म पर "रीसेट" दबाता है, तो यह अधिक समझ में आता है पाँच अलग-अलग `set_field` क्रियाओं के बजाय एक `reset_form` क्रिया भेजें। 
 यदि आप प्रत्येक क्रिया को रेड्यूसर में लॉग करते हैं, तो वह लॉग इतना स्पष्ट होना चाहिए कि आप यह बता सकें कि किस क्रम में क्या इंटरैक्शन या प्रतिक्रियाएं हुईं। यह डिबगिंग में मदद करता है!

## इमर के साथ संक्षिप्त रिड्यूसर लिखना {/*writing-concise-reducers-with-immer*/}

ठीक वैसे ही जैसे [ऑब्जेक्ट्स को अपडेट करना](/सीखना/अपडेट करना-ऑब्जेक्ट्स-इन-स्टेट#लिखना-संक्षिप्त-अपडेट-लॉजिक-विथ-इमर) और [array]( /सीखना/अपडेट करना-सरणी-इन-स्टेट#लिखना-संक्षिप्त) -update-logic-with-immer) नियमित स्थिति में, आप रिड्यूसर को अधिक संक्षिप्त बनाने के लिए Immer लाइब्रेरी का उपयोग कर सकते हैं। यहां, [`useImmerReducer`](https://github.com/immerjs/use-immer#useimmerreducer) आपको `push` या `arr[i] =` असाइनमेंट के साथ स्थिति को बदलने की सुविधा देता है:

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
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

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
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
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
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
```

```js AddTask.js hidden
import { useState } from 'react';

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </>
  );
}
```

```js TaskList.js hidden
import { useState } from 'react';

export default function TaskList({tasks, onChangeTask, onDeleteTask}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({task, onChange, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
```

```css
button {
  margin: 5px;
}
li {
  list-style-type: none;
}
ul,
li {
  margin: 0;
  padding: 0;
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

रेड्यूसर शुद्ध होने चाहिए, इसलिए उन्हें स्थिति में परिवर्तन नहीं करना चाहिए। लेकिन इमर आपको एक विशेष 'draft' ऑब्जेक्ट प्रदान करता है जिसे बदलना सुरक्षित है। हुड के तहत, इमर आपके द्वारा 'ड्राफ्ट' में किए गए परिवर्तनों के साथ आपके state की एक प्रति बनाएगा। यही कारण है कि `useImmerReducer` द्वारा प्रबंधित रिड्यूसर अपने पहले loguc को बदल सकते हैं और उन्हें स्थिति वापस करने की आवश्यकता नहीं है।

<Recap>

- `useState` से `useReducer` में कनवर्ट करने के लिए:

   1. इवेंट हैंडलर्स से कार्रवाई भेजना।
   2. एक रिड्यूसर फ़ंक्शन लिखें जो किसी दिए गए state और क्रिया के लिए अगला state लौटाता है।
   3. `useState` को `useReducer` से बदलें।
- रेड्यूसर के लिए आपको थोड़ा अधिक कोड लिखने की आवश्यकता होती है, लेकिन वे डिबगिंग और परीक्षण में मदद करते हैं।
- रिड्यूसर शुद्ध होने चाहिए.
- प्रत्येक क्रिया एकल उपयोगकर्ता इंटरैक्शन का वर्णन करती है।
- यदि आप परिवर्तनशील शैली में रिड्यूसर लिखना चाहते हैं तो इमर का उपयोग करें।

</Recap>

<Challenges>

#### ईवेंट संचालकों से कार्रवाई भेजना {/*dispatch-actions-from-event-handlers*/}

वर्तमान में, `ContactList.js` और `Chat.js` में इवेंट हैंडलर के पास `// TODO` टिप्पणियाँ हैं। यही कारण है कि इनपुट में टाइप करना काम नहीं करता है, और बटन पर क्लिक करने से चयनित प्राप्तकर्ता नहीं बदलता है।

संबंधित क्रियाओं को `dispatch` करने के लिए इन दो `// TODO` को कोड से बदलें। अपेक्षित आकार और क्रियाओं के प्रकार को देखने के लिए, `messengerReducer.js` में रिड्यूसर की जाँच करें। रिड्यूसर पहले से ही लिखा हुआ है इसलिए आपको इसे बदलने की आवश्यकता नहीं होगी। आपको केवल `ContactList.js` और `Chat.js` में action भेजने की आवश्यकता है।

<Hint>

`डिस्पैच` फ़ंक्शन इन दोनों components में पहले से ही उपलब्ध है क्योंकि इसे एक prop के रूप में पारित किया गया था। तो आपको संबंधित एक्शन ऑब्जेक्ट के साथ `डिस्पैच` को कॉल करने की आवश्यकता है।

एक्शन ऑब्जेक्ट आकार की जांच करने के लिए, आप रिड्यूसर को देख सकते हैं और देख सकते हैं कि यह कौन से `एक्शन` फ़ील्ड देखने की उम्मीद करता है। उदाहरण के लिए, रिड्यूसर में `changed_selection` केस इस तरह दिखता है:

```js
case 'changed_selection': {
  return {
    ...state,
    selectedId: action.contactId
  };
}
```
इसका मतलब है कि आपके एक्शन ऑब्जेक्ट में `type: 'changed_selection'` होना चाहिए। आप `action.contactId` का उपयोग भी देखते हैं, इसलिए आपको अपनी कार्रवाई में `contactId` प्रॉपर्टी शामिल करने की आवश्यकता है।

</Hint>

<Sandpack>

```js App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js messengerReducer.js
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                // TODO: dispatch changed_selection
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js Chat.js
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          // TODO: dispatch edited_message
          // (Read the input value from e.target.value)
        }}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

<Solution>

रेड्यूसर कोड से, आप अनुमान लगा सकते हैं कि क्रियाएं इस तरह दिखनी चाहिए:

```js
// When the user presses "Alice"
dispatch({
  type: 'changed_selection',
  contactId: 1,
});

// When user types "Hello!"
dispatch({
  type: 'edited_message',
  message: 'Hello!',
});
```

संबंधित संदेशों को भेजने के लिए अद्यतन किया गया उदाहरण यहां दिया गया है:

<Sandpack>

```js App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js messengerReducer.js
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js Chat.js
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

</Solution>

#### संदेश भेजने पर इनपुट साफ़ करें {/*clear-the-input-on-sending-a-message*/}

वर्तमान में, "send" दबाने से कुछ नहीं होता है। "send" बटन में एक ईवेंट हैंडलर जोड़ें जो:

1. प्राप्तकर्ता के ईमेल और संदेश के साथ एक 'alert' दिखाएं।
2. संदेश इनपुट साफ़ करें.

<Sandpack>

```js App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js messengerReducer.js
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js Chat.js active
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

<Solution>

"send" बटन ईवेंट हैंडलर में आप इसे कुछ तरीकों से कर सकते हैं। एक दृष्टिकोण एक चेतावनी दिखाना है और फिर एक खाली `message` के साथ `edited_message` कार्रवाई भेजना है:

<Sandpack>

```js App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js messengerReducer.js
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js Chat.js active
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'edited_message',
            message: '',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

जब आप "send" दबाते हैं तो यह काम करता है और इनपुट साफ़ कर देता है।

हालाँकि, _उपयोगकर्ता के दृष्टिकोण से_, संदेश भेजना फ़ील्ड को संपादित करने की तुलना में एक अलग क्रिया है। इसे प्रतिबिंबित करने के लिए, आप इसके बजाय `sent_message` नामक एक _new_ क्रिया बना सकते हैं, और इसे रेड्यूसर में अलग से संभाल सकते हैं:

<Sandpack>

```js App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js messengerReducer.js active
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    case 'sent_message': {
      return {
        ...state,
        message: '',
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js Chat.js active
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

परिणामी व्यवहार वही है. लेकिन ध्यान रखें कि क्रिया प्रकारों को आदर्श रूप से "आप state को कैसे बदलना चाहते हैं" के बजाय "user ने क्या किया" का वर्णन करना चाहिए। इससे बाद में और अधिक सुविधाएँ जोड़ना आसान हो जाता है।

किसी भी समाधान के साथ, यह महत्वपूर्ण है कि आप 'alert' को रेड्यूसर के अंदर न रखें। रेड्यूसर एक शुद्ध फ़ंक्शन होना चाहिए - इसे केवल अगली स्थिति की गणना करनी चाहिए। इसे उपयोगकर्ता को संदेश प्रदर्शित करने सहित कुछ भी "no" करना चाहिए। यह इवेंट हैंडलर में होना चाहिए। (इस तरह की गलतियों को पकड़ने में मदद के लिए, रिएक्ट आपके रेड्यूसर को स्ट्रिक्ट मोड में कई बार कॉल करेगा। यही कारण है कि, यदि आप रेड्यूसर में अलर्ट डालते हैं, तो यह दो बार सक्रिय होता है।)

</Solution>

#### Restore input values when switching between tabs {/*restore-input-values-when-switching-between-tabs*/}

इस उदाहरण में, विभिन्न प्राप्तकर्ताओं के बीच स्विच करने से हमेशा टेक्स्ट इनपुट साफ़ हो जाता है:

```js
case 'changed_selection': {
  return {
    ...state,
    selectedId: action.contactId,
    message: '' // Clears the input
  };
```
ऐसा इसलिए है क्योंकि आप एक ही message ड्राफ्ट को कई प्राप्तकर्ताओं के बीच साझा नहीं करना चाहते हैं। लेकिन यह बेहतर होगा यदि आपका ऐप प्रत्येक संपर्क के लिए अलग से ड्राफ्ट को "remembered" रखे और जब आप संपर्क बदलें तो उन्हें पुनर्स्थापित कर दे।

आपका कार्य state की संरचना के तरीके को बदलना है ताकि आपको _प्रति संपर्क_ एक अलग संदेश ड्राफ्ट याद रहे। आपको रेड्यूसर, प्रारंभिक स्थिति और component में कुछ बदलाव करने की आवश्यकता होगी।

<Hint>

आप अपने state की संरचना इस प्रकार कर सकते हैं:

```js
export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor', // Draft for contactId = 0
    1: 'Hello, Alice', // Draft for contactId = 1
  },
};
```

`[कुंजी]: मान` [गणना की गई संपत्ति](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operator/Object_initializer#computed_property_names) सिंटैक्स आपको `message` को अपडेट करने में मदद कर सकता है वस्तु:

```js
{
  ...state.messages,
  [id]: message
}
```

</Hint>

<Sandpack>

```js App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js messengerReducer.js
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    case 'sent_message': {
      return {
        ...state,
        message: '',
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js Chat.js
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

<Solution>

आपको प्रति संपर्क एक अलग संदेश ड्राफ्ट को स्टोर करने और अपडेट करने के लिए रेड्यूसर को अपडेट करना होगा:

```js
// When the input is edited
case 'edited_message': {
  return {
    // Keep other state like selection
    ...state,
    messages: {
      // Keep messages for other contacts
      ...state.messages,
      // But change the selected contact's message
      [state.selectedId]: action.message
    }
  };
}
```
आप वर्तमान में चयनित message के लिए संदेश पढ़ने के लिए 'मैसेंजर' component को भी अपडेट करेंगे:

```js
const message = state.messages[state.selectedId];
```

Here is the complete solution:

<Sandpack>

```js App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.messages[state.selectedId];
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js messengerReducer.js
export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor',
    1: 'Hello, Alice',
    2: 'Hello, Bob',
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js Chat.js
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

विशेष रूप से, इस भिन्न व्यवहार को लागू करने के लिए आपको किसी भी ईवेंट हैंडलर को बदलने की आवश्यकता नहीं है। रिड्यूसर के बिना, आपको राज्य को अपडेट करने वाले प्रत्येक ईवेंट हैंडलर को बदलना होगा।

</Solution>

#### Implement `useReducer` from scratch {/*implement-usereducer-from-scratch*/}
पिछले उदाहरणों में, आपने React से `useReducer` hook import किया था। इस बार, आप _`useReducer` hook को ही लागू करेंगे!
_ initial करने के लिए यहां एक आधार है। इसमें कोड की 10 से अधिक लाइनें नहीं लगनी चाहिए।

अपने परिवर्तनों का परीक्षण करने के लिए, इनपुट में टाइप करने का प्रयास करें या किसी संपर्क का चयन करें।

<Hint>

यहां कार्यान्वयन का अधिक विस्तृत विवरण दिया गया है:

```js
export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    // ???
  }

  return [state, dispatch];
}
```
याद रखें कि एक रिड्यूसर फ़ंक्शन दो तर्क लेता है - वर्तमान स्थिति और एक्शन ऑब्जेक्ट - और यह अगली स्थिति लौटाता है। आपके `dispatch` कार्यान्वयन को इसके साथ क्या करना चाहिए?

</Hint>

<Sandpack>

```js App.js
import { useReducer } from './MyReact.js';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.messages[state.selectedId];
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js messengerReducer.js
export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor',
    1: 'Hello, Alice',
    2: 'Hello, Bob',
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js MyReact.js active
import { useState } from 'react';

export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  // ???

  return [state, dispatch];
}
```

```js ContactList.js hidden
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js Chat.js hidden
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

<Solution>

किसी क्रिया को भेजने से current state और क्रिया के साथ एक रिड्यूसर को कॉल किया जाता है, और परिणाम को अगली state के रूप में संग्रहीत किया जाता है। यह कोड में ऐसा दिखता है:

<Sandpack>

```js App.js
import { useReducer } from './MyReact.js';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.messages[state.selectedId];
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js messengerReducer.js
export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor',
    1: 'Hello, Alice',
    2: 'Hello, Bob',
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js MyReact.js active
import { useState } from 'react';

export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

```js ContactList.js hidden
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js Chat.js hidden
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

हालाँकि ज्यादातर मामलों में इससे कोई फर्क नहीं पड़ता, थोड़ा अधिक सटीक कार्यान्वयन इस तरह दिखता है:

```js
function dispatch(action) {
  setState((s) => reducer(s, action));
}
```

ऐसा इसलिए है क्योंकि भेजी गई action अगले रेंडर तक कतारबद्ध होती हैं, [similar to the updater functions.](/learn/queueing-a-series-of-state-updates)

</Solution>

</Challenges>
