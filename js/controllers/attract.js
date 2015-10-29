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
        $('#attract').removeClass('hidden');
        setTimeout(function(){
            $('#attract').addClass('in');
        }, 100);
    }
    var closeAttract = function() {
        attract.removeClass('in');
        setTimeout(function(){
            attract.addClass('hidden');
            Narrative.toggleNarrativePlaying();
        }, 500);
    }
    
    return {
        init: init,
        openAttract: openAttract
    }
})();