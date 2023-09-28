
<a name="readme-top"></a>
<!--

<!-- PROJECT LOGO -->
<br />
<div align="center">
 

  <h3 align="center">Just Another Web App</h3>

  <p align="center">
    Your best recipe book!
    <br />
    <br />
    <br />
    <a href="https://jawa-zeta.vercel.app/">View the app!</a>
    ·
    <a href="https://github.com/tuszmak/jawa/issues">Report Bug</a>
    ·
    <a href="https://github.com/tuszmak/jawa/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
   
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
![Product Name Screen Shot][product-screenshot]

I like to cook a lot of different dishes, and have a lot of recipes. The problem is that I travel a lot, and I can't bring my recipes with me. Also I have a recurring question on what to cook given the state of my materials. 
I also wanted to learn Next.js, and the combination of these two desires became this website.

Why should you use this site?
* Your brain and travel belongings has enough things to store already.
* You shouldn't waste precious time on thinking of what to cook, and focus on the task at hand.
* You can use your phone when cooking, and not worry about damaging your recipe book.

This project is still being worked on, and is not the finished product. If you find any bugs or want to see new features on it, be sure to open an issue for it.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The webpage is available through this link. If you want a local version of it though, then feel free to follow these instructions.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/tuszmak/jawa.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your Database information
   ```js
   "POSTGRES_PRISMA_URL": Your DB url link
   "POSTGRES_URL_NON_POOLING": Your non-polling DB url
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

When you first load in, you have two choices.
1. List the recipes in your DB
2. Roll a random recipe. 

Recipelist:
Here you can do basic recipe tasks, like adding or deleting it. Clicking on the hamburger icon brings out more options.

Roll: The program will ask you some questions, and after that it rolls you a recipe.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap


- [ ] Add images to recipes
- [ ] Docker
- [ ] Tests

See the [open issues](https://github.com/tuszmak/jawa/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[product-screenshot]: images/screenshot.jpg
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
