import { useCallback, useEffect, useReducer } from 'react';
import { flushSync } from 'react-dom';
import {
  STEPS,
  initialState,
  reducer,
  stepFromHash,
  type Action,
  type State,
} from './onboarding';
import { Welcome } from './screens/welcome';
import { Name } from './screens/name';
import { FocusPicker } from './screens/focus';
import { InviteTeam } from './screens/invite';
import { Home } from './screens/home';

const moves = (action: Action) =>
  action.type === 'go' || action.type === 'next' || action.type === 'back';

export function App() {
  const [state, send] = useReducer(
    reducer,
    stepFromHash(window.location.hash),
    initialState,
  );

  // Changing step slides between screens; every other action applies at once.
  const dispatch = useCallback(
    (action: Action) => {
      if (!moves(action) || !document.startViewTransition) {
        send(action);
        return;
      }
      const from = STEPS.indexOf(state.step);
      const to = STEPS.indexOf(reducer(state, action).step);
      if (from === to) return;
      document.documentElement.style.setProperty(
        '--direction',
        to > from ? '1' : '-1',
      );
      document.startViewTransition(() => flushSync(() => send(action)));
    },
    [state],
  );

  // The step lives in the URL too, so a link opens any screen directly.
  useEffect(() => {
    const target = `#/${state.step}`;
    if (window.location.hash !== target)
      window.history.replaceState(null, '', target);
  }, [state.step]);

  useEffect(() => {
    const onHash = () => {
      const step = stepFromHash(window.location.hash);
      if (step) send({ type: 'go', step });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <main className="flex min-h-dvh [view-transition-name:screen]">
      <Current state={state} dispatch={dispatch} />
    </main>
  );
}

function Current({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (action: Action) => void;
}) {
  switch (state.step) {
    case 'welcome':
      return <Welcome dispatch={dispatch} />;
    case 'name':
      return <Name state={state} dispatch={dispatch} />;
    case 'focus':
      return <FocusPicker state={state} dispatch={dispatch} />;
    case 'invite':
      return <InviteTeam state={state} dispatch={dispatch} />;
    case 'home':
      return <Home state={state} />;
  }
}
