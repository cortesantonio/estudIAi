/* model Document {
  id            Int        @id @default(autoincrement())
  studyGroupId  Int
  title         String
  fileUrl       String
  extractedText String
  uploadedAt    DateTime
  studyGroup    StudyGroup @relation(fields: [studyGroupId], references: [id])
  Question      Question[]
}
 */
import type{ Group} from "./Group";

export interface Document{
    id: number;
    studyGroupId: number
    title: string;
    fileUrl: string;
    extractedText: string;
    uploadedAt: Date;
    studyGroup: Group;
}