import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { FechaPipe } from '../../../../shared/pipes/fecha/fecha.pipe';
import { NgClass } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-post',
  imports: [NgClass, FechaPipe, CommonModule, LucideAngularModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

export class PostComponent {
  
  @Input({ required: true }) post!: Post;
  @Input({required: true}) postColor: PostColor = 'teal';

}

type PostColor = 'teal' | 'green' | 'yellow' | string;
