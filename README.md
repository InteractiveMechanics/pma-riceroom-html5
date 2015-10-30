# pma-riceroom-html5

### Setting up a local development environment
*  Install Jekyll (http://jekyllrb.com/)
*  Clone the repository
*  Add in any missing files (e.g. videos)
*  Run a local web server (using MAMP, WAMP, or whatever you prefer) in the root directory
*  To regenerate data in `jekyll-data`, cd into the directory and run `jekyll serve`
*  To regenerate stylesheets, cd into `css` and run `sass --watch sass/main.scss:main.css`

### Missing files
Due to the large size of some of the files in this project, any file over 50MB should not be stored in the repo. This includes all video files or large images (like high-density TIFFs).

### Improvements
*  Control web server and build process with Grunt
