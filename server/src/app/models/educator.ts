import { IsDefined, IsBoolean } from 'class-validator'

import { User } from './user'

export class Educator extends User {
    @IsDefined() firstName: string
    @IsDefined() lastName: string
    @IsDefined() school: string
    @IsDefined() empathyTrainingLength: string
    @IsDefined() gradeLevel: string

    @IsDefined()
    @IsBoolean()
    isTeamLead: boolean

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}
