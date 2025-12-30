# RelayMail

A simple and reliable Node.js client for sending emails through the RelayMail API.

## Installation

```bash
npm install relaymail
```

## Quick Start

```javascript
const { RelayMail } = require('relaymail');

// Initialize the client
const relaymail = new RelayMail({
  apiKey: 'your-api-key-here'
});

// Send an email
async function sendEmail() {
  try {
    const result = await relaymail.send({
      to: 'recipient@example.com',
      subject: 'Hello from RelayMail!',
      body: 'This is a test email sent using the RelayMail npm package.'
    });
    
    console.log('Email sent successfully!', result);
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
}

sendEmail();
```

## TypeScript Support

This package is written in TypeScript and includes full type definitions.

```typescript
import { RelayMail, EmailOptions } from 'relaymail';

const relaymail = new RelayMail({
  apiKey: process.env.RELAYMAIL_API_KEY!
});

const emailOptions: EmailOptions = {
  to: 'recipient@example.com',
  subject: 'TypeScript Email',
  html: '<h1>Hello from TypeScript!</h1>'
};

await relaymail.send(emailOptions);
```

## API Reference

### Constructor

```typescript
new RelayMail(config: RelayMailConfig)
```

**Parameters:**
- `config.apiKey` (string, required): Your RelayMail API key

### Methods

#### `send(options: EmailOptions): Promise<EmailResponse>`

Send an email with custom options.

**Parameters:**
- `options.to` (string, required): Recipient email address
- `options.subject` (string, required): Email subject line
- `options.body` (string, optional): Plain text email body
- `options.html` (string, optional): HTML email body

**Note:** You must provide at least one of `body` or `html`. You can provide both for a multipart email.

**Returns:** Promise resolving to an object with:
- `id` (number): Email log ID
- `message` (string): Success message

**Example:**
```javascript
const result = await relaymail.send({
  to: 'user@example.com',
  subject: 'Welcome!',
  body: 'Plain text content',
  html: '<h1>HTML content</h1>'
});
```

#### `sendText(to: string, subject: string, body: string): Promise<EmailResponse>`

Convenience method for sending plain text emails.

**Example:**
```javascript
await relaymail.sendText(
  'user@example.com',
  'Hello',
  'This is a plain text email'
);
```

#### `sendHtml(to: string, subject: string, html: string): Promise<EmailResponse>`

Convenience method for sending HTML emails.

**Example:**
```javascript
await relaymail.sendHtml(
  'user@example.com',
  'Newsletter',
  '<h1>Welcome to our newsletter!</h1><p>Content here...</p>'
);
```

## Usage Examples

### Sending a Plain Text Email

```javascript
const { RelayMail } = require('relaymail');

const client = new RelayMail({ apiKey: 'your-api-key' });

await client.sendText(
  'recipient@example.com',
  'Simple Email',
  'This is a simple plain text email.'
);
```

### Sending an HTML Email

```javascript
await client.sendHtml(
  'recipient@example.com',
  'HTML Newsletter',
  `
    <html>
      <body>
        <h1>Welcome!</h1>
        <p>This is a beautiful HTML email.</p>
      </body>
    </html>
  `
);
```

### Sending Both Plain Text and HTML

```javascript
await client.send({
  to: 'recipient@example.com',
  subject: 'Multipart Email',
  body: 'This is the plain text version.',
  html: '<h1>This is the HTML version</h1>'
});
```

### Error Handling

```javascript
try {
  await client.send({
    to: 'invalid-email',
    subject: 'Test',
    body: 'Content'
  });
} catch (error) {
  if (error.message.includes('RelayMail Error')) {
    console.error('API Error:', error.message);
  } else if (error.message.includes('Network Error')) {
    console.error('Network issue:', error.message);
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

### Using Environment Variables

```javascript
require('dotenv').config();

const relaymail = new RelayMail({
  apiKey: process.env.RELAYMAIL_API_KEY
});
```

## Getting Your API Key

1. Sign up or log in to your RelayMail dashboard
2. Navigate to the API Keys section
3. Create a new API key
4. Copy the key and use it in your application

**Important:** Keep your API key secret and never commit it to version control.

## Requirements

- Node.js >= 14.0.0

## License

MIT

## Support

For issues and questions:
- GitHub Issues: [Report a bug](https://github.com/AkiTheMemeGod/RelayMail_Npm/issues)
- Email: relaymailingservices@gmail.com

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
