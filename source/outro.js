/*jshint ignore:start */

Squire.getNodeBefore = getNodeBefore;
Squire.getNodeAfter = getNodeAfter;
Squire.insertNodeInRange = insertNodeInRange;
Squire.extractContentsOfRange = extractContentsOfRange;
Squire.deleteContentsOfRange = deleteContentsOfRange;
Squire.insertTreeFragmentIntoRange = insertTreeFragmentIntoRange;
Squire.isNodeContainedInRange = isNodeContainedInRange;
Squire.moveRangeBoundariesDownTree = moveRangeBoundariesDownTree;
Squire.moveRangeBoundariesUpTree = moveRangeBoundariesUpTree;
Squire.getStartBlockOfRange = getStartBlockOfRange;
Squire.getEndBlockOfRange = getEndBlockOfRange;
Squire.contentWalker = contentWalker;
Squire.rangeDoesStartAtBlockBoundary = rangeDoesStartAtBlockBoundary;
Squire.rangeDoesEndAtBlockBoundary = rangeDoesEndAtBlockBoundary;
Squire.expandRangeToBlockBoundaries = expandRangeToBlockBoundaries;

if ( typeof exports === 'object' ) {
    module.exports = Squire;
} else if ( typeof define === 'function' && define.amd ) {
    define( function () {
        return Squire;
    });
} else {
    win.Squire = Squire;

    if ( top !== win &&
            doc.documentElement.getAttribute( 'data-squireinit' ) === 'true' ) {
        win.editor = new Squire( doc );
        if ( win.onEditorLoad ) {
            win.onEditorLoad( win.editor );
            win.onEditorLoad = null;
        }
    }
}

}( document ) );
