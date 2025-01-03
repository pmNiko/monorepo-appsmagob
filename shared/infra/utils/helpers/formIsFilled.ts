export const formIsFilled = (form: any) => {
    let argumentEmpty: Array<any> = []
    Object.values(form).map((prop) => {
        if (prop === '') {
            argumentEmpty.push(prop)
        }
    })

    return argumentEmpty.length == 0
}
