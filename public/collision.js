

function PlayerCrossesStrip(playerStrip, strip) {
    if (strip.getPointCount() < 2 || playerString.getPointCount() < 2) {
        return false;
    }    
    
    var playerPoint = playerStrip.extractPoint(playerStrip.getPointCount()-1)
    var prevPlayerPoint = playerStrip.extractPoint(playerStrip.getPointCount()-2)
    
    var prevPoint = strip.extractPoint(0);
    for (var i = 1; i < strip.getPointCount(); ++i) {
        var point = strip.extractPoint(i);
        
        if (LineLineCollision(playerPoint, prevPlayerPoint, prevPoint, point) {
            return true
        }

        prevPoint = point;
    }
    
    return false;
}

function LineLineCollision (a1, a2, b1, b2) {
    var result;
    
    var ua_t = (b2.lat - b1.lat) * (a1.lng - b1.lng) - (b2.lng - b1.lng) * (a1.lat - b1.lat);
    var ub_t = (a2.lat - a1.lat) * (a1.lng - b1.lng) - (a2.lng - a1.lng) * (a1.lat - b1.lat);
    var u_b  = (b2.lng - b1.lng) * (a2.lat - a1.lat) - (b2.lat - b1.lat) * (a2.lng - a1.lng);

    if ( u_b != 0 ) {
        var ua = ua_t / u_b;
        var ub = ub_t / u_b;

        return ( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1 ) //if true line segments intersect, if not their lines intersect outside of the segments
    } else {
        return ( ua_t == 0 || ub_t == 0 ) //if true, then lines overlap, otherwise parallel
    }

};