Attract = (function() {
    var attract;

    var init = function() {
        attract = $('#attract');
        bindEvents();
        attractRotation(0.030);
    }
    var bindEvents = function() {
        attract.on('click tap', closeAttract);
    }
    var openAttract = function () {
        attractRotation(0.030);
        $('#captions').removeClass('in');
        $('#attract').removeClass('hidden');
        setTimeout(function(){
            $('#attract').addClass('in');
        }, 100);
    }
    var closeAttract = function() {
        attract.removeClass('in');
        setTimeout(function(){
            slowRotate(0);
            resetToStart();

            $('#captions').addClass('in');
            attract.addClass('hidden');
            Videos.makeVideosActive();
            Narrative.toggleNarrativeButton(true);
            Utilities.toggleActivePanorama(false);
        }, 500);
    }
    
    return {
        init: init,
        openAttract: openAttract
    }
})();