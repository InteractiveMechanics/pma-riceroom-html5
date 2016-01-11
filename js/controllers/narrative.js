Narrative = (function() {
    var audio;
    var captions;
    var playing;
    var container;
    var intervals;

    var init = function() {
        playing = false;
        container = $('#captions');
        intervals = [];
        audio = new Audio('files/narrative.mp3');

        $.get('/jekyll-data/build/audio.json', function(response) {
            captions = response;
        });
        bindEvents();
    }
    var bindEvents = function() {
        $(document).on('click', '.audio-narrative', function() {
            toggleNarrativePlaying();
        });
        audio.addEventListener('timeupdate', onNarrativeEnd);
    }

    var toggleNarrativeButton = function(bool) {
        if (bool) {
            $('.audio-narrative').addClass('in');
        } else {
            $('.audio-narrative').removeClass('in');
        }
    }
    var onNarrativeEnd = function() {
        if (audio.currentTime == audio.duration) {
            toggleNarrativePlaying();
        }
    }
    var stopNarrative = function () {
        audio.currentTime = 0;
        audio.pause();
        slowRotate(0);
        toggleAudioIcon(false);
        
        $.each(intervals, function(index, value){ clearTimeout(value); });
        intervals = [];

        Utilities.toggleActiveMedia(false);
        playing = false;
    }
    var toggleNarrativePlaying = function() {
        if (playing) {
            container.find('.caption-container').text('Touch any object');
            stopNarrative();
            Videos.makeVideosActive();
            Utilities.toggleActivePanorama(false);
        } else {
            audio.play();
            toggleNarrativeButton(true);
            toggleAudioIcon(true);
            Utilities.toggleActivePanorama(true);

            $.each(captions, function(i, caption) {
                intervals.push(setTimeout(function(){
                    container.find('.caption-container').text(caption.text);
                    if (caption.action) {
                        var tempFunction = new Function(caption.action);
                        tempFunction();
                    }
                }, caption.time));
            });

            Videos.closeVideos();
            DetailPanel.closeDetailPanel();
            Drawer.closeDrawer();
            Utilities.toggleActiveMedia(true);
            playing = true;
        }
    }
    var toggleAudioIcon = function(bool) {
        if (bool) {
            $('.audio-narrative-icon').addClass('playing');
        } else {
            $('.audio-narrative-icon').removeClass('playing');
        }
    }

    return {
        init: init,
        toggleNarrativePlaying: toggleNarrativePlaying,
        toggleNarrativeButton: toggleNarrativeButton,
        stopNarrative: stopNarrative
    }
})();