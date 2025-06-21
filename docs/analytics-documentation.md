# Analytics and Tracking System Documentation

## Overview

This comprehensive analytics system provides detailed tracking of user interactions, UTM parameter handling, and campaign attribution across the entire IQ Test Pro application.

## Features

### 🎯 **Core Tracking Capabilities**
- **Page Views**: Automatic tracking with title, URL, referrer, and load time
- **User Interactions**: Clicks, form submissions, scrolling, and engagement
- **Custom Events**: Flexible event tracking for specific business metrics
- **Session Management**: User session tracking with device detection
- **UTM Parameters**: Complete campaign attribution and tracking

### 📊 **Analytics Components**

#### 1. Analytics System (`lib/analytics-system.ts`)
The main analytics engine that handles:
- Session creation and management
- Event collection and batching
- UTM parameter parsing
- Local storage management
- Automatic event listeners

#### 2. UTM Handler (`lib/utm-handler.ts`)
Specialized UTM parameter management:
- First-touch and last-touch attribution
- Multi-touch attribution modeling
- Campaign performance metrics
- Conversion tracking with attribution

#### 3. Analytics Hooks (`hooks/use-analytics.ts`)
React hooks for easy integration:
- `usePageTracking()`: Automatic page view tracking
- `useEventTracking()`: Custom event tracking methods
- `useUTMParams()`: Access to UTM parameters
- `useAnalyticsSession()`: Session information access

#### 4. Tracking Utilities (`lib/tracking-utilities.ts`)
Pre-built tracking functions for common scenarios:
- Button clicks and form interactions
- E-commerce and payment tracking
- User engagement metrics
- Error and performance tracking
- A/B testing and social sharing

## Implementation Guide

### 1. Basic Setup

The system is automatically initialized in the app layout:

\`\`\`typescript
// Already integrated in app/layout.tsx
import Analytics from "@/components/analytics"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
\`\`\`

### 2. Page Tracking

Automatic page tracking is enabled by default. For manual tracking:

\`\`\`typescript
import { trackPageView } from '@/lib/analytics-system'

// Manual page view tracking
trackPageView('Page Title', '/page-url')
\`\`\`

### 3. Event Tracking

#### Using Hooks (Recommended)
\`\`\`typescript
import { useEventTracking } from '@/hooks/use-analytics'

function MyComponent() {
  const { trackButtonClick, trackFormStart } = useEventTracking()
  
  return (
    <button onClick={() => trackButtonClick('CTA Button', 'hero-section')}>
      Click Me
    </button>
  )
}
\`\`\`

#### Using Utilities
\`\`\`typescript
import { trackButtonClick, trackFormInteraction } from '@/lib/tracking-utilities'

// Track button click
trackButtonClick('Sign Up', 'signup-btn', { location: 'header' })

// Track form interaction
trackFormInteraction('start', 'contact-form')
\`\`\`

### 4. UTM Parameter Tracking

UTM parameters are automatically parsed and stored:

\`\`\`typescript
import { useUTMParams } from '@/hooks/use-analytics'

function MyComponent() {
  const utmParams = useUTMParams()
  
  // Access UTM parameters
  console.log(utmParams.utm_source) // e.g., 'google'
  console.log(utmParams.utm_campaign) // e.g., 'summer-sale'
}
\`\`\`

### 5. Conversion Tracking

Track conversions with full attribution:

\`\`\`typescript
import { trackCustomConversion } from '@/lib/tracking-utilities'

// Track a conversion
trackCustomConversion('quiz_completion', 150, {
  quizType: 'premium',
  score: 150
})
\`\`\`

## Event Types and Properties

### Standard Events

#### Page View
\`\`\`typescript
{
  eventType: 'page_view',
  properties: {
    title: string,
    url: string,
    referrer: string,
    loadTime: number,
    scrollDepth: number
  }
}
\`\`\`

#### Click Event
\`\`\`typescript
{
  eventType: 'click',
  properties: {
    elementType: string,
    elementText: string,
    elementId: string,
    elementClass: string,
    position: { x: number, y: number }
  }
}
\`\`\`

#### Form Submission
\`\`\`typescript
{
  eventType: 'form_submission',
  properties: {
    formId: string,
    formName: string,
    fields: string[],
    success: boolean,
    errorMessage?: string
  }
}
\`\`\`

### Custom Events

#### Quiz Events
\`\`\`typescript
trackQuizEvent('start', 'premium-iq-test', {
  level: 'expert',
  estimatedDuration: 1800
})
\`\`\`

#### E-commerce Events
\`\`\`typescript
trackEcommerce('purchase', {
  transactionId: 'txn_123',
  value: 29.90,
  currency: 'BRL',
  items: [{
    itemId: 'premium-plan',
    itemName: 'Premium IQ Test',
    category: 'subscription',
    price: 29.90,
    quantity: 1
  }]
})
\`\`\`

## UTM Parameter Structure

### Supported Parameters
- `utm_source`: Traffic source (e.g., 'google', 'facebook')
- `utm_medium`: Marketing medium (e.g., 'cpc', 'email')
- `utm_campaign`: Campaign name (e.g., 'summer-sale')
- `utm_term`: Paid keywords (optional)
- `utm_content`: Ad content identifier (optional)

### Attribution Models

#### First-Touch Attribution
Credits the first campaign that brought the user to the site.

#### Last-Touch Attribution
Credits the last campaign before conversion.

#### Multi-Touch Attribution
Tracks all touchpoints in the customer journey.

## Data Storage and Privacy

### Local Storage Structure
\`\`\`typescript
// Session data
analytics_session: {
  sessionId: string,
  userId?: string,
  startTime: number,
  utmParams: UTMParameters,
  device: 'mobile' | 'tablet' | 'desktop'
}

// Events data
analytics_events: AnalyticsEvent[]

// Attribution data
campaign_attribution: {
  firstTouch: CampaignData,
  lastTouch: CampaignData,
  touchPoints: CampaignData[]
}
\`\`\`

### Privacy Compliance

#### GDPR Compliance
\`\`\`typescript
import { clearAllTrackingData } from '@/lib/tracking-utilities'

// Clear all tracking data
clearAllTrackingData()
\`\`\`

#### Data Retention
- Events: Last 1000 events stored locally
- Sessions: 30-minute timeout
- Attribution: 30-day expiry
- Touch points: Maximum 50 stored

## Debugging and Monitoring

### Debug Information
\`\`\`typescript
import { getTrackingDebugInfo } from '@/lib/tracking-utilities'

// Get all tracking data for debugging
const debugInfo = getTrackingDebugInfo()
console.log(debugInfo)
\`\`\`

### Console Logging
Development mode automatically enables console logging for all events.

### Local Storage Inspection
All tracking data is stored in localStorage for debugging:
- `analytics_session`: Current session data
- `analytics_events`: Recent events
- `campaign_attribution`: Attribution data
- `conversions`: Conversion history

## Integration Examples

### Payment Tracking
\`\`\`typescript
import { trackEcommerce } from '@/lib/tracking-utilities'

function handlePaymentSuccess(paymentData) {
  trackEcommerce('purchase', {
    transactionId: paymentData.id,
    value: paymentData.amount,
    currency: 'BRL',
    items: [{
      itemId: paymentData.planId,
      itemName: paymentData.planName,
      category: 'subscription',
      price: paymentData.amount,
      quantity: 1
    }]
  })
}
\`\`\`

### Quiz Completion Tracking
\`\`\`typescript
import { trackQuizEvent } from '@/lib/tracking-utilities'

function handleQuizComplete(results) {
  trackQuizEvent('complete', results.quizType, {
    score: results.score,
    duration: results.duration,
    questionsAnswered: results.totalQuestions,
    accuracy: results.accuracy
  })
}
\`\`\`

### Error Tracking
\`\`\`typescript
import { trackError } from '@/lib/tracking-utilities'

function handleError(error) {
  trackError('javascript', error.message, error.stack, {
    component: 'PaymentForm',
    userId: user?.id
  })
}
\`\`\`

## Performance Considerations

### Batching
- Events are batched and sent every 30 seconds
- Batch size: 10 events maximum
- Automatic flush on page unload

### Storage Limits
- Maximum 1000 events stored locally
- Automatic cleanup of old data
- Efficient JSON serialization

### Network Optimization
- Events are queued locally first
- Batch sending reduces network requests
- Retry logic for failed sends (when integrated with backend)

## Future Enhancements

### Planned Features
1. **Server-side Integration**: Send data to analytics service
2. **Real-time Dashboard**: Live analytics dashboard
3. **Advanced Segmentation**: User behavior segmentation
4. **Predictive Analytics**: ML-based user insights
5. **A/B Testing Framework**: Built-in experimentation platform

### Integration Points
- Google Analytics 4
- Facebook Pixel
- Custom analytics backends
- Data warehouses (BigQuery, Snowflake)

## Support and Maintenance

### Regular Tasks
1. Monitor local storage usage
2. Review event schemas
3. Update UTM parameter mappings
4. Validate attribution models
5. Clean up old tracking data

### Troubleshooting
- Check browser console for errors
- Verify localStorage data
- Test UTM parameter parsing
- Validate event firing
- Review session management

This analytics system provides comprehensive tracking capabilities while maintaining user privacy and system performance. It's designed to scale with your application and provide actionable insights for business growth.
