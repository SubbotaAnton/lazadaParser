$(function () {

    var form = {
        config : {
            error: {
                // TODO
            }
        },

        attachHandlers : function () {

            this.$wrapper.on('submit', function (e) {
                if (this.isValid()) {
                    this.submitData()
                        .done(function (data) {
                            comparativeTable.init(data, data);
                            // TODO
                        })
                        .fail(function (error) {
                            console.log(error);
                            // TODO
                        });
                }
                e.preventDefault();
            }.bind(this));

        },

        init : function ($wrapper) {
            this.$wrapper = $wrapper;
            this.attachHandlers();
        },

        isValid : function () {
            return true;
            // TODO
        },

        submitData : function () {
            var deferred = $.Deferred();

            $.getJSON('http://localhost:8000/link/1', function (response) {
                if (response && response.resultCode === 'OK' && response.payload) {
                    deferred.resolve(response.payload)
                } else {
                    deferred.reject();
                }
            });

            return deferred;
        }

    };

    var comparativeTable = {
        merge : function (data1, data2) {
            return data; // TODO
        },
        render : function () {

        },
        init : function (data1, data2) {
            this.render(this.merge(data1, data2));
        }
    };

    form.init($('.formURLComparative'));


});