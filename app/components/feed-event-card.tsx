import { FeedEvent } from './feed-event';

type FEProps = FeedEvent;

export default function FeedEventCard(props: FEProps) {
  return (
    <div className='bg-white p-4'>
      <div className='flex justify-between mb-4'>
        <div className='flex gap-x-4'>
          <div className='flex'>
            <div className='bg-slate-800 text-white rounded-full flex text-xl items-center justify-center w-12'>
              {props.initials}
            </div>
          </div>
          <h2>
            <div className='font-semibold'>{props.userName}</div>@{props.userHandle}
          </h2>
        </div>
        {props.timestamp}
      </div>
      <p>
        <span className='font-semibold mb-4 inline'>{props.action}</span> {props.content}
      </p>
    </div>
  );
}

