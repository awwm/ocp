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