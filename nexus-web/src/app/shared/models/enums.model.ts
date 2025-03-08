export class Enum {
    // getById
    static getById<T>(id): string {
        return this[id];
    }

    // getAll
    static getAll(): Array<Object> {
        // which means here we filter only
        return Object.keys(this).filter(key => typeof this[key] === 'string').map(key => {
            const id = parseInt(key, 10);
            return {
                title: this.getById(key),
                id: isNaN(id) ? key : id,
            };
        });
    }
}

export class JobType extends Enum {
    static PartTime = 1;
    static FullTime = 2;
    static 1 = 'Part Time';
    static 2 = 'Full Time';
}

export class ApplicationStatus extends Enum {
    static New = 0;
    static Screening = 1;
    static Interview = 2;
    static Offered = 3;
    static Hired = 4;
    static Archived = 5;
    static 0 = 'Application submitted';
    static 1 = 'Application under review';
    static 2 = 'Interview';
    static 3 = 'Offer letter';
    static 4 = 'Hired';
}
