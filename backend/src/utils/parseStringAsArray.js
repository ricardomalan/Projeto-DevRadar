module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim()); //split(separa todos os arrays), map(percorre o array), trim(remove espaçamento antes e depois de uma string)
}