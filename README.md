# mvg-touch-timetable

A small proof-of-concept for an interaction concept of a power user public transport app for Munich. Just one swipe gesture is enough to select the desired route from a list of frequently used stations, to get some connection suggestions shown.

## What it is

The app learns which stations you use more often and shows a grid for them. You can then use your touch screen to start the swipe on the beginning station and end the swipe at the desired target station. Routes for the next departures are calculated and shown without further actions needed.
If needed you can also see the stops in between and which lines you need to take.

https://user-images.githubusercontent.com/26108368/204660269-b0f9b1f9-bad4-4444-87ed-b742c0ef4176.mov

## What problem it solves

This concept targets power users of Munich's public transport. Power users know which station is nearest right now and which stations they want to hop off. They are more interested in seeing the next departures, which connections are fastest and if there are delays or not. Also, power users do mostely use the same stations over and over again.

This app provides them with an easy and fast way to get a list of the next departures. It's just one swipe away. There's no typing of station names needed, since the most frequently stations are just listed on the first screen.

## Tech Infos

This is just a small React app hosted on Google Firebase and using some python Cloud Functions as the back-end. There is also a Storybook integration for easier development included.

<img width="1349" alt="mvg-touch-table-storybook" src="https://user-images.githubusercontent.com/26108368/204662146-7a884650-b669-436a-9bdb-c823620e8d9b.png">
