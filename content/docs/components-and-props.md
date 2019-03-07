---
id: components-and-props
title: Components and Props
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

कौम्पोनॅन्टस let you split the UI into independent, reusable pieces, and think about each piece in isolation. This page provides an introduction to the idea of कौम्पोनॅन्टस. You can find a [detailed कौम्पोनॅन्ट API reference here](/docs/react-component.html).

Conceptually, कौम्पोनॅन्टस are like जावास्क्रिप्ट functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.

## Function and Class कौम्पोनॅन्टस {#function-and-class-components}

The simplest way to define a कौम्पोनॅन्ट is to write a जावास्क्रिप्ट function:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

This function is a valid React कौम्पोनॅन्ट because it accepts a single "props" (which stands for properties) object argument with data and returns a React element. We call such कौम्पोनॅन्टस "function कौम्पोनॅन्टस" because they are literally जावास्क्रिप्ट functions.

You can also use an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) to define a कौम्पोनॅन्ट:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

The above two कौम्पोनॅन्टस are equivalent from React's point of view.

Classes have some additional features that we will discuss in the [next sections](/docs/state-and-lifecycle.html). Until then, we will use function कौम्पोनॅन्टस for their conciseness.

## Rendering a कौम्पोनॅन्ट {#rendering-a-component}

Previously, we only encountered React elements that represent DOM tags:

```js
const element = <div />;
```

However, elements can also represent user-defined कौम्पोनॅन्टस:

```js
const element = <Welcome name="Sara" />;
```

When React sees an element representing a user-defined कौम्पोनॅन्ट, it passes JSX attributes to this कौम्पोनॅन्ट as a single object. We call this object "props".

For example, this code रेंडरस "Hello, Sara" on the page:

```js{1,5}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

Let's recap what happens in this example:

1. We call `ReactDOM.render()` with the `<Welcome name="Sara" />` element.
2. React calls the `Welcome` कौम्पोनॅन्ट with `{name: 'Sara'}` as the props.
3. Our `Welcome` रेंडरस returns a `<h1>Hello, Sara</h1>` element as the result.
4. React DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`.

>**Note:** Always start रेंडरस names with a capital letter.
>
>React treats कौम्पोनॅन्टस starting with lowercase letters as DOM tags. For example, `<div />` represents an HTML div tag, but `<Welcome />` represents a रेंडरस and requires `Welcome` to be in scope.
>
>To learn more about the reasoning behind this convention, please read [JSX In Depth](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## Composing कौम्पोनॅन्टस {#composing-components}

कौम्पोनॅन्टस can refer to other कौम्पोनॅन्टस in their output. This lets us use the same रेंडरस abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as कौम्पोनॅन्टस.

For example, we can create an `App` रेंडरस that रेंडरस `Welcome` many times:

```js{8-10}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

Typically, new React apps have a single `App` रेंडरस at the very top. However, if you integrate React into an existing app, you might start bottom-up with a small रेंडरस like `Button` and gradually work your way to the top of the view hierarchy.

## Extracting कौम्पोनॅन्टस {#extracting-components}

Don't be afraid to split कौम्पोनॅन्टस into smaller कौम्पोनॅन्टस.

For example, consider this `Comment` रेंडरस:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components)

It accepts `author` (an object), `text` (a string), and `date` (a date) as props, and describes a comment on a social media website.

This रेंडरस can be tricky to change because of all the nesting, and it is also hard to reuse individual parts of it. Let's extract a few कौम्पोनॅन्टस from it.

First, we will extract `Avatar`:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

The `Avatar` doesn't need to know that it is being rendered inside a `Comment`. This is why we have given its prop a more generic name: `user` rather than `author`.

We recommend naming props from the रेंडरस's own point of view rather than the context in which it is being used.

We can now simplify `Comment` a tiny bit:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Next, we will extract a `UserInfo` रेंडरस that रेंडरस an `Avatar` next to the user's name:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

This lets us simplify `Comment` even further:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components-continued)

Extracting कौम्पोनॅन्टस might seem like grunt work at first, but having a palette of reusable कौम्पोनॅन्टस pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be a reusable कौम्पोनॅन्ट.

## Props are Read-Only {#props-are-read-only}

Whether you declare a कौम्पोनॅन्ट [as a function or a class](#function-and-class-components), it must never modify its own props. Consider this `sum` function:

```js
function sum(a, b) {
  return a + b;
}
```

Such functions are called ["pure"](https://en.wikipedia.org/wiki/Pure_function) because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React is pretty flexible but it has a single strict rule:

**All React कौम्पोनॅन्टस must act like pure functions with respect to their props.**

Of course, application UIs are dynamic and change over time. In the [next section](/docs/state-and-lifecycle.html), we will introduce a new concept of "state". State allows React कौम्पोनॅन्टस to change their output over time in response to user actions, network responses, and anything else, without violating this rule.
