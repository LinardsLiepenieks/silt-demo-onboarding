import type { Action } from '../onboarding';
import { PrimaryButton, QuietButton, Screen } from '../components/ui';

export function Welcome({ dispatch }: { dispatch: (action: Action) => void }) {
  return (
    <Screen
      step="welcome"
      footer={
        <>
          <PrimaryButton onClick={() => dispatch({ type: 'next' })}>
            Get started
          </PrimaryButton>
          <QuietButton>I already have an account</QuietButton>
        </>
      }
    >
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <img src="/flower-static.svg" alt="" className="size-40" />
        <h1 className="mt-8 text-[32px] leading-[38px] font-medium tracking-[-0.01em] text-ink">
          Hi, I'm Tend
        </h1>
        <p className="mt-3 max-w-[280px] text-[15px] leading-6 text-muted">
          A two-minute daily check-in for you and the people you work with.
        </p>
      </div>
    </Screen>
  );
}
