(function () {
    if (!Array.prototype.findByAttr) {
        /**
         * Finds an object in the array by the value of an attribute.
         *
         * @param attr
         * @param value
         * @returns {*}
         */
        Array.prototype.findByAttr = function (attr, value) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][attr] == value) {
                    return this[i];
                }
            }
        }
    }
})();

(function () {
    if (!Array.prototype.findIndexByAttr) {
        /**
         * Finds the index of an object in the array by the value of an attribute.
         *
         * @param attr
         * @param value
         * @returns {*}
         */
        Array.prototype.findIndexByAttr = function (attr, value) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][attr] == value) {
                    return i;
                }
            }
        }
    }
})();

(function () {
    if (!Array.prototype.contains) {
        /**
         * Checks if the array contains an object.
         *
         * @param attr
         * @param value
         * @returns {*}
         */
        Array.prototype.contains = function (obj) {
            return this.indexOf(obj) > -1;
        }
    }
})();
