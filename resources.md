# Resources

I also will compile a list of resources that I used to complete this project. I have

- never setup a home server
- never done any form of frontend web development
- never done any frontend design

so I think it would also be helpful to know what I used to actually learn how to do all of this.

## Home Server
I don't want to pay for an AWS machine for my senior project that will probably be used by a total of 5 people. So, I want to take some old laptops that the lovely Besser Company gave me to create my own home server. <br>
Below are the specs for both laptops (they're the same model)

Processor: __Intel i5-2520M 2.50GHz__ <br>
RAM: __4GB__

so uhhhhh, yeah they're pretty ass. Which means you shouldn't have any issue finding cheap equivalents.

## The very beginning

**ChatGPT** is the first resource I use for pretty much anything. Before any project I braindump every single thing I'm considering into an LLM. I don't have it write an code, I don't have it solve any issues, I just want to know what I need for my specific application.

From there, I watched these youtube videos:
1. Why not to host your own server: https://youtu.be/URWlY3Qr9l8?si=AHPFoeVhQ5BfgTHE
2. What to look for when hosting your own server: https://youtu.be/5FVsJYsuBCQ?si=ROFsY6Y-MEjCb7tF
3. How to setup Ubuntu server: https://youtu.be/K2m52F0S2w8?si=aYFQNAzgSUQVIA_5
4. This article to create the ISO on a usb driver: https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview
5. This repo on security of home servers: https://github.com/imthenachoman/How-To-Secure-A-Linux-Server
6. Made the ip static: https://www.freecodecamp.org/news/setting-a-static-ip-in-ubuntu-linux-ip-address-tutorial/

It took me a few hours in total but I got both machines up and running and successfully SSH'd into them.

Before I open them up to the public, I need to figure out setting them both up on VLAN's so that even if I mess up some form of security, my parents personal devices on the internet aren't affected.

## Frontend

Again, **ChatGPT** is the first source of information. I just explained exactly what I wanted out of my application, and asked what a complete beginner would have to do to accomplish this goal.

From there, I read through these:
1. HTML semantic elements: https://www.w3schools.com/html/html5_semantic_elements.asp
2. CSS basics: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content
3. CSS selectors: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Basic_selectors
4. CSS gridbox intro: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
5. Video on CSS intuition: https://youtu.be/i1FeOOhNnwU?si=uMwTzmScS4bN4qaP
6. A cool cheat sheet for flex boxes: https://yoksel.github.io/flex-cheatsheet/
7. A setup for Next.js https://www.youtube.com/watch?v=AaQfCKJLMGY
8. images and fonts: https://nextjs.org/docs/app/getting-started/images-and-fonts

This got me to the point of creating the landing page for Serpent. Note, I took the default landing page, referenced the documentation listed above, and went through line by line asking ChatGPT to explain anything I didn't understand. A list of dumb questions I asked:

- What do I say yes and no to on the initial Next.js project setup questions?
- What are the best practices for structuring my directories
- Can I name my pages something other than page.tsx?
- Where do I put my API's if not in the app directory

Along the way, I also created a logo, it's just the symbol 'Delta' with two oval's as eyes.

I would say that this concludes the very basics of frontend for me, so here are a couple things that I learned at this milestone.

__Next.js is Node.js__—This one is funny because I literally had no clue that one of the selling points of Next.js was the fact that it has full-stack capabilities. This caused me to delete my front and backend repo's and create a new single repo to make my app.

__Free Tier of Canva sucks__—Thats all, I used Draw.io and then imported into canva just to get dimensions right, god Canva sucks.

__Next.js structure__—It's pretty cool that Next.js lets you structure your app so cleanly. I'm sure it's the standard but having your main 'app' directory that holds your home page, your global styles, etc, and then subdirectories to hold other pages of your app along with component folders for each is very intuitive.

And that's about all for the very beginning. I really did only visit those 8 links, truly just use ChatGPT. Don't have it write anything for you, just ask it literally anything that you don't understand. Yeah—it's bad at math and can't write complex things for you in one query, but one thing it's good at is regurgitating documentation in a more digestible format.




## Backend

Yet again I start with **ChatGPT**—you know the drill.

1. Figuring out GitHub's API usage: https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user
2. how to use Next properly: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
3. https://stackoverflow.com/questions/75418329/how-do-you-put-api-routes-in-the-new-app-folder-of-next-js

Okay so now I had to import over the leetcode api routes [from my other repo](https://github.com/abrege11/leetcode-api), which were modified from the posts below.
4. https://leetcode.com/discuss/general-discussion/1297705/is-there-public-api-endpoints-available-for-leetcode
5. https://www.reddit.com/r/leetcode/comments/14dn47v/leetcode_api/
Likewise it was a long time ago, but I think I glanced at this repo as well:
6. https://github.com/alfaarghya/alfa-leetcode-api
Regardless, these people are way smarter than me and I merely translated their knowledge so check them out for more information on the api's.


