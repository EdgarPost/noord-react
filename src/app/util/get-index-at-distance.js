export default function getIndexAtDistance(polyline, metres) {

    // some awkward special cases
    if (metres === 0) return {
        index: 0,
        point: polyline.getPath().getAt(0)
    };
    if (metres < 0) return null;
    if (polyline.getPath().getLength() < 2) return null;
    let dist=0;
    let olddist=0;
    let i;
    for (i=1; (i < polyline.getPath().getLength() && dist < metres); i++) {
        olddist = dist;

        dist += google.maps.geometry.spherical.computeDistanceBetween(
            polyline.getPath().getAt(i),
            polyline.getPath().getAt(i-1)
        );
    }

    if (dist < metres) {
        return {
            point: polyline.getPath().getAt(i-1),
            index: i
        };
    }

    const p1= polyline.getPath().getAt(i-2);
    const p2= polyline.getPath().getAt(i-1);
    const m = (metres-olddist)/(dist-olddist);

    return {
        point: new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m),
        index: i-1
    };
}