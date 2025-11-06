'use client';

import signInAction from "@/app/actions/signin-actions";
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/global-components/button";
import { useActionState } from "react";
import { useSearchParams } from 'next/navigation';

export default function SignupForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/home';
    const [errorMessage, formAction, isPending] = useActionState(
        signInAction,
        undefined
    );

    return (
        <form action={formAction}>
            <h1 className="mb-3 text-3xl">Please sign in to continue.</h1>
            <div className="">
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-white"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-3 pl-10 text-sm outline-2 placeholder:text-gray-400"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                        />
                        <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 peer-focus:text-white" />
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-white"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-3 pl-10 text-sm outline-2 placeholder:text-gray-400"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            minLength={6}
                        />
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 peer-focus:text-white" />
                    </div>
                </div>
            </div>
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <Button className="mt-4 w-full" aria-disabled={isPending}>
                Sign in 
                <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>
        </form>
    );
}
