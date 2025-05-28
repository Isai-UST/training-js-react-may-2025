import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema()
export class Project {

    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    imageUrl: string;

    @Prop()
    contractTypeId: number;

    @Prop()
    contractSignedOn: Date;

    @Prop()
    budget: number;

    @Prop()
    isActive: boolean;
}

const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.plugin(mongoosePaginate);

export { ProjectSchema };
