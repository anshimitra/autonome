import { Pipe, PipeTransform } from '@angular/core';
import { TaskInterface } from '../interface/project.interface';

@Pipe({
  name: 'tasks',
  standalone: true,
})
export class TasksPipe implements PipeTransform {
  transform(tasks: TaskInterface[], status: string): TaskInterface[] {
    return tasks.filter((task) => task.status === (status as string));
  }
}
