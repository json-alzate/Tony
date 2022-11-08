export interface Plant {
    uid: string;
    uidUser: string;
    name: string;
    description?: string;
    type: 'Auto' | 'Fem' | 'Regular';
    variety?: string;
    dateStart: number;
    avatarPlantUrl?: string;
    dateEnd?: number;
    typeEnd?: 'dead' | 'harvested';
    descriptionEnd?: string;
}


export interface UserPlant {
    uid: string;
    uidPlant: string;
    uidUser: string;
    status: boolean;
    createAt: number;
}
