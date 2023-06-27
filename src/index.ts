export interface IUnleashImpressionEvent {
  context: Record<string, string>
  enabled: boolean
  featureName: string
  eventType: string
  impressionData?: boolean
}

export const sendImpression = (event: IUnleashImpressionEvent) => {
  if ('gtag' in window) {
    const { context, featureName, ...rest } = event
    const data = new Map<string, any>(Object.entries(rest))

    Object.entries(context).forEach(([key, value]) => {
      if (value.length <= 100) {
        data.set(`context_${key}`, value)
      }
    })

    data.set('featureName', featureName)

    window.gtag('event', 'unleash', Object.fromEntries(data))
  } else {
    console.error(
      'unleash-analytics-ga requires gtag to be available on the window object. Please ensure that you correctly configured Google Analytics.'
    )
    return
  }
}

export default sendImpression
