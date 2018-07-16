# Preloadr

Preloadr is a JavaScript library that allows you attach a number of elements to a loading queue, and fire and event only when all of them have been declared as "completed".

For example, when you're loading a web page, you may want to add some sort of preloading functionality, by adding a class to the `<body>` element of the page, only when, say, webfonts have loaded, and images in the top portion of the page are ready to be displayed.

## Installation

Here's what you need to do to include the library in your project:

### NPM

If you're using NPM and a tool such as Webpack, simply download the package with the following command:

```
npm install evolvethemes-preloadr --save
```

### Standard way

Download the [minified script](https://raw.githubusercontent.com/Justevolve/preloadr/master/dist/evolvethemes-preloadr.min.js) from the `dist` folder in this repository (the `master` branch holds the latest release, while the `dev` branch is for development purposes).

## Usage

Elements that need to be preloaded must be registered using the `init` function of the `Preloadr` object.

```
var queue = [
    "fonts",
    "images"
];

window.Preloadr.init( queue );
```

The above code essentially tells the Preloadr object that we need to wait for loading confirmation from two elements, before we can declare the loading of the page as concluded.

After the registration, we then proceed add the logic that will bring all the elements to completion. When an element has fully loaded, you can pass the information to the Preloadr object:

```
window.Preloadr.complete( "fonts" );
```

where "fonts" is the name of the module.

When a single element has loaded, the `html` element of the page will emit a `evolvethemes-preloadr-element-$element-loaded` event.

When all elements in the queue have loaded, the `html` element of the page will emit a `evolvethemes-preloadr-loaded` event.

## What's Evolve Themes

At [Evolve](https://justevolve.it/) we're specialized in the creation of top notch products based on WordPress, and under the Evolve Themes brand we regularly publish and sell themes and plugins.
