---
title: कंडीशनल  रेंडरिंग
---

<Intro>

आपके कौम्पोनॅन्ट को अक्सर अलग-अलग स्थितियों के आधार पर अलग-अलग चीजें डिस्प्ले करने की आवश्यकता होगी। React में, आप JSX को किसी कंडीशन के साथ JavaScript सिंटेक्स जैसे की `if` स्टेटमेंट्स, `&&`, एंड `?:` ऑपरेटर्स को इस्तेमाल करके रेंडर कर सकते है।

</Intro>

<YouWillLearn>

* कैसे एक कंडीशन के आधार पर अलग JSX रिटर्न करे
* कैसे किसी कंडीशन के आधार पर JSX के एक पीस को शामिल करें या निकालें
* सामान्य कंडीशनल सिंटैक्स शॉर्टकट जो आपको React कोडबेस में मिलेंगे

</YouWillLearn>

## कंडीशन के आधार पर JSX को रिटर्न करें {/*conditionally-returning-jsx*/}

मान लें कि आपके पास एक `PackingList` कौम्पोनॅन्ट है जो कई `Item` रेंडर करता है, जिसे मार्क जा सकता है या नहीं:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

ध्यान दें कि कुछ `Item` कौम्पोनॅन्ट का `isPacked` prop `false` के बजाय `true` पर सेट है। आप पैक किए गए आइटम में एक चेकमार्क (✔) ऐड करना चाहते हैं यदि `isPacked={true}` है।

आप इसे [`if`/`else` स्टेटमेंट](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) के रूप में लिख सकते हैं, इस तरह:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

यदि `isPacked` prop `true` है, तो यह कोड **एक अलग JSX ट्री रिटर्न करता है**। इस परिवर्तन के साथ, कुछ चीज़ों को अंत में एक चेकमार्क मिलता है:

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

किसी भी केस में जो रिटर्न आता है उसे बदलने का प्रयास करें, और देखें कि परिणाम कैसे बदलता है!

ध्यान दें कि आप JavaScript के `if` और `return` स्टेटमेंट के साथ ब्रांचिंग लॉजिक कैसे बना रहे हैं। React में, कण्ट्रोल फ्लो  (जैसे की कंडीशंस) को JavaScript से नियंत्रित किया जाता है।

### `null` के साथ कंडीशन के आधार पर कुछ कुछ नहीं रिटर्न करना {/*conditionally-returning-nothing-with-null*/}

कुछ स्थितियों में, आप कुछ भी रेंडर नहीं करना चाहेंगे। उदाहरण के लिए, मान लें कि आप पैक्ड आइटम बिल्कुल नहीं दिखाना चाहते हैं। लेकिन एक कौम्पोनॅन्ट को तो कुछ न कुछ रिटर्न करना होग। इस केस में, आप `null` रिटर्न कर सकते हैं:

```js
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```

यदि `isPacked` true है, तो कौम्पोनॅन्ट कुछ भी नहीं लौटाएगा, `null`। नहीं तो, यह JSX को रेंडर करने के लिए रिटर्न कर देगा।

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

अभ्यास में, किसी कौम्पोनॅन्ट से `null` लौटाना आम बात नहीं है क्योंकि यह इसे रेंडर करने की कोशिश कर रहे डेवलपर को आश्चर्यचकित कर सकता है। अधिक बार, आप पैरेंट कौम्पोनॅन्ट के JSX में कौम्पोनॅन्ट को कंडीशनल रूप से शामिल करेंगे या बहार रखेंगे। यहाँ यह कैसे करना है!

## कंडीशन के आधार पर JSX को इंक्लूड करें {/*conditionally-including-jsx*/}

पिछले उदाहरण में, आपने नियंत्रित किया था कि कौन सा (यदि कोई हो!) JSX ट्री कौम्पोनॅन्ट से लौटाया जाएगा। आपने पहले ही रेंडर आउटपुट में कुछ डुप्लीकेशन देखा होगा:

```js
<li className="item">{name} ✔</li>
```

इससे बहुत समान है

```js
<li className="item">{name}</li>
```

दोनों कंडीशनल ब्रांचेज `<li className="item">...</li>` रिटर्न करती हैं:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

हालांकि यह डुप्लीकेशन हानिकारक नहीं है, लेकिन यह आपके कोड को मेन्टेन करना कठिन बना सकता है। क्या होगा यदि आप `className` को बदलना चाहते हैं? आपको इसे अपने कोड में दो स्थानों पर करना होगा! ऐसी स्थिति में, आप अपने कोड को और अधिक [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) बनाने के लिए कंडीशनल रूप से थोड़ा JSX शामिल कर सकते हैं।

### Conditional (ternary) operator (`? :`) {/*conditional-ternary-operator--*/}

कंडीशनल एक्सप्रेशन लिखने के लिए JavaScript में एक कॉम्पैक्ट सिंटैक्स है - [कंडीशनल ऑपरेटर](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) या "टर्नरी ऑपरेटर।"

इसके बजाये:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

आप इसे लिख सकते हैं:

```js
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```

आप इसे इस प्रकार पढ़ सकते हैं *"यदि `isPacked` true है, तो (`?`) `name +' ✔'` रेंडर करें, नहीं तो (`:`) `name` रेंडर करें।"*)

<DeepDive title="क्या ये दो उदाहरण पूरी तरह बराबर हैं?">

यदि आप किसी ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग बैकग्राउंड से आ रहे हैं, तो आप मान सकते हैं कि ऊपर दिए गए दो उदाहरण सूक्ष्म रूप से भिन्न हैं क्योंकि उनमें से एक `<li>` के दो अलग-अलग "इंस्टेंस" बना सकता है। लेकिन JSX एलिमेंट्स "इंस्टेंस" नहीं हैं क्योंकि उनके पास कोई आंतरिक state नहीं है और वे असली DOM नोड नहीं हैं। वे हल्के विवरण हैं, जैसे ब्लूप्रिंट। तो ये दो उदाहरण, असली में, *पूरी तरह* से समान हैं। [State को प्रीज़र्व और रीसेट करना](/learn/preserving-and-resetting-state) विस्तार से बताता है कि यह कैसे काम करता है।

</DeepDive>

अब मान लें कि आप पूर्ण किए गए आइटम के टेक्स्ट को किसी अन्य HTML टैग में ऐड करना चाहते हैं, जैसे `<del>` को बाहर निकालने के लिए। आप और भी नई पंक्तियाँ और पैरेंथेसेस ऐड कर सकते हैं ताकि प्रत्येक केस में अधिक JSX को नेस्टेड करना आसान हो:


<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✔'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

यह तरीका साधारण परिस्थितियों के लिए अच्छी तरह से काम करती है, लेकिन इसे मॉडरेशन में उपयोग करें। यदि आपके कौम्पोनॅन्ट बहुत अधिक नेस्टेड कंडीशनल मार्कअप के साथ कीच-पिच हो जाते हैं, तो चीजों को साफ करने के लिए चाइल्ड कौम्पोनॅन्टस को निकालने पर विचार करें। React में, मार्कअप आपके कोड का एक हिस्सा है, इसलिए आप काम्प्लेक्स एक्सप्रेशंस को व्यवस्थित करने के लिए वेरिएबल और फ़ंक्शन जैसे टूल का उपयोग कर सकते हैं।

### Logical AND operator (`&&`) {/*logical-and-operator-*/}

Another common shortcut you'll encounter is the [JavaScript logical AND (`&&`) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.). Inside React components, it often comes up when you want to render some JSX when the condition is true, **or render nothing otherwise.** With `&&`, you could conditionally render the checkmark only if `isPacked` is `true`:

```js
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

You can read this as *“if `isPacked`, then (`&&`) render the checkmark, otherwise, render nothing.”*

Here it is in action:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

A [JavaScript && expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) returns the value of its right side (in our case, the checkmark) if the left side (our condition) is `true`. But if the condition is `false`, the whole expression becomes `false`. React considers `false` as a "hole" in the JSX tree, just like `null` or `undefined`, and doesn't render anything in its place.


<Gotcha>

**Don't put numbers on the left side of `&&`.**

To test the condition, JavaScript converts the left side to a boolean automatically. However, if the left side is `0`, then the whole expression gets that value (`0`), and React will happily render `0` rather than nothing.

For example, a common mistake is to write code like `messageCount && <p>New messages</p>`. It's easy to assume that it renders nothing when `messageCount` is `0`, but it really renders the `0` itself!

To fix it, make the left side a boolean: `messageCount > 0 && <p>New messages</p>`.

</Gotcha>

### Conditionally assigning JSX to a variable {/*conditionally-assigning-jsx-to-a-variable*/}

When the shortcuts get in the way of writing plain code, try using an `if` statement and a variable. You can reassign variables defined with [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), so start by providing the default content you want to display, the name:

```js
let itemContent = name;
```

Use an `if` statement to reassign a JSX expression to `itemContent` if `isPacked` is `true`:

```js
if (isPacked) {
  itemContent = name + " ✔";
}
```

[Curly braces open the "window into JavaScript".](/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world) Embed the variable with curly braces in the returned JSX tree, nesting the previously calculated expression inside of JSX:

```js
<li className="item">
  {itemContent}
</li>
```

This style is the most verbose, but it's also the most flexible. Here it is in action:

<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

Like before, this works not only for text, but for arbitrary JSX too:

<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✔"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

If you're not familiar with JavaScript, this variety of styles might seem overwhelming at first. However, learning them will help you read and write any JavaScript code -- and not just React components! Pick the one you prefer for a start, and then consult this reference again if you forget how the other ones work.

<Recap>

* In React, you control branching logic with JavaScript.
* You can return a JSX expression conditionally with an `if` statement.
* You can conditionally save some JSX to a variable and then include it inside other JSX by using the curly braces.
* In JSX, `{cond ? <A /> : <B />}` means *"if `cond`, render `<A />`, otherwise `<B />`"*.
* In JSX, `{cond && <A />}` means *"if `cond`, render `<A />`, otherwise nothing"*.
* The shortcuts are common, but you don't have to use them if you prefer plain `if`.

</Recap>



<Challenges>

### Show an icon for incomplete items with `? :` {/*show-an-icon-for-incomplete-items-with--*/}

Use the conditional operator (`cond ? a : b`) to render a ❌ if `isPacked` isn’t `true`.

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked ? '✔' : '❌'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

</Solution>

### Show the item importance with `&&` {/*show-the-item-importance-with-*/}

In this example, each `Item` receives a numerical `importance` prop. Use the `&&` operator to render "_(Importance: X)_" in italics, but only for items that have non-zero difficulty. Your item list should end up looking like this:

* Space suit _(Importance: 9)_
* Helmet with a golden leaf
* Photo of Tam _(Importance: 6)_

Don't forget to add a space between the two labels!

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          importance={9}
          name="Space suit"
        />
        <Item
          importance={0}
          name="Helmet with a golden leaf"
        />
        <Item
          importance={6}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

This should do the trick:

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && ' '}
      {importance > 0 &&
        <i>(Importance: {importance})</i>
      }
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          importance={9}
          name="Space suit"
        />
        <Item
          importance={0}
          name="Helmet with a golden leaf"
        />
        <Item
          importance={6}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

Note that you must write `importance > 0 && ...` rather than `importance && ...` so that if the `importance` is `0`, `0` isn't rendered as the result!

In this solution, two separate conditions are used to insert a space between then name and the importance label. Alternatively, you could use a fragment with a leading space: `importance > 0 && <> <i>...</i></>` or add a space immediately inside the `<i>`:  `importance > 0 && <i> ...</i>`.

</Solution>

### Refactor a series of `? :` to `if` and variables {/*refactor-a-series-of---to-if-and-variables*/}

This `Drink` component uses a series of `? :` conditions to show different information depending on whether the `name` prop is `"tea"` or `"coffee"`. The problem is that the information about each drink is spread across multiple conditions. Refactor this code to use a single `if` statement instead of three `? :` conditions.

<Sandpack>

```js
function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
        <dt>Caffeine content</dt>
        <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
        <dt>Age</dt>
        <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

Once you've refactored the code to use `if`, do you have further ideas on how to simplify it?

<Solution>

There are multiple ways you could go about this, but here is one starting point:

<Sandpack>

```js
function Drink({ name }) {
  let part, caffeine, age;
  if (name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else if (name === 'coffee') {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{part}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

Here the information about each drink is grouped together instead of being spread across multiple conditions. This makes it easier to add more drinks in the future.

Another solution would be to remove the condition altogether by moving the information into objects:

<Sandpack>

```js
const drinks = {
  tea: {
    part: 'leaf',
    caffeine: '15–70 mg/cup',
    age: '4,000+ years'
  },
  coffee: {
    part: 'bean',
    caffeine: '80–185 mg/cup',
    age: '1,000+ years'
  }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{info.part}</dd>
        <dt>Caffeine content</dt>
        <dd>{info.caffeine}</dd>
        <dt>Age</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
