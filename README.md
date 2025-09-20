# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/45963358-a6a4-4ed4-8bca-6816f260fef2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/45963358-a6a4-4ed4-8bca-6816f260fef2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables (create .env.local)
# See Environment Configuration section below

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Environment Configuration

This project uses Web3Forms for the contact form functionality. To set up the contact form:

### 1. Get Web3Forms Access Key

1. Visit [Web3Forms.com](https://web3forms.com)
2. Sign up for a free account
3. Create a new form and get your access key
4. Configure the form to send emails to `welcome@vibe-llm.online`

### 2. Set Environment Variable

Create a `.env.local` file in the project root and add:

```bash
REACT_APP_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

**Note**: The `.env.local` file should not be committed to Git as it contains sensitive information.

### 3. Web3Forms Features Used

- **Free Tier**: 250 submissions per month
- **Subject Prefix**: `[VibeLLM-ContactUs]` automatically added
- **Recipient**: All emails go to `welcome@vibe-llm.online`
- **GDPR Compliant**: No data stored on Web3Forms servers

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Web3Forms (for contact form)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/45963358-a6a4-4ed4-8bca-6816f260fef2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
