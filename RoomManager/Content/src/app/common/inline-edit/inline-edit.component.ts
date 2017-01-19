import { Component, EventEmitter } from '@angular/core';

@Component({
    selector: 'inline-edit',
    templateUrl: './inline-edit.component.html',
    inputs: ['text'],
    outputs: ['edit']
})

export class InlineEditComponent {
    private isDisplay = true;

    text: string;
    edit = new EventEmitter<string>();

    beginEdit(el: HTMLElement): void {
        this.isDisplay = false;

        setTimeout(() => {
            el.focus();
        }, 100);
    }

    editDone($event: Event, newText: string): void {
        $event.stopPropagation();
        this.isDisplay = true;
        this.text = newText;
        this.edit.emit(this.text);
    }
}