import {
  INVITES_REQUIRED,
  ROLES,
  validEmail,
  type Action,
  type Invite,
  type State,
} from '../onboarding';
import { Heading, PrimaryButton, Screen } from '../components/ui';

export function InviteTeam({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (action: Action) => void;
}) {
  const valid = state.invites.filter((invite) => validEmail(invite.email));
  return (
    <Screen
      step="invite"
      dispatch={dispatch}
      footer={
        <>
          <PrimaryButton
            disabled={valid.length < INVITES_REQUIRED}
            onClick={() => dispatch({ type: 'next' })}
          >
            Send invites
          </PrimaryButton>
          <button
            type="button"
            onClick={() => dispatch({ type: 'next' })}
            className="self-center text-xs text-faint"
          >
            Skip for now
          </button>
        </>
      }
    >
      <Heading
        title="Invite your team"
        hint={`Tend works best with your whole team. Add at least ${INVITES_REQUIRED} teammates and choose what each of them can do. Admins can manage billing and members, members can post and read check-ins, and viewers can only read them.`}
      />
      <div className="mt-6 flex flex-col gap-2.5">
        {state.invites.map((invite, index) => (
          <InviteRow
            key={index}
            invite={invite}
            onChange={(next) => dispatch({ type: 'invite', index, invite: next })}
          />
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-faint">
        {valid.length} of {INVITES_REQUIRED} required invites added. Invitations
        expire after 7 days. Teammates need a work email on the same domain.
      </p>
    </Screen>
  );
}

function InviteRow({
  invite,
  onChange,
}: {
  invite: Invite;
  onChange: (invite: Partial<Invite>) => void;
}) {
  return (
    <div className="flex h-12 items-center gap-2 rounded-xl bg-raised pr-2 pl-4 shadow-[0_1px_2px_rgb(0_0_0/4%)]">
      <input
        type="email"
        value={invite.email}
        onChange={(event) => onChange({ email: event.target.value })}
        placeholder="name@company.com"
        className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-faint"
      />
      <select
        value={invite.role}
        onChange={(event) =>
          onChange({ role: event.target.value as Invite['role'] })
        }
        className="h-8 rounded-lg bg-inset px-2 text-[13px] text-emphasis outline-none"
      >
        {ROLES.map((role) => (
          <option key={role}>{role}</option>
        ))}
      </select>
    </div>
  );
}
