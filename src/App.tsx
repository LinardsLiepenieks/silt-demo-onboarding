import { useEffect, useReducer } from 'react';
import { initialState, reducer, stepFromHash } from './onboarding';
import { Welcome } from './screens/welcome';
import { Name } from './screens/name';
import { FocusPicker } from './screens/focus';
import { InviteTeam } from './screens/invite';
import { Home } from './screens/home';

export function App() {
  const [state, dispatch] = useReducer(
    reducer,
    stepFromHash(window.location.hash),
    initialState,
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
      if (step) dispatch({ type: 'go', step });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const screen = {
    welcome: <Welcome dispatch={dispatch} />,
    name: <Name state={state} dispatch={dispatch} />,
    focus: <FocusPicker state={state} dispatch={dispatch} />,
    invite: <InviteTeam state={state} dispatch={dispatch} />,
    home: <Home state={state} />,
  }[state.step];

  return (
    <main className="flex min-h-dvh justify-center">
      <div key={state.step} className="flex w-full max-w-[430px]">
        {screen}
      </div>
    </main>
  );
}
