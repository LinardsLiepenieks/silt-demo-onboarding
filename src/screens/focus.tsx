import { HugeiconsIcon } from '@hugeicons/react';
import {
  Alert02Icon,
  Award01Icon,
  Clock01Icon,
  FlashIcon,
  SmileIcon,
  Target02Icon,
} from '@hugeicons/core-free-icons';
import {
  FOCUS_MAX,
  FOCUS_OPTIONS,
  type Action,
  type Focus,
  type State,
} from '../onboarding';
import { Heading, PrimaryButton, Screen } from '../components/ui';

export const FOCUS_ICONS: Record<Focus, typeof FlashIcon> = {
  Focus: Target02Icon,
  Energy: FlashIcon,
  Blockers: Alert02Icon,
  Wins: Award01Icon,
  Mood: SmileIcon,
  Workload: Clock01Icon,
};

export function FocusPicker({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (action: Action) => void;
}) {
  const full = state.focus.length >= FOCUS_MAX;
  return (
    <Screen
      step="focus"
      dispatch={dispatch}
      footer={
        <PrimaryButton
          disabled={!state.focus.length}
          onClick={() => dispatch({ type: 'next' })}
        >
          Continue
        </PrimaryButton>
      }
    >
      <Heading
        title={`What do you want to keep an eye on${state.name ? `, ${state.name}` : ''}?`}
        hint={`Pick up to ${FOCUS_MAX}. You can change these later.`}
      />
      <div className="mt-8 grid grid-cols-2 gap-3">
        {FOCUS_OPTIONS.map((focus) => {
          const on = state.focus.includes(focus);
          return (
            <button
              key={focus}
              type="button"
              aria-pressed={on}
              disabled={!on && full}
              onClick={() => dispatch({ type: 'toggleFocus', focus })}
              className={`flex h-24 flex-col justify-between rounded-card p-4 text-left transition-[background-color,box-shadow,opacity] disabled:opacity-40 ${
                on
                  ? 'bg-raised shadow-[inset_0_0_0_2px_var(--color-accent),0_1px_2px_rgb(0_0_0/4%)]'
                  : 'bg-raised/70 shadow-[0_1px_2px_rgb(0_0_0/4%)] hover:bg-raised'
              }`}
            >
              <HugeiconsIcon
                icon={FOCUS_ICONS[focus]}
                size={22}
                className={on ? 'text-accent' : 'text-muted'}
              />
              <span className="text-[15px] font-medium text-ink">{focus}</span>
            </button>
          );
        })}
      </div>
    </Screen>
  );
}
