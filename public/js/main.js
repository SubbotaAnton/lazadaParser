$(function () {

    var form = {
        validation : {
            url:  /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
        },

        attachHandlers : function () {
            var $inputs = this.$wrapper.find('input:not([type="hidden"]):not([type="submit"])');

            this.$wrapper.on('submit', this.formSubmit.bind(this));
            $inputs.on('blur', this.removeError)

        },

        formSubmit : function (e) {
            e.preventDefault();
            if (this.isValid()) {
                comparativeTable.empty();
                this.submitData()
                    .done(function (data1, data2) {
                        comparativeTable.render(data1, data2);
                    })
                    .fail(function (error) {
                        // some
                    });
            }
        },

        init : function ($wrapper) {
            this.$wrapper = $wrapper;
            this.attachHandlers();
        },

        checkEl : function ($el) {
            var typeValid = $el.data('validate-type'),
                rule  = this.validation[typeValid],
                value = $el.val(),
                result = value && (!rule || rule.test(value));

            if (!result) {
                $el.addClass('error');
            }

            return result;
        },

        removeError : function (e) {
            $(e.currentTarget).removeClass('error');
        },

        isValid : function () {
            var valid = true;

            this.$wrapper.find('input:not([type="hidden"]):not([type="submit"])').each(function (index, el) {
                var $el = $(el);

                valid &= this.checkEl($el);
            }.bind(this));

            return valid;
        },

        submitData : function () {
            var url1 = encodeURIComponent($('#url1').val()),
                url2 = encodeURIComponent($('#url2').val());

            return $.when(this.getData(url1), this.getData(url2));
        },

        getData : function (url) {
            var deferred = $.Deferred(),
                API = 'http://localhost:8000/link/';

            $.getJSON(API + url, function (response) {
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
            var data = {},
                key;

            for (key in data1) {
                data[key] = {
                    name : data1[key].name,
                    value1 : data1[key].value,
                    value2 : ''
                }
            }

            for (key in data2) {
                data[key] = data[key] || {};
                data[key].value1 = data[key].value1 || '';
                data[key].value2 = data2[key].value
            }

            return data;
        },
        empty : function () {
            this.render({}, {});
        },
        render : function (data1, data2) {
            var source = $('[data-template-name="comparativeTable"]').html(),
                template = Handlebars.compile(source),
                context = this.merge(data1, data2),
                html    = template(context);

            $('.comparativeTable').html(html);
        }
    };

    form.init($('.formURLComparative'));


});