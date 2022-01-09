---
title: React डेवलपर टूल्स
---

<Intro>

React [कंपोनेंट्स](/learn/your-first-component), का निरीक्षण करने के लिए रिएक्ट डेवलपर टूल्स का उपयोग करें, [प्रॉप्स](/learn/passing-props-to-a-component) और [स्टेट](/learn/state-a-components-memory) एडिट करे, और प्रदर्शन समस्याओं की पहचान करें।
</Intro>

## ब्राउज़र एक्सटेंशन {/*browser-extension*/}

React के साथ निर्मित वेबसाइटों को डिबग करने का सबसे आसान तरीका React Developer Tools ब्राउज़र एक्सटेंशन को स्थापित करना है। यह कई लोकप्रिय ब्राउज़रों के लिए उपलब्ध है:

* [**क्रोम** के लिए इनस्टॉल करे](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [**फ़िरेफोक्स** के लिए इनस्टॉल करे](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
* [**एज** के लिए इनस्टॉल करे](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)

अब, यदि आप **React के साथ निर्मित ** वेबसाइट पर जाते हैं, तो आपको _Components_ और _Profiler_ पैनल दिखाई देंगे।

![React डेवलपर टूल्स एक्सटेंशन](/images/docs/react-devtools-extension.png)

### सफारी और अन्य ब्राउज़र {/*safari-and-other-browsers*/}
अन्य ब्राउज़रों के लिए (उदाहरण के लिए, सफारी), [`react-devtools`](https://www.npmjs.com/package/react-devtools) npm पैकेज इंस्टॉल करें:
```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

अगला टर्मिनल से डेवलपर टूल खोलें:
```bash
react-devtools
```

फिर अपनी वेबसाइट के `<head>` की शुरुआत में निम्न `<script>` टैग जोड़कर अपनी वेबसाइट कनेक्ट करें:
```html {3}
<html>
  <head>
    <script src="http://localhost:8097"></script>
```

Reload your website in the browser now to view it in developer tools.

![React Developer Tools standalone](/images/docs/react-devtools-standalone.png)

## Mobile (React Native) {/*mobile-react-native*/}
React Developer Tools can be used to inspect apps built with [React Native](https://reactnative.dev/) as well.

The easiest way to use React Developer Tools is to install it globally:
```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

Next open the developer tools from the terminal.
```bash
react-devtools
```

It should connect to any local React Native app that's running.

> Try reloading the app if developer tools doesn't connect after a few seconds.

[Learn more about debugging React Native.](https://reactnative.dev/docs/debugging)
