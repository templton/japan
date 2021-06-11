export const selectCargosForTransferList = (cargos) => {

    console.log('cargos in select', cargos);

    return cargos.map(item => ({
        id: item.id,
        title: item.title
    }));
}
