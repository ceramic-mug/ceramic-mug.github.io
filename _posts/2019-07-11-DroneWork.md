---
title: 🕹 Drone Operation and Image Stitching
layout: post
---

In previous posts, I've mentioned that I'm working for the [Princeton Environmental Institute's](https://environment.princeton.edu/) Farm Project this summer. I primarily contribute to the project by operating a drone and analyzing the graphical data produced by each flight. This post provides some details about the specific drone, software, operating procedures, and image processing tools I've used to meet our goals.

## 👻 DJI Phantom Pro 4

<center>
<img src="https://technikblog.ch/wp-content/uploads/2016/11/DJI-Phantom-4-Pro-front.jpg" alt="drone" width="300" align="center"/>
</center>

​	I'm flying the [DJI Phantom Pro 4](https://www.dji.com/phantom-4-pro), which comes equipped with all the bells and whistles that make it fly properly and a 20Mp 4096×2160 camera, which takes beautiful aerial photos. I tote the drone and it's remote control around in a snazzy silver tough-styrofoam case with a clasp. To set up the drone for flight, I just pop in a rear-mounted rechargeable battery and twist on each of the four propellors. Once the drone is turned on (by double-clicking and holding a button on the battery), the drone runs through a self-diagnostic, testing each of the four propellors and the camera gimbal (mount and rotating motor) while on the ground. After this short test, the drone sends a go-ahead signal to its remote control, and I have control.

​	The remote is also pretty cool. The vast majority of manual flight is accomplished with two large joysticks on the front of the remote, the left controlling altitude and yaw (twisting around like vinyl on a turntable) and the right controlling pitch (leaning left, right, forward, backward). The remote connects via cable to my phone, which, when I'm running the [DJI Go app](https://www.dji.com/goapp), live-streams the camera signal surrounded by system information (battery life, altitude, signal strength, GPS strength, …). Flying is simple and fun, and there's little risk of causing the drone to tumble out of the sky because of its built-in stabilizers. The real risk is obstacles, which I don't often encounter because I'm flying over farm-fields.

## 🌽 Sentera FieldAgent™️

​	Although the [DJI Go app](https://www.dji.com/goapp) is really awesome and manually controlling the drone is easy, it would be incredibly difficult to systematically capture evenly spaced aerial photos of the farm-fields manually. Moreover, the Phantom's camera takes standard [RGB](https://en.wikipedia.org/wiki/RGB_color_model) photos, which, though beautiful, don't give us too much information about crop health. To overcome the first obstacle, and to produce worthwhile data, the Farm Project subscribes to [Sentera FieldAgent](https://sentera.com/fieldagent-platform/), a platform for agricultural remote-sensing.

​	The analytical advantage of Sentera's FieldAgent platform comes via a second mounted camera. This camera, however, measures "[light](https://en.wikipedia.org/wiki/Light)" (electromagnetic waves) in the near-infrared (NIR) spectrum, which the human eye can't quite see. This NIR data can be computed with the drone's red-band data to produce an accurate representation of plant-health ([based on leaf reflectance](https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index)) at a pixel-resolution scale. The NIR sensor itself is a little 5cm x 8cm flat green rectangle with a volcano-like bulge and lens. It's cute.

​	A FieldAgent subscription also gives us access to a mobile app that simplifies the drone operation. With the FieldAgent app, the process of flying a drone over a field and capturing near-perfect evenly spaced pictures looks like this:

1. Twist the propellors onto the drone, turn it and the controller on, and let the drone run through it's self diagnostic
2. Plug my phone into the controller
3. Launch the FieldAgent app
4. Give the app a few seconds to connect to the drone
5. Navigate on a map within the app to my current location (via Google Maps satellite imagery)
6. Tap on a little icon of the drone to start a planning session
7. Long-press corners of the field I want to fly over in order
8. Make sure the altitude (I fly at 200ft) and overlap settings (I use 80%) are set correctly
9. Hit the launch button
10. Sit back and relax for the next 10 minutes
11. Guide the drone manually down for landing

The whole process is remarkably easy. Most of the time I just lounge and keep one eye on the drone in the sky as the app controls the drone and reports its progress back to me live. The only harrowing moments are when I'm controlling the drone's descent and a gust of wind hits it, but I have enough video game experience to be quick on the joysticks in those moments and bring it back to a steady descent.

​	All the images are written to two micro-SD cards, one in the infrared camera and one in the drone body. When I get back to our lab, I pop the SD cards one-by-one into our lab computer and load the images into the FieldAgent desktop app, which, using location [metadata](https://en.wikipedia.org/wiki/Metadata), correctly tiles the images on a satellite map viewer so I can see an immediate mosaic of the flight just performed.

​	The raw tiling, however, has a lot of overlap since I set the overlap setting to 80%. Jittering, wind, and not 100% perfect drone positioning during flight also causes aberrations in the locations of each photo on the QuickTile interface. So, to put all these photos together into a truly beautiful, singular image, I use a truly epic open-source software called [OpenDroneMap](https://www.opendronemap.org/).

## 🗺 A Quick OpenDroneMap Intro

OpenDroneMap (ODM) takes all the images of any flight you complete with a drone, whether those images were taken manually or with a software like the FieldAgent app, and stitches them together into:

1. [Orthorectified geotiffs](https://en.wikipedia.org/wiki/Orthophoto) (2D)
2. [Textured 3-D Models](https://en.wikipedia.org/wiki/Structure_from_motion)

So take the images, dump them into a folder, run a command in your favorite [terminal emulator](https://en.wikipedia.org/wiki/Terminal_emulator), and boom! Five to ten hours later (for a couple hundred photos), you've got a whole folder structure filled with beautiful models of whatever it was you took pictures of. And then, because ODM is open source, all that great output is yours to play with!

​	The only caveat to OpenDroneMap is that it is usually run as a container within [Docker](https://www.docker.com/), so you would have to set that up too if you want to give this a shot. But follow the documentation and it shouldn't be so bad.

​	If you do have Docker installed, and you want to give ODM a shot at stitching together a pile of drone photos you've got laying around, just follow these steps:

1. Make a new project directory for ODM to work in
2. Within that directory, create another directory named "images"
3. Copy all of your drone images (from a single flight) into that "images" folder
4. In your terminal emulator, type the following (replace "/my/project" with the full path to your project folder, *not the image folder*):

```bash
docker run -ti --rm -v /my/project:/datasets/code opendronemap/odm --project-path /datasets --use-opensfm
```

​	Then, if your Docker is configured properly, it should recognize itself that it needs to download OpenDroneMap, which it will do on it's own, and then it will begin stitching your images together! Just make sure your path to your project folder (replacing "/my/project" in the above command) is correct. I had a lot of trouble getting this to work when I had a typo in that path.

​	I would love to share one of the produced images with you, but since they're of private farm property, I'm afraid I'm legally constrained from posting them publicly. 

## 👋 Closing

Thanks for reading! May the peace of our Lord Jesus Christ be with you always.