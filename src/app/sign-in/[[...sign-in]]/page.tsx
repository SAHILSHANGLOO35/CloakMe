import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn
        path="/sign-in" // ensures Clerk knows the route
        routing="path" // uses page routing, not modal
        signUpUrl="/sign-up" // optional, links to your sign-up page
        fallbackRedirectUrl="/posts" // replaces deprecated afterSignInUrl
      />
    </div>
  );
}
