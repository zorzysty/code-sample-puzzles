#Starting the app
To start the application run following commands:

`npm install`  
`npm run start`

Or you can build the application using `npm run build` and use a server of choice to run it.

#Customisation
You can customize the app by changing values in `const.js`. To make sure changes won't brake the game use provided unit tests.

`rows` - number of rows and columns puzzle will be divided into  
`pieceSize` - width and height of rendered puzzle pieces (px)  
`separator` - gap between pieces on board (px)  
`border` - board border width (px)  
`ENDGAME_DURATION` - time gap between placing last puzzle and starting new game (milliseconds)  
`TIMER_REFRESH_FREQUENCY` - defaulted to 77 so that every digit is possible to be displayed on every position (milliseconds)  
`ERROR_TIME_COST` - how much time is added to timer for every mistake (milliseconds)   
`ERROR_COLOR_DURATION` - how long is timer highlighted in red after mistake (milliseconds)  

#Testing
Simply run `npm run test`
