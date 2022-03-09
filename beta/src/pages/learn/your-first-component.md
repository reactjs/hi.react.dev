---
title: आपका पहला कौम्पोनॅन्ट
---

<Intro>

कौम्पोनॅन्ट React की मुख्य अवधारणाओं में से एक हैं। वे नींव हैं जिस पर आप यूजर इंटरफेस (UI) का निर्माण करते हैं, जो उन्हें आपकी React यात्रा शुरू करने के लिए एक आदर्श स्थान बनाता है!

</Intro>

<YouWillLearn>

- एक कौम्पोनॅन्ट क्या है
- React एप्लिकेशन में कौम्पोनॅन्ट क्या भूमिका निभाते हैं
- अपना पहला React कौम्पोनॅन्ट कैसे लिखें

</YouWillLearn>

## कौम्पोनॅन्ट: UI बिल्डिंग ब्लॉक्स {/* components-ui-building-blocks */}

Web पर, HTML हमें `<h1>` और `<li>` जैसे टैग के अंतर्निहित सेट के साथ समृद्ध संरचित दस्तावेज़ बनाने देता है:

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

यह मार्कअप इस लेख `<article>`, इसके शीर्षक `<h1>`, और एक (संक्षिप्त) सामग्री तालिका को एक क्रमबद्ध सूची `<ol>` के रूप में दर्शाता है। इस तरह का मार्कअप, स्टाइल के लिए CSS के साथ संयुक्त, और जावास्क्रिप्ट अन्तरक्रियाशीलता के लिए, प्रत्येक साइडबार, अवतार, मोडल, ड्रॉपडाउन के पीछे निहित है — UI का हर टुकड़ा जो आप Web पर देखते हैं।

React आपको अपने मार्कअप, CSS और जावास्क्रिप्ट को कस्टम "कौम्पोनॅन्ट," **आपके एप्प के लिए पुन: प्रयोज्य `UI` तत्वों में संयोजित करने देता है। ** ऊपर देखी गई सामग्री कोड की तालिका को `<TableOfContents />` कौम्पोनॅन्ट में बदल दिया जा सकता है आप हर पेज पर रेंडर कर सकते हैं। हुड के तहत, यह अभी भी उसी HTML टैग का उपयोग करता है जैसे `<article>`, `<h1>`, आदि।

HTML टैग्स की तरह ही, आप संपूर्ण पेज को डिज़ाइन करने के लिए कौम्पोनॅन्ट को कंपोज़, ऑर्डर और नेस्ट कर सकते हैं। उदाहरण के लिए, आप जिस दस्तावेज़ पेज को पढ़ रहे हैं वह React कौम्पोनॅन्ट से बना है:

```js
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

जैसे-जैसे आपकी परियोजना बढ़ती है, आप देखेंगे कि आपके कई डिज़ाइन आपके द्वारा पहले से लिखे गए कौम्पोनॅन्ट का पुन: उपयोग करके, आपके विकास को गति देकर बनाए जा सकते हैं। ऊपर दी गई हमारी सामग्री तालिका `<TableOfContents />` के साथ किसी भी स्क्रीन पर जोड़ी जा सकती है! आप React ओपन सोर्स समुदाय जैसे [Chakra UI](https://chakra-ui.com/) और [Material UI](https://material-ui.com/) द्वारा साझा किए गए हजारों कौम्पोनॅन्ट के साथ अपनी परियोजना को शुरू भी कर सकते हैं।

## Defining a component {/* defining-a-component */}

Traditionally when creating web pages, web developers marked up their content and then added interaction by sprinkling on some JavaScript. This worked great when interaction was a nice-to-have on the web. Now it is expected for many sites and all apps. React puts interactivity first while still using the same technology: **a React component is a JavaScript function that you can _sprinkle with markup_**. Here's what that looks like (you can edit the example below):

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}
```

```css
img {
  height: 200px;
}
```

</Sandpack>

And here's how to build a component:

### Step 1: Export the component {/* step-1-export-the-component */}

The `export default` prefix is a [standard JavaScript syntax](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (not specific to React). It lets you mark the main function in a file so that you can later import it from other files. (More on importing in [Importing and Exporting Components](/learn/importing-and-exporting-components)!)

### Step 2: Define the function {/* step-2-define-the-function */}

With `function Profile() { }` you define a JavaScript function with the name `Profile`.

<Gotcha>

React components are regular JavaScript functions, but **their names must start with a capital letter** or they won't work!

</Gotcha>

### Step 3: Add markup {/* step-3-add-markup */}

The component returns an `<img />` tag with `src` and `alt` attributes. `<img />` is written like HTML, but it is actually JavaScript under the hood! This syntax is called [JSX](/learn/writing-markup-with-jsx), and it lets you embed markup inside JavaScript.

Return statements can be written all on one line, as in this component:

```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

But if your markup isn't all on the same line as the `return` keyword, you must wrap it in a pair of parentheses like this:

```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<Gotcha>

Without parentheses, any code on the lines after `return` [will be ignored](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

</Gotcha>

## Using a component {/* using-a-component */}

Now that you've defined your `Profile` component, you can nest it inside other components. For example, you can export a `Gallery` component that uses multiple `Profile` components:

<Sandpack>

```js
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img {
  margin: 0 10px 10px 0;
  height: 90px;
}
```

</Sandpack>

### What the browser sees {/* what-the-browser-sees */}

Notice the difference in casing:

- `<section>` is lowercase, so React knows we refer to an HTML tag.
- `<Profile />` starts with a capital `P`, so React knows that we want to use our component called `Profile`.

And `Profile` contains even more HTML: `<img />`. In the end, this is what the browser sees:

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### Nesting and organizing components {/* nesting-and-organizing-components */}

Components are regular JavaScript functions, so you can keep multiple components in the same file. This is convenient when components are relatively small or tightly related to each other. If this file gets crowded, you can always move `Profile` to a separate file. You will learn how to do this shortly on the [page about imports](/learn/importing-and-exporting-components).

Because the `Profile` components are rendered inside `Gallery`—even several times!—we can say that `Gallery` is a **parent component,** rendering each `Profile` as a "child". This is part of the magic of React: you can define a component once, and then use it in as many places and as many times as you like.

<DeepDive title="Components All the Way Down">

Your React application begins at a "root" component. Usually, it is created automatically when you start a new project. For example, if you use [CodeSandbox](https://codesandbox.io/) or [Create React App](https://create-react-app.dev/), the root component is defined in `src/App.js`. If you use the framework [Next.js](https://nextjs.org/), the root component is defined in `pages/index.js`. In these examples, you've been exporting root components.

Most React apps use components all the way down. This means that you won't only use components for reusable pieces like buttons, but also for larger pieces like sidebars, lists, and ultimately, complete pages! Components are a handy way to organize UI code and markup, even if some of them are only used once.

Frameworks like Next.js take this a step further. Instead of using an empty HTML file and letting React "take over" managing the page with JavaScript, they _also_ generate the HTML automatically from your React components. This allows your app to show some content before the JavaScript code loads.

Still, many websites only use React to [add "sprinkles of interactivity"](/learn/add-react-to-a-website). They have many root components instead of a single one for the entire page. You can use as much—or as little—React as you need.

</DeepDive>

<Recap>

You've just gotten your first taste of React! Let's recap some key points.

- React lets you create components, **reusable UI elements for your app.**
- In a React app, every piece of UI is a component.
- React components are regular JavaScript functions except:

  1. Their names always begin with a capital letter.
  2. They return JSX markup.

</Recap>

<Challenges>

### Export the component {/* export-the-component */}

This sandbox doesn't work because the root component is not exported:

<Sandpack>

```js
function Profile() {
  return <img src="https://i.imgur.com/lICfvbD.jpg" alt="Aklilu Lemma" />;
}
```

```css
img {
  height: 181px;
}
```

</Sandpack>

Try to fix it yourself before looking at the solution!

<Solution>

Add `export default` before the function definition like so:

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/lICfvbD.jpg" alt="Aklilu Lemma" />;
}
```

```css
img {
  height: 181px;
}
```

</Sandpack>

You might be wondering why writing `export` alone is not enough to fix this example. You can learn the difference between `export` and `export default` in [Importing and Exporting Components](/learn/importing-and-exporting-components).

</Solution>

### Fix the return statement {/* fix-the-return-statement */}

Something isn't right about this `return` statement. Can you fix it?

<Hint>

You may get an "Unexpected token" error while trying to fix this. In that case, check the that semicolon appears _after_ the closing parenthesis. Leaving a semicolon inside `return ( )` will cause an error.

</Hint>

<Sandpack>

```js
export default function Profile() {
  return;
  <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img {
  height: 180px;
}
```

</Sandpack>

<Solution>

You can fix this component by moving the return statement to one line like so:

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img {
  height: 180px;
}
```

</Sandpack>

Or by wrapping the returned JSX markup in parentheses that open right after `return`:

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img {
  height: 180px;
}
```

</Sandpack>

</Solution>

### Spot the mistake {/* spot-the-mistake */}

Something's wrong with how the `Profile` component is declared and used. Can you spot the mistake? (Try to remember how React distinguishes components from the regular HTML tags!)

<Sandpack>

```js
function profile() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <profile />
      <profile />
      <profile />
    </section>
  );
}
```

```css
img {
  margin: 0 10px 10px 0;
  height: 90px;
}
```

</Sandpack>

<Solution>

React component names must start with a capital letter.

Change `function profile()` to `function Profile()`, and then change every `<profile />` to `<Profile />`:

<Sandpack>

```js
function Profile() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img {
  margin: 0 10px 10px 0;
}
```

</Sandpack>

</Solution>

### Your own component {/* your-own-component */}

Write a component from scratch. You can give it any valid name and return any markup. If you're out of ideas, you can write a `Congratulations` component thats shows `<h1>Good job!</h1>`. Don't forget to export it!

<Sandpack>

```js
// Write your component below!
```

</Sandpack>

<Solution>

<Sandpack>

```js
export default function Congratulations() {
  return <h1>Good job!</h1>;
}
```

</Sandpack>

</Solution>

</Challenges>
