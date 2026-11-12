# Roadmap

I improve this system whenever I create a new rulebook (and/or need some new functionality). But it's really a very tiny system that won't need many more features. 

## Features

The general wish list is ...

* DIST: Bundled JS for use as static file (instead of imported TypeScript).
* STYLING: Easy ways to overhaul your rulebook's style + prevent all these rulebooks from looking the same.
  * Font size could be SMALLER IN GENERAL (in print)
* MORE INTERACTIVITY: 
  * Easy support for animations / videos
  * More tools for the interactive examples (once I've made enough to see patterns and what functionality is most needed)
* HEADER: Add the NAME OF THE GAME to the rulebooks, as now you don't have any clue!
  * The Paged.js header thing can also mention `GameName > CurrentSection` for clarity
* TOC: Rulebooks might like a "table of contents"?

## Bugs

* You can't print, cancel, then print again when using Paged.js -> It crashes completely then (not the first time) and I have no clue why. **We can't use Paged as our 100% print feature unless I figure out how to make it work 100% of the time.**
* FIX: Rulebook tables look a bit ugly and weirdly sized still => 
  * Smaller text size by default.
  * The name of the thing should go BELOW the image (perhaps only in certain states)
  * Less generous padding/whitespace around it all.

## Niceties

* Extra buttons in toolbar: "fold/unfold rulebook tables" (or at least provide an alternative view where they're fully listed, nothing to click anymore)
* Perhaps make Rulebook Table Icons _smaller_ when printing, because now they take up a loooot of space
* More direct access to stuff inside the rulebook after parsing. (To do custom modifications, reading of properties, etc.)


## V1 -> V2 Migration Changelog

CHANGES v1->v2:

* Removed all "blocks"
  * Every block is just its heading (starting at H2)
  * Double-view is reduced to just the image as a `rules-image-sidebar` (might want to move these + remarks to be _higher_ as they float to the right)
* InteractiveExampleGenerator + InteractiveExampleSimulator are gone. Instead, everything is just InteractiveExample. All games should use that system now---they can, even if they draw something in a custom way.
* Marking examples now requires `data-rulebook-example="id"` set
* Marking rules tables now requires `data-rulebook-table="id"` set
  * In code, we just push the data into the `config` for loadRulebook. (The data which we put into the direct functions before.)
* You can now support custom icons with `data-rulebook-icon="id"`, which uses spritesheet + sheetdata you put in on creation
* Because this draws from the same shared CONFIG, it probably needs to update too after the CONFIG itself changed shape