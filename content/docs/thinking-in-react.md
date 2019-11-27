---
id: thinking-in-react
title: React में सोचना 
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

React is, in our opinion, the premier way to build big, fast Web apps with JavaScript. It has scaled very well for us at Facebook and Instagram.

React, हमारी राय में, एक मुख्य तरीका है, जावास्क्रिप्ट द्वारा, बड़ी और तेज़ वेब एप्प बनाने का। यह हमारे लिए फेसबुक और इंस्टाग्राम के लिए काफी अच्छे से बढ़ा।

One of the many great parts of React is how it makes you think about apps as you build them. In this document, we'll walk you through the thought process of building a searchable product data table using React.

कई में से एक मुख्य बात React की है कि कैसे यह आपको एप्प बनाते हुए उसके बारे में सोचने पर मजबूर करता है। इस आलेख में हम React से बने खोजनीय डाटा टेबल को बनाने की विचार प्रक्रिया पर ध्यान देंगे।


## Start With A Mock {#start-with-a-mock}

## मॉक से शुरुवात {#start-with-a-mock}

Imagine that we already have a JSON API and a mock from our designer. The mock looks like this:

कल्पना कीजिये की हमारे पास पहले से JSON API और मॉक उपलब्ध है। मॉक ऐसा कुछ दिखता है:

![Mockup](../images/blog/thinking-in-react-mock.png)

Our JSON API returns some data that looks like this:

हमारी JSON API कुछ ऐसा डाटा वापस भेजेगी:

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## Step 1: Break The UI Into A Component Hierarchy {#step-1-break-the-ui-into-a-component-hierarchy}

## स्टेप १ : UI को कौम्पोनॅन्ट पदक्रम में तोड़े {#step-1-break-the-ui-into-a-component-hierarchy}

The first thing you'll want to do is to draw boxes around every component (and subcomponent) in the mock and give them all names. If you're working with a designer, they may have already done this, so go talk to them! Their Photoshop layer names may end up being the names of your React components!

पहेली चीज़ जो आप करना चाहेंगे, वह होगी की अपने हर मॉक कौम्पोनॅन्ट (और उप कौम्पोनॅन्ट) के आस पास बक्से बना दे और सब को नाम दे दें। अगर आप डिज़ाइनर के साथ काम कर रहे है, तो उन्होंने यह काम पहले ही कर रखा होगा, उनसे बात कीजिये! उनकी फोटोशॉप परत के नाम, आपके react कौम्पोनॅन्ट के नाम हो सकते है।

But how do you know what should be its own component? Use the same techniques for deciding if you should create a new function or object. One such technique is the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.

परन्तु आप को कैसे पता चलेगा कि खुद का कौम्पोनॅन्ट क्या होना चाहिए? वो ही तकनीक का इस्तेमाल कीजिये जो आप एक नया ऑब्जेक्ट या फंक्शन बनाने के निर्णय के लिए लेते है। एक ऐसी तकनीक है  [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), अर्थात्, कौम्पोनॅन्ट को आदर्श रूप में एक ही चीज़ करना चाहिए। अगर वह बढ़ रहा है, तो उसे छोटे उप कौम्पोनॅन्ट में तोड़ देना चाहिए।

Since you're often displaying a JSON data model to a user, you'll find that if your model was built correctly, your UI (and therefore your component structure) will map nicely. That's because UI and data models tend to adhere to the same *information architecture*. Separate your UI into components, where each component matches one piece of your data model.

चुकी आप अक्सर उपभोक्ता को JSON डाटा मॉडल दिखते है, आप ये देखेंगे की यदि आपका मॉडल सही बना है, आपका UI (और इसलिए आपका कौम्पोनॅन्ट ढांचा) सही दिखेगा। यह इसलिए खूकि UI और डाटा मॉडल समान *इनफार्मेशन आर्किटेक्चर* इस्तेमाल करते है। अपने UI कौम्पोनॅन्ट को बाँट दीजिये, ताकि हर एक कौम्पोनॅन्ट डाटा मॉडल के एक टुकड़े मिल जाए।

![कौम्पोनॅन्ट आलेख](../images/blog/thinking-in-react-components.png)

You'll see here that we have five components in our app. We've italicized the data each component represents.

आप देखेंगे कि हमारे एप्प में ५ कौम्पोनॅन्ट है। हर कौम्पोनॅन्ट जो डाटा वर्णन करता है, उसे हमने तिर्थकित किया हुआ है।

  1. **`FilterableProductTable` (orange):** contains the entirety of the example
  2. **`SearchBar` (blue):** receives all *user input*
  3. **`ProductTable` (green):** displays and filters the *data collection* based on *user input*
  4. **`ProductCategoryRow` (turquoise):** displays a heading for each *category*
  5. **`ProductRow` (red):** displays a row for each *product*

  1. **`FilterableProductTable` (orange):** उदाहरण का सम्पूर्णता शामिल
  2. **`SearchBar` (blue):** प्राप्त हुआ  *उपभोक्ता इनपुट*
  3. **`ProductTable` (green):** *डाटा समूह* का प्रदर्शन और फ़िल्टर *उपभोक्ता इनपुट* पर आधारित 
  4. **`ProductCategoryRow` (turquoise):**  हर *श्रेणी* के शीर्षक का प्रदर्शन 
  5. **`ProductRow` (red):** हर *प्रोडक्ट* की पंक्ति का प्रदर्शन 

If you look at `ProductTable`, you'll see that the table header (containing the "Name" and "Price" labels) isn't its own component. This is a matter of preference, and there's an argument to be made either way. For this example, we left it as part of `ProductTable` because it is part of rendering the *data collection* which is `ProductTable`'s responsibility. However, if this header grows to be complex (e.g., if we were to add affordances for sorting), it would certainly make sense to make this its own `ProductTableHeader` component.

अगर आप `ProductTable` पर नज़र डालेंगे, तो आप देखेंगे कि टेबल हैडर ("Name" और "Price" नाम युक्त) अपना खुद का कौम्पोनॅन्ट नहीं है। यह पसंद पर निर्भर करता है और कैसे रखना है, यह चर्चा का विषय है। उदाहरण के तौर पर, हमने इसे `ProductTable` का ही भाग रखा है क्युकी यह *डाटा समूह* कि रेंडरिंग का भाग है, जो कि `ProductTable` की जिम्मेदारी है। मगर, यदि यह हैडर कठिन बनता जाता है (उदहारण के तौर पर, उसमे श्रेणीकरण की संभावना जोड़ना), तो उसका अपना खुद का कौम्पोनॅन्ट, `ProductTableHeader`, बनाना उचित होगा।

Now that we've identified the components in our mock, let's arrange them into a hierarchy. Components that appear within another component in the mock should appear as a child in the hierarchy:

अब जब हमे अपने मॉक कौम्पोनॅन्ट की पहचान हो गई है, उन्हें अब हम पदक्रम में जमाएंगे। मॉक में, जो कौम्पोनॅन्ट दूसरे कौम्पोनॅन्ट के भीतर दिखाई दे रहे है, उन्हें पदक्रम में उनके बच्चे की तरह दिखाना होगा:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## Step 2: Build A Static Version in React {#step-2-build-a-static-version-in-react}

## स्टेप २: React में स्थिर वर्शन बनाए {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">पेन को देखे<a href="https://codepen.io/gaearon/pen/BwWzwm">React में सोचना: स्टेप २</a><a href="https://codepen.io">कड़पेन</a>पर।</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Now that you have your component hierarchy, it's time to implement your app. The easiest way is to build a version that takes your data model and renders the UI but has no interactivity. It's best to decouple these processes because building a static version requires a lot of typing and no thinking, and adding interactivity requires a lot of thinking and not a lot of typing. We'll see why.

अब जब आपके पास कौम्पोनॅन्ट पदक्रम है, अब समय हो गया है की हम एप्प लागु करे। सबसे आसान तरीका होगा, जहा ऐसा वर्शन बनाए जो आपका डाटा मॉडल लेगा और UI रेंडर करेगा पर उसमे कोई अन्तरक्रियाशीलता नहीं होगी। इन प्रक्रिया को भाग करना श्रेष्ठ रहेगा क्युकी एक स्थिर वर्शन बनाने में लिखना ज्यादा होता है और सोचना कम, और अन्तरक्रियाशीलता जोड़ने में सोचना ज्यादा होता है, और लिखना कम। क्यों, वह हम देखेंगे।

To build a static version of your app that renders your data model, you'll want to build components that reuse other components and pass data using *props*. *props* are a way of passing data from parent to child. If you're familiar with the concept of *state*, **don't use state at all** to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don't need it.

अपनी एप्प का स्थिर वर्शन, जो आपका डाटा मॉडल रेंडर करेगा, वह बनाने के लिए आपको ऐसे कंपोनेंट्स बनाने होंगे जो दूसरे कौम्पोनॅन्ट को पुनः उपयोग करे, डाटा को *props* से दे। *props* मूल से बच्चे को डाटा देने का तरीका है। अगर आप *state* संकल्पना से परिचित है, तो यह स्थिर वर्शन बनाने के लिए *state बिलकुल भी उपयोग न करे*। state सिर्फ अन्तरक्रियाशीलता के लिए आरक्षित है, मतलब, डाटा जो समय के साथ बदलता है. चुकी ये एप्प का  स्थिर वर्शन है, आपको इसकी जरुरत नहीं।

You can build top-down or bottom-up. That is, you can either start with building the components higher up in the hierarchy (i.e. starting with `FilterableProductTable`) or with the ones lower in it (`ProductRow`). In simpler examples, it's usually easier to go top-down, and on larger projects, it's easier to go bottom-up and write tests as you build.

आप ऊपर-से-नीचे या नीचे-से-ऊपर बना सकते है. मतलब, या तो आप अपने कौम्पोनॅन्ट पदक्रम में ऊपर (अर्थात `FilterableProductTable` से शुरू) या सबसे नीचे (`ProductRow`) से शुरू कर सकते है। सरल उदाहरण में, बड़े प्रोजेक्ट में ऊपर-से-नीचे और टेस्ट लिखना नीचे-से-ऊपर करेंगे तो ज्यादा आसान होगा।

At the end of this step, you'll have a library of reusable components that render your data model. The components will only have `render()` methods since this is a static version of your app. The component at the top of the hierarchy (`FilterableProductTable`) will take your data model as a prop. If you make a change to your underlying data model and call `ReactDOM.render()` again, the UI will be updated. You can see how your UI is updated and where to make changes. React's **one-way data flow** (also called *one-way binding*) keeps everything modular and fast.

इस स्टेप के अंत तक, आपके पास एक लाइब्रेरी होगी पुनः-प्रयोज्य कंपोनेंट्स की जो डाटा मॉडल रेंडर कर सके। कौम्पोनॅन्ट में सिर्फ `render()` मेथड होगा, चुकी ये एप्प का स्थिर वर्शन है। पदक्रम में शीर्ष वाला  कौम्पोनॅन्ट  (`FilterableProductTable`) आपका डाटा मॉडल prop की तरह लेगा। यदि आप अपने मुख्य डाटा मॉडल बदलाव कर `ReactDOM.render()` फिर से कॉल करते है, आपका UI अपडेट हो जाएगा। आप देख सकते है की आपका UI कैसे अपडेट होता है और कहा बदलाव करना है। React **one-way data flow** का (जिसे *one-way binding* भी बुला सकते है) सब चीज़ो को मॉड्यूलर और तेज़ रखता है।

Refer to the [React docs](/docs/) if you need help executing this step.

[React docs](/docs/) को देखे अगर आपको इस स्टेप में कोई सहायता लगे।

### A Brief Interlude: Props vs State {#a-brief-interlude-props-vs-state}

### संक्षिप्त अन्तराल: Props की तुलना में State {#a-brief-interlude-props-vs-state}

There are two types of "model" data in React: props and state. It's important to understand the distinction between the two; skim [the official React docs](/docs/state-and-lifecycle.html) if you aren't sure what the difference is. See also [FAQ: What is the difference between state and props?](/docs/faq-state.html#what-is-the-difference-between-state-and-props)

React में दो प्रकार के डाटा "मॉडल" है: props और state। दोनों के अंतर को समझना महत्वपूर्ण है; पढ़िए  [React का शासकीय आलेख](/docs/state-and-lifecycle.html) यदि आपको डॉनो के अंतर के बारे में नहीं पता हो तो। देखिये [FAQ: state और props में क्या अंतर है?](/docs/faq-state.html#what-is-the-difference-between-state-and-props)

## Step 3: Identify The Minimal (but complete) Representation Of UI State {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

## स्टेप ३: UI state का न्यूनतम (परन्तु पूर्ण) प्रतिनिधित्व {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

To make your UI interactive, you need to be able to trigger changes to your underlying data model. React achieves this with **state**.

अपने UI को इंटरैक्टिव बनाने के लिए आपको अपने मुख्य डाटा मॉडल में बदलाव करवाने होंगे। React यह **state** के द्वारा हासिल करता है।

To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. The key here is [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you're building a TODO list, keep an array of the TODO items around; don't keep a separate state variable for the count. Instead, when you want to render the TODO count, take the length of the TODO items array.

अपनी एप्प सही बनाने के लिए, आपको पहले म्यूटेबल state के न्यूतम सेट के बारे में सोचना होगा जिसकी  आपकी एप्प को जरुरत होगी। इसका समाधान [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) है। अपने state के न्यूतम वर्णन के बारे में अंदाज़ा लगाइये जिसकी आपके एप्प को ज़रूरत है और बाकि चीज़ो का हिसाब उसकी मांग कर तय कीजिये। उदाहरण, अगर आप TODO लिस्ट बना रहे है, तो TODO लिस्ट के आइटम को आसपास रखिये; अलग state variable बनाने की आवश्यकता नहीं है। इसकी बजाए, जब आप TODO की संख्या को रेंडर करेंगे, तब TODO आइटम्स की लम्बाई को लें।

Think of all of the pieces of data in our example application. We have:

अपने उदाहरण एप्प के सभी डाटा के टुकड़ो के बारे में सोचिये। हमारे पास है: 

  * The original list of products
  * The search text the user has entered
  * The value of the checkbox
  * The filtered list of products

  * अपने प्रोडक्ट्स की असली लिस्ट 
  * उपभोक्ता ने जो सर्च टेक्स्ट डाला है 
  * चेकबॉक्स की वैल्यू
  * प्रोडक्ट्स की फ़िल्टर करी हुई लिस्ट 

Let's go through each one and figure out which one is state. Ask three questions about each piece of data:

हर एक को गौर से देखते है और समझते है इनमे से कोनसा state है। हर डाटा के टुकड़ो के बारे में ३ सवाल करें:

  1. Is it passed in from a parent via props? If so, it probably isn't state.
  2. Does it remain unchanged over time? If so, it probably isn't state.
  3. Can you compute it based on any other state or props in your component? If so, it isn't state.

  1. क्या यह मूल से props के द्वारा आया? अगर हा, तो यह state नहीं है।
  2. क्या यह वक्त के साथ बदलता नहीं है? अगर हा, तो यह state नहीं है।
  3. क्या आप अपने कौम्पोनॅन्ट के कोई भी दूसरे state या props के जरिये इसका हिसाब लगा सकते है? अगर हा, तो यह state नहीं है।

The original list of products is passed in as props, so that's not state. The search text and the checkbox seem to be state since they change over time and can't be computed from anything. And finally, the filtered list of products isn't state because it can be computed by combining the original list of products with the search text and value of the checkbox.

अपने प्रोडक्ट्स की असली लिस्ट props की तरह आ रही है, तो यह state नहीं है। सर्च टेक्स्ट और चेकबॉक्स state जैसे व्यतीत होते है क्युकी यह समय के साथ बदलते है एवं इसका हिसाब ओर कही से नहीं लगा सकते। आख़िरकार, प्रोडक्ट्स की फ़िल्टर करी हुई लिस्ट state नहीं है क्युकी इसका हिसाब प्रोडक्ट्स की असली लिस्ट और सर्च टेक्स्ट के साथ चेकबॉक्स की वैल्यू से लगा सकते है।

So finally, our state is:

आखिरकार हमारा state होगा:

  * The search text the user has entered
  * The value of the checkbox

  * उपभोक्ता ने जो सर्च टेक्स्ट डाला है 
  * चेकबॉक्स की वैल्यू

## Step 4: Identify Where Your State Should Live {#step-4-identify-where-your-state-should-live}

## स्टेप ४: जानिए आपके state का निवास {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">पेन को देखे <a href="https://codepen.io/gaearon/pen/qPrNQZ">React में सोचना: स्टेप ४</a> <a href="https://codepen.io">कड़पेन</a>पर।</p>

OK, so we've identified what the minimal set of app state is. Next, we need to identify which component mutates, or *owns*, this state.

Remember: React is all about one-way data flow down the component hierarchy. It may not be immediately clear which component should own what state. **This is often the most challenging part for newcomers to understand,** so follow these steps to figure it out:

For each piece of state in your application:

  * Identify every component that renders something based on that state.
  * Find a common owner component (a single component above all the components that need the state in the hierarchy).
  * Either the common owner or another component higher up in the hierarchy should own the state.
  * If you can't find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.

Let's run through this strategy for our application:

  * `ProductTable` needs to filter the product list based on state and `SearchBar` needs to display the search text and checked state.
  * The common owner component is `FilterableProductTable`.
  * It conceptually makes sense for the filter text and checked value to live in `FilterableProductTable`

Cool, so we've decided that our state lives in `FilterableProductTable`. First, add an instance property `this.state = {filterText: '', inStockOnly: false}` to `FilterableProductTable`'s `constructor` to reflect the initial state of your application. Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as a prop. Finally, use these props to filter the rows in `ProductTable` and set the values of the form fields in `SearchBar`.

You can start seeing how your application will behave: set `filterText` to `"ball"` and refresh your app. You'll see that the data table is updated correctly.

## Step 5: Add Inverse Data Flow {#step-5-add-inverse-data-flow}

## स्टेप ५: उल्टा डाटा बहाव जोड़ना {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">पेन को देखे <a href="https://codepen.io/gaearon/pen/LzWZvb">React में सोचना: स्टेप ५</a> <a href="https://codepen.io">कड़पेन</a>पर।</p>

So far, we've built an app that renders correctly as a function of props and state flowing down the hierarchy. Now it's time to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

React makes this data flow explicit to help you understand how your program works, but it does require a little more typing than traditional two-way data binding.

If you try to type or check the box in the current version of the example, you'll see that React ignores your input. This is intentional, as we've set the `value` prop of the `input` to always be equal to the `state` passed in from `FilterableProductTable`.

Let's think about what we want to happen. We want to make sure that whenever the user changes the form, we update the state to reflect the user input. Since components should only update their own state, `FilterableProductTable` will pass callbacks to `SearchBar` that will fire whenever the state should be updated. We can use the `onChange` event on the inputs to be notified of it. The callbacks passed by `FilterableProductTable` will call `setState()`, and the app will be updated.

## And That's It {#and-thats-it}

## और बस {#and-thats-it}

Hopefully, this gives you an idea of how to think about building components and applications with React. While it may be a little more typing than you're used to, remember that code is read far more than it's written, and it's less difficult to read this modular, explicit code. As you start to build large libraries of components, you'll appreciate this explicitness and modularity, and with code reuse, your lines of code will start to shrink. :)

उम्मीद है कि इससे आपकी कौम्पोनॅन्ट और react की एप्प बनाने कि सोच को योजना मिली होगी। जबकि इसमें लिखना ज्यादा है जितने की आपको आदत होगी, याद रखिये कि code को लिखने से ज्यादा पढ़ा जाता है, और ऐसे मॉड्यूलर और स्पष्ट code को पढ़ना कम कठिन होता है। जैसे जैसे आप कंपोनेंट्स की बढ़ी लाइब्रेरी बनानी शुरू करेंगे, आप इस स्पष्टता और मॉड्युलरिटी को सरहाने लगेंगे और code के पुनः उपयोग के चलते आपका code सिकुड़ता जाएगा। :)