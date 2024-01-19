import pgPromise from "pg-promise"

export interface IClient {
}

export function camelizeColumns(data: any) {
    const tmp = data[0];
    for (const prop in tmp) {
        const camel = pgPromise.utils.camelize(prop); //a
        if (!(camel in tmp)) {
            for (let i = 0; i < data.length; i++) {
                const d = data[i];
                d[camel] = d[prop];
                delete d[prop];
            }
        }
    }
}