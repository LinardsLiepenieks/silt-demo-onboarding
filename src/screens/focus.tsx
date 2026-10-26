import { HugeiconsIcon } from '@hugeicons/react';
import {
  Alert02Icon,
  Award01Icon,
  Clock01Icon,
  FlashIcon,
  SmileIcon,
  Target02Icon,
  Tick02Icon,
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

const FOCUS_DESCRIPTIONS: Record<Focus, string> = {
  Focus: 'Did you get time for deep work today?',
  Energy: "How's your energy today?",
  Blockers: 'Is anything getting in your way?',
  Wins: 'What went well today?',
  Mood: 'How are you feeling today?',
  Workload: 'Does your workload feel manageable?',
};

export function FocusPicker({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (action: Action) => void;
}) {
  return (
    <Screen
      step="focus"
      dispatch={dispatch}
      footer={
        <PrimaryButton onClick={() => dispatch({ type: 'next' })}>
          Continue
        </PrimaryButton>
      }
    >
      <Heading
        title={`What do you want to keep an eye on${state.name ? `, ${state.name}` : ''}?`}
        hint={`Your daily check-in asks about the ones you pick. Choose up to ${FOCUS_MAX}.`}
      />
      <div className="mt-6 flex flex-col gap-2">
        {FOCUS_OPTIONS.map((focus) => (
          // A native checkbox, so the chip still toggles where no script runs.
          <label
            key={focus}
            className="chip relative flex h-[68px] cursor-pointer items-center gap-3 rounded-card bg-raised px-4 select-none"
          >
            <input
              type="checkbox"
              className="chip-input sr-only"
              defaultChecked={state.focus.includes(focus)}
              onClick={(event) => {
                const full =
                  state.focus.length >= FOCUS_MAX &&
                  !state.focus.includes(focus);
                if (full) event.preventDefault();
                else dispatch({ type: 'toggleFocus', focus });
              }}
            />
            <span className="chip-ring pointer-events-none absolute inset-0 rounded-card" />
            <HugeiconsIcon
              icon={FOCUS_ICONS[focus]}
              size={22}
              className="chip-icon shrink-0 text-muted"
            />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[15px] leading-5 font-medium text-ink">
                {focus}
              </span>
              <span className="truncate text-[13px] leading-5 text-muted">
                {FOCUS_DESCRIPTIONS[focus]}
              </span>
            </span>
            <span className="chip-check flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
              <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2.5} />
            </span>
          </label>
        ))}
      </div>
    </Screen>
  );
}
