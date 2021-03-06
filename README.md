# React: Grid Path Finder

## App Link:
https://path-finder-90df8.web.app/

## Description:

This is a ReactJS Frontend App that uses path finding algorithms (Djikstra's & A*) to navigate through obstacles and find the shortest path.

This is my attempt at replicating a project done by Clément Mihailescu. <br>Here's a link to the original https://www.youtube.com/watch?v=n4t_-NjY_Sg&t=176s

The challenge was to create as much as I could without referencing his code. Project built from scratch. Proud to say came up with the maze algorithm myself :)

## Video Demo:
https://user-images.githubusercontent.com/74743983/133126819-589ca4dc-4aca-44d5-89b8-18c9c57e5487.mp4

## Guide:
**1. Creating Obstacles**
<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manually using the "Block" button to drag and drop boundaries.
Or automatically using the  "Create Maze" button.

**2. Defining the Starting & End points**
<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select the "Start/End" button. The first and second location clicked will select the starting and end points, respectively.

**3. Select a Path Finding Algorithm**
<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By default, the "A*" algorithm is selected. To change, simply hover mouse over the button to reveal more options.

**4. Solve**
<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All that's left is to click the "Solve" button and watch the algorithm do it's job.

## Bugs:
  1. "Reset" - If the app is in the middle of solving, clicking the "Reset" button will crash the app.
  2. "Block" - The drag & drop mechanism for the "Block" button is finicky. Sometimes it works in reverse ('mouse button up' adds blocks and 'mouse button down' removes blocks). Also if you drag the mouse too quickly it will skip over some squares.




