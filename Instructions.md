# Frontend Mentor - FX Checker

![Design preview for the FX Checker coding challenge](./preview.jpg)

## Welcome! 👋

This challenge is part of the **Frontend Mentor 30-Day Hackathon**, so for the next 30 days it's free for everyone, including free access to the Figma design file. [Frontend Mentor](https://www.frontendmentor.io) challenges help you improve your coding skills by building realistic projects, and this one makes a great portfolio piece.

**To do this challenge, you need a good understanding of HTML, CSS, and JavaScript, plus some experience working with a REST API.**

## 🏆 FM30 Hackathon

For the 30 days of the hackathon, FX Checker is **free+**: the starter code and the Figma design are free for everyone. After the hackathon it becomes a premium challenge.

- **Submit your entry** by posting your solution on the Frontend Mentor platform, then sharing your solution-page link in the **#hackathon-submissions** channel on our [Discord community](https://www.frontendmentor.io/community), in the FX Checker thread.
- **Every entry needs a complete README** (the `README-template.md` in this starter is a good base) to count as a valid submission.
- **Prizes:** 1st place gets a one-year Pro subscription, 2nd and 3rd each get a one-month Pro subscription.
- Share your progress as you build with the **#FM30Hackathon** hashtag. We'll be watching and resharing our favorites.

[Read the full hackathon rules, dates, and judging details here](https://www.frontendmentor.io/articles/fm30-hackathon-currency-converter).

## The challenge

Your challenge is to build out this FX Checker currency app and get it looking as close to the design as possible.

The app converts between currencies using live exchange rates, with a rate-history chart, a multi-currency comparison, pinned favorite pairs, and a running log of conversions. You can use any tools you like, so if there's something you've been wanting to practice, give it a go.

Your users should be able to:

### Converter

- Enter an amount to send and see it convert in real time as they type
- Pick the "send" and "receive" currencies from a searchable currency picker
- See the live exchange rate for the active pair (for example, `1 USD = 0.8530 EUR`)
- Swap the send and receive currencies with the swap button
- Favorite the active pair, and log a conversion to their history

### Currency picker

- Search the full list of available currencies by code or name
- See currencies grouped into "Popular" and "Other currencies", each row showing the flag, code, and name
- See a check against the currency that's currently selected

### Live markets ticker

- See a ticker of currency pairs, each with its current rate and 24-hour change (up or down)

### Rate history

- View a line and area chart of the active pair's rate over time
- Switch the chart range between 1D, 1W, 1M, 3M, 1Y, and 5Y
- See the open, last, absolute change, and percentage change for the selected range

### Compare

- See their send amount converted into a range of other currencies at once, each with its reference rate
- Pin or unpin any comparison row to their favorites

### Favorites

- See their pinned pairs, each with its live rate and 24-hour change
- Load a pinned pair back into the converter by selecting its row
- Unpin a pair they no longer want to track

### Conversion log

- See a log of conversions they've made, each showing the relative time, the pair, and the send and receive amounts
- Clear the whole log
- Delete an individual entry

### UI & accessibility

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app using only their keyboard

### Data

There's no data file for this challenge. The exchange rates come from a live API, and the user's own data (favorites and conversion log) is saved in the browser.

We recommend the [Frankfurter API](https://frankfurter.dev/) for the rates. It's free, needs no API key, has no rate limits, is CORS-enabled, and is backed by the European Central Bank. A few endpoints cover everything in the design:

- `GET /v2/currencies` to populate the currency picker
- `GET /v2/latest?base=USD` for the converter, ticker, and comparison rates
- `GET /v2/latest?base=USD&symbols=EUR` for a lighter single-pair lookup
- `GET /v2/{start}..{end}?base=USD&symbols=EUR` for the rate-history time series

You're free to use a different exchange-rate API if you prefer. Just note that the history chart needs time-series data, so check your chosen API supports it.

### Saving favorites and the conversion log

A user's pinned pairs and their conversion log should persist across browser sessions. When they pin a pair or log a conversion, that change should still be there when they close and reopen the app. `localStorage` is a natural fit, since this app doesn't need user accounts. It's also a nice touch to remember the last tab they had open.

### States to handle

- **Empty favorites:** when nothing is pinned yet, show the prompt to pin a pair rather than an empty list
- **Empty log:** when no conversions have been logged, show the prompt explaining that conversions are recorded automatically
- **Empty comparison:** when the send amount is empty, prompt the user to enter an amount
- **Chart error:** if the rate history can't load, show a friendly message rather than a broken chart

### Accessibility

- Make sure keyboard navigation works for all interactive elements, including the currency pickers, the swap button, the tabs, the chart range controls, and the favorite and pin toggles
- Provide visible focus styles. Dark interfaces hide weak focus rings, so these matter more than usual here
- Use appropriate semantic HTML for the tabs, the lists of currencies and conversions, and the currency picker popover
- Announce dynamic changes to screen readers, such as the converted amount updating, a pair being pinned, or a conversion being logged

### Ideas to test yourself

- Add a light theme so users can switch between the dark-first design and a light alternative
- Persist the active currency pair in the URL so a conversion can be bookmarked or shared
- Add keyboard shortcuts so power users can focus the search, swap currencies, and switch the chart range without the mouse
- Export the conversion log as a CSV file
- Add a hover crosshair to the rate chart that shows the exact date and rate under the cursor
- Cache the last successful rates and fall back to them with an out-of-date banner when the API is unreachable
- Build as a full-stack app with accounts so a user's favorites and conversion log sync across devices

### Want some support on the challenge?

[Join our community](https://www.frontendmentor.io/community) and ask questions in the **#help** channel.

## Where to find everything

Your task is to build out the project to the Figma design file provided. During the hackathon, you can download the design for free on the platform. The design download comes with a `README.md` file to help you get set up. There are a couple of `.gitignore` files in this starter to keep the design files out of your repo, so please leave them in place.

All the required assets for this project are in the `/assets` folder. The icons and flags are already exported and optimized, and the logo is provided as an SVG. We also include the variable font file for JetBrains Mono. You can either link to Google Fonts or use the local font file to host the font yourself.

The design system in the design file has all the details on the colors, fonts, spacing, and styles used in this project. Our fonts always come from [Google Fonts](https://fonts.google.com/).

The starter `index.html` already contains the static written content from the design, with comments marking where the dynamic, data-driven content goes. Building the HTML structure around it is part of the challenge.

## Using AI coding assistants

We've included two files to help you if you're using AI coding assistants (like Claude, GitHub Copilot, Cursor, etc.) while working on this challenge:

- `AGENTS.md` - Contains detailed instructions for AI assistants on how to help you with this challenge. It's tailored to this challenge's difficulty level, so the AI will provide guidance appropriate to your learning stage—offering more support for beginner challenges and encouraging more independence on advanced ones.
- `CLAUDE.md` - A pointer file that directs Claude-based tools to the AGENTS.md instructions.

**How to use them:** You don't need to do anything! These files are automatically detected by most AI coding tools. The AI will read them and adjust its behavior to be a better learning partner—guiding you toward solutions rather than just giving you the answers.

**Note:** These files are designed to help you *learn*, not to do the work for you. The AI is instructed to ask questions, give hints, and explain concepts rather than writing complete solutions.

## Building your project

Feel free to use any workflow that you feel comfortable with. Below is a suggested process, but do not feel like you need to follow these steps:

1. Separate the `starter-code` from the rest of this project and rename it to something meaningful for you. Initialize the codebase as a public repository on [GitHub](https://github.com/). Creating a repo will make it easier to share your code with the community if you need help. If you're not sure how to do this, [have a read-through of this Try Git resource](https://try.github.io/). **⚠️ IMPORTANT ⚠️: There are already a couple of `.gitignore` files in this project. Please do not remove them or change the content of the files. If you create a brand new project, please use the `.gitignore` files provided in your new codebase. This is to avoid the accidental upload of the design files to GitHub.**
2. Configure your repository to publish your code to a web address. This will also be useful if you need some help during a challenge as you can share the URL for your project with your repo URL. There are a number of ways to do this, and we provide some recommendations below.
3. Look through the designs to start planning out how you'll tackle the project. This step is crucial to help you think ahead for CSS classes to create reusable styles.
4. Before adding any styles, structure your content with HTML. Writing your HTML first can help focus your attention on creating well-structured content.
5. Write out the base styles for your project, including general content styles, such as `font-family` and `font-size`.
6. Start adding styles to the top of the page and work down. Only move on to the next section once you're happy you've completed the area you're working on.

## Deploying your project

As mentioned above, there are many ways to host your project for free. Our recommended hosts are:

- [GitHub Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

You can host your site using one of these solutions or any of our other trusted providers. [Read more about our recommended and trusted hosts](https://www.frontendmentor.io/guides/hosting-your-solution).

## Submitting your hackathon entry

To enter, there are two steps:

1. **Submit your solution on the Frontend Mentor platform.** This is required. It creates your solution page, with your live site and a link to your GitHub repo. Follow our ["Complete guide to submitting solutions"](https://www.frontendmentor.io/guides/how-to-submit-solutions) if you need a hand.
2. **Share your solution-page URL** in the **#hackathon-submissions** channel on our [Discord community](https://www.frontendmentor.io/community), in the FX Checker thread. That link is your entry, since it points to both your live demo and your repo.

Make sure your repo includes a complete README so the team and the community can understand what you built.

If you're looking for feedback on your solution, be sure to ask questions when submitting it. The more specific and detailed you are with your questions, the higher the chance you'll get valuable feedback from the community.

## Sharing your solution

There are multiple places you can share your solution:

1. Share your progress and your finished project with the **#FM30Hackathon** hashtag so we can find it and reshare our favorites.
2. Share your solution page in the **#finished-projects** channel of our [community](https://www.frontendmentor.io/community).
3. Share on [X (formerly Twitter)](https://x.com/frontendmentor) and mention **@frontendmentor**, including the repo and live URLs in your post. We'd love to take a look at what you've built and help share it around.
4. Share your solution on [LinkedIn](https://www.linkedin.com/company/frontend-mentor/).
5. Blog about your experience building your project. Writing about your workflow, technical choices, and talking through your code is a brilliant way to reinforce what you've learned. Great platforms to write on are [dev.to](https://dev.to/), [Hashnode](https://hashnode.com/), and [CodeNewbie](https://community.codenewbie.org/).

## Got feedback for us?

We love receiving feedback! We're always looking to improve our challenges and our platform. So if you have anything you'd like to mention, please email hi[at]frontendmentor[dot]io.

**Have fun building, and good luck in the hackathon!** 🚀
