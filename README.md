# Interactive Pathfinder

This project is a single page application that allows users to select start and end points from a grid and calculate the shortest path between them.
They may also draw walls as obstacles for pathfinder to dodge. This pathfinder implements Dijkstra's algorithm to find one possible shortest path.

## Tools used

- Create React App
- CSS

## Things learned

- How to display programming logic meaningfully with a UI
- How to use component-by-component style sheets
- How to juggle UI functionality depending on what the software is currently doing (e.g. preventing the user from pressing buttons while pathfinder is running)

## Possible next steps

- Make the whole app visible within a laptop viewport without scrolling down
- Design and implement a more elegant UI layout/color scheme
- Allow user to draw textures that make the path easier/harder to travel through instead of a strict wall/no wall environment. This would more effectively emulate
  real world situations where the shortest accessible path is not necessarily the quickest/easiest to travel.
- Implement other algorithms besides Dijkstra's

## Running The Project

This project requires npm to run. Download the code and navigate to the root directory. To run the development server, run `yarn start` or `npm start`. View the app in a web browser at localhost:3000.

To run in a production environment, first run `yarn build` or `npm run build` to compile a bundle in the /build directory.
Serve this directory locally using software such as [serve](https://github.com/vercel/serve).
