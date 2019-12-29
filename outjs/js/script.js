// Customize these...
var n = 300,
    speed = 5,//速度定义
    startSize = rand(100,300);//大小定义

// ...not these
var c = document.getElementById("c"),
    ctx = c.getContext("2d"),
    cw = (c.width = window.innerWidth),
    ch = (c.height = window.innerHeight),
    mousePos = {x:"", y:""},
    img = new Image(),
    particles = [],
    particleNumber = 0,
    Particle = function(index) {
      this.index = index;
      this.dur = (100-rand(9, 90))/speed;
      this.draw = function() {
        ctx.translate( this.x, this.y );
        ctx.globalAlpha = this.alpha;
        ctx.globalCompositeOperation = 'lighter';
        // if (index%1.5==0) ctx.globalCompositeOperation = 'overlay';
        if (index%2==0) ctx.globalCompositeOperation = 'xor';
        ctx.drawImage(img, -this.size/2, -this.size/2, this.size, this.size);
        ctx.translate( -this.x, -this.y );
      }
    };

function setParticle(p, firstRun) {
  var _x = cw*rand(0,1), _y = ch*rand(0,1), _s = startSize;
  if (rand(0,1)>0.3 && mousePos.x!=""){ //console.log(mousePos)
    _x = mousePos.x;
    _y = mousePos.y;
    _s = _s/10;
  }
  var _tl = new TimelineMax()
            .fromTo(p, p.dur, {
                x:_x,
                y:_y,
                size:_s,
                alpha:0
            },{
                size:'+='+String(rand(200,400)),
                bezier:[{alpha:rand(0.15,0.65)},{alpha:0}],
                ease:Power1.easeOut,//ease:Power0.easeNone,
                onComplete:function(){ setParticle(p); }
            });

  if (firstRun) _tl.seek(p.dur*rand()); //fast-forward on first run
}


TweenMax.ticker.addEventListener("tick", function(){
  ctx.clearRect(0, 0, cw, ch);
  for (var i=0; i<n; i++) particles[i].draw();
});


window.addEventListener('resize', doResize)
function doResize() {
  particleNumber = 0;  
  cw = (c.width = window.innerWidth);
  ch = (c.height = window.innerHeight);
  for (var i=0; i<n; i++) {
    TweenMax.killTweensOf(particles[i]);
    setParticle(particles[i], true);
  }
  TweenMax.fromTo(c, 0.3, {alpha:0},{alpha:1, ease:Power3.easeInOut});
}

// First run
for (var i=0; i<n; i++) particles.push(new Particle(i));
doResize();


function rand(min, max) {
  (min) ? min=min : min=0;
  (max) ? max=max : max=1;
  return min + (max-min)*Math.random();
}
img.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGvGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA3LTI3VDEwOjMxOjU1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wOS0xNFQxNDozMjozNSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wOS0xNFQxNDozMjozNSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0N2YyYzM3ZS1iM2UxLWQ4NGItOTJkNi04YzQ3NThhYTZiNTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6YzY5ZmMxMWEtNmM5Ni0zOTRjLWFkNmUtNDZkMGNlY2E2ZmQ1IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzY5ZmMxMWEtNmM5Ni0zOTRjLWFkNmUtNDZkMGNlY2E2ZmQ1Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjNjlmYzExYS02Yzk2LTM5NGMtYWQ2ZS00NmQwY2VjYTZmZDUiIHN0RXZ0OndoZW49IjIwMTktMDctMjdUMTA6MzE6NTUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWMxNWU5MWYtOWJiNy03ZTQyLWJmZmItMGZiM2VjNzQ3NWQ0IiBzdEV2dDp3aGVuPSIyMDE5LTA3LTI3VDEzOjE4OjU0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3ZjJjMzdlLWIzZTEtZDg0Yi05MmQ2LThjNDc1OGFhNmI1NyIgc3RFdnQ6d2hlbj0iMjAxOS0wOS0xNFQxNDozMjozNSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkYiWXAAAAk8SURBVFiF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"
