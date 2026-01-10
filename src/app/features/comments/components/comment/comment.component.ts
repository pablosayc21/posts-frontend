import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostComment } from '../../models/comment.interface';
import { FechaPipe } from "../../../../shared/pipes/fecha/fecha.pipe";
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-comment',
  imports: [FechaPipe, LucideAngularModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  @Input({ required: true }) comment!: PostComment;
  @Input() deleting:boolean = false;
  @Output() delete = new EventEmitter<string>();

  onDelete() {
    this.delete.emit(this.comment._id);
  }

}
