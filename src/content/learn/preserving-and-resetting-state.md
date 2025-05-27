---
title: State का संरक्षण और उसे रिसेट करना 
---

<Intro> 

State हर एक कॉम्पोनेन्ट के लिए अलग है | कॉम्पोनेन्ट ui ट्री में कहा है इस आधार पर react state का हिसाब रखता है की कोनसा state कोनसे कॉम्पोनेन्ट का है | आप पुनश्च रेंडर में  state को कब संरक्षित करना है और कब रिसेट करना है यह नियंत्रित कर सकते है |

</Intro>

<YouWillLearn>

* react state संरक्षित करना है अथवा रिसेट करना है इसका चयन कब करता है 
* कैसे react बलपूर्वक कॉम्पोनेन्ट का state रिसेट कर सकता है 
* state संरक्षित करने को keys और types कैसे प्रभावित करते है 

</YouWillLearn>

## state रेंडर ट्री में एक स्थान से बंधा हुआ है {/*state-is-tied-to-a-position-in-the-tree*/}

react आपके उपयोगकर्ता इंटरफ़ेस में कॉम्पोनेन्ट संरचना के लिए [render trees](learn/understanding-your-ui-as-a-tree#the-render-tree) बनाता है |

जब आप एक कॉम्पोनेन्ट को state देते हो, तो आप यह कल्पना कर सकते हो की state कॉम्पोनेन्ट के अंदर 'रहता ' है। परन्तु state वास्तव में react में पकड़ा हुआ होता है react हर एक कॉम्पोनेन्ट को state  का हर एक भाग जो उसने पकड़ा हुआ है, उसे इस आधार पर सही कॉम्पोनेन्ट से जोड़ता है की वो कॉम्पोनेन्ट render tree में कहा है।

यहाँ वास्तव में केवल एक `<Counter />` jsx टैग है, परन्तु वह दो अलग जगह पर रेंडर हुआ है:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>
     
यहां बताया गया है कि ये tree के स्वरुप में कैसे दिखता है |

<DiagramGroup>

<Diagram name="preserving_state_tree" height={248} width={395} alt="Diagram of a tree of React components. The root node is labeled 'div' and has two children. Each of the children are labeled 'Counter' and both contain a state bubble labeled 'count' with value 0.">

React tree

</Diagram>

</DiagramGroup>

**ये दो अलग अलग counters है क्योंकि हर एक कॉम्पोनेन्ट tree में अपने स्वतंत्र स्थान पर रेंडर हुआ है |** आम तौर पर आप को इन स्थानो के बारे में सोचने की आवश्यकता नहीं है, परन्तु यह कैसे काम करता है यह समझने के लिए उपयुक्त होगा |

React में, स्क्रीन पर हर एक कॉम्पोनेन्ट का पूरी तरह से अलग state होता है| उदहारण के तौर पर, यदि आप दो counter कॉम्पोनेंट्स एक के बाजु में एक रेंडर करेंगे, तो उनमे से हर एक को अपना स्वतंत्र 'score' और 'hover' state मिलेगा|

दोनों counters को क्लिक करने का प्रयत्न करें और ध्यान दें की वह दोनों एक दूसरे को प्रभावित नहीं करते:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

जैसा की आप देख सकते हैं, जब एक counter अपडेट होता है तो केवल उसी कॉम्पोनेन्ट की state अपडेट होती है:

<DiagramGroup>

<Diagram name="preserving_state_increment" height={248} width={441} alt="Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is labeled 'Counter' and contains a state bubble labeled 'count' with value 1. The state bubble of the right child is highlighted in yellow to indicate its value has updated.">

State को अपडेट करना

</Diagram>

</DiagramGroup>

जब तक आप tree में एक कॉम्पोनेन्ट समान स्थान पर रेंडर करते हैं, तब तक React कॉम्पोनेन्ट state को बनाए रखेगा। इसे देखने के लिए, दोनों counter बढ़ाएँ, फिर "Render the second counter" चेकबॉक्स को अनचेक करके दूसरे कॉम्पोनेन्ट को हटा दें, और फिर उसी चेकबॉक्स को पुनः चेक करके वापस जोड़ दें। 

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <Counter />
      {showB && <Counter />} 
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        Render the second counter
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

ध्यान दें कि जैसे ही आप दूसरे counter को रेंडर करना बंद करते हैं, उसकी state पूरी तरह से गायब हो जाती है। ऐसा इसलिए है क्योंकि जब react किसी कॉम्पोनेन्ट को हटाता है, तो यह उसकी State को नष्ट कर देता है।

<DiagramGroup>

<Diagram name="preserving_state_remove_component" height={253} width={422} alt="Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is missing, and in its place is a yellow 'poof' image, highlighting the component being deleted from the tree.">

एक कॉम्पोनेन्ट हटाना

</Diagram>

</DiagramGroup>

जब आप "Render the second counter" पर टिक करते हैं, 
एक दूसरे `Counter` और उसकी state को स्क्रैच (`score = 0`) से आरंभ किया जाता है और DOM में जोड़ा जाता है। 

<DiagramGroup>

<Diagram name="preserving_state_add_component" height={258} width={500} alt="Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The entire right child node is highlighted in yellow, indicating that it was just added to the tree.">

एक कॉम्पोनेन्ट जोड़ना

</Diagram>

</DiagramGroup>

**रिएक्ट एक कॉम्पोनेन्ट की state को तब तक सुरक्षित रखता है जब तक इसे UI tree में अपनी state में रेंडर किया जा रहा है।** यदि इसे हटा दिया जाता है, या एक अलग कॉम्पोनेन्ट को उसी state में रेंडर किया जाता है, तो react अपनी state को त्याग देता है।

## समान स्थान में समान कॉम्पोनेन्ट state को सुरक्षित रखता है {/*same-component-at-the-same-position-preserves-state*/}

इस उदाहरण में, दो अलग-अलग `<Counter />` टैग हैं:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.fancy {
  border: 5px solid gold;
  color: #ff6767;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

जब आप चेकबॉक्स को टिक या clear करते हैं, तो counter state रीसेट नहीं होती है। चाहे `isFancy` `true` हो या `false`, आपके पास रूट `App` कॉम्पोनेन्ट से लौटाए गए `div` के पहले चाइल्ड नोड के रूप में हमेशा एक `<Counter />` होता है:

<DiagramGroup>

<Diagram name="preserving_state_same_component" height={461} width={600} alt="Diagram with two sections separated by an arrow transitioning between them. Each section contains a layout of components with a parent labeled 'App' containing a state bubble labeled isFancy. This component has one child labeled 'div', which leads to a prop bubble containing isFancy (highlighted in purple) passed down to the only child. The last child is labeled 'Counter' and contains a state bubble with label 'count' and value 3 in both diagrams. In the left section of the diagram, nothing is highlighted and the isFancy parent state value is false. In the right section of the diagram, the isFancy parent state value has changed to true and it is highlighted in yellow, and so is the props bubble below, which has also changed its isFancy value to true.">

`App` की स्थिति को अपडेट करने से `Counter` रीसेट नहीं होता क्योंकि `Counter` उसी state में रहता है।

</Diagram>

</DiagramGroup>


यह एक ही state में एक ही कॉम्पोनेन्ट है, इसलिए React के दृष्टिकोण से, यह एक ही Counter है।

<Pitfall>

इसे याद रखें की **यह यूआई ट्री में state है - JSX मार्कअप में नहीं - जो React के लिए मायने रखती है!** इस कॉम्पोनेन्ट में `if` के अंदर और बाहर अलग-अलग `<Counter />` JSX टैग के साथ दो `return` क्लॉज हैं:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  if (isFancy) {
    return (
      <div>
        <Counter isFancy={true} />
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          Use fancy styling
        </label>
      </div>
    );
  }
  return (
    <div>
      <Counter isFancy={false} />
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.fancy {
  border: 5px solid gold;
  color: #ff6767;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

जब आप चेकबॉक्स पर टिक करेंगे तो आप उम्मीद कर सकते हैं कि state रीसेट हो जाएगी, लेकिन ऐसा नहीं होता है! ऐसा इसलिए क्योंकि  **ये दोनों `<Counter />` टैग एक ही state में रेंडर किए गए हैं।** रिएक्ट को यह नहीं पता कि आप अपने function में conditions कहां रखते हैं। यह सब "देखता" वह tree है जिसे आप लौटाते हैं।


दोनों मामलों में, `App` कॉम्पोनेन्ट पहले child के रूप में `<Counter />` के साथ `<div>` लौटाता है। React के लिए, इन दोनों Counter का एक ही "पता" है: रूट के पहले child का पहला child। इस प्रकार React पिछले और अगले रेंडर के बीच उनका मेल करता है, भले ही आप अपने तर्क की संरचना कैसे भी करते हों।

</Pitfall>

## एक ही स्थान में विभिन्न कॉम्पोनेन्ट state को रीसेट करते हैं {/*different-components-at-the-same-position-reset-state*/}

इस उदाहरण में, चेकबॉक्स पर टिक करने से `<Counter>` को `<p>` से बदल दिया जाएगा:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? (
        <p>See you later!</p> 
      ) : (
        <Counter /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={e => {
            setIsPaused(e.target.checked)
          }}
        />
        Take a break
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

यहां, आप एक ही स्थान में _different_ कॉम्पोनेन्ट प्रकारों के बीच स्विच करते हैं। प्रारंभ में, `<div>` के पहले child में एक `Counter` था। लेकिन जब आपने `p` में स्वैप किया, तो रिएक्ट ने यूआई ट्री से `Counter` को हटा दिया और इसकी state को नष्ट कर दिया। 

<DiagramGroup>

<Diagram name="preserving_state_diff_pt1" height={290} width={753} alt="Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child component has now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'p', highlighted in yellow.">

जब `Counter` `p` में बदल जाता है, तो `Counter` हटा दिया जाता है और `p` जोड़ा जाता है। 

</Diagram>

</DiagramGroup>

<DiagramGroup>

<Diagram name="preserving_state_diff_pt2" height={290} width={753} alt="Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'p'. The middle section has the same 'div' parent, but the child component has now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, highlighted in yellow.">

वापस स्विच करने पर, `p` हटा दिया जाता है और `Counter` जोड़ा जाता है। 

</Diagram>

</DiagramGroup>
साथ ही, **जब आप किसी भिन्न कॉम्पोनेन्ट को एक ही स्थान में प्रस्तुत करते हैं, तो यह उसके संपूर्ण उपवृक्ष की state को रीसेट कर देता है।** यह कैसे काम करता है यह देखने के लिए, काउंटर बढ़ाएं और फिर चेकबॉक्स पर टिक करें:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <div>
          <Counter isFancy={true} /> 
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.fancy {
  border: 5px solid gold;
  color: #ff6767;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

जब आप चेकबॉक्स पर क्लिक करते हैं तो काउंटर state रीसेट हो जाती है। यद्यपि आप एक `काउंटर` प्रस्तुत करते हैं, `div` का पहला child `div` से `सेक्शन` में बदल जाता है। जब child `div` को DOM से हटा दिया गया, तो उसके नीचे का पूरा tree (`Counter` और उसकी state सहित) भी नष्ट हो गया। 

<DiagramGroup>

<Diagram name="preserving_state_diff_same_pt1" height={350} width={794} alt="Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'section', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'div', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.">


जब `section` `div` में बदलता है, तो `section` हटा दिया जाता है और नया `div` जोड़ा जाता है 

</Diagram>

</DiagramGroup>

<DiagramGroup>

<Diagram name="preserving_state_diff_same_pt2" height={350} width={794} alt="Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'div', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 0. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'section', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.">

वापस स्विच करने पर, `div` हटा दिया जाता है और नया `section` जोड़ा जाता है 

</Diagram>

</DiagramGroup>

एक सामान्य नियम के रूप में, **यदि आप री-रेंडर के बीच state को संरक्षित करना चाहते हैं, तो आपके tree की संरचना को एक रेंडर से दूसरे रेंडर में "match up" करना होगा**। यदि संरचना भिन्न है, तो state नष्ट हो जाता है क्योंकि जब react tree से एक कॉम्पोनेन्ट को हटाता है तो वह state को नष्ट कर देता है। 

<Pitfall>

This is why you should not nest component function definitions.

Here, the `MyTextField` component function is defined *inside* `MyComponent`:

<Sandpack>

```js
import { useState } from 'react';

export default function MyComponent() {
  const [counter, setCounter] = useState(0);

  function MyTextField() {
    const [text, setText] = useState('');

    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
    );
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => {
        setCounter(counter + 1)
      }}>Clicked {counter} times</button>
    </>
  );
}
```

</Sandpack>

हर बार जब आप बटन क्लिक करते हैं, तो इनपुट state गायब हो जाती है! ऐसा इसलिए है क्योंकि `MyComponent` के प्रत्येक रेंडर के लिए एक *अलग* `MyTextField` function बनाया जाता है।
आप एक *अलग* कॉम्पोनेन्ट को एक ही स्थान में प्रस्तुत कर रहे हैं, इसलिए रिएक्ट नीचे दी गई सभी state को रीसेट कर देता है। इससे बग और प्रदर्शन संबंधी समस्याएं उत्पन्न होती हैं। इस समस्या से बचने के लिए, **हमेशा शीर्ष स्तर पर कॉम्पोनेन्ट कार्यों की घोषणा करें, और उनकी परिभाषाओं को घोंसला न बनाएं।** 

</Pitfall>

## state को उसी स्थान में रीसेट करना {/*resetting-state-at-the-same-position*/}

डिफ़ॉल्ट रूप से, रिएक्ट एक कॉम्पोनेन्ट की state को संरक्षित करता है जबकि वह उसी स्थान में रहता है। आमतौर पर, यह वही है जो आप चाहते हैं, इसलिए यह डिफ़ॉल्ट व्यवहार के रूप में समझ में आता है। लेकिन कभी-कभी, आप किसी कॉम्पोनेन्ट की state को रीसेट करना चाह सकते हैं। इस ऐप पर विचार करें जो दो players को प्रत्येक मोड़ के दौरान उनके स्कोर पर नज़र रखने की सुविधा देता है:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
h1 {
  font-size: 18px;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

वर्तमान में, जब आप player बदलते हैं, तो स्कोर संरक्षित रहता है। दो `Counter` एक ही स्थान में दिखाई देते हैं, इसलिए रिएक्ट उन्हें *उसी* `Counter` के रूप में देखता है जिसका `person` प्रोप बदल गया है।

लेकिन वैचारिक रूप से, इस ऐप में वे दो अलग-अलग काउंटर होने चाहिए। वे यूआई में एक ही स्थान पर दिखाई दे सकते हैं, लेकिन एक Taylor के लिए एक counter है, और दूसरा Sarah के लिए एक counter है।

उनके बीच स्विच करते समय state को रीसेट करने के दो तरीके हैं:

1. कॉम्पोनेन्ट को विभिन्न स्थानों में प्रस्तुत करें
2. प्रत्येक कॉम्पोनेन्ट को `key` के साथ एक स्पष्ट पहचान दें

### विकल्प 1: एक कॉम्पोनेन्ट को विभिन्न स्थानों में प्रस्तुत करना {/*option-1-rendering-a-component-in-different-positions*/}

यदि आप चाहते हैं कि ये दोनों `Counter` स्वतंत्र हों, तो आप उन्हें दो अलग-अलग स्थानों में प्रस्तुत कर सकते हैं:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
h1 {
  font-size: 18px;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

* प्रारंभ में, `isPlayerA` `true` है। तो पहला स्थान में `Counter' state है, और दूसरी state खाली है।
* जब आप "Next player" बटन पर क्लिक करते हैं तो पहला स्थान साफ़ हो जाती है लेकिन दूसरे में अब एक `Counter` होता है।

<DiagramGroup>

<Diagram name="preserving_state_diff_position_p1" height={375} width={504} alt="Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'true'. The only child, arranged to the left, is labeled Counter with a state bubble labeled 'count' and value 0. All of the left child is highlighted in yellow, indicating it was added.">

आरंभिक state

</Diagram>

<Diagram name="preserving_state_diff_position_p2" height={375} width={504} alt="Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'false'. The state bubble is highlighted in yellow, indicating that it has changed. The left child is replaced with a yellow 'poof' image indicating that it has been deleted and there is a new child on the right, highlighted in yellow indicating that it was added. The new child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0.">

"next" क्लिक करना

</Diagram>

<Diagram name="preserving_state_diff_position_p3" height={375} width={504} alt="Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'true'. The state bubble is highlighted in yellow, indicating that it has changed. There is a new child on the left, highlighted in yellow indicating that it was added. The new child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is replaced with a yellow 'poof' image indicating that it has been deleted.">

फिर से "next" क्लिक करना

</Diagram>

</DiagramGroup>


प्रत्येक `Counter` की state हर बार DOM से हटाए जाने पर नष्ट हो जाती है। यही कारण है कि जब भी आप बटन क्लिक करते हैं तो वे रीसेट हो जाते हैं।

यह समाधान तब सुविधाजनक होता है जब आपके पास एक ही स्थान पर केवल कुछ स्वतंत्र कॉम्पोनेन्ट प्रस्तुत हों। इस उदाहरण में, आपके पास केवल दो हैं, इसलिए JSX में दोनों को अलग-अलग प्रस्तुत करना कोई परेशानी नहीं है।

### विकल्प 2: एक key के साथ state को रीसेट करना {/*option-2-resetting-state-with-a-key*/}

किसी कॉम्पोनेन्ट की state को रीसेट करने का एक और, अधिक सामान्य तरीका भी है।

आपने [सूचियाँ प्रस्तुत करते समय] `key` देखी होगी।(/learn/rendering-lists#keeping-list-items-in-order-with-key) keys केवल सूचियों के लिए नहीं हैं! आप रिएक्ट को किसी भी कॉम्पोनेन्ट के बीच अंतर करने के लिए keys का उपयोग कर सकते हैं। डिफ़ॉल्ट रूप से, रिएक्ट कॉम्पोनेन्ट के बीच अंतर करने के लिए parent ("पहला काउंटर", "दूसरा काउंटर") के भीतर ऑर्डर का उपयोग करता है। 
लेकिन keys आपको रिएक्ट को यह बताने देती हैं कि यह केवल *पहला* काउंटर, या *दूसरा* काउंटर नहीं है, बल्कि एक विशिष्ट काउंटर है - उदाहरण के लिए, *Taylor* काउंटर। इस तरह, React को tree में जहां भी दिखाई देगा, *Taylor* के काउंटर का पता चल जाएगा!

इस उदाहरण में, दो `<Counter />`की state साझा नहीं करते हैं, भले ही वे JSX में एक ही स्थान पर दिखाई देते हों: 

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
h1 {
  font-size: 18px;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>
Taylor और Sarah के बीच स्विच करने से state सुरक्षित नहीं रहता। ऐसा इसलिए है क्योंकि **आपने उन्हें अलग-अलग `keys` दी हैं:**

```js
{isPlayerA ? (
  <Counter key="Taylor" person="Taylor" />
) : (
  <Counter key="Sarah" person="Sarah" />
)}
```

`key` निर्दिष्ट करना रिएक्ट को मूल स्थान के भीतर उनके आदेश के बजाय, state के हिस्से के रूप में `key` का उपयोग करने के लिए कहता है। यही कारण है कि, भले ही आप उन्हें JSX में एक ही स्थान पर प्रस्तुत करते हैं, रिएक्ट उन्हें दो अलग-अलग काउंटरों के रूप में देखता है, और इसलिए वे कभी भी state साझा नहीं करेंगे। जब भी कोई काउंटर स्क्रीन पर दिखाई देता है, तो उसकी state बन जाती है। हर बार जब इसे हटाया जाता है, तो इसकी state नष्ट हो जाती है। 
उनके बीच टॉगल करने से उनकी state बार-बार रीसेट हो जाती है।

<Note>

याद रखें कि keys विश्व स्तर पर अद्वितीय नहीं हैं। वे केवल *parent के भीतर* स्थान निर्दिष्ट करते हैं। 

</Note>

### एक key के साथ फॉर्म को रीसेट करना {/*resetting-a-form-with-a-key*/}

forms से निपटते समय key के साथ state को रीसेट करना विशेष रूप से उपयोगी होता है। 

इस चैट ऐप में, `<Chat>` कॉम्पोनेन्ट में टेक्स्ट इनपुट state शामिल है: 

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
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

इनपुट में कुछ दर्ज करने का प्रयास करें, और फिर एक अलग प्राप्तकर्ता चुनने के लिए "Alice" या "Bob" दबाएँ। आप देखेंगे कि इनपुट state संरक्षित है क्योंकि `<Chat>` को tree में उसी state में प्रस्तुत किया गया है। 



**कई ऐप्स में, यह वांछित व्यवहार हो सकता है, लेकिन चैट ऐप में नहीं!** 
आप किसी आकस्मिक क्लिक के कारण उपयोगकर्ता को वह संदेश किसी गलत व्यक्ति को भेजने नहीं देना चाहेंगे जो उन्होंने पहले ही टाइप कर दिया है। इसे ठीक करने के लिए, एक `key` जोड़ें: 

```js
<Chat key={to.id} contact={to} />
```

यह सुनिश्चित करता है कि जब आप एक अलग प्राप्तकर्ता का चयन करते हैं, तो `Chat` कॉम्पोनेन्ट को स्क्रैच से फिर से बनाया जाएगा, जिसमें इसके नीचे के tree में कोई भी state शामिल होगी। 
रिएक्ट DOM तत्वों का पुन: उपयोग करने के बजाय उन्हें फिर से बनाएगा। 

अब प्राप्तकर्ता को स्विच करने से हमेशा टेक्स्ट फ़ील्ड साफ़ हो जाता है:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.id} contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
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

<DeepDive>

#### हटाए गए कॉम्पोनेन्ट के लिए state का संरक्षण {/*preserving-state-for-removed-components*/}

एक वास्तविक चैट ऐप में, जब उपयोगकर्ता पिछले प्राप्तकर्ता को फिर से चुनता है तो आप शायद इनपुट state को पुनर्प्राप्त करना चाहेंगे। ऐसे कॉम्पोनेन्ट की state को "जीवित" रखने के कुछ तरीके हैं जो अब दिखाई नहीं देते हैं:

- आप केवल वर्तमान चैट के बजाय _all_ चैट प्रस्तुत कर सकते हैं, लेकिन CSS के साथ अन्य सभी को छिपा सकते हैं। चैट को tree से नहीं हटाया जाएगा, इसलिए उनकी स्थानीय state संरक्षित रहेगी। यह समाधान सरल UI के लिए बढ़िया काम करता है। लेकिन यदि छिपे हुए tree बड़े हैं और उनमें बहुत सारे DOM नोड हैं तो यह बहुत धीमा हो सकता है। 
- आप [state को ऊपर उठा सकते हैं](/learn/sharing-state-between-components) और मूल कॉम्पोनेन्ट में प्रत्येक प्राप्तकर्ता के लिए लंबित संदेश को रोक कर रख सकते हैं। इस तरह, जब चाइल्ड कॉम्पोनेन्ट हटा दिए जाते हैं, तो इससे कोई फर्क नहीं पड़ता, क्योंकि यह parent ही हैं जो महत्वपूर्ण जानकारी रखते हैं। यह सबसे आम समाधान है.
- आप React state के अतिरिक्त किसी भिन्न स्रोत का भी उपयोग कर सकते हैं। उदाहरण के लिए, आप संभवतः चाहते हैं कि संदेश ड्राफ्ट बना रहे, भले ही उपयोगकर्ता गलती से page बंद कर दे। इसे लागू करने के लिए, आप 'Chat' कॉम्पोनेन्ट को [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) से पढ़कर अपनी state आरंभ करवा सकते हैं। और वहां ड्राफ्ट भी सहेजें।
 
इससे कोई फर्क नहीं पड़ता कि आप कौन सी रणनीति चुनते हैं, Alice_ के साथ चैट वैचारिक रूप से Bob_ के साथ चैट से अलग है, इसलिए वर्तमान प्राप्तकर्ता के आधार पर `<Chat>` ट्री को `key' देना समझ में आता है। 

</DeepDive>

<Recap>

- React तब तक state बनाए रखता है जब तक एक ही कॉम्पोनेन्ट को एक ही स्थान में प्रस्तुत किया जाता है। 
- state को JSX टैग में नहीं रखा गया है। यह उस tree की state से जुड़ा है जिसमें आपने उस JSX को रखा है। 
- आप किसी subtree को एक अलग keys देकर उसकी state को रीसेट करने के लिए बाध्य कर सकते हैं।
- कॉम्पोनेन्ट परिभाषाओं को घोंसला न बनाएं, अन्यथा आप दुर्घटनावश state रीसेट कर देंगे। 

</Recap>



<Challenges>

#### गायब हो रहे इनपुट टेक्स्ट को ठीक करें {/*fix-disappearing-input-text*/}

जब आप बटन दबाते हैं तो यह उदाहरण एक संदेश दिखाता है। हालाँकि, बटन दबाने से भी गलती से इनपुट रीसेट हो जाता है। ऐसा क्यूँ होता है? इसे ठीक करें ताकि बटन दबाने से इनपुट टेक्स्ट रीसेट न हो। 

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  if (showHint) {
    return (
      <div>
        <p><i>Hint: Your favorite city?</i></p>
        <Form />
        <button onClick={() => {
          setShowHint(false);
        }}>Hide hint</button>
      </div>
    );
  }
  return (
    <div>
      <Form />
      <button onClick={() => {
        setShowHint(true);
      }}>Show hint</button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

```css
textarea { display: block; margin: 10px 0; }
```

</Sandpack>

<Solution>

समस्या यह है कि `Form` को विभिन्न स्थानों में प्रस्तुत किया जाता है। `if` शाखा में, यह `<div>` का दूसरा child है, लेकिन `else` शाखा में, यह पहला child है। इसलिए, प्रत्येक स्थान में कॉम्पोनेन्ट प्रकार बदलता है। पहला स्थान `p` और `form` को पकड़ने के बीच बदलता है, जबकि दूसरा स्थान `form` और `button` को पकड़ने के बीच बदलता है। हर बार कॉम्पोनेन्ट प्रकार बदलने पर REact state को रीसेट कर देता है। 


सबसे आसान समाधान शाखाओं को एकजुट करना है ताकि 'Form' हमेशा एक ही स्थान में प्रस्तुत हो: 

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  return (
    <div>
      {showHint &&
        <p><i>Hint: Your favorite city?</i></p>
      }
      <Form />
      {showHint ? (
        <button onClick={() => {
          setShowHint(false);
        }}>Hide hint</button>
      ) : (
        <button onClick={() => {
          setShowHint(true);
        }}>Show hint</button>
      )}
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

```css
textarea { display: block; margin: 10px 0; }
```

</Sandpack>

तकनीकी रूप से, आप `if` शाखा संरचना से match करने के लिए `else` शाखा में `<Form />` से पहले `null` भी जोड़ सकते हैं:

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  if (showHint) {
    return (
      <div>
        <p><i>Hint: Your favorite city?</i></p>
        <Form />
        <button onClick={() => {
          setShowHint(false);
        }}>Hide hint</button>
      </div>
    );
  }
  return (
    <div>
      {null}
      <Form />
      <button onClick={() => {
        setShowHint(true);
      }}>Show hint</button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

```css
textarea { display: block; margin: 10px 0; }
```

</Sandpack>

इस तरह, `Form` हमेशा दूसरा child होता है, इसलिए यह उसी स्थान में रहता है और अपनी state बनाए रखता है।
लेकिन यह दृष्टिकोण बहुत कम स्पष्ट है और यह जोखिम पैदा करता है कि कोई अन्य व्यक्ति उस `null` को हटा देगा।

</Solution>

#### दो form fields स्वैप करें {/*swap-two-form-fields*/}

यह फॉर्म आपको पहला और उपनाम दर्ज करने की सुविधा देता है। इसमें एक चेकबॉक्स भी है जो नियंत्रित करता है कि कौन सा फ़ील्ड पहले जाएगा। जब आप चेकबॉक्स पर टिक करते हैं, तो "Last name" फ़ील्ड "First name" फ़ील्ड से पहले दिखाई देगी। 


यह लगभग काम करता है, लेकिन इसमें एक bug है। यदि आप "First name" इनपुट भरते हैं और चेकबॉक्स पर टिक करते हैं, तो टेक्स्ट पहले इनपुट (जो अब "Last name" है) में रहेगा। इसे ठीक करें ताकि जब आप ऑर्डर उलटें तो इनपुट टेक्स्ट *भी* चले। 

<Hint>

ऐसा लगता है कि इन fields के लिए, मूल क्षेत्र में उनकी स्थिति पर्याप्त नहीं है। क्या रिएक्ट को यह बताने का कोई तरीका है कि री-रेंडर के बीच की state का match कैसे किया जाए? 

</Hint>

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      Reverse order
    </label>
  );
  if (reverse) {
    return (
      <>
        <Field label="Last name" /> 
        <Field label="First name" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field label="First name" /> 
        <Field label="Last name" />
        {checkbox}
      </>
    );    
  }
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}
```

```css
label { display: block; margin: 10px 0; }
```

</Sandpack>

<Solution>


`if` और `else` दोनों शाखाओं में `<Field>` दोनों घटकों को `key` दें। यह React को बताता है कि `<Field>` के लिए सही state का "match" कैसे किया जाए, भले ही उनका क्रम parent के भीतर बदल जाए: 

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      Reverse order
    </label>
  );
  if (reverse) {
    return (
      <>
        <Field key="lastName" label="Last name" /> 
        <Field key="firstName" label="First name" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field key="firstName" label="First name" /> 
        <Field key="lastName" label="Last name" />
        {checkbox}
      </>
    );    
  }
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}
```

```css
label { display: block; margin: 10px 0; }
```

</Sandpack>

</Solution>

#### विवरण form रीसेट करें {/*reset-a-detail-form*/}


यह एक संपादन योग्य संपर्क सूची है. आप चयनित संपर्क के विवरण को संपादित कर सकते हैं और फिर इसे अपडेट करने के लिए या तो "Save" दबा सकते हैं, या अपने परिवर्तनों को पूर्ववत करने के लिए "Reset" दबा सकते हैं।

जब आप कोई भिन्न संपर्क चुनते हैं (उदाहरण के लिए, Alice), तो state अपडेट हो जाती है लेकिन form पिछले संपर्क का विवरण दिखाता रहता है। इसे ठीक करें ताकि चयनित संपर्क बदलने पर form रीसेट हो जाए। 

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/EditContact.js
import { useState } from 'react';

export default function EditContact({ initialData, onSave }) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  return (
    <section>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: initialData.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Save
      </button>
      <button onClick={() => {
        setName(initialData.name);
        setEmail(initialData.email);
      }}>
        Reset
      </button>
    </section>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li { display: inline-block; }
li button {
  padding: 10px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

<Solution>

`EditContact` कॉम्पोनेन्ट को `key={selectedId}` दें। इस तरह, विभिन्न संपर्कों के बीच switch करने से form रीसेट हो जाएगा: 

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        key={selectedId}
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/EditContact.js
import { useState } from 'react';

export default function EditContact({ initialData, onSave }) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  return (
    <section>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: initialData.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Save
      </button>
      <button onClick={() => {
        setName(initialData.name);
        setEmail(initialData.email);
      }}>
        Reset
      </button>
    </section>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li { display: inline-block; }
li button {
  padding: 10px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

</Solution>

#### लोड होते समय छवि साफ़ करें {/*clear-an-image-while-its-loading*/}

जब आप "Next" दबाते हैं, तो browser अगली छवि लोड करना शुरू कर देता है। हालाँकि, क्योंकि यह उसी `<img>` टैग में प्रदर्शित होता है, डिफ़ॉल्ट रूप से आपको अगली छवि लोड होने तक पिछली छवि दिखाई देगी। यह अवांछनीय हो सकता है यदि पाठ का हमेशा छवि से मेल खाना महत्वपूर्ण हो। इसे बदलें ताकि जैसे ही आप "Next" दबाएँ, पिछली छवि तुरंत साफ़ हो जाए।

<Hint>

क्या रिएक्ट को दोबारा उपयोग करने के बजाय DOM को दोबारा बनाने के लिए कहने का कोई तरीका है? 

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const hasNext = index < images.length - 1;

  function handleClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  let image = images[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h3>
        Image {index + 1} of {images.length}
      </h3>
      <img src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  );
}

let images = [{
  place: 'Penang, Malaysia',
  src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
  place: 'Lisbon, Portugal',
  src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
  place: 'Bilbao, Spain',
  src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
  place: 'Valparaíso, Chile',
  src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
  place: 'Schwyz, Switzerland',
  src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
  place: 'Prague, Czechia',
  src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
  place: 'Ljubljana, Slovenia',
  src: 'https://i.imgur.com/3aIiwfm.jpg'
}];
```

```css
img { width: 150px; height: 150px; }
```

</Sandpack>

<Solution>

आप `<img>` टैग के लिए `key` प्रदान कर सकते हैं। जब वह `key` बदलती है, तो रिएक्ट स्क्रैच से `<img>` DOM नोड को फिर से बनाएगा। प्रत्येक छवि लोड होने पर यह एक संक्षिप्त फ्लैश का कारण बनता है, इसलिए यह ऐसा कुछ नहीं है जो आप अपने ऐप में प्रत्येक छवि के लिए करना चाहेंगे। लेकिन यदि आप यह सुनिश्चित करना चाहते हैं कि छवि हमेशा पाठ से मेल खाती है तो यह समझ में आता है। 

<Sandpack>

```js
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const hasNext = index < images.length - 1;

  function handleClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  let image = images[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h3>
        Image {index + 1} of {images.length}
      </h3>
      <img key={image.src} src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  );
}

let images = [{
  place: 'Penang, Malaysia',
  src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
  place: 'Lisbon, Portugal',
  src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
  place: 'Bilbao, Spain',
  src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
  place: 'Valparaíso, Chile',
  src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
  place: 'Schwyz, Switzerland',
  src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
  place: 'Prague, Czechia',
  src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
  place: 'Ljubljana, Slovenia',
  src: 'https://i.imgur.com/3aIiwfm.jpg'
}];
```

```css
img { width: 150px; height: 150px; }
```

</Sandpack>

</Solution>

#### सूची में ग़लत state ठीक करें {/*fix-misplaced-state-in-the-list*/}

इस सूची में, प्रत्येक `Contact` में एक state होती है जो यह निर्धारित करती है कि इसके लिए "Show email" दबाया गया है या नहीं। Alice के लिए "Show email" दबाएँ, और फिर "Show in reverse order" चेकबॉक्स पर टिक करें। आप देखेंगे कि यह _Taylor_ का ईमेल है जिसे अब विस्तारित किया गया है, लेकिन Alice का - जो नीचे चला गया है - ढह गया प्रतीत होता है। 

इसे ठीक करें ताकि चयनित ऑर्डर की परवाह किए बिना विस्तारित state प्रत्येक संपर्क से संबद्ध हो।

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Contact from './Contact.js';

export default function ContactList() {
  const [reverse, setReverse] = useState(false);

  const displayedContacts = [...contacts];
  if (reverse) {
    displayedContacts.reverse();
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={reverse}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        Show in reverse order
      </label>
      <ul>
        {displayedContacts.map((contact, i) =>
          <li key={i}>
            <Contact contact={contact} />
          </li>
        )}
      </ul>
    </>
  );
}

const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
```

```js src/Contact.js
import { useState } from 'react';

export default function Contact({ contact }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p><b>{contact.name}</b></p>
      {expanded &&
        <p><i>{contact.email}</i></p>
      }
      <button onClick={() => {
        setExpanded(!expanded);
      }}>
        {expanded ? 'Hide' : 'Show'} email
      </button>
    </>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin-bottom: 20px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

<Solution>

समस्या यह है कि यह उदाहरण index को `key` के रूप में उपयोग कर रहा था:

```js
{displayedContacts.map((contact, i) =>
  <li key={i}>
```

हालाँकि, आप चाहते हैं कि state _each particular contact_ से संबद्ध हो। 

इसके बजाय संपर्क ID को `key` के रूप में उपयोग करने से समस्या ठीक हो जाती है:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Contact from './Contact.js';

export default function ContactList() {
  const [reverse, setReverse] = useState(false);

  const displayedContacts = [...contacts];
  if (reverse) {
    displayedContacts.reverse();
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={reverse}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        Show in reverse order
      </label>
      <ul>
        {displayedContacts.map(contact =>
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        )}
      </ul>
    </>
  );
}

const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
```

```js src/Contact.js
import { useState } from 'react';

export default function Contact({ contact }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p><b>{contact.name}</b></p>
      {expanded &&
        <p><i>{contact.email}</i></p>
      }
      <button onClick={() => {
        setExpanded(!expanded);
      }}>
        {expanded ? 'Hide' : 'Show'} email
      </button>
    </>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin-bottom: 20px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

State का सम्बन्ध tree के स्थान से है। एक `key` आपको ऑर्डर पर निर्भर रहने के बजाय एक नामित स्थान निर्दिष्ट करने देती है। 

</Solution>

</Challenges>
