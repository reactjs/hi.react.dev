---
title: React डेवलपर टूल्स
---

<Intro>

React [कौम्पोनॅन्ट](/learn/your-first-component), का निरीक्षण करने के लिए React डेवलपर टूल्स का उपयोग करेंं, [props](/learn/passing-props-to-a-component) और [state](/learn/state-a-components-memory) एडिट करेंं, और परफॉरमेंस समस्याओं की पहचान करेंं।
  
</Intro>

<YouWillLearn>

* React डेवलपर टूल कैसे इनस्टॉल करें

</YouWillLearn>

## ब्राउज़र एक्सटेंशन {/*browser-extension*/}

React के साथ बनी वेबसाइटों को डिबग करने का सबसे आसान तरीका React Developer Tools ब्राउज़र एक्सटेंशन को इनस्टॉल करना है। यह कई लोकप्रिय ब्राउज़रों के लिए उपलब्ध है:

* [**Chrome** के लिए इनस्टॉल करेंं](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [**Firefox** के लिए इनस्टॉल करेंं](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
* [**Edge** के लिए इनस्टॉल करेंं](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)

अब, यदि आप **React से बनी** वेबसाइट पर जाते हैं, तो आपको _Components_ और _Profiler_ पैनल दिखाई देंगे।

![React डेवलपर टूल्स एक्सटेंशन](/images/docs/react-devtools-extension.png)

### Safari और अन्य ब्राउज़र {/*safari-and-other-browsers*/}
अन्य ब्राउज़रों के लिए (उदाहरण के लिए, Safari), [`react-devtools`](https://www.npmjs.com/package/react-devtools) npm पैकेज इंस्टॉल करेंं:
```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

इसके बाद टर्मिनल से डेवलपर टूल खोलें:
```bash
react-devtools
```

फिर अपनी वेबसाइट के `<head>` की शुरुआत में निम्न `<script>` टैग ऐड करके अपनी वेबसाइट कनेक्ट करेंं:
```html {3}
<html>
  <head>
    <script src="http://localhost:8097"></script>
```

अपनी वेबसाइट को डेवलपर टूल में देखने के लिए उसे अभी ब्राउज़र में रीलोड करेंं।

![React डेवलपर टूल्स स्टैंडअलोन](/images/docs/react-devtools-standalone.png)

## मोबाइल (React Native) {/*mobile-react-native*/}  

[React Native](https://reactnative.dev/) से बानी ऍप्स को इंस्पेक्ट करने के लिए, ऍप [React Native DevTools](https://reactnative.dev/docs/debugging/react-native-devtools) का इस्तेमाल कर सकते हैं, इसके साथ डिबग्गर पूरी तरह से React Developer Tools के साथ इंटेग्रटे हो जाता है। सभी फीचर्स ब्राउज़र एक्सटेनव के जैसे ही होते है नेटिव एलिमेंट हाईलाइट करना और सेलेक्ट करना भी।

[React Native में डिबगिंग के बारे में और जानें।](https://reactnative.dev/docs/debugging)

> React Native के 0.76 से पुराने वर्ज़न्स के लिए, [React DevTools](https://reactnative.dev/docs/debugging/react-native-devtools) का स्टैंडअलोन बिल्ड यूज़ करो। इसके लिए ऊपर दिया गया [Safari और दूसरे ब्रोसेर्स](#safari-and-other-browsers) वाला गाइड फॉलो करो।  
