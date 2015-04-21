var config = {
    title : {
        name : 'Title',
        value : function ($) {
            return $('#prod_title').text();
        }
    },
    brand : {
        name : 'Brand',
        value : function ($) {
            return $('.prod_header_brand_action a').eq(0).text()
        }
    },
    rate : {
        name : 'Rate',
        value : function ($) {
            var elStyle = $('#prodinfo .itm-ratRating').attr('style'),
                tmp = 'width: ',
                startIndex = elStyle.indexOf(tmp),
                rate = null;

            if (startIndex !== -1) {
                rate = Math.round(parseInt(elStyle.slice(startIndex).replace(tmp, ''), 10) / 20);
            }
            return rate
        }
    }
};

module.exports = config;