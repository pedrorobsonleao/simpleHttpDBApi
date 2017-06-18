// String Normalizer
exports.normalize = function() {
    return this
        .replace(/[áàãâä]/g, 'a')
        .replace(/[éèẽêë]/g, 'e')
        .replace(/[íìĩîï]/g, 'i')
        .replace(/[óòõôö]/g, 'o')
        .replace(/[úùũûü]/g, 'u')
        .replace(/[ÁÀÂÃÄ]/g, 'A')
        .replace(/[ÉÈẼÊË]/g, 'E')
        .replace(/[ÍÌĨÎÏ]/g, 'I')
        .replace(/[ÓÒÕÔÖ]/g, 'O')
        .replace(/[ÚÙŨÛÜ]/g, 'U')
        .replace(/[ç]/g, 'c')
        .replace(/[Ç]/g, 'C')
        .replace(/[ñ]/g, 'n')
        .replace(/[Ñ]/g, 'N')
        .replace(/["''_\-\+\*\!\@\#\$\%\&\§\º\ª\{\}°ºª§\r\t,\.\]\[\(\)\/\\\|\?]/g, ' ')
        .replace(/  +/, ' ')
        .trim();
};