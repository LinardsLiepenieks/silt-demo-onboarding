import type { Action, State } from '../onboarding';
import { Heading, PrimaryButton, Screen } from '../components/ui';

export function Name({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (action: Action) => void;
}) {
  const ready = state.name.trim().length > 0;
  return (
    <Screen
      step="name"
      dispatch={dispatch}
      footer={
        <PrimaryButton
          disabled={!ready}
          onClick={() => dispatch({ type: 'next' })}
        >
          Continue
        </PrimaryButton>
      }
    >
      <Heading
        title="Nice to meet you. What should we call you?"
        hint="Your team sees this next to your check-ins."
      />
      <input
        autoFocus
        value={state.name}
        onChange={(event) =>
          dispatch({ type: 'name', name: event.target.value })
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter' && ready) dispatch({ type: 'next' });
        }}
        placeholder="Your first name"
        className="mt-8 h-14 rounded-card bg-raised px-5 text-[17px] text-ink shadow-[0_1px_2px_rgb(0_0_0/4%)] outline-none placeholder:text-faint focus:shadow-[inset_0_0_0_2px_var(--color-accent)]"
      />
    </Screen>
  );
}
