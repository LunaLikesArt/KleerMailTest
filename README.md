<b>How to run the test</b>
- Clone the repository via console 'git clone git@github.com:LunaLikesArt/KleerMailTest.git'
- Install Protractor, follow the tutorial http://www.protractortest.org/#/tutorial

<br />

<b>Notes</b>

I wanted to test a few things in this page and show proof of concept:

- The ability to create a project from a tile (e.g., Self Mailer with Card) and dismiss it.

- The ability to create a project from a tile and create a project.

- The abilities to search.

<br />

<b>Known Issues</b>
- I ran into issues with timing. I googled searches and found workarounds, but the expected .then capability did not work.
-  I only tested one tile, but the POC would work for all tiles.
-  I found a couple of bugs, one with search and one with creating a project.
  - If searching for something and then doing a subsequent search would result in 'Minimum Quantity is -1'
  - Creating a project did not work at all.
