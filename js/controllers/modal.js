Modal = (function() {
    var modal;
    var video;
    var tracking;
    var opened;

    var modalHTML;
    var modalTPL;

    var init = function() {
        opened = false;
        modalHTML = $('#modal-template').html();
        modalTPL = Handlebars.compile(modalHTML)
    }
    var openModal = function(src, poster, title) {
        modal = $('#modal');
        opened = true;

        var rendered = modalTPL({src: src, poster: poster, title: title});
        modal.html(rendered).removeClass('hidden');

        video = $('#video');
        tracking = $('.video-tracker');

        Utilities.toggleActiveMedia(true);
        if (Utilities.isMuted) {
            video.get(0).muted = true;
            $('#modal .video-mute-button').addClass('muted');
        }

        bindEvents();
        setTimeout(function(){
            modal.addClass('in');
            video.get(0).play();
        }, 100);
    }
    var closeModal = function() {
        opened = false;
        video.get(0).pause();

        Utilities.toggleActiveMedia(false);
        modal.removeClass('in');
        setTimeout(function(){
            modal.addClass('hidden');
        }, 500);
    } 
    var bindEvents = function() {
        $('#modal .close').on('click', closeModal);
        $('#modal .video-play-button').on('click', function(){
            $(this).toggleClass('paused');
            if (video.get(0).paused) {
                video.get(0).play();
            } else {
                video.get(0).pause();
            }
            Utilities.toggleActiveMedia();
        });
        $('#modal .video-mute-button').on('click', function(){
            $(this).toggleClass('muted');

            if (Utilities.isMuted) {
                video.get(0).muted = false;
            } else {
                video.get(0).muted = true;
            }
            Utilities.toggleMuted();
        });

        tracking.on('change', function(e){
            var percent = $('.video-tracker').val();

            updateTrackingControl(percent);
            updateVideoTime(percent);
        });
        video.on('timeupdate', function(e) {
            var video = $('#video').get(0);
            var percent = (video.currentTime / video.duration) * 100;

            if (video.currentTime == video.duration) {
                percent = 0;
                video.currentTime = 0;
                Utilities.toggleActiveMedia(false);
            }
            updateTrackingControl(percent);
        });
    }
    var updateTrackingControl = function(percent) {
        tracking.val(percent);
    }
    var updateVideoTime = function(percent) {
        var video = $('#video').get(0);
        var newTime = (percent / 100) * video.duration;
        video.currentTime = newTime;
    }

    return {
        init: init,
        openModal: openModal,
        closeModal: closeModal,
        opened: opened
    }
})();