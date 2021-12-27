---
title: एक नया React प्रोजेक्ट शुरू करें
---

<Intro>

यदि आप React सीख रहे हैं या इसे किसी मौजूदा प्रोजेक्ट में जोड़ने पर विचार कर रहे हैं, तो आप [स्क्रिप्ट टैग वाले किसी भी HTML पेज पर रिएक्ट जोड़कर जल्दी से शुरू कर सकते हैं](/learn/add-react-to-a-website)। यदि आपकी परियोजना को कई घटकों और कई फाइलों की आवश्यकता होगी, तो यह नीचे दिए गए विकल्पों पर विचार करने का समय हो सकता है!

</Intro>

## अपना खुद का रोमांच चुनें {/_choose-your-own-adventure_/} {/*अपना-खुद-का-रोमांच-चुनें-choose-your-own-adventure*/}

React एक लाइब्रेरी है जो आपको यूआई कोड को घटकों नामक टुकड़ों में तोड़कर व्यवस्थित करने देता है। React रूटिंग या डेटा प्रबंधन का ध्यान नहीं रखता है। इन सुविधाओं के लिए, आप तृतीय-पक्ष लाइब्रेरी का उपयोग करना चाहेंगे या अपने स्वयं के समाधान लिखना चाहेंगे। इसका मतलब है कि एक नया React प्रोजेक्ट शुरू करने के कई तरीके हैं:

- Start with a **minimal set up with just a toolchain,** adding features to your project as necessary.
- Start with an **opinionated framework** with common functionality already built in.

Whether you're just getting started, looking to build something big, or want to set up your own toolchain, this guide will set you on the right path.

## Getting started with a React toolchain {/_getting-started-with-a-react-toolchain_/} {/*getting-started-with-a-react-toolchain-getting-started-with-a-react-toolchain*/}

If you're just getting started with React, we recommend [Create React App](https://create-react-app.dev/), the most popular way to try out React's features and a great way to build a new single-page, client-side application. Create React App is an unopinionated toolchain configured just for React. Toolchains help with things like:

- Scaling to many files and components
- Using third-party libraries from npm
- Detecting common mistakes early
- Live-editing CSS and JS in development
- Optimizing the output for production

You can get started building with Create React App with one line of code in your terminal! (**Be sure you have [Node.js](https://nodejs.org/) installed!**)

<TerminalBlock>

npx create-react-app my-app

</TerminalBlock>

Now you can run your app with:

<TerminalBlock>

cd my-app
npm start

</TerminalBlock>

For more information, [check out the official guide](https://create-react-app.dev/docs/getting-started).

> Create React App doesn't handle backend logic or databases; it just creates a frontend build pipeline. This means you can use it with any backend you want. But if you're looking for more features like routing and server-side logic, read on!

### Other options {/_other-options_/} {/*other-options-other-options*/}

Create React App is great to get started working with React, but if you'd like an even lighter toolchain, you might try one of these other popular toolchains:

- [Vite](https://vitejs.dev/guide/)
- [Parcel](https://parceljs.org/)
- [Snowpack](https://www.snowpack.dev/tutorials/react)

## Building with React and a framework {/_building-with-react-and-a-framework_/} {/*building-with-react-and-a-framework-building-with-react-and-a-framework*/}

If you're looking to start a bigger, production-ready project, [Next.js](https://nextjs.org/) is a great place to start. Next.js is a popular, lightweight framework for static and server‑rendered applications built with React. It comes pre-packaged with features like routing, styling, and server-side rendering, getting your project up and running quickly.

[Get started building with Next.js](https://nextjs.org/docs/getting-started) with the official guide.

### Other options {/_other-options-1_/} {/*other-options-other-options-1*/}

- [Gatsby](https://www.gatsbyjs.org/) lets you generate static websites with React with GraphQL.
- [Razzle](https://razzlejs.org/) is a server-rendering framework that doesn't require any configuration, but offers more flexibility than Next.js.

## Custom toolchains {/_custom-toolchains_/} {/*custom-toolchains-custom-toolchains*/}

You may prefer to create and configure your own toolchain. A JavaScript build toolchain typically consists of:

- A **package manager**—lets you install, updated and manage third-party packages. [Yarn](https://yarnpkg.com/) and [npm](https://www.npmjs.com/) are two popular package managers.
- A **bundler**—lets you write modular code and bundle it together into small packages to optimize load time. [Webpack](https://webpack.js.org/), [Snowpack](https://www.snowpack.dev/), [Parcel](https://parceljs.org/) are several popular bundlers.
- A **compiler**—lets you write modern JavaScript code that still works in older browsers. [Babel](https://babeljs.io/) is one such example.

In a larger project, you might also want to have a tool to manage multiple packages in a single repository. [Nx](https://nx.dev/react) is an example of such a tool.

If you prefer to set up your own JavaScript toolchain from scratch, [check out this guide](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) that re-creates some of the Create React App functionality.
