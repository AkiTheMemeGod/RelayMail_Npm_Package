/**
 * RelayMail Example Usage
 * 
 * This file demonstrates how to use the RelayMail npm package
 */

const { RelayMail } = require('./dist/index.js');
// For TypeScript: import { RelayMail } from 'relaymail';

// Initialize the client
const relaymail = new RelayMail({
  apiKey: 'Ah7Xbb2WEMVnV53shiOEfwVeiv1qofJySZvZcqQmUBQ' // Replace with your actual API key
});

// Example 1: Send a simple plain text email
async function sendPlainTextEmail() {
  try {
    const result = await relaymail.sendText(
      'recipient@example.com',
      'Hello from RelayMail',
      'This is a plain text email sent using the RelayMail package!'
    );
    
    console.log('✅ Plain text email sent successfully!');
    console.log('Email ID:', result.id);
    console.log('Message:', result.message);
  } catch (error) {
    console.error('❌ Failed to send plain text email:', error.message);
  }
}

// Example 2: Send an HTML email
async function sendHtmlEmail() {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .header { background-color: #4CAF50; color: white; padding: 20px; }
            .content { padding: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to RelayMail!</h1>
          </div>
          <div class="content">
            <p>This is a beautifully formatted HTML email.</p>
            <p>You can include rich content, images, and styling!</p>
          </div>
        </body>
      </html>
    `;
    
    const result = await relaymail.sendHtml(
      'recipient@example.com',
      'HTML Email Example',
      htmlContent
    );
    
    console.log('✅ HTML email sent successfully!');
    console.log('Email ID:', result.id);
  } catch (error) {
    console.error('❌ Failed to send HTML email:', error.message);
  }
}

// Example 3: Send multipart email (both plain text and HTML)
async function sendMultipartEmail() {
  try {
    const result = await relaymail.send({
      to: 'recipient@example.com',
      subject: 'Multipart Email Example',
      body: 'This is the plain text version of the email for email clients that don\'t support HTML.',
      html: `
        <html>
          <body>
            <h1>This is the HTML version</h1>
            <p>Email clients that support HTML will see this beautiful version!</p>
          </body>
        </html>
      `
    });
    
    console.log('✅ Multipart email sent successfully!');
    console.log('Email ID:', result.id);
  } catch (error) {
    console.error('❌ Failed to send multipart email:', error.message);
  }
}

// Example 4: Send multiple emails
async function sendBulkEmails() {
  const recipients = [
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
  ];
  
  console.log(`Sending emails to ${recipients.length} recipients...`);
  
  const results = await Promise.allSettled(
    recipients.map(email =>
      relaymail.sendText(
        email,
        'Bulk Email',
        `Hello! This is a personalized email sent to ${email}`
      )
    )
  );
  
  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  console.log(`✅ Successfully sent: ${successful} emails`);
  console.log(`❌ Failed: ${failed} emails`);
}

// Example 5: Error handling
async function demonstrateErrorHandling() {
  try {
    // This will fail because we're missing the body/html
    await relaymail.send({
      to: 'test@example.com',
      subject: 'Missing Body'
      // No body or html provided - will throw error
    });
  } catch (error) {
    console.error('Expected error caught:', error.message);
  }
  
  try {
    // This will fail with invalid API key
    const invalidClient = new RelayMail({
      apiKey: 'invalid-key-12345'
    });
    
    await invalidClient.sendText(
      'test@example.com',
      'Test',
      'This will fail'
    );
  } catch (error) {
    console.error('Expected authentication error:', error.message);
  }
}

// Main execution
async function main() {
  console.log('🚀 RelayMail Examples\n');
  
  // Uncomment the examples you want to run:
  
  await sendPlainTextEmail();
  await sendHtmlEmail();
  await sendMultipartEmail();
  await sendBulkEmails();
  await demonstrateErrorHandling();
  
  console.log('\n✨ Examples completed!');
}

// Run the examples
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  sendPlainTextEmail,
  sendHtmlEmail,
  sendMultipartEmail,
  sendBulkEmails,
  demonstrateErrorHandling
};
