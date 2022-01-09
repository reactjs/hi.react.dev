---
title: React में सोच
---


<Intro>

React आपके द्वारा देखे जाने वाले डिज़ाइन और आपके द्वारा बनाए गए ऍप्स के बारे में आपके सोचने के तरीके को बदल सकता है। जहां एक बार आपने जंगल को देखा है, React के साथ काम करने के बाद, आप अलग-अलग पेड़ों की सराहना करेंगे। React डिजाइन सिस्टम और UI states में सोचना आसान बनाता है। इस टुटोरिअल में, हम आपको सर्च होने वाले प्रोडक्ट डाटा टेबल को React के साथ बनाए के तरीके के बारे में गाइड करेंगे।

</Intro>

## मॉकअप के साथ शुरू करें {/*start-with-the-mockup*/}

कल्पना करें कि आपके पास पहले से ही एक JSON API और एक डिजाइनर से दिया गया मॉकअप है।

JSON  API कुछ डेटा लौटाता है जो इस तरह दिखता है:

```json
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
```

मॉकअप इस तरह दिखता है:

<img src="/images/docs/s_thinking-in-react_ui.png" width="300" style={{margin: '0 auto'}} />

React  में  UI  को लागू करने के लिए, आप आमतौर पर इन्ही पांच स्टेप्स का पालन करेंगे।

## Step 1: एक कुम्पोनेंट पदानुक्रम में UI को तोड़ो {/*step-1-break-the-ui-into-a-component-hierarchy*/}

मॉकअप में प्रत्येक कौम्पोनॅन्ट और सबकौम्पोनॅन्ट के चारों ओर बॉक्स बनाकर शुरू करें और उनका नामकरण करें।
यदि आप किसी डिज़ाइनर के साथ काम करते हैं, तो हो सकता है कि उन्होंने अपने डिज़ाइन टूल में इन कॉम्पोनेन्टस का नाम पहले ही रख लिया हो। उनके साथ चेक करलें!

आपकी बैकग्राउंड के आधार पर, आप किसी डिज़ाइन को विभिन्न तरीकों से कॉम्पोनेन्टस में बांटने करने के बारे में सोच सकते हैं:

* **Programming**--यदि आपको एक नया फ़ंक्शन या ऑब्जेक्ट बनाना चाहिए तो निर्णय लेने के लिए एक ही तकनीक का उपयोग करें। ऐसी तकनीक है [एकल जिम्मेदारी सिद्धांत](https://en.wikipedia.org/wiki/Single_responsibility_principle), यही है, एक कुम्पोनान्ट आदर्श रूप से केवल एक चीज करनी चाहिए। यदि यह बढ़ रहा है, तो इसे छोटे उप घटकों में विघटित किया जाना चाहिए।

* **CSS**--विचार करें कि आप किसके लिए क्लास चयनकर्ताओं को बनाते हैं. (हालांकि, कुम्पोनान्ट एस थोड़ा कम बारीक हैं।)
* **Design**--विचार करें कि आप डिज़ाइन परतों को कैसे व्यवस्थित करेंगे।

अगर आपका JSON अच्छी तरह से संरचित है, तो आप अक्सर पाएंगे कि यह स्वाभाविक रूप से आपके UI के कंपोनेंट स्ट्रक्चर के लिए मैप करता है। ऐसा इसलिए है क्योंकि UI और डेटा मॉडल में अक्सर एक ही सूचना वास्तुकला होती है - यानी, एक ही आकार है। अपने UI को घटकों में विभाजित करें, जहां प्रत्येक घटक आपके डेटा मॉडल के एक भाग से मेल खाता हो।

इस स्क्रीन पर पांच कुम्पोनेंट एस हैं:

<FullWidth>

<CodeDiagram flip>

<img src="/images/docs/s_thinking-in-react_ui_outline.png" width="500" style={{margin: '0 auto'}} />

1. `FilterableProductTable` (grey) संपूर्ण ऐप शामिल है.
2. `SearchBar` (blue) उपयोगकर्ता इनपुट प्राप्त करता है.
3. `ProductTable` (lavender) उपयोगकर्ता इनपुट के अनुसार सूची को प्रदर्शित और फ़िल्टर करता है.
4. `ProductCategoryRow` (green) प्रत्येक श्रेणी के लिए एक शीर्षक प्रदर्शित करता है.
5. `ProductRow`	(yellow) प्रत्येक उत्पाद के लिए एक पंक्ति प्रदर्शित करता है.

</CodeDiagram>

</FullWidth>

यदि आप `productable` (लैवेंडर) को देखते हैं, तो आप देखेंगे कि तालिका शीर्षलेख (जिसमें" नाम "और" मूल्य "लेबल शामिल हैं) इसका अपना कुम्पोनान्ट नहीं है। यह वरीयता का मामला है, और आप किसी भी तरह से जा सकते हैं। इस उदाहरण के लिए, यह `productable` का एक हिस्सा है क्योंकि यह` productable` सूची के अंदर दिखाई देता है। हालांकि, अगर यह शीर्षलेख जटिल हो जाता है (उदाहरण के लिए, यदि आप छंटाई जोड़ते हैं), तो इसे अपने स्वयं के 'productableder` कौम्पोनॅन्ट करने के लिए समझ में आएगा।

अब जब आपने मॉकअप में कुम्पोनान्ट की पहचान की है, तो उन्हें पदानुक्रम में व्यवस्थित करें। कुम्पोनानेंट जो मॉकअप में एक और कुम्पोनान्ट के भीतर दिखाई देता है पदानुक्रम में एक बच्चे के रूप में प्रकट होना चाहिए:

* `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
        * `ProductCategoryRow`
        * `ProductRow`

## Step 2: Build a static version in React {/*step-2-build-a-static-version-in-react*/}

अब जब आपके पास आपका कुम्पोनान्ट पदानुक्रम है, तो अब आपके एप्प को लागू करने का समय है। सबसे सरल दृष्टिकोण एक संस्करण बनाना है जो किसी भी अंतःक्रियाशीलता को जोड़ने के बिना अपने डेटा मॉडल से UI प्रस्तुत करता है ... अभी तक! स्थिर संस्करण को पहले बनाना अक्सर आसान होता है और फिर अलग-अलग इंटरएक्टिविटी जोड़ते हैं। एक स्थिर संस्करण का निर्माण करने के लिए बहुत सारे टाइपिंग और कोई सोच की आवश्यकता होती है, लेकिन अंतःक्रियाशीलता को जोड़ने में बहुत सी सोचने की आवश्यकता होती है और बहुत सारी टाइपिंग की आवश्यकता होती है।

अपने डेटा मॉडल का प्रतिनिधित्व करने वाले अपने ऐप का एक स्थिर संस्करण बनाने के लिए, आप निर्माण करना चाहेंगे[कौम्पोनॅन्ट](/learn/your-first-component) जो अन्य घटकों का पुन: उपयोग करते हैं और [प्रॉप्स](/learn/passing-props-to-a-component) का उपयोग करके डेटा पास करते हैं . प्रोप माता-पिता से बच्चे से डेटा पारित करने का एक तरीका है। (यदि आप [राज्य](/learn/state-a-component-memory) की अवधारणा से परिचित हैं, इस स्थिर संस्करण को बनाने के लिए राज्य का उपयोग न करें. राज्य केवल अंतःक्रियाशीलता के लिए आरक्षित है, यानी, डेटा जो समय के साथ बदलता है। चूंकि यह ऐप का एक स्थिर संस्करण है, इसलिए आपको इसकी आवश्यकता नहीं है।)

आप या तो पदानुक्रम में घटक के निर्माण के साथ "ऊपर नीचे" बना सकते हैं (like `FilterableProductTable`) या कम डाउन डाउन से काम करके "नीचे"(like `ProductRow`). सरल उदाहरणों में, आमतौर पर ऊपर-नीचे जाना आसान होता है, और बड़ी परियोजनाओं पर, नीचे जाना आसान होता है।

<Sandpack>

```jsx App.js
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 10px;
}
td {
  padding: 2px;
  padding-right: 40px;
}
```

</Sandpack>

**Don't fret if this code example looks intimidating!** In this guide, we're focusing on concepts rather than code. Make sure to bookmark [Describing the UI](/learn/describing-the-ui) which will help you fill in the gaps and make sense of this code.

After building your कौम्पोनॅन्टs, you'll have a library of reusable कौम्पोनॅन्टs that render your data model. Because this is a static app, the कौम्पोनॅन्टs will only return JSX. The कौम्पोनॅन्ट at the top of the hierarchy (`FilterableProductTable`) will take your data model as a prop. This is called _one-way data flow_ because the data flows down from the top-level कौम्पोनॅन्ट to the ones at the bottom of the tree.

<Gotcha>

At this point, you should not be using any state values. That’s for the next step!

</Gotcha>

## Step 3: Find the minimal but complete representation of UI state {/*step-3-find-the-minimal-but-complete-representation-of-ui-state*/}

To make the UI interactive, you need to let users change your underlying data model. You will use *state* for this.

Think of state as the minimal set of changing data that your app needs to remember. The most important principle for structuring state is to keep it [DRY (Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)). Figure out the absolute minimal representation of the state your application needs and compute everything else on-demand. For example, if you're building a shopping list, you can store the items as an array in state. If you want to also display the number of items in the list, don't store the number of items as another state value--instead, read the length of your array.

Now think of all of the pieces of data in this example application:

1. The original list of products
2. The search text the user has entered
3. The value of the checkbox
4. The filtered list of products

Which of these are state? Identify the ones that are not:

* Does it **remain unchanged** over time? If so, it isn't state.
* Is it **passed in from a parent** via props? If so, it isn't state.
* **Can you compute it** based on existing state or props in your कौम्पोनॅन्ट? If so, it *definitely* isn't state!

What's left is probably state.

Let's go through them one by one again:

1. The original list of products is **passed in as props, so it's not state**. 
2. The search text seems to be state since it changes over time and can't be computed from anything.
3. The value of the checkbox seems to be state since it changes over time and can't be computed from anything.
4. The filtered list of products **isn't state because it can be computed** by taking the original list of products and filtering it according to the search text and value of the checkbox.

This means only the search text and the value of the checkbox are state! Nicely done!

<DeepDive title="Props vs State">

There are two types of "model" data in React: props and state. The two are very different:

* [**Props** are like arguments you pass](/learn/passing-props-to-a-कौम्पोनॅन्ट) to a function. They let a parent कौम्पोनॅन्ट pass data to a child कौम्पोनॅन्ट and customize its appearance. For example, a `Form` can pass a `color` prop to a `Button`.
* [**State** is like a कौम्पोनॅन्ट’s memory.](/learn/state-a-कौम्पोनॅन्टs-memory) It lets a कौम्पोनॅन्ट keep track of some information and change it in response to interactions. For example, a `Button` might keep track of `isHovered` state.

Props and state are different, but they work together. A parent कौम्पोनॅन्ट will often keep some information in state (so that it can change it), and *pass it down* to child कौम्पोनॅन्टs as their props. It's okay if the difference still feels fuzzy on the first read. It takes a bit of practice for it to really stick!

</DeepDive>

## Step 4: Identify where your state should live {/*step-4-identify-where-your-state-should-live*/}

After identifying your app’s minimal state data, you need to identify which कौम्पोनॅन्ट is responsible for changing this state, or *owns* the state. Remember: React uses one-way data flow, passing data down the कौम्पोनॅन्ट hierarchy from parent to child कौम्पोनॅन्ट. It may not be immediately clear which कौम्पोनॅन्ट should own what state. This can be challenging if you’re new to this concept, but you can figure it out by following these steps!

For each piece of state in your application:

1. Identify *every* कौम्पोनॅन्ट that renders something based on that state.
2. Find their closest common parent कौम्पोनॅन्ट--a कौम्पोनॅन्ट above them all in the hierarchy.
3. Decide where the state should live:
    1. Often, you can put the state directly into their common parent.
    2. You can also put the state into some कौम्पोनॅन्ट above their common parent.
    3. If you can't find a कौम्पोनॅन्ट where it makes sense to own the state, create a new कौम्पोनॅन्ट solely for holding the state and add it somewhere in the hierarchy above the common parent कौम्पोनॅन्ट.

In the previous step, you found two pieces of state in this application: the search input text, and the value of the checkbox. In this example, they always appear together, so it is easier to think of them as a single piece of state.

Now let's run through our strategy for this state:

1. **Identify कौम्पोनॅन्टs that use state:**
    * `ProductTable` needs to filter the product list based on that state (search text and checkbox value). 
    * `SearchBar` needs to display that state (search text and checkbox value).
1. **Find their common parent:** The first parent कौम्पोनॅन्ट both कौम्पोनॅन्टs share is `FilterableProductTable`.
2. **Decide where the state lives**: We'll keep the filter text and checked state values in `FilterableProductTable`.

So the state values will live in `FilterableProductTable`. 

Add state to the कौम्पोनॅन्ट with the [`useState()` Hook](/reference/usestate). Hooks let you "hook into" a कौम्पोनॅन्ट's [render cycle](/learn/render-and-commit). Add two state variables at the top of `FilterableProductTable` and specify the initial state of your application:

```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);  
```

Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as props:

```js
<div>
  <SearchBar 
    filterText={filterText} 
    inStockOnly={inStockOnly} />
  <ProductTable 
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```

You can start seeing how your application will behave. Edit the `filterText` initial value from `useState('')` to `useState('fruit')` in the sandbox code below. You'll see both the search input text and the table update:

<Sandpack>

```jsx App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 5px;
}
td {
  padding: 2px;
}
```

</Sandpack>

In the sandbox above, `ProductTable` and `SearchBar` read the `filterText` and `inStockOnly` props to render the table, the input, and the checkbox. For example, here is how `SearchBar` populates the input value:

```js {1,6}
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
```


Refer to the [Managing State](/learn/managing-state) to dive deeper into how React uses state and how you can organize your app with it.

## Step 5: Add inverse data flow {/*step-5-add-inverse-data-flow*/}

Currently your app renders correctly with props and state flowing down the hierarchy. But to change the state according to user input, you will need to support data flowing the other way: the form कौम्पोनॅन्टs deep in the hierarchy need to update the state in `FilterableProductTable`. 

React makes this data flow explicit, but it requires a little more typing than two-way data binding. If you try to type or check the box in the example above, you'll see that React ignores your input. This is intentional. By writing `<input value={filterText} />`, you've set the `value` prop of the `input` to always be equal to the `filterText` state passed in from `FilterableProductTable`. Since `filterText` state is never set, the input never changes.

You want to make it so whenever the user changes the form inputs, the state updates to reflect those changes. The state is owned by `FilterableProductTable`, so only it can call `setFilterText` and `setInStockOnly`. To let `SearchBar` update the `FilterableProductTable`'s state, you need to pass these functions down to `SearchBar`:

```js {2,3,10,11}
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

Inside the `SearchBar`, you will add the `onChange` event handlers and set the parent state from them:

```js {5}
<input 
  type="text" 
  value={filterText} 
  placeholder="Search..." 
  onChange={(e) => onFilterTextChange(e.target.value)} />
```

Now the application fully works!

<Sandpack>

```jsx App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding: 4px;
}
td {
  padding: 2px;
}
```

</Sandpack>

You can learn all about handling events and updating state in the [Adding Interactivity](/learn/adding-interactivity) section.

## Where to go from here {/*where-to-go-from-here*/}

This was a very brief introduction to how to think about building कौम्पोनॅन्टs and applications with React. You can [start a React project](/learn/installation) right now or [dive deeper on all the syntax](/learn/describing-the-ui) used in this ट्यूटोरियल.
