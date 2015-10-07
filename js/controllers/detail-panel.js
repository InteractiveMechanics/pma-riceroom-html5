DetailPanel = (function() {
    var bigText;
    var panel;
    var detailPanel;
    var detailPanelHTML;
    var detailPanelTPL;
    
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

        detailPanel.html(rendered).addClass('active');
        lookToHotspot('a' + id);
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
        var type = $(this).attr('data-type');
        var src = $(this).attr('data-src');
        var caption = $(this).attr('data-caption');
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