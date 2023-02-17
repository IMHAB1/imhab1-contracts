export const LECTURE1_INFO = {
  title: 'Create a blockchain javascript',
  tutor: 'Savjee',
  free: true,
  description:
    "Let's learn how to make your own blockchain with JavaScript. I'm going to show you a video of how blockchain works by using simple code. It's not a perfect implementation, but it's enough to know what principles blockchain has and ensures that blocks can never be modified.\n" +
    '\n' +
    "We're going to create a blockchain and then we're going to use it and change it. It will show the function of blockchain to detect fraud.\n",
  weeks: [
    {
      id: 1,
      title: 'Create a blockchain javascript',
      lectures: [
        {
          id: 1,
          title: 'Creating a blockchain with Javascript (Blockchain, part 1)',
          video:
            'ipfs://bafybeiauq3blndsgfrwvx6prmtghcozid3sm367wg4osdzcricez2wc7se',
          type: 'video',
        },
        {
          id: 2,
          title:
            'Implementing Proof-of-Work in Javascript (Blockchain, part 2)',
          video:
            'ipfs://bafybeiftkodmivlcdlmffwuwp5ae4juqmwmdl3veonpgzpsju5yjndutau',
          type: 'video',
        },
        {
          id: 3,
          title:
            'Mining rewards & transactions - Blockchain in Javascript (part 3)',
          video:
            'ipfs://bafybeia5ix5z3jmnim62mkixnf2wus6q32ddx7dj6b45bs7pc5h2az3hxq',
          type: 'video',
        },
        {
          id: 4,
          title: 'Signing transactions - Blockchain in Javascript (part 4)',
          video:
            'ipfs://bafybeibcrrfijtfttjdwh2otoezdnabse2ritmglgl57ad6f4z2uwmlpgm',
          type: 'video',
        },
        {
          id: 5,
          title: 'Angular frontend - Blockchain in Javascript (part 5)',
          video:
            'ipfs://bafybeihrfj47rmucfta5mvoeqw2wxlxhp2nc435lald65rsymnxhz2sjf4',
          type: 'video',
        },
        {
          id: 6,
          title: 'Assignment',
          quiz: [
            {
              id: 1,
              question: 'How do we check if the chain is valid?',
              selections: {
                1: 'Compare block data',
                2: 'Compare memory info',
                3: 'Compare hash of previous block',
                4: 'Compare data of previous block',
              },
              solution: 3,
            },
            {
              id: 2,
              question: 'What can be changed by difficulty of mining?',
              selections: {
                1: 'Memory storage',
                2: 'Data storage',
                3: 'Hash of the previous block',
                4: 'Block creation time',
              },
              solution: 4,
            },
            {
              id: 3,
              question: 'How do we verify the transaction?',
              selections: {
                1: 'By the signature',
                2: 'By the call data',
                3: 'By the transaction hash',
                4: 'By the address',
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
