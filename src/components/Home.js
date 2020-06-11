import React, { Fragment } from 'react';
import Hero from './Hero';
import HomeContent from './HomeContent';

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div className="box cta">
        <p className="has-text-centered">
          Open University TM470 Project Home page.
        </p>
      </div>
      <HomeContent />
    </Fragment>
  )
}
