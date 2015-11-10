# pma-riceroom-html5

### Setting up a local development environment
*  Install Node with NPM (Node Package Manager)
*  Clone the repository
*  Run `npm install` from the root directory to install depedencies
*  Add in any missing files (e.g. videos), if you'd like
*  Run `grunt` from the root directory to start a local web server and check for file changes.
*  Go to localhost:8000 in your browser, and begin making edits as needed!

### Setting up a production environment
*  Clone the repository on the target machine
*  Victory!

### Missing files
Due to the large size of some of the files in this project, any file over 50MB should not be stored in the repo. This includes all video files or large images (like high-density TIFFs).

### Kiosk Configuration

* GAL009 *North, Right* (192.168.51.179) & GAL010 *South, Left* (192.168.51.180)

- [ ] Install VNC & license
- [ ] Configure Firewall for VNC (automatically done at installation)
- [ ] Install keylock SW & license key
- [ ] Configure BIOS wake up time: 9 AM every day
- [ ] Configure power on after power loss ON
- [ ] Add scheduled task for shutdown (5PM on Mon, Tues, Thurs, Sat, Sun) (11PM every day)
- [ ] Disable all Windows updates
- [ ] Disable screensaver
- [ ] Configure static IP
- [ ] Remove any public wifi and make sure kiosk is on employee wifi
- [ ] Change UAC to lowest mode
- [ ] set chrome homepage to local destination
- [ ] Configure keylock SW
