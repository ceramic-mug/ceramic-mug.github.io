---
title: 🗺 Viewing DJI Fly Telemetry in QGIS
layout: post
---

This is a quick guide for extracting and converting DJI Mavic Mini flight telemetry data into a shapefile format (KML) viewable in QGIS (Quantum GIS) or any other GIS platforms out there.

Steps:

1. Create [airdata.com](https://airdata.com/) account (*free* to do what we need to do)
2. Add DJI credentials to airdata (flight logs sync automatically)
3. Download individual flight's telemetry as KML from airdata webapp
4. Add KML as vector layer to QGIS

## 1. Create Airdata Account

[Airdata](https://airdata.com/) seems to be (I haven't done a ton of research on this) a high-quality one-stop-shop for manipulating drone data and keeping track of flight records. It offers a range of paid plans and a solid free-forever plan that syncs automatically with DJI records and translated DJI flight telemetry so that it's viewable on the web and downloadable. Pretty sweet!

The first step, then, is to simply create an account with Airdata and select the free option; unless, of course, one of the paid options appeals to you.

## 2. Add DJI credentials to Airdata

You can upload flight records to Airdata manually, but why do that (and jump through the extra step of downloading the data manually from your phone) when you can have all the flight records sync directly to Airdata? This step enables that syncing.

1. Click "My Account" at the top-right of the screen once you've logged in to Airdata
2. On the right-hand menu column, under the subheader `Flight Retreival,` find and click on `DJI Login`
3. On the DJI Login page, enter your DJI email and password (that is, if you trust Airdata. Up to you! The manual upload route is always an option.)
4. Click the "sync now" button (or a button like that, I forget exactly what it says)

At this point, all of your DJI Fly flight data should begin syncing with the Airdata servers! To see the sync in progress and begin viewing data from your flights, click `My Logs > Flights` at the top of the screen. The left menu bar should now show a list of flights by date and time and may indicate that more are syncing. Click on the date/time name of one of the flights and you should see a map like this:

![airdatamap](/assets/airdata.png)

If you don't see a map but instead see some other data visualized, try clicking a "map" tab in the web app window.

## 3. Download flight telemetry as a KML

This step is as simple as clicking the "Download KML" link that sits right under the map of a given flight record on Airdata's webapp.

## 4. Add KML as vector layer to QGIS

Add the KML file as you would any vector layer in [QGIS](https://www.qgis.org/en/site/). You will likely be prompted to choose whether you want to add a multiline pologyon, a pointstring, or both. By default, I've chosen to go ahead and add both. The multistring polygon is the drone path with yellow path designating times when video is being recorded and blue path designating all other times. The pointstring is a set of points which denote video start, video stop, home point, and photo taken locations. Use the "identify feature" tool in QGIS to play around with clicking the different colored lines and various points along the line to see what data is stored in each element.

## Example telemetry in QGIS

![Springfeild MO](/assets/springfield_telemetry.png)