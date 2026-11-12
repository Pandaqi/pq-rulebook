# Documentation

This page details the general philosophy/workings of this library as well as specifics on the syntax and how to use it. 

I give the philosophy because it helps all the technical details fall into place and helps you understand if this framework is even for you. Just throwing raw numbers and properties and workflows at people tends to be a bad way to learn.

## Philosophy

### An Attempt At Interactive Rulebooks

I like it when information is easily accessible and changeable. After designing several rulebook PDFs for my very first board games, I wondered "couldn't I just make the rules a web page?" That way, I could fix issues far more quickly, people wouldn't need to download anything---frankly, I only saw upsides.

I tried it and it worked fine. A web page can respond to different screen sizes, it can obviously display text and images, and I had the added benefit of being able to quickly add different colors/fonts/icons.

Over time, I used this system for _all_ my games, and it grew in size and scope. I made the sections foldable, so you could prevent overwhelming yourself by only revealing the part of the rules you were interested in. I made _interactive examples_ that simulated one turn of the game when you pressed a button.

After a while, I realized three things.

* Layout Designers (e.g. _Affinity Publishers_ or _Adobe InDesign_) still exist for a reason. There are many things they can do much better and more easily than browsers ever could. **I shouldn't try to compete with that.** I was trying to shoehorn my system into _all_ rulebooks I made, and it just didn't work and made the whole thing bloated. No, web-paged rulebooks have some advantages and some clear disadvantages, and this system simply shouldn't be used when it doesn't fit your purpose.
* The system **had become an absolute mess**. Because it grew so organically. And, frankly, I always considered it the "less important" system on my website. To create a rulebook, I'd first write it in Markdown but with a _lot_ of custom "shortcodes" that made it barely readable, and then I had to connect it with a system that read the whole webpage and tried to make sense of the rulebook inside. Not great.
* With some tweaks, the system could be really powerful and standalone. I could actually give you the web page and you'd have a very easy way to view and search the rules of a game at any time. I would _love_ to have that for the games I sold on my online store. If only I'd completely rewrite my approach ...

### The Big Rewrite

And so I wrote down some general principles for this framework.

* The input should be **flexible and minimalist**. 
  * That is, no littering with magical shortcodes to make it do what you want, no required class names you have to have on the page or the whole thing breaks ;) Instead, it accepts plain **Markdown**, and you can decide how to feed it into the system in many ways.
  * Any special elements are just an HTML tag with a specific name. For example, to mark where an example should go, you'd just write `<div data-rulebook-example="example-turn"></div>`. The system picks it up and connects it with the example generator you coded (with the `example-turn` id).
* The output should be **interactive and minimalist**. 
  * Just some simple styling is all you need to make the rulebook look good. Anything more (fancy colors, fancy fonts, transition effects, etc) is more likely to distract and make it illegable than anything else. The true clarity of a good rulebook comes from solid _writing_ and solid _example images_ to go along with it.
  * The _benefit_ of rulebooks as a webpage is the interactivity. As such, images can be resized, sections can be folded/unfolded, and there must of course be support for randomly generated example turns.
* It should work both when **hosted on any server** as well as when **viewed locally**. This allows you to actually give that single web page (with the rules) to someone else and they can read the rules any time. (Though saving as PDF and sharing that is usually simpler. Speaking of ...)
  * You should be able to just throw this framework onto a page. It transforms it to something more interactive and helpful in simple ways and that's that.
* It should have easy tools for **legibility and accessibility**, which culminates in **saving to a nicely formatted PDF**. The previous system just relied on the browser's print feature, which is ... fine. But to give an example of a feature that's missing from all my old rulebooks for this reason: _page numbers_.

This framework shouldn't be ambitious. If you want fancy editorial design, use software that's been developed for 30 years to do that. But if you want to provide simple rulebooks as clean and interactive web pages, then this might be for you. 

For me, personally, it simply saved a lot of time and effort. It's much more efficient to write my rules in Markdown and call it done, than to create a new design document in some software my broken laptop can barely handle for every single game.

## Getting Started

The fastest way to get started is to ...

* Write your rulebook (in Markdown, or just plain HTML) and put it inside an element with id `rulebook-content`
* Call the `loadRulebook()` function on that page.

This simply reads what's on the page, transforms it if needed, and then initializes a rulebook on it.

## Config(uration)

You can also pass one object with parameters into that function to _configure_ it. The possible key-value pairs are as follows.

* `text` (string): a string with your rulebook's text to use instead
* `container` (string|HTMLElement): a class name _or_ actual element on the page; its content will be used for the rulebook
* `styles` (string): custom CSS styles for the design of the rulebook
* `fontBody` (string): name of a custom font to use for the body text
* `fontHeading` (string): name of a custom font to use for the header text
* `headerIcons` (string[]): several standard sections (present in all rulebooks) get icons if you use those names, such as "Setup" and "Objective". This parameter overrides those names with the ones you give.
* `hideHeaderIcons` (boolean): this turns off the icons altogether.
* `exampleClass` (string): the class that tells the rulebook what's an interactive example. => _Examples without code attached to them are literally useless, but I keep this around for completeness' sake._
* `examples` (object): key-value pairs, where the key is the example's unique ID and the value is its configuration. (See below.)
* `tableClass` (string): the class that tells the rulebook what's an interactive rulebook table.
* `tables` (object): key-value pairs, where the key is the table's unique ID and the value is its configuration/content. (See below.)
* `iconClass` (string): class added to all dynamic icons.
* `icons` (object): key-value pairs identifying tags on the page to replace with icons. (See below.)

By default, the system ...

* Adds a **toolbar** at the top with: Print, Fold/Unfold All, Dark Mode/Light Mode, Upload Custom Assets (this is necessary for allowing interactive examples to work if you open the file locally; it only appears in that case)
* Recognizes your headings and turns them into **sections** to fold/unfold.
  * It automatically numbers them and adds an icon if it's a common rulebook section
  * It **requires** that you use headings properly and don't, for example, jump from H2 to H5 all of a sudden.
* Makes images **clickable** (to see them fullscreen; click again to remove overlay)
* Supports **linking within the document**. 
  * Headings automatically receive IDs. For example, the heading "Some Expansion" would get the id `some-expansion`.
  * By using standard anchor links to these spots, the system will unfold the sections needed and scroll you to that place.
* Attaches your code to interactive examples found in the rulebook and initializes them.
* Similarly, initializes rulebook tables with the data you give it.
* Injects very (very) minimal styling to make this all look okay.
  * The styling basically splits the content into a **main** part and a **sidebar**. All content is in the main part by default. By adding the `sidebar` class to any object, it will float to the side and into the sidebar.
  * It's recommended to use the `<custom></custom>` tag for any custom elements you add. It makes very clear that this is a custom element added by you (not the system) and removes any inherent styling or clashes with other parts of the system.

_Why require headings to make sense?_ The goal is to have a Markdown/plain text file that is completely readable and sensible _even without the system_. Trying to be too flexible (or "accomodating") to whatever random things users might do was actually a big mistake my first version of this system made!

## Custom Icons

A common need in rulebooks is to easily display lots of icons, either inline with the text, tables, or next to headings. 

The first step is to mark **where** you want the icon to appear. Example: `<div data-rulebook-icon="someId"></div>`.

Then, you need to tell the rulebook which ID to link to which icon. To do so, give an object to the `icons` property in the config.

At the top level, this object has key-value pairs defining the different _spritesheets_ (images) to load (the `IconSheetParams` type). The key can be anything that makes sense to you; the value has the following properties.

* `sheetURL` (string): path to the image spritesheet containing all the different options/icons to display.
* `sheetWidth` (number): how many images per row in that spritesheet
* `base` (string): base path for the sheet (which is simply added in front of the `sheetURL`)
* `class` (string): custom class to attach to icons
* `icons` (object): key-value pairs of the icons to include; the `IconData` type.

The `IconData` object has key-value pairs again, where each value has the following properties. The **key** used here is that `someId` using which icons are recognized.

* `frame` (number): which frame to display from the spritesheet
* `sheetURL` (string): path to a custom spritesheet; overrides the main one for the whole table
* `sheetWidth` (string): images per row in that custom spritesheet; overrides the main setting for the whole table

It looks for all these tags and replaces them with the icon you defined in the config.

It also adds an item automatically **to any heading that matches someId**. For example, if you have an icon saved as `turn`, it will also display it next to the heading of the **Turn** section. To turn this off, set `hideHeaderIconsCustom` to `false`.

```
{
  icons:
  {
    sheet1:
    {
      sheetURL: "some_image.png",
      sheetWidth: 8,
      icons:
      {
        turn: { frame: 0 },
        card: { frame: 1 },
        dice: { frame: 2 }
      }
    }
  }
}
```

## Rulebook Tables

Many games have some overview or table showing the list of options. Maybe the game has many different icons that can appear, or different cards, or different characters to play.

That's what the rulebook tables are for.

You give them an object with all your _data_, and the rulebook turns it into an actual table that you can interact with.

The first step is to mark **where** the table is in your document. Example: `<div data-rulebook-table="someId"></div>`

Then, add an entry with the key `someId` to that **data object** you can feed into `loadRulebook()`.

On a high level, that data object has two properties: `config` (configuration for the whole table) and `data` (the data to display)

The `config` takes the following properties.

* `icons`: same 
* `class` (string): any custom class(es) to attach to this rules table

The `data` is an object of key-value pairs, and the values can be as follows.

* `heading` (string): the name/label/heading attached to the item. (Example: "Move Action")
* `desc` (string): detailed description of what it means
* `class` (string): any custom class(es) to attach to this entry 


The table only supports spritesheets because that's really the only efficient way to load + display _many_ pictures at once in the rulebook. But you could simply have a unique image for each option if you wanted, by setting the unique `sheetURL` for each entry and setting `sheetWidth` to 1.

In the old version, there were _many_ different built-in classes for subtle tweaks to how the rules table looked. Those are all gone! If you want a custom look, supply your own classes, styled however you like.

The default version will simply place all these elements in a grid. And when you click one, it becomes full size so you can read its meaning. When printing, they all "unfold" permanently.

## Interactive Examples

### The Simplest Way

The idea is to allow the reader (of the rulebook) to press a button and get an example of how the game works. A randomly generated example, text and/or images, that actually _shows_ the game. And if it's not clear? No worries, they can just press the button again and see a different turn play out.

All of the logic for your game, however, will be _custom_. It means this framework only provides the things it _can_ provide for _any_ game.

The first step is to mark **where** the example is in your document. Example: `<div data-rulebook-example="someId"></div>`

Then, add an entry with the _key_ `someId` to that **data object** you can feed into `loadRulebook()`.

You can use the following properties in the _value_ (object) attached to that key.

* `id` (string): its unique ID (which you can make up yourself)
* `node` (HTMLElement): the real node to attach it to. (Most likely you will never need to set this as it attaches automatically based on ID.)
* `callback` (Function): a custom Function with the logic for the interactive example
* `buttonText` (string): the text on the button
* `sidebar` (boolean): if true, places the example (button + output) in the sidebar/margin area of the rulebook. (This is very hard to lay out well, so check if it works for your specific rulebook.)
* `settings` (RulebookSettings): an object with settings for the example. (Example: pick the _number of players_ for whom it should simulate a turn)

The real magic here is in that `callback`. You will have access to an `InteractiveExampleSimulator`; it's passed in as the first and only argument. See below for what it is and what you can do with it.

If you use the `pq-games` framework too, there's a nice helper function to load and prepare your assets (for drawing) from your `GameConfig`. Call `await sim.loadMaterialCustom(getMaterialDataForRulebook(CONFIG))`. The second function grabs the things you need, the first function accepts and stores that on the simulator object for easy reuse throughout the interactive example.

Check the `pq-games` documentation to see what this `GameConfig` object is and all the properties it can take. For the rulebook, though, you only need to know it should contain a `_material` key, which defines every unique type of material in your game.
* `picker` (Function): the function that should return the full list of this material type
* `itemSize` (Vector2): the size at which to draw the images (for this material type)
* `visualizer` (any): the class that's put into your object's `draw` function to actually draw it into the interactive example. (Uses `pq-games` standard `MaterialVisualizer` if not set.)

**Reminder:** if hosted locally, you have to upload any assets before a system could use them (otherwise they're not "trusted"). Whatever the user inputs is saved globally under `window.pqRulebookCustomResources`. Use it however/wherever you want.

### Output Builder

The most important element of that `InteractiveExample` object is the _output builder_. Access it with `.getOutputBuilder()`. 

This helps you spit out actual feedback and results from generation as you go. For example, after generating the initial hands for a round in the game, you might make it say "Hands are dealt. Player 1 has these cards, Player 2 has these cards."

* `addParagraph(string)`: adds a paragraph of text.
* `addNode(node)`: add any node/HTML element
* `addParagraphList(string[])`: creates a list of bullet points from the individual texts
* `addNodeList(node[])`: creates a list of nodes

You can find more specific ones in the source code. You can also circumvent this entirely and do whatever you want with that OutputBuilder. 

_Remark:_ I learned that it's much more practical, easy to read, and bug-free to do it like this than to collect all your output along the way and only flush aaaall of it out at the very end.

### Settings

I've rarely had a need for settings for interactive examples. It's a sign of overcomplicating things. The idea is to show random turns; to show _all_ that can happen in a game and how to handle it. So actual randomness and variation, instead of control, is the advantage here.

That's why support is currently a bit barebones, but it's there.

Use the previously mentioned `settings` property (in the params you pass into `loadRulebook()`). Attach an object to it where the _keys_ are unique IDs (as usual), and the _values_ are configurations for the different settings.

Such a configuration takes the following properties.

* `type` (SettingType): one of `SettingType.TEXT`, `SettingType.NUMBER`, `SettingType.RADIO`, `SettingType.CHECK`, or `SettingType.ENUM`
* `label` (string): the text that labels/describes this input
* `default` (any): the default value. (If not set, is either `""`, `0` or `false` depending on type.)
* `values` (any[]): the different possible values it _can_ take
* `keys` (any[]): custom keys to attach to those values, if so desired. (Otherwise the key _is_ the same as the value.)

At time of pressing that button, their values are read and accessible in `interactiveExample.getSettings()`

### The Advanced Way

There's something even more powerful than writing a single interactive example. It's **simulating** an entire turn or game thousands of times.

If you can do this for your game, a statistical simulation is a great way to check for major mistakes. A card that's too powerful---players that start with it win 95% of the time! A mistake in your rules---in 1% of the games it enters an infinite loop and never ends!

That's why there's a secret extra property you can pass into `InteractiveExample`, which is `simulator`. It's an object again that takes the following properties.

* `enabled` (boolean): quick way to turn simulation on/off
* `iterations` (number): how many times to repeat your interactive example
* `silent` (boolean): the simulation produces a lot of output---the data/statistics you want---but this can silence it
* `showFullGame` (boolean): an easy toggle you can implement in your custom function, to switch between simulating a single turn/thing and a longer game
* `runParallel` (boolean): if true (and your custom code supports it), it tries to run loads of simulations at the same time, which can be faster.
* `callbackInitStats` (Function): a function called before doing anything, so you can initialize any numbers/data/statistics as needed. (Example: initialize what should be a number at `0`.)
* `callbackFinishStats` (Function): a function called after doing the simulation, so you can read/clean up/modify the final data as needed. (Example: add an extra property saving the _average_ of some other properties.)
* `custom` (any): any custom object that you might want access to. (Either directly or by calling functions on it.)

Now, when you press the button---perhaps after changing some settings first---it shows nothing on the page but launches into the simulation. You get information through the _Console_. The system "simply" repeats your example code loads of times and you can collect all sorts of statistics from that.

How? Well, within your custom code, you tell it what to track and what numbers to save.

This object holds the simulation and its data. By modifying its `.stats` object, you can track raw data. As explained at "The Simplest Way", if you simply _don't_ pass in this config (or set `enabled` to false), it will just run your example _once_ instead of simulating.

The other most important property of this object is `.example`. This contains a reference to the `InteractiveExample` running this simulation, so you can access all its properties and functionality.

See the source code for other ways to manipulate this object.

## Section Icons

The icons for sections can be one of 8 predefined types (that occur in almost every rulebook). (These are grayscale, so they can be tinted to fit any design.)

* `setup` (anything that needs to happen before the game starts)
* `objective` (when the game ends and who wins)
* `gameplay` (the general structure, such as who starts, rounds, turn structure, ...)
* `action` (the thing(s) you'll actually do)
* `scoring` (how scoring / progressing towards the objective works)
* `expansion` (the list of expansions or variants)
* `options` (simply a list of all options, such as all cards that can appear and what they do)
* `beware` (a reminder, warning, crucial rule that needs to stand out)

## A Note On Printing

To make the printed version look much better and more consistent, you can use _Paged.js_. Simply [include its JS file](https://github.com/pagedjs/pagedjs) on the page _after_ your own code that creates the rulebook.

If you **print** and it notices Paged exists, it will transform it and use that instead. This gives you page numbers, margin headings, a more consistent layout, etcetera.

If not included, it will simply print using default browser functionality. This will likely look fine, but it can do some odd things and misses some features.

Even so, this is an inexact science and mistakes happen. Always check if it doesn't suddenly move stuff around or makes sections disappear before printing.

I didn't include _Paged.js_ by default because it bloated the file size _and_ it refused to work for me that way. @TODO: This might change in the future if the framework updates/I figure it out.

## A Note On PQ-Games

The old/first version of this library was heavily intertwined with my `pq-games` framework. This was a bad idea. When rewriting, I made sure to completely separate them. You can include/use the entirety of this framework and its features without needing anything else.

The downside of this, however, is that I lost some quick helper functions/shortcuts for doing things. If you _are_ using `pq-games` too, check some examples of my games to see the fastest way to link the two now and make them talk to each other.

For most people, though, I imagine all of that isn't needed. Just some basic custom code will do the trick for almost all rulebooks---it's just that _I_ somehow always try to experiment and push boundaries.