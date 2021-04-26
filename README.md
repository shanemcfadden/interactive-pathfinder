# Interactive Pathfinder

This project is a single page application that allows users to select start and end points from a grid and calculate the easiest path between them.
They may also draw textures to make it easier or harder to reach the end. This pathfinder implements Dijkstra's algorithm to find a path with the lowest difficulty.

Click [here](https://shanemcfadden.github.io/interactive-pathfinder) to use the project from your browser. **Note: the app is not optimized for mobile or tablet use.**

## Tools used

- Create React App
- CSS

## Skills learned

- Display programming logic meaningfully with a UI
- Use component-by-component style sheets
- Toggle UI capabilities depending on the current application state
- Calculate style attributes dynamically using Javascript variables
- Efficiently disseminate and alter application state across components

## Possible next steps

- Implement other algorithms besides Dijkstra's
- Instead of drawing the first path found, allow algorithm to find all easiest paths, then draw the most "elegant" path based on a predetermined set of metrics (e.g. fewest turns, fewest texture changes, etc)
- Make app tablet/mobile friendly
- Allow users to draw their best guess of the easiest path and assign them a score at the end.

## Running the project locally

This project requires npm to run. Download the code and navigate to the root directory. To run the development server, run `yarn start` or `npm start`. View the app in a web browser at localhost:3000.

To run in a production environment, first run `yarn build` or `npm run build` to compile a bundle in the /build directory.
Serve this directory locally using software such as [serve](https://github.com/vercel/serve).
