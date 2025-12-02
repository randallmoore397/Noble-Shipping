/**
 * Email utility module for sending notifications
 * Replicates Flask-Mail functionality from Python backend
 */

import nodemailer from 'nodemailer'

// Email configuration from environment variables
const SMTP_CONFIG = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASSWORD || '',
    },
}

const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || 'noreply@nobleshipping.com'
const FROM_NAME = process.env.SMTP_FROM_NAME || 'Noble Shipping Company'

// Create reusable transporter
let transporter: nodemailer.Transporter | null = null

function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport(SMTP_CONFIG)
    }
    return transporter
}

/**
 * Send email using configured SMTP settings
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - HTML content of the email
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
    // In development, log email instead of sending
    if (process.env.NODE_ENV === 'development' && !process.env.SMTP_USER) {
        console.log('📧 Email (Development Mode):')
        console.log(`To: ${to}`)
        console.log(`Subject: ${subject}`)
        console.log(`Body: ${html.substring(0, 200)}...`)
        return
    }

    try {
        const transporter = getTransporter()
        const info = await transporter.sendMail({
            from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
            to,
            subject,
            html,
        })
        console.log('📧 Email sent:', info.messageId)
    } catch (error) {
        console.error('Email sending error:', error)
        throw new Error('Failed to send email')
    }
}

/**
 * Send notification when a quote is requested
 */
export async function sendQuoteNotification(quote: {
    service: string
    email_address: string
    first_name: string
    last_name: string
    phone_number?: string
    message?: string
}): Promise<void> {
    const subject = `New Quote Request - ${quote.service}`
    const html = `
    <h2>New Quote Request</h2>
    <p>A new quote request has been submitted:</p>
    <ul>
      <li><strong>Service:</strong> ${quote.service}</li>
      <li><strong>Name:</strong> ${quote.first_name} ${quote.last_name}</li>
      <li><strong>Email:</strong> ${quote.email_address}</li>
      <li><strong>Phone:</strong> ${quote.phone_number || 'N/A'}</li>
    </ul>
    ${quote.message ? `<p><strong>Message:</strong><br>${quote.message}</p>` : ''}
    <p>Please respond to this request as soon as possible.</p>
  `

    // Send to admin email
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@nobleshipping.com'
    await sendEmail(adminEmail, subject, html)
}

/**
 * Send notification when contact form is submitted
 */
export async function sendContactNotification(contact: {
    first_name: string
    last_name: string
    email: string
    phone_number?: string
    message: string
}): Promise<void> {
    const subject = `New Contact Message from ${contact.first_name} ${contact.last_name}`
    const html = `
    <h2>New Contact Form Submission</h2>
    <p>A new contact message has been received:</p>
    <ul>
      <li><strong>Name:</strong> ${contact.first_name} ${contact.last_name}</li>
      <li><strong>Email:</strong> ${contact.email}</li>
      <li><strong>Phone:</strong> ${contact.phone_number || 'N/A'}</li>
    </ul>
    <p><strong>Message:</strong></p>
    <p>${contact.message}</p>
    <p>Please respond to this inquiry promptly.</p>
  `

    // Send to admin email
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@nobleshipping.com'
    await sendEmail(adminEmail, subject, html)
}

/**
 * Send password reset email to user
 */
export async function sendPasswordResetEmail(
    user: { email: string; first_name?: string; last_name?: string },
    resetLink: string
): Promise<void> {
    const name = user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.email

    const subject = 'Password Reset Request - Noble Shipping'
    const html = `
    <h2>Password Reset Request</h2>
    <p>Hello ${name},</p>
    <p>You have requested to reset your password for your Noble Shipping account.</p>
    <p>Click the link below to reset your password:</p>
    <p><a href="${resetLink}" style="background-color: #4e3668; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a></p>
    <p>Or copy and paste this link into your browser:</p>
    <p>${resetLink}</p>
    <p>This link will expire in 1 hour.</p>
    <p>If you did not request this password reset, please ignore this email.</p>
    <p>Best regards,<br>Noble Shipping Team</p>
  `

    await sendEmail(user.email, subject, html)
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(user: {
    email: string
    first_name?: string
    last_name?: string
    user_id?: string
}): Promise<void> {
    const name = user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.email

    const subject = 'Welcome to Noble Shipping Company'
    const html = `
    <h2>Welcome to Noble Shipping!</h2>
    <p>Hello ${name},</p>
    <p>Your account has been successfully created.</p>
    ${user.user_id ? `<p><strong>User ID:</strong> ${user.user_id}</p>` : ''}
    <p><strong>Email:</strong> ${user.email}</p>
    <p>You can now log in to access the admin dashboard and manage shipments.</p>
    <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
    <p>Best regards,<br>Noble Shipping Team</p>
  `

    await sendEmail(user.email, subject, html)
}

/**
 * Send password change notification
 */
export async function sendPasswordChangeNotification(user: {
    email: string
    first_name?: string
    last_name?: string
}): Promise<void> {
    const name = user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.email

    const subject = 'Password Changed - Noble Shipping'
    const html = `
    <h2>Password Changed Successfully</h2>
    <p>Hello ${name},</p>
    <p>Your password has been successfully changed.</p>
    <p>If you did not make this change, please contact us immediately.</p>
    <p>Best regards,<br>Noble Shipping Team</p>
  `

    await sendEmail(user.email, subject, html)
}

/**
 * Send payment confirmation email
 */
export async function sendPaymentConfirmation(
    userEmail: string,
    trackingNumber: string,
    amount: number,
    currency: string
): Promise<void> {
    const subject = 'Payment Confirmation - Noble Shipping'
    const html = `
    <h2>Payment Confirmation</h2>
    <p>Thank you for your payment!</p>
    <ul>
      <li><strong>Tracking Number:</strong> ${trackingNumber}</li>
      <li><strong>Amount:</strong> ${currency.toUpperCase()} ${(amount / 100).toFixed(2)}</li>
    </ul>
    <p>Your payment has been processed successfully.</p>
    <p>You can track your shipment using the tracking number above.</p>
    <p>Best regards,<br>Noble Shipping Team</p>
  `

    await sendEmail(userEmail, subject, html)
}

/**
 * Send admin password reset notification
 */
export async function sendAdminPasswordResetNotification(
    user: { email: string; first_name?: string; last_name?: string },
    adminName: string
): Promise<void> {
    const name = user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.email

    const subject = 'Password Reset by Administrator - Noble Shipping'
    const html = `
    <h2>Password Reset by Administrator</h2>
    <p>Hello ${name},</p>
    <p>Your password has been reset by an administrator (${adminName}).</p>
    <p>Please contact your administrator to receive your new password.</p>
    <p>For security reasons, we recommend changing your password after your first login.</p>
    <p>Best regards,<br>Noble Shipping Team</p>
  `

    await sendEmail(user.email, subject, html)
}
