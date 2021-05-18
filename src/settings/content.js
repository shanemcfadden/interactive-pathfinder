import React from 'react';

export const PAGE_HEADER = 'Interactive pathfinder';

export const PAGE_DESCRIPTION = (
  <>
    <p>
      Find the easiest path! Select a starting block and an ending block. To
      make things more interesting, add some challenges like water and swamp for
      the pathfinder to avoid. You can also make things easier by drawing roads
      made of dirt and asphalt. Once you press <em>Find Path</em>, the computer
      will search for the easiest path using Dijkstra's algorithm. Make a guess,
      and see if you can beat the computer at its own game!
    </p>
    <p>
      <strong>
        Note: This application is designed for desktop use. It is not yet
        optimized for touchscreens or small viewports.
      </strong>
    </p>
    <p>
      View the source code on{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/shanemcfadden/interactive-pathfinder"
      >
        GitHub
      </a>
      .
    </p>
  </>
);

export const MODAL_HEADER = 'There are no possible paths!';
