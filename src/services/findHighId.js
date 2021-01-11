function findHighId(array) {
    var maxid = -1;

    array.map(function (obj) {
        if (obj.id > maxid) maxid = obj.id;
    });
    return maxid;
}

export default findHighId;