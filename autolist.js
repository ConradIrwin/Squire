function AutoList(squire) {
    this._originalSpaceHandler = squire._keyHandlers['space'];

    squire.setKeyHandler('space', this.onSpace.bind(this));
    squire.setKeyHandler('shift-space', this.onShiftSpace.bind(this));
}

AutoList.prototype.onSpace = function (squire, event, range) {
    return this._handler(squire, event, range, this._originalSpaceHandler);
};

AutoList.prototype.onShiftSpace = function (squire, event, range) {
    return this._handler(squire, event, range);
};

AutoList.prototype._handler = function (squire, event, range, originalHandler) {
    var block, container, shouldMakeOrderedList, shouldMakeUnorderedList;

    block = Squire.getStartBlockOfRange(range, squire.getRoot());
    shouldMakeUnorderedList = block && range.collapsed && range.endOffset === 1 && block.textContent[0] === '*';
    shouldMakeOrderedList = range.collapsed && range.commonAncestorContainer.textContent && /^1\./.test(range.commonAncestorContainer.textContent);

    if (shouldMakeUnorderedList || shouldMakeOrderedList) {
        squire._recordUndoState(range);
        event.preventDefault();
        event.stopPropagation();

        if (shouldMakeOrderedList) {
            squire.makeOrderedList();
        }

        if (shouldMakeUnorderedList) {
            squire.makeUnorderedList();
        }

        range = squire.getSelection();
        container = range.startContainer;

        if (container.data) {
            container.data = container.data.replace(/^([*.\d]+)/, "");
        }

        if (!container.data && container.firstChild && container.firstChild.nodeType === Node.TEXT_NODE) {
            range.selectNode(container.firstChild);
            Squire.deleteContentsOfRange(range, squire.getRoot());
        }

        return squire._getRangeAndRemoveBookmark(range);

    } else if (originalHandler) {
        return originalHandler(squire, event, range);
    }
};
