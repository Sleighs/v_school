A great way to practice building web sites and web apps is to copy sites or apps that already exist.

So, your assignment is to re-create the first page of [this](https://startbootstrap.github.io/startbootstrap-clean-blog/) sample blog website.

You will organize it into these components:

(Indented components are suppose to be nested. E.g. `Header` should render a `Navbar` component and `BlogList` should render a `BlogPost` component).

```
<Header />
    <Navbar />
<BlogList />
    <BlogPost />
<Footer />

```

You will pass `<BlogPost />` its `title`, `subTitle`, `author`, and `date` through props.

For now, we're using hard-coded data (seen below), but eventually you'll be able to pull this data from an API instead.

But until we get there, feel free to use `.map()` on the following array of data:

```
[
    {
        title: "Man must explore, and this is exploration at its greatest",
        subTitle: "Problems look mighty small from 150 miles up",
        author: "Start Bootstrap",
        date: "September 24, 2019"
    },{
        title: "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
        subTitle: "",
        author: "Start Bootstrap",
        date: "September 18, 2019"
    },{
        title: "Science has not yet mastered prophecy",
        subTitle: "We predict too much for the next year and yet far too little for the next ten.",
        author: "Start Bootstrap",
        date: "August 24, 2019"
    },{
        title: "Failure is not an option",
        subTitle: "Many say exploration is part of our destiny, but it’s actually our duty to future generations.",
        author: "Start Bootstrap",
        date: "July 8, 2019"
    }
]

```

****Passing Criteria****
The site needs to work, in such that the data from this array through React components and displayed to the user.
As far as how it looks, Practice placing thecd blo text over the image. Make it look nice and generally like the site. After the text is over the image, see how much styling you can do in a focused hour.

#