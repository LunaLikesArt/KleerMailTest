I wanted to test a few things in this page and show proof of concept:
1 - The ability to create a project from a tile (e.g., Self Mailer with Card) and dismiss it.
2 - The ability to create a project from a tile and create a project.
3-  The abilities to search.

Known Issues:
- I ran into issues with timing. I googled searches and found workarounds, but the expected .then capability did not work.
- I only tested one tile, but the POC would work for all tiles.
- I found a couple of bugs, one with search and one with creating a project.
  - If searching for something and then doing a subsequent search would result in 'Minimum Quantity is -1'
  - Creating a project did not work at all.