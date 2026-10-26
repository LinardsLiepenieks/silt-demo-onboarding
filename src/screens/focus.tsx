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
        hint={`Pick up to ${FOCUS_MAX}. You can change these later.`}
      />
      <div className="mt-8 grid grid-cols-2 gap-3">
        {FOCUS_OPTIONS.map((focus) => (
          // A native checkbox, so the chip still toggles where no script runs.
          <label
            key={focus}
            className="chip relative flex h-24 cursor-pointer flex-col justify-between rounded-card bg-raised/70 p-4 select-none"
          >
            <input
              type="checkbox"
              className="sr-only"
              defaultChecked={state.focus.includes(focus)}
              onClick={(event) => {
                const full =
                  state.focus.length >= FOCUS_MAX &&
                  !state.focus.includes(focus);
                if (full) event.preventDefault();
                else dispatch({ type: 'toggleFocus', focus });
              }}
            />
            <HugeiconsIcon
              icon={FOCUS_ICONS[focus]}
              size={22}
              className="chip-icon origin-left text-muted"
            />
            <span className="chip-check absolute top-4 right-4 flex size-5 items-center justify-center rounded-full bg-accent text-white">
              <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2.5} />
            </span>
            <span className="text-[15px] font-medium text-ink">{focus}</span>
          </label>
        ))}
      </div>
    </Screen>
  );
}
