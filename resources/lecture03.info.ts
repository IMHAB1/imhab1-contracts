export const LECTURE3_INFO = {
  title: 'Serverless framework',
  tutor: 'Savjee',
  free: false,
  description:
    'Overview of all the topics that will be addressed in my series on the Serverless framework.',
  weeks: [
    {
      id: 1,
      title: 'Introduction',
      lectures: [
        {
          id: 1,
          title: 'Introduction (Serverless framework tutorial, #1)',
          video:
            'ipfs://bafybeihu6z5bvepztwdfufpuhbiq23smqcexpvviu43k6vqrklygeqk3ma',
          type: 'video',
        },
        {
          id: 2,
          title: 'What is Lambda? (Serverless framework tutorial, #2)',
          video:
            'ipfs://bafybeibrqfr6rzhewfrkj3bt3tjlvthosmdxwzg2u5gd7r3wpysp6wr7ry',
          type: 'video',
        },
        {
          id: 3,
          title: 'Core concepts (Serverless framework tutorial, #3)',
          video:
            'ipfs://bafybeifpsobcppvrxcywonqbxbng7oa5azcdg6fdfpib5kfot2a6i5nndi',
          type: 'video',
        },
        {
          id: 4,
          title: 'Assignment 1',
          quiz: [
            {
              id: 1,
              question: 'What is serverless?',
              selections: {
                1: 'Reduce number of servers by frameworks',
                2: 'Run code without provisioning or managing servers',
                3: 'Server architecture which does not use configuration servers',
                4: 'Database with procedures',
              },
              solution: 2,
            },
            {
              id: 2,
              question: 'Which is wrong about serverless?',
              selections: {
                1: 'Functions are stateless',
                2: 'AWS Lambda is one of the famous solution',
                3: 'Can not scale out',
                4: 'Only charged when running code in usual plan',
              },
              solution: 3,
            },
          ],
          type: 'assignment',
        },
      ],
    },
    {
      id: 2,
      title: 'Installation',
      lectures: [
        {
          id: 5,
          title:
            'Installation & using the CLI (Serverless framework tutorial, #4)',
          video:
            'ipfs://bafybeig2ojkf6klhnrxlugacyeytvbykeywj4wknmtzs7otckaznj4hkeu',
          type: 'video',
        },
        {
          id: 6,
          title:
            'Configure AWS credentials (Serverless framework tutorial, #5)',
          video:
            'ipfs://bafybeidk7po7p73mjdo4tzmybthlzyqpooo7m3qd65cjh2r7yl562dq3oq',
          type: 'video',
        },
        {
          id: 7,
          title: 'Creating a first project (Serverless framework tutorial, #6)',
          video:
            'ipfs://bafybeiejopia6gntaikm5m6chybt2otffnmlukrm6ii63js6bgfflpecjm',
          type: 'video',
        },
        {
          id: 8,
          title:
            'Deploying functions + invoking them (Serverless framework tutorial, #7)',
          video:
            'ipfs://bafybeifqfiqzbxe46rlz4ikx3kokgkkhfkrqtg5pdbclrhwx7vnafgalni',
          type: 'video',
        },
        {
          id: 9,
          title: 'Assignment 2',
          quiz: [
            {
              id: 1,
              question: 'What is AWS IAM? stands for?',
              selections: {
                1: 'Information Architecture Management',
                2: 'Institutional Account Management',
                3: 'Introspective Action Monitor',
                4: 'Identity and Access Management',
              },
              solution: 4,
            },
          ],
          type: 'assignment',
        },
      ],
    },
    {
      id: 3,
      title: 'Installation',
      lectures: [
        {
          id: 10,
          title:
            'Integrating with API Gateway (Serverless framework tutorial, #8)',
          video:
            'ipfs://bafybeid46rrz5ayhw3esnmsxbrdl2ssv7vsb6fpzm7whi5r6slrua7q75e',
          type: 'video',
        },
        {
          id: 11,
          title: 'Working with input (Serverless framework tutorial, #9)',
          video:
            'ipfs://bafybeifpfgksed63xa2qmivrveghczlcaqqpfoluyczqgh6myp3hxbpr6a',
          type: 'video',
        },
        {
          id: 12,
          title:
            'Deploy other AWS resources (Serverless framework tutorial, #10)',
          video:
            'ipfs://bafybeihmjtdvcfinm4qzdwgx2j7eusxg2trhwxm2lhiig2mjhfkem47tt4',
          type: 'video',
        },
        {
          id: 13,
          title: 'Environment variables (Serverless framework tutorial, #11)',
          video:
            'ipfs://bafybeieo3hxvikwu4s7uzpvepktou6s7o7dukwhek23qg7imdrbp2pvhpm',
          type: 'video',
        },
        {
          id: 14,
          title: 'Assignment 3',
          quiz: [
            {
              id: 1,
              question: 'What do we use configuration for AWS?',
              selections: {
                1: 'YAML file',
                2: 'XML file',
                3: 'MD file',
                4: 'Git',
              },
              solution: 1,
            },
            {
              id: 2,
              question:
                'What is the wrong reason to use environment variables?',
              selections: {
                1: 'To hide some values from the codes',
                2: 'To manage multiple environments easily',
                3: 'Because it is cannot be changed',
                4: 'To hide some values from the platform',
              },
              solution: 3,
            },
          ],
          type: 'assignment',
        },
      ],
    },
  ],
};
