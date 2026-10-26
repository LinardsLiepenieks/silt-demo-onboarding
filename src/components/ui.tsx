import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { STEPS, type Action, type Step } from '../onboarding';

const TINTS: Record<Step, string> = {
  welcome: 'from-lavender/45 via-page to-page',
  name: 'from-butter/35 via-page to-page',
  focus: 'from-mint/35 via-page to-page',
  invite: 'from-ivory via-page to-page',
  home: 'from-page to-page',
};

/** One onboarding screen: its tint, back control, content and footer. */
export function Screen({
  step,
  dispatch,
  children,
  footer,
}: {
  step: Step;
  dispatch?: (action: Action) => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const index = STEPS.indexOf(step);
  return (
    <section
      className={`flex min-h-dvh w-full flex-col bg-gradient-to-b px-6 pt-5 pb-8 ${TINTS[step]}`}
    >
      <header className="flex h-10 items-center justify-between">
        {dispatch && index > 0 ? (
          <button
            type="button"
            aria-label="Back"
            onClick={() => dispatch({ type: 'back' })}
            className="flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-raised hover:text-emphasis"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
          </button>
        ) : (
          <span className="size-10" />
        )}
        <Progress index={index} />
        <span className="size-10" />
      </header>
      <div className="rise flex flex-1 flex-col">{children}</div>
      {footer ? <footer className="mt-6 flex flex-col gap-3">{footer}</footer> : null}
    </section>
  );
}

function Progress({ index }: { index: number }) {
  const steps = STEPS.length - 1;
  if (index >= steps) return null;
  return (
    <div className="flex gap-1.5" aria-hidden>
      {Array.from({ length: steps }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-ink' : 'w-1.5 bg-ink/15'}`}
        />
      ))}
    </div>
  );
}

export function PrimaryButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className="h-13 w-full rounded-full bg-accent text-[15px] font-medium text-white shadow-[inset_0_1px_1px_rgb(255_255_255/18%),0_6px_16px_-6px_rgb(0_167_244/55%)] transition-[opacity,transform] active:scale-[0.98] disabled:opacity-35 disabled:shadow-none"
    >
      {children}
    </button>
  );
}

export function QuietButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className="h-10 text-sm text-muted transition-colors hover:text-emphasis"
    >
      {children}
    </button>
  );
}

export function Heading({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="mt-10 flex flex-col gap-2">
      <h1 className="text-[28px] leading-[34px] font-medium tracking-[-0.01em] text-ink">
        {title}
      </h1>
      {hint ? <p className="text-[15px] leading-6 text-muted">{hint}</p> : null}
    </div>
  );
}
