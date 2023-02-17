export const LECTURE2_INFO = {
  title: 'Simply Explained IPFS',
  tutor: 'Savjee',
  free: true,
  description:
    'IPFS aims to decentralize the web and make it available for "interplanetary." Amazing, right?But how does it work?\n' +
    "Let's find out how IPFS works, how it can solve problems like censorship, and really work across planets.\n",
  weeks: [
    {
      id: 1,
      title: 'Simply Explained IPFS',
      lectures: [
        {
          id: 1,
          title: 'Lecture',
          video:
            'ipfs://bafybeigvdvtc66wl3uepy7vyydnbjqtqrdzlg5spkwuavevbwuu6zgawgq',
          type: 'video',
        },
        {
          id: 2,
          title: 'Assignment',
          quiz: [
            {
              id: 1,
              question: 'What is IPFS stands for?',
              selections: {
                1: 'InterPower File System',
                2: 'InterPlanetary File System',
                3: 'Introspective Powered File System',
                4: 'Institutional Platform for File Storage',
              },
              solution: 2,
            },
            {
              id: 2,
              question: 'How IPFS objects configured?',
              selections: {
                1: 'Data & Links',
                2: 'Data & Storage',
                3: 'Data & Memory',
                4: 'Data & Functions',
              },
              solution: 1,
            },
          ],
          type: 'assignment',
        },
      ],
    },
  ],
};
