# Tend onboarding

The onboarding flow of Tend, a two-minute daily check-in for teams. Five screens: welcome, name, focus, invite your team, and home.

```
npm install
npm run dev
```

Each screen has its own URL: `/#/welcome`, `/#/name`, `/#/focus`, `/#/invite`, `/#/home`. The flow state lives in one reducer in `src/onboarding.ts`.

`research/` holds the funnel numbers and recent feedback.
