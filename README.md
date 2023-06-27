# unleash-analytics-ga

This module serves as a plugin/connector for integrating Google Analytics 4 with your Unleash client-side SDK. It allows you to seamlessly connect your Unleash-powered application to Google Analytics 4, enabling you to track and analyze user interactions, events, and other relevant metrics within the Google Analytics platform. By leveraging this plugin, you can gain valuable insights and make data-driven decisions based on the powerful analytics capabilities provided by Google Analytics 4.

## Get Started

Setup Google Analytics 4 in your project. For more information, see [Set up Analytics for a website and/or app](https://support.google.com/analytics/answer/9304153?sjid=4548331147725996201-EU#zippy=%2Cadd-the-google-tag-directly-to-your-web-pages%2Cweb).

For example if you have an `index.html` file in your project, this means adding these script tags immediately after the opening `<head>` tag:

```html
<!-- ... -->
<head>
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id={YOUR_GOOGLE_ANALYTICS_ID}"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())

    gtag('config', '{YOUR_GOOGLE_ANALYTICS_ID}')
  </script>
  <!-- ... -->
</head>
<!-- ... -->
```

Install the plugin:

```bash
npm install unleash-analytics-ga

# or using yarn

yarn add unleash-analytics-ga

# or using pnpm

pnpm i unleash-analytics-ga
```

Add the plugin to your Unleash client.

For example, using the [proxy-client-react](https://github.com/Unleash/proxy-client-react) SDK:

```typescript
import {
  FlagProvider,
  IConfig,
  UnleashClient
} from '@unleash/proxy-client-react'
import uaga from '@nunogois/unleash-analytics-ga'

const config: IConfig = {
  url: 'YOUR_UNLEASH_INSTANCE_URL',
  clientKey: 'YOUR_API_TOKEN',
  appName: 'YOUR_APP_NAME',
  impressionDataAll: true // In case you want to track all impressions, which includes disabled feature toggles
}

const client = new UnleashClient(config)

client.on('impression', uaga) // Bind the plugin to the client instance impression event

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FlagProvider unleashClient={client}>
      <App />
    </FlagProvider>
  </React.StrictMode>
)
```

## Troubleshooting

### Ensure Google Analytics is correctly set up

You may be seeing the following error in your console:

```
unleash-analytics-ga requires gtag to be available on the window object. Please ensure that you correctly configured Google Analytics.
```

This means that the plugin was unable to find the `gtag` function on the `window` object. This is most likely due to Google Analytics not being correctly set up in your project. Please ensure that you have followed the [Get Started](#get-started) section correctly.

### Ensure your feature toggles have impression data enabled

Impression data is strictly an opt-in feature and must be enabled on a per-toggle basis. Please ensure you have enabled impression data for the toggles you want to track by following the [Enabling impression data](https://docs.getunleash.io/reference/impression-data#enabling-impression-data) section in the Unleash documentation.

### I don't see data for disabled toggles in Google Analytics

By default, Unleash does not track impressions for disabled toggles. If you want to track impressions for disabled toggles, you must set the `impressionDataAll` flag to `true` in your Unleash client configuration. For more information, see the Unleash Proxy Client for the browser (JS) [available options](https://docs.getunleash.io/reference/sdks/javascript-browser#available-options) section in the Unleash documentation.

### Everything looks correct, however I'm still not seeing any data in Google Analytics

We recommend trying out the official [Google Analytics Debug extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) for Chrome. This extension will help you debug any issues you may be having with Google Analytics.

You can visualize this data in realtime by going to the Debug View in Google Analytics. For more information, see [Monitor events in DebugView](https://support.google.com/analytics/answer/7201382?hl=en).
