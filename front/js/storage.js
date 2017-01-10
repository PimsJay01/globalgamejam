define(function() {
    var storage = {};

    return {
        set: function(index, data) {
            storage[index] = data;
        },
        get: function(index) {
            return storage[index];
        },
        delete: function(index) {
            delete storage[index];
        },
        isDefined: function(index) {
            return (storage[index] !== void 0);
        }
    }
});
