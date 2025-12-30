/**
 * RelayMail Email Sending Options
 */
export interface EmailOptions {
  /** Recipient email address */
  to: string;
  /** Email subject line */
  subject: string;
  /** Plain text email body (optional if html is provided) */
  body?: string;
  /** HTML email body (optional if body is provided) */
  html?: string;
}

/**
 * RelayMail Client Configuration
 */
export interface RelayMailConfig {
  /** Your RelayMail API key */
  apiKey: string;
}

/**
 * Email sending response
 */
export interface EmailResponse {
  /** Email log ID */
  id: number;
  /** Success message */
  message: string;
}

/**
 * Error response from the API
 */
export interface ErrorResponse {
  /** Error message */
  error: string;
}
