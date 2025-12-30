# RelayMail NPM Package

This directory contains the **relaymail** npm package - a Node.js/TypeScript client for sending emails through the RelayMail API.

## Project Structure

```
.
├── src/                    # TypeScript source files
│   ├── index.ts           # Main RelayMail client class
│   └── types.ts           # TypeScript type definitions
├── dist/                  # Compiled JavaScript (generated after build)
├── app.py                 # Flask server (RelayMail API)
├── package.json           # NPM package configuration
├── tsconfig.json          # TypeScript configuration
├── README.md              # Package documentation
├── examples.js            # Usage examples
└── LICENSE                # MIT License

```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Package

```bash
npm run build
```

This compiles the TypeScript source code in `src/` to JavaScript in `dist/`.

### 3. Test Locally

You can test the package locally before publishing:

```bash
# In this directory
npm link

# In another project directory
npm link relaymail

# Now you can use it in that project
```

### 4. Publish to NPM

```bash
# Login to npm (first time only)
npm login

# Publish the package
npm publish
```

## Using the Package

After publishing, anyone can install it:

```bash
npm install relaymail
```

Then use it in their code:

```javascript
const { RelayMail } = require('relaymail');

const client = new RelayMail({
  apiKey: 'your-api-key'
});

await client.sendText(
  'recipient@example.com',
  'Hello',
  'This is a test email'
);
```

## Development

- **Source code**: Edit files in `src/`
- **Build**: Run `npm run build` to compile TypeScript
- **Test**: Use `examples.js` to test functionality

## Server Setup

The RelayMail API server (`app.py`) must be running for the package to work:

```bash
# Start the Flask server
python app.py
```

The server will run on `http://localhost:5001` by default.

## Documentation

See [README.md](README.md) for full API documentation and usage examples.
