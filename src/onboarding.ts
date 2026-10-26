export const STEPS = ['welcome', 'name', 'focus', 'invite', 'home'] as const;
export type Step = (typeof STEPS)[number];

export const FOCUS_OPTIONS = [
  'Focus',
  'Energy',
  'Blockers',
  'Wins',
  'Mood',
  'Workload',
] as const;
export type Focus = (typeof FOCUS_OPTIONS)[number];
export const FOCUS_MAX = 3;

export const INVITE_SLOTS = 4;
export const INVITES_REQUIRED = 3;
export const ROLES = ['Member', 'Admin', 'Viewer'] as const;
export type Invite = { email: string; role: (typeof ROLES)[number] };

export type State = {
  step: Step;
  name: string;
  focus: Focus[];
  invites: Invite[];
};

export type Action =
  | { type: 'go'; step: Step }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'name'; name: string }
  | { type: 'toggleFocus'; focus: Focus }
  | { type: 'invite'; index: number; invite: Partial<Invite> };

export const initialState = (step: Step = 'welcome'): State => ({
  step,
  name: '',
  focus: [],
  invites: Array.from({ length: INVITE_SLOTS }, () => ({
    email: '',
    role: 'Member',
  })),
});

const move = (step: Step, by: number): Step =>
  STEPS[Math.min(STEPS.length - 1, Math.max(0, STEPS.indexOf(step) + by))];

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'go':
      return { ...state, step: action.step };
    case 'next':
      return { ...state, step: move(state.step, 1) };
    case 'back':
      return { ...state, step: move(state.step, -1) };
    case 'name':
      return { ...state, name: action.name };
    case 'toggleFocus': {
      const on = state.focus.includes(action.focus);
      if (!on && state.focus.length >= FOCUS_MAX) return state;
      return {
        ...state,
        focus: on
          ? state.focus.filter((item) => item !== action.focus)
          : [...state.focus, action.focus],
      };
    }
    case 'invite':
      return {
        ...state,
        invites: state.invites.map((invite, index) =>
          index === action.index ? { ...invite, ...action.invite } : invite,
        ),
      };
  }
}

export const validEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const stepFromHash = (hash: string): Step | undefined =>
  STEPS.find((step) => hash === `#/${step}`);
