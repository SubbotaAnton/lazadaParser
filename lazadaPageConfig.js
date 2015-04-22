var config = {
    title : {
        name : 'Title',
        type : 'text',
        value : function ($) {
            return $('#prod_title').text();
        }
    },
    brand : {
        name : 'Brand',
        type : 'text',
        value : function ($) {
            return $('.prod_header_brand_action a').eq(0).text()
        }
    },
    rate : {
        name : 'Rate',
        type : 'text',
        value : function ($) {
            var $el = $('#prodinfo .itm-ratRating'),
                tmp = 'width: ',
                startIndex, elStyle,
                rate = '';

            if ($el.length) {
                elStyle = $('#prodinfo .itm-ratRating').attr('style');
                startIndex = elStyle.indexOf(tmp);

                if (startIndex !== -1) {

                    rate = Math.round(parseInt(elStyle.slice(startIndex).replace(tmp, ''), 10) / 20);
                }
            }
            return rate;
        }
    },
    price : {
        name : 'Price',
        type : 'text',
        value : function ($) {
            return $('#special_price_box').text();
        }
    },
    attr : {
        name : 'Specification',
        type : 'list',
        value : function ($) {
            var result = [];

            $('.prd-attributesList li').each(function (index, el) {
                result.push($(el).text());
            });

            return result;
        }
    },
    image : {
        name : 'Image',
        type : 'img',
        value : function ($) {
            var result = [];

            $('.itm-img').each(function (index, el){
                var $el = $(el),
                    height = parseInt($el.attr('height'), 10);
                if (height > 100) {
                    result.push($el.attr('src'))
                }
            });

            return result;
        }
    }
};

module.exports = config;