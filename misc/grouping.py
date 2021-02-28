####################
#
# Title: grouping.py
# Author: Joshua Eastman
#
# Description:
#       Given an input csv with columns
# • "Name"
# • "Email"
# • "Campus" (see below)
#
# Randomly groups rows of input csv into
# a maximum number of groups of 5 and
# then groups of 4
#
# Outputs .csv titled "groupings.csv"
# with columns "Name", "Email", "Campus", and "Group"
# where "Group" is a number from 0 to n-1 groups formed
# denoting the group assignment of the individual
#
#
# ARGS:
# (1) filename of input CSV
######################

import random
import pandas as pd
import sys

dat = pd.read_csv(sys.argv[1])

nWeeks = 1
nPeople = len(dat['Name'])
names = dat['Name'].tolist()
emails = dat['Email'].tolist()
campus = dat['Campus'].tolist()

# determine group sizes, maximizing 5
sMax = 5
sMin = 4
maxes = nPeople
mins = 0
flag = True
while not maxes % sMax == 0:
    maxes -= sMin
    mins += sMin

groupSizes = ([sMax]*int(maxes/sMax)) + ([sMin]*int(mins/sMin))

groups = [None]*nWeeks

for i in range(nWeeks):
    
    # create an array to hold arrays of groups
    groups[i] = []
    
    for j in range(len(groupSizes)):
        
        # seed the random number generator
        random.seed()
        
        gs = groupSizes[j]
        
        grp = []
        
        for k in range(gs):
            
            # get a random index of remaining zees
            index = random.randint(0, len(names)-1)
            
            # select the info
            person = [git
                names[index],
                emails[index],
                campus[index]
            ]
            
            # add them to the current group
            grp.append(person)
            
            # remove them from the working list
            del names[index]
            del emails[index]
            del campus[index]
        
        groups[i].append(grp)

# write groups to file

f = open('./groupings.csv','w')
for week in range(nWeeks):
    f.write('Week '+str(week)+'\n')
    f.write(','.join(['Name','Email','Campus','Group']))
    f.write('\n')
    for grp in range(len(groupSizes)):
        for person in groups[week][grp]:
            full = person+[str(grp)]
            f.write(','.join(full))
            f.write('\n')
f.close()