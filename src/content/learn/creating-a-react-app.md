---
title: React App बनाने के तरीके
---

<Intro>

अगर आप नया ऐप या वेबसाइट React के साथ बनाना चाहते हैं, तो हम आपको एक फ्रेमवर्क के साथ शुरू करने की सलाह देते हैं।

</Intro>

## Recommended React Frameworks {/*bleeding-edge-react-frameworks*/}

ये recommended frameworks वो सभी फीचर्स सपोर्ट करते हैं जो आपके ऐप को प्रोडक्शन में डिप्लॉय और स्केल करने के लिए जरूरी होते हैं। ये React की आर्किटेक्चर का पूरा फायदा उठाते हैं और React के नए फीचर्स को इंटीग्रेट करते हैं।

<Note>

#### React frameworks को सर्वर की जरूरत नहीं होती। {/*react-frameworks-do-not-require-a-server*/}

इस पेज पर दिए गए सभी frameworks single-page apps बना सकते हैं। Single-page apps को आप [CDN](https://developer.mozilla.org/en-US/docs/Glossary/CDN) या static hosting service पर डिप्लॉय कर सकते हैं और इन्हें सर्वर की जरूरत नहीं होती। अगर आपको सर्वर साइड रेंडरिंग जैसे फीचर्स चाहिए, तो आप इंडिविजुअल रूट्स पर opt-in कर सकते हैं बिना अपने ऐप को दोबारा लिखे।

</Note>

### Next.js (App Router) {/*nextjs-app-router*/}

**[Next.js का App Router](https://nextjs.org/docs) एक React फ्रेमवर्क है जो React की आर्किटेक्चर का पूरा फायदा उठाता है और full-stack React apps बनाने में मदद करता है।**

<TerminalBlock>
npx create-next-app@latest
</TerminalBlock>

Next.js को [Vercel](https://vercel.com/) मेंटेन करता है। आप [Next.js ऐप](https://nextjs.org/docs/app/building-your-application/deploying) को किसी भी Node.js या serverless hosting पर या अपने सर्वर पर डिप्लॉय कर सकते हैं। Next.js [static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) भी सपोर्ट करता है, जो सर्वर की जरूरत नहीं होती। Vercel paid क्लाउड सर्विसेज भी प्रोवाइड करता है, जो opt-in होती हैं।

### React Router (v7) {/*react-router-v7*/}

**[React Router](https://reactrouter.com/start/framework/installation) React की सबसे पॉपुलर राउटिंग लाइब्रेरी है और Vite के साथ यूज़ करके full-stack React फ्रेमवर्क बनाया जा सकता है।** ये स्टैंडर्ड Web APIs पर फोकस करता है और कई [ready-to-deploy templates](https://github.com/remix-run/react-router-templates) देता है जो अलग-अलग JavaScript runtimes और प्लेटफार्म्स के लिए होते हैं।

नया React Router फ्रेमवर्क प्रोजेक्ट बनाने के लिए, ये कमांड रन करें:

<TerminalBlock>
npx create-react-router@latest
</TerminalBlock>

React Router को [Shopify](https://www.shopify.com) मेंटेन करता है।

### Expo (for native apps) {/*expo*/}

**[Expo](https://expo.dev/) एक React फ्रेमवर्क है जो आपको यूनिवर्सल Android, iOS, और वेब ऐप्स बनाने की सुविधा देता है, जिनमें असली native UIs होते हैं।** ये React Native का एक SDK प्रोवाइड करता है जो native parts को यूज़ करना आसान बनाता है। नया Expo प्रोजेक्ट बनाने के लिए, ये कमांड रन करें:

<TerminalBlock>
npx create-expo-app@latest
</TerminalBlock>

अगर आप Expo में नए हैं, तो [Expo ट्यूटोरियल](https://docs.expo.dev/tutorial/introduction/) देखें।

Expo को [Expo (the company)](https://expo.dev/about) मेंटेन करता है। Expo के साथ ऐप्स बनाना फ्री है, और आप उन्हें Google और Apple ऐप स्टोर्स पर बिना किसी रेस्ट्रिक्शन के सबमिट कर सकते हैं। Expo paid क्लाउड सर्विसेज भी प्रोवाइड करता है जो opt-in होती हैं।

## Other options {/*other-options*/}

और भी नए फ्रेमवर्क्स हैं जो हमारे full-stack React विज़न की दिशा में काम कर रहे हैं:

- [TanStack Start (Beta)](https://tanstack.com/): TanStack Start एक full-stack React फ्रेमवर्क है जो TanStack Router पर powered है। ये full-document SSR, streaming, server functions, bundling, और ज्यादा प्रोवाइड करता है Nitro और Vite जैसे टूल्स का इस्तेमाल करके।
- [RedwoodJS](https://redwoodjs.com/): Redwood एक full-stack React फ्रेमवर्क है जिसमें कई pre-installed packages और configuration होते हैं जो full-stack वेब एप्लिकेशन्स बनाना आसान बना देते हैं।

<DeepDive>

#### कौन से फीचर्स React टीम के Full-Stack आर्किटेक्चर विज़न में शामिल हैं? {/*which-features-make-up-the-react-teams-full-stack-architecture-vision*/}

Next.js का App Router bundler official [React Server Components specification](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) को पूरी तरह से इम्प्लीमेंट करता है। इससे आप build-time, server-only, और interactive components को एक ही React tree में मिक्स कर सकते हैं।

मान लीजिए, आप एक server-only React component लिखते हैं जो एक `async` function के रूप में data या file से पढ़ सकता है। फिर आप इस data को interactive components को पास कर सकते हैं:

```js
// यह component *सिर्फ* सर्वर पर (या build के दौरान) चलेगा।
async function Talks({ confId }) {
  // 1. आप सर्वर पर हैं, इसलिए आप अपने data layer से बात कर सकते हैं। API endpoint की जरूरत नहीं।
  const talks = await db.Talks.findAll({ confId });

  // 2. आप कोई भी rendering logic add कर सकते हैं। ये आपका JavaScript bundle को बड़ा नहीं करेगा।
  const videos = talks.map(talk => talk.video);

  // 3. Data को ऐसे components को पास करें जो ब्राउज़र में चलेंगे।
  return <SearchableVideoList videos={videos} />;
}
```

Next.js का App Router भी [data fetching with Suspense](/blog/2022/03/29/react-v18#suspense-in-data-frameworks) को इंटीग्रेट करता है। इससे आप UI के अलग-अलग हिस्सों के लिए loading state (जैसे skeleton placeholder) सीधे अपने React tree में स्पेसिफाई कर सकते हैं:

```js
<Suspense fallback={<TalksLoading />}>
  <Talks confId={conf.id} />
</Suspense>
```

Server Components और Suspense React के फीचर्स हैं, ना कि Next.js के। हालांकि, इन्हें फ्रेमवर्क लेवल पर अपनाने के लिए काम करना पड़ता है और यह आसान नहीं होता। फिलहाल, Next.js का App Router सबसे पूरा इम्प्लीमेंटेशन है। React टीम bundler डेवलपर्स के साथ मिलकर काम कर रही है ताकि ये फीचर्स अगले जनरेशन के फ्रेमवर्क्स में आसानी से इम्प्लीमेंट किए जा सकें।

</DeepDive>

<Note>


#### क्या आप Vite की सिफारिश करते हैं? {/do-you-recommend-vite/}

हम कई Vite-based सिफारिशें देते हैं।

React Router v7 एक Vite-based फ्रेमवर्क है जो Vite के फास्ट डेवलपमेंट सर्वर और बिल्ड टूलिंग का इस्तेमाल करता है, और एक ऐसा फ्रेमवर्क प्रोवाइड करता है जो राउटिंग और डाटा फेचिंग करता है। जैसे बाकी फ्रेमवर्क्स हम सुझाते हैं, आप React Router v7 के साथ SPA बना सकते हैं।

हम यह भी सिफारिश करते हैं कि आप Vite का उपयोग करें जब [React को एक मौजूदा प्रोजेक्ट में जोड़ें](/learn/add-react-to-an-existing-project), या [फ्रेमवर्क बनाएं](/learn/building-a-react-framework)।

जैसे Svelte के पास Sveltekit है, Vue के पास Nuxt है, और Solid के पास SolidStart है, वैसे React नए प्रोजेक्ट्स के लिए एक फ्रेमवर्क का उपयोग करने की सलाह देता है जो Vite जैसे बिल्ड टूल्स के साथ इंटीग्रेट हो।

</Note>

-----

_अगर आप एक फ्रेमवर्क लेखक हैं और इस पेज पर शामिल होना चाहते हैं, [कृपया हमें बताएं](https://github.com/reactjs/react.dev/issues/new?assignees=&labels=type%3A+framework&projects=&template=3-framework.yml&title=%5BFramework%5D%3A+)।_
