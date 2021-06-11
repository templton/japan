const dictionary = {
    partner: [],
    user: [],
    cargoType: [],
    cargoExportMethod: []
};

export const newCargo = (partnerDictionary, userDictionary, cargoTypeDictionary, cargoExportMethodsDictionary) => {

    dictionary.partner = partnerDictionary;
    dictionary.user = userDictionary;
    dictionary.cargoType = cargoTypeDictionary;
    dictionary.cargoExportMethod = cargoExportMethodsDictionary;

    const cargo = {
        id: null,
        photos: JSON.stringify([]),
        title: "NEW CARGO",
        cargoType: dictionary.cargoType[0],
        exportMethod: dictionary.cargoExportMethod[0],
        extraFields: JSON.stringify(newCarExtraFields()),
        customs: dictionary.partner[0],
        sender: dictionary.partner[0],
        client: dictionary.partner[0],
        receiver: dictionary.partner[0]
    };

    cargo.customs.owner = dictionary.user[0];
    cargo.sender.owner = dictionary.user[0];
    cargo.client.owner = dictionary.user[0];
    cargo.receiver.owner = dictionary.user[0];

    return cargo;
}

const newTitle = () => {
    return JSON.stringify({en: 'new', ru: 'новый'});
}

const newCarExtraFields = () => {
    return {
        "frame": {
            "type": "string",
            "title": {
                "en": "Frame",
                "ru": "Номер кузова"
            },
            "value": null,
            "required": false
        },
        "price": {
            "type": "number",
            "title": {
                "en": "Price",
                "ru": "Стоимость"
            },
            "value": 0,
            "required": true
        },
        "width": {
            "type": "number",
            "title": {
                "en": "Width",
                "ru": "Ширина"
            },
            "value": 0,
            "required": true
        },
        "height": {
            "type": "number",
            "title": {
                "en": "Height",
                "ru": "Высота"
            },
            "value": 0,
            "required": true
        },
        "length": {
            "type": "number",
            "title": {
                "en": "Length",
                "ru": "Длина"
            },
            "value": 0,
            "required": true
        },
        "weight": {
            "type": "number",
            "title": {
                "en": "Weight",
                "ru": "Вес"
            },
            "value": 0,
            "required": true
        },
        "barcode": {
            "type": "barcode",
            "title": {
                "en": "Barcode",
                "ru": "Штрих-код"
            },
            "value": null,
            "required": false
        },
        "subCargo": {
            "type": "entities",
            "title": {
                "en": "Sub cargo",
                "ru": "Дочерние грузы"
            },
            "value": null,
            "required": false
        },
        "parentCargo": {
            "type": "entity",
            "title": {
                "en": "Parent cargo",
                "ru": "Родительский груз"
            },
            "value": null,
            "required": false
        }
    }
}

const newCustomsExtraFields = () => {
    return {
        "email": {
            "type": "email",
            "title": {
                "en": "Email",
                "ru": "Электронная почта"
            },
            "value": null,
            "required": false
        },
        "phone": {
            "type": "phone",
            "title": {
                "en": "Phone",
                "ru": "Телефон"
            },
            "value": null,
            "required": false
        },
        "viber": {
            "type": "viber",
            "title": {
                "en": "Viber",
                "ru": "Viber"
            },
            "value": null,
            "required": false
        },
        "telegram": {
            "type": "telegram",
            "title": {
                "en": "Telegram",
                "ru": "Telegram"
            },
            "value": null,
            "required": false
        },
        "whatsapp": {
            "type": "whatsapp",
            "title": {
                "en": "WhatsApp",
                "ru": "WhatsApp"
            },
            "value": null,
            "required": false
        }
    }
}

const newOwner = () => {
    return {
        name: ''
    };
}
