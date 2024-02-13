import { FeedEvent } from './feed-event';

export const fakeFeedData = (): ReadonlyArray<FeedEvent> => [
  {
    initials: 'MG',
    userName: 'Mhorag Goff',
    userHandle: 'mgoff',
    timestamp: '1h',
    action: 'Commented on a paper in collection CHS:',
    content: 'Totally',
  },
  {
    initials: 'KC',
    userName: 'Kath Checkland',
    userHandle: 'khcheck',
    timestamp: '1h',
    action: 'Commented on a paper in collection CHS:',
    content: 'This is just awesome, dude!',
  },
  {
    initials: 'DB',
    userName: 'Donna Bramwell',
    userHandle: 'DonnaB',
    timestamp: '3h',
    action: 'Added a paper to collection CHS:',
    content:
    'INTERROGATING INSTITUTIONAL CHANGE: ACTORS\' ATTITUDES TO COMPETITION AND COOPERATION IN COMMISSIONING HEALTH SERVICES IN ENGLAND',
  },
  {
    initials: 'DB',
    userName: 'Donna Bramwell',
    userHandle: 'DonnaB',
    timestamp: '3h',
    action: 'Added a paper to collection CHS:',
    content: 'A General Framework for Analyzing Sustainability of Social-Ecological Systems',
  },
  {
    initials: 'KC',
    userName: 'Kath Checkland',
    userHandle: 'khcheck',
    timestamp: '4h',
    action: 'Added a paper to collection CHS:',
    content: 'Implementing the Additional Roles Reimbursement Scheme in 7 English PCNs: a qualitative study',
  },
  {
    initials: 'MG',
    userName: 'Mhorag Goff',
    userHandle: 'mgoff',
    timestamp: '1d',
    action: 'Created collection PRU3:',
    content: 'Project PRU3 review inputs.',
  },
  {
    initials: 'DB',
    userName: 'Donna Bramwell',
    userHandle: 'DonnaB',
    timestamp: '2d',
    action: 'Created collection CHS:',
    content: 'Papers being considered for the bibliography of project CHS.',
  },
];

