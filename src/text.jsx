'use strict';

module.exports = {
    get: function (code, param) {
        var _messages = {
            0: 'Unknown Error',
            1: 'No Transport',
            2: `${param} Method Not Allowed`,
            3: `${param} Scheme Not Supported`,
            4: 'URI source and target scheme must be the same',
            5: 'No Data',
            6: `Bad Data: ${param}`,
            7: 'Network Error',
            8: 'Timeout'
        };

        return  _messages[code in _messages ? code : 0];
    }
};
