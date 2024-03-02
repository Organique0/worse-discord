Next.js 13, React, Socket.io, Prisma, Tailwind, Supabase, UploadThing, Clerk

Link: https://www.youtube.com/watch?v=ZbX4Ok9YX94

An amazing image generator: https://dummyimage.com/
*****************
Hosted on Railway.app

Update:

Railway wanted $5.

"No, thank you," I replied.

So, I tried Azure.

The file size was to big for my free plan

I tried AWS instead

Too many problems.

My last hope was Google Cloud.

This is where it is hosted now.

Database is currently hosted on Vercel

*****************

On a second brach there is my attempt of using Supabase for authentication.

It did not work no matter what. Almost got it to work except for a little refresh bug that I was not able to fix.

Now it is using Clerk for authentication.

This whole time, after trying everything possible, remaking the auth 2 times, the "bug" was the in the way my css would interact with the LastPass extension that I have.
Sidebar was set to hidden on small screens, and the extension would shrink the screen on login to show a notification. 
Because of that, on initial page load, the sidebar was set to hidden.
I don't know why I did not just inspect the page sooner to see that the sidebar was there the whole time but luckily I did after all.

There are still some problems with the sidebar not showing. Something to do with Tailwind screen size properties not working like they should.
