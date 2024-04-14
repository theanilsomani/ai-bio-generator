import { Switch } from '@headlessui/react';

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ');
}

export default function Toggle({ platform, setPlatform }: any) {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch.Label
        as="span"
        className={`mr-3 text-sm font-medium ${platform === 'LinkedIn' ? 'text-gray-400' : 'text-gray-900'}`}
      >
        Twitter
      </Switch.Label>
      <Switch
        checked={platform === 'LinkedIn'}
        onChange={() => setPlatform(platform === 'Twitter' ? 'LinkedIn' : 'Twitter')}
        className={classNames(
          platform === 'LinkedIn' ? 'bg-black' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            platform === 'LinkedIn' ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Switch.Label
        as="span"
        className={`ml-3 text-sm font-medium ${platform === 'Twitter' ? 'text-gray-400' : 'text-gray-900'}`}
      >
        LinkedIn
      </Switch.Label>
    </Switch.Group>
  );
}


