import { IsBoolean, IsDefined } from 'class-validator'

import { User } from './user'

export class Educator extends User {
    @IsDefined() firstName: string
    @IsDefined() lastName: string
    @IsDefined() school: string
    @IsDefined() empathyTrainingLength: string
    @IsDefined() gradeLevel: string

    @IsBoolean() isTeamLead: boolean = false

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}
