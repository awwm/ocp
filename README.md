# ocp
Odds Comparison Plugin.
==============

## Getting Started

To get WordPress installation running follow these simple steps.

## Prerequisites

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)


## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/awwm/ocp
   ```

2. Modify passwords and variables inside ```.env``` file as you wish.
3. Currently all ids and passwords are same as current env file.
4. PLugin files are under ```wp-content/plugins/odds-comparison``` folder.
5. Copy or zip plugin folder and paste or install on any wordpress installation.
6. Under plugin folder 
   ```sh
   npm install
   ```
7. Incase need to re-compile files 
   ```sh
   npm run build
   ```

## Overview
1. Created two blocks which are listed under category `widgets`.
   1.1 Odds Comparison 
   1.2 Betting Calculator

2. Registered both blocks through `block.json` but frontend rendering one by php and another one by js save method.
3. I did not get the proper api end point so i did little bit research i found free odds api 
   ```URL is https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=eu&markets=h2h&apiKey=81fcb06f4f39ab2a3faf0dbe93e23524 ```
4. As per mine limited knowledge regarding odds so i just tried to display different sports and bookkeepers prices according to home and away teams.