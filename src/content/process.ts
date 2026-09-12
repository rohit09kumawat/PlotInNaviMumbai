export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Understand',
    description: "We start with your situation, not our inventory. What you need it for, when, and what you're comfortable spending.",
  },
  {
    step: '02',
    title: 'Explore',
    description: 'We shortlist what genuinely fits. Usually a handful of options, not a catalogue.',
  },
  {
    step: '03',
    title: 'Verify',
    description: "We review the available documents and approval status for each one, and tell you what's confirmed and what isn't.",
  },
  {
    step: '04',
    title: 'Visit',
    description: 'You see the plots yourself, with the boundaries, the access road and the surroundings in front of you.',
  },
  {
    step: '05',
    title: 'Discuss',
    description: "You ask everything. We answer, including the parts that aren't in our favour.",
  },
  {
    step: '06',
    title: 'Decide',
    description: "You decide. If that takes six months, or the answer is no, that's a fine outcome.",
  },
];
