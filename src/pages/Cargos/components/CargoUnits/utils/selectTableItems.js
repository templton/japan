export const selectTableItems = (cargoList) => {


    return cargoList.map(item => {
        return {
            id: item.id,
            title: item.title,
            status: item.status,
            type: item.cargoType
        }
    });













    return {
        columns: [
            {field: 'id', filterable: true, headerName: 'ID', sortable: true, hide: true, type: "number"},
            {field: 'status', filterable: true, headerName: 'Status', sortable: true, type: "number"},
            {field: 'identifier', filterable: true, headerName: 'Identifier', sortable: true, type: "number"},
            {field: 'title', filterable: true, headerName: 'Title', sortable: true, type: "number"},
            {field: 'photos', filterable: true, headerName: 'Photos', sortable: true, type: "number"},
            {field: 'exportMethodType', filterable: true, headerName: 'Export Type', sortable: true, type: "number"},
            {field: 'sender', filterable: true, headerName: 'Sender', sortable: true, type: "number"},
            {field: 'receiver', filterable: true, headerName: 'Receiver', sortable: true, type: "number"},
            {field: 'places', filterable: true, headerName: 'Places', sortable: true, type: "number"},
        ],
        rows:cargoList.map(cargo => {
            return {
                id: cargo.id,
                status: cargo.id,
                identifier: cargo.id,
                title: cargo.id,
                photos: cargo.id,
                exportMethodType: cargo.id,
                sender: cargo.sender.title,
                receiver: cargo.receiver.title,
                places: '',
            }
        })
    };
}
