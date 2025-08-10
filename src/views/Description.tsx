import { memo } from "react";
import { Card } from "../components/Card";
import { Heading } from "../components/Heading";
import { Link } from "../components/Link";
import { Paragraph } from "../components/Paragraph";

export const Description = memo(() => (
  <Card>
    <Heading level={1}>Interactive Pathfinder</Heading>
    <Paragraph>
      Find the easiest path! Select a starting block and an ending block. To
      make things more interesting, add some challenges like water and swamp for
      the pathfinder to avoid. You can also make things easier by drawing roads
      made of dirt and asphalt. Once you press <em>Find Path</em>, the computer
      will search for the easiest path using Dijkstra's algorithm. Make a guess,
      and see if you can beat the computer at its own game.
    </Paragraph>
    <Paragraph>
      <strong>
        Note: This application is designed for desktop use. It is not yet
        optimized for touchscreens or small viewports.
      </strong>
    </Paragraph>
    <Paragraph>
      View the source code on{" "}
      <Link href="https://github.com/shanemcfadden/interactive-pathfinder">
        GitHub
      </Link>
      .
    </Paragraph>
  </Card>
));
