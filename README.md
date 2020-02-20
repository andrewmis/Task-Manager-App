## Personal Task Manager Application
![Usage example](https://github.com/andrewmis/Cohen-Project/blob/master/Demo/Demo%20GIF.gif)

### Technology Used
* Angular 8.3.25
  * Material UI
  * Angular CDK
  * Angulder Flex Layout
* NodeJS
* Express

### Features
* Create/Remove Task Lists
* Add/Remove Tasks to lists
* Edit lists or tasks
* Reorder a lists tasks

### Models
#### Task List
| Property       | Description       | Type  |
| ------------- |:-------------:| -----:|
| id | A UUID that gets set on list creation. | string |
| title | A detailed description of the list. | string |
| description | A detailed description of the list. | string |
| allTasksCompleted | Denotes if all of the list's tasks have been completed. | boolean |
| allTasksCompletedDate | The date that the tasks should be completed by. | string |
| allTasksDueDate | A UUID that gets set on list creation. | string |
| tasks | The list's collection of tasks. | Task[] |
#### Task
| Property       | Description       | Type  |
| ------------- |:-------------:| -----:|
| id | A UUID that gets set on task creation. | string |
| title | A detailed description of the task. | string |
| description | A detailed description of the task. | string |
| priority | Denotes a task's level of urgency. | Priority |
| isComplete | Denotes if the task has been completed. | boolean |
| dateDue | The date that the task should be completed by. | string |
| dateCompleted | The date that the task was completed on. | string |

### Future Enhancements
* Sortable options (completed/priority/due date)
* Task Tags
* Task Search
