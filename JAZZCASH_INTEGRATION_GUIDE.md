# JazzCash Payment Gateway Integration Guide

This guide provides step-by-step instructions for integrating JazzCash payment gateway into The Formula Lab e-commerce platform.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [JazzCash Account Setup](#jazzcash-account-setup)
3. [API Credentials](#api-credentials)
4. [Environment Variables](#environment-variables)
5. [Backend API Implementation](#backend-api-implementation)
6. [Frontend Integration](#frontend-integration)
7. [Testing](#testing)
8. [Production Deployment](#production-deployment)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:
- A registered business with valid documentation
- Active JazzCash merchant account
- Node.js version 18+ installed
- Access to your project's environment variables
- SSL certificate for production (required by JazzCash)

---

## JazzCash Account Setup

### Step 1: Create Merchant Account
1. Visit [JazzCash Business Portal](https://business.jazzcash.com.pk)
2. Click on "Register as Merchant"
3. Fill in business details:
   - Business name: The Formula Lab
   - Business type: E-commerce
   - Contact information
   - Bank account details
4. Submit required documents:
   - CNIC/NTN certificate
   - Business registration certificate
   - Bank account verification letter
5. Wait for account approval (typically 5-7 business days)

### Step 2: Request API Access
1. Once approved, log in to merchant portal
2. Navigate to "Settings" > "API Integration"
3. Request API credentials for:
   - Mobile Account (MA) payments
   - Card payments (optional)
4. Download the integration documentation

---

## API Credentials

After approval, you'll receive:

\`\`\`
Merchant ID: MC12345
Password: YourSecurePassword
Integrity Salt: YourIntegritySalt
Return URL: https://yourdomain.com/payment/callback
\`\`\`

**Important:** Keep these credentials secure and never commit them to version control.

---

## Environment Variables

### Step 1: Create Environment File

Add the following to your `.env.local` file:

\`\`\`bash
# JazzCash Configuration
JAZZCASH_MERCHANT_ID=MC12345
JAZZCASH_PASSWORD=YourSecurePassword
JAZZCASH_INTEGRITY_SALT=YourIntegritySalt
JAZZCASH_RETURN_URL=http://localhost:3000/payment/callback
JAZZCASH_API_URL=https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction

# For Production
# JAZZCASH_API_URL=https://payments.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction
\`\`\`

### Step 2: Add to Vercel Environment Variables

If deploying on Vercel:
1. Go to Project Settings > Environment Variables
2. Add each variable above
3. Select appropriate environment (Development/Preview/Production)

---

## Backend API Implementation

### Step 1: Install Required Dependencies

\`\`\`bash
npm install crypto-js moment
\`\`\`

### Step 2: Create JazzCash Utility

Create `lib/jazzcash.ts`:

\`\`\`typescript
import crypto from 'crypto'
import moment from 'moment'

interface JazzCashConfig {
  merchantId: string
  password: string
  integritySalt: string
  returnUrl: string
  apiUrl: string
}

interface TransactionData {
  amount: number
  orderId: string
  mobileNumber: string
  cnic: string
  email: string
  description: string
}

export class JazzCashService {
  private config: JazzCashConfig

  constructor() {
    this.config = {
      merchantId: process.env.JAZZCASH_MERCHANT_ID!,
      password: process.env.JAZZCASH_PASSWORD!,
      integritySalt: process.env.JAZZCASH_INTEGRITY_SALT!,
      returnUrl: process.env.JAZZCASH_RETURN_URL!,
      apiUrl: process.env.JAZZCASH_API_URL!,
    }
  }

  // Generate secure hash for request
  generateHash(data: Record<string, string>): string {
    // Sort parameters alphabetically
    const sortedKeys = Object.keys(data).sort()
    let hashString = this.config.integritySalt + '&'

    sortedKeys.forEach((key) => {
      hashString += data[key] + '&'
    })

    // Remove trailing '&'
    hashString = hashString.slice(0, -1)

    // Generate SHA256 hash
    return crypto.createHash('sha256').update(hashString).digest('hex')
  }

  // Create transaction request
  async createTransaction(transactionData: TransactionData) {
    const dateTime = moment().format('YYYYMMDDHHmmss')
    const expiryDateTime = moment().add(1, 'hours').format('YYYYMMDDHHmmss')

    const requestData = {
      pp_Version: '1.1',
      pp_TxnType: 'MWALLET',
      pp_Language: 'EN',
      pp_MerchantID: this.config.merchantId,
      pp_Password: this.config.password,
      pp_TxnRefNo: transactionData.orderId,
      pp_Amount: (transactionData.amount * 100).toString(), // Convert to paisas
      pp_TxnCurrency: 'PKR',
      pp_TxnDateTime: dateTime,
      pp_BillReference: transactionData.orderId,
      pp_Description: transactionData.description,
      pp_TxnExpiryDateTime: expiryDateTime,
      pp_ReturnURL: this.config.returnUrl,
      pp_SecureHash: '',
      ppmpf_1: transactionData.mobileNumber, // Customer mobile
      ppmpf_2: transactionData.cnic, // Customer CNIC
      ppmpf_3: transactionData.email, // Customer email
      ppmpf_4: '', // Optional field
      ppmpf_5: '', // Optional field
    }

    // Generate secure hash
    requestData.pp_SecureHash = this.generateHash(requestData)

    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('JazzCash API Error:', error)
      throw new Error('Payment initialization failed')
    }
  }

  // Verify response hash
  verifyResponseHash(responseData: Record<string, string>): boolean {
    const receivedHash = responseData.pp_SecureHash
    delete responseData.pp_SecureHash

    const calculatedHash = this.generateHash(responseData)
    return receivedHash === calculatedHash
  }
}
\`\`\`

### Step 3: Create API Route for Payment Initialization

Create `app/api/payment/initialize/route.ts`:

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server'
import { JazzCashService } from '@/lib/jazzcash'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, orderId, mobileNumber, cnic, email, description } = body

    // Validate required fields
    if (!amount || !orderId || !mobileNumber || !cnic || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate mobile number format (03XXXXXXXXX)
    const mobileRegex = /^03[0-9]{9}$/
    if (!mobileRegex.test(mobileNumber)) {
      return NextResponse.json(
        { error: 'Invalid mobile number format' },
        { status: 400 }
      )
    }

    // Validate CNIC format (XXXXX-XXXXXXX-X)
    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/
    if (!cnicRegex.test(cnic)) {
      return NextResponse.json(
        { error: 'Invalid CNIC format' },
        { status: 400 }
      )
    }

    const jazzCash = new JazzCashService()
    const result = await jazzCash.createTransaction({
      amount,
      orderId,
      mobileNumber,
      cnic,
      email,
      description,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Payment initialization error:', error)
    return NextResponse.json(
      { error: 'Payment initialization failed' },
      { status: 500 }
    )
  }
}
\`\`\`

### Step 4: Create Payment Callback Handler

Create `app/api/payment/callback/route.ts`:

\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server'
import { JazzCashService } from '@/lib/jazzcash'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const responseData: Record<string, string> = {}

    // Convert FormData to object
    formData.forEach((value, key) => {
      responseData[key] = value.toString()
    })

    const jazzCash = new JazzCashService()

    // Verify response hash
    if (!jazzCash.verifyResponseHash(responseData)) {
      return NextResponse.json(
        { error: 'Invalid response hash' },
        { status: 400 }
      )
    }

    // Check transaction status
    const responseCode = responseData.pp_ResponseCode
    const responseMessage = responseData.pp_ResponseMessage
    const txnRefNo = responseData.pp_TxnRefNo

    if (responseCode === '000') {
      // Payment successful
      // TODO: Update order status in database
      // TODO: Send confirmation email to customer
      
      return NextResponse.redirect(
        new URL(`/payment/success?order=${txnRefNo}`, request.url)
      )
    } else {
      // Payment failed
      return NextResponse.redirect(
        new URL(
          `/payment/failed?error=${encodeURIComponent(responseMessage)}`,
          request.url
        )
      )
    }
  } catch (error) {
    console.error('Payment callback error:', error)
    return NextResponse.redirect(
      new URL('/payment/failed?error=Processing%20error', request.url)
    )
  }
}
\`\`\`

### Step 5: Create Payment Callback Page

Create `app/payment/callback/page.tsx`:

\`\`\`typescript
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PaymentCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // This page handles the POST callback from JazzCash
    // The API route will process the payment and redirect
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-lg">Processing your payment...</p>
        <p className="text-sm text-muted-foreground mt-2">
          Please do not close this window
        </p>
      </div>
    </div>
  )
}
\`\`\`

---

## Frontend Integration

### Step 1: Update Checkout Modal Component

The checkout modal in `components/checkout-modal.tsx` is already set up for JazzCash. Ensure it includes:

1. Mobile number input (format: 03XXXXXXXXX)
2. CNIC input (format: XXXXX-XXXXXXX-X)
3. Input validation
4. Payment submission handler

### Step 2: Implement Payment Submission

Add this function to your checkout modal:

\`\`\`typescript
const handleJazzCashPayment = async () => {
  setProcessing(true)
  setError('')

  try {
    // Validate inputs
    if (!jazzCashNumber || !jazzCashCnic) {
      throw new Error('Please fill in all JazzCash details')
    }

    // Call payment initialization API
    const response = await fetch('/api/payment/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: total,
        orderId: `ORDER-${Date.now()}`,
        mobileNumber: jazzCashNumber,
        cnic: jazzCashCnic,
        email: formData.email,
        description: `Order for ${cart.length} items`,
      }),
    })

    const result = await response.json()

    if (result.pp_ResponseCode === '000') {
      // Redirect to JazzCash payment page
      window.location.href = result.pp_PaymentURL
    } else {
      throw new Error(result.pp_ResponseMessage || 'Payment initialization failed')
    }
  } catch (err: any) {
    setError(err.message)
  } finally {
    setProcessing(false)
  }
}
\`\`\`

### Step 3: Create Success/Failure Pages

Create `app/payment/success/page.tsx`:

\`\`\`typescript
'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-6">
          Your order has been placed successfully.
        </p>
        {orderId && (
          <p className="text-sm mb-6">
            Order ID: <span className="font-mono">{orderId}</span>
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/orders">View Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
\`\`\`

Create `app/payment/failed/page.tsx`:

\`\`\`typescript
'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
        <p className="text-muted-foreground mb-6">
          {error || 'Something went wrong with your payment.'}
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/cart">Return to Cart</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
\`\`\`

---

## Testing

### Sandbox Testing

JazzCash provides a sandbox environment for testing:

**Test Credentials:**
- Mobile Number: 03001234567
- CNIC: 12345-1234567-1
- OTP: 1234

**Test Scenarios:**

1. **Successful Payment:**
   - Use test mobile number
   - Enter test CNIC
   - Complete OTP verification
   - Expected: Redirect to success page

2. **Insufficient Balance:**
   - Use mobile: 03001234568
   - Expected: Error message displayed

3. **Invalid CNIC:**
   - Use incorrect CNIC format
   - Expected: Validation error

4. **Timeout:**
   - Wait without completing payment
   - Expected: Transaction expires after 1 hour

### Testing Checklist

- [ ] Payment initialization works
- [ ] Hash generation is correct
- [ ] Mobile number validation works
- [ ] CNIC validation works
- [ ] Callback URL receives response
- [ ] Hash verification works on callback
- [ ] Success page displays correctly
- [ ] Failure page displays correctly
- [ ] Order status updates correctly
- [ ] Email notifications sent

---

## Production Deployment

### Step 1: Update Environment Variables

Replace sandbox credentials with production credentials:

\`\`\`bash
JAZZCASH_API_URL=https://payments.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction
JAZZCASH_MERCHANT_ID=<Production_Merchant_ID>
JAZZCASH_PASSWORD=<Production_Password>
JAZZCASH_INTEGRITY_SALT=<Production_Salt>
JAZZCASH_RETURN_URL=https://theformulalab.com/payment/callback
\`\`\`

### Step 2: SSL Certificate

Ensure your domain has a valid SSL certificate. JazzCash requires HTTPS for production.

### Step 3: Whitelist IPs

JazzCash may require whitelisting your server IPs:
1. Log in to merchant portal
2. Go to Security Settings
3. Add your server IP addresses

### Step 4: Go Live Checklist

- [ ] Production API credentials configured
- [ ] SSL certificate active
- [ ] Return URL accessible
- [ ] Server IPs whitelisted
- [ ] Error logging configured
- [ ] Database backup ready
- [ ] Test transaction completed successfully

---

## Troubleshooting

### Common Issues

**Issue 1: "Invalid Hash" Error**
- **Cause:** Incorrect hash calculation or parameter ordering
- **Solution:** 
  - Verify integrity salt is correct
  - Check parameter sorting (alphabetical)
  - Ensure no extra spaces in parameters

**Issue 2: "Merchant Not Found"**
- **Cause:** Incorrect merchant ID or inactive account
- **Solution:**
  - Verify merchant ID in portal
  - Ensure account is active
  - Contact JazzCash support

**Issue 3: "Transaction Expired"**
- **Cause:** Payment not completed within 1 hour
- **Solution:**
  - Inform users of time limit
  - Implement expiry warning
  - Allow retry with new transaction

**Issue 4: Callback Not Received**
- **Cause:** Return URL not accessible or incorrect
- **Solution:**
  - Test return URL externally
  - Check firewall settings
  - Verify URL in merchant portal

### Debug Mode

Enable debug logging in development:

\`\`\`typescript
// lib/jazzcash.ts
if (process.env.NODE_ENV === 'development') {
  console.log('[v0] JazzCash Request:', requestData)
  console.log('[v0] JazzCash Hash String:', hashString)
}
\`\`\`

### Support Contacts

- **JazzCash Merchant Support:** 111-124-444
- **Email:** merchantsupport@jazzcash.com.pk
- **Technical Support:** tech.support@jazzcash.com.pk

---

## Security Best Practices

1. **Never expose credentials in client-side code**
2. **Always verify response hash on callback**
3. **Use HTTPS in production**
4. **Implement rate limiting on payment endpoints**
5. **Log all transactions for audit trail**
6. **Validate all user inputs**
7. **Store sensitive data encrypted**
8. **Implement CSRF protection**
9. **Monitor for suspicious activity**
10. **Regular security audits**

---

## Additional Resources

- [JazzCash Official Documentation](https://developer.jazzcash.com.pk)
- [JazzCash Merchant Portal](https://business.jazzcash.com.pk)
- [JazzCash API Reference](https://developer.jazzcash.com.pk/api)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)

---

## Changelog

### Version 1.0.0 (Current)
- Initial JazzCash integration
- Mobile wallet payments support
- Sandbox testing environment
- Success/failure page handlers

### Planned Features
- Card payment integration
- Recurring payments
- Refund handling
- Payment analytics dashboard

---

**Last Updated:** January 2025  
**Maintained by:** The Formula Lab Development Team
