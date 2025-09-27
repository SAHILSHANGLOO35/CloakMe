import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp
        path="/sign-up" // tells Clerk this is the sign-up page
        routing="path" // full-page routing, not modal
        signInUrl="/sign-in" // optional, link to your sign-in page
        fallbackRedirectUrl="/posts" // replaces deprecated afterSignUpUrl
      />
    </div>
  );
}
