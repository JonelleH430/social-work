const format = require('date-fns/format')

module.exports = {
    formatDate(date) {
        return format(date, 'mm,dd,yyyy')
    }
}