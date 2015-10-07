Utilities = (function() {
    var timeout;
    var duration = 60000;
    var isMuted;
    var isMediaActive;

    var init = function() {
        this.isMuted = false;
        this.isMediaActive = false;
        bindEvents();
    }
    var resetTimeout = function() {
        if (timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(resetInteractive, duration);
    }
    var bindEvents = function() {
        $(document).on('click', resetTimeout);
    }
    var resetInteractive = function() {
        if (!isMediaActive) {
            resetToStart();

            Videos.closeVideos();
            DetailPanel.closeDetailPanel();
            DetailPanel.resetTextSize();
            Drawer.closeDrawer();
            if (Modal.opened){ Modal.closeModal(); }
    
            this.isMuted = false;
            this.isMediaActive = false;
        }
    }
    var toggleActiveMedia = function(bool) {
        if (this.isMediaActive != bool) {
            this.isMediaActive = !this.isMediaActive;
        }
    }
    var toggleMuted = function(bool) {
        if (this.isMuted != bool) {
            this.isMuted = !this.isMuted;
        }
    }

    return {
        init: init,
        resetTimeout: resetTimeout,
        isMuted: isMuted,
        isMediaActive: isMediaActive,
        toggleActiveMedia: toggleActiveMedia,
        toggleMuted: toggleMuted
    }
})();