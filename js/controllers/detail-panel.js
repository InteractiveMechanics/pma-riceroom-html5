DetailPanel = (function() {
    var bigText;
    var panel;
    var detailPanel;
    var detailPanelHTML;
    var detailPanelTPL;
    var scale;
    
    var init = function() {
        bigText = false;
        detailPanel = $('#detail-panel');
        detailPanelHTML = $('#detail-panel-template').html()
        detailPanelTPL = Handlebars.compile(detailPanelHTML);

        bindEvents();
    }
    var updateDetailPanel = function(id) {
        var object = JSON.search(data, '//*[id="' + id + '"]');
        var rendered = detailPanelTPL(object[0]);
        scale = 1;

        detailPanel.html(rendered).addClass('active');
        lookToHotspot('a' + id);
        $('.media-container-thumbs a').first().addClass('active');
        $('.media-container-inner.media-type-zoom').hammer().on('tap', function(event) {
            console.log(event);
            scale += 0.1;
            $(this).find('img').css('transform', 'scale(' + scale + ')');
        });
    }
    var closeDetailPanel = function() {
        detailPanel.removeClass('active');
        returnToZoom();
    }
    var resetTextSize = function() {
        detailPanel.removeClass('larger');
    }
    var toggleTextSize = function() {
        detailPanel.toggleClass('larger');
        bigText = !bigText;
    }
    var changeMedia = function() {
        var active = $(this).hasClass('active');
        var type = $(this).attr('data-type');
        var src = $(this).attr('data-src');
        var caption = $(this).attr('data-caption');

        if (!active) {
            scale = 1;
            $('.media-container-inner img').css('transform', 'scale(' + scale + ')');
            $('.media-container-thumbs a').removeClass('active');
            $(this).addClass('active');

            $('.media-container-inner').removeClass('media-type-zoom media-type-360 media-type-context').addClass('media-type-' + type);
            $('.media-container-inner img').attr('src', src);
            if (caption){ 
                $('.media-container-inner .caption').text(caption).addClass('in'); 
            } else {
                $('.media-container-inner .caption').removeClass('in'); 
            }
        }
    }
    var bindEvents = function() {
        detailPanel.on('click', '.close', closeDetailPanel);
        detailPanel.on('click', '.text-size', toggleTextSize);
        detailPanel.on('click', '.media-thumb', changeMedia);
    }

    return {
        init: init,
        updateDetailPanel: updateDetailPanel,
        closeDetailPanel: closeDetailPanel,
        resetTextSize: resetTextSize
    }
})();