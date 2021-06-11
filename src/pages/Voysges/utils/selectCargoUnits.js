export const selectCargoUnits = (cargos) => {

    const units = {
        whole: {
            car: 0,
            truck: 0,
            spares: 0,
            special: 0
        },
        disassembled: {
            car: 0,
            truck: 0,
            spares: 0,
            special: 0
        },
        dissected: {
            car: 0,
            truck: 0,
            spares: 0,
            special: 0
        }
    };

    if (!cargos || !cargos.length || cargos.length == 0){
        return units;
    }

    cargos.map(item => {
        const cargoType = item.cargoType.icon;
        const importMethod = item.exportMethod.icon;

        if (units[importMethod] !== undefined && units[importMethod][cargoType] !== undefined){
            units[importMethod][cargoType]++;
        }

    });

    return units;
}

export const totalUnits = (cargos) => {
    return cargos && cargos.length ? cargos.length : 0;
}

export const totalWeight = (cargos) => {
    let weight = 0;

    if (!cargos || !cargos.length || cargos.length == 0){
        return weight;
    }

    cargos.map(item => {
        let extra = item.extraFields ? item.extraFields : null;

        if (extra){
           extra = JSON.parse(extra);
           weight = weight + +(extra.weight && extra.weight.value ? extra.weight.value : 0);
        }
    });

    return Math.round(weight);
}
