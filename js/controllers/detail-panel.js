DetailPanel = (function() {
    var bigText;
    var panel;
    var detailPanel;
    var detailPanelHTML;
    var detailPanelTPL;

    var hammer;
    var mc;
    var scale;
    var vx;
    var vy;
    
    var init = function() {
        bigText = false;
        detailPanel = $('#detail-panel');
        detailPanelHTML = $('#detail-panel-template').html()
        detailPanelTPL = Handlebars.compile(detailPanelHTML);

        bindEvents();
    }
    var updateDetailPanel = function(id) {
        if (!Utilities.isPanoActive){
            var object = JSON.search(data, '//*[id="' + id + '"]');
            var rendered = detailPanelTPL(object[0]);
            detailPanel.html(rendered).addClass('active');
    
            lookToHotspot('a' + id);
            $('.media-container-thumbs a').first().addClass('active');
    
            resetDefaults();
            if (object[0].images[0].type == 'zoom') {
                setupHammerZoom();
            } else if (object[0].images[0].type == '360') {
                setupHammerPan();
            }
        }
    }
    var closeDetailPanel = function() {
        detailPanel.removeClass('active');
        resetDefaults();
        killHammer();
        returnToZoom();
    }


    var resetTextSize = function() {
        detailPanel.removeClass('larger');
    }
    var toggleTextSize = function() {
        detailPanel.toggleClass('larger');
        bigText = !bigText;
    }


    var setupHammerZoom = function() {
        $('.media-container-inner .instructions').addClass('in zoom');

        hammer = $('#hammertime');
        mc = new Hammer(hammer.get(0));
        scale = 1;

        mc.get('pinch').set({ enable: true });
        mc.on('pinchin', function(e) {
            scale -= (e.scale/100);
            if (scale < 1) {
                scale = 1;
            }
            updateHammerZoom(e);
            updateZoomer(e);
            $('.media-container-inner .instructions').removeClass('in');
        });
        mc.on('pinchout', function(e) {
            scale += (e.scale/100);
            if (scale > 4) {
                scale = 4;
            }
            updateHammerZoom(e);
            updateZoomer(e);
            $('.media-container-inner .instructions').removeClass('in');
        });
        mc.on('panmove', function(e) {
            updateHammerZoom(e);
            updateZoomer(e);
            $('.media-container-inner .instructions').removeClass('in');
        });
        mc.on('pinchend panend', function(e) {
            checkZoomBounds();
            setTimeout(function(){ 
                hammer.find('div.zoomer').removeClass('in');
            }, 1000);
        });
    }
    var updateHammerZoom = function(e) {
        var delta = 1;
        var img = $('img.zoomable')[0].getBoundingClientRect();
        
        if (scale > 1){
            vx -= e.velocityX * 2;
            vy -= e.velocityY * 2;

            if (img.width <= 640){
                if (img.left < 1281){ vx += delta; }
                if (img.right > 1919){ vx -= delta; }
            } else {
                if (img.left > 1279){ vx -= delta; }
                if (img.right < 1921){ vx += delta; }
            }
            if (img.height <= 450){
                if (img.top < 1){ vy += delta; }
                if (img.bottom > 449){ vy -= delta; }
            } else {
                if (img.top > -1){ vy -= delta; }
                if (img.bottom < 451){ vy += delta; }
            }
        } else {
            vx = 0;
            vy = 0;
        }

        hammer.find('img.zoomable').css({
            'transform': 'scale(' + scale + ') translate(' + vx + 'px, ' + vy + 'px)'
        });
    }
    var checkZoomBounds = function() {
        var delta = 1;
        var outOfBounds = false;
        var img = $('img.zoomable')[0].getBoundingClientRect();
        
        if (scale > 1) {
            if (img.width <= 640){
                if (img.left < 1280){ vx += delta; outOfBounds = true; }
                if (img.right > 1920){ vx -= delta; outOfBounds = true; }
            } else {
                if (img.left > 1280){ vx -= delta; outOfBounds = true; }
                if (img.right < 1920){ vx += delta; outOfBounds = true; }
            }
            if (img.height <= 450){
                if (img.top < 0){ vy += delta; outOfBounds = true; }
                if (img.bottom > 450){ vy -= delta; outOfBounds = true; }
            } else {
                if (img.top > 0){ vy -= delta; outOfBounds = true; }
                if (img.bottom < 450){ vy += delta; outOfBounds = true; }
            }
        } else {
            vx = 0;
            vy = 0;
        }

        hammer.find('img.zoomable').css({
            'transform': 'scale(' + scale + ') translate(' + vx + 'px, ' + vy + 'px)'
        });
        if (outOfBounds) {
            checkZoomBounds();
        }
    }
    var updateZoomer = function() {
        var zw = $('.media-container-inner').width();
        var zh = $('.media-container-inner').height();
        var iw = $('.media-container-inner > div.zoomer').width();
        var ih = $('.media-container-inner > div.zoomer').height();

        var nw = (ih * zw)/zh;

        var nscale = scale;
        if (scale > 1){
            nscale = 1/scale;
            hammer.find('div.zoomer')
                .addClass('in')
                .find('.mask')
                .width(nw)
                .height(ih)
                .css({
                    'transform': 'scale(' + nscale + ') translate(' + -(vx + iw/2) + 'px, ' + -(vy) + 'px)'
                });
        }
        if (scale == 1){
            hammer.find('div.zoomer')
                .addClass('in')
                .find('.mask')
                .width(iw)
                .height(ih)
                .css({
                    'transform': 'scale(' + scale + ') translate(0px, 0px)'
                });
        }
    }


    var setupHammerPan = function() {
        $('.media-container-inner .instructions').addClass('in pan');

        hammer = $('#hammertime');
        mc = new Hammer(hammer.get(0));

        var id = hammer.attr('data-id');
        var steps = JSON.search(data, '//hotspots[id="' + id + '"]/images/files/steps');
        var length = steps.length;
        var step = 0;
        
        mc.on('panright', function(e) {
            var src;
            if (e.deltaX % 10 == 0) {
                step--;
            }
            if (step < 0) {
                step = length;
            }
            src = steps[step];
            $('.media-container-inner > img').attr('src', src);
            $('.media-container-inner .instructions').removeClass('in');
        });
        mc.on('panleft', function(e) {
            var src;
            if (e.deltaX % 10 == 0) {
                step++;
            }
            if (step > length) {
                step = 0;
            }
            src = steps[step];
            $('.media-container-inner > img').attr('src', src);
            $('.media-container-inner .instructions').removeClass('in');
        });
    }


    var resetDefaults = function() {
        scale = 1;
        vx = 0;
        vy = 0;
    }
    var killHammer = function() {
        if (mc) {
            mc.destroy();
        }
    }


    var changeMedia = function() {
        var active = $(this).hasClass('active');
        var type = $(this).attr('data-type');
        var src = $(this).attr('data-src');
        var caption = $(this).attr('data-caption');

        if (!active) {
            killHammer();
            resetDefaults();

            $('.media-container-inner .instructions').removeClass('zoom pan in');
            if (type == 'zoom') {
                setupHammerZoom();
            }
            if (type == '360') {
                setupHammerPan();
            }

            $('.media-container-inner img').attr('src', src);
            $('.media-container-inner > img').css('transform', 'scale(' + scale + ')');
            $('.media-container-thumbs a').removeClass('active');
            $(this).addClass('active');

            if (caption){ 
                $('.media-container-inner .caption').text(caption).addClass('in'); 
            } else {
                $('.media-container-inner .caption').removeClass('in'); 
            }
            scale = 1;
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