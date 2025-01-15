# Secret Message

Secret Message is a platform for asking and answering questions anonymously. It's built using modern web technologies to ensure a seamless and secure experience.

## Project Demo

Check out the live application here: [Secret Message](https://secretmessage-sigma-flame.vercel.app/)
## Features

*   **Next.js:** Fast, server-rendered React application framework.
*   **Authentication:** Secure user authentication powered by Clerk.
*   **Tailwind CSS:** Modern utility-first CSS framework for responsive styling.
*   **Shadcn:** Modern ui for the application.
*   **Zustand:** Manage state and access functions.
*   **Sanity:** Schema-based database and cms for the project.
*   **Stripe:** For payment.
*   **Hosting:** Hosted on Vercel for lightning-fast performance.


## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/ecom-app.git
    cd ecom-app
    ```
2.  Install dependencies:

    ```bash
    npm install
    ```
3.  Set up environment variables:
    *   Create a `.env.local` file in the root of your project and add the following:

```bash
Next.js Public Environment Variables
- `NEXT_PUBLIC_SANITY_DATASET="production"`
- `NEXT_PUBLIC_SANITY_PROJECT_ID="vspn9fl9"`
- `NEXT_PUBLIC_BASE_URL="http://localhost:3000"`

### Sanity Studio Configuration
- `SANITY_STUDIO_PROJECT_ID="vspn9fl9"`
- `SANITY_STUDIO_DATASET="production"`
- `SANITY_API_TOKEN="<your_sanity_api_token>"`
- `SANITY_API_READ_TOKEN="<your_sanity_read_token>"`

### Clerk Configuration
- `CLERK_SECRET_KEY="<your_clerk_secret_key>"`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<your_clerk_publishable_key>"`

### Stripe Configuration
- `STRIPE_SECRET_KEY="<your_stripe_secret_key>"`
- `STRIPE_WEBHOOK_SECRET="<your_stripe_webhook_secret>"`
```

4.  Start the development server:

    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

*   **Frontend:** Next.js, React, Tailwind CSS, Shadcn/ui
*   **Authentication:** NextAuth.js
*   **Email:** Resend
*   **Form Management:** React Hook Form, Zod
*   **Database:** MongoDB (via Mongoose)
*   **AI:** Gemini AI for question generation
*   **Hosting:** Vercel

