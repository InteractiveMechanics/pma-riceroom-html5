Drawer = (function() {
    var drawer;
    var drawerHTML;
    var drawerTPL;
    var opened;

    var init = function() {
        opened = false;
        drawer = $('#drawer-panel');
        drawerHTML = $('#drawer-panel-template').html();
        drawerTPL = Handlebars.compile(drawerHTML);

        bindEvents();
    }
    var openDrawer = function(id) {
        opened = true;
        var objects = JSON.search(data, '//drawers[id="' + id + '"]/objects');
        var hotspots = [];
        $.each(objects, function(key, value){
            var hotspot = JSON.search(data, '//hotspots[id=' + value + ']');
            hotspots.push(hotspot[0]);
        });
        var rendered = drawerTPL(hotspots);

        drawer.html(rendered).addClass('active');
        DetailPanel.closeDetailPanel();
        Videos.closeVideos();
        lookToHotspot(id);
    }
    var closeDrawer = function() {
        opened = false;
        drawer.removeClass('active');
        drawer.find('.object').removeClass('open');
        DetailPanel.closeDetailPanel();
        returnToZoom();
    }
    var openDetailPanel = function() {
        var id = $(this).attr('data-id');
        drawer.find('.object').removeClass('open');
        $(this).addClass('open');
        DetailPanel.updateDetailPanel(id);
    }
    var bindEvents = function() {
        drawer.on('click', '.close', closeDrawer);
        drawer.on('click', '.object', openDetailPanel);
    }

    return {
        init: init,
        openDrawer: openDrawer,
        closeDrawer: closeDrawer
    }
})();