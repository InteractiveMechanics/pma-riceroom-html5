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
    var cx;
    var cy;
    
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
        $('.media-container-thumbs a').first().addClass('active');

        resetDefaults();
        if (object[0].images[0].type == 'zoom') {
            setupHammerZoom();
        } else if (object[0].images[0].type == '360') {
            setupHammerPan();
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
        hammer = $('#hammertime');
        mc = new Hammer(hammer.get(0));

        mc.get('pinch').set({ enable: true });
        mc.on('pinchin', function(e) {
            scale -= (e.scale/100);
            if (scale < 1) {
                scale = 1;
            }
            cx = ((1920 - e.center.x)/640) * 100;
            cy = (e.center.y/450) * 100;
            updateHammerZoom(scale, vx, vy, cx, cy);
            updateZoomer(scale, vx, vy, cx, cy);
        });
        mc.on('pinchout', function(e) {
            scale += (e.scale/100);
            if (scale > 4) {
                scale = 4;
            }
            cx = ((1920 - e.center.x)/640) * 100;
            cy = (e.center.y/450) * 100;
            updateHammerZoom(scale, vx, vy, cx, cy);
            updateZoomer(scale, vx, vy, cx, cy);
        });
        mc.on('panmove', function(e) {
            vx -= e.velocityX * 2;
            vy -= e.velocityY * 2;
            updateHammerZoom(scale, vx, vy, cx, cy);
            updateZoomer(scale, vx, vy, cx, cy);
        });
        mc.on('pinchend panend', function(e) {
            setTimeout(function(){ 
                hammer.find('div.zoomer').removeClass('in');
            }, 500);
        });
    }
    var setupHammerPan = function() {
        hammer = $('#hammertime');
        mc = new Hammer(hammer.get(0));

        var id = hammer.attr('data-id');
        var steps = JSON.search(data, '//hotspots[id="' + id + '"]/images/files/steps');
        var length = steps.length;
        var step = 0;
        
        mc.on('panright', function(e) {
            var src;
            if (e.deltaX % 16 == 0) {
                step++;
            }
            if (step > length) {
                step = 0;
            }
            src = steps[step];
            $('.media-container-inner > img').attr('src', src);
        });
        mc.on('panleft', function(e) {
            var src;
            if (e.deltaX % 16 == 0) {
                step--;
            }
            if (step < 0) {
                step = length;
            }
            src = steps[step];
            $('.media-container-inner > img').attr('src', src);
        });
    }
    var updateHammerZoom = function(scale, vx, vy, cx, cy) {
        hammer.find('img.zoomable').css({
            'transform-origin': cx + '% ' + cy + '% 0',
            'transform': 'scale(' + scale + ') translate(' + vx + 'px, ' + vy + 'px)'
        });
    }
    var updateZoomer = function(scale, vx, vy, cx, cy) {
        var zw = $('.media-container-inner').width();
        var zh = $('.media-container-inner').height();
        var iw = $('.media-container-inner > div.zoomer').width();
        var ih = $('.media-container-inner > div.zoomer').height();

        var nw = (ih * zw)/zh;

        var nscale = scale;
        if (scale > 1){
            nscale = 1/scale;
        }

        hammer.find('div.zoomer')
            .addClass('in')
            .find('.mask')
            .width(nw)
            .height(ih)
            .css({
                'transform': 'scale(' + nscale + ') translate(' + -(vx/scale) + 'px, ' + -(vy/scale) + 'px)',
                'transform-origin': cx + '% ' + cy + '% 0'
            });
    }
    var resetDefaults = function() {
        scale = 1;
        vx = 0;
        vy = 0;
        cx = 50;
        cy = 50;
    }
    var killHammer = function() {
        mc.destroy();
    }
    var changeMedia = function() {
        var active = $(this).hasClass('active');
        var type = $(this).attr('data-type');
        var src = $(this).attr('data-src');
        var caption = $(this).attr('data-caption');

        if (!active) {
            killHammer();
            resetDefaults();

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