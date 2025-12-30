/**
 * Local Test File for RelayMail Package
 * 
 * This file tests the relaymail package locally before publishing
 */

const { RelayMail } = require('./dist/index.js');

// Initialize the client with your API key
const relaymail = new RelayMail({
  apiKey: 'Ah7Xbb2WEMVnV53shiOEfwVeiv1qofJySZvZcqQmUBQ' // Replace with your actual API key from the dashboard
});

// Test 1: Send a simple plain text email
async function testPlainTextEmail() {
  console.log('\n🧪 Test 1: Sending plain text email...');
  try {
    const result = await relaymail.sendText(
      'recipient@example.com', // Replace with a real email address
      'Test Email from RelayMail',
      'This is a test email sent from the RelayMail npm package!'
    );
    
    console.log('✅ Success!');
    console.log('   Email ID:', result.id);
    console.log('   Message:', result.message);
    return true;
  } catch (error) {
    console.error('❌ Failed:', error.message);
    return false;
  }
}

// Test 2: Send an HTML email
async function testHtmlEmail() {
  console.log('\n🧪 Test 2: Sending HTML email...');
  try {
    const htmlContent = `
      <html>
        <body>
          <h1 style="color: #4CAF50;">Hello from RelayMail!</h1>
          <p>This is a <strong>test HTML email</strong>.</p>
          <p>Package is working correctly! 🎉</p>
        </body>
      </html>
    `;
    
    const result = await relaymail.sendHtml(
      'recipient@example.com', // Replace with a real email address
      'HTML Test Email',
      htmlContent
    );
    
    console.log('✅ Success!');
    console.log('   Email ID:', result.id);
    return true;
  } catch (error) {
    console.error('❌ Failed:', error.message);
    return false;
  }
}

// Test 3: Send multipart email (both text and HTML)
async function testMultipartEmail() {
  console.log('\n🧪 Test 3: Sending multipart email...');
  try {
    const result = await relaymail.send({
      to: 'recipient@example.com', // Replace with a real email address
      subject: 'Multipart Test Email',
      body: 'This is the plain text version.',
      html: '<h1>This is the HTML version</h1><p>Both formats included!</p>'
    });
    
    console.log('✅ Success!');
    console.log('   Email ID:', result.id);
    return true;
  } catch (error) {
    console.error('❌ Failed:', error.message);
    return false;
  }
}

// Test 4: Test error handling (missing body)
async function testErrorHandling() {
  console.log('\n🧪 Test 4: Testing error handling...');
  try {
    await relaymail.send({
      to: 'test@example.com',
      subject: 'Missing Body'
      // No body or html - should throw error
    });
    console.error('❌ Should have thrown an error!');
    return false;
  } catch (error) {
    console.log('✅ Error caught correctly:', error.message);
    return true;
  }
}

// Test 5: Test invalid API key
async function testInvalidApiKey() {
  console.log('\n🧪 Test 5: Testing invalid API key...');
  try {
    const invalidClient = new RelayMail({
      apiKey: 'invalid-key-12345'
    });
    
    await invalidClient.sendText(
      'test@example.com',
      'Test',
      'This should fail'
    );
    console.error('❌ Should have thrown an error!');
    return false;
  } catch (error) {
    console.log('✅ Error caught correctly:', error.message);
    return true;
  }
}

// Main test runner
async function runTests() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  RelayMail Package - Local Test Suite  ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('\n📝 Make sure to:');
  console.log('   1. Replace "your-api-key-here" with your actual API key');
  console.log('   2. Replace "recipient@example.com" with a real email address');
  console.log('   3. Make sure the server is accessible at https://relaymail.pythonanywhere.com');
  
  const results = {
    passed: 0,
    failed: 0
  };
  
  // Run tests
  const tests = [
    { name: 'Plain Text Email', fn: testPlainTextEmail },
    { name: 'HTML Email', fn: testHtmlEmail },
    { name: 'Multipart Email', fn: testMultipartEmail },
    { name: 'Error Handling', fn: testErrorHandling },
    { name: 'Invalid API Key', fn: testInvalidApiKey }
  ];
  
  for (const test of tests) {
    const passed = await test.fn();
    if (passed) {
      results.passed++;
    } else {
      results.failed++;
    }
  }
  
  // Summary
  console.log('\n' + '═'.repeat(50));
  console.log('📊 Test Summary:');
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log('═'.repeat(50));
  
  if (results.failed === 0) {
    console.log('\n🎉 All tests passed! Package is ready to use!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
}

// Run the tests
runTests().catch(console.error);
