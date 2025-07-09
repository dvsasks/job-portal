import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusinessIcon, Heart, PenBox, PencilLine } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const Header = () => {
  const [showSignIN, setShowSignIn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("sign-in")) setShowSignIn(true);
  }, [searchParams]);
  const { isSignedIn, user } = useUser();

  function handleSignInOverLay(e) {
    e.target === e.currentTarget && setShowSignIn(false);
  }
  return (
    <>
      <header className="flex justify-between px-6 py-4 h-12x">
        <div>
          <p className="text-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            <Link to="/">
              let's <span className="text-6xl font-serif">find</span>
            </Link>
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {" "}
          {user?.unsafeMetadata?.role === "recruiter" && (
            <Button variant="destructive">
              post job <PencilLine />
            </Button>
          )}
          <SignedOut>
            <Button variant="outline" onClick={(e) => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "w-18 h-18" } }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  href="/my-jobs"
                  labelIcon={<BriefcaseBusinessIcon size={15} />}
                  label="my jobs"
                />

                <UserButton.Link
                  label="saved jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />

                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </header>
      {!isSignedIn && showSignIN && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-transparent"
          onClick={handleSignInOverLay}
        >
          {" "}
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
