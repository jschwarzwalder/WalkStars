

function PlayerCollision(playerPath, enemyPath) {
    if (enemyPath.length < 2 || playerPath.length < 2) {
        return false;
    }    
    
    var playerPoint = playerPath[playerPath.length-1]
    var prevPlayerPoint = playerPath[playerPath.length-2]
    
    var prevPoint = enemyPath[0];
    for (var i = 1; i < enemyPath.length; ++i) {
        var point = enemyPath[i];
        
        if (LineLineCollision(playerPoint, prevPlayerPoint, prevPoint, point)) {
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

module.exports = {PlayerCollision: PlayerCollision}