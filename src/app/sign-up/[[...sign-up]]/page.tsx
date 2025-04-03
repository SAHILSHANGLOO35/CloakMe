'use client'

import { SignUp } from '@clerk/nextjs';
import { generateRandomUsername } from '@/lib/generateUsername';
import { isUsernameTaken } from '@/app/actions/usernameActions';

export default function SignUpPage() {
  async function generateUniqueUsername() {
    let isUnique = false;
    let potentialUsername = '';
    
    while (!isUnique) {
      potentialUsername = generateRandomUsername();
      const taken = await isUsernameTaken(potentialUsername);
      if (!taken) {
        isUnique = true;
      }
    }
    
    return potentialUsername;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp 
        path="/sign-up"
        routing="path"
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white',
          }
        }}
        // @ts-ignore
        formFields={[
          { name: 'username', label: 'Username', placeholder: 'Auto-generated', autocomplete: 'username' }
        ]}
        beforeSignUp={async ({ emailAddress, username } : {
          emailAddress: string,
          username: string
        }) => {
          // Only generate a username if one isn't provided
          if (!username) {
            const generatedUsername = await generateUniqueUsername();
            return { username: generatedUsername };
          }
          return {};
        }}
      />
    </div>
  );
}