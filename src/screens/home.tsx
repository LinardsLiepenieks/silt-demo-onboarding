import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowRight01Icon,
  Fire02Icon,
  UserAdd01Icon,
} from '@hugeicons/core-free-icons';
import { validEmail, type State } from '../onboarding';
import { Screen } from '../components/ui';
import { FOCUS_ICONS } from './focus';

function greeting(hour = new Date().getHours()) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function Home({ state }: { state: State }) {
  const invited = state.invites.filter((invite) => validEmail(invite.email));
  const focus = state.focus.length ? state.focus : (['Focus', 'Energy'] as const);
  return (
    <Screen step="home">
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-[15px] text-muted">{greeting()},</p>
          <h1 className="text-[28px] leading-[34px] font-medium tracking-[-0.01em] text-ink">
            {state.name.trim() || 'there'}
          </h1>
        </div>
        <span className="flex h-8 items-center gap-1.5 rounded-full bg-raised px-3 text-[13px] text-emphasis shadow-[0_1px_2px_rgb(0_0_0/4%)]">
          <HugeiconsIcon icon={Fire02Icon} size={16} className="text-accent" />
          Day 1
        </span>
      </div>

      <article className="lift mt-6 overflow-hidden rounded-card bg-raised p-5 shadow-[0_1px_2px_rgb(0_0_0/4%)]">
        <div className="flex items-center gap-3">
          <img src="/flower-static.svg" alt="" className="size-12" />
          <div>
            <h2 className="text-[17px] font-medium text-ink">
              Today's check-in
            </h2>
            <p className="text-sm text-muted">Takes about two minutes</p>
          </div>
        </div>
        <button
          type="button"
          className="press ripple mt-5 flex h-12 w-full items-center justify-between rounded-full bg-accent pr-2 pl-5 text-[15px] font-medium text-white"
        >
          Start check-in
          <span className="flex size-8 items-center justify-center rounded-full bg-white/20">
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
          </span>
        </button>
      </article>

      <h3 className="mt-8 text-[13px] font-medium text-muted">Your focus</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {focus.map((item) => (
          <span
            key={item}
            className="press flex h-9 items-center gap-2 rounded-full bg-raised px-3.5 text-sm text-emphasis shadow-[0_1px_2px_rgb(0_0_0/4%)]"
          >
            <HugeiconsIcon icon={FOCUS_ICONS[item]} size={16} className="text-muted" />
            {item}
          </span>
        ))}
      </div>

      <h3 className="mt-8 text-[13px] font-medium text-muted">Team</h3>
      <article className="lift mt-3 rounded-card bg-raised p-5 shadow-[0_1px_2px_rgb(0_0_0/4%)]">
        {invited.length ? (
          <ul className="flex flex-col gap-3">
            {invited.map((invite) => (
              <li key={invite.email} className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-lavender/50 text-sm font-medium text-ink">
                  {invite.email[0].toUpperCase()}
                </span>
                <span className="flex-1 truncate text-sm text-emphasis">
                  {invite.email}
                </span>
                <span className="text-xs text-faint">Invited</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-inset text-muted">
              <HugeiconsIcon icon={UserAdd01Icon} size={20} />
            </span>
            <div className="flex-1">
              <p className="text-[15px] font-medium text-ink">
                No one here yet
              </p>
              <p className="text-sm text-muted">
                Check-ins are better together.
              </p>
            </div>
          </div>
        )}
      </article>
    </Screen>
  );
}
