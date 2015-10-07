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
    var onNarrativeEnd = function() {
        if (audio.currentTime == audio.duration) {
            stopNarrative();
            toggleAudioIcon(false);
        }
    }
    var stopNarrative = function () {
        audio.currentTime = 0;
        slowRotate(0);
        toggleAudioIcon(false);
        
        $.each(intervals, function(index, value){ clearTimeout(value); });
        intervals = [];

        container.removeClass('in');
        setTimeout(function(){
            container.addClass('hidden');
        }, 500);
        Utilities.toggleActiveMedia(false);
    }
    var toggleNarrativePlaying = function() {
        if (playing) {
            audio.pause();
            toggleAudioIcon(false);
            stopNarrative();
        } else {
            audio.play();
            $.each(captions, function(i, caption) {
                intervals.push(setTimeout(function(){
                    container.find('.caption-container').text(caption.text);
                    if (caption.action) {
                        var tempFunction = new Function(caption.action);
                        tempFunction();
                    }
                }, caption.time));
            });

            toggleAudioIcon(true);
            container.removeClass('hidden');
            setTimeout(function(){
                container.addClass('in');
            }, 100);
            Utilities.toggleActiveMedia(true);
        }
        playing = !playing;
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
        toggleNarrativePlaying: toggleNarrativePlaying
    }
})();