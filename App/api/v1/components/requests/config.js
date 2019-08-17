const types = {
    RESERVE : 1,
    ASSISTANCE : 2,
    LOAN : 3
}

const states = {
    PENDING : 1,
    CANCELED : 2,
    REJECTED : 3,
    APPROVED : 4,
    IN_COURSE : 5,
    DONE : 6
}

module.exports = {
    types,
    states
}