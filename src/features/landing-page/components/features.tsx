'use client';

import { InView } from '@/components/animated/in-view';
import { FEATURES } from '../lib/constants';

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="mx-auto max-w-fit scroll-mt-32 px-5 sm:px-10"
    >
      <h2 id="features-heading" className="sr-only">
        Key Features
      </h2>
      <ul className="grid grid-cols-1 gap-x-20 gap-y-10 md:grid-cols-2 md:grid-rows-5 lg:gap-x-36">
        {FEATURES.map(({ title, description, icon: Icon }) => (
          <li key={title}>
            <InView
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                  scale: 0.95,
                  filter: 'blur(4px)',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                },
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              viewOptions={{ margin: '0px 0px -100px 0px' }}
              className="flex max-w-2xl space-x-2 text-balance"
              aria-labelledby={`${title}-heading`}
            >
              <div className="flex items-center rounded-lg bg-primary p-3 shadow-md 2xs:p-5">
                <Icon aria-hidden="true" className="size-6 shrink 2xs:size-8" />
              </div>
              <div className="flex flex-col justify-center text-balance p-2">
                <h3
                  id={`${title}-heading`}
                  className="mb-1 text-lg font-semibold"
                >
                  {title}
                </h3>
                <p className="text-sm text-foreground/80">{description}</p>
              </div>
            </InView>
          </li>
        ))}
      </ul>
    </section>
  );
}
