---
title: एक नया React प्रोजेक्ट शुरू करें
---

<Intro>

यदि आप React सीख रहे हैं या इसे किसी मौजूदा प्रोजेक्ट में इस्तेमाल करने पर विचार कर रहे हैं, तो आप [स्क्रिप्ट टैग को किसी भी HTML पेज पर React इस्तेमाल करके](/learn/add-react-to-a-website) शुरू कर सकते हैं। यदि आपके प्रोजेक्ट को कई कौम्पोनॅन्ट और कई फाइलों की आवश्यकता होगी, तो यह नीचे दिए गए औपशंस पर विचार करने का समय हो सकता है!

</Intro>

## अपना खुद का रोमांच चुनें {/*choose-your-own-adventure*/}

React एक library है जो आपको UI कोड को कौम्पोनॅन्ट नामक टुकड़ों में तोड़कर व्यवस्थित करने देता है। React राउटिंग या डेटा मैनेजमेंट का ध्यान नहीं रखता है। इसका मतलब है कि एक नया React प्रोजेक्ट शुरू करने के कई तरीके हैं:

* [एक **HTML फ़ाइल और एक स्क्रिप्ट टैग** से प्रारंभ करें।](/learn/add-react-to-a-website) इसके लिए Node.js सेटअप की आवश्यकता नहीं है, लेकिन यह सीमित फीचर्स देता है।
* एक **कम से कम टूलचेन** के साथ शुरू करें, करते करते और फीचर्स ऐड करें।  (सीखने के लिए बढ़िया!)
* एक **ओपीनियेटेड फ्रेमवर्क** से शुरू करें जिसमें डेटा फेच करना और बिल्ट इन राउटिंग जैसी सामान्य फीचर्स हों।

## कम से कम टूलचेन के साथ शुरुआत करना {/*getting-started-with-a-minimal-toolchain*/}

यदि आप **React सीख रहे हैं,** तो हम रेकमेंड करते हैं [Create React App](https://create-react-app.dev/)। यह React को आज़माने और एक नया सिंगल-पेज, क्लाइंट-साइड एप्लिकेशन बनाने का सबसे लोकप्रिय तरीका है। यह React के लिए बनाया गया है, लेकिन राउटिंग या डेटा लाने के बारे में नहीं सोचा गया है।

सबसे पहले, [Node.js] (https://nodejs.org/en/) इंस्टॉल करें। फिर अपना टर्मिनल खोलें और प्रोजेक्ट बनाने के लिए इस लाइन को रन करें:

<TerminalBlock>

npx create-react-app my-app

</TerminalBlock>

अब आप अपना एप्प इसके साथ चला सकते हैं:

<TerminalBlock>

cd my-app
npm start

</TerminalBlock>

अधिक जानकारी के लिए, [ओफीशिअल गाइड देखें](https://create-react-app.dev/docs/getting-started)।

> Create React App doesn't handle backend logic or databases. You can use it with any backend. जब आप कोई प्रोजेक्ट बनाते हैं, तो आपको स्टैटिक HTML, CSS और JS के साथ एक फ़ोल्डर मिलेगा। Because Create React App can't take advantage of the server, it doesn't provide the best performance. If you're looking for faster loading times and built-in features like routing and server-side logic, we recommend using a framework instead.

### पॉपुलर अल्टरनेटिव्ज {/*popular-alternatives*/}

* [Vite](https://vitejs.dev/guide/)
* [Parcel](https://parceljs.org/)

## पूर्ण विशेषताओं वाले फ्रेमवर्क के साथ बनाना {/*building-with-a-full-featured-framework*/}

अगर आप **प्रोडक्शन के लिए तैयार प्रोजेक्ट शुरू करना चाहते हैं,** तो [Next.js](https://nextjs.org/) शुरू करने के लिए एक बेहतरीन जगह है। Next.js React के साथ बना हुआ स्टैटिक और सर्वर-रेंडर ऍप्लिकेशन्स के लिए एक लोकप्रिय, हल्का फ्रेमवर्क है। यह राउटिंग, स्टाइलिंग और सर्वर-साइड रेंडरिंग जैसे फीचर्स के साथ प्री-पैकेज्ड आता है, जिससे आप प्रोजेक्ट को जल्दी से तैयार करकर शुरू कर सकते हैं।

[Next.js फ़ाउंडेशन](https://nextjs.org/learn/foundations/about-nextjs) ट्यूटोरियल React और Next.js के साथ बनाने के लिए एक बेहतरीन परिचय है।

### पॉपुलर अल्टरनेटिव्ज {/*popular-alternatives*/}

* [Gatsby](https://www.gatsbyjs.org/)
* [Remix](https://remix.run/)
* [Razzle](https://razzlejs.org/)

## कस्टम टूलचेन {/*custom-toolchains*/}

आप अपनी खुद की टूलचेन बनाना और कॉन्फ़िगर करना पसंद कर सकते हैं। एक टूलचेन में आमतौर पर निम्न शामिल होते हैं:

* एक **package manager**—आपको थर्ड-पार्टी पैकेज इनस्टॉल, अपडेटेड एंड मैनेज करने देता है। पॉपुलर पैकेज मैनेजर्स: [npm](https://www.npmjs.com/) (built into Node.js), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/)।  
* एक **compiler** आपको मॉडर्न लैंग्वेजेज फीचर्स और JSX जैसे एडिशनल सिंटैक्स या ब्राउज़र के लिए एनोटेशन टाइप को कम्पाइल करने देता है। पॉपुलर कपिलर्स: [Babel](https://babeljs.io/), [TypeScript](http://typescript.org/), [swc](https://swc.rs/)।
* एक **bundler** आपको मॉड्यूलर कोड लिखने और लोड टाइम को ऑप्टिमाइज़ करने के लिए इसे छोटे पैकेजों में एक साथ बंडल करने देता है। पॉपुलर बंडलर्स: [webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), [esbuild](https://esbuild.github.io/), [swc](https://swc.rs/)।* A **minifier** makes your code more compact so that it loads faster. Popular minifiers: [Terser](https://terser.org/), [swc](https://swc.rs/).
* एक **server** सर्वर रिक्वेस्ट्स को संभालता है ताकि आप HTML में कौम्पोनॅन्टस को प्रस्तुत कर सकें। पॉपुलर सर्वरस: [Express](https://expressjs.com/)।* A **linter** checks your code for common mistakes. Popular linters: [ESLint](https://eslint.org/).
* एक **test runner** आपको अपने कोड के अगेंस्ट टेस्टस चलाने देता है। पॉपुलर टेस्ट रनर: [Jest](https://jestjs.io/)।

अगर आप शुरू से ही अपनी खुद की JavaScript टूलचैन सेटअप करना पसंद करते हैं, तो [इस गाइड को देखें](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) जो Create React App की कुछ एप्प फंक्शनलिटी को फिर से बनाता है। एक फ्रेमवर्क आमतौर पर एक राउटिंग और डेटा फेच करने का समाधान भी देता है। एक बड़े प्रोजेक्ट में, आप [Nx](https://nx.dev/react) जैसे टूल के साथ एक ही रिपॉजिटरी में कई पैकेज मैनेज करना चाह सकते हैं।