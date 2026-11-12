# Roadmap

I improve this system whenever I create a new rulebook (and/or need some new functionality). But it's really a very tiny system that won't need many more features. 

## Features

The general wish list is ...

* DIST: Bundled JS for use as static file (instead of imported TypeScript).
* STYLING: Easy ways to overhaul your rulebook's style + prevent all these rulebooks from looking the same.
* MORE INTERACTIVITY: 
  * Easy support for animations / videos
  * More tools for the interactive examples (once I've made enough to see patterns and what functionality is most needed)

## Bugs

* You can't print, cancel, then print again when using Paged.js -> It crashes completely then (not the first time) and I have no clue why. **We can't use Paged as our 100% print feature unless I figure out how to make it work 100% of the time.**

## Niceties

* Extra buttons in toolbar: "fold/unfold rulebook tables" (or at least provide an alternative view where they're fully listed, nothing to click anymore)
* Perhaps make Rulebook Table Icons _smaller_ when printing, because now they take up a loooot of space
* More direct access to stuff inside the rulebook after parsing. (To do custom modifications, reading of properties, etc.)