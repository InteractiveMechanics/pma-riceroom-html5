Videos = (function() {
    var videos;
    var videosHTML = $('#videos-template').html();
    var videosTPL = Handlebars.compile(videosHTML);

    var init = function() {
        videos = $('#videos');
        bindEvents();
        var rendered = videosTPL(data);

        $('#videos .video-container').html(rendered);
    }
    var makeVideosActive = function() {
        videos.addClass('active');
    }
    var makeVideosInactive = function() {
        videos.removeClass('active');
    }
    var openVideos = function() {
        videos.addClass('in');

        DetailPanel.closeDetailPanel();
        Drawer.closeDrawer();
    }
    var closeVideos = function() {
        videos.removeClass('in');
    }
    var bindEvents = function() {
        videos.on('click', '.see-all', openVideos);
        videos.on('click', '.close', closeVideos);
        videos.on('click', '.video', function(){
            var src = $(this).attr('data-src');
            var poster = $(this).attr('data-poster');
            var title = $(this).attr('data-title');

            Narrative.stopNarrative();
            Modal.openModal(src, poster, title);
        });
    }

    return {
        init: init,
        openVideos: openVideos,
        closeVideos: closeVideos,
        makeVideosActive: makeVideosActive,
        makeVideosInactive: makeVideosInactive
    }
})();