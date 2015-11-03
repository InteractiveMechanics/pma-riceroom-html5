Utilities = (function() {
    var timeout = [];
    var duration = 10000;
    var isMuted;
    var isMediaActive;
    var isPanoActive;

    var init = function() {
        this.isMuted = false;
        this.isMediaActive = false;  
        this.isPanoActive = false;
        bindEvents();
    }
    var resetTimeout = function() {
        if (timeout) {
            $.each(timeout, function(index, value){
                clearTimeout(value);
                timeout.splice(index, 1);
            });
        }
        timeout.push(setTimeout(resetInteractive, duration));
    }
    var bindEvents = function() {
        $(document).on('click tap drag', resetTimeout);
    }
    var resetInteractive = function() {
        if (!isMediaActive) {
            Attract.openAttract();
            Narrative.toggleNarrativeButton(false);
            Videos.closeVideos();
            Videos.makeVideosInactive();
            DetailPanel.closeDetailPanel();
            DetailPanel.resetTextSize();
            Drawer.closeDrawer();
            Modal.closeModal();

            attractRotation(0.030);
    
            this.isMuted = false;
            this.isMediaActive = false;
        }
    }
    var toggleActivePanorama = function(bool) {
        if (this.isPanoActive != bool) {
            this.isPanoActive = !this.isPanoActive;
        }
        if (this.isPanoActive) {
            disableInteraction();
        } else {
            enableInteraction();
        }
    }
    var toggleActiveMedia = function(bool) {
        if (isMediaActive != bool) {
            isMediaActive = !isMediaActive;
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
        isPanoActive: isPanoActive,
        isMediaActive: isMediaActive,
        toggleActiveMedia: toggleActiveMedia,
        toggleMuted: toggleMuted,
        toggleActivePanorama: toggleActivePanorama
    }
})();