export interface Disabilitas {
    id: number;
    kategori: string;
    created_at: Date;
}

export class CDisabilitas implements Disabilitas {
    id: number;
    kategori: string;
    created_at: Date;

    constructor(data?: CDisabilitas) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
   
    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.kategori = data["kategori"];
            this.created_at = data["created_at"];
        }
    }

    static fromJS(data: any): CDisabilitas {
        let result = new CDisabilitas();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["kategori"] = this.kategori;
        data["created_ad"] = this.created_at;
        return data; 
    }
}
