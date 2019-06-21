---
title: 🌎 Reflections on Science and Computation
layout: post
category: reflections
---

Science is beautiful. It's built on two fundamental realities of the created universe--math and logic--which are what we refer to when we talk about "order" or "structure." The Christian believes that this order is a reflection of God's character, and sees God making order out of chaos at the very beginning:

> In the beginning, God created the heavens and the earth. The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.
And God said, “Let there be light,” and there was light. And God saw that the light was good. And God separated the light from the darkness. God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day. - **Genesis 1 (ESV)**

The Biblical narrative begins with God creating order out of chaos, and he does this by: 1) creating things that are distinct in form and function (Night and Day) and 2) naming each distinct object.

This is *precisely* the way science works.

When I say that, I mean that scientists attempt to understand the world in exactly the same way that God made the world. The role of the scientist is to 1) discover distinctions between things and 2) name those distinctions so that they become meaningful parts of our common and technical vocabulary. Where God created all things and made distinct, meaningful creations, mankind attempts to recognize those distinctions and give distinct aspects of our natural world meaningful names.

These two objectives, creating distinction and giving those distinctions meaningful names, is also the basis of computer science and computation. Another objective of computation, which we also see elegantly met in the natural world by fundamentals such as statistical mechanics, is efficiency. "Coding" is simply creating things that do different things, and then giving those creations names so that they can be referred to later. Good coding is doing it efficiently, in much the same way that statistical mechanics makes things in the natural world shake out efficiently.

I'm not saying here that scientists or coders are like God; by no means! My observation is simply that scientific inquiry *works* the way it does *because* it's patterned, if often unintentionally, after God's creative process.

## 💻 The Week's Data Wrangling

I've been spending a lot of this week handling tables of data with many columns (often called "tabular data") in [Python](https://www.python.org/), a procedural programming language that's ubiquitous in amateur and scientific code. Here procedural simply means that the language can make your computer do a lot of general personal-computery things outside of basic computation, like surf the web or add text to a pdf. After a couple weeks of using Python, I've got to say--it's INCREDIBLE. I find it remarkable for a number of reasons:
1. It's open source, meaning that a community, not a company, has built it and it will always be accessible for free
2. It's extremely versatile. People have built scripts (little programs) to do just about anything you can do with a computer for Python
3. It's very readable and coder-friendly. This is because it's a high-level programming language, which means that there are a lot of translation layers between what you're typing in a python file and what the computer actually reads to do the thing you want it to do. Because of all these layers, writing in python is almost like writing prose. You just have to keep track of variables.
My Python use has been, like I said, primarily constrained to working with tabular data. I've so far written scripts (little programs) that download up-to-date data collected from a total of 17 agricultural sensors we have deployed at different farms, and then a collection of scripts to take that data and print 1) comparison graphs of all the data for all the farms and 2) calculations of photosynthesis rates for all crops across all farms. Here are some snippets of the code, with comments:

**To read the "daily" data for a specific crop from csv files into the Python program:**
```python
def byCrop_daily(crop):

    # Return a dictionary {'sensor': dataframe} for all daily files
    # of a specific crop

    daily = {}
    for datafile in os.listdir(arable_data): # look through all the files
        file = fileParse.match(datafile) # match object for group referencing
        if file:
            if file.group(5) == 'daily':
                if crop == 'Cherry Tomato':
                    # For bad cherry tomato naming convention
                    if file.group(2) == 'Cherry Tomatoes':
                        # Add a key for the sensor if there is none,
                        # and plug the daily datafile in for that sensor
                        daily[farms[file.group(1)]] = pd.read_csv(arable_data + datafile)
                    elif file.group(2) == crop:
                        # Add a key for the sensor if there is none,
                        # and plug the daily datafile in for that sensor
                        daily[farms[file.group(1)]] = pd.read_csv(arable_data + datafile)
                elif crop == 'Corn':
                        # If there's a space hashtag and the crop is 'Corn'
                    if file.group(4) != None and file.group(2) == 'Corn':
                        # Add a key for the sensor if there is none,
                        # and plug the daily datafile in for that sensor
                        daily[farms[file.group(1)] + ' #' + file.group(4)] = pd.read_csv(arable_data + datafile)
                else:
                    # For all other, systematically named crops
                    if file.group(2) == crop:
                        daily[farms[file.group(1)]] = pd.read_csv(arable_data + datafile)

    # The structure of the daily dict looks like:
    # {'sensor': pd.dataframe}

    keys = list(daily.keys())
    keys = sorted(keys)
    return keys, daily
```
You can see that there's a bunch of "if" statements. These are called "conditionals," and they're requiring that some variable fulfills some specific characteristic. If that characteristic is fulfilled, then the following commands are performed. If the statement is not fulfilled, then the computer skips that section and moves on to the next line down.

**Calculating Photosynthesis rate for a given sensor for a given crop**
```python
def photosynth_LMA_LAI(crop, NDVI):

    # Calculating change in gC/m^2 from LMA value and LAI
    # C = -LMA * (1-(NDVI/NDVImax)) / k
    # Where:
    #   C is gC/m^2
    #   LAI is leaf area index, equal to (1-(NDVI/NDVImax)) / k
    #   LMA is leaf-mass-area, crop-specific, found in literature

    print('LMA*LAI calculation for carbon assimilation: '+crop)

    k = 0.5 # Extinction coefficient (I think)

    # Get rid of potential nans
    positive_indices = ~pd.isnull(NDVI)
    NDVI = NDVI[positive_indices]

    # NDVI ranges from -1 to 1, so I'm guessing that NDVImax refers to
    # 1, but I'm not totally sure
    NDVImax = 1

    # initialize gC/m^2 array
    C = np.zeros(len(NDVI))

    # Run the calculation and populate array
    for i in range(len(NDVI)):
        C[i] = -LMA[crop] * math.log(1-(NDVI[i]/NDVImax)) / k

    # Return non-nan indices (to cut down whatever other list you're
    # plotting this data against)

    return positive_indices, C
```

You'll notice that there are a lot of comments in the code. Those look like hashtags (#) followed by some text:
```python
# This is a comment
```
Many developers (people who write code) add comments to their work so that they can keep track of exactly what they're doing at a specific line and so that if anyone else looks at their work, they'd know exactly what the developer was trying to do. It's super helpful for me to put a bunch of comments in as I'm trying to learn so that I can remind myself what I did at a given step and what I need to do next.

If you break it down and study it, this code is simply a series of steps of creating variables (distinct objects) or functions (laws), naming them, and then applying those laws to those objects. It's the same as creating planet 'a' and planet 'b', and then the law of gravity that attracts them to one another.

If you're an experienced coder, you can definitely tell that my code is *very* rough. My inexperience is on my sleeve. If you have any insights or suggestions, please let me know. My email is in the page footer.

Anyway, I wanted to share a little of what I've been thinking about and looking at this past week. I think it's really cool and opens up so many doors to being a co-creator and good steward in the world!

## 👋 Closing

Thanks for reading. I'm an amateur at thinking and writing, and I'm always a little afraid that what I say is not in tune with reality, but I need to do it to get better. If you have any comments or thoughts, please get in touch with me. I'd love to chat.

May the peace of our Lord Jesus Christ be with you always!
