import axios, { AxiosInstance, AxiosError } from 'axios';
import { EmailOptions, RelayMailConfig, EmailResponse, ErrorResponse } from './types';

/**
 * RelayMail Client - Send emails through the RelayMail API
 */
export class RelayMail {
  private apiKey: string;
  private client: AxiosInstance;

  /**
   * Create a new RelayMail client
   * @param config - Configuration object with API key
   * @example
   * ```typescript
   * const relaymail = new RelayMail({
   *   apiKey: 'your-api-key-here'
   * });
   * ```
   */
  constructor(config: RelayMailConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    this.apiKey = config.apiKey;
    const baseUrl = 'https://relaymail.pythonanywhere.com';

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      timeout: 30000 // 30 seconds timeout
    });
  }

  /**
   * Send an email
   * @param options - Email options including recipient, subject, and body/html
   * @returns Promise resolving to email response with ID and message
   * @throws Error if the email fails to send
   * @example
   * ```typescript
   * // Send plain text email
   * await relaymail.send({
   *   to: 'recipient@example.com',
   *   subject: 'Hello World',
   *   body: 'This is a plain text email'
   * });
   *
   * // Send HTML email
   * await relaymail.send({
   *   to: 'recipient@example.com',
   *   subject: 'Hello World',
   *   html: '<h1>This is an HTML email</h1>'
   * });
   *
   * // Send email with both plain text and HTML
   * await relaymail.send({
   *   to: 'recipient@example.com',
   *   subject: 'Hello World',
   *   body: 'Plain text version',
   *   html: '<h1>HTML version</h1>'
   * });
   * ```
   */
  async send(options: EmailOptions): Promise<EmailResponse> {
    // Validation
    if (!options.to) {
      throw new Error('Recipient email address (to) is required');
    }

    if (!options.subject) {
      throw new Error('Email subject is required');
    }

    if (!options.body && !options.html) {
      throw new Error('Email content is required. Provide either "body" (text) or "html"');
    }

    try {
      const response = await this.client.post<EmailResponse>('/api/v1/send', {
        to: options.to,
        subject: options.subject,
        body: options.body,
        html: options.html
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.data?.error) {
          throw new Error(`RelayMail Error: ${axiosError.response.data.error}`);
        }
        throw new Error(`Network Error: ${axiosError.message}`);
      }
      throw error;
    }
  }

  /**
   * Send a plain text email (convenience method)
   * @param to - Recipient email address
   * @param subject - Email subject
   * @param body - Plain text email body
   * @returns Promise resolving to email response
   */
  async sendText(to: string, subject: string, body: string): Promise<EmailResponse> {
    return this.send({ to, subject, body });
  }

  /**
   * Send an HTML email (convenience method)
   * @param to - Recipient email address
   * @param subject - Email subject
   * @param html - HTML email body
   * @returns Promise resolving to email response
   */
  async sendHtml(to: string, subject: string, html: string): Promise<EmailResponse> {
    return this.send({ to, subject, html });
  }
}
